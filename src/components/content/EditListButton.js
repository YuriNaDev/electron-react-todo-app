import React, { memo } from 'react'
import { IconButton, Dialog, DialogTitle, DialogActions, DialogContent, TextField, Button } from '@material-ui/core'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import useStore from 'hooks/useStore'
import db from 'utils/db'

function EditListButton() {
	const inputEl = React.useRef(null)
	const {
		list: [list, setList],
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

	const handleEdit = React.useCallback(() => {
		const title = inputEl.current.value
		db.lists.updateById(list.id, { title })
		setList(state => ({ ...state, title }))
		setLists(state => state.map(x => (x.id === list.id ? { ...x, title } : x)))
		handleClose()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [list.id])

	return (
		<>
			<IconButton onClick={handleClickOpen}>
				<EditOutlinedIcon />
			</IconButton>
			<Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}>
				<DialogTitle>목록 수정</DialogTitle>
				<DialogContent>
					<TextField label="목록명" margin="normal" fullWidth autoFocus required inputRef={inputEl} defaultValue={list.title} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>취소</Button>
					<Button onClick={handleEdit} color="primary">
						수정
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default memo(EditListButton)
