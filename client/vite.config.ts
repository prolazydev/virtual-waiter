import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'


import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

export default defineConfig({
	plugins: [
		vue({
			// template: {
			// 	compilerOptions: {
			// 		isCustomElement: (tag) => tag.includes('-')
			// 	}
			// }
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
				}
			],
			resolvers: [
				(componentName: string) => {
					let path = '';

					if (componentName == 'Footer' || componentName == 'Header') {
						path = `@/components/header_footer/${componentName}.vue`
						return path
					} else if (componentName.endsWith('Icon')) {
						path = `@/components/ui/LucideIcon.vue`
						return path
					} 
				}
			],
			dts: true,
			exclude: [ 'tc-range-slider' ]
		}),
		AutoImport({
			dts: true,
			imports: [
				'vue',
				'vue-router',
				'pinia',
				'@vueuse/core',
				{
					from: 'number-flip-ts',
					imports: ['Flip'],
					type: true,
					typeFrom: 'number-flip-ts'
				}
			],
			dirs: [ 
				'@/composables', 
				'./src/composables', 
				'src/components',
				'src/composables',
			],
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
