//跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
// const GO_BASE_URL = process.env.GO_API_BASE_URL
const GO_BASE_URL = "http://127.0.0.1:9999"

module.exports = {
  GetArticleInfo: `${GO_BASE_URL}/api/article/info`,
  GetArticleList: `${GO_BASE_URL}/api/article/list`,
  CreateArticle:  `${GO_BASE_URL}/api/article/create`,
  DeleteArticle:  `${GO_BASE_URL}/api/article/delete`,
  GetArticleSettingInfo: `${GO_BASE_URL}/api/articleSetting/info`,
  GetArticleSettingList: `${GO_BASE_URL}/api/articleSetting/list`,
  CreateArticleSetting:  `${GO_BASE_URL}/api/articleSetting/create`,
  DeleteArticleSetting:  `${GO_BASE_URL}/api/articleSetting/delete`,
  GetDappInfo: `${GO_BASE_URL}/api/dapp/info`,
  GetDappList: `${GO_BASE_URL}/api/dapp/list`,
  CreateDapp:  `${GO_BASE_URL}/api/dapp/create`,
  DeleteDapp:  `${GO_BASE_URL}/api/dapp/delete`,
  GetCurrencyRateSettingInfo: `${GO_BASE_URL}/api/currencyRateSetting/info`,
  GetCurrencyRateSettingList: `${GO_BASE_URL}/api/currencyRateSetting/list`,
  CreateCurrencyRateSetting:  `${GO_BASE_URL}/api/currencyRateSetting/create`,
  DeleteCurrencyRateSetting:  `${GO_BASE_URL}/api/currencyRateSetting/delete`,
  GetVersionInfo: `${GO_BASE_URL}/api/version/info`,
  GetVersionList: `${GO_BASE_URL}/api/version/list`,
  CreateVersion:  `${GO_BASE_URL}/api/version/create`,
  DeleteVersion:  `${GO_BASE_URL}/api/version/delete`,
  UploadDApp:  `${GO_BASE_URL}/api/uploadDApp`,
  UploadArticle:  `${GO_BASE_URL}/api/uploadArticle`,
  GetCurrencyInfo: `${GO_BASE_URL}/api/currency/info`,
  GetCurrencyList: `${GO_BASE_URL}/api/currency/list`,
  CreateCurrency:  `${GO_BASE_URL}/api/currency/create`,
  DeleteCurrency:  `${GO_BASE_URL}/api/currency/delete`,
  GetManagementRoleInfo: `${GO_BASE_URL}/api/managementRole/info`,
  GetManagementRoleList: `${GO_BASE_URL}/api/managementRole/list`,
  CreateManagementRole:  `${GO_BASE_URL}/api/managementRole/create`,
  DeleteManagementRole:  `${GO_BASE_URL}/api/managementRole/delete`,
  GetManagementUserInfo: `${GO_BASE_URL}/api/managementUser/info`,
  GetManagementUserList: `${GO_BASE_URL}/api/managementUser/list`,
  CreateManagementUser:  `${GO_BASE_URL}/api/managementUser/create`,
  DeleteManagementUser:  `${GO_BASE_URL}/api/managementUser/delete`,
  ManagementUserLOGIN: `${GO_BASE_URL}/api/managementUser/login`,

}
