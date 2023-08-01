# 基础配置

```bash
vue create fresh-mart

yarn add vue-router@3.6.5

yarn add vant@latest-v2

# vant@latest-v2相当于npm i vant@latest-v2 -S

yarn add --dev babel-plugin-import
```

新建 `src/router/index.js`

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/',
  },
]

const router = new VueRouter({
  routes
})

export default router
```

在`src/main.js`中引入路由

```js
import router from '@/router'

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

在`src/App.vue`内设置一级路由

```vue
<template>
  <div>
    <router-view></router-view>
  </div>
</template>
```

新建页面 `src\views\LoginRegister\LoginIndex.vue`

在`src\router\index.js`内引入页面并配置跳转

```js
import LoginRegister from '@/views/LoginRegister/LoginIndex.vue'
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: LoginRegister,
  },
]
```

此时可用`yarn serve`预览`src\views\LoginRegister\LoginIndex.vue`的内容



# 同步GitHub

```bash
$ git init
$ git add .
$ git status
$ git commit -m "initialize project"
$ git remote add origin https://github.com/Wenswell/fresh-mart.git
$ git push origin master
$ git remote add origin git@github.com:Wenswell/fresh-mart.git
# error: remote origin already exists.
```
Claude回复：

> 这个错误 `remote origin already exists` 是因为你已经添加过 origin 远程仓库了。
> 
> 检查一下远程仓库地址命令:
> 
> ```
> git remote -v 
> ```
> 
> 你会看到类似以下输出:
> 
> ```
> origin   git@github.com:Wenswell/some_repo.git (fetch)   
> origin   git@github.com:Wenswell/some_repo.git (push)
> ```
> 
> 这表明你的远程仓库地址已经被设置为 `some_repo` 而不是 `fresh-mart`。
> 
> 有两种方式解决:
> 
> 1. 重新设置远程仓库地址:
> 
> ```
> git remote set-url origin git@github.com:Wenswell/fresh-mart.git
> ```
> 
> 2. 删除已有的 origin ,然后再添加正确的仓库地址:
> 
> ```
> git remote rm origin
> 
> git remote add origin git@github.com:Wenswell/fresh-mart.git
> ```
> 
> 设置完正确的仓库地址后,就可以正常推送代码了:
> 
> ```
> git push origin master
> ```

```bash
$ git remote -v
# origin   git@github.com:Wenswell/some_repo.git (fetch)   
# origin   git@github.com:Wenswell/some_repo.git (push)
$ git remote set-url origin git@github.com:Wenswell/fresh-mart.git
$ git remote rm origin
$ git remote add origin git@github.com:Wenswell/fresh-mart.git
$ git push origin master
```

主分支改名

```bash
git branch -m master main
git push -u origin main
$ git remote show origin
# * remote origin
#   Fetch URL: git@github.com:Wenswell/fresh-mart.git
#   Push  URL: git@github.com:Wenswell/fresh-mart.git
#   HEAD branch: master
#   Remote branches:
#     main   tracked
#     master tracked
#   Local branch configured for 'git pull':
#     main merges with remote main
#   Local ref configured for 'git push':
#     main pushes to main (up to date)
```

直接去GitHub上删除main并改master成main

> **The default branch has been renamed!**
> `master` is now named `main`
> 
> If you have a local clone, you can update it by running the following commands.
> ```
> git branch -m master main
> git fetch origin
> git branch -u origin/main main
> git remote set-head origin -a
> ```

```bash
$ git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

# 登录页面

`babel.config.js`设置

```js
//方式一. 自动按需引入组件
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
```

## 头部

在`src\main.js`里引入van-image

```js
import { Image as VanImage } from 'vant';

Vue.use(VanImage);
```

[img标签无路径src的情况下，安卓和ios出现边框 - 简书](https://www.jianshu.com/p/546d7440d933?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)

- [ ] 搜索框样式
- [ ] 部分内容大小
- [ ] 图标展现形式

[Vant主题定制修改颜色样式_51CTO博客_vant组件样式修改](https://blog.51cto.com/phyger/5202468)

```bash
Compiling...


 WARNING  Compiled with 1 warning                                                                                                           11:42:46

 warning  in ./src/views/Auth/index.vue?vue&type=style&index=0&id=7c2651e5&lang=less&

