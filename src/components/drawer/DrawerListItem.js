import React, { memo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
	listItem: {
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
		color: props => (props.button ? theme.palette.primary.main : theme.palette.text.primary),
	},
	listItemIcon: {
		minWidth: 35,
		color: 'inherit',
	},
	listItemText: {
		fontSize: theme.typography.fontSize,
	},
	selectedItem: {
		color: `${theme.palette.primary.main} !important`,
		backgroundColor: 'transparent !important',
		pointerEvents: 'none',
	},
}))

function DrawerListItem({ id, title, icon: CustomIcon, selected, handleClick }) {
	const classes = useStyles({ button: !id })
	const ListIcon = CustomIcon || MenuIcon

	return (
		<ListItem
			button
			classes={{ root: classes.listItem, selected: classes.selectedItem }}
			selected={selected}
			onClick={() => handleClick(id, title)}
		>
			<ListItemIcon classes={{ root: classes.listItemIcon }}>
				<ListIcon fontSize="small" />
			</ListItemIcon>
			<ListItemText primary={title} classes={{ primary: classes.listItemText }} />
		</ListItem>
	)
}

export default memo(DrawerListItem)
