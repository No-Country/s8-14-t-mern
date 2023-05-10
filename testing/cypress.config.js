const { defineConfig } = require("cypress");
const cypressSplit = require('cypress-split')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
    require('cypress-mochawesome-reporter/plugin')(on);
    cypressSplit(on, config)
      return config
    },
    // specPattern:"cypress/e2e/features/*.feature",
    // reporter:'cypress-multi-reporters',
    reporterOptions:{
      reportDir: 'cypress/results/json',
      reportFilename: '[name].html',
      charts:true,
      overwrite:false,
      html:false,
      json:true,
      video:true,
      // reporterDir:"cypress/mochawesome-report"
    },
      // viewportHeight:670,
      // viewportWidth:380,
      // chromeWebSecurity:false
  },
});
// require('@applitools/eyes-cypress')(module);
