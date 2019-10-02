import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, List, ListItem, ListItemIcon, ListItemText, Checkbox, Typography, Chip } from '@material-ui/core'
import { format, isToday, parseISO } from 'date-fns'
import db from 'utils/db'
import useStore from 'hooks/useStore'

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
		color: props => (props.complete ? theme.palette.text.hint : theme.palette.text.primary),
	},
	itemChip: {
		marginLeft: theme.spacing(1),
		fontSize: 12,
	},
	selectedItem: {
		backgroundColor: `${theme.palette.primary.main}22 !important`,
	},
}))

const TodoItem = React.memo(({ item, toggleComplete, openEditPanel }) => {
	const classes = useStyles({ complete: item.complete })

	const handleCheckboxClick = React.useCallback(
		(e, id) => {
			e.stopPropagation()
			toggleComplete(id)
		},
		[toggleComplete]
	)

	// console.log(item.dueDate)

	return (
		<ListItem
			button
			selected={!!item.selected}
			classes={{ root: classes.listItem, selected: classes.selectedItem }}
			onClick={() => openEditPanel(item)}
		>
			<ListItemIcon classes={{ root: classes.listItemIcon }}>
				<Checkbox checked={item.complete} color="primary" edge="start" onClick={e => handleCheckboxClick(e, item.id)} />
			</ListItemIcon>
			<ListItemText
				disableTypography
				classes={{ root: classes.listItemText }}
				primary={
					<>
						<Typography classes={{ root: classes.itemTypo }}>{item.content}</Typography>
						{item.dueDate && (
							<Chip
								label={format(parseISO(item.dueDate), isToday(parseISO(item.dueDate)) ? 'HH:mm' : 'M월 d일')}
								size="small"
								classes={{ root: classes.itemChip }}
							/>
						)}
					</>
				}
			/>
		</ListItem>
	)
})

function TodoList() {
	const {
		list: [list],
		todos: [todos, setTodos],
		todo: [, setTodo],
	} = useStore()

	React.useEffect(() => {
		let todos = db.todos.find(list.id)
		setTodos(todos)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [list.id])

	const toggleComplete = React.useCallback(id => {
		setTodos(state => {
			const bool = state.find(todo => todo.id === id).complete
			db.todos.updateById(id, { complete: !bool })
			return state.map(todo => (todo.id === id ? { ...todo, complete: !bool } : todo))
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const openEditPanel = React.useCallback(id => {
		setTodo(id)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Box px={3} pb={3}>
			<List disablePadding>
				{todos.map(item => (
					<TodoItem key={item.id} item={item} toggleComplete={toggleComplete} openEditPanel={openEditPanel} />
				))}
			</List>
		</Box>
	)
}

export default TodoList
