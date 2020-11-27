<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加商品</el-button>

          <el-upload
                  class="upload-demo"
                  action="http://timemeetyou.com:8889/api/private/v1/upload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :headers="headersObj"
                  :on-success="handleSuccess"
                  list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-col>
      </el-row>

      <tree-table class="tree-table" :data="catelist" :columns="columns" :selection-type="false" :expand-type="false" show-index index-text="#" border :show-row-hover="false">
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lawngreen"></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="warning" size="mini" v-else>三级</el-tag>
        </template>
        <trmplate slot="opt" slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
        </trmplate>
      </tree-table>

      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="querInfo.pagenum"
              :page-sizes="[3, 5, 300, 400]"
              :page-size="querInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>

    </el-card>

    <el-dialog
            title="图片预览"
            :visible.sync="previewVisible"
            width="50%">
      <img :src="previewPath" alt="" class="previewImg">
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "Cate",
    data() {
      return {
        querInfo: {
          type: 3,
          pagenum: 1,
          pagesize: 5,
        },
        catelist: [],
        total: 0,
        columns: [
          {
            label: '分类名称',
            prop: 'cat_name'
          },
          {
            label: '是否有效',
            type: 'template',
            template: 'isok'
          },
          {
            label: '排序',
            type: 'template',
            template: 'order'
          },
          {
            label: '操作',
            type: 'template',
            template: 'opt'
          },
        ],
        headersObj: {
          Authorization: window.sessionStorage.getItem(('token'))
        },
        pics: [],
        previewPath: '',
        previewVisible: false
      }
    },
    created() {
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const {data: res} = await this.$http.get(`categories`, {params: this.querInfo})
        if(res.meta.status !== 200) {
          return this.$message.error('获取商品分类失败！')
        }

        this.catelist = res.data.result

        this.total = res.data.total
        this.$message.success('获取商品分类成功！')
        console.log(this.catelist);
      },
      handleSizeChange(newSize) {
        this.querInfo.pagesize = newSize
        this.getCateList()
      },
      handleCurrentChange(newPage) {
        this.querInfo.pagenum = newPage
        this.getCateList()
      },
      handlePreview(file) {
        // 预览
        console.log(file);
        this.previewPath = file.response.data.url
        this.previewVisible = true
      },
      handleRemove(file) {
        // 移除
        const filePath = file.response.data.tmp_path
        const i = this.pics.findIndex(x => x.pic === filePath)
        this.pics.splice(i, 1)
      },
      handleSuccess(response) {
        const picInfo = {pic: response.data.tmp_path}
        this.pics.push(picInfo)
      }
    }
  }
</script>

<style scoped>
  .tree-table{
    margin-top: 15px;
  }
  .previewImg{
    width: 100%;
  }
</style>