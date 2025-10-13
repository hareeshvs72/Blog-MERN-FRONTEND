import axios from 'axios'

const CommonAPi = async (httpMethod , url , reqBody , reqHeader)=>{
  const requestConfig = {
    method : httpMethod ,
    url,
    data:reqBody,
    headers:reqHeader ? reqHeader : {}

  } 
  return await axios(requestConfig).then(res=>{
    return res
  }).catch(err=>{
    return err
  })
}

export default CommonAPi