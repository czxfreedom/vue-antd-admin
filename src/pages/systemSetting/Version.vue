<template>
    <a-row :gutter="15">
    <page-header ref="pageHeader" :style="`margin-top:-50px`" >
      <div slot="content" >

        <h1 v-if="this.$route.params.isAdd =='1' && parseInt(this.$route.params.id)>0">编辑版本 </h1>
        <h1 v-else-if="this.$route.params.isAdd =='0' && parseInt(this.$route.params.id)>0">版本详情</h1>
        <h1 v-else>新增版本</h1>

      </div>
    </page-header>
    <a-form-model ref="elForm" :model="formData" :rules="rules" :label-col="{ span: 3,
      offset: 0 }" :wrapper-col="{ span: 21,
      offset: 0 }" layout="horizontal">
    <a-col :span="16">
      <a-form-model-item label="版本号" prop="versionNumber">
        <a-input v-model="formData.versionNumber" placeholder="请输入版本号" :style="{width: '20%'}" allow-clear>
        </a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="18">
      <a-form-model-item label="更新内容" prop="updateContent">
        <a-textarea v-model="formData.updateContent" placeholder="请输入更新内容"
          :auto-size="{minRows: 4, maxRows: 4}" :style="{width: '50%'}" allow-clear />
      </a-form-model-item>
    </a-col>
    <a-col :span="24">
      <a-form-model-item label="是否强制性更新" prop="forceUpdate">
        <a-select v-model="formData.forceUpdate" placeholder="请选择" allow-clear :style="{width: '15%'}">
          <a-select-option v-for="(item, index) in forceUpdateOptions" :key="index" :value="item.value"
            :disabled="item.disabled">{{item.label}}</a-select-option>
        </a-select>
      </a-form-model-item>
    </a-col>
    <a-col :span="24">
      <a-row type="flex" justify="start" align="bottom">
        <a-col :span="24">
          <a-form-model-item label="APP前端是否显示" prop="show">
            <a-select v-model="formData.show" placeholder="请选择" allow-clear :style="{width: '15%'}">
              <a-select-option v-for="(item, index) in showOptions" :key="index" :value="item.value"
                :disabled="item.disabled">{{item.label}}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-col>
  
      <div v-if="this.$route.params.isAdd =='1'">
      <a-col :span="5">
        <a-form-model-item prop="submit">
          <a-button @click="submit" type="primary" > 提交 </a-button>
        </a-form-model-item>
      </a-col>
      </div>
    </a-form-model>
  </a-row>
  

</template>
<script>
import {getVersionInfo,createVersion,updateVersion} from '@/services/version'
import { message } from 'ant-design-vue';
import PageHeader from '@/components/page/header/PageHeader'

export default {
  name:"Version",
  components: {PageHeader},
  props: [],
  data() {
    return {
      formData: {
        versionNumber: undefined,
        updateContent: undefined,
        forceUpdate: undefined,
        show: undefined,
      },
      rules: {
        versionNumber: [{
          required: true,
          message: '请输入版本号',
          trigger: 'blur'
        }],
        updateContent: [{
          required: true,
          message: '请输入更新内容',
          trigger: 'blur'
        }],
        forceUpdate: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }],
        show: [{
          required: true,
          message: '请选择',
          trigger: 'change'
        }],
      },
      forceUpdateOptions: [{
        "label": "是",
        "value": 1
      }, {
        "label": "否",
        "value": 2
      }],
      showOptions: [{
        "label": "是",
        "value": 1
      }, {
        "label": "否",
        "value": 2
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
            this.updateVersion(this.$route.params.id)
      }else{
            
            this.createVersion()
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
        getVersionInfo(id).then(result => {
          if (result.data.status == 0){
              var data = result.data.data
              this.formData.versionNumber =data.versionNumber
              this.formData.updateContent = data.updateContent
              this.formData.forceUpdate = data.forceUpdate
              this.formData.show = data.show
          }
         
        })
    },
    updateVersion(id){
      console.log(this.formData,id)
      updateVersion(parseInt(id),this.formData.versionNumber,this.formData.updateContent,this.formData.forceUpdate,this.formData.show).then(
       result=>{
         if (result.data.status == 0){
              message.success("success")
              this.$closePage(this.$route,"/system/versions")
              this.$refreshPage("/system/versions")

         }else{
            message.error(result.data.msg)
         }
       }         
      )
    },
    createVersion(){
      createVersion(this.formData.versionNumber,this.formData.updateContent,this.formData.forceUpdate,this.formData.show).then(
       result=>{         
         if (result.data.status == 0){
              message.success("success")
              this.$closePage(this.$route,"/system/versions")
              this.$refreshPage("/system/versions")

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
