import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Drawer, List } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/Inbox'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import TodayIcon from '@material-ui/icons/Today'
import AlarmIcon from '@material-ui/icons/Alarm'
import DoneIcon from '@material-ui/icons/Done'
import db from 'utils/db'
import useStore from 'hooks/useStore'
import DrawerListItem from './DrawerListItem'
import AddNewList from './AddNewList'

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
}))

function DrawerPanel() {
	const classes = useStyles()

	const {
		list: [selected, setSelected],
		lists: [personalList, setPersonalList],
	} = useStore()
	const [list, setList] = React.useState([
		{
			id: 'Inbox',
			title: 'Inbox',
			icon: InboxIcon,
			selected: true,
		},
		{
			id: 'Today',
			title: 'Today',
			icon: TodayIcon,
			selected: false,
		},
		{
			id: 'Important',
			title: 'Important',
			icon: StarBorderIcon,
			selected: false,
		},
		{
			id: 'Upcoming',
			title: 'Upcoming',
			icon: AlarmIcon,
			selected: false,
		},
		{
			id: 'Completed',
			title: 'Completed',
			icon: DoneIcon,
			selected: false,
		},
	])

	const handleClick = React.useCallback(
		(id, title) => {
			setSelected({ id, title })
		},
		[setSelected]
	)

	React.useEffect(() => {
		setList(list => {
			return list.map(item => {
				if (item.id === selected.id) {
					return item.selected ? item : { ...item, selected: true }
				} else {
					return item.selected ? { ...item, selected: false } : item
				}
			})
		})
		setPersonalList(list => {
			return list.map(item => {
				if (item.id === selected.id) {
					return item.selected ? item : { ...item, selected: true }
				} else {
					return item.selected ? { ...item, selected: false } : item
				}
			})
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected.id])

	React.useEffect(() => {
		const lists = db.lists.find()
		setPersonalList(lists.map(item => ({ ...item, selected: false })))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Drawer variant="permanent" anchor="left" classes={{ root: classes.drawerRoot, paper: classes.drawerPaper }}>
			<Box height={32} />
			<List disablePadding classes={{ root: classes.firstList }}>
				{list.map(item => (
					<DrawerListItem key={item.id} {...item} handleClick={handleClick} />
				))}
			</List>
			<List disablePadding>
				{personalList.map(item => (
					<DrawerListItem key={item.id} {...item} handleClick={handleClick} />
				))}
				<AddNewList />
			</List>
		</Drawer>
	)
}

export default DrawerPanel
