import React from 'react'
import { hot } from 'react-hot-loader'
import { Box } from '@material-ui/core'
import DraggableBar from 'components/common/DraggableBar'
import DrawerPanel from 'components/drawer/DrawerPanel'
import ContentPanel from 'components/content/ContentPanel'
import { StoreProvider } from 'hooks/useStore'
import FormPanel from 'components/form/FormPanel'

function App() {
	return (
		<StoreProvider>
			<Box>
				<DraggableBar />
				<Box display="flex">
					<DrawerPanel />
					<ContentPanel />
					<FormPanel />
				</Box>
			</Box>
		</StoreProvider>
	)
}

export default hot(module)(App)
