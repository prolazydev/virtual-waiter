import fs from 'fs';
import path from 'path';
import { fileURLToPath, URL } from 'node:url';

import VueRouter from 'unplugin-vue-router/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import type { Resolver } from 'unplugin-auto-import/types';
import Components from 'unplugin-vue-components/vite';

import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// Resolver for AutoImport
const composableResolver: Resolver = name => {
	if ( name.endsWith('Store') ) {
		const storeName = (name.slice(3, name.length - 5)).toLowerCase();
		return `@/stores/${storeName}`;
	}

	if ( name.includes('Service') ) {
		const serviceName = name.slice(0, name.indexOf('Service'))
		return `@/services/${serviceName}.service`;
	}	

	if ( name.startsWith('my') ) 
		return `@/utils/${name}`;
	if ( name.startsWith('use') || name.startsWith('tost')) 
		return `@/composables/${name}`;
}

export default defineConfig({
	plugins: [
		VueRouter({
			routesFolder: 'src/views'
		}),
		vue(),
		AutoImport({
			dts: true,
			imports: [
				'vue',
				// 'vue-router',
				VueRouterAutoImports,
				'pinia',
				'@vueuse/core',
				{
					from: 'number-flip-ts',
					imports: ['Flip'],
					type: true,
					typeFrom: 'number-flip-ts'
				},
			],
			resolvers: [ composableResolver ],
			dirs: [
				'src/composables',
				'src/stores',
				'src/utils',
				'src/services',
				'src/enums',
			],
		}),
		Components({
			deep: true,
			types: [
				{
					from: 'vue-router',
					names: ['RouterLink', 'RouterView'],
				},
				{
					from: 'number-flip',
					names: ['Flip'],
				},
				// {
				// 	from: 'v-calendar',
				// 	names: [ 'DatePicker' ],
				// }
			],
			dirs: [ 
				'src/components',
				// 'src/components/header_footer',
				// 'src/components/ui',
			],
			resolvers: [ 
				(componentName: string) => resolvePath(componentName),
			],
			dts: true,
			exclude: [ 'tc-range-slider' ]
		}),
	],
	css: {
		postcss: {
			plugins: [tailwind(), autoprefixer()],
		},
		preprocessorOptions: {
			scss: {
				additionalData: `
					@import url('../../node_modules/@glidejs/glide/src/assets/sass/glide.core');
					@import url('../../node_modules/@glidejs/glide/src/assets/sass/glide.theme');
				`
			}
		}
	},
	optimizeDeps: {
		exclude: [ 'tc-range-slider' ]
	},
	mode: 'development',
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})

// Private
const resolvePath = (componentName: string) => findComponent(componentName);

// find component locally t that is nested inside components folder knowing only the name
function findComponent(componentName: string, startPath: string = './src/components'): string | null {
    const files = fs.readdirSync(startPath);

    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename); // Retrieve the file status (whether it's a directory or not)

        if (stat.isDirectory()) {
            const result = findComponent(componentName, filename);

            if (result) 
				return result;
        } else if (filename.indexOf(componentName) >= 0) 
            return path.join('@\\', filename.slice(4)).replace(/\\/g, '/');
    }
    return null;
}
