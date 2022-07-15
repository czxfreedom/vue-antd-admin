import {request, METHOD} from '@/utils/request'
import {GetArticleSettingInfo,GetArticleSettingList,DeleteArticleSetting,CreateArticleSetting} from '@/services/go_api'

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function getArticleSettingInfo(id) {
  return request(GetArticleSettingInfo, METHOD.GET, {
    id: id
  })
}

export async function getArticleSettingList(pageNum,pageSize) {
  return request(GetArticleSettingList, METHOD.POST, {
    pageNum: pageNum,
    pageSize:pageSize
  })
}

export async function deleteArticleSetting(id) {
  return request(DeleteArticleSetting, METHOD.POST, {
    id: id,
  })
}

export async function createArticleSetting(categoryName,number) {
  return request(CreateArticleSetting, METHOD.POST, {
    categoryName: categoryName,
    number:number
  })
}


export async function updateArticleSetting(id,categoryName,number) {
  return request(CreateArticleSetting, METHOD.POST, {
    id: id,
    categoryName: categoryName,
    number:number
  })
}


export default {
  getArticleSettingInfo,
  getArticleSettingList,
  deleteArticleSetting,
  createArticleSetting,
  updateArticleSetting
}
