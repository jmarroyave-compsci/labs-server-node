import { invoke } from 'common/service'
import { isAuthenticated } from 'common/security'
import { query as queryOpenAI } from '../repositories/openai'

export async function openAI( query, params, session ) {
  if(await isAuthenticated(session) == false ) return { error : "not authenticated"}

  const resp = await queryOpenAI({ 
    prompt: params.prompt,
  })

  return resp
}

