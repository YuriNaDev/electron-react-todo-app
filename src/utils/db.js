import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import { remote } from 'electron'
import lodashId from 'lodash-id'
import { differenceInDays, parseISO } from 'date-fns'

const dbPath = path.join(remote.app.getPath('userData'), 'lowdb.json')
const adapter = new FileSync(dbPath)
const db = low(adapter)

db._.mixin(lodashId)

const todos = db.defaults({ todos: [] }).get('todos')
const lists = db.defaults({ lists: [] }).get('lists')

export default {
	lists: {
		find(cond) {
			if (!cond) {
				return lists.cloneDeep().value()
			}
			return []
		},
		create(data) {
			return lists.insert({ ...data }).write()
		},
	},
	todos: {
		find(listType) {
			if (listType === 'Inbox') {
				return todos
					.cloneDeep()
					.orderBy('updated', 'desc')
					.value()
			} else if (listType === 'Today') {
				return todos
					.filter(x => x.dueDate && differenceInDays(parseISO(x.dueDate), new Date()) <= 0)
					.orderBy('updated', 'desc')
					.value()
			} else if (listType === 'Important') {
				return todos
					.filter(x => x.important)
					.orderBy('updated', 'desc')
					.value()
			} else if (listType === 'Upcoming') {
				return todos
					.filter(x => x.dueDate && differenceInDays(parseISO(x.dueDate), new Date()) <= 7)
					.orderBy('updated', 'desc')
					.value()
			} else if (listType === 'Completed') {
				return todos
					.filter(x => x.complete)
					.orderBy('updated', 'desc')
					.value()
			}
			return todos
				.filter(x => x.list === listType)
				.orderBy('updated', 'desc')
				.value()
		},
		findById(id) {
			return todos.getById(id).value()
		},
		create(data) {
			return todos.insert({ ...data }).write()
		},
		updateById(id, data) {
			return todos
				.getById(id)
				.assign(data)
				.write()
		},
		deleteById(id) {
			return todos.removeById(id).write()
		},
	},
}
