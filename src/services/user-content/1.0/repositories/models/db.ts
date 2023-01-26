import { Connection } from 'common/db'
import { DB as DBConfig } from '../../config'

class DBConnection extends Connection {
	constructor(){
		super(DBConfig)
	}
}

export default new DBConnection();