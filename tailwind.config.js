/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4F46E5', // Indigo-600 - Main Brand Color
                secondary: '#6366F1', // Indigo-500
                accent: '#818CF8', // Indigo-400
                dark: '#1E1B4B', // Indigo-950 - Sidebar/Dark text
                light: '#EEF2FF', // Indigo-50 - Backgrounds
            },
        },
    },
    plugins: [],
}