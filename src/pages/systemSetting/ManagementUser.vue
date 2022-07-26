<template>
    <a-row :gutter="15">
    <page-header ref="pageHeader" :style="`margin-top:-50px`" >
      <div slot="content" >

        <h1 v-if="this.$route.params.isAdd =='1' && parseInt(this.$route.params.id)>0">编辑管理员 </h1>
        <h1 v-else-if="this.$route.params.isAdd =='0' && parseInt(this.$route.params.id)>0">管理员详情</h1>
        <h1 v-else>新增管理员</h1>

      </div>
    </page-header>
    <a-form-model ref="elForm" :model="formData"  :label-col="{ span: 3,
      offset: 0 }" :wrapper-col="{ span: 21,
      offset: 0 }" layout="horizontal">
    <a-form-model-item label="管理员账号名称" prop="userName">
      <a-input v-model="formData.userName" placeholder="请输入管理员账号名称" :style="{width: '40%'}" allow-clear>
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="登陆密码" prop="password">
      <a-input-password v-model="formData.password" placeholder="请输入登陆密码" :style="{width: '40%'}" allow-clear>
      </a-input-password>
    </a-form-model-item>
    <a-form-model-item label="确认密码" prop="checkPassword">
      <a-input-password v-model="formData.checkPassword" placeholder="请输入确认密码" :style="{width: '40%'}"
        allow-clear></a-input-password>
    </a-form-model-item>
    
      <a-form-model-item label="角色名称"  prop="roleName">
        <a-select v-model="formData.roleId" placeholder="角色名称" allow-clear  :style="{width: '40%'}" @change="handleRoleChange">
          <a-select-option v-for="(item, index) in formData.roleNameList" :key="index" :value="item.value"
            :disabled="item.disabled">{{item.label}}</a-select-option>
        </a-select>
      </a-form-model-item>
    
    <p>--------------------------------------权限----------------------------------------------</p>
    <a-form-model-item label="首页" prop="home">
      <a-checkbox :indeterminate="formData.indeterminateHome" :checked="formData.checkAllHome" @change="onCheckAllChangeHome" disabled>
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.home" @change="onChangeHome" disabled>
        <a-checkbox :indeterminate="formData.indeterminateHome" v-for="(item, index) in watchOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="钱包列表">
      <a-checkbox :indeterminate="formData.indeterminateWallet" :checked="formData.checkAllWallet" @change="onCheckAllChangeWallet" disabled>
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.wallet" @change="onChangeWallet" disabled>
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value" 
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="币种管理" prop="currency">
      <a-checkbox :indeterminate="formData.indeterminateCurrency" :checked="formData.checkAllCurrency" @change="onCheckAllChangeCurrency" disabled>
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.currency"  @change="onChangeCurrency" disabled>
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="节点管理" prop="node">
      <a-checkbox :indeterminate="formData.indeterminateNode" :checked="formData.checkAllNode" @change="onCheckAllChangeNode" disabled>
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.node" @change="onChangeNode" disabled>
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="统计报表" prop="statistics">
      <a-checkbox :indeterminate="formData.indeterminateStatistics" :checked="formData.checkAllStatistics" @change="onCheckAllChangeStatistics" disabled>
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.statistics" @change="onChangeStatistics" disabled>
        <a-checkbox v-for="(item, index) in watchOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="DApp管理" prop="dapp">
      <a-checkbox :indeterminate="formData.indeterminateDapp" :checked="formData.checkAllDapp" @change="onCheckAllChangeDapp" disabled>
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.dapp" @change="onChangeDapp" disabled>
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="反馈列表" prop="routerList.feedback">
      <a-checkbox :indeterminate="formData.indeterminateFeedback" :checked="formData.checkAllFeedback" @change="onCheckAllChangeFeedback" disabled>
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.feedback" @change="onChangeFeedback" disabled>
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="文章管理" prop="article">
      <a-checkbox :indeterminate="formData.indeterminateArticle" :checked="formData.checkAllArticle" @change="onCheckAllChangeArticle" disabled>
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.article" @change="onChangeArticle" disabled>
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value" 
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="文章类型设置" prop="articleSetting">
      <a-checkbox :indeterminate="formData.indeterminateArticleSetting" :checked="formData.checkAllArticleSetting" @change="onCheckAllChangeArticleSetting" disabled>
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.articleSetting" @change="onChangeArticleSetting" disabled>
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="系统管理" prop="system">
      <a-checkbox :indeterminate="formData.indeterminateSystem" :checked="formData.checkAllSystem" @change="onCheckAllChangeSystem" disabled>
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.system" @change="onChangeSystem" disabled> 
        <a-checkbox v-for="(item, index) in watchOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="货币单位设置" prop="currencyRate">
       <a-checkbox :indeterminate="formData.indeterminateCurrencyRate" :checked="formData.checkAllCurrencyRate" @change="onCheckAllChangeCurrencyRate" disabled>
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.currencyRate" @change="onChangeCurrencyRate" disabled>
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="版本更新设置" prop="version">
       <a-checkbox :indeterminate="formData.indeterminateVersion" :checked="formData.checkAllVersion" @change="onCheckAllChangeVersion" disabled>
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.version" @change="onChangeVersion" disabled>
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="角色设置" prop="role">
       <a-checkbox :indeterminate="formData.indeterminateRole" :checked="formData.checkAllRole" @change="onCheckAllChangeRole" disabled>
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.role" @change="onChangeRole" disabled>
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="管理员设置" prop="userSetting">
       <a-checkbox :indeterminate="formData.indeterminateUserSetting" :checked="formData.checkAllUserSetting" @change="onCheckAllChangeUserSetting" disabled>
        全选
      </a-checkbox>
      <a-checkbox-group v-model="formData.routerList.userSetting" @change="onChangeUserSetting" disabled>
        <a-checkbox v-for="(item, index) in commonOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <div v-if="this.$route.params.isAdd =='1'">

      <a-form-model-item :wrapper-col="{ span: 21, offset: 3 }">
        <a-space>
          <a-button type="primary" @click="submitForm">提交</a-button>
        </a-space>
      </a-form-model-item>
    </div>
  
  </a-form-model>

  </a-row>
  

