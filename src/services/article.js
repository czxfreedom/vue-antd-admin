import {request, METHOD} from '@/utils/request'
import {GetArticleInfo,GetArticleList,DeleteArticle,CreateArticle} from '@/services/go_api'

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function getArticleInfo(id) {
  return request(GetArticleInfo, METHOD.GET, {
    id: id
  })
}
export async function getArticleList(pageNum,pageSize) {
  return request(GetArticleList, METHOD.POST, {
    pageNum: pageNum,
    pageSize:pageSize
  })
}

export async function deleteArticle(id) {
  return request(DeleteArticle, METHOD.POST, {
    id: id,
  })
}

export async function createArticle(categoryId,topic,content) {
  return request(CreateArticle, METHOD.POST, {
    categoryId: categoryId,
    topic:topic,
    content:content
  })
}


export async function updateArticle(id,categoryId,topic,content,isDeleted) {
  return request(CreateArticle, METHOD.POST, {
    id: id,
    categoryId: categoryId,
    topic:topic,
    content:content,
    isDeleted:isDeleted
  })
}


export default {
  getArticleInfo,
  getArticleList,
  deleteArticle,
  createArticle,
  updateArticle
}
