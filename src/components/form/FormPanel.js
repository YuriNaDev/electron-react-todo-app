import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer } from '@material-ui/core'

const formWidth = 300

const useStyles = makeStyles(theme => ({
	drawer: {
		width: formWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: formWidth,
	},
}))

function FormPanel() {
	const classes = useStyles()

	return (
		<Drawer variant="permanent" anchor="right" classes={{ root: classes.drawer, paper: classes.drawerPaper }}>
			FormPanel
		</Drawer>
	)
}

export default FormPanel
