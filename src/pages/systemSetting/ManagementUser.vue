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
    <a-form-model-item label="角色名称" prop="roleName">
      <a-input v-model="formData.roleName" placeholder="请输入角色名称" :style="{width: '40%'}" allow-clear></a-input>
    </a-form-model-item>
    <p>权限------------------------------------------------------------------------------------</p>
    <a-form-model-item label="首页" prop="home">
      <a-checkbox-group v-model="formData.home">
        <a-checkbox v-for="(item, index) in homeOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="钱包列表" prop="walletList">
      <a-checkbox-group v-model="formData.walletList">
        <a-checkbox v-for="(item, index) in walletListOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="币种管理" prop="currency">
      <a-checkbox-group v-model="formData.currency">
        <a-checkbox v-for="(item, index) in currencyOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="节点管理" prop="node">
      <a-checkbox-group v-model="formData.node">
        <a-checkbox v-for="(item, index) in nodeOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="统计报表" prop="statistics">
      <a-checkbox-group v-model="formData.statistics">
        <a-checkbox v-for="(item, index) in statisticsOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="DApp管理" prop="dapp">
      <a-checkbox-group v-model="formData.dapp">
        <a-checkbox v-for="(item, index) in dappOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="反馈列表" prop="feedbackList">
      <a-checkbox-group v-model="formData.feedbackList">
        <a-checkbox v-for="(item, index) in feedbackListOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="文章管理" prop="article">
      <a-checkbox-group v-model="formData.article">
        <a-checkbox v-for="(item, index) in articleOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="管理员类型设置" prop="articleSetting">
      <a-checkbox-group v-model="formData.articleSetting">
        <a-checkbox v-for="(item, index) in articleSettingOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="系统管理" prop="system">
      <a-checkbox-group v-model="formData.system">
        <a-checkbox v-for="(item, index) in systemOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="货币单位设置" prop="currencyRate">
      <a-checkbox-group v-model="formData.currencyRate">
        <a-checkbox v-for="(item, index) in currencyRateOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="版本更新设置" prop="version">
      <a-checkbox-group v-model="formData.version">
        <a-checkbox v-for="(item, index) in versionOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="角色设置" prop="role">
      <a-checkbox-group v-model="formData.role">
        <a-checkbox v-for="(item, index) in roleOptions" :key="index" :value="item.value"
          :disabled="item.disabled">{{item.label}}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="管理员设置" prop="user">
      <a-checkbox-group v-model="formData.user">
        <a-checkbox v-for="(item, index) in userOptions" :key="index" :value="item.value"
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
import {getManagementUserInfo,createManagementUser,updateManagementUser} from '@/services/managementUser'
import { message } from 'ant-design-vue';
import PageHeader from '@/components/page/header/PageHeader'

export default {
  name:"ManagementUser",
  components: {PageHeader},
  props: [],
  data() {
    return {
      formData: {
        userName: undefined,
        password: undefined,
        checkPassword: undefined,
        roleName: undefined,
        home: [],
        walletList: [],
        currency: [],
        node: [],
        statistics: [],
        dapp: [],
        feedbackList: [],
        article: [],
        articleSetting: [],
        system: [],
        currencyRate: [],
        version: [],
        role: [],
        user: [],
      },
      homeOptions: [{
        "label": "全选",
        "value": "all"
      }, {
        "label": "查看",
        "value": "watch"
      }],
      walletListOptions: [{
        "label": "全选",
        "value": "all"
      }, {
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
      currencyOptions: [{
        "label": "全选",
        "value": "all"
      }, {
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
      nodeOptions: [{
        "label": "全选",
        "value": "all"
      }, {
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
      statisticsOptions: [{
        "label": "全选",
        "value": "all"
      }, {
        "label": "查看",
        "value": "watch"
      }],
      dappOptions: [{
        "label": "全选",
        "value": "all"
      }, {
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
      feedbackListOptions: [{
        "label": "全选",
        "value": "all"
      }, {
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
      articleOptions: [{
        "label": "全选",
        "value": "all"
      }, {
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
      articleSettingOptions: [{
        "label": "全选",
        "value": "all"
      }, {
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
      systemOptions: [{
        "label": "全选",
        "value": "all"
      }, {
        "label": "查看",
        "value": "watch"
      }],
      currencyRateOptions: [{
        "label": "全选",
        "value": "all"
      }, {
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
      versionOptions: [{
        "label": "全选",
        "value": "all"
      }, {
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
      roleOptions: [{
        "label": "全选",
        "value": "all"
      }, {
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
      userOptions: [{
        "label": "全选",
        "value": "all"
      }, {
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
    submit() {
      console.log("1111111",this.$route,this.$router)
      // this.$refs['elForm'].validate(valid => {
      //   if (!valid) return
      // })
      //修改
      if (this.$route.params.id){
            
            // console.log("1111111222")
            this.updateManagementUser(this.$route.params.id)
      }else{
            
            this.createManagementUser()
      }
    },
    uploadBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      let isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择此类型文件:image/*')
      }
      return isRightSize && isAccept
    },
    getDetail(id){
        getManagementUserInfo(id).then(result => {
          if (result.data.status == 0){
              var data = result.data.data
              this.formData.categoryName =data.categoryName
              this.formData.id = data.id
              this.formData.userName = data.userName
              this.formData.password = data.password
              this.formData.checkPassword = data.password
              this.formData.roleName = data.roleName
          }
         
        })
    },
    updateManagementUser(id){
      console.log(this.formData,id)
      updateManagementUser(parseInt(id),this.formData.categoryName,parseInt(this.formData.number)).then(
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
      createManagementUser(this.formData.categoryName,this.formData.id).then(
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
