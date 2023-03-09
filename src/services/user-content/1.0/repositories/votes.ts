import DBVotes from './models/votes'

const _get = async( props ) => ( await get( { ...props, forceInsert: true } ) )[0]

export const neutralVote = async function( props ) {
  const { owner, user } = props

  const resp = await _get( props )
  var current;

  current = isDownVoting( resp, user )
  if(current) {
    resp.downVotes.pull(current)
  }

  current = isUpVoting( resp, user )
  if(current) {
    resp.upVotes.pull(current)
  }

  await resp.save();

  return resp
}

export const upVote = async function( props ) {
  const { owner, user } = props

  const resp = await _get( props )

  if( isUpVoting( resp, user ) != null ) return resp

  var current = isDownVoting( resp, user )
  if(current) {
    resp.downVotes.pull(current)
  } 

  current = { user: user.id, created: new Date()}
  resp.upVotes.push( current )

  const r = await resp.save();
  return resp
}

export const downVote = async function( props ) {
  const { owner, user } = props

  const resp = await _get( props )

  if( isDownVoting( resp, user ) != null ) return resp

  var current = isUpVoting( resp, user )
  if(current) {
    resp.upVotes.pull(current)
  } 

  current = { user: user.id, created: new Date()}
  resp.downVotes.push( current )    

  await resp.save();

  return resp
}

export const insert = async function( props ) {
  const { owner } = props
  const model = new DBVotes()

  model.owner = owner
  model.created = new Date()

  try {
      await model.save()
      return model
  } catch(ex){
    console.log("ERROR", "VOTES", "INSERT", ex)
    return null
  }
}

export const get = async function( props ) {
  const { owner, user=null, forceInsert=false } = props

  const filter = {  }

  if( owner.page ){
    filter['owner.page'] = owner.page
  }

  if( owner.instance && owner.instance != null ){
    filter['owner.instance'] = owner.instance
  }

  var resp = null
  try{
      resp = await DBVotes.find( filter )
  } catch(ex){
    console.log("ERROR", "VOTES", "GET", ex)
  }

  if( forceInsert && ( resp == null || resp.length == 0 ) ){
    return [ await insert( props ) ]
  }

  return resp
}

export const deleteOne = async function( props ) {
  const { owner } = props

  try{
      const filter = { owner: owner,  }
      return await DBVotes.deleteOne( filter )
  } catch(ex){
    console.log("ERROR", "VOTES", "DELETE", ex)
    return null
  }
}

const isUpVoting = ( votes, user ) => votes.upVotes.filter( u => u.user.toString() == user.id.toString() )?.[0] ?? null
const isDownVoting = ( votes, user ) => votes.downVotes.filter( u => u.user.toString() == user.id.toString() )?.[0] ?? null
export const getTotal = ( votes ) => votes.upVotes.length - votes.downVotes.length
export const getMe = ( votes, user ) => {
  const resp = user?.id == null  ? null : (
  isUpVoting( votes, user ) != null 
  ? 1 
  : isDownVoting(votes, user) != null ? -1 : 0 
  )
  return resp
}



    