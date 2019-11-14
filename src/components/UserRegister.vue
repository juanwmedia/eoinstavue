<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Registro</h1>

          <!-- Formulario de registro -->
          <form @submit.prevent="registerUser">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model="nombre" class="input" type="text" placeholder="Nombre" required />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  v-model="apellidos"
                  class="input"
                  type="text"
                  placeholder="Apellidos"
                  required
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
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
                  <i class="fas fa-unlock-alt"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button is-info" :class="{'is-loading': trabajando}">Registro</button>
              </p>
            </div>
          </form>

          <ErrorMessages v-show="mensajeError" :mensaje="mensajeError" />

          <router-link to="/recover">Recuperar contraseña.</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ErrorMessages from "./ErrorMessages.vue";
import firebase from "../firebase.js";
export default {
  name: "UserRegister",
  data() {
    return {
      trabajando: false,
      mensajeError: "",
      nombre: "",
      apellidos: "",
      correoe: "",
      contrasena: ""
    };
  },
  methods: {
    async registerUser() {
      this.trabajando = true;
      this.mensajeError = "";

      try {
        let user = await firebase.auth.createUserWithEmailAndPassword(
          this.correoe,
          this.contrasena
        );
        await this.$store.commit("saveUser", user.user);
        await firebase.usersCollection.doc(user.user.uid).set({
          nombre: this.nombre,
          apellidos: this.apellidos,
          registro: Date.now()
        });
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