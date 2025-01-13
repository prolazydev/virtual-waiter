import plugin from 'tailwindcss/plugin';
import { color_theme_green, hover_dark_shadow, hover_scale, input_focus, input_hover, read_only } from './configConstatns/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [
		plugin(function ({ addComponents }) {
			// TODO: maybe add more styles here
			addComponents({
				// NOTE: Colors 
				// TODO: Add more colors if needed
				'.color-theme-green': color_theme_green,
				// NOTE: Form Classes
				'.form-input': {
					'background': '#fff',

					'padding': '0.5rem',
					'borderWidth': '2px',
					'transitionProperty': 'color, background-color, border-color, text-decoration-color, fill, stroke',
					'transitionTimingFunction': 'cubic-bezier(0.4, 0, 0.2, 1)',
					'transitionDuration': '300ms',
					'borderColor': '#1b1b1b',

					"&:focus": input_focus,
					'&:hover': input_hover,

					'&:read-only': read_only,
				},
				'.form-input-with-icon': {
					'min-width': '15rem',
					'padding': '0.5rem',
					'paddingLeft': '2.25rem',
					'borderWidth': '2px',
					'transitionProperty': 'color, background-color, border-color, text-decoration-color, fill, stroke',
					'transitionTimingFunction': 'cubic-bezier(0.4, 0, 0.2, 1)',
					'transitionDuration': '300ms',
					'borderColor': '#1b1b1b',

					'&:read-only': read_only,
				},
				'.absolute-center': {
					'position': 'absolute',
					'top': '50%',
					'left': '50%',
					'transform': 'translate(-50%, -50%)',
				},
				'.my-hover-dark-shadow': {
					'cursor': 'pointer',
					'transitionProperty': 'all',
					'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
					'transition-duration': '150ms',
					'&:hover': {
						'filter':
							'drop-shadow(0 1px 1px hsl(0deg 0% 0% / 0.075)) drop-shadow(0 4px 4px hsla(0, 0%, 0%, 0.075)) drop-shadow(0 8px 8px hsla(0, 0%, 0%, 0.075)) drop-shadow(0 16px 16px hsl(0deg 0% 0% / 0.075)) drop-shadow(0 2px 2px hsl(0deg 0% 0% / 0.075))',
						'scale': '1.05',
					},
					'&:active': {
						'filter': 'drop-shadow(0 0 #0000)',
						'scale': '0.95',
					},
				},
				'.my-dark-shadow': {
					...hover_dark_shadow,
				},
				'.dialog-body-full': {
					'.dialog-body': {
						'height': '100%'
					}
				},
			});
		}),
	],
};