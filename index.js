'use strict';
// 全局声明插件代号
const pluginname = 'hexo_butterfly_recommend';
// 全局声明依赖
const pug = require('pug');
const path = require('path');
const fs = require('hexo-fs');
const { version } = require('./package.json');
const resource = require('./lib/resource.js')

// 注册静态资源
hexo.extend.generator.register('recommend_lib', () => [
  {
    path: 'css/recommend.css',
    data: function () {
      return fs.createReadStream(path.resolve(path.resolve(__dirname, './lib'), 'recommend.css'));
    }
  }
])

// hexo过滤器 https://hexo.io/zh-cn/api/filter
hexo.extend.filter.register(
  'after_generate', 
  function () {
    // 获取butterfly布局
    const layout = hexo.config.aside || hexo.theme.config.aside;
    const layout_position = layout['position'] || 'right';
    // 获取整体的配置项名称
    const config = hexo.config.recommend || hexo.theme.config.recommend;
    // 如果配置开启
    if (!(config && config.enable)) return;

    // 获取技能相关
    const skill = config.banner.skill && config.banner.skill.length > 0 ? config.banner.skill : [
      { name: 'Html', background: "#e9572b", color: "#fff", icon: 'fa-brands fa-html5' },
      { name: 'Css', background: "#2c51db", color: "#fff", icon: 'fa-brands fa-css3-alt' },
      { name: 'Sass', background: "#ca6496", color: "#fff", icon: 'fa-brands fa-sass' },
      { name: 'Bootstrap', background: "#563e7c", color: "#fff", icon: 'fa-brands fa-bootstrap' },
      { name: 'Js', background: "#f7cb4f", color: "#fff", icon: 'fa-brands fa-js' },
      { name: 'Vue', background: "#42b883", color: "#fff", icon: 'fa-brands fa-vuejs' },
      { name: 'Angular', background: "#bd0102", color: "#fff", icon: 'fa-brands fa-angular' },
      { name: 'Java', background: "#537a99", color: "#fff", icon: 'fa-brands fa-java' },
      { name: 'Jenkins', background: "#335061", color: "#fff", icon: 'fa-brands fa-jenkins' },
      { name: 'Docker', background: "#57b6e6", color: "#fff", icon: 'fa-brands fa-docker' },
      { name: 'Swift', background: "#f18135", color: "#fff", icon: 'fa-brands fa-swift' },
      { name: 'Python', background: "#3776ab", color: "#fff", icon: 'fa-brands fa-python' },
      { name: 'Node', background: "#37322e", color: "#7dbd05", icon: 'fa-brands fa-node' },
      { name: 'Git', background: "#df5b40", color: "#fff", icon: 'fa-brands fa-git-alt' },
    ]
    // 技能在界面分上下两组，无缝循环需要每组至少12个技能
    const line_minSkill = 12;
    const minSkill = skill.length % 2 === 0 ? (skill.length / 2) : Math.floor(skill.length / 2);
    let maxSkill = skill.length % 2 === 0 ? (skill.length / 2) : Math.ceil(skill.length / 2);
    // 设置maxSkill是为了保持上下组技能数相同
    maxSkill = maxSkill >= line_minSkill ? maxSkill : line_minSkill;
    const banner_skill_cycle_length = minSkill === 0 ? line_minSkill : Math.ceil(line_minSkill / minSkill);
    let banner_skill_cycle = [];
    for (let i = 0; i < banner_skill_cycle_length; i++) {
      banner_skill_cycle.push(i);
    }

    // 获取分类项目
    const category = config.category && config.category.length > 0 ? config.category : [
      { name: '必看精选', path: '/categories/精选/', icon: 'fa-solid fa-star', color: ['#358bff', '#15c6ff'] },
      { name: '热门文章', path: '/categories/热门/', icon: 'fa-solid fa-fire', color: ['#f65', '#ffbf37'] },
      { name: '优质资源', path: '/categories/资源/', icon: 'fa-solid fa-gem', color: ['#18e7ae', '#1eebeb'] }
    ]

    // cover 是否开启
    const recommend_enable = (config.post && config.post.cover && config.post.cover.enable === false) ? false : true;
    // 获取所有文章 过滤推荐文章
    const def_completion = {
      type: 'posts',
      text: '书生意气，挥斥方遒,君子不器,龙,天下熙熙，皆为利来；天下攘攘，皆为利往,博观而约取，厚积而薄发,为中华之崛起而读书',
      text_bg: 'rgba(255, 187, 106, .8),rgba(254, 38, 33,.8)', 
      text_color: '#ffbb6a',
      twelve_color: '#ffbb6a',
    }
    const paths_completion = Object.assign(def_completion, config.post.paths_completion);
    const posts_list = hexo.locals.get('posts').data;
    const posts_length = 6
    let recommend_list = [];
    let recommend_cover = null;
    if (config.post) {
      const recommend_paths = config.post.paths;
      let recommend_cover_item = config.post.cover;

      // 遍历查找 recommend_list
      if (recommend_paths) {
        for (const temp of recommend_paths) {
          for (const item of posts_list) {
            if (temp === item.path || (temp + '/' === item.path)) {
              recommend_list.push(item);
              // 如果文章没有cover 可拿top_img
              recommend_list[recommend_list.length - 1].recommend_cover = item.cover ? item.cover : (item.top_img ? item.top_img : '');
              break;
            }
          }
        }
      }
      // 补全 recommend_list
      const completion_length = posts_length - recommend_list.length;
      let completion_type = paths_completion.type;
      let completion_paths = recommend_paths && recommend_paths.length > 0 ? [].concat(recommend_paths) : [];
      const completion_text = paths_completion.text ? paths_completion.text.split(',') : paths_completion.text;
      if (completion_length > 0) {
        let postIdx = 0;
        // 循环添加
        while(recommend_list.length < posts_length) {
          if (posts_list.length < posts_length && recommend_list.length >= posts_list.length) {
            completion_type = 'text';
            if (!completion_text) {
              break;
            }
          }
          // 除了 posts 都是随机文章
          let idx = posts_list.length - 1 - postIdx
          if (completion_type === 'random' || completion_type === 'text') {
            idx = Math.floor(Math.random() * posts_list.length)
          }
          // 复制对象，避免影响之前的文章队列
          let _post = { ...posts_list[idx] }

          // 去重，非文字模式，或者文字模式但是总文章数大于等于6，或者文字模式下recommend_list数未到达总文章数
          if (completion_type !== 'text' || (completion_type === 'text' && posts_list.length >= posts_length) || (completion_type === 'text' && recommend_list.length < posts_length)) {
            const _path = _post.path.replace(/^(\s|\/)+|(\s|\/)+$/g, '');
            if(completion_paths.indexOf(_path + '') === -1) {
              completion_paths.push(_path)
              if (completion_type === 'text') {
                recommend_list.push(getTextPost(_post, postIdx))
              } else {
                recommend_list.push(_post)
                recommend_list[recommend_list.length - 1].recommend_cover = _post.cover ? _post.cover : (_post.top_img ? _post.top_img : '');
              }
              postIdx ++;
            }
          } else {
            recommend_list.push(getTextPost(_post, postIdx))
            postIdx ++;
          }
        }
        // 文字模式处理
        function getTextPost(_post, idx) {
          const _newPost = { ..._post }
          _newPost.completion_type = 'text';
          // 龙字特效
          const twelve = completion_text[idx] === '龙';
          let twelve_static = resource.dragon
          if (paths_completion.twelve_color) {
            const _colors = paths_completion.twelve_color.split(',');
            if (_colors.length === 1) {
              twelve_static = twelve_static.replace('url(#RadialGradient1)', _colors[0]);
            } else {
              twelve_static = twelve_static.replace('#fd091b', _colors[0]).replace('#ffa731', _colors[1]);
            }
          }
          const text = twelve ? twelve_static : completion_text[idx];
          _newPost.completion_text = text;
          _newPost.recommend_cover = _newPost.cover ? _newPost.cover : (_newPost.top_img ? _newPost.top_img : '');
          // 文字样式
          _newPost.completion_text_style = {
            text_bg: paths_completion.text_bg.split(','),
            text_color: paths_completion.text_color
          };
          // 生肖年
          if (twelve) {
            _newPost.completion_twelve = twelve;
            _newPost.completion_img = resource.cloud;
          }
          return _newPost;
        }
      }

      // 遍历查找 cover
      if (recommend_enable) {
        if (recommend_cover_item) {
          // 配置项全的话，不用再遍历
          if (recommend_cover_item.path && recommend_cover_item.img && recommend_cover_item.title && recommend_cover_item.subTitle) {
            recommend_cover = recommend_cover_item;
          } else {
            for (const item of posts_list) {
              if (recommend_cover_item.path === item.path || (recommend_cover_item.path + '/' === item.path)) {
                recommend_cover = item;
                break;
              }
            }
          }
          // 如果找到
          if (recommend_cover) {
            recommend_cover.recommend_title = recommend_cover_item.title || recommend_cover.title;
            recommend_cover.recommend_subTitle = recommend_cover_item.subTitle || formateDate(recommend_cover.date);
            recommend_cover.recommend_home_cover = recommend_cover_item.img || recommend_cover.cover || recommend_cover.top_img || '';
          }
        }
        // 未有相关配置/有相关配置但未找到 默认取最新一篇文章
        if (!recommend_cover) {
          recommend_cover = posts_list[posts_list.length - 1];
          recommend_cover.recommend_title = recommend_cover.title;
          recommend_cover.recommend_subTitle = formateDate(recommend_cover.date);
          recommend_cover.recommend_home_cover = recommend_cover.cover || recommend_cover.top_img || '';
        }
      }
    }

    // 获取所有文章路径，用于随机跳转
    let posts_path = [];
    for (const item of posts_list) {
      posts_path.push(item.path);
    }

    // 集体声明配置项
    const data = {
      color: intColor(config.color),
      banner_title: config.banner.title && config.banner.title.length > 0 ? config.banner.title : ['无限热爱', '生活与技术', 'WEIZWZ.COM'],
      banner_skill: {
        skill,
        cycle: banner_skill_cycle,
        maxSkill: maxSkill
      },
      enable_page: config.enable_page ? config.enable_page : '/',
      exclude: config.exclude,
      layout_type: config.layout.type,
      layout_name: config.layout.name,
      layout_index: config.layout.index ? config.layout.index : 0,
      recommend_list,
      recommend_cover,
      category,
      layout_position
    }

    // 渲染页面
    const temple_html_text = config.temple_html ? config.temple_html : pug.renderFile(path.join(__dirname, './lib/recommend.pug'), data);

    //注入容器声明
    let get_layout;
    //若指定为class类型的容器
    if (data.layout_type === 'class') {
      //则根据class类名及序列获取容器
      get_layout = `document.getElementsByClassName('${data.layout_name}')[${data.layout_index}]`;
    }
    // 若指定为id类型的容器
    else if (data.layout_type === 'id') {
      // 直接根据id获取容器
      get_layout = `document.getElementById('${data.layout_name}')`;
    }
    // 若未指定容器类型，默认使用id查询
    else {
      get_layout = `document.getElementById('${data.layout_name}')`;
    }

    //挂载容器脚本
    let user_info_js = `
      <script data-pjax>
        if (typeof window.recommend === 'undefined') {
          window.recommend = {
            ${pluginname}_init: function() {
              const $recommend = document.querySelector('#recommend');
              if($recommend) return;
              document.documentElement.style.setProperty('--recommend-main', '${data.color.main}');
              document.documentElement.style.setProperty('--recommend-deep', '${data.color.deep}');
              const ${pluginname}_elist = '${data.exclude}'.split(',');
              var ${pluginname}_cpage = location.pathname;
              const ${pluginname}_epage = '${data.enable_page}';
              var ${pluginname}_flag = 0;
        
              for (var i = 0; i < ${pluginname}_elist.length; i++) {
                if (${pluginname}_cpage.includes(${pluginname}_elist[i])) {
                  ${pluginname}_flag++;
                }
              }
              if ((${pluginname}_epage === 'all') && (${pluginname}_flag === 0)) {
                window.recommend.${pluginname}_injector_config();
              } else if (${pluginname}_epage === ${pluginname}_cpage) {
                window.recommend.${pluginname}_injector_config();
              }
            },
            ${pluginname}_injector_config: function() {
              var parent_div_git = ${get_layout};
              var item_html = '${temple_html_text}';
              parent_div_git.insertAdjacentHTML("afterbegin",item_html);
            },
            toRandomPost: function() {
              var posts_path = "${posts_path}".split(',');
              var randomPost = posts_path[Math.floor(Math.random() * posts_path.length)];
              window.recommend.toPost(randomPost);
            },
            toPost: function(href) {
              if (typeof pjax !== 'undefined') pjax.loadUrl('/' + href);
              else window.location.href = window.location.origin + (href.charAt(0) === '/' ? '' : '/') + href;
            },
            hideCover: function() {
              const $main = document.querySelector("#recommend-post-main");
              $main.className = 'recommend-post-main recommend-hide';
            },
            showCover: function() {
              const $main = document.querySelector("#recommend-post-main");
              if ($main) $main.className = 'recommend-post-main';
            },
            postScroll: function(dom) {
              const e = window.event || arguments.callee.caller.arguments[0];
              if (document.body.clientWidth <= 1200) {
                let o = -e.wheelDelta / 2;
                dom.scrollLeft += o;
                e.preventDefault();
              }
            }
          }
          console.log(
            "%c plugin ⭐ ${pluginname} ⭐ https://github.com/weizwz/hexo-butterfly-recommend ",
            "color: #fff; padding:3px; font-size:12px; background: linear-gradient(90deg, #358bff, #1eebeb);"
          )
        }
        window.recommend.${pluginname}_init();
      </script>`;

    // 此处利用挂载容器实现了二级注入
    hexo.extend.injector.register('body_end', user_info_js, 'default');

    // 注入静态资源
    const css = hexo.extend.helper.get('css').bind(hexo);
    // const js = hexo.extend.helper.get('js').bind(hexo)
    hexo.extend.injector.register('head_end', () => {
      return css(`/css/recommend.css?v=${version}`);
    }, 'default');
  },
  (hexo.config.recommend || hexo.config.theme_config.recommend)['priority'] || 10
)


// color初始化
function intColor(color) {
  const defaultColor = {
    main: '#409eff',
    deep: '#0075ffdd'
  };
  if (!color || color.length <= 0) {
    return defaultColor;
  }
  return {
    main: color[0] || defaultColor.main,
    deep: color.length >= 2 ? color[1] : defaultColor.deep
  }
}
// 格式化日期
function formateDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
}