import { Configuration, OpenAIApi } from 'openai'
import CONFIG from 'common/config'

export const query = async function( props ) {
  const { prompt } = props
  var response;
  try{
    const api = await getAPI()

    //response = await api.listEngines();
    //console.log(response.data)

    response = await api.createChatCompletion({
      model:"gpt-3.5-turbo",
      messages:[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
      ],
    });

    return response.data
  } catch(ex){
    return { error: ex.toString() }
  } 
}

const getAPI = async function() {
  console.log(CONFIG.PLUGINS.OPENAI.KEY)
  const configuration = new Configuration({
    apiKey: CONFIG.PLUGINS.OPENAI.KEY,
  });
  
  return new OpenAIApi(configuration);
}

