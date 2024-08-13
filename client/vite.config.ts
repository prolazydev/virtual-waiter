import { fileURLToPath, URL } from 'node:url';

import vueDevTools from 'vite-plugin-vue-devtools'

import VueRouter from 'unplugin-vue-router/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';

import { composableResolver, resolvePath } from './buildCofigs/build.config';

export default defineConfig({
	plugins: [
		VueRouter({
			routesFolder: 'src/views'
		}),
		vue(),
        vueDevTools(),
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

