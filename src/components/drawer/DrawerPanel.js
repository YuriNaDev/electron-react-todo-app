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
import db from 'utils/db'
import useGlobal from 'hooks/useGlobal'

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

const CustomListItem = React.memo(({ icon: CustomIcon, id, text, button }) => {
	const classes = useStyles({ button })
	const [selected, setSelected] = useGlobal(state => state.list, actions => actions.setList)

	const handleClick = React.useCallback(() => {
		if (id) {
			setSelected(id)
		}
	}, [id, setSelected])

	return (
		<ListItem button classes={{ root: classes.listItem, selected: classes.selectedItem }} selected={selected === id} onClick={handleClick}>
			<ListItemIcon classes={{ root: classes.listItemIcon }}>
				<CustomIcon fontSize="small" />
			</ListItemIcon>
			<ListItemText primary={text} classes={{ primary: classes.listItemText }} />
		</ListItem>
	)
})

function MyList() {
	const [lists, setLists] = React.useState([])

	React.useEffect(() => {
		const lists = db.lists.find()
		setLists(lists)
	}, [])

	return (
		<List disablePadding>
			{lists.map(list => (
				<CustomListItem key={list.id} icon={MenuIcon} id={list.id} text={list.title} />
			))}
			<CustomListItem button icon={AddIcon} text="New List" />
		</List>
	)
}

function DrawerPanel() {
	const classes = useStyles()

	return (
		<Drawer variant="permanent" anchor="left" classes={{ root: classes.drawerRoot, paper: classes.drawerPaper }}>
			<Box height={32} />
			<List disablePadding classes={{ root: classes.firstList }}>
				<CustomListItem icon={InboxIcon} text="Inbox" id="Inbox" />
				<CustomListItem icon={TodayIcon} text="Today" id="Today" />
				<CustomListItem icon={StarBorderIcon} text="Important" id="Important" />
				<CustomListItem icon={AlarmIcon} text="Upcoming" id="Upcoming" />
				<CustomListItem icon={DoneIcon} text="Completed" id="Completed" />
			</List>
			<MyList />
		</Drawer>
	)
}

export default DrawerPanel
