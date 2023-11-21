# hexo-butterfly-recommend
`hexo-theme-butterfly` 主题的扩展，首页推荐组件

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
  enable_page: / #应用页面 /是首页
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
      path: '/categories/精选/'
      icon: 'fa-solid fa-star' #fontawesome图标
      color: #渐变色
        - '#358bff'
        - '#15c6ff'
    - name: '热门文章'
      path: '/categories/热门/'
      icon: 'fa-solid fa-fire'
      color: 
        - '#f65'
        - '#ffbf37'
    - name: '优质资源'
      path: '/categories/资源/'
      icon: 'fa-solid fa-gem'
      color: 
        - '#18e7ae'
        - '#1eebeb'
  post: 
  cover: '2023/11/20/butterfly-recommend使用说明/'
  paths: 
    - '2023/11/20/butterfly-recommend使用说明/'
    - '2023/11/19/test-post/'
```