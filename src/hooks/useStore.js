import React from 'react'

const StoreContext = React.createContext(null)

export function StoreProvider({ children }) {
	const [lists, setLists] = React.useState([])
	const [list, setList] = React.useState({ id: 'Inbox', title: 'Inbox' })
	const [todos, setTodos] = React.useState([])
	const [todo, setTodo] = React.useState(null)

	const store = {
		lists: [lists, setLists],
		list: [list, setList],
		todos: [todos, setTodos],
		todo: [todo, setTodo],
	}

	return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default function useStore() {
	const store = React.useContext(StoreContext)
	if (!store) {
		throw new Error('에바')
	}
	return store
}
