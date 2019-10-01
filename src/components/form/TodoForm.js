import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import { MenuItem, Button, Grid, IconButton, Tooltip } from '@material-ui/core'
import { DateTimePicker } from '@material-ui/pickers'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'
import useStore from 'hooks/useStore'

const useStyles = makeStyles(theme => ({
	button: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}))

function TodoForm({ handleSubmit, handleChange, handleBlur, values, errors, setFieldValue, ...rest }) {
	const classes = useStyles()

	const {
		lists: [lists],
	} = useStore()

	return (
		<Form onSubmit={handleSubmit}>
			<Field name="content" label="할 일 내용" margin="normal" fullWidth autoFocus multiline required component={TextField} />
			<Field type="text" name="list" label="목록 선택" select margin="normal" fullWidth required component={TextField}>
				{lists.map(option => (
					<MenuItem key={option.id} value={option.id}>
						{option.title}
					</MenuItem>
				))}
			</Field>
			<Grid container spacing={1} alignItems="flex-end" wrap="nowrap">
				<Grid item>
					<DateTimePicker
						label="기한"
						format="MM월 d일, a hh:mm"
						margin="normal"
						fullWidth
						clearable
						value={values.dueDate}
						onChange={value => {
							if (value) {
								setFieldValue('dueDate', new Date(value))
							} else {
								setFieldValue('dueDate', null)
							}
						}}
					/>
				</Grid>
				<Grid item>
					<Tooltip title="중요" placement="top">
						<IconButton color={values.important ? 'primary' : 'default'} onClick={() => setFieldValue('important', !values.important)}>
							{values.important ? <StarIcon /> : <StarBorderIcon />}
						</IconButton>
					</Tooltip>
				</Grid>
			</Grid>
			{values.id && (
				<Button
					color="primary"
					variant={values.complete ? 'contained' : 'outlined'}
					fullWidth
					onClick={() => setFieldValue('complete', !values.complete)}
					classes={{ root: classes.button }}
				>
					{values.complete ? '완료' : '미완료'}
				</Button>
			)}
			<Button type="submit" color="primary" variant="contained" fullWidth classes={{ root: classes.button }}>
				{values.id ? '수정' : '등록'}
			</Button>
			{values.id && (
				<Button
					color="secondary"
					variant="contained"
					fullWidth
					// onClick={() => setFieldValue('complete', !values.complete)}
					classes={{ root: classes.button }}
				>
					삭제
				</Button>
			)}
		</Form>
	)
}

export default TodoForm
