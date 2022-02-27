
#💰 아발란체 Avalanche(AVAX)

### make by 아벡썸 (Avax Thumb)
#### 팀원 : 김현식, 문다훈, 임지영
------
## 👨‍🔧 구현 전 화면 설계는 이렇게 했어요
![AVAXThumb_front](https://user-images.githubusercontent.com/74406061/155870447-c792d8be-6456-4ca5-859c-4ddd4a4c38b0.jpg)

## 💡 저희 프로젝트의 Flow chart는 아래와 같아요
![AvaxThumb_flowchart](https://user-images.githubusercontent.com/74406061/155870446-ec3f24cd-054d-4c86-8236-34ae9b54e3f6.jpg)

## 📄 참고 자료
- doc : https://www.avax.network/solutions
-------
## ⚙️ 저희가 구현한 💵wallet, 🔍explorer 의 기능은 이렇게 있어요

### Wallet 기능 
- Wallet 조회
- 잔액 조회 ( x-Chain, P-Chain. C-Chain )
- 송금 
- Cross Chain

### Explorer 기능
- 최신 트랜잭션 조회
- 트랜잭션 검색
- 트랜잭션 상세 내용 조회

## 🪓 저희는 이런 기술을 사용했어요
### Front ( Wallet , Explorer )
- Vue.js
- Vuex
- Bootstrap

### Back ( Explorer )
- Node.js
- Express
- Aws RDS ( MySQL )
- Sequelize ORM

### Daemon (Explorer)
- Node.js
- Aws RDS ( MySQL )
- Sequelize ORM
- pm2

