<template>
  <div class="m-auto">
    <div class="col-lg-12" style="height:600px">
      <base-search :keyword="keyword" @click="onSearch" />

      <div class="row">
        <div class="col-lg-6">
          <card type="tasks" style="height:100%">
          </card>
        </div>
        <div class="col-lg-6">
          <card type="tasks" style="height:100%">
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseSearch from '@/components/BaseSearch';
export default {
  name: 'PChain',
  components: {
    BaseSearch,
  },
  data() {
    return {
      keyword: '',
    }
  },
  methods: {
    onSearch() {
      alert('검색해주세요!!!');
    },
  },
};
</script>
<style lang="scss">
</style>
