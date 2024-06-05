<template>
  <div id="app">
    <VueApiUi :value.sync="value" @action="test" />
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
    },
  }
}
</script>

<style>

</style>
