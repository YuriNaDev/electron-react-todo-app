import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Formik } from 'formik'
import TodoForm from './TodoForm'
import useStore from 'hooks/useStore'
import db from 'utils/db'
import { differenceInDays, parseISO, isDate } from 'date-fns'

const useStyles = makeStyles(theme => ({
	fab: {
		position: 'fixed',
		left: 270,
		bottom: 10,
		zIndex: 10,
	},
	drawer: {
		width: 300,
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
	},
}))

const initialValues = { id: '', content: '', complete: false, list: '', dueDate: null, important: false }

function FormPanel() {
	const classes = useStyles()
	const {
		list: [list],
		todo: [todo, setTodo],
		todos: [, setTodos],
	} = useStore()
	const [open, setOpen] = React.useState(false)

	React.useEffect(() => {
		if (todo) {
			setOpen(true)
		}
	}, [todo])

	const handleOpen = React.useCallback(() => {
		setOpen(true)
	}, [])

	const handleClose = React.useCallback(() => {
		setOpen(false)
		setTodo(null)
	}, [setTodo])

	const handleSubmit = React.useCallback(
		(values, { setSubmitting }) => {
			const { id, dueDate, ...data } = values
			if (id) {
				const result = db.todos.updateById(id, {
					...data,
					dueDate: dueDate ? (isDate(dueDate) ? dueDate.toISOString() : dueDate) : null,
					updated: new Date().toISOString(),
				})
				if (
					list.id === result.list ||
					list.id === 'Inbox' ||
					(list.id === 'Today' && result.dueDate && differenceInDays(parseISO(result.dueDate), new Date()) <= 0) ||
					(list.id === 'Important' && result.important) ||
					(list.id === 'Upcoming' && result.dueDate && differenceInDays(parseISO(result.dueDate), new Date()) <= 7)
				) {
					// 1. 수정했으므로 순서를 최상단으로
					setTodos(state => {
						const filtered = state.filter(todo => todo.id !== id)
						return [{ ...result }, ...filtered]
					})
				} else {
					// 2. 변경범위에 따라 리스트에서 삭제
					setTodos(state => state.filter(todo => todo.id !== id))
				}
			} else {
				const result = db.todos.create({
					...data,
					dueDate: dueDate ? dueDate.toISOString() : null,
					created: new Date().toISOString(),
					updated: new Date().toISOString(),
				})
				if (
					list.id === result.list ||
					list.id === 'Inbox' ||
					(list.id === 'Today' && result.dueDate && differenceInDays(parseISO(result.dueDate), new Date()) <= 0) ||
					(list.id === 'Important' && result.important) ||
					(list.id === 'Upcoming' && result.dueDate && differenceInDays(parseISO(result.dueDate), new Date()) <= 7)
				) {
					setTodos(state => [{ ...result }, ...state])
				}
			}
			setSubmitting(false)
			handleClose()
		},
		[handleClose, list.id, setTodos]
	)

	const handleDelete = React.useCallback(
		id => {
			if (id) {
				db.todos.deleteById(id)
				setTodos(state => state.filter(todo => todo.id !== id))
				handleClose()
			}
		},
		[handleClose, setTodos]
	)

	return (
		<>
			<Fab color="primary" size="medium" onClick={handleOpen} classes={{ root: classes.fab }}>
				<AddIcon />
			</Fab>
			<Drawer anchor="right" open={open} onClose={handleClose} classes={{ paper: classes.drawer }}>
				<Formik
					initialValues={todo || initialValues}
					enableReinitialize
					onSubmit={handleSubmit}
					render={props => <TodoForm {...props} handleDelete={handleDelete} />}
				/>
			</Drawer>
		</>
	)
}

export default FormPanel
