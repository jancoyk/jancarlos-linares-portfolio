(function() {
  'use strict';

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 900) {
          navLinks.classList.remove('open');
        }
      });
    });
  }

  // ===== SCROLL SUAVE =====
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var navHeight = document.querySelector('.navbar').offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== FADE IN CON INTERSECTION OBSERVER =====
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (entry.target.classList.contains('fade-in')) {
            entry.target.style.opacity = '1';
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(function(el) {
      observer.observe(el);
    });
  }

  // ===== FALLBACK =====
  document.addEventListener('DOMContentLoaded', function() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.fade-in').forEach(function(el) {
        el.style.opacity = '1';
      });
    }

    var faders = document.querySelectorAll('.fade-in');
    faders.forEach(function(el) {
      if (!el.classList.contains('delay-1') && 
          !el.classList.contains('delay-2') && 
          !el.classList.contains('delay-3') &&
          !el.classList.contains('delay-4') &&
          !el.classList.contains('delay-5') &&
          !el.classList.contains('delay-6') &&
          !el.classList.contains('delay-7') &&
          !el.classList.contains('delay-8')) {
        var index = Array.from(faders).indexOf(el);
        var delay = ((index % 4) * 0.08 + 0.04);
        el.style.animationDelay = delay + 's';
      }
    });
  });

  // ===== EFECTO PARALLAX =====
  window.addEventListener('scroll', function() {
    var hero = document.querySelector('.hero');
    if (hero) {
      var scrollPosition = window.pageYOffset;
      var heroContent = hero.querySelector('.hero-content');
      var heroAvatar = hero.querySelector('.hero-avatar');
      
      if (scrollPosition < 600) {
        var parallaxOffset = scrollPosition * 0.08;
        if (heroContent) {
          heroContent.style.transform = 'translateY(' + (parallaxOffset * 0.5) + 'px)';
        }
        if (heroAvatar) {
          heroAvatar.style.transform = 'translateY(' + (-parallaxOffset * 0.3) + 'px)';
        }
      }
    }
  });

})();