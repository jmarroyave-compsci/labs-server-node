import { Connection } from 'common/db'
import { DB as DBConfig } from '../../config'

class DBConnection extends Connection {
	constructor(){
		super(DBConfig)
	}
}

const inst = new DBConnection();
console.log(inst)
export default inst