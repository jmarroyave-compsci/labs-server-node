import DBHistory from './models/history'

export const insert = async function( props ) {
  const { type, userId, inst } = props
  const model = new DBHistory()

  model.type = type
  model.user = userId
  model.inst = inst
  model.created = new Date()

  try{
      const resp = await model.save()
      console.log(resp)
  } catch(ex){
    console.log("ERROR", "HISTORY", "INSERT", ex)
    return null
  }
}