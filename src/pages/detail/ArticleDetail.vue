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
        <a-form-model-item label="文章类型" prop="categoryId">
          <a-select v-model="formData.categoryId" placeholder="请选择下拉选择" allow-clear :style="{width: '20%'}">
            <a-select-option v-for="(item, index) in categoryOptions" :key="index" :value="item.value"
              :disabled="item.disabled">{{item.label}}</a-select-option>
          </a-select>
        </a-form-model-item>
      </a-col>
      <a-col :span="24">
        <a-form-model-item label="文章主题" prop="topic">
          <a-input v-model="formData.topic" placeholder="请输入文章主题" :maxLength="50" :style="{width: '50%'}"
            allow-clear></a-input>
        </a-form-model-item>
      </a-col>
      <a-col :span="24">
        <a-form-model-item label="文章内容" prop="content">
          <a-textarea v-model="formData.content" placeholder="请输入文章内容" :auto-size="{minRows: 4, maxRows: 4}"
            :style="{width: '100%'}" allow-clear />
        </a-form-model-item>
      </a-col>
      <div v-if="this.$route.params.isAdd =='1'">
      <a-col :span="18">
        <a-form-model-item label="上传" prop="upload">
          <a-upload ref="upload" :file-list="uploadfileList" :action="uploadAction"
            :before-upload="uploadBeforeUpload" list-type="picture" accept="image/*">
            <a-button>
              <a-icon type="upload" /> 点击上传图片
            </a-button>
          </a-upload>
        </a-form-model-item>
      </a-col>
      
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
import {getArticleInfo,createArticle,updateArticle} from '@/services/article'
import { message } from 'ant-design-vue';
import PageHeader from '@/components/page/header/PageHeader'

export default {
  name:"ArticleDetail",
  components: {PageHeader},
  props: [],
  data() {
    return {
      formData: {
        categoryId: 1,
        categoryName:"",
        topic: undefined,
        content: undefined,
        isDeleted:undefined,
        upload: null,
        submit: undefined,        
      },
      rules: {
        category: [{
          required: true,
          message: '请选择下拉选择',
          trigger: 'change'
        }],
        topic: [{
          required: true,
          message: '请输入文章主题',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入文章内容',
          trigger: 'blur'
        }],
      },
      uploadAction: 'https://jsonplaceholder.typicode.com/posts/',
      uploadfileList: [],
      categoryOptions: [{
        "label": "新手入门",
        "value": 1
      }, {
        "label": "安全知识",
        "value": 2
      }, {
        "label": "钱包管理",
        "value": 3
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
            this.updateArticle(this.$route.params.id)
      }else{
            
            this.createArticle()
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
        getArticleInfo(id).then(result => {
          if (result.data.status == 0){
              var data = result.data.data
              this.formData.categoryName =data.categoryName
              this.formData.categoryId = data.categoryId
              this.formData.topic = data.topic
              this.formData.content = data.content
              this.formData.isDeleted = data.isDeleted
          }
         
        })
    },
    updateArticle(id){
      console.log(this.formData,id)
      updateArticle(parseInt(id),this.formData.categoryId,this.formData.topic,this.formData.content,this.formData.isDeleted).then(
       result=>{
         
         if (result.data.status == 0){
              message.success("success")
              this.$closePage(this.$route,"/list/articles")
              this.$refreshPage("/list/articles")

         }else{
            message.error(result.data.msg)
         }
       }         
      )
    },
    createArticle(){
      createArticle(this.formData.categoryId,this.formData.topic,this.formData.content).then(
       result=>{         
         if (result.data.status == 0){
              message.success("success")
              this.$closePage(this.$route,"/list/articles")
              this.$refreshPage("/list/articles")

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
