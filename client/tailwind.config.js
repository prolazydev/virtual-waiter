import { StyleValue } from 'vue';

import plugin from 'tailwindcss/plugin';

/** @type {StyleValue} */
const read_only = {
    "backgroundColor": "#e5e7eb",
    "color": "#374151",
    'cursor': 'not-allowed',
    "&:focus": {
        "borderColor": "#1b1b1b"
    },
    "&::placeholder": {
        "color": "#6b7280"
    },
}

/** @type {StyleValue} */
const input_focus = {
    'outline': 'none',
    'border-bottom-color': 'rgb(225 29 72)',
}

/** @type {StyleValue} */
const input_hover = {
    'border-bottom-color': 'rgb(225 29 72)',
}

/** @type {StyleValue} */
const hover_scale = {
    '&:hover': { 
        'filter': 
            'drop-shadow(0 1px 1px hsl(0deg 0% 0% / 0.075)) drop-shadow(0 4px 4px hsla(0, 0%, 0%, 0.075)) drop-shadow(0 8px 8px hsla(0, 0%, 0%, 0.075)) drop-shadow(0 16px 16px hsl(0deg 0% 0% / 0.075)) drop-shadow(0 2px 2px hsl(0deg 0% 0% / 0.075))',
    },
    '&:active': {
        'filter': 
            'drop-shadow(0 1px 1px hsl(0deg 0% 0% / 0.075)) drop-shadow(0 4px 4px hsla(0, 0%, 0%, 0.075)) drop-shadow(0 8px 8px hsla(0, 0%, 0%, 0.075)) drop-shadow(0 16px 16px hsl(0deg 0% 0% / 0.075)) drop-shadow(0 2px 2px hsl(0deg 0% 0% / 0.075))',
    }
}

/** @type {StyleValue} */
const hover_dark_shadow = {
    '&:hover': { 
        'filter': 
            'drop-shadow(0 1px 1px hsl(0deg 0% 0% / 0.075)) drop-shadow(0 4px 4px hsla(0, 0%, 0%, 0.075)) drop-shadow(0 8px 8px hsla(0, 0%, 0%, 0.075)) drop-shadow(0 16px 16px hsl(0deg 0% 0% / 0.075)) drop-shadow(0 2px 2px hsl(0deg 0% 0% / 0.075))',
    },
    '&:active': {
        'scale': '.95',
    }
}

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
                    ...hover_dark_shadow,
                    ...hover_scale,
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