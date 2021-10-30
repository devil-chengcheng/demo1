<template>
  <el-container class="home_container">
    <!-- 导航 -->
    <el-header>
      <div>
        <span style="margin-left: 10px">
          <img
            src="../assets/img/ilogo.png"
            width="250px"
            style="margin-left: 10px; margin-top: 5px"
            height="100%"
            alt
            srcset
          />
        </span>
      </div>
      <el-dropdown>
        <div class="block">
          <el-avatar
            :size="50"
            :src="this.userInfo.avatar"
            style="cursor: pointer"
          ></el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown" trigger="click">
          <el-dropdown-item>
            <span type="danger" @click="toWelcome">
              <span class="el-icon-house"></span>
              系统首页
            </span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span type="danger" @click="logout">
              <span class="el-icon-switch-button"></span>
              退出登录
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <el-aside :width="isOpen == true ? '64px' : '200px'">
        <div class="toggle-btn" @click="toggleMenu">|||</div>
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isOpen"
          :router="true"
          :default-active="activePath"
          background-color="#272c33"
          :collapse-transition="false"
          text-color="rgba(255,255,255,0.7)"
          unique-opened
        >
          <Sidebar :menuList="this.MenuList"></Sidebar>
        </el-menu>
      </el-aside>

      <!-- 右边主体 -->
      <el-main v-loading="loading">
        <!-- 路由视图 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from "./sidebar/Sidebar";
export default {
  name: "Home",
  data() {
    return {
      loading: true,
      isOpen: false,
      activePath: "", //激活的路径
      MenuList: {},
      userInfo: {
        avatar: require("/src/assets/img/f.jpg"),
      },
    };
  },
  components: {
    Sidebar,
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    toWelcome() {},
    logout() {},
    // 获取用户信息
    async getUserInfo() {},
    // 获取菜单信息
    async getMenuList() {
      const data = require("../assets/js/menu.json");
      this.MenuList = data;
      console.log(this.MenuList);
      // this.$axios.get("../assets/js/menu.json").then((res) => {
      //   console.log(res);
      // });
    },
  },
};
</script>

<style lang="less" type="text/less">
.home_container {
  width: 100%;
  height: 100% !important;
}
.el-header {
  background-color: #272c33;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 19px;
  padding-left: 0px;
}

.el-aside {
  background-color: #272c33;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.toggle-btn {
  background-color: #2d3a4b;
  line-height: 24px;
  font-size: 10px;
  color: #fff;
  text-align: center;
}

// body > .el-container {
//   margin-bottom: 40px;
//   color: #fff;
//   text-align: center;
//   letter-spacing: 0.2em;
//   cursor: pointer;
// }
</style>