
# ๐ฐ ์๋ฐ๋์ฒด Avalanche(AVAX)

### make by ์๋ฒก์ธ (Avax Thumb)
#### ํ์ : ๊นํ์, ๋ฌธ๋คํ, ์์ง์
------
## ๐จโ๐ง ๊ตฌํ ์  ํ๋ฉด ์ค๊ณ๋ ์ด๋ ๊ฒ ํ์ด์
![AVAXThumb_front](https://user-images.githubusercontent.com/74406061/155870447-c792d8be-6456-4ca5-859c-4ddd4a4c38b0.jpg)

## ๐ก ์ ํฌ ํ๋ก์ ํธ์ Flow chart๋ ์๋์ ๊ฐ์์
![AvaxThumb_flowchart](https://user-images.githubusercontent.com/74406061/155870446-ec3f24cd-054d-4c86-8236-34ae9b54e3f6.jpg)

## ๐ ์ฐธ๊ณ  ์๋ฃ
- doc : https://www.avax.network/solutions
-------
## โ๏ธ ์ ํฌ๊ฐ ๊ตฌํํ ๐ตwallet, ๐explorer ์ ๊ธฐ๋ฅ์ ์ด๋ ๊ฒ ์์ด์

### Wallet
- ์ ๊ท Wallet ์์ฑ
    - ๋๋ชจ๋ ๊ธฐ๋ฐ
- Wallet ์กฐํ
    - X, P, C ๊ฐ ์ง๊ฐ ์ฃผ์ ์กฐํ
- ์์ก ์กฐํ
    - X , P, C ๊ฐ ์ฒด์ธ ์์ก ์กฐํ
    - Unlocked, locked ์์ก ์กฐํ
    - Staking ๊ธ์ก ์กฐํ
- ์ก๊ธ
    - X , C ๊ฐ ์ฒด์ธ ์์ก ์ก๊ธ ๊ฐ๋ฅ
- Cross Chain
    - X to C or X to P
    - P to X or P to C
    - C to X or C to P
    - ๊ฐ ์ฒด์ธ๊ฐ ๊ตํ

### Explorer
- ๊ฐ Chain๋ณ ์กฐํ ์ต์  ํธ๋์ญ์ ์กฐํ
    - X - Chain ๋ด ํธ๋์ญ์ ์กฐํ
    - P - Chain ๋ด Block ์กฐํ
    - C - Chain ๋ด Blcok ์กฐํ
- ํธ๋์ญ์ ๊ฒ์
    - X ,  P - Chain์ AVM ๋ด ๊ฒ์
    - C - Chain์ EVM ๋ด ๊ฒ์
- ํธ๋์ญ์ ์์ธ ๋ด์ฉ ์กฐํ
    
### Deamon
- ์ต์  ํธ๋ ์ญ์ ์์ง ๋ฐ DB ๊ธฐ๋ก
    - X - Chain ์ค์๊ฐ ํธ๋์ ์ ์กฐํ ํ DB ์ ์ฅ
- ์ต์  ๋ธ๋ก ์ ๋ณด ์์ง ๋ฐ DB ๊ธฐ๋ก
    - P - Chain ์ค์๊ฐ ๋ธ๋ก ์กฐํ ํ DB ์ ์ฅ
    - C - Chain ์ค์๊ฐ ๋ธ๋ก ์กฐํ ํ DB ์ ์ฅ


## ๐ช ์ ํฌ๋ ์ด๋ฐ ๊ธฐ์ ์ ์ฌ์ฉํ์ด์
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

