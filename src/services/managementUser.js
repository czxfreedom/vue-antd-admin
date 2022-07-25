import {request, METHOD} from '@/utils/request'
import {GetManagementUserInfo,GetManagementUserList,CreateManagementUser,DeleteManagementUser} from '@/services/go_api'



export async function getManagementUserInfo(id) {
  return request(GetManagementUserInfo, METHOD.GET, {
    id: id
  })
}

export async function getManagementUserList(pageNum,pageSize,url,name) {
  return request(GetManagementUserList, METHOD.POST, {
    pageNum: pageNum,
    pageSize:pageSize,
    url:url,
    name:name,
  })
}

export async function createManagementUser(name,logo,summary,url,status) {
  return request(CreateManagementUser, METHOD.POST, {
    name: name,
    logo:logo,
    summary:summary,
    url:url,
    status:status
  })
}

export async function updateManagementUser(id,name,logo,summary,url,status,isDeleted) {
  return request(CreateManagementUser, METHOD.POST, {
    id:id,
    name: name,
    logo:logo,
    summary:summary,
    url:url,
    status:status,
    isDeleted:isDeleted
  })
}
export async function deleteManagementUser(id) {
  return request(DeleteManagementUser, METHOD.POST, {
    id: id
  })
}

export default {
  getManagementUserInfo,
  getManagementUserList,
  createManagementUser,
  updateManagementUser,
  deleteManagementUser,
}
