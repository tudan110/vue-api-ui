<template>
  <div id="app">
    <VueApiUi @action="test"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  methods: {
    test(data) {
      console.log('data', data)
    },
  }
}
</script>

<style>

</style>
