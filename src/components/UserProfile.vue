<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title">Perfil</h1>

          <!-- Nombre y apellidos -->
          <form @submit.prevent="updateName">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  v-model.trim="nombre"
                  class="input"
                  type="text"
                  :placeholder="userProfile.nombre"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  v-model.trim="apellidos"
                  class="input"
                  type="text"
                  :placeholder="userProfile.apellidos"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button
                  :disabled="!nombre.length || !apellidos.length"
                  class="button is-info"
                  :class="{'is-loading': actualizandoDatos}"
                >Actualizar nombre y apellidos</button>
              </p>
            </div>
          </form>

          <hr />

          <!-- Correo-e -->
          <form @submit.prevent="updateEmail">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model.trim="correoe" class="input" type="email" :placeholder="user.email" />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button
                  :disabled="!correoe.length"
                  class="button is-info"
                  :class="{'is-loading': actualizandoCorreoe}"
                >Actualizar correoe</button>
              </p>
            </div>
          </form>

          <hr />

          <!-- Contraseña -->
          <form @submit.prevent="updatePassword">
            <div class="field">
              <p class="control has-icons-left">
                <input
                  v-model.trim="contrasena"
                  class="input"
                  type="password"
                  placeholder="Nueva contraseña"
                />
                <span class="icon is-small is-left">
                  <i class="fa fa-unlock-alt"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button
                  :disabled="!contrasena.length"
                  class="button is-info"
                  :class="{'is-loading': actualizandoContrasena}"
                >Actualizar contraseña</button>
              </p>
            </div>
          </form>

          <ErrorMessages v-show="mensajeError" :mensaje="mensajeError" />
          <SuccessMessages
            @cerrarMensaje="mensajeExito = ''"
            v-show="mensajeExito"
            :mensaje="mensajeExito"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "../firebase.js";
import { mapState } from "vuex";
import SuccessMessages from "./SuccessMessages.vue";
import ErrorMessages from "./ErrorMessages.vue";
export default {
  name: "UserProfile",
  data() {
    return {
      nombre: "",
      apellidos: "",
      correoe: "",
      contrasena: "",
      mensajeExito: "",
      mensajeError: "",
      actualizandoDatos: false,
      actualizandoCorreoe: false,
      actualizandoContrasena: false
    };
  },
  methods: {
    async updateName() {
      // Actualizamos datos personales
      this.mensajeError = this.mensajeExito = "";
      this.actualizandoDatos = true;
      try {
        await firebase.usersCollection.doc(this.user.uid).update({
          nombre: this.nombre,
          apellidos: this.apellidos
        });
        let userEntries = await firebase.entriesCollection
          .where("userId", "==", this.user.uid)
          .get();

        // Actualizamos las fotos con los nuevos datos
        await userEntries.forEach(doc => {
          firebase.entriesCollection.doc(doc.id).update({
            username: `${this.nombre} ${this.apellidos}`
          });
        });
        this.mensajeExito = "Datos actualizados";
        this.actualizandoDatos = false;
      } catch (error) {
        console.error(error.message);
        this.mensajeError = error.message;
        this.actualizandoDatos = false;
      }
    },
    async updateEmail() {
      // Actualizamos correo
      let usuario = firebase.auth.currentUser;
      this.mensajeError = this.mensajeExito = "";
      this.actualizandoCorreoe = true;
      try {
        await usuario.updateEmail(this.correoe);
        this.mensajeExito = "Correo-e actualizado";
        this.actualizandoCorreoe = false;
      } catch (error) {
        console.error(error.message);
        this.mensajeError = error.message;
        this.actualizandoCorreoe = false;
      }
    },
    async updatePassword() {
      // Actualizamos contraseña
      let usuario = firebase.auth.currentUser;
      this.mensajeError = this.mensajeExito = "";
      this.actualizandoContrasena = true;
      try {
        await usuario.updatePassword(this.contrasena);
        this.mensajeExito = "Contraseña actualizada";
        this.actualizandoContrasena = false;
      } catch (error) {
        console.error(error.message);
        this.mensajeError = error.message;
        this.actualizandoContrasena = false;
      }
    }
  },
  computed: {
    ...mapState(["userProfile", "user"])
  },
  components: {
    SuccessMessages,
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