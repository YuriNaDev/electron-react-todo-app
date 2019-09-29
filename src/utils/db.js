import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import { remote } from 'electron'
import lodashId from 'lodash-id'

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
		find(cond) {
			if (!cond) {
				return todos.cloneDeep().value()
			}
			return []
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
