import DBComment from 'v2/models/comment';

export const addComment = async function( params ) {
  const model = new DBComment({ 
    text: params.text,
    who: params.who,
    from: params.from,
    when: new Date(),
  })

  model.save()
  return {}
};