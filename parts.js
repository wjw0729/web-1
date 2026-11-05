function load(file, target) {
  fetch(file).then(r => r.text()).then(html => {
    document.getElementById(target).innerHTML = html;
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
  });
}
load('nav.html', 'site-header');
load('footer.html', 'site-footer');