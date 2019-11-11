<template>
  <section class="section">
    <div class="container">
      <EntryItem v-for="entry in entries" :entry="entry" :key="entry.cuando" />
    </div>
  </section>
</template>

<script>
import EntryItem from "./EntryItem.vue";
import entries from "../entries.js";
export default {
  name: "EntryList",
  data() {
    return {
      entries
    };
  },
  components: {
    EntryItem
  }
};
</script>

<style lang="scss" scoped>
section {
  background-color: lightgray;
  flex-grow: 1;
  padding: 1rem;
  padding-top: 50px;
  padding-bottom: 10px;
  &:last-of-type {
    padding-bottom: 100px;
  }
}
</style>