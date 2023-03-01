import DBComments from './models/comments'
import { getHash } from 'common/data'

export const insert = async function( props ) {
  const { owner, text, user, parent=null } = props
  const model = new DBComments()

  //console.log("inserting comment", props )

  model.owner = owner
  model.text = text
  model.user = { id: user.id, name: user.name, avatar: user.avatar }
  model.created = new Date()
  model.parent = parent

  try{
      const resp = await model.save()
      return resp
  } catch(ex){
    console.log("ERROR", "COMMENTS", "INSERT", ex)
    return null
  }
}

export const reply = async function( props ) {
  const { id, text, user } = props
  const model = new DBComments()
  //console.log("REPLY", id, text)

  try{
    const comment = await getById( props )
    const commentReply = await insert( { 
      owner: comment.owner, 
      text: text, 
      user: user, 
      parent: comment._id 
    } ) 

    comment.replies.push(commentReply._id)
    await comment.save()
    //console.log(comment)
    return commentReply
  } catch(ex){
    console.error(ex)
  }

  return null
}

export const deleteOne = async function( props ) {
  const { id, user, cascade=false } = props

  //console.log("deleting comment", props )
  const comment = await getById( props )

  try{
      // Delete reference from parent
      if (comment.parent != null ){
        const parentComment = await getById( { id: comment.parent } )
        parentComment.replies.pull( id )
        await parentComment.save()
      }

      // Delete all replies
      for( const commentReplied of comment.replies ){
        await deleteOne({ _id: commentReplied, user: user, cascade: true })        
      }

      const filter = { _id: id }
      if(!cascade){
        filter["user.id"] = user.id
      }

      return await DBComments.deleteOne( filter )
  } catch(ex){
    console.log("ERROR", "COMMENTS", "DELETE", ex)
    return null
  }
}

export const getAllReplies = async function( props ) {
  const { id } = props 
  const comment = await getById( { id: id })
  return await getAll( { owner: comment.owner, parent: id })
}


export const getAll = async function( props ) {
  //console.log("get all comments", props )
  const { owner, parent=null } = props
  const filter = {  }

  if( owner.page ){
    filter['owner.page'] = owner.page
  }

  if( owner.instance ){
    filter['owner.instance'] = owner.instance
  }

  filter['parent'] = parent

  var resp
  try{
      resp = await DBComments.find( filter )
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

export const getById = async function( props ) {
  const { id } = props

  var resp
  try{
      resp = await DBComments.findOne( { _id: id } )
  } catch(ex){
    console.log("ERROR", "COMMENTS", "GET_ALL", ex)
    return null
  }

  return resp
}