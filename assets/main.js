/* Car Festion — animations & interactive behaviour */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    // Sticky nav border on scroll
    var nav = document.querySelector(".nav");
    if (nav) {
      var onScroll = function () {
        nav.classList.toggle("scrolled", window.scrollY > 10);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Mobile menu
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".mobile-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", menu.classList.contains("open") ? "true" : "false");
      });
      menu.addEventListener("click", function (e) {
        if (e.target.tagName === "A") menu.classList.remove("open");
      });
    }

    // Hero Word Rotator (Engineering Experiences / Transparency / Maintainance)
    var rotator = document.getElementById("heroRotator");
    if (rotator) {
      var items = rotator.querySelectorAll(".rotator-item");
      if (items.length > 1) {
        var currentIndex = 0;
        setInterval(function () {
          var prevItem = items[currentIndex];
          currentIndex = (currentIndex + 1) % items.length;
          var nextItem = items[currentIndex];

          prevItem.classList.remove("active");
          prevItem.classList.add("exit");

          setTimeout(function () {
            prevItem.classList.remove("exit");
          }, 500);

          nextItem.classList.add("active");
        }, 2500);
      }
    }

    // Hero Media Subtle Scroll Zoom & Parallax
    var heroMedia = document.getElementById("heroMedia");
    if (heroMedia) {
      var onHeroScroll = function () {
        var rect = heroMedia.getBoundingClientRect();
        var winHeight = window.innerHeight;
        if (rect.top < winHeight && rect.bottom > 0) {
          var progress = Math.min(1, Math.max(0, 1 - rect.top / winHeight));
          var scale = 0.96 + progress * 0.04;
          heroMedia.style.transform = "scale(" + scale.toFixed(4) + ")";
        }
      };
      window.addEventListener("scroll", onHeroScroll, { passive: true });
      onHeroScroll();
    }

    // Interactive Before & After Comparison Slider
    var sliderContainer = document.getElementById("beforeAfterSlider");
    if (sliderContainer) {
      var isDragging = false;

      var updateSliderPosition = function (clientX) {
        var rect = sliderContainer.getBoundingClientRect();
        var posX = clientX - rect.left;
        var percentage = (posX / rect.width) * 100;
        percentage = Math.max(0, Math.min(100, percentage));
        sliderContainer.style.setProperty("--slider-pos", percentage.toFixed(2) + "%");
      };

      // Mouse drag / hover scrub events
      sliderContainer.addEventListener("pointerdown", function (e) {
        isDragging = true;
        sliderContainer.classList.add("is-dragging");
        sliderContainer.setPointerCapture(e.pointerId);
        updateSliderPosition(e.clientX);
      });

      sliderContainer.addEventListener("pointermove", function (e) {
        // Also supports hover scrub when moving over container, or dragging
        updateSliderPosition(e.clientX);
      });

      var stopDrag = function (e) {
        if (isDragging) {
          isDragging = false;
          sliderContainer.classList.remove("is-dragging");
          try {
            sliderContainer.releasePointerCapture(e.pointerId);
          } catch (err) {}
        }
      };

      sliderContainer.addEventListener("pointerup", stopDrag);
      sliderContainer.addEventListener("pointercancel", stopDrag);
      sliderContainer.addEventListener("mouseleave", function () {
        // Smoothly settle back near center if desired, or keep current
      });
    }

    // FAQ accordion
    document.querySelectorAll(".faq-item").forEach(function (item) {
      var btn = item.querySelector(".faq-q");
      var panel = item.querySelector(".faq-a");
      if (!btn || !panel) return;
      btn.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach(function (other) {
          other.classList.remove("open");
          var p = other.querySelector(".faq-a");
          if (p) p.style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add("open");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });

    // Scroll reveal with IntersectionObserver
    var revealables = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 },
      );
      revealables.forEach(function (el, i) {
        el.style.transitionDelay = (i % 3) * 80 + "ms";
        io.observe(el);
      });
    } else {
      revealables.forEach(function (el) {
        el.classList.add("in");
      });
    }

    // 3D Flip Card tap/click toggle for touch/mobile
    document.querySelectorAll(".step-card").forEach(function (card) {
      card.addEventListener("click", function (e) {
        if (e.target.tagName === "A" || e.target.closest("a")) return;
        card.classList.toggle("is-flipped");
      });
    });

    // Contact form (markup only — no backend)
    var form = document.querySelector("form.form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var note = form.querySelector(".form-note");
        if (note) {
          note.textContent = "Thanks! This demo form isn't connected to a backend yet.";
          note.style.color = "#3ef07a";
        }
      });
    }
  });
})();
