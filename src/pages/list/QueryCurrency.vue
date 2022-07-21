<template>
  <a-card>
    <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal">
        <div :class="advanced ? null: 'fold'">
          <a-row >
          
          <a-col :md="5" :sm="24">
            <a-form-model-item label="合约类型" :labelCol="{span: 6}"
              :wrapperCol="{span: 10}" prop="contractType">
              <a-select v-model="formData.contractType" placeholder="请选择合约类型" allow-clear >
                <a-select-option v-for="(item, index) in contractTypeOptions" :key="index" :value="item.value"
                  :disabled="item.disabled">{{item.label}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :md="13" :sm="24" >
            <a-form-item
              label="币种或合约地址"
              :labelCol="{span: 10}"
              :wrapperCol="{span: 13}" prop="data"
            >
              <a-input placeholder="请输入合约地址或币种名" v-model="formData.data"/>
            </a-form-item>
          </a-col>
          <!-- <a-col :md="5" >
            <a-form-model-item label="是否热门" prop="hot" :labelCol="{span: 10}"
              :wrapperCol="{span: 13}" >
              <a-select v-model="formData.hot" placeholder="全部" allow-clear >
                <a-select-option v-for="(item, index) in hotOptions" :key="index" :value="item.value"
                  :disabled="item.disabled">{{item.label}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col> -->
        </a-row>
          
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="getList(1,20)">查询</a-button>
          <a @click="toggleAdvanced" style="margin-left: 8px">
            {{advanced ? '收起' : '展开'}}
            <a-icon :type="advanced ? 'up' : 'down'" />
          </a>
        </span>
      </a-form>
    </div>
    <div>
      <a-space class="operator">
        <a-button @click="addNew" type="primary">新建</a-button>
      </a-space>
      <standard-table
        :columns="columns"
        :dataSource="dataSource"
        :pagination = "pagination"

        @change="onChange"
        @selectedRowChange="onSelectChange"
      >
      <template slot="image-column" slot-scope="{record}">
        <img :src="record.images" width="30px"/> <!-- Add your custom elements here -->
      </template>
        <div slot="description" slot-scope="{text}">
          {{text}}
        </div>
        <div slot="action" slot-scope="{text, record}">
         
          <router-link :to="`/list/currency/1/${record.key}`" > 编辑 </router-link>

          <a @click="deleteRecord(record.key)">
            <a-icon type="delete" /> 删除 
          </a>
          <router-link :to="`/list/currency/0/${record.key}`" > 详情 </router-link>
        </div>
        <template slot="statusTitle">
          <a-icon @click.native="onStatusTitleClick" type="info-circle" />
        </template>
      </standard-table>
    </div>
  </a-card>
</template>

<script>
import StandardTable from '@/components/table/StandardTable'
import {getCurrencyList,deleteCurrency} from '@/services/currency'
import { message } from 'ant-design-vue';

const columns = [
  {
    title: '序号',
    dataIndex: 'no'
  },
  {
    title: '币种名称',
    dataIndex: 'currency',
  },
   {
    title: '币种Logo',
    dataIndex: 'images',
    scopedSlots: { customRender: "image-column" },
  },
   {
    title: '合约地址',
    dataIndex: 'contractAddress',
  },
  {
    title: '官网URL',
    dataIndex: 'officialWebsite',
  },
  // {
  //   title: '白皮书',
  //   dataIndex: 'whitePaper',
  // },
  {
    title: '热门',
    dataIndex: 'hot',
     customRender: (text) => {
    let name=""
    if (text == 1) {
      name ="非热门"
    }else if (text==2){
      name ="热门"
    }
    return {
      children: name
    }
  }
  },
  {
    title: '精度',
    dataIndex: 'decimal',
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]

const dataSource = []


export default {
  name: 'QueryCurrency',
  components: {StandardTable},
  data () {
    console.log(111111111)
    return {
      advanced: false,
      columns: columns,
      dataSource: dataSource,
      selectedRows: [],
      formData:{
        data:"",
        contractType:"ethereum",
        hot:0,
      },
      rules: {
        hot: [{
          required: true,
          message: '请选择热门类型',
          trigger: 'change'
        }],
        currency: [{
          required: true,
          message: '请输入币种名称',
          trigger: 'blur'
        }],
        contractType: [{
          required: true,
          message: '请选择合约类型',
          trigger: 'change'
        }],
        contractAddress: [{
          required: true,
          message: '请输入合约地址',
          trigger: 'blur'
        }],
      },
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
        "label": "全部",
        "value": 0
      }, {
        "label": "热门",
        "value": 2
      }, {
        "label": "非热门",
        "value": 1
      }],
      pagination:{
            current: 1,
            pageSize: 20,
            showSizeChanger: true,
            total: this.total,
            pageSizeOptions: ['5', '10', '20', '30', '50'],
            showTotal: (total) => `共 ${total} 条数据`,
            onShowSizeChange: this.pageSizeChange,
            onChange: this.pageChange,
            }
    }
  },
  authorize: {
    deleteRecord: 'delete'
  },
  created () {
    console.log("created")
    this.getList( this.pagination.current,this.pagination.pageSize)
  },
  methods: {
    pageSizeChange(pageNum, pageSize) {
      console.log(pageNum,pageSize,"pageSizeChange")
      this.loading = true
      this.pagination.pageSize = pageSize
      this.pagination.current = pageNum
      this.getList(pageNum,pageSize)
    },
    pageChange(pageNum, pageSize) {
      console.log(pageNum,pageSize,"pageChange")
      this.loading = true
      this.pagination.current = pageNum
      this.pagination.pageSize= pageSize
      this.getList(pageNum,pageSize)
    },

    deleteRecord(id) {
      // this.dataSource = this.dataSource.filter(item => item.key !== key)
      // this.selectedRows = this.selectedRows.filter(item => item.key !== key)
        this.deleteCurrency(id)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onClear() {
      // this.$message.info('您清空了勾选的所有行')
    },
    onStatusTitleClick() {
      // this.$message.info('你点击了状态栏表头')
    },
    onChange() {
      
      // this.$message.info('表格状态改变了')
    },
    onSelectChange() {
      // this.$message.info('选中行改变了')
    },
    addNew () {
      this.$router.push('/list/currency/1/0')
      // this.dataSource.unshift({
      //   key: this.dataSource.length,
      //   no: 'NO ' + this.dataSource.length,
      //   description: '这是一段描述',
      //   callNo: Math.floor(Math.random() * 1000),
      //   status: Math.floor(Math.random() * 10) % 4,
      //   updatedAt: '2018-07-26'
      // })
    },
    getList(page,pageNumber){
        var searchList = [this.formData.data];
        
        getCurrencyList(page,pageNumber,this.formData.contractType,searchList,this.formData.hot).then(result => {
          this.dataSource = []
          var list = result.data.data.list
          this.total = result.data.data.total
          this.pagination.total = this.total
          for (let i = 0; i < list.length; i++) {
            console.log(list[i].id)
            this.dataSource.push({
              key: list[i].id,
              no: i+1,
              currency: list[i].currency,
              images:list[i].images,
              contractAddress: list[i].contractAddress,
              hot:list[i].hot,
              whitePaper:list[i].whitePaper,
              decimal:list[i].decimal,
              updateTime: list[i].updateTime,
              officialWebsite:list[i].officialWebsite
            })
          }
        })
    },
    deleteCurrency(id){
      deleteCurrency(id).then(result=>{
        if (result.data.status == 0){
            message.success("success");
        }else{
            message.error(result.data.msg);
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .search{
    margin-bottom: 54px;
  }
  .fold{
    width: calc(100% - 216px);
    display: inline-block
  }
  .operator{
    margin-bottom: 18px;
  }
  @media screen and (max-width: 900px) {
    .fold {
      width: 100%;
    }
  }
</style>
