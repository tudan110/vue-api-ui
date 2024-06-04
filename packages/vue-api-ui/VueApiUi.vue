<template>
  <div>

    <!-- URL -->
    <div class="request-url">
      <el-input placeholder="请输入内容" v-model="form.url" class="input-with-select" @input="parseUrlToParams">
        <el-select v-model="form.method" slot="prepend" placeholder="请选择">
          <el-option label="GET" value="GET">
            <span style="color: #3a995f;">GET</span>
          </el-option>
          <el-option label="POST" value="POST">
            <span style="color: #af7e0a;">POST</span>
          </el-option>
          <el-option label="PUT" value="PUT">
            <span style="color: #0556b9;">PUT</span>
          </el-option>
          <el-option label="PATCH" value="PATCH">
            <span style="color: #623497;">PATCH</span>
          </el-option>
          <el-option label="DELETE" value="DELETE">
            <span style="color: #8e1a10;">DELETE</span>
          </el-option>
          <el-option label="HEAD" value="HEAD">
            <span style="color: #007f31;">HEAD</span>
          </el-option>
          <el-option label="OPTIONS" value="OPTIONS">
            <span style="color: #b74386;">OPTIONS</span>
          </el-option>
        </el-select>
        <el-button v-if="showAction" slot="append" @click="action()">{{ actionLabel }}</el-button>
      </el-input>
    </div>

    <!-- 请求头，请求体 -->
    <div class="request-content">
      <el-tabs v-model="activeName">

        <el-tab-pane label="Params" name="params">
          <key-value-table :value="form.query"/>
        </el-tab-pane>

        <el-tab-pane label="Headers" name="headers">
          <key-value-table :value="form.header"/>
        </el-tab-pane>

        <el-tab-pane label="Body" name="body">

          <div class="content-type">

            <el-radio-group v-model="form.body.mode" @input="onModeChanged">
              <el-radio label="none">none</el-radio>
              <el-radio label="formdata">form-data</el-radio>
              <el-radio label="urlencoded">x-www-form-urlencoded</el-radio>
              <el-radio label="json">json</el-radio>
            </el-radio-group>

            <el-button
                v-if="form.body.mode === 'json'"
                type="primary"
                round
                @click="beautify()"
            >格式化
            </el-button>

          </div>

          <template v-if="form.body.mode === 'formdata'">
            <key-value-table :value="form.body.formdata"/>
          </template>

          <template v-if="form.body.mode === 'urlencoded'">
            <key-value-table :value="form.body.urlencoded"/>
          </template>

          <template v-if="form.body.mode === 'json'">
            <el-input
                type="textarea"
                :rows="6"
                placeholder="RequestBody"
                v-model="form.body.raw"
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
    showAction: {
      type: Boolean,
      default: true,
    },
    actionLabel: {
      type: String,
      default: '发送',
    },
    value: {
      type: Object,
      default: function () {
        return {
          url: null,
          method: 'GET',
          header: [], // {key:'Content-Type',value:'application/json',}
          query: [], // key, value
          body: {
            mode: 'none', // none formdata urlencoded json
            raw: '',
            formdata: [], // key, value
            urlencoded: [], // key, value
          }
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
      activeName: 'params',
      response: null
    }
  },
  watch: {
    'form.query': {
      handler: function (newVal) {
        this.parseParamsToUrl(newVal)
      },
      deep: true
    },
  },
  methods: {
    parseUrlToParams(value) {
      // 获取查询字符串
      const queryString = value.split('?')[1]

      // 初始化 query 数组
      const query = []

      // 如果存在查询字符串，解析参数
      if (queryString) {
        // 将查询字符串分割成键值对数组
        const params = queryString.split('&')

        // 遍历键值对数组
        params.forEach(param => {
          // 分割每个键值对成 key 和 value
          const [key, value] = param.split('=')

          // 将解析后的 key 和 value 添加到 query 数组中
          query.push({key, value})
        })
      }

      this.form.query = query
    },
    parseParamsToUrl(query) {
      // 初始化查询字符串
      let queryString = ''

      // 遍历数组，构建查询字符串
      query.forEach((param, index) => {

        // 检查 key 是否是非空字符串
        if (param.key) {
          // 根据 value 是否为 null，构建 "key=value" 或 "key"
          let paramStr = encodeURIComponent(param.key)
          if (param.value !== null) {
            paramStr += `=${encodeURIComponent(param.value)}`
          }

          // 如果不是第一个参数，前面加上 '&' 符号
          if (index !== 0) {
            queryString += '&'
          }

          queryString += paramStr
        }

      })

      // 构建完整的 URL
      const baseUrl = this.form.url.split('?')[0]
      this.form.url = queryString ? `${baseUrl}?${queryString}` : baseUrl
    },
    removeContentType() {
      let index = this.form.header.findIndex(header => header.key === 'Content-Type')
      if (this.form.header.findIndex(header => header.key === 'Content-Type') !== -1) {
        // 删除找到的 "Content-Type" 键的对象
        this.form.header.splice(index, 1)
      }
    },
    addContentType(contentType) {
      this.form.header.push({
        key: 'Content-Type',
        value: contentType
      })
    },
    onModeChanged(mode) {
      this.removeContentType()
      switch (mode) {
        case 'formdata':
          this.addContentType('multipart/form-data')
          break
        case 'urlencoded':
          this.addContentType('application/x-www-form-urlencoded')
          break
        case 'json':
          this.addContentType('application/json')
          break
        default:
          break
      }
    },
    beautify() {
      this.form.body.raw = JSON.stringify(JSON.parse(this.form.body.raw), null, 4)
    },
    action() {
      let data = JSON.parse(JSON.stringify(this.form))
      switch (this.form.body.mode) {
        case 'none':
          delete data.body
          break
        case 'formdata':
          delete data.body.urlencoded
          delete data.body.raw
          break
        case 'urlencoded':
          delete data.body.formdata
          delete data.body.raw
          break
        case 'json':
          delete data.body.formdata
          delete data.body.urlencoded
          break
        default:
          break
      }
      // console.log('form', this.form)
      this.$emit('action', data)
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
