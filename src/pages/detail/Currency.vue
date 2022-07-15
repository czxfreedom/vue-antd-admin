<template>
  <div>
    <a-row :gutter="15">
      <a-form-model ref="elForm" :model="formData" :rules="rules" :label-col="{ span: 3,
      offset: 0 }" :wrapper-col="{ span: 21,
      offset: 0 }" layout="horizontal">
        <a-col :span="20">
          <a-form-model-item label="主链" prop="mainChain">
            <a-select v-model="formData.mainChain" placeholder="请选择下拉选择" allow-clear :style="{width: '20%'}">
              <a-select-option v-for="(item, index) in mainChainOptions" :key="index" :value="item.value"
                :disabled="item.disabled">{{item.label}}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="币种名称" prop="currency">
            <a-input v-model="formData.currency" placeholder="请输入币种名称" :maxLength="20" :style="{width: '20%'}"
              allow-clear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="合约类型" prop="contractType">
            <a-select v-model="formData.contractType" placeholder="请选择下拉选择" allow-clear
              :style="{width: '20%'}">
              <a-select-option v-for="(item, index) in contractTypeOptions" :key="index" :value="item.value"
                :disabled="item.disabled">{{item.label}}</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="合约地址" prop="contractAddress">
            <a-input v-model="formData.contractAddress" placeholder="请输入合约地址" :maxLength="100"
              :style="{width: '60%'}" allow-clear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="币种精度" prop="decimal">
            <a-input v-model="formData.decimal" placeholder="请输入币种精度" :maxLength="100" :style="{width: '20%'}"
              allow-clear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="是否热门" prop="hot">
            <a-radio-group v-model="formData.hot">
              <a-radio v-for="(item, index) in hotOptions" :key="index" :value="item.value"
                :disabled="item.disabled">{{item.label}}</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="22">
          <a-form-model-item label="白皮书" prop="whitePaper">
            <a-input v-model="formData.whitePaper" placeholder="请输入白皮书地址" :maxLength="20"
              :style="{width: '67%'}" allow-clear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="币种官网" prop="website">
            <a-input v-model="formData.website" placeholder="请输入币种官网" :maxLength="20" :style="{width: '60%'}"
              allow-clear></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="24">
          <a-form-model-item label="项目概况" prop="summary">
            <a-textarea v-model="formData.summary" placeholder="请输入项目概况"
              :auto-size="{minRows: 4, maxRows: 10}" :style="{width: '60%'}" allow-clear />
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
export default {
  name:"Currency",
  components: {},
  props: [],
  data() {
    return {
      formData: {
        mainChain: undefined,
        currency: undefined,
        contractType: undefined,
        contractAddress: undefined,
        decimal: undefined,
        hot: 1,
        whitePaper: undefined,
        website: undefined,
        summary: undefined,
        field124: undefined,
      },
      rules: {
        mainChain: [{
          required: true,
          message: '请选择下拉选择',
          trigger: 'change'
        }],
        currency: [{
          required: true,
          message: '请输入币种名称',
          trigger: 'blur'
        }],
        contractType: [{
          required: true,
          message: '请选择下拉选择',
          trigger: 'change'
        }],
        contractAddress: [{
          required: true,
          message: '请输入合约地址',
          trigger: 'blur'
        }],
        decimal: [{
          required: true,
          message: '请输入币种精度',
          trigger: 'blur'
        }],
        hot: [{
          required: true,
          message: '是否热门不能为空',
          trigger: 'change'
        }],
        whitePaper: [{
          required: true,
          message: '请输入白皮书地址',
          trigger: 'blur'
        }],
        website: [{
          required: true,
          message: '请输入币种官网',
          trigger: 'blur'
        }],
        summary: [{
          required: true,
          message: '请输入项目概况',
          trigger: 'blur'
        }],
      },
      mainChainOptions: [{
        "label": "ETH",
        "value": "ETH"
      }, {
        "label": "FIL",
        "value": "FIL"
      }],
      contractTypeOptions: [{
        "label": "ethereum",
        "value": "ethereum"
      }, {
        "label": "tron",
        "value": "tron"
      }, {
        "label": "bscscan",
        "value": "bscscan"
      }, {
        "label": "hecochain",
        "value": "hecochain"
      }, {
        "label": "algorand",
        "value": "algorand"
      }, {
        "label": "solana",
        "value": "solana"
      }, {
        "label": "polygonscan",
        "value": "polygonscan"
      }],
      hotOptions: [{
        "label": "非热门",
        "value": 1
      }, {
        "label": "热门",
        "value": 2
      }],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
  }
}

</script>
<style>
</style>
