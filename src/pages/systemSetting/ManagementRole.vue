<template>
    <a-row :gutter="15">
    <page-header ref="pageHeader" :style="`margin-top:-50px`" >
      <div slot="content" >

        <h1 v-if="this.$route.params.isAdd =='1' && parseInt(this.$route.params.id)>0">编辑角色 </h1>
        <h1 v-else-if="this.$route.params.isAdd =='0' && parseInt(this.$route.params.id)>0">角色详情</h1>
        <h1 v-else>新增角色</h1>

      </div>
    </page-header>
    <a-form-model ref="elForm" :model="formData" :label-col="{ span: 3,
      offset: 0 }" :wrapper-col="{ span: 21,
      offset: 0 }" layout="horizontal">
    <a-form-model-item label="角色名称" prop="RoleName">
      <a-input v-model="formData.RoleName" placeholder="请输入角色名称" :style="{width: '40%'}" allow-clear>
      </a-input>
    </a-form-model-item>
    
    <p>--------------------------------------权限----------------------------------------------</p>
    <a-form-model-item label="首页" prop="home">
      <a-checkbox :indeterminate="formData.indeterminateHome" :checked="formData.checkAllHome" @change="onCheckAllChangeHome">
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.home" @change="onChangeHome">
        <a-checkbox :indeterminate="formData.indeterminateHome" v-for="(item, index) in watchOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="钱包列表">
      <a-checkbox :indeterminate="formData.indeterminateWallet" :checked="formData.checkAllWallet" @change="onCheckAllChangeWallet">
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.wallet" @change="onChangeWallet">
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value" 
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="币种管理" prop="currency">
      <a-checkbox :indeterminate="formData.indeterminateCurrency" :checked="formData.checkAllCurrency" @change="onCheckAllChangeCurrency">
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.currency"  @change="onChangeCurrency">
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="节点管理" prop="node">
      <a-checkbox :indeterminate="formData.indeterminateNode" :checked="formData.checkAllNode" @change="onCheckAllChangeNode">
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.node" @change="onChangeNode">
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="统计报表" prop="statistics">
      <a-checkbox :indeterminate="formData.indeterminateStatistics" :checked="formData.checkAllStatistics" @change="onCheckAllChangeStatistics">
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.statistics" @change="onChangeStatistics">
        <a-checkbox v-for="(item, index) in watchOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="DApp管理" prop="dapp">
      <a-checkbox :indeterminate="formData.indeterminateDapp" :checked="formData.checkAllDapp" @change="onCheckAllChangeDapp">
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.dapp" @change="onChangeDapp">
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="反馈列表" prop="routerList.feedback">
      <a-checkbox :indeterminate="formData.indeterminateFeedback" :checked="formData.checkAllFeedback" @change="onCheckAllChangeFeedback">
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.feedback" @change="onChangeFeedback">
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="文章管理" prop="article">
      <a-checkbox :indeterminate="formData.indeterminateArticle" :checked="formData.checkAllArticle" @change="onCheckAllChangeArticle">
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.article" @change="onChangeArticle">
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value" 
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="文章类型设置" prop="articleSetting">
      <a-checkbox :indeterminate="formData.indeterminateArticleSetting" :checked="formData.checkAllArticleSetting" @change="onCheckAllChangeArticleSetting">
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.articleSetting" @change="onChangeArticleSetting">
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="系统管理" prop="system">
      <a-checkbox :indeterminate="formData.indeterminateSystem" :checked="formData.checkAllSystem" @change="onCheckAllChangeSystem">
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.system" @change="onChangeSystem">
        <a-checkbox v-for="(item, index) in watchOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="货币单位设置" prop="currencyRate">
       <a-checkbox :indeterminate="formData.indeterminateCurrencyRate" :checked="formData.checkAllCurrencyRate" @change="onCheckAllChangeCurrencyRate">
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.currencyRate" @change="onChangeCurrencyRate">
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="版本更新设置" prop="version">
       <a-checkbox :indeterminate="formData.indeterminateVersion" :checked="formData.checkAllVersion" @change="onCheckAllChangeVersion">
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.version" @change="onChangeVersion">
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="角色设置" prop="role">
       <a-checkbox :indeterminate="formData.indeterminateRole" :checked="formData.checkAllRole" @change="onCheckAllChangeRole">
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.role" @change="onChangeRole">
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="管理员设置" prop="userSetting">
       <a-checkbox :indeterminate="formData.indeterminateUserSetting" :checked="formData.checkAllUserSetting" @change="onCheckAllChangeUserSetting">
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.userSetting" @change="onChangeUserSetting">
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 21, offset: 3 }">
      <a-space>
        <a-button type="primary" @click="submitForm">提交</a-button>
      </a-space>
    </a-form-model-item>
  </a-form-model>

  </a-row>
  

