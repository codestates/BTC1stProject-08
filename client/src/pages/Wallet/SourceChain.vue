<template>
  <edit-profile-form :model="model">
  </edit-profile-form>
</template>

import EditProfileForm 

  export default {
    components: {

    },
    computed: {
      table(){
        return this.$t('dashboard.usersTable');
      }
    }
  }
</script>
<style>
</style>
