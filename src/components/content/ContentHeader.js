import React from 'react'
import { Box } from '@material-ui/core'
import useStore from 'hooks/useStore'

function ContentHeader() {
	const {
		list: [list],
	} = useStore()

	return (
		<Box p={4}>
			<Box fontSize="h4.fontSize" fontWeight="fontWeightBold">
				{list.title}
			</Box>
		</Box>
	)
}

export default ContentHeader
