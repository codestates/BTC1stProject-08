<template>

  <card>
    <div class="card card-nav-tabs">
      <div class="card-header card-header-success">
        Active Keys
      </div>
      <div>
        <base-alert type="default">
          <div class="row">
            <div class="col-md">
                <!-- <div class="material-icons">qr_code_2</div> -->
              <div class="col"><h4>{{activekeyX}}</h4></div>
              <div class="col">This key has: {{balance}} AVAX </div>
            </div>
            <div class="col-md">
              <base-button @click="modal1 = true">HD주소 보기</base-button>
              <base-button @click="modal2 = true">암호 문구 보기</base-button>
              <base-button @click="modal3 = true">View C Chain Private Key</base-button>
            </div>
          </div>
        </base-alert>
      </div>
    </div>

    <div>
      <modal :show.sync="modal1">
        <template slot="header">
            <h4 class="modal-title">HD Addresses</h4>
        </template>
        <div>
          <!-- Internal, External, Platform 탭 구분하고 주소 긁어와서 넣어야함 -->
          Internal : {{internalhd[0]}}<br>
          External : {{externalhd[0]}}<br>
          Platform : {{platformhd[0]}}
          <!-- <div>
            <base-table :data="tableData"
              :columns="columns">
              <template slot="columns">
                <th class="text-center">#</th>
                <th>Address</th>
                <th class="text-right">잔액</th>
              </template>  
              <template slot-scope="{row}">
                <td>{{row.id}}</td>
                <td>{{row.name}}</td>
                <td class="text-right">{{row.job}}</td>
              </template>    
            </base-table>
          </div> -->
        </div>
        <template slot="footer">
            <base-button type="secondary" @click="modal1 = false">Close</base-button>
        </template>
      </modal>
    </div>
    <div>
      <modal :show.sync="modal2">
        <template slot="header">
            <h4 class="modal-title">키 문구</h4>
        </template>
        <div>
          {{mymnemonic}}
        </div>
        <template slot="footer">
            <base-button type="secondary" @click="modal2 = false">Close</base-button>
        </template>
    </modal>
    </div>
    <div>
      <modal :show.sync="modal3">
        <template slot="header">
            <h4 class="modal-title">Private Key</h4>
        </template>
        <div>
          {{privatekeyC}}
        </div>
        <template slot="footer" class="text-center">
            <base-button type="secondary" @click="modal3 = false">Close</base-button>
        </template>
    </modal>
    </div>
  </card>
</template>
<script>
  import {MnemonicWallet, setNetwork, TestnetConfig} from "@avalabs/avalanche-wallet-sdk";
  import {BaseAlert, Modal, BaseTable} from '../../../src/components';


  export default {
    components: {
      Modal,
      BaseAlert,
      BaseTable,
    },
    data() {
      return {
        activekeyX: "",
        balance: "0.123123123",
        hdaddress: "",
        // currentId: 1,
        // hdlist: [
        //   { id:1, label: 'Internal', content: 'inter'},
        //   { id:2, label: 'External', content: 'exter'},
        //   { id:3, label: 'P Chain', content: 'pchain'},
        // ],
        mymnemonic: "",
        privatekeyC: "",
        modal1: false,
        modal2: false,
        modal3: false,
        internerhd : "",
        externerhd : "",
        platformhd : "",
      //    columns: ["id", "name", "job", "since", "salary", "actions"],
      // tableData: [
      //   {
      //     id: 1,
      //     name: "	Andrew Mike",
      //     salary: "€ 99,225	",
      //     job: "Develop",
      //     since: 2013,
      //   },
      //   {
      //     id: 2,
      //     name: "	John Doe",
      //     salary: "€ 89,241",
      //     job: "Design",
      //     since: 2012,
      //   },
      //   {
      //     id: 3,
      //     name: "Alex Mike",
      //     salary: "€ 92,144	",
      //     job: "Design",
      //     since: 2010
      //   }
      // ]
      }
    },
    computed: {
      current() {
        return this.hdlist.find(el => el.id === this.currentId) || {}
      }
    },
    methods: {
      initWalletAddress() {
            console.log("function start")
            const mnemonic = "stomach virus coil teach once truck gap clog hip claim loyal marble sustain zoo pink ripple kind stumble air chronic must void capable area";
            const myWallet = MnemonicWallet.fromMnemonic(mnemonic);
            // console.log('myWallet', myWallet);
            setNetwork(TestnetConfig);
            // console.log("balanceX", myWallet.getAvaxBalanceX());

            const addressX = myWallet.getAddressX();
            const addressP = myWallet.getAddressP();
            const privatekeyC = myWallet.getEvmPrivateKeyHex();
            const mnemonic_logon = myWallet.getMnemonic();

            const internalhd = myWallet.getInternalAddressesXSync();
            const externalhd = myWallet.getExternalAddressesXSync();
            const platformhd = myWallet.getExternalAddressesPSync();

            this.internalhd = internalhd;
            this.externalhd = externalhd;
            this.platformhd = platformhd;
            // console.log(internalhd)
            // console.log(addressX)
            // console.log(addressP)

            // const test = myWallet.getExternalAddressesPSync();
            // console.log("00 ", test)

            this.activekeyX = addressX;
            this.privatekeyC = privatekeyC;
            this.mymnemonic = mnemonic_logon;

          },
    },
    mounted(){
      console.log("start");
      this.initWalletAddress();
      console.log("end");
    },
  
  }
</script>
<style>
</style>
