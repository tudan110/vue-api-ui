<template>
  <div>
    <div>VueApiUi</div>

    <!-- URL -->
    <div class="request-url">
      <el-input placeholder="请输入内容" v-model="httpUrl" class="input-with-select">
        <el-select v-model="httpMethod" slot="prepend" placeholder="请选择">
          <el-option label="GET" value="get"></el-option>
          <el-option label="POST" value="post"></el-option>
          <el-option label="PUT" value="put"></el-option>
          <el-option label="DELETE" value="delete"></el-option>
        </el-select>
        <el-button slot="append">发送</el-button>
      </el-input>
    </div>

    <!-- 请求头，请求体 -->
    <div class="request-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="Params" name="params">
          <el-table
              :data="ParamsData"
              height="250"
              border
              style="width: 100%">
            <el-table-column
                prop="key"
                label="Key"
            >
            </el-table-column>
            <el-table-column
                prop="value"
                label="Value"
            >
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="Headers" name="headers">
          <el-table
              :data="HeadersData"
              height="250"
              border
              style="width: 100%">
            <el-table-column
                prop="key"
                label="Key"
            >
            </el-table-column>
            <el-table-column
                prop="value"
                label="Value"
            >
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="Body" name="body">

          <el-radio-group v-model="radio">
            <el-radio :label="1">none</el-radio>
            <el-radio :label="2">form-data</el-radio>
            <el-radio :label="3">x-www-form-urlencoded</el-radio>
            <el-radio :label="4">json</el-radio>
          </el-radio-group>

          <template v-if="radio === 2 || radio === 3">
            <el-table
                :data="FormData"
                height="250"
                border
                style="width: 100%">
              <el-table-column
                  prop="key"
                  label="Key"
              >
              </el-table-column>
              <el-table-column
                  prop="value"
                  label="Value"
              >
              </el-table-column>
            </el-table>
          </template>

          <template v-if="radio === 4">
            <el-input
                type="textarea"
                :rows="6"
                placeholder="RequestBody"
                v-model="body">
            </el-input>
          </template>

        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 响应结果 -->
    <div class="response-content">
      <el-input
          type="textarea"
          :rows="6"
          placeholder="Response"
          v-model="response">
      </el-input>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// Element.install(Vue)
Vue.use(Element, {size: 'small', zIndex: 3000})

export default {
  name: 'VueApiUi',
  data() {
    return {
      httpUrl: null,
      httpMethod: null,
      activeName: 'params',
      ParamsData: [{
        key: 'name',
        value: '王小虎',
      }, {
        key: 'age',
        value: 20,
      }],
      HeadersData: [{
        key: 'Content-Type',
        value: 'application/json',
      }, {
        key: 'Connection',
        value: 'keep-alive',
      }],
      FormData: [{
        key: 'test1',
        value: 'application',
      }, {
        key: 'test2',
        value: 'asdfasdf',
      }],
      radio: 1,
      body: null,
      response: null
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>
::v-deep .el-select .el-input {
  width: 130px;
}

::v-deep .input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.request-url {
  margin-top: 16px;
}

.request-content {
  margin-top: 16px;
}

.response-content {
  margin-top: 16px;
}

</style>
