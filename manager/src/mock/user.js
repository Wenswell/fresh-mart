import Mock from "mockjs";

function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) return
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
    + '"}'
  )
}

let list = []
const count = 200
for (let i = 0; i < count; i++) {
  list.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      address: Mock.mock('@county(true)'),
      'age|18-60': 1,
      birth: Mock.Random.date(),
      gender: Mock.Random.integer(0, 1),
    })
  )
}

export default {
  getStatisticaData: () => {
    return {
      formLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input',
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input',
        },
        {
          model: 'gender',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '女',
              value: 0
            },
            {
              label: '男',
              value: 1
            },
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date',
        },
        {
          model: 'address',
          label: '地址',
          type: 'input',
        },
      ]
    }
  },

  getUserList: config => {
    console.log("config", config)
    console.log("param2Obj", param2Obj)

    // const { page = 1, pageCount = 20 } = param2Obj(config.url)
    const { name, page = 1, pageCount = 20 } = param2Obj(config.url)
    console.log("name", name)
    const mockList = list.filter(user => {
      if (name && user.name.indexOf(name) === -1 && user.address.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < pageCount * page && index >= pageCount * (page - 1))
    // const pageList = list.filter((item, index) => index < pageCount * page && index >= pageCount * (page - 1))
    return {
      code: 200,
      result: {
        pageList,
        count: pageList.length,
        totalLength: list.length,
      },
    }
  },
  createUser: config => {
    console.log("createUser -- config", config)
    const { name, address, age, birth, gender } = JSON.parse(config.body).res
    console.log(JSON.parse(config.body))
    list.unshift({
      id: Mock.Random.guid(),
      name,
      address,
      age,
      birth,
      gender,
    })
    return {
      code: 200,
      data: {
        message: '添加成功'
      }
    }
  },

  deleteUser: config => {
    console.log("deleteUser--config", config)
    // JSON.parse(config.body)):
    // {
    //   "id": "CFc3b32E-C64b-f2f8-f69c-c71eEa02d076"
    // }
    const { id } = JSON.parse(config.body)
    if (!id) {
      return {
        code: 404,
        message: '用户不存在'
      }
    } else {
      console.log("list", list)
      list = list.filter(user => user.id !== id)
      console.log("list", list)
      return {
        code: 200,
        message: '删除成功'
      }
    }
  },

  updateUser: config => {
    console.log("updateUser--config", config)
    const { id, name, address, age, birth, gender } = JSON.parse(config.body)
    const genderNum = parseInt(gender)
    list.some(user => {
      if (user.id === id) {
        user.name = name
        user.address = address
        user.age = age
        user.birth = birth
        user.gender = genderNum
        return true
      }
    })
    return {
      code: 200,
      data: {
        message: '修改成功'
      }
    }
  }




}