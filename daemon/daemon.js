const cron = require("node-cron");
const xTransactionHandler = require('./handler/xTransaction');
const pBlockHandler = require('./handler/pBlock');
const cBlockHandler = require('./handler/cBlock');

const xTransactionTask = cron.schedule(
    "*/5 * * * * *", // 30초에 한번씩 실행
    xTransactionHandler,
    {
        scheduled: true,
    }
);

const pBlockTask = cron.schedule(
    "*/5 * * * * *", // 30초에 한번씩 실행
    pBlockHandler,
    {
        scheduled: true,
    }
);

const cBlockTask = cron.schedule(
    "*/5 * * * * *", // 30초에 한번씩 실행
    cBlockHandler,
    {
        scheduled: true,
    }
);

xTransactionTask.start();
pBlockTask.start();
cBlockTask.start();