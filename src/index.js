import './assets/css/index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import ThemeProvider from 'utils/theme'

ReactDOM.render(
	<ThemeProvider>
		<App />
	</ThemeProvider>,
	document.getElementById('root')
)

serviceWorker.register()
