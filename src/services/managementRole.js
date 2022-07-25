import {request, METHOD} from '@/utils/request'
import {GetManagementRoleInfo,GetManagementRoleList,CreateManagementRole,DeleteManagementRole} from '@/services/go_api'



export async function getManagementRoleInfo(id) {
  return request(GetManagementRoleInfo, METHOD.GET, {
    id: id
  })
}

export async function getManagementRoleList(pageNum,pageSize,url,name) {
  return request(GetManagementRoleList, METHOD.POST, {
    pageNum: pageNum,
    pageSize:pageSize,
    url:url,
    name:name,
  })
}

export async function createManagementRole(formData) {
  return request(CreateManagementRole, METHOD.POST, {
    name: formData.RoleName,
    authority:JSON.stringify(formData.routerList),
  })
}

export async function updateManagementRole(id,formData) {
  return request(CreateManagementRole, METHOD.POST, {
    id:id,
    name: formData.RoleName,
    authority:JSON.stringify(formData.routerList),
  })
}
export async function deleteManagementRole(id) {
  return request(DeleteManagementRole, METHOD.POST, {
    id: id
  })
}

export default {
  getManagementRoleInfo,
  getManagementRoleList,
  createManagementRole,
  updateManagementRole,
  deleteManagementRole,
}
