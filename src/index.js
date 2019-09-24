import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/font.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import blue from '@material-ui/core/colors/blue'

const theme = createMuiTheme({
	palette: {
		primary: blue,
	},
	typography: {
		fontFamily: "'Noto Sans KR', sans-serif",
	},
})

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<App />
		<CssBaseline />
	</ThemeProvider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
