import {request, METHOD} from '@/utils/request'
import {GetVersionInfo,GetVersionList,DeleteVersion,CreateVersion} from '@/services/go_api'

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function getVersionInfo(id) {
  return request(GetVersionInfo, METHOD.GET, {
    id: id
  })
}

export async function getVersionList(pageNum,pageSize,versionNumber,updateContent,forceUpdate,show) {
  return request(GetVersionList, METHOD.POST, {
    pageNum: pageNum,
    pageSize:pageSize,
    versionNumber:versionNumber,
    updateContent:updateContent,
    forceUpdate:forceUpdate,
    show:show
  })
}

export async function deleteVersion(id) {
  return request(DeleteVersion, METHOD.POST, {
    id: id,
  })
}

export async function createVersion(versionNumber,updateContent,forceUpdate,show) {
  return request(CreateVersion, METHOD.POST, {
    versionNumber:versionNumber,
    updateContent:updateContent,
    forceUpdate:forceUpdate,
    show:show
  })
}


export async function updateVersion(id,versionNumber,updateContent,forceUpdate,show) {
  return request(CreateVersion, METHOD.POST, {
    id: id,
    versionNumber:versionNumber,
    updateContent:updateContent,
    forceUpdate:forceUpdate,
    show:show
  })
}


export default {
  getVersionInfo,
  getVersionList,
  deleteVersion,
  createVersion,
  updateVersion
}
