import { Connection } from 'lib/db'

class DBConnection extends Connection {
	constructor(){
		super({
			version : "4.0",
			server : "server1",
			database : "entertainment",
		})
	}
}

export default new DBConnection();