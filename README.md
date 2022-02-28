
# 💰 아발란체 Avalanche(AVAX)

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

### Wallet
- 신규 Wallet 생성
    - 니모닉 기반
- Wallet 조회
    - X, P, C 각 지갑 주소 조회
- 잔액 조회
    - X , P, C 각 체인 잔액 조회
    - Unlocked, locked 잔액 조회
    - Staking 금액 조회
- 송금
    - X , C 각 체인 잔액 송금 가능
- Cross Chain
    - X to C or X to P
    - P to X or P to C
    - C to X or C to P
    - 각 체인간 교환

### Explorer
- 각 Chain별 조회 최신 트랜잭션 조회
    - X - Chain 내 트랜잭션 조회
    - P - Chain 내 Block 조회
    - C - Chain 내 Blcok 조회
- 트랜잭션 검색
    - X ,  P - Chain은 AVM 내 검색
    - C - Chain은 EVM 내 검색
- 트랜잭션 상세 내용 조회
    
### Deamon
- 최신 트렌잭션 수집 및 DB 기록
    - X - Chain 실시간 트랜젝션 조회 후 DB 저장
- 최신 블록 정보 수집 및 DB 기록
    - P - Chain 실시간 블록 조회 후 DB 저장
    - C - Chain 실시간 블록 조회 후 DB 저장


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

