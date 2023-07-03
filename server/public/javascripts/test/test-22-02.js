console.log('Server started at', new Date());

const query = require('@/db');

const https = require('https');
console.log("https", https.globalAgent.protocol)

const path = require('path')

const fs = require('fs');

const jsonfile = path.resolve(__dirname, './taobaoRateData.json')


async function addprerate() {

  const data = fs.readFileSync(jsonfile, 'utf8');

  const jsonDataObj = JSON.parse(data);

  console.log(Object.keys(jsonDataObj));
  console.log(jsonDataObj.rates.length);

  jsonDataObj.rates.forEach(async item => {
    const {utFeedId,totalCount,invite,keywords,rateList} = item
    // console.log(item.utFeedId)
    // console.log(item.keywords)
    await query(`INSERT INTO prerate (utFeedId,totalCount,invite,keywords,rateList) VALUES (?,?,?,?,?)`, [utFeedId,totalCount,JSON.stringify(invite),JSON.stringify(keywords),JSON.stringify(rateList)])

    // console.log(Object.keys(item));

  })

}
// addprerate()

async function getrate() {
  const page = req.query.page || 1;  // Get page from query string
  const pageSize = req.query.pageSize || 10;

  // Calculate offset for MySQL LIMIT clause
  const offset = (page - 1) * pageSize;

  const randomcategory = `data${Math.floor(Math.random() * 7) + 1}`

  const [counts] = await query('SELECT COUNT(*) AS count FROM rates WHERE category = ? ', randomcategory);

  const dbRes = await query(
    `SELECT * FROM rates 
    WHERE category = '${randomcategory}' 
    ORDER BY RAND() 
    LIMIT ${pageSize} OFFSET ${offset};`
  );
  const reres = dbRes.map(obj => {
    return obj.ratedata
  })

  console.log({
    code: '1',
    msg: '操作成功',
    result: {
      counts: counts.count,
      page: page,
      pageSize,
      pages: Math.ceil(counts / pageSize),
      items: reres
    }
  });
}
// getrate()


async function changedata() {
  const data = fs.readFileSync(jsonfile, 'utf8');

  const jsonDataObj = JSON.parse(data);

  console.log(Object.keys(jsonDataObj));

  const count = {
    aa: 0,
    allaa: 0,
    bb: 0,
    allbb: 0,
  }

  for (const key in jsonDataObj) {
    const values = jsonDataObj[key];
    values.forEach(async value => {
      // console.log("typeof value", typeof value)
      // console.log(Object.keys(value));

      console.log(value.interactionVO.likeCount = Math.ceil(Math.random() * 200))
      console.log(value.interactionVO.readCount = Math.ceil(Math.random() * 5000))
      await query(`INSERT INTO rates (category, ratedata) VALUES (?, ?)`, [key, JSON.stringify(value)])

    })
  }
  console.log("reres", await query(`select count(*) from rates;`))
  console.log("count", count)
}
// changedata()




async function asdf() {

  try {
    const data = fs.readFileSync(jsonfile, 'utf8');

    const jsonDataObj = JSON.parse(data);

    console.log(Object.keys(jsonDataObj));

    for (const key in jsonDataObj) {
      const values = jsonDataObj[key];
      values.forEach(async value => {
        // console.log("typeof value", typeof value)
        // console.log(Object.keys(value));

        const reres = await query(`INSERT INTO rates (category, ratedata) VALUES (?, ?)`, [key, JSON.stringify(value)])

      })
    }
    console.log("reres", await query(`select count(*) from rates;`))

  } catch (err) {
    console.error(err);
  }

  // // Parse JSON string to object
  // const jsonData = JSON.parse(data);

  // console.log(Object.keys(jsonData));
}












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

// waitAndCall();

// async function test() {
//   const dbRes = await query(`SELECT id FROM products WHERE id LIKE '13790%';`)
//   console.log("dbRes", dbRes)
// }
// test()