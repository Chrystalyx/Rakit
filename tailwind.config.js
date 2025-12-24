import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Kita beri nama semantik agar mudah diingat
                rakit: {
                    50: "#fcfbf9", // Background Footer / Very Light
                    100: "#faf9f8", // Background Hero / Page
                    200: "#f0eadd", // Background Card Hover / Accents
                    300: "#e3dcd6", // Borders / Lines
                    400: "#d6d1cb", // Darker Borders
                    500: "#c58b4b", // Gold / Accent Color (Primary Light)
                    600: "#8a5a2b", // Gold Darker (untuk Gradient)
                    800: "#602d0d", // Coklat Utama (Primary Brand)
                    900: "#3b1b07", // Coklat Gelap (Hover State / Footer Dark)
                },
            },
        },
    },

    plugins: [forms],
};
