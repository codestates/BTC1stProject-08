<template>
  <card>
    <div class="row">
<!--      <div class="col-md-10 pr-md-1">-->
<!--        <base-input label="Amount"-->
<!--                  placeholder="Amount"-->
<!--                  v-model="model.amount"-->
<!--                  disabled>-->
<!--        </base-input>-->
<!--      </div>-->
      <div class="col-md-4 px-md-1">
        <base-input label="Amount"
                  placeholder="Amount"
                  v-model="model.amount">
        </base-input>
      </div>
      <div class="col-md-1 pl-md-1">
        <base-input label="Token"
                    placeholder="AVAX"
                    v-model="model.token"
                    disabled>
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5 px-md-1">
        <base-input label="To Address"
                    placeholder="xxx"
                    v-model="model.to_address">
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <base-input>
          <label>MEMO(Optional)</label>
          <textarea rows="4" cols="80"
                    class="form-control"
                    placeholder="Here can be your description"
                    v-model="model.memo">

              </textarea>
        </base-input>
      </div>
    </div>
    <div class="row">
      <label>Transaction Fee&nbsp;&nbsp;&nbsp;</label>
      <p>10</p>
    </div>
    <div class="row">
      <label>Total AVAX&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <p>10</p>
    </div>
    <base-button slot="footer" type="primary" fill>Save</base-button>
  </card>
</template>
<script>
  export default {
    props: {
      model: {
        type: Object,
        default: () => {
          return {};
        }
      }
    }
  }
</script>
<style>
</style>
