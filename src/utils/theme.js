import React from 'react'
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
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 700,
		fontWeightBold: 900,
	},
})

export default function({ children }) {
	return (
		<ThemeProvider theme={theme}>
			{children}
			<CssBaseline />
		</ThemeProvider>
	)
}
