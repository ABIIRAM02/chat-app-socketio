/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        myWhite:'#E8E6DD',
        myGray:'#7B8EBC',
        myBrown:'#313131',
        myPink:'#C426AD',
        myLightBlue:'#141A28',
        MyBlue:'#1A202F',
        myDarkBlue:'#111620',
        myBlack:'#16191C',
        myLGray:'#1E2126'
      },
      fontFamily:{
        most:'Preahvihear',
        some: 'Montserrat Alternates',
        few: 'Teko',
        myCursive:'Satisfy'      
      }
    },
  },
  plugins: [],
}
