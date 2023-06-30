const mysql = require('mysql2');

// 创建MySQL连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'MySQL@mm.`123',
  database: 'fresh-mart',
  port: 3306
});

// 封装查询操作的函数
function query(sql, callback) {
  pool.getConnection((err, connection) => {
    if (err) return callback(err);

    connection.query(sql, (error, results, fields) => {
      connection.release();

      if (error) return callback(error);

      callback(null, results);
    });
  });
}

// 导出查询函数
module.exports = query;