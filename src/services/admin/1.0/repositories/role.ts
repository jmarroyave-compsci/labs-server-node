import DBRole from './models/role'

export const findByName = async function( props ) {
  const { name } = props
  //console.log("ROLES", "FIND BY NAME", name)
  const role = await DBRole.findOne( { name: name } )
  //console.log("ROLES", role)
  return role ? role._id : null
};

