import {request, METHOD} from '@/utils/request'
import {GetCurrencyInfo,GetCurrencyList,CreateCurrency,DeleteCurrency} from '@/services/go_api'



export async function getCurrencyInfo(id) {
  return request(GetCurrencyInfo, METHOD.GET, {
    id: id
  })
}

export async function getCurrencyList(pageNum,pageSize,contractType,searchList,hot) {
  return request(GetCurrencyList, METHOD.POST, {
    pageNum: pageNum,
    pageSize:pageSize,
    contractType:contractType,
    searchList:searchList,
    hot:hot,
  })
}

export async function createCurrency(name,images,currency,usdAllPrice,globalIndex,twentyFourLimit,liquidity,twentyFourChangeHands,twentyFourIncrease,publishPrice,publishTotalNumber,summary,officialWebSite,chainBrowser,whitePaper,tronContract,hecochainContract,bscscanContract,algorandContract,solanaContract,polygonscanContract,klaytnContract,twitter,facebook,reddit,forum,github,telegram,linkedin,biyong,weibo,rank,source,status,decimal,hot) {
  return request(CreateCurrency, METHOD.POST, {
    name:name,
    images:images,
    currency:currency,
    usdAllPrice:usdAllPrice,
    globalIndex:globalIndex,
    twentyFourLimit:twentyFourLimit,
    liquidity:liquidity,
    twentyFourChangeHands:twentyFourChangeHands,
    twentyFourIncrease:twentyFourIncrease,
    publishPrice:publishPrice,
    publishTotalNumber:publishTotalNumber,
    summary:summary,
    officialWebSite:officialWebSite,
    chainBrowser:chainBrowser,
    whitePaper:whitePaper,
    tronContract:tronContract,
    hecochainContract:hecochainContract,
    bscscanContract:bscscanContract,
    algorandContract:algorandContract,
    solanaContract:solanaContract,
    polygonscanContract:polygonscanContract,
    klaytnContract:klaytnContract,
    twitter:twitter,
    facebook:facebook,
    reddit:reddit,
    forum:forum,
    github:github,
    telegram:telegram,
    linkedin:linkedin,
    biyong:biyong,
    weibo:weibo,
    rank:rank,
    source:source,
    status:status,
    decimal:decimal,
    hot:hot
  })
}

export async function updateCurrency(id,name,logo,summary,url,status,isDeleted) {
  return request(CreateCurrency, METHOD.POST, {
    id:id,
    name: name,
    logo:logo,
    summary:summary,
    url:url,
    status:status,
    isDeleted:isDeleted
  })
}
export async function deleteCurrency(id) {
  return request(DeleteCurrency, METHOD.POST, {
    id: id
  })
}

export default {
  getCurrencyInfo,
  getCurrencyList,
  createCurrency,
  updateCurrency,
  deleteCurrency,
}
