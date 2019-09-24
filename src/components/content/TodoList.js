import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, List, ListItem, ListItemIcon, ListItemText, Checkbox, Typography, Chip } from '@material-ui/core'
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
		color: props => (props.checked ? theme.palette.text.hint : theme.palette.text.primary),
	},
	itemChip: {
		marginLeft: theme.spacing(1),
		fontSize: 12,
	},
	selectedItem: {
		backgroundColor: `${theme.palette.primary.main}22 !important`,
	},
}))

function TodoItem({ text, time, selected, checked }) {
	const classes = useStyles({ checked })

	return (
		<ListItem button selected={selected} classes={{ root: classes.listItem, selected: classes.selectedItem }}>
			<ListItemIcon classes={{ root: classes.listItemIcon }}>
				<Checkbox checked={checked} color="primary" edge="start" />
			</ListItemIcon>
			<ListItemText
				disableTypography
				primary={
					<>
						<Typography classes={{ root: classes.itemTypo }}>{text}</Typography>
						{time && <Chip label={time} size="small" classes={{ root: classes.itemChip }} />}
					</>
				}
				classes={{ root: classes.listItemText }}
			/>
		</ListItem>
	)
}

function TodoList() {
	return (
		<Box px={3}>
			<List disablePadding>
				<TodoItem text="할일입니다" time="오후 4:00" />
				<TodoItem
					text="아주 긴 할 일입니다 아주 긴 할 일입니다 아주 긴 할 일입니다 아주 긴 할 일입니다 아주 긴 할 일입니다 아주 긴 할 일입니다 아주 긴 할 일입니다"
					time="7월 3일"
				/>
				<TodoItem text="할일입니다" selected />
				<TodoItem text="할일입니다" checked />
				{Array.from({ length: 20 }).map((v, k) => (
					<TodoItem text={`${k + 1}번째 할일입니다`} key={`test-${k}`} />
				))}
			</List>
		</Box>
	)
}

export default TodoList
