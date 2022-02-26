<template>
  <div class="search-bar input-group">
    <input type="text" class="form-control" :value="keyword" @keyup.enter="$emit('click')" placeholder="Search by Address / Txn Hash / Block / Token">
    <div class="input-group-addon" @click="$emit('click')"><i class="tim-icons icon-zoom-split"></i></div>
  </div>
</template>
<script>
export default {
  name: "base-search",
  props: {
    keyword: {
      type: [String, Number],
    },
  },
};
</script>
<style lang="scss">
.search-bar.input-group {
  border: 1px solid;
  height: 40px;
  margin-left: 0;
  margin-bottom: 1rem;
  padding-left: .5rem;

  .input-group-addon {
    padding: 8px 15px 10px 10px;
    cursor: pointer;
  }

  input::-webkit-input-placeholder {
    opacity: 0.5; /*Change the opacity between 0 and 1*/
  }
}
</style>