<template>
  <div id="app">
    <main class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h1>Series Alarm</h1>
          <Container/>
        </div>
      </div>
    </main>
  </div>
</template>

<script>

  import Container from "@/components/Container";
export default {
  name: 'App',
  components: {
    Container
  }
}
</script>

<style lang="scss">
  @import "./scss/main";

</style>
