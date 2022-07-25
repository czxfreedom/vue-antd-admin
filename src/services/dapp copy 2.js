import {request, METHOD} from '@/utils/request'
import {GetDappInfo,GetDappList,CreateDapp,DeleteDapp} from '@/services/go_api'



export async function getDappInfo(id) {
  return request(GetDappInfo, METHOD.GET, {
    id: id
  })
}

export async function getDappList(pageNum,pageSize,url,name) {
  return request(GetDappList, METHOD.POST, {
    pageNum: pageNum,
    pageSize:pageSize,
    url:url,
    name:name,
  })
}

export async function createDapp(name,logo,summary,url,status) {
  return request(CreateDapp, METHOD.POST, {
    name: name,
    logo:logo,
    summary:summary,
    url:url,
    status:status
  })
}

export async function updateDapp(id,name,logo,summary,url,status,isDeleted) {
  return request(CreateDapp, METHOD.POST, {
    id:id,
    name: name,
    logo:logo,
    summary:summary,
    url:url,
    status:status,
    isDeleted:isDeleted
  })
}
export async function deleteDapp(id) {
  return request(DeleteDapp, METHOD.POST, {
    id: id
  })
}

export default {
  getDappInfo,
  getDappList,
  createDapp,
  updateDapp,
  deleteDapp,
}
