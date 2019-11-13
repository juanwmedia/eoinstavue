<template>
  <div class="container">
    <article class="message is-danger">
      <div class="message-body">{{ mensaje }}</div>
    </article>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: {
    mensaje: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.container {
  margin: 20px;
}
</style> 