/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        temple: {
          950: '#150A06',
          900: '#1F110B',
          800: '#2C1810',
          700: '#3D2217',
          600: '#522E20',
          500: '#6B3C2A',
          400: '#8A523B',
          300: '#AC7157',
          200: '#D29C85',
          100: '#EBD0C3',
          50: '#FAF2EE',
        },
        gold: {
          900: '#5C4409',
          800: '#84620D',
          700: '#A98014',
          600: '#C59B27',
          500: '#D4AF37',
          400: '#E2C25D',
          300: '#EFD68C',
          200: '#F7E7BA',
          100: '#FCF5E0',
          50: '#FDFBF4',
        },
        sand: {
          900: '#38322B',
          800: '#554C42',
          700: '#73675A',
          600: '#948677',
          500: '#B3A698',
          400: '#CEC4B7',
          300: '#E2DBD0',
          200: '#EFEAE1',
          100: '#F7F4EE',
          50: '#FAF8F5',
        },
        terracotta: {
          900: '#541A0B',
          800: '#7A2711',
          700: '#9E3517',
          600: '#B74825',
          500: '#C85A32',
          400: '#D77754',
          300: '#E59A7E',
          200: '#F2C1AE',
          100: '#F9E2D8',
          50: '#FDF3EE',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(212, 175, 55, 0.15)',
        'gold-md': '0 4px 20px rgba(212, 175, 55, 0.22)',
        'gold-lg': '0 10px 35px rgba(212, 175, 55, 0.3)',
        'temple-sm': '0 4px 15px rgba(44, 24, 16, 0.08)',
        'temple-md': '0 8px 30px rgba(44, 24, 16, 0.12)',
        'temple-lg': '0 15px 45px rgba(44, 24, 16, 0.18)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F3DA89 50%, #C59B27 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #C59B27 0%, #F7E7BA 50%, #C59B27 100%)',
        'temple-gradient': 'linear-gradient(180deg, #2C1810 0%, #1F110B 100%)',
        'sand-radial': 'radial-gradient(circle at 50% 0%, #FAF8F5 0%, #EFEAE1 100%)',
      }
    },
  },
  plugins: [],
}
