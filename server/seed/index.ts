import { faker } from '@faker-js/faker';
import { User, UserModel } from '../src/db/models/User';
import { createUser } from '../src/services/CRUD/user.service';
import { hashPassword, randomSalt } from '../src/utils/crypto';
import { logger } from '../src/services/logger.service';
import { SeedingStatus } from '../src/db/models/SeedStatus';

const roles = [ 'user', 'admin', 'chef' ];
let iterations = 10;
export async function seed() {
	try {
		await checkAdmin();
			
		const seededStatus = await SeedingStatus.findOne({ seedFor: 'users' }).lean();
		if ( seededStatus != null && seededStatus.status === 'completed') 
			return console.log('Seed already completed!');

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


		await SeedingStatus.create({ status: 'completed', seedFor: 'users' });
		console.log('Seed completed!');
	} catch (err) {
		console.log('Seeding Error: ', err);
	}
}

async function checkAdmin() {
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

		await createUser(user);
		console.log('Admin created: ', user.username, user.email, password);
		logger.log('seed_info', `User created: "${user.username}" - "${user.email}" - "${password}"`);
	} else 
		console.log('Admin exists!');
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
