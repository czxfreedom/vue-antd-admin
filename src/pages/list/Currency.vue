<template>
  <div>
    <a-row :gutter="15">
    <page-header ref="pageHeader" :style="`margin-top:-50px`" >
      <div slot="content" >

        <h1 v-if="this.$route.params.isAdd =='1' && parseInt(this.$route.params.id)>0">编辑币种 </h1>
        <h1 v-else-if="this.$route.params.isAdd =='0' && parseInt(this.$route.params.id)>0">币种详情</h1>
        <h1 v-else>新增币种</h1>

      </div>
      </page-header>

  <a-form-model ref="elForm" :model="formData" :rules="rules"  layout="horizontal">
    <a-col :span="24">
      <a-form-model-item label="主链" prop="mainChain">
        <a-select v-model="formData.mainChain" placeholder="请选择主链" allow-clear :style="{width: '30%'}">
          <a-select-option v-for="(item, index) in mainChainOptions" :key="index" :value="item.value"
            :disabled="item.disabled">{{item.label}}</a-select-option>
        </a-select>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="币种英文名称" prop="currency">
        <a-input v-model="formData.currency" placeholder="请输入币种名称如(ETH)" :style="{width: '100%'}" allow-clear>
        </a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="币种名称" prop="name">
        <a-input v-model="formData.name" placeholder="请输入币种名称(如以太坊)" :style="{width: '100%'}" allow-clear>
        </a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="是否热门" prop="hot">
        <a-radio-group v-model="formData.hot">
          <a-radio v-for="(item, index) in hotOptions" :key="index" :value="item.value"
            :disabled="item.disabled">{{item.label}}</a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="流通状态" prop="status">
        <a-radio-group v-model="formData.status">
          <a-radio v-for="(item, index) in statusOptions" :key="index" :value="item.value"
            :disabled="item.disabled">{{item.label}}</a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="币种精度" prop="decimal">
        <a-input v-model="formData.decimal" placeholder="请输入币种精度"  allow-clear>
        </a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="白皮书" prop="whitePaper">
        <a-input v-model="formData.whitePaper" placeholder="请输入白皮书地址"  allow-clear>
        </a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="币种官网地址" prop="officialWebSite">
        <a-input v-model="formData.officialWebSite" placeholder="请输入币种官网地址" 
          allow-clear></a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="币种总市值($)" prop="usdAllPrice">
        <a-input v-model="formData.usdAllPrice" placeholder="请输入币种总市值"  allow-clear>
        </a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="发行总量" prop="publishTotalNumber">
        <a-input v-model="formData.publishTotalNumber" placeholder="请输入发行总量" 
          allow-clear></a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="发行日期" prop="publishTime">
        <a-date-picker v-model="formData.publishTime" format="YYYY-MM-DD " value-format="YYYY-MM-DD "
          show-time="true"  placeholder="请选择发行日期" allow-clear />
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="eth合约地址" prop="ethereumContract">
        <a-input v-model="formData.ethereumContract" placeholder="请输入eth合约地址" :style="{width: '100%'}"
          allow-clear></a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="tron合约地址" prop="tronContract">
        <a-input v-model="formData.tronContract" placeholder="请输入tron合约地址" :style="{width: '100%'}"
          allow-clear></a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="hecochain合约地址" prop="hecochainContract">
        <a-input v-model="formData.hecochainContract" placeholder="请输入hecochain合约地址" :style="{width: '100%'}"
          allow-clear></a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="bscscan合约地址" prop="bscscanContract">
        <a-input v-model="formData.bscscanContract" placeholder="请输入bscscan合约地址" :style="{width: '100%'}"
          allow-clear></a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="algorand合约地址" prop="algorandContract">
        <a-input v-model="formData.algorandContract" placeholder="请输入algorand合约地址" :style="{width: '100%'}"
          allow-clear></a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="solana合约地址" prop="solanaContract">
        <a-input v-model="formData.solanaContract" placeholder="请输入solana合约地址" :style="{width: '100%'}"
          allow-clear></a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="polygonscan合约地址" prop="polygonscanContract">
        <a-input v-model="formData.polygonscanContract" placeholder="请输入polygonscan合约地址"
          :style="{width: '100%'}" allow-clear></a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="klaytn合约地址" prop="klaytnContract">
        <a-input v-model="formData.klaytnContract" placeholder="请输入klaytn合约地址" :style="{width: '100%'}"
          allow-clear></a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="twitter" prop="twitter">
        <a-input v-model="formData.twitter" placeholder="请输入twitter地址" :style="{width: '100%'}" allow-clear>
        </a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="facebook" prop="facebook">
        <a-input v-model="formData.facebook" placeholder="请输入facebook地址" :style="{width: '100%'}" allow-clear>
        </a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="reddit" prop="reddit">
        <a-input v-model="formData.reddit" placeholder="请输入reddit地址" :style="{width: '100%'}" allow-clear>
        </a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="github" prop="github">
        <a-input v-model="formData.github" placeholder="请输入github地址" :style="{width: '100%'}" allow-clear>
        </a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="12">
      <a-form-model-item label="telegram" prop="telegram">
        <a-input v-model="formData.telegram" placeholder="请输入telegram地址" :style="{width: '100%'}" allow-clear>
        </a-input>
      </a-form-model-item>
    </a-col>
    <a-col :span="24">
      <a-form-model-item label="项目概况" prop="summary">
        <a-textarea v-model="formData.summary" placeholder="请输入项目概况" :auto-size="{minRows: 4, maxRows: 10}"
          :style="{width: '100%'}" allow-clear />
      </a-form-model-item>
    </a-col>
    <a-col :span="24">
      <a-form-model-item :wrapper-col="{ span: 21, offset: 3 }">
        <a-space>
          <a-button type="primary" @click="submitForm">提交</a-button>
          
        </a-space>
      </a-form-model-item>
    </a-col>
  </a-form-model>
