<template>
  <div id="users">
    <el-breadcrumb
      separator="/"
      style="padding-left: 10px; padding-bottom: 10px; font-size: 12px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form
        ref="form"
        :inline="true"
        :model="formData"
        label-width="70px"
        size="small"
      >
        <el-form-item label="城市">
          <el-select
            clearable
            v-model="formData.department"
            placeholder="请选择城市"
          >
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.value
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名 ">
          <el-input
            clearable
            v-model="formData.name"
            placeholder="请输入用户名查询"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱 ">
          <el-input placeholder="请输入邮箱查询" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="gender" label="male">男</el-radio>
          <el-radio v-model="gender" label="female">女</el-radio>
          <el-radio v-model="gender" label="all">全部</el-radio>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input
            v-model="formData.nickname"
            clearable
            placeholder="请输入昵称查询"
            style="width: 100%"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 50px">
          <el-button icon="el-icon-refresh">重置</el-button>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
          <el-button type="success" icon="el-icon-plus">添加</el-button>
          <el-button icon="el-icon-download">导出</el-button>
          <el-button type="primary" @click="handleTest">测试界面</el-button>
        </el-form-item>
        <el-table
          :data="tableData"
          size="small"
          border
          style="width: 100%; height: 400px"
        >
          <el-table-column prop="id" label="#" width="50px"></el-table-column>
          <el-table-column prop="date" label="日期" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180"
          ></el-table-column>
          <el-table-column prop="gender" label="性别" width="80">
            <template slot-scope="scope">
              <el-tag type="success">{{
                scope.row.gender == "male" ? "男" : "女"
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                class="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                class="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="10"
          :total="50"
        ></el-pagination>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      gender: "all",
      formData: {
        name: "",
        city: "",
        gender: "all",
      },
      currentPage: 2,
      cities: [
        {
          value: "Beijing",
          label: "北京",
        },
        {
          value: "Shanghai",
          label: "上海",
        },
        {
          value: "Nanjing",
          label: "南京",
        },
        {
          value: "Chengdu",
          label: "成都",
        },
        {
          value: "Shenzhen",
          label: "深圳",
        },
        {
          value: "Guangzhou",
          label: "广州",
        },
      ],
      tableData: [
        {
          id: "1",
          gender: "male",
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: "2",
          gender: "male",
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: "3",
          gender: "male",
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          id: "4",
          gender: "female",
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    handleTest() {
      this.$router.push('/test')
    },
    handleSizeChange(val) {
      // console.log(`每页${val}条`);
      this.$message({
        type: "success",
        showClose: true,
        center: true,
        message: `每页${val}条`,
      });
    },
    handleCurrentChange(val) {
      // console.log(`当前页:${val}`);
      this.$message({
        type: "success",
        showClose: true,
        center: true,
        message: `当前页:${val}`,
      });
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.$message({
        showClose: true,
        center: true,
        message: `选中修改index:${index}, row: ${row}`,
      });
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$message({
        type: "danger",
        showClose: true,
        center: true,
        message: `选中修改index:${index}, row: ${row}`,
      });
    },
  },
};
</script>

<style lang="less" type="text/less">
</style>