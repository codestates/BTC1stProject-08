const cron = require("node-cron");
const xTransactionHandler = require('./handler/xTransaction');
const pBlockHandler = require('./handler/pBlock');
const cBlockHandler = require('./handler/cBlock');

const task = cron.schedule(
    "*/5 * * * * *", // 30초에 한번씩 실행
    xTransactionHandler,
    pBlockHandler,
    cBlockHandler,
    {
        scheduled: true,
    }
);

task.start();