Invalid dependencies have been reported by plugins or loaders for this module. All reported dependencies need to be absolute paths.
Invalid dependencies may lead to broken watching and caching.
As best effort we try to convert all invalid values to absolute paths and converting globs into context dependencies, but this is deprecated behavior.
Loaders: Pass absolute paths to this.addDependency (existing files), this.addMissingDependency (not existing files), and this.addContextDependency (directories).
Plugins: Pass absolute paths to fileDependencies (existing files), missingDependencies (not existing files), and contextDependencies (directories). 
Globs: They are not supported. Pass absolute path to the directory as context dependencies.
The following invalid values have been reported:
 * "src\\assets\\styles\\vantconfig.less"


  App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.1.5:8080/

  Note that the development build is not optimized.
  To create a production build, run yarn build.

```

```js
{
path: '/test',
redirect: '/test/homepage',
component: Test,
childern: [ //单词拼写错误❌
],
},
```

> 我在开发Vue2项目fresh-mart，我在本地分支workSpace完成了一部分页面，要如何同步至GitHub， GitHub上只有一个main分支

你可以按照下面的步骤在本地作好修改后,同步到 Github 仓库中的 main 分支:

1. 本地创建并切换到新分支:

```
git checkout -b develop 
```

2. 在分支 workSpace 中完成开发。

3. 添加文件并提交到本地分支:

```
git add .
git commit -m "some message"
```

4. 推送本地分支到远程:

```
git push origin develop
```

这会将你的 workSpace 分支推送到 Github 上。

5. 在 Github 网站上,发起 pull request 请求将 workSpace 分支合并到 main 分支。

6. 审核 pull request,确保没有问题后合并。

7. 在本地,删除 workSpace 分支:

```
git branch -d develop
```

8. 更新本地 main 分支:

```
git pull origin main
```

现在本地的 main 分支和 Github 上的主分支已经同步。

9. 继续开发,重复以上步骤,将修改同步到主分支。

所以按照这样的步骤,你可以在本地开发完毕后,通过创建分支、推送分支、pull request 的方式,将修改合并(merge)到 Github 仓库中的主分支。

希望对你有帮助!

> 你说的 `推送本地分支到远程` 是推送到哪个远程分支？现在我的GitHub上只有一个main分支

当你使用`git push origin workSpace`时,实际上是将本地workSpace分支推送到远程的workSpace分支。

GitHub会自动为你创建与本地分支同名的远程分支,所以你第一次推送本地workSpace分支时,实际上是在GitHub上创建了一个workSpace分支。

因此,你的操作过程是:

1. 本地创建workSpace分支并开发
2. 使用`git push origin workSpace`命令,将本地workSpace分支推送到远程的workSpace分支(此时GitHub实际上自动创建了一个workSpace分支)
3. 在GitHub网站上,将workSpace分支合并(merge)到main分支
4. 本地删除workSpace分支
5. 更新本地main分支,获取远程main分支的最新提交

当你推送本地分支到 GitHub 时,GitHub会自动为你创建与之对应的同名远程分支。这使得你可以先在本地开发,然后推送到远程分支,最后合并到主分支。

希望这能帮助你理解`推送本地分支到远程`的意思。
GitHub会动态创建与你本地分支同名的远程分支,所以你可以先在本地开发,最终合并到主线上。

> 你刚才说`在 Github 网站上,发起 pull request 请求将 workSpace 分支合并到 main 分支`，能否在本地完成

你不能仅用本地命令直接将本地分支合并到主分支,需要通过GitHub的pull request完成。

这是因为:

1. GitHub上仅有一个主分支(main),你需要向该主分支提交内容;

2. 通过在GitHub网站上创建pull request,项目维护者可以审核你的修改,确保符合规范后再合并;

3. GitHub上隐藏的分支规则(如protected branch)也需要通过GitHub上的pull request来生效。

所以不能仅在本地完成分支合并,需要:

1. 使用`git push origin <branch>`将分支推送到GitHub

2. 在GitHub网站上,发起pull request将该分支合并到主分支

3. 项目维护者(可能是你自己)审核pull request,确认可以合并后执行merge操作

4. 通过`git pull`等命令,将主分支的最新提交拉取到本地

要点是:

- GitHub主分支由GitHub维护,需要通过GitHub的操作界面来合并分支
- 通过pull request,可以对修改进行审核,确保合并前质量
- 本地主要用来开发新功能,推送分支;拉取主分支的最新提交

希望这有助于你明白本地和GitHub分支合并的流程!
本地不能直接完成分支合并,需要通过GitHub的pull request来完成。


> git，我在develop分支，如何切换到bugfix分支，并在之后将bugfix合并到develop分支

你可以按照下面的步骤来处理:

1. 首先确保你在`develop`分支上:

```bash
$ git checkout develop
```

2. 创建并切换到`bugfix`分支:

```bash 
$ git checkout -b bugfix
```

这会基于`develop`分支创建一个`bugfix`分支,并切换到该分支上。

3. 在`bugfix`分支上修复bug,并提交:

```bash
# 修复bug  
$ git add .
$ git commit -m "fix bug"
```

4. 当bugfixed之后,切换回`develop` 分支:

```bash
$ git checkout develop
```

5. 将`bugfix`分支合并到`develop`分支:

```bash
$ git merge bugfix
```

6. 推送你的`develop`分支到远程:

```bash
$ git push origin develop
```

这样,`bugfix`分支就被合并到`develop`分支中了。

以后你可以删除`bugfix`分支:

```bash
$ git branch -d bugfix
```

所以总的过程是:

1. 切换到`develop` 分支
2. 基于`develop` 创建`bugfix`分支
3. 在`bugfix`分支上修复bug并提交
4. 切回`develop`分支
5. 合并`bugfix`到`develop`   
6. 推送更新的`develop`分支
7. 删除`bugfix`分支

这样可以很妥善地管理你的bug分支。


在 JavaScript/TypeScript 中,有两种主要的 import 语法:

```js
import LoginPage from '@/views/LoginRegister/LoginIndex'

