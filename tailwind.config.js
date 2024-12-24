/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   darkMode: 'class',
   theme: {
      extend: {},
   },
   plugins: [require('daisyui')],
   daisyui: {
      logs: false,
      themes: [
         {
            light: {
               ...require('daisyui/src/theming/themes')['winter'],
               success: '#22c55e',
               warning: '#facc15',
               error: '#ea0041',
               '--rounded-box': '0.25rem',
               '--rounded-btn': '0.25rem',
               '--animation-btn': '0s',
               '--btn-focus-scale': '1',
            },
         },
      ],
   },
}
