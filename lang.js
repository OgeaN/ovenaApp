/**
 * Dil secimi - Turkce / Ingilizce.
 *
 * Ingilizce'yi de tasimak bilincli bir tercih: Google Play incelemesini
 * Ingilizce konusan ekipler yapabiliyor ve bu sayfalarin (ozellikle hesap
 * silme) onlar tarafindan okunabilmesi gerekiyor.
 *
 * Secim localStorage'a yazilir; sayfalar arasi gecerken kullanicinin
 * tercihi korunur. Tercih yoksa tarayici diline bakilir.
 */
(function () {
  var KEY = 'ovena-lang';

  function apply(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.classList.toggle('on', el.getAttribute('data-lang') === lang);
    });

    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set') === lang));
    });

    // Sayfa basligi da dile uymali - tarayici sekmesinde gorunuyor.
    var title = document.querySelector('[data-title-' + lang + ']');
    if (title) document.title = title.getAttribute('data-title-' + lang);

    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {
      // Gizli sekmede localStorage yazmak hata verebilir - sorun degil,
      // dil yine de bu sayfa icin uygulandi.
    }
  }

  function initial() {
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === 'tr' || saved === 'en') return saved;
    } catch (e) {
      /* okunamadi - tarayici diline duselim */
    }
    return (navigator.language || 'en').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
  }

  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      apply(b.getAttribute('data-set'));
    });
  });

  apply(initial());
})();
