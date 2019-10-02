import React, { memo } from 'react'
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import useStore from 'hooks/useStore'
import db from 'utils/db'

function DeleteListButton() {
	const {
		list: [list, setList],
		lists: [, setLists],
	} = useStore()
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = React.useCallback(() => {
		setOpen(true)
	}, [])

	const handleClose = React.useCallback(() => {
		setOpen(false)
	}, [])

	const handleDelete = React.useCallback(() => {
		db.todos.deleteByList(list.id)
		db.lists.deleteById(list.id)
		setList({ id: 'Inbox', title: 'Inbox' })
		setLists(state => state.filter(x => x.id !== list.id))
		handleClose()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [list.id])

	return (
		<>
			<IconButton onClick={handleClickOpen}>
				<DeleteOutlineIcon />
			</IconButton>
			<Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}>
				<DialogContent>
					<DialogContentText>
						이 목록을 삭제하시겠습니까?
						<br />할 일도 같이 삭제됩니다.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>취소</Button>
					<Button onClick={handleDelete} color="secondary">
						삭제
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default memo(DeleteListButton)
