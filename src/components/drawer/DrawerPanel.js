import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/Inbox'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import TodayIcon from '@material-ui/icons/Today'
import AlarmIcon from '@material-ui/icons/Alarm'
import DoneIcon from '@material-ui/icons/Done'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'

const drawerWidth = 260

const useStyles = makeStyles(theme => ({
	drawerRoot: {
		zIndex: 1,
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	firstList: {
		marginBottom: theme.spacing(3),
	},
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

function CustomListItem({ icon: CustomIcon, text, selected, button }) {
	const classes = useStyles({ button })
	return (
		<ListItem button classes={{ root: classes.listItem, selected: classes.selectedItem }} selected={selected}>
			<ListItemIcon classes={{ root: classes.listItemIcon }}>
				<CustomIcon fontSize="small" />
			</ListItemIcon>
			<ListItemText primary={text} classes={{ primary: classes.listItemText }} />
		</ListItem>
	)
}

function DrawerPanel() {
	const classes = useStyles()
	return (
		<Drawer variant="permanent" anchor="left" classes={{ root: classes.drawerRoot, paper: classes.drawerPaper }}>
			<Box height={32} />
			<List disablePadding classes={{ root: classes.firstList }}>
				<CustomListItem icon={InboxIcon} text="Inbox" selected />
				<CustomListItem icon={TodayIcon} text="Today" />
				<CustomListItem icon={StarBorderIcon} text="Important" />
				<CustomListItem icon={AlarmIcon} text="Upcoming" />
				<CustomListItem icon={DoneIcon} text="Completed" />
			</List>
			<List disablePadding>
				<CustomListItem icon={MenuIcon} text="AFS" />
				<CustomListItem icon={MenuIcon} text="AFSOUT" />
				<CustomListItem button icon={AddIcon} text="New List" />
			</List>
		</Drawer>
	)
}

export default DrawerPanel
