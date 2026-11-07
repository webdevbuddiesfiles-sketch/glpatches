document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.glpp26-burger');
  var nav = document.querySelector('.glpp26-nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('glpp26-nav--open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('glpp26-nav--open');
      });
    });
  }

  document.querySelectorAll('.glpp26-faq-item').forEach(function (item) {
    var q = item.querySelector('.glpp26-faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('glpp26-open');
      item.parentNode.querySelectorAll('.glpp26-faq-item').forEach(function (i) {
        i.classList.remove('glpp26-open');
      });
      if (!wasOpen) item.classList.add('glpp26-open');
    });
  });
});
