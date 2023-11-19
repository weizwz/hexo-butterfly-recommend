'use strict'
// 全局声明插件代号
const pluginname = 'butterfly_recommend'
// 全局声明依赖
const pug = require('pug')
const path = require('path')
const fs = require('hexo-fs')
const util = require('hexo-util')
const urlFor = util.url_for.bind(hexo)
const { version } = require('./package.json')

// 注册静态资源
hexo.extend.generator.register('recommend_lib', () => [
  {
    path: 'css/recommend.css',
    data: function () {
      return fs.createReadStream(path.resolve(path.resolve(__dirname, './lib'), 'recommend.css'))
    }
  }
])

// hexo过滤器 https://hexo.io/zh-cn/api/filter
hexo.extend.filter.register('after_generate', function () {
  // 获取整体的配置项名称
  const config = hexo.config.recommend || hexo.theme.config.recommend
  // 如果配置开启
  if (!(config && config.enable)) return

  /**
   * 获取所有文章 过滤推荐文章
   */
  var posts_list = hexo.locals.get('posts').data
  var recommend_list = []
  // 若文章的front_matter内设置了index和描述，则将其放到recommend_list内
  for (var item of posts_list) {
    if (item.recommend_index) {
      recommend_list.push(item)
    }
  }
  // 对recommend_list进行处理，使其按照index大小进行排序
  function sortNumber(a, b) {
    return a.recommend_index - b.recommend_index
  }
  recommend_list = recommend_list.sort(sortNumber)
  // 排序反转，使得数字越大越靠前
  recommend_list = recommend_list.reverse()
  // console.log('recommend_list', recommend_list)

  // 获取技能
  const defaultSkill = [
    { name: 'Vue', color: "#b8f0ae", icon: 'https://cdn.bywind.xyz/img/banners/vue.webp' },
    { name: 'Java', color: "#fffff", icon: 'https://cdn.bywind.xyz/img/banners/Java.webp' },
    { name: 'Docker', color: "#57b6e6", icon: 'https://cdn.bywind.xyz/img/banners/docker.webp' },
    { name: 'Webpack', color: "#2e3a41", icon: 'https://cdn.bywind.xyz/img/banners/webpack.webp' },
    { name: 'Photoshop', color: "#4082c3", icon: 'https://cdn.bywind.xyz/img/banners/PS.webp' },
    { name: 'Swift', color: "#eb6840", icon: 'https://cdn.bywind.xyz/img/banners/swift.webp' },
    { name: 'Python', color: "#fff", icon: 'https://cdn.bywind.xyz/img/banners/python.webp' },
    { name: 'Node', color: "#333", icon: 'https://cdn.bywind.xyz/img/banners/node-logo.svg' },
    { name: 'Git', color: "#df5b40", icon: 'https://cdn.bywind.xyz/img/banners/git.webp' },
    { name: 'Css', color: "#2c51db", icon: 'https://cdn.bywind.xyz/img/banners/css.webp' },
    { name: 'Js', color: "#f7cb4f", icon: 'https://cdn.bywind.xyz/img/banners/js.webp' },
  ]
  // 获取分类项目
  const category = config.category ? config.category : [
    { name: '必看精选', path: '/categories/精选/', shadow: 'var(--anzhiyu-shadow-blue)' },
    { name: '热门文章', path: '/categories/热门/', shadow: 'var(--anzhiyu-shadow-red)' },
    { name: '优质资源', path: '/categories/资源/', shadow: 'var(--anzhiyu-shadow-green)' }
  ]

  /**
   * 获取和设置配置项
   */
  // 集体声明配置项
  const data = {
    banner_title: config.banner.title && config.banner.title.length > 0 ? config.banner.title : ['无限活力', '与热爱生活', 'WEIZWZ.COM'],
    banner_skill: config.banner.skill && config.banner.skill.length > 0 ? config.banner.skill : defaultSkill,
    pjaxenable: hexo.theme.config.pjax.enable,
    enable_page: config.enable_page ? config.enable_page : 'all',
    exclude: config.exclude,
    timemode: config.timemode ? config.timemode : 'date',
    layout_type: config.layout.type,
    layout_name: config.layout.name,
    layout_index: config.layout.index ? config.layout.index : 0,
    error_img: config.error_img ? urlFor(config.error_img) : 'https://cdn.cbd.int/akilar-candyassets/image/loading.gif',
    insertposition: config.insertposition ? config.insertposition : 'afterbegin',
    recommend_list: recommend_list,
    default_descr: config.default_descr ? config.default_descr : '再怎么看我也不知道怎么描述它的啦！',
    swiper_js: config.swiper_js ? urlFor(config.swiper_js) : 'https://cdn.cbd.int/hexo-butterfly-swiper-anzhiyu/lib/swiper.min.js',
    custom_js: config.custom_js ? urlFor(config.custom_js) : 'https://cdn.cbd.int/hexo-butterfly-swiper-anzhiyu/lib/swiper_init.js',
    gsap_js: config.gsap_js ? urlFor(config.gsap_js) : 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.0/gsap.min.js',
    category: category
  }

  /**
   * 注入资源
   */
  // 渲染页面
  const temple_html_text = config.temple_html
    ? config.temple_html
    : pug.renderFile(path.join(__dirname, './lib/recommend.pug'), data)
  //脚本资源
  let js_text = `</script><script defer data-pjax src="${data.gsap_js}"></script>`

  //注入容器声明
  var get_layout
  //若指定为class类型的容器
  if (data.layout_type === 'class') {
    //则根据class类名及序列获取容器
    get_layout = `document.getElementsByClassName('${data.layout_name}')[${data.layout_index}]`
  }
  // 若指定为id类型的容器
  else if (data.layout_type === 'id') {
    // 直接根据id获取容器
    get_layout = `document.getElementById('${data.layout_name}')`
  }
  // 若未指定容器类型，默认使用id查询
  else {
    get_layout = `document.getElementById('${data.layout_name}')`
  }

  //挂载容器脚本
  var user_info_js = `
  <script data-pjax>
    function ${pluginname}_injector_config() {
      var parent_div_git = ${get_layout};
      var item_html = '${temple_html_text}';
      console.log('已挂载${pluginname}');
      parent_div_git.insertAdjacentHTML("${data.insertposition}",item_html);
    }
    var elist = '${data.exclude}'.split(',');
    var cpage = location.pathname;
    var epage = '${data.enable_page}';
    var flag = 0;

    for (var i=0;i<elist.length;i++) {
      if (cpage.includes(elist[i])) {
        flag++;
      }
    }

    if ((epage ==='all')&&(flag == 0)) {
      ${pluginname}_injector_config();
    }
    else if (epage === cpage) {
      ${pluginname}_injector_config();
    }
  </script>`

  // 此处利用挂载容器实现了二级注入
  hexo.extend.injector.register('body_end', user_info_js, 'home')
  // 注入脚本资源
  hexo.extend.injector.register('body_end', js_text, 'home')

  // 注入静态资源
  const css = hexo.extend.helper.get('css').bind(hexo)
  const js = hexo.extend.helper.get('js').bind(hexo)

  hexo.extend.injector.register('head_end', () => {
    return css(`/css/recommend.css?v=${version}`)
  },'home')
})
