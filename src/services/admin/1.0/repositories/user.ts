import DBUser from './models/user'

export const findById = async function( id ) {
  return await find( { _id : id } )
};

export const findByGoogleId = async function( id ) {
  return await find( { "provider.google" : id  } )
};

const find = async function( filter ) {
  const resp = await DBUser.findOne( filter )
  return {
    id: resp._id, 
    email: resp.email,
    name: resp.name,
    avatar: resp.picture,
  }
};


export const insert = async function( props ) {
  const { name, email, picture, locale, provider={} } = props
  const user = new DBUser()

  user.name = name
  user.email = email
  user.picture = picture
  user.locale = locale
  user.provider.google = provider.google
  user.created = new Date()

  try{
      const resp = await user.save()
      //console.log("USER", "INSERT", resp, user)
  } catch(ex){
    console.log("ERROR", "USER", "INSERT", ex)
    return null
  }

  return user.toObject()
};




