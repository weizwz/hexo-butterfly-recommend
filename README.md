# hexo-butterfly-recommend
<p>
  <a href="https://www.npmjs.com/package/hexo-butterfly-recommend?activeTab=versions"><img src="https://img.shields.io/npm/v/hexo-butterfly-recommend?color=409eff" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/hexo-butterfly-recommend"><img src="https://img.shields.io/npm/dm/hexo-butterfly-recommend" alt="Coverage Status"></a>
  <a href="https://mit-license.org/"><img src="https://img.shields.io/github/license/weizwz/hexo-butterfly-recommend" alt="Downloads"></a>
</p>

[hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly) 主题的扩展，首页推荐组件 

实际效果展示 [唯之为之的博客](https://weizwz.com) 

演示博客示例 [butterfly-plug](https://github.com/weizwz/butterfly-plug) 

+ 参考界面 [张洪Heo](https://blog.zhheo.com/) 
+ 参考教程 [为博客顶部添加滚动banner及文章推荐卡片](https://blog.bywind.xyz/posts/ab6e072d.html) 
+ 参考插件 [hexo-butterfly-swiper-anzhiyu-pro](https://github.com/anzhiyu-c/hexo-butterfly-swiper-anzhiyu-pro/tree/main) 

**感谢以上大大们的无私奉献**

参与调试/自定义修改/开发butterfly主题插件，可配合 [butterfly-plug](https://github.com/weizwz/butterfly-plug) 项目示例，欢迎 `⭐Star`。

## 文档
参考 [hexo-butterfly-recommend使用说明](https://weizwz.com/posts/7db60965.html)

## 安装
```shell
npm i hexo-butterfly-recommend --save
```

## 升级
```shell
npm update hexo-butterfly-recommend --save
```

## 默认配置
将以下配置添加到 `_config.butterfly.yml` 或 `_config.yml`。
```yml
recommend:
  enable: true #开关
  color: #非必选 主题色，有两个．第二个是随机逛逛的背景色，要有透明度，也可是rgab的形式，比如： '#409eff,rgba(0, 117, 255, .8)'
    - '#409eff'
    - '#0075ffdd'
  priority: 5 #过滤器优先权 默认10，值越低过滤器越早执行
  enable_page: / #应用页面 /是首页，all所有界面，/categories分类页等
  exclude: #屏蔽页面，可以多个，用,号分隔。仅当enable_page为'all'时生效。
  layout: #挂载容器类型
    type: id
    name: content-inner #容器名称
    index: 1 #如果是class，取第几个
  banner: #banner
    title: 
      - '无限热爱'
      - '生活与技术'
      - 'WEIZWZ.COM'
    skill: #技能树  fontawesome图标 https://fontawesome.com/search?o=r&m=free&f=brands
      - name: 'Html'
        icon: 'fa-brands fa-html5'
        color: '#fff'
        background: '#e9572b'
      - name: 'Css'
        icon: 'fa-brands fa-css3-alt'
        color: '#fff'
        background: '#2c51db'
      - name: 'Sass'
        icon: 'fa-brands fa-sass'
        color: '#fff'
        background: '#ca6496'
      - name: 'Bootstrap'
        icon: 'fa-brands fa-bootstrap'
        color: '#fff'
        background: '#563e7c'
      - name: 'Js'
        icon: 'fa-brands fa-js'
        color: '#fff'
        background: '#f7cb4f'
      - name: 'Vue'
        icon: 'fa-brands fa-vuejs'
        color: '#fff'
        background: '#42b883'
      - name: 'Angular'
        icon: 'fa-brands fa-angular'
        color: '#fff'
        background: '#bd0102'
      - name: 'Node'
        icon: 'fa-brands fa-node'
        color: '#7dbd05'
        background: '#37322e'
      - name: 'Git'
        icon: 'fa-brands fa-git-alt'
        color: '#fff'
        background: '#df5b40'
  category:
    - name: '必看精选'
      path: 'categories/精选'
      icon: 'fa-solid fa-star' #fontawesome图标
      color: #渐变色
        - '#358bff'
        - '#15c6ff'
    - name: '热门文章'
      path: 'categories/热门'
      icon: 'fa-solid fa-fire'
      color: 
        - '#f65'
        - '#ffbf37'
    - name: '优质资源'
      path: 'categories/资源'
      icon: 'fa-solid fa-gem'
      color: 
        - '#18e7ae'
        - '#1eebeb'
  post: 
    cover: #默认推荐页
      enable: true #开关，关闭的话，path，img等无需再配置；开启了但后续无其他配置，默认取最新一篇文章
      path: '2023/11/20/butterfly-recommend使用说明' #推荐界面访问路径 也可设置分类页，需要其余配置都齐全
      img: '/img/cover_default.png' #可为空，默认取cover，没有的话在取 top_img。最前面的/不可省略
      title: 'butterfly-recommend 正式发布了' #推荐标题，不填的话取文章标题
      subTitle: '首屏新组件' #推荐次标题，不填的话取文章时间
    paths: #次级推荐页 填博文访问路径
      # - '2023/11/20/butterfly-recommend使用说明'
      # - '2023/11/19/test-post'
      # - '2023/11/21/Hexo-是什么'
      # - '2023/11/19/hello-world'
      # - '2023/11/21/如何开发hexo扩展插件'
      # - '2023/11/21/Copilot-with-Bing-Chat'
    paths_completion: #次级推荐页补全，当 paths 不足6个时自动生效
      type: 'text' #值为'posts' 或者 'random' 或者 'text'
      text: '祝君龙年大吉，龙福齐天,龙兴大运，生意兴龙,龙,龙腾虎跃，龙光焕发,龙体安康，生龙活虎,龙华富贵，万事兴龙' #当 type 为 text 时生效。以,号分隔，取前6个。有单独的龙字时出现特效
      # text_bg: 'rgba(254, 38, 33,.8),rgba(255, 187, 106, .8)' #文字背景渐变，建议有透明色，最多支持2个，以,号分隔
      # text_color: '#ffbb6a' #文字颜色
      # twelve_color: '#fd091b,#ffa731' #生肖图案渐变色，最多支持2个，当 text 中含有单独生肖文字时，此配置生效
```

## 图标
图标支持其他字体图标库，需自行引入，以 `iconfont` 为例：

```yml
tag_plugins:
  enable: true # 开关
  CDN:
    iconfont: /js/ali_font.js #参看 https://butterfly.js.org/posts/4073eda/?highlight=iconfont#iconfont
# 中间省略
inject:
  head:
    # 引入字体图标 iconfont
    - <link rel="stylesheet" href="https://at.alicdn.com/xxxxx.css">
# 以上是 hexo-theme-butterfly 原有配置，无需新增
recommend:
    skill: #技能树  fontawesome图标 https://fontawesome.com/search?o=r&m=free&f=brands
      - name: 'Js'
        icon: 'iconfont icon-logo-javascript'
        color: '#fff'
        background: '#f7cb4f'
      - name: 'Ts'
        icon: 'iconfont icon-ts'
        color: '#fff'
        background: '#0288d1'
```
