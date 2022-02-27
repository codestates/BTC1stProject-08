import WalletLayout from "@/layout/wallet/WalletLayout.vue";
import NotFound from "@/pages/NotFoundPage.vue";
const Wallet = () => import("@/pages/Wallet.vue");
const CrossChain = () => import("@/pages/CrossChain.vue");
const ManageKeys = () => import("@/pages/ManageKeys.vue");
const Login = () => import("@/pages/Login/Login.vue");
const Register = () => import("@/pages/Register/Regsiter");
// const CChain = () => import("@/pages/Explorer/CChain");
// const XChain = () => import("@/pages/Explorer/XChain");
const XChainDetail = () => import("@/pages/Explorer/XChainDetail");
const CChainDetail = () => import("@/pages/Explorer/CChainDetail");
const PChainDetail = () => import("@/pages/Explorer/PChainDetail");
// const PChain = () => import("@/pages/Explorer/PChain");

const routes = [
  {
    path: "/",
    component: WalletLayout,
    children: [
        {
          path: "wallet",
          name: "wallet",
          component: Wallet
        },
      {
        path: "cross_chain",
        name: "cross_chain",
        component: CrossChain
      },
      {
        path: "manage_keys",
        name: "manage_keys",
        component: ManageKeys
      },
      {
        path: "Login",
        name: "Login",
        component: Login
      },
      {
        path: "Register",
        name: "Register",
        component: Register,
      },
      {
        path: "c-chain",
        name: "c-chain",
        component: CChainDetail,
      },
      {
        path: "x-chain",
        name: "x-chain",
        component: XChainDetail,
      },
      {
        path: "p-chain",
        name: "p-chain",
        component: PChainDetail,
      },
    ]
  },
  { path: "*", component: NotFound },
];

export default routes;
