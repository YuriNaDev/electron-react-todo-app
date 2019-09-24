import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer } from '@material-ui/core'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
}))

function AppDrawer() {
	const classes = useStyles()

	return (
		<Drawer variant="permanent" anchor="left" classes={{ root: classes.drawer, paper: classes.drawerPaper }}>
			<div>Inbox</div>
			<div>Today</div>
			<div>Important</div>
			<div>Upcoming</div>
			<div>Completed</div>
			<hr />
			<h2>LIST</h2>
			<div>AFS</div>
			<div>AFS_OUT</div>
			<div>AFW</div>
			<button>+ new list</button>
			<input value="search" />
		</Drawer>
	)
}

export default AppDrawer
