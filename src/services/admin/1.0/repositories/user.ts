import DBUser from './models/user'

export const findById = async function( id ) {
  return await find( { _id : id } )
};

export const findByGoogleId = async function( id ) {
  return await findByProviderId( "google", id )
};

export const findByGithubId = async function( id ) {
  return await findByProviderId( "github", id )
};

export const findByProviderId = async function( provider, id ) {
  const filter = {}
  filter[`provider.${provider}`] = id
  return await find( filter )
};

const find = async function( filter ) {
  const resp = await DBUser.findOne( filter )

  if(!resp) return null  

  return getUser( resp )
};


export const insert = async function( props ) {
  const { name, email, picture, locale, provider={} } = props
  const user = new DBUser()

  user.name = name
  user.email = email
  user.picture = picture
  user.locale = locale
  user.provider = provider
  user.created = new Date()

  try{
      const resp = await user.save()
      //console.log("USER", "INSERT", resp, user)
  } catch(ex){
    console.log("ERROR", "USER", "INSERT", ex)
    return null
  }

  return getUser(user)
};

const getUser = ( userM ) => ({
    id: userM._id, 
    email: userM.email,
    name: userM.name,
    avatar: userM.picture,
  })