import DBComments from './models/comments'
import { getHash } from 'common/data'

export const insert = async function( props ) {
  const { owner, text, user } = props
  const model = new DBComments()

  //console.log("inserting comment", props )

  model.owner = owner
  model.text = text
  model.user = { id: user.id, name: user.name, avatar: user.avatar }
  model.created = new Date()

  try{
      const resp = await model.save()
      return resp
  } catch(ex){
    console.log("ERROR", "COMMENTS", "INSERT", ex)
    return null
  }
}


export const deleteOne = async function( props ) {
  const { id, user } = props

  //console.log("deleting comment", props )

  try{
      const resp = await DBComments.deleteOne({ _id: id, "user.id" : user.id })
      return resp
  } catch(ex){
    console.log("ERROR", "COMMENTS", "DELETE", ex)
    return null
  }
}

export const getAll = async function( props ) {
  const { owner } = props

  //console.log("get all comments", props )

  var resp
  try{
      resp = await DBComments.find({ owner : owner })
  } catch(ex){
    console.log("ERROR", "COMMENTS", "GET_ALL", ex)
    return null
  }

  return resp.map( c => c.toObject() ).map( c => ({
    id: c._id,
    text: c.text,
    created: c.created,
    user: c.user,
  }))
}