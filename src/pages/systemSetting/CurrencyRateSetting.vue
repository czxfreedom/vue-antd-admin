<template>
    <a-row :gutter="15">
    <page-header ref="pageHeader" :style="`margin-top:-50px`" >
      <div slot="content" >

        <h1 v-if="this.$route.params.isAdd =='1' && parseInt(this.$route.params.id)>0">编辑货币设置 </h1>
        <h1 v-else-if="this.$route.params.isAdd =='0' && parseInt(this.$route.params.id)>0">货币设置详情</h1>
        <h1 v-else>新增货币设置</h1>

      </div>
    </page-header>
    <a-form-model ref="elForm" :model="formData" :rules="rules" :label-col="{ span: 3,
      offset: 0 }" :wrapper-col="{ span: 21,
      offset: 0 }" layout="horizontal">
    <a-col :span="16">
      <a-form-model-item label="货币单位" prop="currencyUnit">
        <a-input v-model="formData.currencyUnit" placeholder="请输入货币单位" :style="{width: '20%'}" allow-clear>
        </a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="16">
      <a-form-model-item label="货币简写" prop="currency">
        <a-input v-model="formData.currency" placeholder="请输入货币名称" :style="{width: '20%'}" allow-clear>
        </a-input>
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
import {getCurrencyRateSettingInfo,createCurrencyRateSetting,updateCurrencyRateSetting} from '@/services/currencyRateSetting'
import { message } from 'ant-design-vue';
import PageHeader from '@/components/page/header/PageHeader'

export default {
  name:"CurrencyRateSetting",
  components: {PageHeader},
  props: [],
  data(){
    return {
      formData: {
        currencyUnit: undefined,
        currency: undefined,
      },
      rules: {
        currencyUnit: [{
          required: true,
          message: '请输入货币单位',
          trigger: 'blur'
        }],
        currency: [{
          required: true,
          message: '请输入货币名称',
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
            this.updateCurrencyRateSetting(this.$route.params.id)
      }else{
            
            this.createCurrencyRateSetting()
      }
    },
    getDetail(id){
        getCurrencyRateSettingInfo(id).then(result => {
          if (result.data.status == 0){
              var data = result.data.data
              this.formData.currencyUnit =data.currencyUnit
              this.formData.currency = data.currency
          }
         
        })
    },
    updateCurrencyRateSetting(id){
      console.log(this.formData,id)
     
      updateCurrencyRateSetting(parseInt(id),this.formData.currencyUnit,this.formData.currency).then(
       result=>{
         
         if (result.data.status == 0){
              message.success("success")
              this.$closePage(this.$route,"/system/currencyRateSettings")
              this.$refreshPage("/system/currencyRateSettings")
         }else{
            message.error(result.data.msg)
         }
       }         
      )
    },
    createCurrencyRateSetting(){
      createCurrencyRateSetting(this.formData.currencyUnit,this.formData.currency).then(
       result=>{         
         if (result.data.status == 0){
              message.success("success")
              this.$closePage(this.$route,"/list/currencyRateSettings")
              this.$refreshPage("/list/currencyRateSettings")

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
