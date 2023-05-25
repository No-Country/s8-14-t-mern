const { defineConfig } = require("cypress");
const cypressSplit = require('cypress-split')
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );
  allureWriter(on, config);

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  projectId: "89sjgq",
  e2e: {
    setupNodeEvents(on, config) {
    require('cypress-mochawesome-reporter/plugin')(on);
    cypressSplit(on, config)
      return config
    },
    chromeWebSecurity: false,
    env: {
      allureReuseAfterSpec: true,
    },
    specPattern: ["cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"],// "**/*.feature",
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
      viewportHeight:848,
      viewportWidth:390,
      // chromeWebSecurity:false
  },
});

require('@applitools/eyes-cypress')(module);
