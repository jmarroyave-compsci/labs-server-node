import * as fs from 'fs'
import CONFIG from 'common/config'

const servicesRootPath = `${__dirname}/../services`
const resRootPath = `${__dirname}/../res`

export function getMiddlewares(){
  const resp = []

  const middlewareRootPath = `${__dirname}/../server/middleware`

  fs.readdirSync( middlewareRootPath ).sort().forEach( middleware => {

    const f = middleware.split(".ts")[0].replace(/_*/, "")

    if(f.startsWith("-")) return

    resp.push( {
      name: f,
      path: `${middlewareRootPath}/${middleware}`.replace(".ts", ""),
    })
  })

  return resp
}


export async function getServices(){
  const resp = []
  for( const service of fs.readdirSync( servicesRootPath ).sort()){
    if(CONFIG.DEBUG.SERVICES.SKIPPED.includes(service)) continue
    for(const version of fs.readdirSync( `${servicesRootPath}/${service}` ).sort() ){
      resp.push( await getService(service, version) )
    }
  }
  return resp
}

export async function getService( service, version ){
  const servicePath = `${servicesRootPath}/${service}`
  const versionPath = `${servicesRootPath}/${service}/${version}`

  const configPath = `${versionPath}/config/`
  const config = {
    DB : null
  }

  if( classExists( configPath ) ){
    const { DB } = await loadClass(configPath)
    config.DB = DB
  }else{
    console.log( "config doesn't exists", configPath)
  }

  return {
    servicePath : servicePath,
    name: service,
    version: version,
    versionPath: versionPath,
    config : config,
  }
}

export function getResourcePath( resource ){
  return `${resRootPath}/${resource}`; 
}

export async function loadClass( path ){
  if(!classExists(path)){
    throw new Error("path not foud")
  }

  const cl = await import(path)
  return cl
}

export function classExists( path ){
  var tpath = path
  if(path.endsWith("/")){
    tpath += "index" 
  }

  return fs.existsSync(`${tpath}`) || fs.existsSync(`${tpath}.js`) || fs.existsSync(`${tpath}.ts`)
}

export const getFile = function(file){
  if(!fs.existsSync(file)) return ""
  return fs.readFileSync(file).toString()
}

export const fileSearchReplace = function(file, search, replace) {
  const re = new RegExp(search, "g");
  return getFile(file).replace(re, replace);

}
