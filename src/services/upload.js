import {request, METHOD} from '@/utils/request'
import {UploadDApp,UploadArticle} from '@/services/go_api'



export async function uploadDApp(formData) {
  
  return request(UploadDApp, METHOD.POST, 
    formData
  ,{
    headers:{'Content-Type':'multipart/form-data'}
  })
}
export async function uploadArticle(formData) {
  
  return request(UploadArticle, METHOD.POST, 
    formData
  ,{
    headers:{'Content-Type':'multipart/form-data'}
  })
}

export default {
  uploadDApp,
  uploadArticle
}
