import React, { memo } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import useStore from 'hooks/useStore'
import db from 'utils/db'
import DrawerListItem from './DrawerListItem'

function AddNewList() {
	const inputEl = React.useRef(null)
	const {
		lists: [, setLists],
	} = useStore()
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = React.useCallback(() => {
		setOpen(true)
	}, [])

	const handleClose = React.useCallback(() => {
		inputEl.current.value = ''
		setOpen(false)
	}, [])

	const handleSubmit = React.useCallback(() => {
		const result = db.lists.create({ title: inputEl.current.value })
		setLists(list => [...list, { ...result, selected: false }])
		handleClose()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<DrawerListItem icon={AddIcon} title="New List" handleClick={handleClickOpen} />
			<Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}>
				<DialogTitle>목록 추가</DialogTitle>
				<DialogContent>
					<TextField label="목록명" margin="normal" fullWidth autoFocus required inputRef={inputEl} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>취소</Button>
					<Button onClick={handleSubmit} color="primary">
						추가
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default memo(AddNewList)
