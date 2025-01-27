// @ts-nocheck
import { StyleValue } from 'vue';


// #region Colors 
export const color_theme_green: StyleValue = {
	'--tw-text-opacity': '1',
	'color': 'rgb(7 184 137 / var(--tw-text-opacity, 1)) /* #07b889 */'
};
// #endregion

export const read_only: StyleValue = {
	"backgroundColor": "transparent",
	"color": "#374151",
	'cursor': 'not-allowed',
	"&:focus": {
		"borderColor": "#1b1b1b"
	},
	"&::placeholder": {
		"color": "#6b7280"
	},
};

export const input_focus: StyleValue = {
	'outline': 'none',
	'border-bottom-color': 'rgb(225 29 72)',
};

export const input_hover: StyleValue = {
	'border-bottom-color': 'rgb(225 29 72)',
};

// export const hover_scale: StyleValue = {
// 	'&:hover': {
// 		'filter':
// 			'drop-shadow(0 1px 1px hsl(0deg 0% 0% / 0.075)) drop-shadow(0 4px 4px hsla(0, 0%, 0%, 0.075)) drop-shadow(0 8px 8px hsla(0, 0%, 0%, 0.075)) drop-shadow(0 16px 16px hsl(0deg 0% 0% / 0.075)) drop-shadow(0 2px 2px hsl(0deg 0% 0% / 0.075))',
// 	},
// 	'&:active': {
// 		'filter':
// 			'drop-shadow(0 1px 1px hsl(0deg 0% 0% / 0.075)) drop-shadow(0 4px 4px hsla(0, 0%, 0%, 0.075)) drop-shadow(0 8px 8px hsla(0, 0%, 0%, 0.075)) drop-shadow(0 16px 16px hsl(0deg 0% 0% / 0.075)) drop-shadow(0 2px 2px hsl(0deg 0% 0% / 0.075))',
// 	}
// };

export const hover_dark_shadow: StyleValue[] = [ 
{
	'&:hover': {
		'scale': '.95',
	},
	
}, {
	'&:active': {
		'scale': '0.95',
	}
}]