// 或者

import './path/to/page'
```

推荐使用第二种:

```js
import('./path/to/page')
```

原因有几点:

1. 避免命名冲突

使用`import './page'`时,`page`导入的对象会暴露到当前模块中,有可能与其他导入或变量造成命名冲突。

使用`import('./page')`时,总是导入一个匿名函数,不会与其他变量冲突。

2. 按需加载

使用`import('./page')`时,webpack 会将其编译为一个函数,只有实际使用时才会加载。

而`import page`会实现静态导入,编译时就执行导入。

3. 便于拆分

使用`import('./page/LoginIndex')`时,可以更灵活地拆分路由组件:

```js
import LoginPage from './page/LoginIndex'
import RegisterPage from './page/RegisterIndex'
```

而不是:

```js
import LoginIndex from './page/LoginIndex'
import RegisterIndex from './page/RegisterIndex'

const LoginPage = LoginIndex 
const RegisterPage = RegisterIndex
```

总的来说:

- `import 某名称`可能导致命名冲突与加载
- `import('./path/to/page')`可以解决上述问题,更加灵活

因此建议优先使用 `import('./path/to/page')` 这种语法,除非有其他特殊需求。

希望以上信息可以解释这个建议!如有其他疑问,欢迎继续提。



```html
<span>
	<div class='divinspan'>
        1242
    </div>
</span>
```

**使用插槽slot需要配合标签对**


```html
<div class="stepper van-stepper">
    <button type="button">123</button>
    <input type="tel" >
    <button type="button">456</button>
</div>
```



```js
checkResult: ["a", "c"],
cartList: [
{id:"a", count:"5", price:"128.00"}
{id:"b", count:"2", price:"68.01"},
{id:"c", count:"3", price:"6.02"}, 
{id:"d", count:"1", price:"8.10"}, 
],
```

CSS样式不生效：文字未注释掉，导致其后的一条CSS无效果且无报错（只影响一条）

```css
间隔子项调换文字与图片的顺序
.right-row:nth-child(2n) .right-middle{
  flex-direction: row-reverse;
  outline: solid;
}
```

# Git通用流程

```bash
# 使用 develop 分支

# 开发

git add .
git commit -m "develop done"

# 将远程 develop 分支抓取到本地
# 解决任何冲突
# 合并本地 develop 分支和远程 develop 分支
# 推送本地 develop 分支到远程 

git fetch origin
git merge origin/develop

git push origin develop

# 【网页操作】GitHub merge 提交的分支

git switch main
git merge develop
git pull origin main
git checkout develop
git pull origin develop

```

## 测试分支test

```bash
# 使用 develop 分支
git checkout -b test
# 在测试分支开发
git add .
git commit -m "test done"
git switch develop
git merge test
git branch -d test
# 继续用 develop 分支

