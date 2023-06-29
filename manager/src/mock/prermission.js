import Mock from "mockjs";


export default {
  getMenu: config => {
    console.log("getMenu--config", config)
    const { username, password } = JSON.parse(config.body)
    console.log("username", username)
    console.log("password", password)
    const isAdmin = username === 'admin' && password === 'admin'
    const isUser1 = username === 'user' && password === 'user'
    if (isAdmin) {
      return {
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
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (isUser1) {
      return {
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
        token: Mock.Random.guid(),
        message: '获取成功'
      }
    } else {
      return {
        code: 401,
        data: {
          message: '账号或密码错误'
        }
      }
    }
  }
}