<template>
  <a-card>
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
        <div slot="description" slot-scope="{text}">
          {{text}}
        </div>
        <div slot="action" slot-scope="{text, record}">
         
          <router-link :to="`/list/article/1/${record.key}`" > 编辑 </router-link>


          <a @click="deleteRecord(record.key)">
            <a-icon type="delete" /> 删除 
          </a>
          <router-link :to="`/list/article/0/${record.key}`" > 详情 </router-link>
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
import {getArticleList,deleteArticle} from '@/services/article'
import { message } from 'ant-design-vue';

const columns = [
  {
    title: '序号',
    dataIndex: 'no'
  },
  {
    title: '文章类型',
    dataIndex: 'categoryName',
  },
   {
    title: '文章主题',
    dataIndex: 'topic',
  },
   {
    title: '文章内容',
    dataIndex: 'content',
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
  name: 'QueryArticle',
  components: {StandardTable},
  data () {
    console.log(111111111)
    return {
      advanced: true,
      columns: columns,
      dataSource: dataSource,
      selectedRows: [],
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
    this.getList(this.pagination.current,this.pagination.pageSize)
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
        this.deleteArticle(id)
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
      this.$router.push('/list/article/1/0')
      // this.dataSource.unshift({
      //   key: this.dataSource.length,
      //   no: 'NO ' + this.dataSource.length,
      //   description: '这是一段描述',
      //   callNo: Math.floor(Math.random() * 1000),
      //   status: Math.floor(Math.random() * 10) % 4,
      //   updatedAt: '2018-07-26'
      // })
    },
    getList(pageNum,pageSize){
        getArticleList(pageNum,pageSize).then(result => {
          this.dataSource = []
          var list = result.data.data.list
          this.total = result.data.data.total
          this.pagination.total = this.total
          for (let i = 0; i < list.length; i++) {
            this.dataSource.push({
              key: list[i].id,
              no: i+1,
              categoryName: list[i].categoryName,
              categoryId:list[i].categoryId,
              topic: list[i].topic,
              content:"",
              updateTime: list[i].updateTime,
            })
          }
        })
    },
    deleteArticle(id){
      deleteArticle(id).then(result=>{
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
