import {request, METHOD} from '@/utils/request'
import {GetCurrencyRateSettingInfo,GetCurrencyRateSettingList,DeleteCurrencyRateSetting,CreateCurrencyRateSetting} from '@/services/go_api'

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function getCurrencyRateSettingInfo(id) {
  return request(GetCurrencyRateSettingInfo, METHOD.GET, {
    id: id
  })
}

export async function getCurrencyRateSettingList(pageNum,pageSize) {
  return request(GetCurrencyRateSettingList, METHOD.POST, {
    pageNum: pageNum,
    pageSize:pageSize
  })
}

export async function deleteCurrencyRateSetting(id) {
  return request(DeleteCurrencyRateSetting, METHOD.POST, {
    id: id,
  })
}

export async function createCurrencyRateSetting(currencyUnit,currency) {
  return request(CreateCurrencyRateSetting, METHOD.POST, {
    currencyUnit: currencyUnit,
    currency:currency
  })
}


export async function updateCurrencyRateSetting(id,currencyUnit,currency) {
  return request(CreateCurrencyRateSetting, METHOD.POST, {
    id: id,
    currencyUnit: currencyUnit,
    currency:currency
  })
}


export default {
  getCurrencyRateSettingInfo,
  getCurrencyRateSettingList,
  deleteCurrencyRateSetting,
  createCurrencyRateSetting,
  updateCurrencyRateSetting
}
