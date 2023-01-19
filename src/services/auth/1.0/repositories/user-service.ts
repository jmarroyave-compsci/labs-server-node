import DBUser from './models/user'

export const find = async function( id ) {
  const resp = await DBUser.findOne({ _id : id })
  return resp?.toObject()
};

export const findByGoogleId = async function( id ) {
  const resp = await DBUser.findOne({ "provider.google" : id  })
  return resp?.toObject()
};

export const insert = async function( props ) {
  const { name, email, picture, locale, provider={} } = props
  const user = new DBUser()

  user.name = name
  user.email = email
  user.picture = picture
  user.locale = locale
  user.provider.google = provider.google

  try{
      const resp = await user.save()
      console.log(resp)
  } catch(ex){
    console.log("ERROR", "USER", "INSERT", ex)
    return null
  }

  return user.toObject()
};




