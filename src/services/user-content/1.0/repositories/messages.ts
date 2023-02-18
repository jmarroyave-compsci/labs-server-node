import DBMessage from './models/messages'
import { getHash } from 'common/data'

export const insert = async function( props ) {
  const { owner, text, params } = props
  const model = new DBMessage()

  model.owner = owner
  model.text = text
  model.params = params
  model.created = new Date()

  try{
      const resp = await model.save()
      return resp
  } catch(ex){
    console.log("ERROR", "MESSAGES", "INSERT", ex)
    return null
  }
}

export const deleteOne = async function( props ) {
  const { id, user } = props

  try{
      const resp = await DBMessage.deleteOne({ _id: id, "user.id" : user.id })
      return resp
  } catch(ex){
    console.log("ERROR", "MESSAGES", "DELETE", ex)
    return null
  }
}