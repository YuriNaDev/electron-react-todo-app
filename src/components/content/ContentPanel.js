import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import ContentHeader from './ContentHeader'
import TodoList from './TodoList'

const useStyles = makeStyles(theme => ({
	content: {
		flexGrow: 1,
		minHeight: '100vh',
		backgroundColor: theme.palette.background.paper,
	},
}))

function ContentPanel() {
	const classes = useStyles()

	return (
		<Box className={classes.content}>
			<ContentHeader />
			<TodoList />
		</Box>
	)
}

export default ContentPanel