# 或者直接同步
# 因为是刚 merge 所以不用在 develop add commit
git push origin develop
# 【网页操作】GitHub merge 提交的分支
```

# 坑

css样式不生效：嵌套在另外的CSS中，less下不报错

```css

.like-img {
  display: inline-block;
  outline: solid;
  width: 20px;
  height: 39px;
  margin: 5px;
}

}
</style>
```



**路由不显示内容：重定向至子路由，未设置子路由**


```js
......
path: '/shop', //对应文件'@/views/Shop/SecKill.vue'
redirect: '/shop/seckill', // 未设置子路由 seckill
component: () => import('@/views/Shop/SecKill'), //对应 path: '/shop' 
...
```



```html
    <van-nav-bar
      title="秒杀专场"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-grid :border="false" :column-num="3">
      <van-grid-item>
        <p>09:00</p>
        <p>已结束</p>
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img01.yzcdn.cn/vant/apple-2.jpg" />
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img01.yzcdn.cn/vant/apple-3.jpg" />
      </van-grid-item>
    </van-grid>
```





根据你提供的页面,各页面的 Vue 文件名称和完整路由路径可以设置如下:

登录:
- Vue 文件:LoginForm.vue
- 路由路径: /auth/login

注册:
- Vue 文件:RegisterForm.vue
- 路由路径: /auth/register   

首页:
- Vue 文件:Home.vue
- 路由路径: /   

分类:  
- Vue 文件:ProductCategories.vue  
- 路由路径: /categories

购物车:
- Vue 文件:ShoppingCart.vue
- 路由路径: /cart

我的信息:
- Vue 文件: MyInfo.vue
- 路由路径: /myinfo

秒杀:
- Vue 文件:SecKill.vue
- 路由路径: /mark/seckill

商品详情: 
- Vue 文件: ProductDetail.vue
- 路由路径: /products/:id

选择商品规格:
- Vue 文件: ProductSpec.vue
- 路由路径: /products/:id/spec

参与拼团:
- Vue 文件: GroupBuy.vue    
- 路由路径: /groupbuy

售后申请:
- Vue 文件: AfterSale.vue
- 路由路径: /aftersale





**动态路由*

```js
  {
    path: '/shop/products',  //未设置:id
    // redirect: '/shop/products/1',
    component: () => import('@/views/Shop/ProductDetail')
  },
```





**swiperjs属性设置无效**


> ```vue
> <swiper-container 
>     :centeredSlides="true"
>     :centeredSlidesBounds="true"
>     :spaceBetween="10"
>     class="swiper"
> ```
> 为什么我在Vue2项目中这样设置无效，图片不居中，也没有间隔

有几个可能的原因:

1. 没有引入 Swiper 的样式文件

2. 绑定了错误的属性

`:centeredSlides` 和 `:spaceBetween` 属性应该这样绑定:

```vue
<swiper-container 
    :center-slides="true"
    :space-between="10"
    ... >
```

需要用 `-` 替代 camelCase。

3. 没有调用 Swiper 初始化方法

4. 版本号不兼容

5. 缺少 SwiperSlide 标签





**简化淘宝JSON**

```js
// 请求网址:
// https://h5api.m.tmall.com/h5/mtop.taobao.detail.getdetail/6.0/?jsv=2.7.0
// callback: mtopjsonp1

console.dir({
  item: temp1.data.item,
  props: temp1.data.props,
  rate: temp1.data.rate, 
  skuBase: temp1.data.skuBase,
  mockData: temp1.data.mockData
})
```





swiper的第三方组件

1. swiper-vue2：个人https://github.com/Orest-2/swiper-vue2
2. vue-awesome-swiper：废弃，v4旧版兼容Vue2







swiper@^6.8.4 vue-awesome-swiper@4.1.1

[vue.js - Cannot use Swiper with &quot;vue&quot;: &quot;^2.6.11&quot; - Stack Overflow](https://stackoverflow.com/questions/71219745/cannot-use-swiper-with-vue-2-6-11)

```js
import Vue from "vue";

import  Swiper, { Navigation, Pagination, Autoplay } from 'swiper'

import  'swiper/swiper-bundle.min.css'

Swiper.use([Navigation, Pagination, Autoplay])

Vue.prototype.$swiper = Swiper
```





**容易删除东西后忘记**

```js
   [method.toLowerCase() === 'get' ? '' : 'data']: submitData,
