module.export = {
    theme: {
        extend: {
            textStrokeWidth: {
                2: '2px',
            },
            textStrokeColor: {
                black: '#',
                white: '#fff'
            },
        },
    },
    plugins : [
        function({ addUtilities }){
            addUtilities({
                '.text-stroke-2': { 'webkit-text-stroke-width' : '2px'},
                '.text-stroke-black' : { 'webkit-text-stroke-color' : '#000'}
            })
        },
    ], 
}

module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'auth-pattern': "url('/assets/images/bg-auth.jpg')",
        'home-hero': "url('/assets/images/hero.png')",
      }
    }
  }
}