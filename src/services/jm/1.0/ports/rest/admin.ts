import facade from '../facade'

const endpoints = {
	"/admin/messages" : facade['admin.messages'].get,
	"/admin/log" : facade['admin.log'].get,
	"/admin/log/count" : facade['admin.log'].count,
}

export default endpoints;