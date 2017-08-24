import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import Application from 'components/Application'

function renderApp(Component) {
  render(
    <AppContainer>
      <Application />
    </AppContainer>,
    document.getElementById('App')
  )
}

function onDeviceReady() {
  renderApp()

  if (module.hot) {
    module.hot.accept('components/Application', () => {
      const nextApp = require('components/Application').default
      renderApp(nextApp)
    })
  }
}

document.addEventListener('deviceready', onDeviceReady)