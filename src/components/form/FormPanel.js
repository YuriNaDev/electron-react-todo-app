import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Formik } from 'formik'
import TodoForm from './TodoForm'
import useStore from 'hooks/useStore'

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
		todo: [todo, setTodo],
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

	const handleSubmit = React.useCallback((values, { setSubmitting }) => {
		setTimeout(() => {
			console.log(JSON.stringify(values, null, 2))
			setSubmitting(false)
		}, 1000)
	}, [])

	return (
		<>
			<Fab color="primary" size="medium" onClick={handleOpen} classes={{ root: classes.fab }}>
				<AddIcon />
			</Fab>
			<Drawer anchor="right" open={open} onClose={handleClose} classes={{ paper: classes.drawer }}>
				<Formik initialValues={todo || initialValues} enableReinitialize onSubmit={handleSubmit} render={props => <TodoForm {...props} />} />
			</Drawer>
		</>
	)
}

export default FormPanel