// [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
```





没有先关注报错而是去怀疑vuex modules persistedState无效

```js
[vuex] unknown mutation type: setUser
commit @ vuex.esm.js:460
boundCommit @ vuex.esm.js:409
mappedMutation @ vuex.esm.js:993
sendLoginMsg @ LoginForm.vue:84
await in sendLoginMsg（异步）
emit @ functional.js:39
onClick @ index.js:53
invokeWithErrorHandling @ vue.runtime.esm.js:3017
invoker @ vue.runtime.esm.js:1815
original_1._wrapper @ vue.runtime.esm.js:7473
13:21:47.230 
```



检查数据获取是否成功

```js
const token = store?.state?.user?.profile?.token ?? 'test-token';
const token = store?.state?.profile?.token ?? 'test-token';
```



专有名词错误

```js
const action = {}
const actions = {}
```



用新API记得先引入+改正确名字

{  "attribute": "80031007-11",  "word": "很简约",  "count": "59",  "type": "1" }(59)



evaluate



```js
[
    {"title": "有图", "count": evaluate.hasPictureCount}
    {"title": evaluate.tags[0].title, "count": evaluate.tags[0].tagCount}
    {"title": evaluate.tags[1].title, "count": evaluate.tags[1].tagCount}
]
```







无法得到数据：书签url不同数据不互通

```bash
http://192.168.1.5:8080/#/shop/popular
http://localhost:8080/#/auth
http://192.168.1.5:8080/#/user/address
```



API对接坑：isDefaultinteger 必须 是否为默认，***0 为是***，**1 为否**





# Vue模板

## 组件模板

```vue
<template>
  <div>
    132
    
    <HomeSearch />

  </div>
</template>

<script>
import HomeSearch from './components/home-search';

export default {
  name:'MainContent',
  components: {
    HomeSearch,
  }

}
</script>

<style lang="less" scoped>

</style>
```



## 子组件+props

```vue
<template>
  <div>
    132
  </div>
</template>

<script>
export default {
  name:'MainContent',
  props:{
    selectSku:Object,
  },

}
</script>

<style lang="less" scoped>

</style>
```





## data

```js
data() {
  return {
    a: 1,
    b: [],
  }
},
```

```vue
<template>
  <textarea v-model="text" rows="10" @input="autoGrow" placeholder="输入Markdown语句..." @keydown.ctrl.b="boldSelectedText"  />
  <div v-html="html"></div>

</template>

<script setup>
import { ref } from 'vue'
import { marked } from 'marked';
marked.use({
  mangle: false,
  headerIds: false
});
const text = ref('')
const html = ref('')

const autoGrow = () => {
  const textarea = document.querySelector('textarea')
  html.value = marked(text.value)
  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 2 + 'px'
}
const boldSelectedText = () => {
  const textarea = document.querySelector('textarea')
  const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const newText = text.slice(0, start) + '**' + selectedText + '**' + text.slice(end);
    textarea.value = newText;
    textarea.selectionStart = start + 2;
    textarea.selectionEnd = end + 2;

  text.value = textarea.value
}

</script>
```





# 服务端

```bash
npm install -g express-generator

express -e server

cd server

npm install

npm install -g nodemon

```

package.json

```json
"scripts": {
    "start": "nodemon ./bin/www"
},
```

```bash
npm start
```

- [安装MySQL](https://dev.mysql.com/downloads/mysql/)

```bash
npm install mysql2
```





## MySQL 语句

```mysql
SHOW DATABASES;
USE fresh-mart;
SELECT DATABASE();
SHOW TABLES;

DROP TABLE users;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  phone char(11) NOT NULL COMMENT '手机号码',
  password VARCHAR(20) COMMENT '密码',
  nickname VARCHAR(20) COMMENT '昵称',
  gender char(1) COMMENT '性别, 男、女',
  birthday DATE COMMENT '生日',
  cityCode char(6) COMMENT '城市编码',
  provinceCode char(6) COMMENT '省份编码',
  countyCode char(6) COMMENT '县区编码',
  profession VARCHAR(255) COMMENT '职业',
  PRIMARY KEY (id)
) COMMENT='用户信息表';

ALTER TABLE users MODIFY profession VARCHAR(20);

DESC users;

SHOW CREATE TABLE users;

DROP TABLE products;

