// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

// import '@applitools/eyes-cypress/commands'

import './commands'
import '@shelex/cypress-allure-plugin';
import '@testing-library/cypress/add-commands'
import 'cypress-mochawesome-reporter/register'
import 'cypress-plugin-steps'
// require('cypress-xpath')


import addContext from 'mochawesome/addContext'

const titleToFileName = (title) =>
  title.replace(/[:\/]/g, '')

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    let parent = runnable.parent
    let filename = 'index'
    while (parent && parent.title) {
      filename = `${titleToFileName(
        parent.title,
      )} -- ${filename}`
      parent = parent.parent
    }
    filename += `${titleToFileName(
      test.title,
    )} (failed).png`
    addContext(
      { test },
      `../screenshots/${Cypress.spec.name}/${filename}`,
    )
  }
  // always add the video
  addContext({ test }, `../videos/${Cypress.spec.name}.mp4`)
})