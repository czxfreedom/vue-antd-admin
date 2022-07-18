<template>
    <a-row :gutter="15">
    <page-header ref="pageHeader" :style="`margin-top:-50px`" >
      <div slot="content" >

        <h1 v-if="this.$route.params.isAdd =='1' && parseInt(this.$route.params.id)>0">编辑文章 </h1>
        <h1 v-else-if="this.$route.params.isAdd =='0' && parseInt(this.$route.params.id)>0">文章详情</h1>
        <h1 v-else>新增文章</h1>

      </div>
    </page-header>
    <a-form-model ref="elForm" :model="formData" :rules="rules" :label-col="{ span: 3,
      offset: 0 }" :wrapper-col="{ span: 21,
      offset: 0 }" layout="horizontal">
    <a-col :span="24">
      <a-form-model-item label="文章类型" prop="categoryName">
        <a-input v-model="formData.categoryName" placeholder="请输入文章类型" :style="{width: '30%'}" allow-clear>
        </a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="20">
      <a-form-model-item label="序号" prop="number">
        <a-input v-model="formData.number" placeholder="请输入序号" :style="{width: '39%'}" allow-clear></a-input>
      </a-form-model-item>
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
import {getArticleSettingInfo,createArticleSetting,updateArticleSetting} from '@/services/articleSetting'
import { message } from 'ant-design-vue';
import PageHeader from '@/components/page/header/PageHeader'

export default {
  name:"ArticleSetting",
  components: {PageHeader},
  props: [],
  data() {
    return {
      formData: {
        categoryName: undefined,
        number: undefined,
      },
      rules: {
        categoryName: [{
          required: true,
          message: '请输入文章类型',
          trigger: 'blur'
        }],
        number: [{
          required: true,
          message: '请输入序号',
          trigger: 'blur'
        }],
      },
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
            this.updateArticleSetting(this.$route.params.id)
      }else{
            
            this.createArticleSetting()
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
        getArticleSettingInfo(id).then(result => {
          if (result.data.status == 0){
              var data = result.data.data
              this.formData.categoryName =data.categoryName
              this.formData.id = data.id
              this.formData.number = data.number
          }
         
        })
    },
    updateArticleSetting(id){
      console.log(this.formData,id)
      updateArticleSetting(parseInt(id),this.formData.categoryName,parseInt(this.formData.number)).then(
       result=>{
         
         if (result.data.status == 0){
              message.success("success")
              this.$closePage(this.$route,"/system/articleSettings")
              this.$refreshPage("/system/articleSettings")

         }else{
            message.error(result.data.msg)
         }
       }         
      )
    },
    createArticleSetting(){
      createArticleSetting(this.formData.categoryName,this.formData.id).then(
       result=>{         
         if (result.data.status == 0){
              message.success("success")
              this.$closePage(this.$route,"/system/articleSettings")
              this.$refreshPage("/system/articleSettings")

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
