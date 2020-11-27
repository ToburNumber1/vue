<template>
  <div>
    <h2>Welcome</h2>
    <div>
      <div style=" width: 220px; margin: 20px auto 0;">
        <el-date-picker
                v-model="form.startDate"
                type="date"
                placeholder="选择开始日期"
                format="yyyy-MM-dd "
                value-format="timestamp"
                :picker-options="form.pickerOptionsStart"
                @change="changeStart">
        </el-date-picker>
      </div>
      <div style=" width: 220px; margin: 20px auto 0;">
        <el-date-picker
                v-model="form.endDate"
                type="date"
                placeholder="选择结束日期"
                format="yyyy-MM-dd "
                value-format="timestamp"
                :picker-options="form.pickerOptionsEnd"
                @change="changeEnd">
        </el-date-picker>
      </div>

      <template>
        <el-table
                :data="tableData"
                style="width: 100%">
          <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="地址">
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Welcome",
    data() {
      return {
        form: {
          pickerOptionsStart: {},
          pickerOptionsEnd: {},
          startDate: '', // 开始日期
          endDate: '', // 结束日期
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    methods: {
      changeStart() { // 限制开始时间
        this.form.pickerOptionsEnd = Object.assign({}, this.form.pickerOptionsEnd, {
          disabledDate: (time) => {
            if (this.form.startDate) {
              return time.getTime() < this.form.startDate
            }
          }
        })
      },
      changeEnd() { // 限制结束时间
        this.form.pickerOptionsStart = Object.assign({}, this.form.pickerOptionsStart, {
          disabledDate: (time) => {
            if (this.form.endDate) {
              return time.getTime() > this.form.endDate
            }
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
