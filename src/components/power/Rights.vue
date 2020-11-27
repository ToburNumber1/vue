<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level" width="70">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'" size="mini">一级</el-tag>
            <el-tag v-else-if="scope.row.level === '1'" size="mini" type="success">二级</el-tag>
            <el-tag v-else size="mini" type="danger">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
  export default {
    name: "Rights",
    data() {
      return {
        rightsList: []
      }
    },
    created() {
      this.getRightsList()
    },
    methods: {
      async getRightsList() {
        const {data: res} = await this.$http.get('rights/list')
        if(res.meta.status !== 200){
          return this.$message.error('获取权限列表失败！')
        }

        this.rightsList = res.data
        this.$message.success('获取权限列表成功！')
        console.log(this.rightsList);
      }
    }
  }
</script>

<style scoped>

</style>