import React from 'react'
import { Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import { MenuItem } from '@material-ui/core'
import useStore from 'hooks/useStore'

function TodoForm({ handleSubmit, handleChange, handleBlur, values, errors }) {
	const {
		lists: [lists],
	} = useStore()

	return (
		<Form onSubmit={handleSubmit}>
			<Field name="content" label="할 일" margin="normal" fullWidth autoFocus multiline component={TextField} />
			<Field type="text" name="list" label="목록" select margin="normal" component={TextField} InputLabelProps={{ shrink: true }}>
				{lists.map(option => (
					<MenuItem key={option.id} value={option.id}>
						{option.title}
					</MenuItem>
				))}
			</Field>
			<button type="submit">Submit</button>
		</Form>
	)
}

export default TodoForm
