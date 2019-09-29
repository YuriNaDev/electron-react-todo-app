import React from 'react'
import useGlobalHook from 'use-global-hook'

const initialState = {
	list: 'Inbox',
}

const actions = {
	setList(store, list) {
		store.setState({ list })
	},
}

export default useGlobalHook(React, initialState, actions)
