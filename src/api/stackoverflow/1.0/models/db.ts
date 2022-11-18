import { Connection } from 'lib/db'

class DBConnection extends Connection {
	constructor(){
		super({
			version : "1.0",
			server : "server1",
			database : "stackexchange",
		})
	}
}

export default new DBConnection();