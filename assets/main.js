/* Car Fashion — animations & interactive behaviour */
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
        if (e.target.tagName === "A") {
          menu.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && menu.classList.contains("open")) {
          menu.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
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

    // Toast notification utility
    function showToast(message) {
      var container = document.querySelector(".toast-container");
      if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
      }
      var toast = document.createElement("div");
      toast.className = "toast";
      toast.innerHTML = '<div class="toast-icon">✓</div><div>' + message + '</div>';
      container.appendChild(toast);

      requestAnimationFrame(function () {
        toast.classList.add("show");
      });

      setTimeout(function () {
        toast.classList.remove("show");
        setTimeout(function () {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 400);
      }, 4000);
    }

    // Contact & Service Booking Form Interactive Handler
    var form = document.querySelector("form.form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var submitBtn = form.querySelector("button[type='submit']");
        var originalBtnText = submitBtn ? submitBtn.textContent : "Confirm Appointment";

        var nameInput = form.querySelector("input[name='name']") || form.querySelector("input[type='text']");
        var phoneInput = form.querySelector("input[name='phone']") || form.querySelector("input[type='tel']");
        var serviceSelect = form.querySelector("select[name='service']") || form.querySelector("select");
        var messageInput = form.querySelector("textarea[name='message']") || form.querySelector("textarea");

        var name = nameInput ? nameInput.value.trim() : "";
        var phone = phoneInput ? phoneInput.value.trim() : "";
        var service = serviceSelect ? serviceSelect.value : "General Service / Inquiry";
        var notes = messageInput ? messageInput.value.trim() : "";

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = "Booking Confirmed...";
        }

        setTimeout(function () {
          showToast("Booking Request Received! Our Surat team will contact you shortly.");
          if (submitBtn) {
            submitBtn.textContent = "✓ Appointment Booked";
            submitBtn.style.background = "#3ef07a";
            submitBtn.style.color = "#050505";
          }

          // Generate WhatsApp direct reservation link
          var waText = encodeURIComponent(
            "Hello Car Fashion Surat,\n\nI want to book an appointment.\n*Name:* " +
              (name || "Customer") +
              "\n*Phone:* " +
              (phone || "Not specified") +
              "\n*Service:* " +
              service +
              (notes ? "\n*Notes:* " + notes : "")
          );
          var waUrl = "https://wa.me/918401847989?text=" + waText;

          var note = form.querySelector(".form-note");
          if (note) {
            note.innerHTML =
              'Booking confirmed! <a href="' +
              waUrl +
              '" target="_blank" rel="noopener" style="color:#3ef07a;text-decoration:underline;margin-left:6px;font-weight:600;">Chat on WhatsApp directly →</a>';
          }
        }, 600);
      });
    }

    // Policy & Terms Modal Handlers
    document.querySelectorAll('a[href="#privacy"], a[href="#terms"], a[href="#"]').forEach(function (link) {
      var text = (link.textContent || "").toLowerCase();
      if (text.includes("privacy") || text.includes("terms")) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          var isPrivacy = text.includes("privacy");
          var modalTitle = isPrivacy ? "Privacy Policy" : "Terms of Service";
          var modalContent = isPrivacy
            ? "Car Fashion Surat respects your privacy. We strictly collect only necessary diagnostic and contact details to service your vehicle and schedule appointments. We never sell or share your personal data with third-party advertisers."
            : "All automotive servicing, accessories installations, and warranties provided by Car Fashion Surat comply with standard OEM quality guidelines and certified workshop safety protocols. Estimates are provided before work begins.";

          var overlay = document.querySelector(".modal-overlay");
          if (!overlay) {
            overlay = document.createElement("div");
            overlay.className = "modal-overlay";
            overlay.innerHTML =
              '<div class="modal-box"><button class="modal-close-btn" aria-label="Close modal">&times;</button><h3 id="modalHeading"></h3><p id="modalBody"></p><p style="font-size:13px;color:#888;margin-top:16px;">Car Fashion · S/15 Green Residency Showroom, Opp DMart, Dindoli, Surat, Gujarat 394210 · Phone: +91 84018 47989</p></div>';
            document.body.appendChild(overlay);

            overlay.querySelector(".modal-close-btn").addEventListener("click", function () {
              overlay.classList.remove("open");
            });
            overlay.addEventListener("click", function (evt) {
              if (evt.target === overlay) overlay.classList.remove("open");
            });
          }

          document.getElementById("modalHeading").textContent = modalTitle;
          document.getElementById("modalBody").textContent = modalContent;
          overlay.classList.add("open");
        });
      }
    });
  });
})();
