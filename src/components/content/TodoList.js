import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, List, ListItem, ListItemIcon, ListItemText, Checkbox, Typography, Chip } from '@material-ui/core'
import { format } from 'date-fns'
// import StarBorderIcon from '@material-ui/icons/StarBorder'

const useStyles = makeStyles(theme => ({
	listItem: {
		paddingTop: 2,
		paddingBottom: 2,
	},
	listItemIcon: {
		minWidth: 40,
	},
	listItemText: {
		display: 'flex',
		alignItems: 'center',
	},
	itemTypo: {
		flexGrow: 1,
		color: props => (props.completed ? theme.palette.text.hint : theme.palette.text.primary),
	},
	itemChip: {
		marginLeft: theme.spacing(1),
		fontSize: 12,
	},
	selectedItem: {
		backgroundColor: `${theme.palette.primary.main}22 !important`,
	},
}))

function TodoItem({ item }) {
	const classes = useStyles({ completed: item.completed })

	return (
		<ListItem button selected={!!item.selected} classes={{ root: classes.listItem, selected: classes.selectedItem }}>
			<ListItemIcon classes={{ root: classes.listItemIcon }}>
				<Checkbox checked={item.completed} color="primary" edge="start" />
			</ListItemIcon>
			<ListItemText
				disableTypography
				classes={{ root: classes.listItemText }}
				primary={
					<>
						<Typography classes={{ root: classes.itemTypo }}>{item.content}</Typography>
						{item.dueDate && <Chip label={format(item.dueDate, 'M월 d일')} size="small" classes={{ root: classes.itemChip }} />}
					</>
				}
			/>
		</ListItem>
	)
}

function TodoList() {
	const [selected, setSelected] = React.useState(-1)

	const items = [
		{ id: 0, content: '할일입니다', completed: false, list: 1, created: new Date(), updated: new Date(), dueDate: new Date() },
		{
			id: 1,
			content:
				'아주 긴 할 일입니다 아주 긴 할 일입니다 아주 긴 할 일입니다 아주 긴 할 일입니다 아주 긴 할 일입니다 아주 긴 할 일입니다 아주 긴 할 일입니다',
			completed: false,
			list: 1,
			created: new Date(),
			updated: new Date(),
			dueDate: new Date(),
		},
		{ id: 2, content: '할일입니다', completed: false, list: 1, created: new Date(), updated: new Date(), dueDate: null },
		{ id: 3, content: '할일입니다', completed: true, list: 1, created: new Date(), updated: new Date(), dueDate: null },
	]

	return (
		<Box px={3} pb={3}>
			<List disablePadding>
				{items.map(item => (
					<TodoItem key={`todo-${item.id}`} item={item} />
				))}
			</List>
		</Box>
	)
}

export default TodoList
