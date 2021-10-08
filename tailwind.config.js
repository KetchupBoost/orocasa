const config = {
  mode: 'jit',
  purge: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors:{
        "main": {
          "50": "rgb(250, 246, 244)",
          "100": "rgb(245, 238, 233)",
          "200": "rgb(235, 221, 211)",
          "300": "rgb(221, 198, 182)",
          "400": "rgb(199, 161, 134)",
          "500": "rgb(176, 124, 86)",
          "600": "rgb(144, 99, 67)",
          "700": "rgb(125, 86, 58)",
          "800": "rgb(98, 67, 46)",
          "900": "rgb(81, 56, 38)"
        }
      }
    }
  },

  plugins: []
};

module.exports = config;
