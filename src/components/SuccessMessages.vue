<template>
  <div class="container">
    <article class="message is-success is-small">
      <div class="message-header">
        <p>Operación completada</p>
        <button @click="$emit('cerrarMensaje')" class="delete is-small" aria-label="delete"></button>
      </div>
      <div class="message-body">{{ mensaje }}</div>
    </article>
  </div>
</template>

<script>
export default {
  name: "Exito",
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