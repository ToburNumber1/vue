<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" size="mini">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="roleList" border stripe lazy>
<!--        展开列-->
        <el-table-column type="expand" label="展开">
          <template slot-scope="scope">
            <el-row :class="['bdbottom', index1 === 0 ? 'bdtop' : '', 'vcenter']" v-for="(item1, index1) in scope.row.children" :key="item1.id">
<!--              渲染一级权限-->
              <el-col :span="5">
                <el-tag size="small" closable @close="removeRightById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
<!--              渲染二级和三级权限-->
              <el-col :span="19">
<!--                通过 for 循环 嵌套渲染二级权限-->
                <el-row :class="[ index2 === 0 ? '' : 'bdtop', 'vcenter']" v-for="(item2, index2) in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById(scope.row, item2.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="warning" v-for="(item3, index3) in item2.children" :key="item3.id" closable @close="removeRightById(scope.row, item3.id)">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
<!--            数据结构展示-->
<!--            <pre>-->
<!--              {{scope.row}}-->
<!--            </pre>-->
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="">编辑</el-button>
            <el-button type="danger" size="mini"  icon="el-icon-delete" @click="">删除</el-button>
            <el-button type="warning" size="mini"  icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

<!--    分配权限的对话框-->
    <el-dialog
            title="分配权限"
            :visible.sync="setRightDialogVisible"
            @close="setRightDialogClosed"
            width="50%">
      <el-tree :data="rightsList" ref="treeRef" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "Roles",
    data() {
      return {
        roleList: [],
        setRightDialogVisible: false,
        rightsList: [],
        treeProps: {
          label: 'authName',
          children: 'children'
        },
        defKeys: [],
        releId: ''
      }
    },
    created() {
      this.getRolesList()
    },
    methods: {
      async getRolesList() {
        const {data: res} = await this.$http.get('roles')
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error('获取角色列表失败！')
        }

        this.roleList = res.data
        this.$message.success('获取角色列表成功！')
      },
      // 根据Id删除对应的权限
      async removeRightById(role, rightId) {
        console.log(role);
        console.log(rightId);
        const confirmResult = await this.$confirm('此操作将删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)

        if(confirmResult !== 'confirm') {
          return this.$message.info('已取消删除')
        }
        const { data: res} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)

        if(res.meta.status !== 200) {
          return this.$message.error('删除权限失败！')
        }

        this.$message.success('删除权限成功！')
        // this.getRolesList()
        role.children = res.data
      },
      async showSetRightDialog(role) {
        this.releId = role.id
        const {data: res} = await this.$http.get(`rights/tree`)

        if(res.meta.status !== 200){
          return this.$message.error('获取权限数据失败')
        }

        this.rightsList = res.data
        console.log(this.rightsList);
        this.getLeafKeys(role, this.defKeys)

        this.setRightDialogVisible = true
      },
      getLeafKeys(node, arr) {
        if (!node.children) {
          return arr.push(node.id)
        }

        node.children.forEach(item => {
          this.getLeafKeys(item, arr)
        })
      },

      // 监听分配权限的关闭事件
      setRightDialogClosed() {
        this.defKeys = []
      },
      // 点击为角色分配权限
      async allotRights() {
        const keys = [
            ...this.$refs.treeRef.getCheckedKeys(),
            ...this.$refs.treeRef.getHalfCheckedKeys()
        ]

        const idStr = keys.join(',')

        const {data: res} = await this.$http.post(`roles/${this.releId}/rights`, { rids: idStr})

        console.log('=======');
        console.log(res.data);
        console.log('=======');
        if(res.meta.status !== 200 ) {
          return this.$message.error('分配权限失败！')
        }

        this.$message.success('分配权限成功！')

        this.getRolesList()
        this.setRightDialogVisible = true
      }

    }
  }
</script>

<style scoped>
  .el-tag{
    margin: 7px;
  }

  .bdtop{
    border-top: 1px solid #eeeeee;
  }
  .bdbottom{
    border-bottom: 1px solid #eeeeee;
  }

  .vcenter{
    display: flex;
    align-items: center;
  }
</style>