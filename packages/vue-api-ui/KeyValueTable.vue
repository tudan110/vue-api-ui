<template>
  <div>
    <el-table
        :data="keyValueData"
        height="286"
        border
        style="width: 100%">
      <el-table-column
          prop="key"
          label="Key"
      >
        <vue-editable-cell :show-input="true" slot-scope="{row}" v-model="row.key"
                           placeholder="Key">
          <span slot="content">{{ row.key }}</span>
        </vue-editable-cell>
      </el-table-column>
      <el-table-column
          prop="value"
          label="Value"
      >
        <vue-editable-cell :show-input="true" slot-scope="{row}" v-model="row.value"
                           placeholder="Value">
          <span slot="content">{{ row.value }}</span>
        </vue-editable-cell>
      </el-table-column>
      <el-table-column
          v-if="!readOnly"
          header-align="center"
          align="center"
          label="操作"
          width="66">
        <template slot="header">
          <el-tooltip class="item" effect="light" content="添加" placement="bottom">
            <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                round
                plain
                @click="addRow()"
            >
            </el-button>
          </el-tooltip>
        </template>
        <template slot-scope="{row, $index}">
          <el-tooltip class="item" effect="light" content="删除" placement="bottom">
            <el-button
                size="small"
                type="text"
                style="color: #ed4014"
                @click="deleteRow(row, $index)"
            >
              <i class="el-icon-delete" title="删除"/>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'KeyValueTable',
  props: {
    value: {
      type: Array,
      default: function () {
        return []
      }
    },
    readOnly: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    keyValueData: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:value', value)
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    addRow() {
      this.keyValueData.push({
        key: null,
        value: null,
      })
    },
    deleteRow(row, index) {
      this.keyValueData.splice(index, 1)
    },
  }
}
</script>

<style scoped>

</style>
