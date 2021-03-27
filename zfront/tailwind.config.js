// Built by following video at https://tailwindcss.com/course/setting-up-tailwind-and-postcss

module.exports = {  
   important: true,

   future: {
      // removeDeprecatedGapUtilities: true,
      // purgeLayersByDefault: true,
   },
   
   purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
   ],

   theme: {

      screens: {
         'xs': '480px',
         'sm': '720px',
         'md': '900px',
         'lg': '1000px',
         'xl': '1300px',
         '2xl': '1600px'
      },

      fontSize: {
         '4xs': '0.469rem',   // 7.5px
         '3xs': '0.563rem',   // 9px
         '2xs': '0.656rem',   // 10.5px
         xs: '0.75rem',      // 12px
         sm: '0.875rem',     // 14px
         md: '1rem',         // 16px
         lg: '1.125rem',     // 18px
         xl: '1.25rem',      // 20px
         '2xl': '1.5rem',    // 24px
         '3xl': '1.875rem',  // 30px
         '4xl': '2.25rem',   // 36px
         '5xl': '3rem',      // 48px
         '6xl': '3.75rem',   // 60px
         '7xl': '4.75rem',    // 72px
         '8xl': '6rem',       // 96px
         '9xl': '7.5rem',     // 120px
         '10xl': '9rem'       // 144px
      },

      fontWeight: {
         '100': '100',
         '200': '200',
         '300': '300',
         '400': '400',
         '500': '500',
         '600': '600',
         '700': '700',
         '800': '800',
         '900': '900',
      },


      fontFamily: {
         sans: [ 'Roboto', 'Tahoma', 'Verdana', 'system-ui', '-apple-system', 'sans-serif'],
         roundy: [ 'M_PLUS_Rounded_1c', 'Menlo', 'Consolas', 'Verdana', 'system-ui', 'sans-serif'],
         sans_bold: ['Myriad Pro Bold', 'Tahoma', 'Verdana', 'system-ui', '-apple-system', 'sans-serif'],
         serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
         mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },


      extend: {
   
         colors: {

            indigo: {
              gray: '#807caa',
              // Was '#5d598b',
              background: '#1c1c53',
              title: '#262673',
            },

            blue: {
               100: '#ebf8ff',
               200: '#bee3f8',
               300: '#90cdf4',
               400: '#63b3ed',
               500: '#4299e1',
               600: '#3182ce',
               700: '#2b6cb0',
               800: '#2c5282',
               900: '#2a4365',
            },

            // For neutral grays
            gray: {
               '100': '#f5f5f5',
               '200': '#eeeeee',
               '300': '#e0e0e0',
               '400': '#bdbdbd',
               '500': '#9e9e9e',
               '600': '#757575',
               '700': '#616161',
               '800': '#424242',
               '900': '#212121',
            },

         },

         spacing: {
            '0.5': '0.125rem',
            '1.5': '0.375rem',
            '2.5': '0.625rem',
            '3.5': '0.875rem',
            '7':  '1.75rem',
            '8.5': '2.125rem',
            '28': '7rem',
            '36': '9rem',
            '72': '18rem',
            '80': '20rem',
            '88': '22rem',
            '100': '25rem',
            '110': '27.rem',
            '120': '30rem',  //480px
            '140': '35rem',
            '150': '37.5rem',
            '160': '40rem',
            '180': '45rem',  //720px
            '200': '50rem',  //800px
            '220': '55rem',  //880px
            '240': '60rem',  //960px
            '250': '62.5rem',
            '260': '65rem',
            '280': '70rem',
            '300': '75rem',
            '320': '80rem',
            '360': '90rem',
            '400': '100rem',
            '600': '150rem',
            '800': '200rem',
         },


      }
   },
   variants: {},
  //  plugins: [require("@tailwindcss/line-clamp")],
}
