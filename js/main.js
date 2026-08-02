(function(){
  'use strict';

  /* ---------- Año en footer ---------- */
  var yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Menú móvil ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click', function(){
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mainNav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Cabecera: fondo al hacer scroll ---------- */
  var header = document.getElementById('siteHeader');
  var lastScroll = 0;
  window.addEventListener('scroll', function(){
    var y = window.scrollY;
    if(header){
      header.style.boxShadow = y > 40 ? '0 10px 30px rgba(0,0,0,.35)' : 'none';
    }
    lastScroll = y;
  }, { passive: true });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ---------- Campo estelar (13 estrellas doradas ocultas entre el resto) ---------- */
  var field = document.getElementById('cosmicField');
  if(field){
    var TOTAL_STARS = 90;
    var GOLD_COUNT = 13;
    var goldIndexes = new Set();
    while(goldIndexes.size < GOLD_COUNT){
      goldIndexes.add(Math.floor(Math.random() * TOTAL_STARS));
    }
    var frag = document.createDocumentFragment();
    for(var i = 0; i < TOTAL_STARS; i++){
      var star = document.createElement('span');
      star.className = 'star' + (goldIndexes.has(i) ? ' gold13' : '');
      star.style.top = (Math.random() * 100) + 'vh';
      star.style.left = (Math.random() * 100) + 'vw';
      star.style.animationDelay = (Math.random() * 6) + 's';
      star.style.animationDuration = (4 + Math.random() * 5) + 's';
      frag.appendChild(star);
    }
    field.appendChild(frag);
  }

  /* ---------- Trece marcas alrededor del iris (cosmograma) ---------- */
  function drawThirteenTicks(container, cx, cy, rInner, rOuter){
    var ns = 'http://www.w3.org/2000/svg';
    for(var i = 0; i < 13; i++){
      var angle = (i / 13) * Math.PI * 2 - Math.PI / 2;
      var x1 = cx + rInner * Math.cos(angle);
      var y1 = cy + rInner * Math.sin(angle);
      var x2 = cx + rOuter * Math.cos(angle);
      var y2 = cy + rOuter * Math.sin(angle);
      var line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', x1); line.setAttribute('y1', y1);
      line.setAttribute('x2', x2); line.setAttribute('y2', y2);
      container.appendChild(line);
    }
  }
  var smallTicks = document.querySelector('.thirteen-ticks');
  if(smallTicks) drawThirteenTicks(smallTicks, 60, 60, 24, 28);
  var bigTicks = document.querySelector('.thirteen-ring');
  if(bigTicks) drawThirteenTicks(bigTicks, 100, 100, 40, 46);

  /* ---------- Toast ---------- */
  var toastEl = document.getElementById('toast');
  var toastTimer;
  function showToast(message){
    if(!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){
      toastEl.classList.remove('is-visible');
    }, 3200);
  }

  /* ---------- Reproductores de audio (interfaz, sin archivo real) ---------- */
  var currentlyPlaying = null;
  document.querySelectorAll('[data-player]').forEach(function(player){
    var btn = player.querySelector('[data-play]');
    var status = player.querySelector('[data-status]');
    var originalStatus = status ? status.textContent : '';
    if(!btn) return;
    btn.addEventListener('click', function(){
      var isPlaying = btn.classList.contains('is-playing');

      if(currentlyPlaying && currentlyPlaying !== player){
        var prevBtn = currentlyPlaying.querySelector('[data-play]');
        var prevStatus = currentlyPlaying.querySelector('[data-status]');
        if(prevBtn) prevBtn.classList.remove('is-playing');
        currentlyPlaying.classList.remove('is-playing');
        if(prevStatus) prevStatus.textContent = prevStatus.dataset.original || prevStatus.textContent;
      }

      if(!status.dataset.original) status.dataset.original = originalStatus;

      if(isPlaying){
        btn.classList.remove('is-playing');
        player.classList.remove('is-playing');
        status.textContent = status.dataset.original;
        currentlyPlaying = null;
      } else {
        btn.classList.add('is-playing');
        player.classList.add('is-playing');
        status.textContent = 'Audio en preparación…';
        currentlyPlaying = player;
        showToast('Este audio está en preparación. Vuelve pronto para escucharlo completo.');
      }
    });
  });

  /* ---------- Vídeos (miniatura interactiva, sin archivo real) ---------- */
  document.querySelectorAll('[data-video-play]').forEach(function(btn){
    btn.addEventListener('click', function(){
      showToast('Este vídeo está en preparación. Disponible pronto.');
    });
  });

  /* ---------- Formulario de contacto ---------- */
  var form = document.getElementById('contact-form');
  var feedback = document.getElementById('formFeedback');
  if(form && feedback){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(!name || !email || !message || !emailPattern.test(email)){
        feedback.textContent = 'Algo no llegó bien. ¿Puedes intentarlo de nuevo?';
        feedback.className = 'form-feedback error';
        return;
      }

      feedback.textContent = 'Gracias. Te responderé con presencia y claridad.';
      feedback.className = 'form-feedback success';
      form.reset();
    });
  }

})();
