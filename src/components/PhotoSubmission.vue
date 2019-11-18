<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editar captura</p>
      </header>
      <section class="modal-card-body">
        <img :src="photoSubmission" alt />
      </section>
      <footer class="modal-card-foot">
        <button
          @click="submitPhoto"
          class="button is-success"
          :class="{'is-loading': trabajando}"
        >Guardar</button>
        <button class="button">Cancelar</button>

        <ErrorMessages v-show="mensajeError" :mensaje="mensajeError" />
      </footer>
    </div>
  </div>
</template>

<script>
import ErrorMessages from "./ErrorMessages.vue";
// import firebase from "../firebase.js";
import { mapState } from "vuex";
export default {
  name: "PhotoSubmission",
  data() {
    return {
      trabajando: false,
      mensajeError: "",
      downloadURL: ""
    };
  },
  methods: {
    async submitPhoto() {
      console.log("Guardando imagen...");
    }
  },
  computed: {
    ...mapState(["photoSubmission"])
  },
  components: {
    ErrorMessages
  }
};
</script>

<style lang="scss" scoped>
.modal {
  display: block;
  padding-top: 100px;
  .modal-card {
    width: auto;
  }
}
</style> 