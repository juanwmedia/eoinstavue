<template>
  <section class="section">
    <div class="container">
      <div class="columns is-mobile">
        <div class="column">
          <!-- Aquí irá el botón del perfil -->
        </div>
        <div class="column has-text-centered">
          <a href="#">
            <input type="file" name="file" id="file" class="inputfile" @change="submitPhoto" />
            <label v-if="user" for="file">
              <i class="fas fa-camera"></i>
            </label>
            <i v-else @click="submitPhoto" class="fas fa-camera"></i>
          </a>
        </div>
        <div class="logout column has-text-centered">
          <a v-if="user" href="#" @click="logout">
            <i class="fas fa-sign-out-alt"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "../firebase.js";
import { mapState } from "vuex";
export default {
  name: "AppFooter",
  methods: {
    submitPhoto(event) {
      if (!this.user) {
        if (this.$route.name !== "Login") {
          this.$router.push({ name: "Login" });
        }
        return;
      }
      const files = event.target.files;
      if (!files.length) return;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onload = event => {
        this.$store.commit("assingSubmission", event.target.result);
        this.$store.commit("setSubmitting", true);
      };

      document.querySelector("#file").value = "";
    },
    async logout() {
      try {
        await firebase.auth.signOut();
        if (this.$route.fullPath !== "/") {
          this.$router.push("/");
        }
        this.$store.dispatch("cleanUser");
      } catch (error) {
        console.error(error.message);
      }
    }
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>

<style lang="scss" scoped>
section {
  padding: 1rem;
  flex-basis: 80px;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: white;
}

i {
  font-size: 50px;
}

#file {
  display: none;
}

.logout {
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    font-size: 40px;
    color: #999999;
  }
}
</style>