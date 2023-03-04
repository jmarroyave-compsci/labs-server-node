import DBVotes from './models/votes'

const _get = async( props ) => (await get( { ...props, reformat: false } ))[0]

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

  return getResponse(resp, user) 
}

export const upVote = async function( props ) {
  const { owner, user } = props

  const resp = await _get( props )

  if( isUpVoting( resp, user ) != null ) return

  var current = isDownVoting( resp, user )
  if(current) {
    resp.downVotes.pull(current)
  } 

  current = { user: user.id, created: new Date()}
  resp.upVotes.push( current )

  await resp.save();

  return getResponse(resp, user) 
}

export const downVote = async function( props ) {
  const { owner, user } = props

  const resp = await _get( props )

  if( isDownVoting( resp, user ) != null ) return

  var current = isUpVoting( resp, user )
  if(current) {
    resp.upVotes.pull(current)
  } 

  current = { user: user.id, created: new Date()}
  resp.downVotes.push( current )    

  await resp.save();

  return getResponse(resp, user) 
}

export const insert = async function( props ) {
  const { owner } = props
  const model = new DBVotes()

  model.owner = owner
  model.created = new Date()

  try{
      await model.save()
      return model
  } catch(ex){
    console.log("ERROR", "VOTES", "INSERT", ex)
    return null
  }
}

export const get = async function( props ) {
  const { owner, user=null, reformat=true } = props

  const filter = {  }

  if( owner.page ){
    filter['owner.page'] = owner.page
  }

  if( owner.instance && owner.instance != null ){
    filter['owner.instance'] = owner.instance
  }

  var resp
  try{
      resp = await DBVotes.find( filter )
  } catch(ex){
    console.log("ERROR", "VOTES", "GET", ex)
    return null
  }

  return reformat ? resp.map( r => getResponse(r, user) ) : resp
}

export const deleteOne = async function( props ) {
  const { owner } = props

  try{
      const filter = { owner: owner }
      return await DBVotes.deleteOne( filter )
  } catch(ex){
    console.log("ERROR", "VOTES", "DELETE", ex)
    return null
  }
}


const isUpVoting = ( votes, user ) => votes.upVotes.filter( u => u.user == user.id )?.[0] ?? null
const isDownVoting = ( votes, user ) => votes.downVotes.filter( u => u.user == user.id )?.[0] ?? null
const getTotal = ( votes ) => votes.upVotes.length - votes.downVotes.length
const getMe = ( votes, user ) => user == null ? null : (
  isUpVoting( votes, user ) != null 
  ? 1 
  : isDownVoting(votes, user) != null ? -1 : 0 
)

const getResponse = ( votes, user ) => {
  return { 
    owner : votes.owner,
    total : getTotal( votes ), 
    me: getMe( votes, user ),
    positive: votes.upVotes.length,
    negative: votes.downVotes.length,
  }
}
    