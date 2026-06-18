(function () {
  var REF_PAGES = [
    { href: '/reference/vodice.html', label: 'Vodiče' },
    { href: '/reference/jistice.html', label: 'Jističe' },
    { href: '/reference/barevne-znaceni.html', label: 'Barevné značení' },
    { href: '/reference/tridy-ochrany.html', label: 'Třídy ochrany' },
    { href: '/reference/ucinky-proudu.html', label: 'Účinky proudu' },
    { href: '/reference/ochranna-opatreni.html', label: 'Ochranná opatření' },
    { href: '/reference/selv-pelv-felv.html', label: 'SELV/PELV/FELV' },
    { href: '/reference/ip-kryti.html', label: 'IP krytí' }
  ];

  function isActive(path, href) {
    return path === href || path.replace(/\/index\.html$/, '/') === href;
  }

  function renderRefNav() {
    var el = document.getElementById('refnav');
    if (!el) return;
    var path = window.location.pathname;
    var homeHref = '/index.html';
    var hubHref = '/reference/index.html';

    var temataHref = '/temata/index.html';
    var links = '';
    links += '<a href="' + homeHref + '" class="' + (isActive(path, homeHref) || path === '/' ? 'active' : '') + '">Test NV194</a>';
    links += '<a href="' + hubHref + '" class="' + (isActive(path, hubHref) ? 'active' : '') + '">Referenční tabulky</a>';
    links += '<a href="' + temataHref + '" class="' + (path.startsWith('/temata/') ? 'active' : '') + '">Silnoproudé rozvody</a>';
    for (var i = 0; i < REF_PAGES.length; i++) {
      var p = REF_PAGES[i];
      links += '<a href="' + p.href + '" class="' + (isActive(path, p.href) ? 'active' : '') + '">' + p.label + '</a>';
    }

    el.innerHTML = '<div class="nav">' + links + '</div>';
  }

  function obfuscateMail() {
    var ph = document.getElementById('footerMail');
    if (!ph) return;
    try {
      var u = atob(ph.dataset.u);
      var d = atob(ph.dataset.d);
      var addr = u + String.fromCharCode(64) + d;
      var a = document.createElement('a');
      a.textContent = addr;
      a.href = '#';
      a.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'mail' + 'to:' + addr;
      });
      ph.replaceWith(a);
    } catch (_) { /* ignore */ }
  }

  function init() {
    renderRefNav();
    obfuscateMail();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
