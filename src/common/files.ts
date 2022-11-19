import * as fs from 'fs'

const servicesRootPath = `${__dirname}/../services`
const resRootPath = `${__dirname}/../res`

export function getServices(){
  const resp = []
  fs.readdirSync( servicesRootPath ).sort().forEach( service => {
    fs.readdirSync( `${servicesRootPath}/${service}` ).sort().forEach( version => {

      resp.push({
        servicePath : `${servicesRootPath}/${service}`,
        name: service,
        version: version,
        versionPath: `${servicesRootPath}/${service}/${version}`,
      })
    })
  })
  return resp
}

export function getResourcesPath(){
  return resRootPath; 
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

  return fs.existsSync(`${tpath}.js`) || fs.existsSync(`${tpath}.ts`)
}

export const fileSearchReplace = function(file, search, replace) {
  const re = new RegExp(search, "g");
  return fs.readFileSync(file).toString().replace(re, replace);

}
