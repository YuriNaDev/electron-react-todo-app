import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import AppDrawer from './AppDrawer'

const useStyles = makeStyles(theme => ({
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
		backgroundColor: theme.palette.background.paper,
	},
}))

function Layout({ children }) {
	const classes = useStyles()

	return (
		<Box display="flex">
			<AppDrawer />
			<main className={classes.content}>{children}</main>
		</Box>
	)
}

export default Layout
