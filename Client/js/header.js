'use strict';

(function () {
    const menuBtn = document.querySelector('#menu');
    const nav = document.querySelector('nav');
  
    menuBtn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
  
      this.setAttribute('aria-expanded', String(!expanded));
  
      if (!expanded) {
        nav.classList.add('visible');
      } else {
        nav.classList.remove('visible');
      }
    });
  })();
  