<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Editar captura</p>
      </header>
      <section class="modal-card-body">
        <img :src="photoSubmission" alt />
        <!-- Caption -->
        <div class="field">
          <div class="control">
            <h4 class="subtitle">Título</h4>
            <input
              v-model.trim="caption"
              class="input"
              type="text"
              placeholder="Describe la foto que estas subiendo"
            />
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          @click="submitPhoto"
          class="button is-success"
          :class="{'is-loading': trabajando}"
        >Guardar</button>
        <button :disabled="trabajando" @click="cancelSubmission" class="button">Cancelar</button>

        <ErrorMessages v-show="mensajeError" :mensaje="mensajeError" />
      </footer>
    </div>
  </div>
</template>

<script>
import ErrorMessages from "./ErrorMessages.vue";
import firebase from "../firebase.js";
import { mapState } from "vuex";
export default {
  name: "PhotoSubmission",
  data() {
    return {
      trabajando: false,
      mensajeError: "",
      downloadURL: "",
      caption: ""
    };
  },
  methods: {
    cancelSubmission() {
      this.$store.dispatch("cancelSubmission");
    },
    async submitPhoto() {
      this.trabajando = true;
      this.mensajeError = "";

      // 1- Subir la imagen a Cloud Storage
      const uploadPhoto = () => {
        let fileName = `photo_${Date.now()}.jpg`;
        return firebase.storage
          .ref(fileName)
          .putString(this.photoSubmission, "data_url");
      };

      // 2- Obtenemos la URL de descarga de la imagen subida
      function getDownloadURL(ref) {
        return ref.getDownloadURL();
      }

      // 3- Guardar una referencia en Cloud Firestore
      const publishPhoto = photoURL => {
        return firebase.entriesCollection.add({
          cuando: new Date(),
          caption: this.caption,
          filtro: "",
          url: photoURL,
          likes: 0,
          userId: this.user.uid,
          username: `${this.userProfile.nombre} ${this.userProfile.apellidos}`
        });
      };

      try {
        let upload = await uploadPhoto();
        let photoURL = await getDownloadURL(upload.ref);
        await publishPhoto(photoURL);

        this.$nextTick(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
        });

        this.trabajando = false;
        this.$store.commit("setSubmitting", false);
      } catch (error) {
        console.error(error.message);
        this.trabajando = false;
        this.mensajeError = error.message;
      }
    }
  },
  computed: {
    ...mapState(["photoSubmission", "user", "userProfile"])
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