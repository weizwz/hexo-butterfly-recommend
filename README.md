# hexo-butterfly-recommend
`hexo-theme-butterfly` 主题的扩展，首页推荐组件

参考效果 [张洪Heo](https://blog.zhheo.com/) 
参考文章 [为博客顶部添加滚动banner及文章推荐卡片](https://blog.bywind.xyz/posts/ab6e072d.html) 
参考插件 [hexo-butterfly-swiper-anzhiyu-pro](https://github.com/anzhiyu-c/hexo-butterfly-swiper-anzhiyu-pro/tree/main) 

**感谢以上大大们的无私奉献**

参与调试或自定义修改，请前往 [butterfly-plug](https://github.com/weizwz/butterfly-plug)

## 计划
- [x] 技能树
- [x] 分类展示
- [x] 推荐封面
- [x] 二级推荐
- [x] 样式兼容性
- [ ] 推荐弹幕

## 安装
```shell
npm i hexo-butterfly-recommend --save
```

## 默认配置
将以下配置添加到 `_config.butterfly.yml` 或 `_config.yml`。
```yml
recommend:
  enable: true #开关
  priority: 5 #过滤器优先权
  enable_page: / #应用页面 /是首页，all所有界面，/categories分类页等
  exclude: #屏蔽页面，可以多个，用,号分隔。仅当enable_page为'all'时生效。
  layout: # 挂载容器类型
    type: id
    name: content-inner
    index: 1
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
    cover: #默认推荐页，不填的话默认取最新一篇文章
      path: '2023/11/20/butterfly-recommend使用说明' #推荐界面访问路径
      img: '/img/cover_default.png' #可为空，默认取cover，没有的话在取 top_img。最前面的/不可省略
      title: 'butterfly-recommend 正式发布了' #推荐标题，不填的话取文章标题
      subTitle: '首屏新组件' #推荐次标题，不填的话取文章时间
    paths: #次级推荐页 填博文访问路径
      - '2023/11/20/butterfly-recommend使用说明'
      - '2023/11/19/test-post'
      - '2023/11/21/Hexo-是什么'
      - '2023/11/19/hello-world'
      - '2023/11/21/如何开发hexo扩展插件'
      - '2023/11/21/Copilot-with-Bing-Chat'
```