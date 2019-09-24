import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import { remote } from 'electron'
import lodashId from 'lodash-id'

const dbPath = path.join(remote.app.getPath('userData'), 'lowdb.json')
const adapter = new FileSync(dbPath)
const db = low(adapter)

db._.mixin(lodashId)

const docs = db.defaults({ docs: [] }).get('docs')

export default {
	docs: {
		list() {
			return docs.cloneDeep().value()
		},
		find(id) {
			return docs.getById(id).value()
		},
		create(title) {
			return docs.insert({ title }).write()
		},
		delete(id) {
			return docs.removeById(id).write()
		},
	},
}