</a-row>

  </div>
</template>
<script>
import {getCurrencyInfo,createCurrency,updateCurrency} from '@/services/currency'
import { message } from 'ant-design-vue';
export default {
  name:"Currency",
  components: {},
  props: [],
  data() {
    return {
      formData: {
        mainChain: undefined,
        currency: undefined,
        name: undefined,
        hot: undefined,
        status: "",
        decimal: undefined,
        whitePaper: undefined,
        officialWebSite: undefined,
        usdAllPrice: undefined,
        publishTotalNumber: undefined,
        publishTime: "",
        ethereumContract: undefined,
        tronContract: undefined,
        hecochainContract: undefined,
        bscscanContract: undefined,
        algorandContract: undefined,
        solanaContract: undefined,
        polygonscanContract: undefined,
        klaytnContract: undefined,
        twitter: undefined,
        facebook: undefined,
        reddit: undefined,
        github: undefined,
        telegram: undefined,
        summary: undefined,
      },
      rules: {
        mainChain: [{
          required: true,
          message: '请选择主链',
          trigger: 'change'
        }],
        currency: [{
          required: true,
          message: '请输入币种名称如(ETH)',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入币种名称(如以太坊)',
          trigger: 'blur'
        }],
        hot: [{
          required: true,
          message: '是否热门不能为空',
          trigger: 'change'
        }],
        status: [{
          required: true,
          message: '流通状态不能为空',
          trigger: 'change'
        }],
        decimal: [{
          required: true,
          message: '请输入币种精度',
          trigger: 'blur'
        }],
        whitePaper: [{
          required: true,
          message: '请输入白皮书地址',
          trigger: 'blur'
        }],
        officialWebSite: [],
        usdAllPrice: [{
          required: true,
          message: '请输入币种总市值',
          trigger: 'blur'
        }],
        publishTotalNumber: [{
          required: true,
          message: '请输入发行总量',
          trigger: 'blur'
        }],
        publishTime: [{
          required: true,
          message: '请选择发行日期',
          trigger: 'change'
        }],
        ethereumContract: [],
        tronContract: [],
        hecochainContract: [],
        bscscanContract: [],
        algorandContract: [],
        solanaContract: [],
        polygonscanContract: [],
        klaytnContract: [],
        twitter: [],
        facebook: [],
        reddit: [],
        github: [],
        telegram: [],
        summary: [{
          required: true,
          message: '请输入项目概况',
          trigger: 'blur'
        }],
      },
      mainChainOptions: [{
        "label": "选项一",
        "value": 1
      }, {
        "label": "选项二",
        "value": 2
      }],
      hotOptions: [{
        "label": "非热门",
        "value": 1
      }, {
        "label": "热门",
        "value": 2
      }],
      statusOptions: [{
        "label": "流通中",
        "value": 1
      }, {
        "label": "未流通",
        "value": 2
      }],
    }
  },
  computed: {},
  watch: {},
   created() {
     console.log(this.$route.params.id)
    //id大于0,则查询
    if (this.$route.params.id>0){
      console.log("SDFFSDSFADSDF")      
      this.getDetail(this.$route.params.id)
    }else{
      console.log('xxxxx')
    }
  },
  mounted() {},
  methods: {
    submitForm() {
      console.log("update",this.$route.params)
      if (this.$route.params.id !="0"){     
        this.updateCurrency(this.$route.params.id)
      }else{
        console.log("create currency")
        this.createCurrency()
      }
    },
    
    updateCurrency(id){
      
      updateCurrency(parseInt(id),this.formData.name,this.formData.images,this.formData.currency,this.formData.usdAllPrice,this.formData.globalIndex,this.formData.twentyFourLimit,this.formData.liquidity,this.formData.twentyFourChangeHands,this.formData.twentyFourIncrease,this.formData.publishPrice,this.formData.publishTotalNumber,this.formData.summary,this.formData.officialWebSite,this.formData.chainBrowser,this.formData.whitePaper,this.formData.tronContract,this.formData.hecochainContract,this.formData.bscscanContract,this.formData.algorandContract,this.formData.solanaContract,this.formData.polygonscanContract,this.formData.klaytnContract,this.formData.twitter,this.formData.facebook,this.formData.reddit,this.formData.forum,this.formData.github,this.formData.telegram,this.formData.linkedin,this.formData.biyong,this.formData.weibo,this.formData.rank,this.formData.source,this.formData.status,parseInt(this.formData.decimal),this.formData.hot).then(
       result=>{
         
         if (result.data.status == 0){
              message.success("success")
              this.$closePage(this.$route,"/list/currencys")
          
         }else{
            message.error(result.data.msg)
         }
       }         
      )
    },
    createCurrency(){
      console.log(this.formData,111)
      createCurrency(this.formData.name,this.formData.images,this.formData.currency,this.formData.usdAllPrice,this.formData.globalIndex,this.formData.twentyFourLimit,this.formData.liquidity,this.formData.twentyFourChangeHands,this.formData.twentyFourIncrease,this.formData.publishPrice,this.formData.publishTotalNumber,this.formData.summary,this.formData.officialWebSite,this.formData.chainBrowser,this.formData.whitePaper,this.formData.tronContract,this.formData.hecochainContract,this.formData.bscscanContract,this.formData.algorandContract,this.formData.solanaContract,this.formData.polygonscanContract,this.formData.klaytnContract,this.formData.twitter,this.formData.facebook,this.formData.reddit,this.formData.forum,this.formData.github,this.formData.telegram,this.formData.linkedin,this.formData.biyong,this.formData.weibo,this.formData.rank,this.formData.source,this.formData.status,parseInt(this.formData.decimal),this.formData.hot).then(
       result=>{         
         if (result.data.status == 0){
              message.success("success")
              this.$closePage(this.$route,"/list/currencys")
         }else{
            message.error(result.data.msg)
         }
       }         
      )
    },
    getDetail(id){
        getCurrencyInfo(id).then(result => {
          if (result.data.status == 0){
              var data = result.data.data
              this.formData.name=data.name
              this.formData.name=data.name
              this.formData.images=data.images
              this.formData.currency=data.currency
              this.formData.usdAllPrice=data.usdAllPrice
              this.formData.globalIndex=data.globalIndex
              this.formData.twentyFourLimit=data.twentyFourLimit
              this.formData.liquidity=data.liquidity
              this.formData.twentyFourChangeHands=data.twentyFourChangeHands
              this.formData.twentyFourIncrease=data.twentyFourIncrease
              this.formData.publishPrice=data.publishPrice
              this.formData.publishTotalNumber=data.publishTotalNumber
              this.formData.summary=data.summary
              this.formData.officialWebSite=data.officialWebSite
              this.formData.chainBrowser=data.chainBrowser
              this.formData.whitePaper=data.whitePaper
              this.formData.tronContract=data.tronContract
              this.formData.hecochainContract=data.hecochainContract
              this.formData.bscscanContract=data.bscscanContract
              this.formData.algorandContract=data.algorandContract
              this.formData.solanaContract=data.solanaContract
              this.formData.polygonscanContract=data.polygonscanContract
              this.formData.klaytnContract=data.klaytnContract
              this.formData.twitter=data.twitter
              this.formData.facebook=data.facebook
              this.formData.reddit=data.reddit
              this.formData.forum=data.forum
              this.formData.github=data.github
              this.formData.telegram=data.telegram
              this.formData.linkedin=data.linkedin
              this.formData.biyong=data.biyong
              this.formData.weibo=data.weibo
              this.formData.rank=data.rank
              this.formData.source=data.source
              this.formData.status=data.status
              this.formData.decimal=data.decimal
              this.formData.hot=data.hot
              this.fileList.push({
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url:data.logo,
              })
          }
    })},
  },
  
  
}

</script>
<style>
</style>