</template>
<script>
import {getManagementRoleInfo,createManagementRole,updateManagementRole} from '@/services/managementRole'
import { message } from 'ant-design-vue';
import PageHeader from '@/components/page/header/PageHeader'

export default {
  name:"ManagementRole",
  components: {PageHeader},
  props: [],
  data() {
    return {
      
      allChoiceList:["watch","add","delete","edit"],
      watchList:["watch"],
      formData: {
        checkAllWallet: false,
        indeterminateWallet: true,
        checkAllHome:false,
        indeterminateHome: true,
        checkAllCurrency: false,
        indeterminateCurrency: true,
        checkAllNode: false,
        indeterminateNode: true,
        checkAllStatistics: false,
        indeterminateStatistics: true,
        checkAllDapp: false,
        indeterminateDapp: true,
        checkAllFeedback: false,
        indeterminateFeedback: true,
        checkAllArticle: false,
        indeterminateArticle: true,
        checkAllArticleSetting: false,
        indeterminateArticleSetting: true,
        checkAllCurrencyRate: false,
        indeterminateCurrencyRate: true,
        checkAllVersion: false,
        indeterminateVersion: true,
        checkAllRole: false,
        indeterminateRole: true,
        checkAllUserSetting: false,
        indeterminateUserSetting: true,
        checkAllSystem:false,
        indeterminateSystem:true,
        RoleName: undefined,
        routerList:{
          home: [],
          wallet: [],
          currency: [],
          node: [],
          statistics: [],
          dapp: [],
          feedback: [],
          article: [],
          articleSetting: [],
          system: [],
          currencyRate: [],
          version: [],
          role: [],
          userSetting: [],
        }
        
      },
      commonOptions:[{
        "label": "查看",
        "value": "watch"
      }, {
        "label": "新增",
        "value": "add"
      }, {
        "label": "编辑",
        "value": "edit"
      }, {
        "label": "删除",
        "value": "delete"
      }],
      watchOptions:[{
        "label": "查看",
        "value": "watch"
      }],
    }
  },
  computed: {},
  watch: {},
  created() {
    console.log(11111,this.$route.params.id,this.$route.params.isAdd)
    // console.log(11111,this.$router)
    console.log("1111111",this.$route,this.$router)

    //id大于0,则查询
    if (this.$route.params.id){
      this.getDetail(this.$route.params.id)
    }
    
  },
  mounted() {},
  methods: {
    onChangeWallet() {
      this.formData.indeterminateWallet = !!this.formData.routerList.wallet.length && this.formData.routerList.wallet.length < 4;
      this.formData.checkAllWallet = this.formData.routerList.wallet.length === 4;
      console.log(this.formData.indeterminateWallet,this.formData.checkAllWallet,443)
      console.log(this.formData.routerList.wallet,447)
    },
    onCheckAllChangeWallet(e) {
      console.log(e.target.checked,"oncheckall")
      if (e.target.checked== true){
        this.formData.routerList.wallet =this.allChoiceList
        this.formData.checkAllWallet = e.target.checked
        this.indeterminateWallet = false
      }else{
        this.formData.routerList.wallet = []
        // this.indeterminate = true
        this.formData.checkAllWallet = e.target.checked
      }
    },
    onChangeCurrency() {
      this.formData.indeterminateCurrency = !!this.formData.routerList.currency.length && this.formData.routerList.currency.length < 4;
      this.formData.checkAllCurrency = this.formData.routerList.currency.length === 4;
      console.log(this.formData.indeterminateCurrency,this.formData.checkAllCurrency,443)
      console.log(this.formData.routerList.currency,447)
    },
    onCheckAllChangeCurrency(e) {
      console.log(e.target.checked,"oncheckall")
      if (e.target.checked== true){
        this.formData.routerList.currency =this.allChoiceList
        this.formData.checkAllCurrency = e.target.checked
        this.indeterminateCurrency = false
      }else{
        this.formData.routerList.currency = []
        // this.indeterminate = true
        this.formData.checkAllCurrency = e.target.checked
      }
    },
    onChangeDapp() {
      this.formData.indeterminateDapp = !!this.formData.routerList.dapp.length && this.formData.routerList.dapp.length < 4;
      this.formData.checkAllDapp = this.formData.routerList.dapp.length === 4;
      console.log(this.formData.indeterminateDapp,this.formData.checkAllDapp,443)
      console.log(this.formData.routerList.dapp,447)
    },
    onCheckAllChangeDapp(e) {
      console.log(e.target.checked,"oncheckall")
      if (e.target.checked== true){
        this.formData.routerList.dapp =this.allChoiceList
        this.formData.checkAllDapp = e.target.checked
        this.indeterminateDapp = false
      }else{
        this.formData.routerList.dapp = []
        // this.indeterminate = true
        this.formData.checkAllDapp = e.target.checked
      }
    },
    onChangeFeedback() {
      this.formData.indeterminateFeedback = !!this.formData.routerList.feedback.length && this.formData.routerList.feedback.length < 4;
      this.formData.checkAllFeedback = this.formData.routerList.feedback.length === 4;
      console.log(this.formData.indeterminateFeedback,this.formData.checkAllFeedback,443)
      console.log(this.formData.routerList.feedback,447)
    },
    onCheckAllChangeFeedback(e) {
      console.log(e.target.checked,"oncheckall")
      if (e.target.checked== true){
        this.formData.routerList.feedback =this.allChoiceList
        this.formData.checkAllFeedback = e.target.checked
        this.indeterminateFeedback = false
      }else{
        this.formData.routerList.feedback = []
        // this.indeterminate = true
        this.formData.checkAllFeedback = e.target.checked
      }
    },
    onChangeCurrencyRate() {
      this.formData.indeterminateCurrencyRate = !!this.formData.routerList.currencyRate.length && this.formData.routerList.currencyRate.length < 4;
      this.formData.checkAllCurrencyRate = this.formData.routerList.currencyRate.length === 4;
      console.log(this.formData.indeterminateCurrencyRate,this.formData.checkAllCurrencyRate,443)
      console.log(this.formData.routerList.currencyRate,447)
    },
    onCheckAllChangeCurrencyRate(e) {
      console.log(e.target.checked,"oncheckall")
      if (e.target.checked== true){
        this.formData.routerList.currencyRate =this.allChoiceList
        this.formData.checkAllCurrencyRate = e.target.checked
        this.indeterminateCurrencyRate = false
      }else{
        this.formData.routerList.currencyRate = []
        // this.indeterminate = true
        this.formData.checkAllCurrencyRate = e.target.checked
      }
    },
    onChangeVersion() {
      this.formData.indeterminateVersion = !!this.formData.routerList.version.length && this.formData.routerList.version.length < 4;
      this.formData.checkAllVersion = this.formData.routerList.version.length === 4;
      console.log(this.formData.indeterminateVersion,this.formData.checkAllVersion,443)
      console.log(this.formData.routerList.version,447)
    },
    onCheckAllChangeVersion(e) {
      console.log(e.target.checked,"oncheckall")
      if (e.target.checked== true){
        this.formData.routerList.version =this.allChoiceList
        this.formData.checkAllVersion = e.target.checked
        this.indeterminateVersion = false
      }else{
        this.formData.routerList.version = []
        // this.indeterminate = true
        this.formData.checkAllVersion = e.target.checked
      }
    },
    onChangeRole() {
      this.formData.indeterminateRole = !!this.formData.routerList.role.length && this.formData.routerList.role.length < 4;
      this.formData.checkAllRole = this.formData.routerList.role.length === 4;
      console.log(this.formData.indeterminateRole,this.formData.checkAllRole,443)
      console.log(this.formData.routerList.role,447)
    },
    onCheckAllChangeRole(e) {
      console.log(e.target.checked,"oncheckall")
      if (e.target.checked== true){
        this.formData.routerList.role =this.allChoiceList
        this.formData.checkAllRole = e.target.checked
        this.indeterminateRole = false
      }else{
        this.formData.routerList.role = []
        // this.indeterminate = true
        this.formData.checkAllRole = e.target.checked
      }
    },
    

    onChangeUserSetting() {
      this.formData.indeterminateUserSetting = !!this.formData.routerList.userSetting.length && this.formData.routerList.userSetting.length < 4;
      this.formData.checkAllUserSetting = this.formData.routerList.userSetting.length === 4;
      console.log(this.formData.indeterminateUserSetting,this.formData.checkAllUserSetting,443)
      console.log(this.formData.routerList.userSetting,447)
    },
    onCheckAllChangeUserSetting(e) {
      console.log(e.target.checked,"oncheckall")
      if (e.target.checked== true){
        this.formData.routerList.userSetting =this.allChoiceList
        this.formData.checkAllUserSetting = e.target.checked
        this.indeterminateUserSetting = false
      }else{
        this.formData.routerList.userSetting = []
        // this.indeterminate = true
        this.formData.checkAllUserSetting = e.target.checked
      }
    },


    onChangeArticleSetting() {
      this.formData.indeterminateArticleSetting = !!this.formData.routerList.articleSetting.length && this.formData.routerList.articleSetting.length < 4;
      this.formData.checkAllArticleSetting = this.formData.routerList.articleSetting.length === 4;
      console.log(this.formData.indeterminateArticleSetting,this.formData.checkAllArticleSetting,443)
      console.log(this.formData.routerList.articleSetting,447)
    },
    onCheckAllChangeArticleSetting(e) {
      console.log(e.target.checked,"oncheckall")
      if (e.target.checked== true){
        this.formData.routerList.articleSetting =this.allChoiceList
        this.formData.checkAllArticleSetting = e.target.checked
        this.indeterminateArticleSetting = false
      }else{
        this.formData.routerList.articleSetting = []
        // this.indeterminate = true
        this.formData.checkAllArticleSetting = e.target.checked
      }
    },

    onChangeArticle() {
      this.formData.indeterminateArticle = !!this.formData.routerList.article.length && this.formData.routerList.article.length < 4;
      this.formData.checkAllArticle = this.formData.routerList.article.length === 4;
      console.log(this.formData.indeterminateArticle,this.formData.checkAllArticle,443)
      console.log(this.formData.routerList.article,447)
    },
    onCheckAllChangeArticle(e) {
      console.log(e.target.checked,"oncheckall")
      if (e.target.checked== true){
        this.formData.routerList.article =this.allChoiceList
        this.formData.checkAllArticle = e.target.checked
        this.indeterminateArticle = false
      }else{
        this.formData.routerList.article = []
        // this.indeterminate = true
        this.formData.checkAllArticle = e.target.checked
      }
    },
    onChangeNode() {
      this.formData.indeterminateNode = !!this.formData.routerList.node.length && this.formData.routerList.node.length < 4;
      this.formData.checkAllNode = this.formData.routerList.node.length === 4;
      console.log(this.formData.indeterminateNode,this.formData.checkAllNode,443)
      console.log(this.formData.routerList.node,447)
    },
    onCheckAllChangeNode(e) {
      console.log(e.target.checked,"oncheckall")
      if (e.target.checked== true){
        this.formData.routerList.node =this.allChoiceList
        this.formData.checkAllNode = e.target.checked
        this.indeterminateNode = false
      }else{
        this.formData.routerList.node = []
        // this.indeterminate = true
        this.formData.checkAllNode = e.target.checked
      }
    },
    onChangeSystem() {
      this.formData.indeterminateSystem = !!this.formData.routerList.system.length && this.formData.routerList.system.length < 1;
      this.formData.checkAllSystem = this.formData.routerList.system.length === 1;
    },
    onCheckAllChangeSystem(e) {
      console.log(e.target.checked,"oncheckall")
      if (e.target.checked== true){
        this.formData.routerList.system =this.watchList
        this.formData.checkAllSystem = e.target.checked
        this.formData.indeterminateSystem = false
      }else{
        this.formData.routerList.system = []
        this.formData.checkAllSystem = e.target.checked
      }
    },
    onChangeHome() {
      this.formData.indeterminateHome = !!this.formData.routerList.home.length && this.formData.routerList.home.length < 1;
      this.formData.checkAllHome = this.formData.routerList.home.length === 1;
    },
    onCheckAllChangeHome(e) {
      console.log(e.target.checked,"oncheckall")
      if (e.target.checked== true){
        this.formData.routerList.home =this.watchList
        this.formData.checkAllHome = e.target.checked
        this.formData.indeterminateHome = false
      }else{
        this.formData.routerList.home = []
        this.formData.checkAllHome = e.target.checked
      }
    },
    onChangeStatistics() {
      this.formData.indeterminateStatistics = !!this.formData.routerList.statistics.length && this.formData.routerList.statistics.length < 1;
      this.formData.checkAllStatistics = this.formData.routerList.statistics.length === 1;
    },
    onCheckAllChangeStatistics(e) {
      console.log(e.target.checked,"oncheckall")
      if (e.target.checked== true){
        this.formData.routerList.statistics =this.watchList
        this.formData.checkAllStatistics = e.target.checked
        this.formData.indeterminateStatistics = false
      }else{
        this.formData.routerList.statistics = []
        this.formData.checkAllStatistics = e.target.checked
      }
    },
    submitForm() {
      console.log("1111111",this.$route,this.$router)
      // this.$refs['elForm'].validate(valid => {
      //   if (!valid) return
      // })
      //修改
      if (this.$route.params.id){
            // console.log("1111111222")
            this.updateManagementRole(this.$route.params.id)
      }else{
            
            this.createManagementRole()
      }
    },
    
    getDetail(id){
        getManagementRoleInfo(id).then(result => {
          if (result.data.status == 0){
              var data = result.data.data
              this.formData.categoryName =data.categoryName
              this.formData.id = data.id
              this.formData.number = data.number
          }
         
        })
    },
    updateManagementRole(id){
      console.log(this.formData,id)
      updateManagementRole(parseInt(id),this.formData).then(
       result=>{
         
         if (result.data.status == 0){
              message.success("success")
              this.$closePage(this.$route,"/system/ManagementRoles")
              this.$refreshPage("/system/ManagementRoles")

         }else{
            message.error(result.data.msg)
         }
       }         
      )
    },
    createManagementRole(){
      console.log(this.formData)
      createManagementRole(this.formData,this.formData.id).then(
       result=>{         
         if (result.data.status == 0){
              message.success("success")
              this.$closePage(this.$route,"/system/ManagementRoles")
              this.$refreshPage("/system/ManagementRoles")

         }else{
            message.error(result.data.msg)
         }
       }         
      )
    }
  }
}

</script>
<style>
</style>
