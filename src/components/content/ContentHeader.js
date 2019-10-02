import React from 'react'
import { Box } from '@material-ui/core'
import useStore from 'hooks/useStore'
import DeleteListButton from './DeleteListButton'
import EditListButton from './EditListButton'

function ContentHeader() {
	const {
		list: [list],
	} = useStore()

	const isCustomList = React.useMemo(() => !['Inbox', 'Today', 'Important', 'Upcoming', 'Completed'].includes(list.id), [list.id])

	return (
		<Box p={4} display="flex" alignItems="center">
			<Box fontSize="h4.fontSize" fontWeight="fontWeightBold" mr={1}>
				{list.title}
			</Box>
			{isCustomList && (
				<>
					<EditListButton />
					<DeleteListButton />
				</>
			)}
		</Box>
	)
}

export default ContentHeader