</template>
<script>
import {getManagementRoleInfo,getManagementRoleList} from '@/services/managementRole'
import {getManagementUserInfo,createManagementUser,updateManagementUser} from '@/services/managementUser'

import { message } from 'ant-design-vue';
import PageHeader from '@/components/page/header/PageHeader'

export default {
  name:"ManagementUser",
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
        },
        id : 0,
        userName : undefined,
        password : undefined,
        checkPassword : undefined,
        roleName : undefined,
        roleId :undefined,
        roleNameList:[]
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
    this.getRoleNameList()
    //id大于0,则查询
    if (this.$route.params.id){
      this.getDetail(this.$route.params.id)
      if (this.formData.roleId>0){
        this.getRoleInfo(this.formData.roleId)
      }
    }
    
  },
  mounted() {},
  methods: {
    onChangeWallet() {
      this.formData.indeterminateWallet = !!this.formData.routerList.wallet.length && this.formData.routerList.wallet.length < 4;
      this.formData.checkAllWallet = this.formData.routerList.wallet.length === 4;
      
    },
    onCheckAllChangeWallet(e) {
      
      if (e.target.checked== true){
        this.formData.routerList.wallet =this.allChoiceList
        this.formData.checkAllWallet = e.target.checked
        this.formData.indeterminateWallet = false
       
      }else{
        this.formData.routerList.wallet = []
      
        this.formData.checkAllWallet = e.target.checked
      }
    },
    
    onChangeCurrency() {
      this.formData.indeterminateCurrency = !!this.formData.routerList.currency.length && this.formData.routerList.currency.length < 4;
      this.formData.checkAllCurrency = this.formData.routerList.currency.length === 4;
    },

    onCheckAllChangeCurrency(e) {
      
      if (e.target.checked== true){
        this.formData.routerList.currency =this.allChoiceList
        this.formData.checkAllCurrency = e.target.checked
        this.formData.indeterminateCurrency = false
      }else{
        this.formData.routerList.currency = []
        // this.indeterminate = true
        this.formData.checkAllCurrency = e.target.checked
      }
    },

    onChangeDapp() {
      this.formData.indeterminateDapp = !!this.formData.routerList.dapp.length && this.formData.routerList.dapp.length < 4;
      this.formData.checkAllDapp = this.formData.routerList.dapp.length === 4;
    },

    onCheckAllChangeDapp(e) {
      if (e.target.checked== true){
        this.formData.routerList.dapp =this.allChoiceList
        this.formData.checkAllDapp = e.target.checked
        this.formData.indeterminateDapp = false
      }else{
        this.formData.routerList.dapp = []
        // this.indeterminate = true
        this.formData.checkAllDapp = e.target.checked
      }
    },
    onChangeFeedback() {
      this.formData.indeterminateFeedback = !!this.formData.routerList.feedback.length && this.formData.routerList.feedback.length < 4;
      this.formData.checkAllFeedback = this.formData.routerList.feedback.length === 4;
      
    },
    onCheckAllChangeFeedback(e) {
      
      if (e.target.checked== true){
        this.formData.routerList.feedback =this.allChoiceList
        this.formData.checkAllFeedback = e.target.checked
        this.formData.indeterminateFeedback = false
      }else{
        this.formData.routerList.feedback = []
        // this.indeterminate = true
        this.formData.checkAllFeedback = e.target.checked
      }
    },
    onChangeCurrencyRate() {
      this.formData.indeterminateCurrencyRate = !!this.formData.routerList.currencyRate.length && this.formData.routerList.currencyRate.length < 4;
      this.formData.checkAllCurrencyRate = this.formData.routerList.currencyRate.length === 4;
      
    },
    onCheckAllChangeCurrencyRate(e) {
      
      if (e.target.checked== true){
        this.formData.routerList.currencyRate =this.allChoiceList
        this.formData.checkAllCurrencyRate = e.target.checked
        this.formData.indeterminateCurrencyRate = false
      }else{
        this.formData.routerList.currencyRate = []
        // this.indeterminate = true
        this.formData.checkAllCurrencyRate = e.target.checked
      }
    },
    onChangeVersion() {
      this.formData.indeterminateVersion = !!this.formData.routerList.version.length && this.formData.routerList.version.length < 4;
      this.formData.checkAllVersion = this.formData.routerList.version.length === 4;
     
    },
    onCheckAllChangeVersion(e) {
      
      if (e.target.checked== true){
        this.formData.routerList.version =this.allChoiceList
        this.formData.checkAllVersion = e.target.checked
        this.formData.indeterminateVersion = false
      }else{
        this.formData.routerList.version = []
        // this.indeterminate = true
        this.formData.checkAllVersion = e.target.checked
      }
    },
    onChangeRole() {
      this.formData.indeterminateRole = !!this.formData.routerList.role.length && this.formData.routerList.role.length < 4;
      this.formData.checkAllRole = this.formData.routerList.role.length === 4;
      
    },
    onCheckAllChangeRole(e) {
      
      if (e.target.checked== true){
        this.formData.routerList.role =this.allChoiceList
        this.formData.checkAllRole = e.target.checked
        this.formData.indeterminateRole = false
      }else{
        this.formData.routerList.role = []
        // this.indeterminate = true
        this.formData.checkAllRole = e.target.checked
      }
    },
    

    onChangeUserSetting() {
      this.formData.indeterminateUserSetting = !!this.formData.routerList.userSetting.length && this.formData.routerList.userSetting.length < 4;
      this.formData.checkAllUserSetting = this.formData.routerList.userSetting.length === 4;
      
    },
    onCheckAllChangeUserSetting(e) {
      
      if (e.target.checked== true){
        this.formData.routerList.userSetting =this.allChoiceList
        this.formData.checkAllUserSetting = e.target.checked
        this.formData.indeterminateUserSetting = false
      }else{
        this.formData.routerList.userSetting = []
        // this.indeterminate = true
        this.formData.checkAllUserSetting = e.target.checked
      }
    },


    onChangeArticleSetting() {
      this.formData.indeterminateArticleSetting = !!this.formData.routerList.articleSetting.length && this.formData.routerList.articleSetting.length < 4;
      this.formData.checkAllArticleSetting = this.formData.routerList.articleSetting.length === 4;
      
    },
    onCheckAllChangeArticleSetting(e) {
      
      if (e.target.checked== true){
        this.formData.routerList.articleSetting =this.allChoiceList
        this.formData.checkAllArticleSetting = e.target.checked
        this.formData.indeterminateArticleSetting = false
      }else{
        this.formData.routerList.articleSetting = []
        // this.indeterminate = true
        this.formData.checkAllArticleSetting = e.target.checked
      }
    },

    onChangeArticle() {
      this.formData.indeterminateArticle = !!this.formData.routerList.article.length && this.formData.routerList.article.length < 4;
      this.formData.checkAllArticle = this.formData.routerList.article.length === 4;
      
    },
    onCheckAllChangeArticle(e) {
      
      if (e.target.checked== true){
        this.formData.routerList.article =this.allChoiceList
        this.formData.checkAllArticle = e.target.checked
        this.formData.indeterminateArticle = false
      }else{
        this.formData.routerList.article = []
        // this.indeterminate = true
        this.formData.checkAllArticle = e.target.checked
      }
    },
    onChangeNode() {
      this.formData.indeterminateNode = !!this.formData.routerList.node.length && this.formData.routerList.node.length < 4;
      this.formData.checkAllNode = this.formData.routerList.node.length === 4;
      
    },
    onCheckAllChangeNode(e) {
      
      if (e.target.checked== true){
        this.formData.routerList.node =this.allChoiceList
        this.formData.checkAllNode = e.target.checked
        this.formData.indeterminateNode = false
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
      
      if (e.target.checked== true){
        this.formData.routerList.statistics =this.watchList
        this.formData.checkAllStatistics = e.target.checked
        this.formData.indeterminateStatistics = false
      }else{
        this.formData.routerList.statistics = []
        this.formData.checkAllStatistics = e.target.checked
      }
    },
    handleRoleChange(id){
      console.log(id,523)
      this.getRoleInfo(id)
    },
    
    submitForm() {
     
      //修改
      if (this.$route.params.id){
          this.updateManagementUser(this.$route.params.id)
      }else{
          this.createManagementUser()
      }
    },
    getRoleNameList(){
      getManagementRoleList().then(result=>{
       if (result.data.status == 0){
         
              for (let i = 0, len = result.data.data.list.length; i < len; i++) {
                console.log
                  this.formData.roleNameList.push({
                    "value":result.data.data.list[i].id,
                    "label":result.data.data.list[i].name
                  })
              }
              
          }})
    },
    getRoleInfo(id){
      getManagementRoleInfo(id).then(result => {
          if (result.data.status == 0){
              var data = result.data.data
              this.formData.RoleName =data.name
              const authority = JSON.parse(data.authority)
              for (let i = 0, len = authority.permissions.length; i < len; i++) {
                  var tempData = authority.permissions[i]
                  this.formData.routerList[tempData.id] = tempData.operation
              }
          }
          this.onChangeHome()
          this.onChangeWallet()
          this.onChangeCurrency()
          this.onChangeNode()
          this.onChangeStatistics()
          this.onChangeDapp()
          this.onChangeFeedback()
          this.onChangeArticle()
          this.onChangeArticleSetting()
          this.onChangeSystem()
          this.onChangeCurrencyRate()
          this.onChangeVersion()
          this.onChangeRole()
          this.onChangeUserSetting()
          
        })
    },
    getDetail(id){

        getManagementUserInfo(id).then(result => {
          if (result.data.status == 0){
              var data = result.data.data
              this.formData.id = data.id
              this.formData.userName = data.userName
              this.formData.password = data.password
              this.formData.checkPassword = data.password
              this.formData.roleName = data.roleName
              this.formData.roleId =data.roleId
              console.log('this.formData.roleId',this.formData.roleId)
          }})

        
    },
    updateManagementUser(id){
      
      updateManagementUser(parseInt(id),this.formData.userName,this.formData.password,this.formData.roleId).then(
       result=>{
         
         if (result.data.status == 0){
              message.success("success")
              this.$closePage(this.$route,"/system/ManagementUsers")
              this.$refreshPage("/system/ManagementUsers")

         }else{
            message.error(result.data.msg)
         }
       }         
      )
    },
    createManagementUser(){
      console.log(this.formData)
      createManagementUser(this.formData.userName,this.formData.password,this.formData.roleId).then(
       result=>{         
         if (result.data.status == 0){
              message.success("success")
              this.$closePage(this.$route,"/system/ManagementUsers")
              this.$refreshPage("/system/ManagementUsers")

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
