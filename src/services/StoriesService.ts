import DBPerson from '../models/person';
import DBPodcast from '../models/podcast';


export const getMusicPodcasts = async function( params ) {
  const qry = { category: "music" };
  const project = "title  id  image  link -_id";
  const size = 10;

  const data =  await DBPodcast.find( qry, project ).limit(size);
  if(!data) return [];

  return data;
};



export const oscarsGet = async function( params ) {
  const resp = [];
  const f2 = { profession : "actress"  }

  console.log("empieza")

  const data =  await DBPerson.findOne( f2 ).limit(1).sort({ created: -1 });

  console.log("done")
  console.log(data);

  if(!data) return resp;

  data.map( d => {
    resp.push( {
      name: d.name,
      year: 2005,
    })
  })

  return resp;
};

