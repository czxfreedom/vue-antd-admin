import {request, METHOD} from '@/utils/request'
import {GetManagementUserInfo,GetManagementUserList,CreateManagementUser,DeleteManagementUser} from '@/services/go_api'



export async function getManagementUserInfo(id) {
  return request(GetManagementUserInfo, METHOD.GET, {
    id: id
  })
}

export async function getManagementUserList(pageNum,pageSize) {
  return request(GetManagementUserList, METHOD.POST, {
    pageNum: pageNum,
    pageSize:pageSize,
  })
}

export async function createManagementUser(userName,password,roleId) {
  return request(CreateManagementUser, METHOD.POST, {
    userName: userName,
    password:password,
    roleId:roleId
  })
}

export async function updateManagementUser(id,userName,password,roleId) {
  return request(CreateManagementUser, METHOD.POST, {
    id:id,
    userName: userName,
    password:password,
    roleId:roleId
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
