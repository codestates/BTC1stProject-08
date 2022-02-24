<template>
  <card>
    <div class="row">
      <div class="col-md-4 px-md-1">
        <h5>Source Chain</h5>
        <select class="form-control" aria-label="Default select example" :value="sourceIndex">
          <option value="0">X Chain</option>
          <option value="1">P Chain</option>
          <option value="2">C Chain</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 px-md-1">
        <h5>Destination Chain</h5>
        <select class="form-control" aria-label="Default select example" :value="targetIndex">
          <option value="0">X Chain</option>
          <option value="2">C Chain</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 px-md-1">
        <h5>Destination Chain</h5>
        <input class="form-control" type="number" step="0.01" placeholder="0.01">
      </div>
    </div>
    <div class="row">
      <label style="padding-right: 10px">Fee</label>
    </div>
    <div class="row">
      <label style="padding-right: 10px">Expert Fee</label>
      <p>10</p>
    </div>
    <div class="row">
      <label style="padding-right: 10px">Import Fee</label>
      <p>10</p>
    </div>
    <div class="row">
      <label style="padding-right: 10px">Total</label>
      <label><p>10</p></label>
    </div>
    <base-button slot="footer" type="primary" fill>CONFIRM</base-button>
  </card>
</template>
<script>
  export default {
    data() {
      return {
        indexs: [
          {
            value: 0,
            label: 'X Chain',
          },
          {
            value: 0,
            label: 'X Chain',
          },
          {
            value: 0,
            label: 'X Chain',
          },
        ],
        sourceIndex: 0,
        targetIndex: 1,
      }
    }
  }
</script>
<style>
</style>
