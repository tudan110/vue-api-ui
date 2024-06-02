<template>
  <div>

    <!-- URL -->
    <div class="request-url">
      <el-input placeholder="请输入内容" v-model="form.httpUrl" class="input-with-select">
        <el-select v-model="form.httpMethod" slot="prepend" placeholder="请选择">
          <el-option label="GET" value="get"></el-option>
          <el-option label="POST" value="post"></el-option>
          <el-option label="PUT" value="put"></el-option>
          <el-option label="DELETE" value="delete"></el-option>
        </el-select>
        <el-button slot="append" @click="send()">发送</el-button>
      </el-input>
    </div>

    <!-- 请求头，请求体 -->
    <div class="request-content">
      <el-tabs v-model="form.activeName" @tab-click="handleClick">

        <el-tab-pane label="Params" name="params">
          <key-value-table :value="form.ParamsData"/>
        </el-tab-pane>

        <el-tab-pane label="Headers" name="headers">
          <key-value-table :value="form.HeadersData"/>
        </el-tab-pane>

        <el-tab-pane label="Body" name="body">

          <div class="content-type">

            <el-radio-group v-model="form.contentType">
              <el-radio :label="1">none</el-radio>
              <el-radio :label="2">form-data</el-radio>
              <el-radio :label="3">x-www-form-urlencoded</el-radio>
              <el-radio :label="4">json</el-radio>
            </el-radio-group>

            <el-button
                v-if="form.contentType === 4"
                type="primary"
                round
                @click="beautify()"
            >格式化
            </el-button>

          </div>

          <template v-if="form.contentType === 2 || form.contentType === 3">
            <key-value-table :value="form.FormData"/>
          </template>

          <template v-if="form.contentType === 4">
            <el-input
                type="textarea"
                :rows="6"
                placeholder="RequestBody"
                v-model="form.body"
                style="margin-top: 10px">
            </el-input>
          </template>

        </el-tab-pane>

      </el-tabs>
    </div>

    <!-- 响应结果 -->
    <div class="response-content" v-if="showResponse">
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
import VueEditableCell from '@tudan110/vue-editable-cell'
import KeyValueTable from './KeyValueTable'

// Element.install(Vue)
Vue.use(Element, {size: 'small', zIndex: 3000})
Vue.use(VueEditableCell, {})

export default {
  name: 'VueApiUi',
  components: {
    KeyValueTable
  },
  props: {
    readOnly: {
      type: Boolean,
      default: false,
    },
    showResponse: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Object,
      default: function () {
        return {
          httpUrl: null,
          httpMethod: null,
          activeName: 'params',
          ParamsData: [{
            key: 'name',
            value: '王小虎',
          }, {
            key: 'age',
            value: '20',
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
          contentType: 1,
          body: '{"deviceIp":"127.0.0.1","deviceId":"hj3452jgh345bghj345khj2345","serialNo":"1"}'
        }
      }
    }
  },
  computed: {
    form: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:value', value)
      }
    }
  },
  data() {
    return {
      response: null
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    send() {
      console.log('form', this.form)
    },
    beautify() {
      this.form.body = JSON.stringify(JSON.parse(this.form.body), null, 4)
    },
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

.content-type {
  display: flex;
  justify-content: space-between;
}

.request-content {
  margin-top: 16px;
}

.response-content {
  margin-top: 16px;
}

/* 全局滚动条样式 start */
::v-deep ::-webkit-scrollbar {
  /*滚动条整体样式*/
  /*高宽分别对应横竖滚动条的尺寸*/
  width: 10px;
  height: 10px;
}

::v-deep ::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #c1c1c1;
}

::v-deep ::-webkit-scrollbar-thumb:hover {
  /*鼠标放上去滚动条颜色*/
  background: #7d7d7d
}

::v-deep ::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
  margin: 4px 0;
}

/* 全局滚动条样式 end */

</style>
