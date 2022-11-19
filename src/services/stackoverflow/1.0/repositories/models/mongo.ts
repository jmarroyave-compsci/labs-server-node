import log from 'common/log';
import db from './db'

class Mongo {
	static MODELS = {}
	constructor(){

	}

	async find( server, database, collection, restrict=null, projections=null, order=null, limit=null ){	
		var model;
		if( !Mongo.MODELS[collection] ){
			Mongo.MODELS[collection] = db.model( collection, {}, { strict: false, collection: collection })
		}
		model = Mongo.MODELS[collection]
		limit = limit ?? 10
		order = order ?? { _id : 1 }
		projections = projections?.projection ?? {}
		//return await model.find( restrict).select(projections).sort(order).limit(limit)
		//console.log(restrict)
		const data = await model.find( restrict ).limit( limit ).exec()
		return data?.map( doc => doc.toObject() )
	}

	async findOne( server, database, collection, restrict=null, projections=null, order=null, limit=null ){	
		var model;
		if( !Mongo.MODELS[collection] ){
			Mongo.MODELS[collection] = db.model( collection, {}, { strict: false, collection: collection })
		}
		model = Mongo.MODELS[collection]
		limit = limit ?? 10
		order = order ?? { _id : 1 }
		projections = projections?.projection ?? {}
		const data = await model.findOne( restrict ).limit( limit ).exec()
		return data?.toObject()
	}

}

export default new Mongo()