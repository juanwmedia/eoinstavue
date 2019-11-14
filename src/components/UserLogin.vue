<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Login</h1>
          <form @submit.prevent="login">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model="correoe" class="input" type="email" placeholder="Correo-e" required />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input
                  v-model="contrasena"
                  class="input"
                  type="password"
                  placeholder="Contraseña"
                  required
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-unlock"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button is-info" :class="{'is-loading': trabajando}">Login</button>
              </p>
            </div>
          </form>

          <ErrorMessages v-show="mensajeError" :mensaje="mensajeError" />

          <ul>
            <li>
              <router-link to="/recover">Recuperar contraseña.</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "../firebase.js";
import ErrorMessages from "./ErrorMessages.vue";
export default {
  name: "UserLogin",
  data() {
    return {
      correoe: "",
      contrasena: "",
      trabajando: false,
      mensajeError: ""
    };
  },
  methods: {
    async login() {
      this.trabajando = true;
      this.mensajeError = "";

      try {
        let user = await firebase.auth.signInWithEmailAndPassword(
          this.correoe,
          this.contrasena
        );
        await this.$store.commit("saveUser", user.user);
        await this.$store.dispatch("getUserProfile");
        this.$router.push("/");
      } catch (error) {
        console.error(error.message);
        this.mensajeError = error.message;
        this.trabajando = false;
      }
    }
  },
  components: {
    ErrorMessages
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