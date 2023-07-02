console.log('Server started at', new Date());

const query = require('@/db');

const https = require('https');
console.log("https", https.globalAgent.protocol)

async function getIds() {
  // const allId = await query(`SELECT id from products`)
  const randomTwoId = await query(`SELECT id FROM products ORDER BY RAND();`)
  // const randomTwoId = await query(`SELECT id FROM products ORDER BY RAND() LIMIT 30;`)
  const detailId = await query(`SELECT id from details`)
  const randomTwoIdList = randomTwoId.map(item => item.id)
  const detailIdList = detailId.map(item => item.id)

  randomTwoIdList.forEach(id => {
    if (!detailIdList.includes(id)) {
      console.log(`${id}需要请求`)
      const url = `https://pcapi-xiaotuxian-front-devtest.itheima.net/goods?id=${id}`
      https.get(url, async (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', async () => {
          // 将响应结果插入 MySQL 数据库中
          const obj = JSON.parse(data)
          const detailId = obj.result.id
          const detailData = JSON.stringify(obj.result);
          const reres = await query(`INSERT INTO details (id, data) VALUES (?, ?)`, [detailId, detailData])
          console.log("reres", reres.serverStatus)

        });
      }).on('error', (err) => {
        console.error(err);
      });
    }
  })
}

async function waitAndCall() {
  // 等待 5 到 10 秒之间的随机时间
  const nextInterval = Math.ceil(Math.random() * 3);
  console.log("nextInterval", nextInterval)
  await new Promise(resolve => setTimeout(resolve, nextInterval * 1000));

  // 调用 getIds() 函数，并等待其执行完毕
  await getIds();

  // 递归调用 waitAndCall() 函数，开始下一个倒计时
  await waitAndCall();
}

waitAndCall();

// async function test() {
//   const dbRes = await query(`SELECT id FROM products WHERE id LIKE '13790%';`)
//   console.log("dbRes", dbRes)
// }
// test()