<template>
  <div>
    <a-row :gutter="15">
    <page-header ref="pageHeader" :style="`margin-top:-50px`" >
      <div slot="content" >

        <h1 v-if="this.$route.params.isAdd =='1' && parseInt(this.$route.params.id)>0">编辑DAPP </h1>
        <h1 v-else-if="this.$route.params.isAdd =='0' && parseInt(this.$route.params.id)>0">DAPP详情</h1>
        <h1 v-else>新增DAPP</h1>

      </div>
    </page-header>
      <a-form-model ref="elForm" :model="formData" :rules="rules" :label-col="{ span: 3,
      offset: 0 }" :wrapper-col="{ span: 21,
      offset: 0 }" layout="horizontal">
        <a-col :span="24">
          <a-form-model-item label="DAPP名称" prop="name">
            <a-input v-model="formData.name" placeholder="请输入DAPP名称" :maxLength="20" :style="{width: '30%'}"
              allow-clear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="DAPP简介" prop="summary">
            <a-input v-model="formData.summary" placeholder="请输入DAPP简介" :maxLength="100"
              :style="{width: '80%'}" allow-clear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="DAPP URL" prop="url">
            <a-input v-model="formData.url" placeholder="请输入DAPP URL" :maxLength="100" :style="{width: '80%'}"
              allow-clear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="是否上架" prop="status">
            <a-radio-group v-model="formData.status">
              <a-radio v-for="(item, index) in statusOptions" :key="index" :value="item.value"
                :disabled="item.disabled">{{item.label}}</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="20" >
          <a-row type="flex" justify="end" align="top">
            <a-col :span="3">
              <a-form-model-item label="" prop="field116" v-if="!(this.$route.params.isAdd =='0' && parseInt(this.$route.params.id)>0)">
                <a-button type="primary" @click="submit"> 提交 </a-button>
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-col>
      </a-form-model>
    </a-row>
  </div>
</template>
<script>
import {getDappInfo,createDapp,updateDapp} from '@/services/dapp'
import { message } from 'ant-design-vue';

export default {
  name:"DAPP",
  components: {},
  props: [],
  data() {
    return {
      formData: {
        name: undefined,
        summary: undefined,
        url: undefined,
        status: 0,
        logo: "xxx",
        isDeleted:1
      },
      rules: {
        name: [{
          required: true,
          message: '请输入DAPP名称',
          trigger: 'blur'
        }],
        summary: [{
          required: true,
          message: '请输入DAPP简介',
          trigger: 'blur'
        }],
        url: [{
          required: true,
          message: '请输入DAPP URL',
          trigger: 'blur'
        }],
        status: [{
          required: true,
          message: '是否上架不能为空',
          trigger: 'change'
        }],
      },
      statusOptions: [{
        "label": "上架",
        "value": 1
      }, {
        "label": "下架",
        "value": 2
      }],
    }
  },
  computed: {},
  watch: {},
  created() {
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
        this.updateDapp(this.$route.params.id)
      }else{
        this.createDapp()
      }
    },
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
     getDetail(id){
        getDappInfo(id).then(result => {
          if (result.data.status == 0){
              var data = result.data.data
              this.formData.name =data.name
              this.formData.logo = data.logo
              this.formData.summary = data.summary
              this.formData.url = data.url
              this.formData.status = data.status
              this.formData.isDeleted = data.isDeleted
              this.formData.createTime = data.createTime
              this.formData.updateTime = data.updateTime
          }
         
        })
    },
    updateDapp(id){
      console.log(this.formData,id)
      updateDapp(parseInt(id),this.formData.name,this.formData.logo,this.formData.summary,this.formData.url,this.formData.status,this.formData.isDeleted).then(
       result=>{
         
         if (result.data.status == 0){
              message.success("success")
              this.$closePage(this.$route,"/list/dapps")
              
         }else{
            message.error(result.data.msg)
         }
       }         
      )
    },
    createDapp(){
      createDapp(this.formData.name,this.formData.logo,this.formData.summary,this.formData.url,this.formData.status).then(
       result=>{         
         if (result.data.status == 0){
              message.success("success")
              this.$closePage(this.$route,"/list/dapps")
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
