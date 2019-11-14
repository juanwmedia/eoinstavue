<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Recuperar contraseña</h1>
          <p class="subtitle">Introduce tu correo-e para iniciar el proceso de recuperación.</p>

          <form @submit.prevent="recover">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model="correoe" class="input" type="email" placeholder="Correo-e" required />
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button is-info" :class="{'is-loading': trabajando}">Recuperar</button>
              </p>
            </div>
          </form>

          <ErrorMessages v-show="mensajeError" :mensaje="mensajeError" />
          <SuccessMessages v-show="mensajeExito" :mensaje="mensajeExito" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "../firebase.js";
import ErrorMessages from "./ErrorMessages.vue";
import SuccessMessages from "./SuccessMessages.vue";
export default {
  name: "UserRecover",
  data() {
    return {
      correoe: "",
      trabajando: false,
      mensajeExito: "",
      mensajeError: ""
    };
  },
  methods: {
    async recover() {
      this.trabajando = true;
      this.mensajeError = this.mensajeExito = "";

      try {
        await firebase.auth.sendPasswordResetEmail(this.correoe);
        this.mensajeExito = "Operación realizada con éxito. Revisa tu correo-e";
        this.trabajando = false;
        this.redirect();
      } catch (error) {
        console.error(error.message);
        this.trabajando = false;
        this.mensajeError = error.message;
      }
    },
    redirect() {
      let timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.$router.push("/login");
      }, 2000);
    }
  },
  components: {
    ErrorMessages,
    SuccessMessages
  }
};
</script>



<style lang="scss" scoped>
section {
  background-color: lightgray;
  flex-grow: 1;
  padding: 1rem;
  padding-top: 100px;
  padding-bottom: 60px;
}
</style>