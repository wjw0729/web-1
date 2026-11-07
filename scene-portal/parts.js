// parts.js — 站点交互（语言 / 音效 / 主题 / 当前页高亮）
// 导航与页脚已写入每个 HTML，静态页面自带完整的 <nav> 和 <footer>。
window.isSoundOn = true;

(function () {
  function init() {
    /* 1. 当前页高亮 */
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      var href = link.getAttribute('href');
      if ((currentPath === 'hourglass.html' || currentPath === 'hourglass-intro.html') && href === 'hourglass-intro.html') {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else if (href === currentPath) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });

    /* 2. 中英切换（切换界面文案，不改变页面内容） */
    var currentLang = 'en';
    var dict = {
      zh: {
        home: '首页', gallery: '画廊', hourglass: '时间沙漏', museum: '博物馆', about: '关于',
        hint: '🖱️ 拖拽旋转 | 🔍 滚轮缩放 | 👆 悬停并点击',
        stay: '留下', enter: '进入时空', tooltipAction: '点击进入时空 →'
      },
      en: {
        home: 'Home', gallery: 'Gallery', hourglass: 'Hourglass', museum: 'Museum', about: 'About',
        hint: '🖱️ Drag to Rotate | 🔍 Scroll to Zoom | 👆 Hover & Click',
        stay: 'Stay', enter: 'Enter Portal', tooltipAction: 'Click to enter portal →'
      }
    };
    var langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', function () {
        currentLang = currentLang === 'en' ? 'zh' : 'en';
        var d = dict[currentLang];
        this.textContent = currentLang === 'en' ? '中' : 'EN';
        this.setAttribute('aria-label', currentLang === 'en' ? 'Switch to Chinese' : 'Switch to English');
        var keys = ['home', 'gallery', 'hourglass', 'museum', 'about'];
        document.querySelectorAll('.nav-links a').forEach(function (a, i) {
          if (keys[i]) a.textContent = d[keys[i]];
        });
        var hint = document.querySelector('#ui-hints p');
        if (hint) hint.textContent = d.hint;
        var cancel = document.getElementById('cancel-btn');
        if (cancel) cancel.textContent = d.stay;
        var confirm = document.getElementById('confirm-btn');
        if (confirm) confirm.textContent = d.enter;
        var tip = document.querySelector('.tooltip-action');
        if (tip) tip.textContent = d.tooltipAction;
      });
    }

    /* 3. 音效开关 */
    var soundBtn = document.getElementById('sound-toggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', function () {
        window.isSoundOn = !window.isSoundOn;
        this.textContent = window.isSoundOn ? '🔊' : '🔇';
        this.setAttribute('aria-label', window.isSoundOn ? 'Mute sound' : 'Unmute sound');
      });
    }

    /* 4. 浅色 / 深色主题：用 class 切换，配套样式在 style.css 末尾 */
    var themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        var light = document.body.classList.toggle('light-theme');
        this.textContent = light ? '☀' : '☾';
        this.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