CREATE TABLE products (
  shop VARCHAR(50) NOT NULL COMMENT '店铺名称',
  id INT NOT NULL COMMENT '商品ID',
  name VARCHAR(255) NOT NULL COMMENT '商品名称',
  `desc` VARCHAR(255) NOT NULL COMMENT '商品描述',
  discount FLOAT NOT NULL COMMENT '商品折扣',
  oldPrice FLOAT NOT NULL COMMENT '商品原价',
  nowPrice FLOAT NOT NULL COMMENT '商品现价',
  picture VARCHAR(255) NOT NULL COMMENT '商品图片URL',
  orderNum INT NOT NULL COMMENT '商品订单数',
  PRIMARY KEY (id)
) COMMENT='商品信息表';

ALTER TABLE products MODIFY `desc` VARCHAR(255) NULL;
ALTER TABLE products MODIFY id BIGINT NOT NULL COMMENT '商品ID';

ALTER TABLE products
ADD COLUMN publishTime INT(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '发布顺序',
ADD COLUMN evaluateNum INT(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '评价排序';

ALTER TABLE products RENAME COLUMN `desc` TO `description`;

ALTER TABLE products MODIFY discount decimal(2,1);

ALTER TABLE products
MODIFY COLUMN id VARCHAR(255) NOT NULL;

DESC products;

SHOW CREATE TABLE products;


SHOW VARIABLES LIKE "secure_file_priv";

LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/json-excel_1688129141169.csv' INTO TABLE products FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS;

DROP TABLE images;

CREATE TABLE images (
  id INT NOT NULL AUTO_INCREMENT COMMENT '图片ID',
  position VARCHAR(255) NOT NULL COMMENT '图片用途',
  src VARCHAR(255) NOT NULL COMMENT '图片URL',
  PRIMARY KEY (id)
) COMMENT='图片资源表';

DESC images;

SHOW CREATE TABLE images;

INSERT INTO images (position, src)
VALUES 
  ('main', 'main-image.png'),
  ('banner1', 'banner1.jpg'),
  ('banner2', 'banner2.png');
  
  
CREATE TABLE details (
  id INT PRIMARY KEY,
  data TEXT NOT NULL
);

ALTER TABLE details
MODIFY COLUMN id VARCHAR(255) NOT NULL;

DROP TABLE details_test;

CREATE TABLE details_test LIKE details;

INSERT INTO details_test SELECT * FROM details;

ALTER TABLE details_test 
ADD COLUMN  data_id VARCHAR(255),
ADD COLUMN  name VARCHAR(255),
ADD COLUMN  spuCode VARCHAR(255),
ADD COLUMN  `desc` VARCHAR(255),
ADD COLUMN  price FLOAT,
ADD COLUMN  oldPrice FLOAT,
ADD COLUMN  discount VARCHAR(125),
ADD COLUMN  inventory VARCHAR(125),
ADD COLUMN  brand TEXT,
ADD COLUMN  salesCount VARCHAR(125),
ADD COLUMN  commentCount VARCHAR(125),
ADD COLUMN  collectCount VARCHAR(125),
ADD COLUMN  mainVideos TEXT,
ADD COLUMN  videoScale VARCHAR(125),
ADD COLUMN  mainPictures TEXT,
ADD COLUMN  specs TEXT,
ADD COLUMN  skus TEXT,
ADD COLUMN  categories TEXT,
ADD COLUMN  details TEXT,
ADD COLUMN  isPreSale BOOLEAN,
ADD COLUMN  isCollect VARCHAR(255) NULL,
ADD COLUMN  recommends VARCHAR(255) NULL,
ADD COLUMN  userAddresses VARCHAR(255) NULL,
ADD COLUMN  similarProducts TEXT,
ADD COLUMN  hotByDay TEXT,
ADD COLUMN  evaluationInfo VARCHAR(255) NULL;

ALTER TABLE details_test
MODIFY COLUMN evaluationInfo TEXT;

TRUNCATE TABLE details_test;

INSERT INTO details_test (
  id, 
  `data`,
  data_id, 
  name, 
  spuCode, 
  `desc`, 
  price, 
  oldPrice, 
  discount, 
  inventory, 
  brand, 
  salesCount, 
  commentCount, 
  collectCount, 
  mainVideos, 
  videoScale, 
  mainPictures, 
  specs, 
  skus, 
  categories, 
  details, 
  isPreSale, 
  isCollect, 
  recommends, 
  userAddresses, 
  similarProducts, 
  hotByDay, 
  evaluationInfo
)
SELECT 
  id, 
  `data`,
  JSON_EXTRACT(data, '$.id') AS data_id, 
  JSON_EXTRACT(data, '$.name') AS name, 
  JSON_EXTRACT(data, '$.spuCode') AS spuCode, 
  JSON_EXTRACT(data, '$.desc') AS `desc`, 
  JSON_EXTRACT(data, '$.price') AS price, 
  JSON_EXTRACT(data, '$.oldPrice') AS oldPrice, 
  JSON_EXTRACT(data, '$.discount') AS discount, 
  JSON_EXTRACT(data, '$.inventory') AS inventory, 
  JSON_EXTRACT(data, '$.brand') AS brand, 
  JSON_EXTRACT(data, '$.salesCount') AS salesCount, 
  JSON_EXTRACT(data, '$.commentCount') AS commentCount, 
  JSON_EXTRACT(data, '$.collectCount') AS collectCount, 
  JSON_EXTRACT(data, '$.mainVideos') AS mainVideos, 
  JSON_EXTRACT(data, '$.videoScale') AS videoScale, 
  JSON_EXTRACT(data, '$.mainPictures') AS mainPictures, 
  JSON_EXTRACT(data, '$.specs') AS specs, 
  JSON_EXTRACT(data, '$.skus') AS skus, 
  JSON_EXTRACT(data, '$.categories') AS categories, 
  JSON_EXTRACT(data, '$.details') AS details, 
  JSON_EXTRACT(data, '$.isPreSale') AS isPreSale, 
  JSON_EXTRACT(data, '$.isCollect') AS isCollect, 
  JSON_EXTRACT(data, '$.recommends') AS recommends, 
  JSON_EXTRACT(data, '$.userAddresses') AS userAddresses, 
  JSON_EXTRACT(data, '$.similarProducts') AS similarProducts, 
  JSON_EXTRACT(data, '$.hotByDay') AS hotByDay, 
  JSON_EXTRACT(data, '$.evaluationInfo') AS evaluationInfo
FROM details;
SHOW WARNINGS;

CREATE TABLE details_backup LIKE details;

INSERT INTO details_backup SELECT * FROM details;

DROP TABLE details;

RENAME TABLE details_test TO details;


create table address (
id VARCHAR(50) comment '用户ID',
receiver VARCHAR(20) comment '收件人',
contact char(11) comment '联系电话',
provinceCode VARCHAR(6) comment '省编码',
cityCode VARCHAR(6) comment '市编码',
countyCode VARCHAR(6) comment '区县编码',
address VARCHAR(200) comment '详细地址',
isDefault BOOLEAN comment '是否默认',
fullLocation VARCHAR(250) comment '完整地址',
postalCode VARCHAR(6) comment '邮政编码',
addressTags VARCHAR(200) NULL comment '地址标签'
)  COMMENT='收货地址表';


CREATE TABLE rate (
  category varchar(10),
  ratedata json
);

RENAME TABLE rate TO rates;

DROP TABLE prerate;

CREATE TABLE prerate (
  utFeedId VARCHAR(50),
  totalCount VARCHAR(20),
  invite json,
  keywords json,
  rateList json
) COMMENT='评价预览（包括keywords）';

```

csv文件要：去除空列、去除半角逗号、去除特殊字符



```mysql
SELECT id, SUBSTRING(data, 1, 100) AS data_short FROM details;
SELECT COUNT(*) AS record_count, GROUP_CONCAT(id) AS id_list FROM details;

SHOW VARIABLES LIKE "secure_file_priv";

SELECT * FROM details_test
INTO OUTFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/ss-21-49testdetails.csv'
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n';


SELECT 
SUBSTRING(`id`,1,5) AS `id`,
SUBSTRING(`data`,1,5) AS `data`,
SUBSTRING(`data_id`,1,5) AS `data_id`,
SUBSTRING(`name`,1,5) AS `name`,
SUBSTRING(`spuCode`,1,5) AS `spuCode`,
SUBSTRING(`desc`,1,5) AS `desc`,
SUBSTRING(`price`,1,5) AS `price`,
SUBSTRING(`oldPrice`,1,5) AS `oldPrice`,
SUBSTRING(`discount`,1,5) AS `discount`,
SUBSTRING(`inventory`,1,5) AS `inventory`,
SUBSTRING(`brand`,1,5) AS `brand`,
SUBSTRING(`salesCount`,1,5) AS `salesCount`,
SUBSTRING(`commentCount`,1,5) AS `commentCount`,
SUBSTRING(`collectCount`,1,5) AS `collectCount`,
SUBSTRING(`mainVideos`,1,5) AS `mainVideos`,
SUBSTRING(`videoScale`,1,5) AS `videoScale`,
SUBSTRING(`mainPictures`,1,5) AS `mainPictures`,
SUBSTRING(`specs`,1,5) AS `specs`,
SUBSTRING(`skus`,1,5) AS `skus`,
SUBSTRING(`categories`,1,5) AS `categories`,
SUBSTRING(`details`,1,5) AS `details`,
SUBSTRING(`isPreSale`,1,5) AS `isPreSale`,
SUBSTRING(`isCollect`,1,5) AS `isCollect`,
SUBSTRING(`recommends`,1,5) AS `recommends`,
SUBSTRING(`userAddresses`,1,5) AS `userAddresses`,
SUBSTRING(`similarProducts`,1,5) AS `similarProducts`,
SUBSTRING(`hotByDay`,1,5) AS `hotByDay`,
SUBSTRING(`evaluationInfo`,1,5) AS `evaluationInfo`
FROM details_test;

SELECT 
utFeedId,
totalCount,
SUBSTRING(`invite`,1,50) AS `invite`,
SUBSTRING(`keywords`,1,50) AS `keywords`,
SUBSTRING(`rateList`,1,50) AS `rateList`
FROM prerate;
| utFeedId   | varchar(50) | YES  |     | NULL    |       |
| totalCount | varchar(20) | YES  |     | NULL    |       |
| invite     | json        | YES  |     | NULL    |       |
| keywords   | json        | YES  |     | NULL    |       |
| rateList   | json        | YES  |     | NULL    |       |
```

CREATE TABLE rates_originImg_backup LIKE rates;

INSERT INTO rates_originImg_backup SELECT * FROM rates;

select count(*) from rates;

select category, substring(ratedata,500,150) AS ratedata from rates LIMIT 10;







# Ubuntu



$ sudo apt-get install nginx
$ sudo apt-get install nodejs
$ sudo apt-get install npm
$ sudo npm i -g npm@latest
$ sudo npm i -g n
$ sudo n stable



mysqldump.exe所在文件夹打开cmd

mysqldump -u root -p fresh-mart > fresh-mart.sql

`rz`上传文件

sudo mysql -u root -p 'MySQL@mm.`123'

CREATE DATABASE fresh_mart;

exit;

mysql -u root -p fresh_mart < fresh-mart.sql

```bash
server {
    listen 80;
    server_name example.com;


    location /manager/ {
        alias /var/www/fresh-mart/manager/dist;
        try_files $uri $uri/ /var/www/fresh-mart/manager/dist/index.html;


        # rewrite rule for client
        if (!-e $request_filename) {
            rewrite ^/manager/(.*)$ /manager/index.html last;
        }
    }

    location /client/ {
        alias /var/www/fresh-mart/client/dist;
        try_files $uri $uri/ /var/www/fresh-mart/client/dist/index.html;


        # rewrite rule for client
        if (!-e $request_filename) {
            rewrite ^/client/(.*)$ /client/index.html last;
        }
	}
	
    location /server/ {
        rewrite /server(.*) $1 break;
        proxy_pass http://localhost:8333/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

补充：项目文件夹fresh-mart移到了/usr/share/nginx/html/fresh-mart
现在要处理的文件包括：
服务端 /usr/share/nginx/html/fresh-mart/client/dist 
管理端/usr/share/nginx/html/fresh-mart/manager/dist
如何更改Nginx的配置以及更改项目中vue.config.js等的配置使得路径匹配正确 

  location /manager/ {
    alias /usr/share/nginx/html/fresh-mart/manager/dist/;
    try_files $uri $uri/ /manager/index.html;
    index  index.html index.htm;
  }



1. 构建category和tag表
> ### 分类表
> 0. id，与文章数据表中的categoryID对应，字符串，固定长度的uuid
> 1. categoryName，字符串，不超过30个字符
> 2. count，数字，统计包含categoryID对应的文章数据表的blog数量
> 3. blogIdList，数组，存放categoryID对应的文章数据表的id列表
> 
> ### 标签表
> 0. id，tag的id，固定长度的uuid
> 1. tagName，字符串，不超过30个字符
> 2. count，数字，统计包含tagName对应的文章数据表的blog数量
> 3. blogIdList，数组，存放对应的文章数据表的id列表

2. 每次新增、修改、删除blog的时候，更新category和tag表
