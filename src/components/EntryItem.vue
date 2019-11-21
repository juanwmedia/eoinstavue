<template>
  <section class="section">
    <div class="container">
      <div class="card">
        <div class="card-content is-paddingless">
          <div class="imagen" :class="entry.filtro" :style="{backgroundImage: `url(${entry.url})`}"></div>
          <div class="datos">
            <p class="username is-size-7">Por {{ entry.username }} - {{ entry.cuando | timeAgo }}</p>
            <p class="caption">{{ entry.caption }}</p>
          </div>
        </div>
        <footer class="card-footer">
          <div class="card-footer-item">
            <a @click="likePhoto" class="votar" href="#">
              <i class="fas fa-heart"></i>
            </a>
            <span class="votos">{{ entry.likes }} likes</span>
          </div>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
import firebase from "../firebase.js";
import { mapState } from "vuex";
export default {
  name: "EntryItem",
  async created() {
    if (this.user) {
      this.likeId = this.user.uid + "_" + this.entry.id;

      try {
        let doc = await firebase.likesCollection.doc(this.likeId).get();
        this.liked = !doc.exists ? false : true;
      } catch (error) {
        console.error(error.message);
      }
    }
  },
  data() {
    return {
      liked: true,
      likeId: ""
    };
  },
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  methods: {
    async likePhoto() {
      if (this.liked) return;

      try {
        // Guardar like
        let saveLike = await firebase.likesCollection.doc(this.likeId).set({
          photoId: this.entry.id,
          userId: this.user.uid
        });

        // Ajustar conteo de likes en foto actual
        let addLike = await firebase.entriesCollection
          .doc(this.entry.id)
          .update({
            likes: this.entry.likes + 1
          });

        await Promise.all([saveLike, addLike]);

        this.liked = true;
      } catch (error) {
        console.error(error.message);
      }
    }
  },
  computed: {
    ...mapState(["user"])
  },
  filters: {
    timeAgo(timestamp) {
      return moment(timestamp.toDate()).fromNow();
    }
  }
};
</script>

<style lang="scss" scoped>
.imagen {
  // background-image: url("../assets/blackcat.jpg");
  background-size: cover;
  background-position: center;
  height: 45vmax;
  margin-bottom: 10px;
}

.datos {
  padding: 10px;

  .caption {
    font-style: italic;
  }
}

.card-footer {
  padding: 0;
  &-item {
    padding: 3px;
  }
}

.votar {
  font-size: 20px;
  color: red;
}

.votos {
  font-size: 10px;
  padding: 5px;
}
</style>