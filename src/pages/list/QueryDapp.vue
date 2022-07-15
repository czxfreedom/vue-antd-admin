<template>
  <a-card>
     <div :class="advanced ? 'search' : null">
      <a-form layout="horizontal">
        <div :class="advanced ? null: 'fold'">
          <a-row >
          <a-col :md="10" :sm="24" >
            <a-form-item
              label="DAPP 名称"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
            >
              <a-input placeholder="请输入" v-model="name"/>
            </a-form-item>
          </a-col>
          <span> </span>
          <a-col :md="10" :sm="24" >
            <a-form-item
              label="DAPP URL"
              :labelCol="{span: 6}"
              :wrapperCol="{span: 16, offset: 1}"
            >
              <a-input placeholder="请输入" v-model="url"/>
            </a-form-item>
          </a-col>
        </a-row>
          
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="getList(1,20)">查询</a-button>
          <a-button style="margin-left: 8px" @click="reset">重置</a-button>
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
        
        @change="onChange"
        @selectedRowChange="onSelectChange"
      >
      
      <template slot="image-column" slot-scope="{record}">
        <img :src="record.logo" width="30px"/> <!-- Add your custom elements here -->
      </template>
        <div slot="description" slot-scope="{text}">
            {{text}}
        </div>
        <div slot="action" slot-scope="{text, record}">
         
          <router-link :to="`/list/dapp/1/${record.key}`" > 编辑 </router-link>


          <a @click="deleteRecord(record.key)">
            <a-icon type="delete" /> 删除 
          </a>
          <router-link :to="`/list/dapp/0/${record.key}`" > 详情 </router-link>
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
import {getDappList,deleteDapp} from '@/services/dapp'
import { message } from 'ant-design-vue';

const columns = [
  {
    title: '序号',
    dataIndex: 'no'
  },
  {
    title: 'DAPP 名称',
    dataIndex: 'name',
  },
   {
    title: 'DAPP LOGO',
    dataIndex: 'logo',
    scopedSlots: { customRender: "image-column" },
    
   },
   {
    title: 'DAPP 简介',
    dataIndex: 'summary',
  },
  {
    title: 'DAPP URL',
    dataIndex: 'url',
  },
  {
    title: 'DAPP 上架状态',
    dataIndex: 'status',
    // scopedSlots: { customRender: 'action' },
    customRender: (text) => {
    let name=""
    if (text == 1) {
      name ="上架"
    }else if (text==2){
      name ="下架"
    }
    return {
      children: name
    }
  }
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]

const dataSource = []

// for (let i = 0; i < 100; i++) {
//   dataSource.push({
//     key: i,
//     no: 'NO ' + i,
//     description: '这是一段描述',
//     callNo: Math.floor(Math.random() * 1000),
//     status: Math.floor(Math.random() * 10) % 4,
//     updatedAt: '2018-07-26'
//   })
// }

export default {
  name: 'QueryDapp',
  components: {StandardTable},
  data () {
    console.log(111111111)
    return {
      advanced: true,
      columns: columns,
      dataSource: dataSource,
      selectedRows: [],
      url:"",
      name:""
    }
  },
  authorize: {
    deleteRecord: 'delete'
  },
  created () {
    console.log("created")
    this.getList(1,20)
  },
  methods: {
    deleteRecord(id) {
      // this.dataSource = this.dataSource.filter(item => item.key !== key)
      // this.selectedRows = this.selectedRows.filter(item => item.key !== key)
        this.deleteDapp(id)
    },
    reset(){
      this.url=""
      this.name=""
      this.getList(1,20)
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
      this.$router.push('/list/dapp/1/0')
      // this.dataSource.unshift({
      //   key: this.dataSource.length,
      //   no: 'NO ' + this.dataSource.length,
      //   description: '这是一段描述',
      //   callNo: Math.floor(Math.random() * 1000),
      //   status: Math.floor(Math.random() * 10) % 4,
      //   updatedAt: '2018-07-26'
      // })
    },
    trim(s){
      return s.replace(/(^\s*)|(\s*$)/g, "");
    },
    getList(pageNum,pageSize){
        getDappList(pageNum,pageSize,this.trim(this.url),this.trim(this.name)).then(result => {
          this.dataSource=[]
          var list = result.data.data.list
          this.total = result.data.data.total
          console.log(list)
          console.log(this.total)
          for (let i = 0; i < list.length; i++) {
            this.dataSource.push({
              key: list[i].id,
              no: i+1,
              name: list[i].name,
              logo:list[i].logo,
              summary:list[i].summary,
              url:list[i].url,
              status:list[i].status,
              isDeleted:list[i].isDeleted,
              updateTime: list[i].updateTime,
            })
          }
        })
    },
    deleteDapp(id){
      deleteDapp(id).then(result=>{
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
