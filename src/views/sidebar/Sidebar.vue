<template>
  <div>
    <!-- <el-menu-item index="1">
      <template slot="title">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </template>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item index="2-1">
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="2-2">
        <span>角色管理</span>
      </el-menu-item>
      <el-menu-item index="2-1">
        <span>权限管理</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="3">
      <i class="el-icon-menu"></i>
      <span slot="title">导航一</span>
    </el-menu-item> -->

    <template v-for="item in this.menuList">
      <el-submenu
        :key="item.id + ''"
        :disabled="item.disabled"
        :index="item.id + ''"
        v-if="item.children.length > 0"
      >
        <template slot="title" style="padding-left: 10px">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.menuName }}</span>
        </template>
        <Sidebar :menuList="item.children"></Sidebar>
      </el-submenu>
      <el-menu-item
        v-else
        :key="item.id + ''"
        :disabled="item.disabled"
        :index="item.url + ''"
        :route="item.url"
        style="padding-left: 50px"
        @click="savePath(item.url)"
      >
        <i :class="item.icon"> </i>
        <span>{{ item.menuName }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["menuList"],
  data() {
    return {};
  },
  created() {},
  methods: {
    savePath(path) {
      window.sessionStorage.setItem("activePath", path);
      this.activePath = path;
    },
  },
};
</script>

<style>
.el-menu--collapse span,
.el-menu--collapse i.el-submenu__icon-arrow {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>