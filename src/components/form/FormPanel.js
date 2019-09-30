import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Formik } from 'formik'
import TodoForm from './TodoForm'

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
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
	},
}))

function FormPanel() {
	const classes = useStyles()
	const [open, setOpen] = React.useState(true)

	return (
		<>
			<Fab color="primary" size="medium" onClick={() => setOpen(true)} classes={{ root: classes.fab }}>
				<AddIcon />
			</Fab>
			<Drawer anchor="right" open={open} onClose={() => setOpen(false)} classes={{ paper: classes.drawer }}>
				<Formik
					initialValues={{ content: '', complete: false, list: '', created: null, updated: null, dueDate: null, important: false }}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							console.log(JSON.stringify(values, null, 2))
							setSubmitting(false)
						}, 1000)
					}}
					render={props => <TodoForm {...props} />}
				/>
			</Drawer>
		</>
	)
}

export default FormPanel
