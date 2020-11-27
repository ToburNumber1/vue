<template>
  <div class="home">
    <el-container>
      <el-header>
        <p class="logo">Element UI</p>
        <el-button align="right" size="mini" type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="!isCollapse ?  '200px' : '64px'">
          <div class="targ" @click="tarMenu">
            |||
          </div>
          <el-menu
                  background-color="#222222"
                  text-color="#fff"
                  active-text-color="#409eff"
                  :collapse="isCollapse"
                  unique-opened
                  :collapse-transition="false"
                  router
                  :default-active="activePath"
                  class="el-menu-vertical-demo">
            <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="savenavState(subItem.path)">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
<!--          路由站位-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>


  export default {
    name: 'Home',
    data() {
      return {
        menulist: [],
        isCollapse: false,
        iconsObj: {
          '125': 'el-icon-s-custom',
          '103': 'el-icon-s-claim',
          '101': 'el-icon-s-goods',
          '102': 'el-icon-s-order',
          '145': 'el-icon-s-marketing'
        },
        // 被激活的链接地址
        activePath: ''
      }
    },
    created() {
      this.getMenuList()
      this.activePath = window.sessionStorage.getItem('activePath')
    },
    methods: {
      tarMenu() {
        this.isCollapse = !this.isCollapse
      },
      logout() {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      // 获取所有的菜单
      async getMenuList() {
        const { data: res } = await this.$http.get('menus')
        if(res.meta.status != 200) return this.$message.error(res.res.meta.msg)
        this.menulist = res.data
      },
      savenavState(activePath) {
        const address = '/' + activePath
        window.sessionStorage.setItem('activePath', address)
        this.activePath = address
      }
    }
  }
</script>

<style lang="less" scoped>
  .home, .el-container{
    height: 100%;
  }
  .el-header{
    background: #222222;
    display:flex;
    justify-content: space-between;
    align-items: center;
    .logo{
      color:#fff
    }
  }
  .el-aside{
    background: #222222;
    .el-submenu{background: #222222}
  }
  .el-menu{border-right: 0}
  .targ{background: #19242f;color:#fff;letter-spacing: 0.2rem;text-align: center;font-size: 14px;padding: 10px 0;cursor: pointer;}
</style>
