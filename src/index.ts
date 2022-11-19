import { start as serverStart } from 'server/'

async function main(){
  await serverStart()
}

main().catch( ex => console.error(ex))
