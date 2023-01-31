import DBVotes from './models/votes'

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

  //console.log("inserting votes", props )

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

const _get = async function( props ) {
  const { owner, user=null } = props

  //console.log("VOTES", "_GET", owner)

  var resp
  try{
      resp = await DBVotes.findOne({ owner : owner })
  } catch(ex){
    console.log("ERROR", "VOTES", "GET", ex)
    return null
  }

  return resp
}

export const get = async function( props ) {
  const { owner, user=null } = props

  var resp = await _get(props)

  if(resp == null){
    resp = await insert( props )
    //console.log("inserted", resp)
  }

  //console.log("VOTES", resp)

  return getResponse(resp, user)
}

const isUpVoting = ( votes, user ) => votes.upVotes.filter( u => u.user == user.id )?.[0] ?? null
const isDownVoting = ( votes, user ) => votes.downVotes.filter( u => u.user == user.id )?.[0] ?? null
const getTotal = ( votes ) => votes.upVotes.length - votes.downVotes.length
const getMe = ( votes, user ) => user == null ? null : (
  isUpVoting( votes, user ) != null ? 1 
  : ( 
    isDownVoting(votes, user) != null ? -1 : 0 
    )
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
    