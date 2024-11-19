/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import mongoose from 'mongoose';

import { faker } from '@faker-js/faker';

import { User, UserModel } from '../src/db/models/User';
import { createUser } from '../src/services/CRUD/user.service';
import { hashPassword, randomSalt } from '../src/utils/crypto';
import { logger } from '../src/services/logger.service';
import { SeedingStatus } from '../src/db/models/SeedStatus';
import { BusinessCategory, BusinessCategoryModel } from '../src/db/models/BusinessCategory';

import { categories as RestaurantCategoriesData } from './DummyData/BusinessCategoriesData.json';

type RestaurantCategory = typeof RestaurantCategoriesData[0] & { 
	userId: mongoose.Schema.Types.ObjectId;
	name: string;
	parentCategories: string[];
};

let adminUser: mongoose.Document & User;
const roles = [ 'user', 'admin', 'chef' ];
let iterations = 10;

export async function seed() {
	try {
		await seedAdmin();
		await seedUser();
		await seedRestaurantCategories();
		
	} catch (err) {
		console.log('Seeding Error: ', err);
	}
}

async function seedAdmin() {
	const admin = await UserModel.findOne({ username: 'admin' });
	if ( !admin ) {
		const salt = randomSalt();		
		const password = 'admin.123';

		const user: User = {
			username: 'admin',
			email: 'admin@admin.com',
			auth:  {
				salt,
				password: hashPassword(salt, password),
				roles: [ 'admin' ],
			},
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const admin  = await createUser(user);
		adminUser = admin;
		console.log('Admin created: ', user.username, user.email, password);
		logger.log('seed_info', `User created: "${user.username}" - "${user.email}" - "${password}"`);
	} else {
		adminUser = admin;
		console.log('Seed for "admin" exists!');
	} 

	// TODO: second admin
	// const salt = randomSalt();		
	// const password = 'admin.123';

	// const user: User = {
	// 	username: 'admin',
	// 	email: 'admin@admin.com',
	// 	auth:  {
	// 		salt,
	// 		password: hashPassword(salt, password),
	// 		roles: [ 'admin' ],
	// 	},
	// 	createdAt: new Date(),
	// 	updatedAt: new Date(),
	// };

	// const admin  = await createUser(user);
}

async function seedUser() {
	const seededStatus = await SeedingStatus.findOne({ seedFor: 'users' }).select('status').lean();
	if ( seededStatus != null && seededStatus.status === 'completed') 
		return console.log('Seed for "users" exists!');

	while (iterations > 0) {
		const salt = randomSalt();		
		const firstName = faker.person.firstName();
		const password = faker.internet.password();

		const user: User = {
			username: faker.internet.userName({ firstName }),
			email: faker.internet.email({ firstName }),
			auth:  {
				salt,
				password: hashPassword(salt, password),
				roles: assignRandomRoles(),
			},
			accountVerified: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
	
		await createUser(user);
		logger.log('seed_info', `User created: "${user.username}" - "${user.email}" - "${password}"`);

		iterations--;
	}

	await completeSeed('users');
}

async function seedRestaurantCategories() {
	const seededStatus = await SeedingStatus.exists({ seedFor: 'business_categories' });
	if ( seededStatus ) 
		return console.log('Seed for "business_categories" exists!');

	const fileNameWithPath = 'seed\\DummyData\\output.json';

	// filter out only categories with parent_aliases containing 'restaurants'
	removeProperties(RestaurantCategoriesData);

	// Write modified JSON back to file
	fs.writeFile(fileNameWithPath, JSON.stringify(RestaurantCategoriesData, null, 4), 'utf8', err => {
		if (err) {
			console.error(`Error writing file: ${err}`);
			return;
		}
		console.log(`Modified JSON written to ${fileNameWithPath}`);

		fs.readFile(fileNameWithPath, 'utf8', async (err, data) => {
			if (err) {
				console.error(`Error writing file: ${err}`);
				return;
			}
			const categories: Partial<BusinessCategory>[] = JSON.parse(data);
	
			await BusinessCategoryModel.create(categories);
			await completeSeed('business_categories');
		});
	});
}

// PRIVATE
function removeProperties(data: Partial<typeof RestaurantCategoriesData> | Partial<RestaurantCategory>) {
	if (Array.isArray(data) ) {
		data.forEach(item => removeProperties(item!));
	} else if (typeof data === 'object' && data !== null) {
		// Remove properties from object
		data.userId = adminUser.id.toString();
		if (data.parent_aliases !== undefined) {
			data.parentCategories = data.parent_aliases;
			delete data.parent_aliases;
		}

		if (data.alias !== undefined) {
			data.name = data.title;
			delete data.alias;
			delete data.title;
		}	

		delete data.country_whitelist;
		delete data.country_blacklist;

		// Recursively remove properties from object values
		for (const key in data) 
			removeProperties((data as any)[key as any]);
	}
}

function assignRandomRoles() {
	const randomRoles = []; 
  
	const shuffledRoles = roles.sort(() => Math.random() - 0.5);
	// Determine the number of roles to assign randomly (up to maxRoles)
	const numRoles = Math.floor(Math.random() * roles.length) + 1;
  
	// Iterate over the shuffled roles array and select random roles
	for (let i = 0; i < numRoles; i++) 
		randomRoles.push(shuffledRoles[i % shuffledRoles.length]); // Use modulo to cycle through the shuffled array
  
	return randomRoles;
}

async function completeSeed(seedFor: string) {
	SeedingStatus.create({ status: 'completed', seedFor });

	console.log(`Seed for "${seedFor}" completed!`);
}
