<template>
  <div id="app">
    <VueApiUi ref="apiUi" :value.sync="value" @action="test" />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
    return {
      value: undefined
    }
  },
  methods: {
    test(data) {
      console.log('data', data)
      console.log('value', this.value)
      console.log('this.$refs.apiUi.getData()', this.$refs.apiUi.getData())
    },
  }
}
</script>

<style>

</style>
