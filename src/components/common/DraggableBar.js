import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const barHeight = 32

const useStyles = makeStyles(theme => ({
	bar: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: barHeight,
		zIndex: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		'-webkit-app-region': 'drag',
	},
	button: {
		fontSize: '1rem',
		minWidth: 40,
		height: barHeight,
		borderRadius: 0,
		'-webkit-app-region': 'no-drag',
	},
}))

function DraggableBar() {
	const classes = useStyles()

	return (
		<Box className={classes.bar}>
			<Button className={classes.button}>
				<CloseIcon fontSize="inherit" />
			</Button>
		</Box>
	)
}

export default DraggableBar
