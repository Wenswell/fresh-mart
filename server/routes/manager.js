var express = require('express');
var router = express.Router();

/* *********************   */
/*  前缀为 [ /manager ]   */
/* *********************  */

const query = require('@/db');



router.post('/auth', async (req, res, next) => {
  const { username, password } = req.body
  const isAdmin = username === 'admin' && password === 'admin'
  const isUser1 = username === 'user' && password === 'user'
  if (isAdmin) {
    res.send({
      code: 200,
      data: {
        menu: [
          {
            path: "/home",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "@/views/main/home.vue",
          },
          {
            path: "/user",
            name: "user",
            label: "用户管理",
            icon: "user",
            url: "@/views/main/user.vue",
          },
          {
            path: "/mall",
            name: "mall",
            label: "商品管理",
            icon: "video-play",
            url: "@/views/main/mall.vue",
          },
          {
            label: "其他",
            icon: "location",
            children: [
              {
                path: "/page-one",
                name: "page-one",
                label: "首页11",
                icon: "setting",
                url: "@/views/main/page-one.vue",
              },
              {
                path: "/page-two",
                name: "page-two",
                label: "首页22",
                icon: "setting",
                url: "@/views/main/page-two.vue",
              },
            ],
          },
        ],
        token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        message: '获取成功'
      }
    })
  } else if (isUser1) {
    res.send({
      code: 200,
      data: {
        menu: [
          {
            path: "/home",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "@/views/main/home.vue",
          },
          {
            path: "/mall",
            name: "mall",
            label: "商品管理",
            icon: "video-play",
            url: "@/views/main/mall.vue",
          },
          {
            label: "其他",
            icon: "location",
            children: [
              {
                path: "/page-two",
                name: "page-two",
                label: "首页22",
                icon: "setting",
                url: "@/views/main/page-two.vue",
              },
            ],
          },
        ],
      },
      token: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      message: '获取成功'
    })
  } else {
    res.send({
      code: 401,
      data: {
        message: '账号或密码错误'
      }
    });
  }

})



module.exports = router;