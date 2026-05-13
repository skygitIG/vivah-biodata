/**
 * Marriage Biodata — static site interactions
 * GSAP + ScrollTrigger loaded from CDN in HTML
 */
(function () {
  "use strict";

  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mobile nav */
  const menuBtn = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuIconClose = document.getElementById("menu-icon-close");

  function setMenuOpen(open) {
    if (!menuBtn || !mobileNav) return;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    mobileNav.classList.toggle("hidden", !open);
    if (menuIconOpen) menuIconOpen.classList.toggle("hidden", open);
    if (menuIconClose) menuIconClose.classList.toggle("hidden", !open);
    document.body.classList.toggle("overflow-hidden", open);
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      const open = menuBtn.getAttribute("aria-expanded") !== "true";
      setMenuOpen(open);
    });
    mobileNav?.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        setMenuOpen(false);
      });
    });
  }

  /* Sticky navbar shadow */
  const header = document.getElementById("site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) {
      header.classList.add("shadow-soft", "bg-cream-50/95");
      header.classList.remove("shadow-none");
    } else {
      header.classList.remove("shadow-soft");
      header.classList.add("shadow-none");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* FAQ accordion */
  document.querySelectorAll("[data-accordion]").forEach(function (root) {
    const items = root.querySelectorAll("[data-accordion-item]");
    items.forEach(function (item) {
      const btn = item.querySelector("[data-accordion-trigger]");
      const panel = item.querySelector("[data-accordion-panel]");
      if (!btn || !panel) return;
      btn.addEventListener("click", function () {
        const isOpen = item.getAttribute("data-open") === "true";
        items.forEach(function (other) {
          if (other !== item) {
            other.setAttribute("data-open", "false");
            const p = other.querySelector("[data-accordion-panel]");
            const b = other.querySelector("[data-accordion-trigger]");
            if (p) p.style.maxHeight = "0px";
            if (b) b.setAttribute("aria-expanded", "false");
          }
        });
        item.setAttribute("data-open", isOpen ? "false" : "true");
        btn.setAttribute("aria-expanded", isOpen ? "false" : "true");
        panel.style.maxHeight = isOpen ? "0px" : panel.scrollHeight + "px";
      });
    });
  });

  /* Newsletter */
  const newsForm = document.getElementById("newsletter-form");
  if (newsForm) {
    newsForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const msg = document.getElementById("newsletter-msg");
      if (msg) {
        msg.textContent = "Thank you — you are on the list. We will share tips and new templates.";
        msg.classList.remove("hidden");
      }
      newsForm.reset();
    });
  }

  /* Contact form */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]');
      const email = contactForm.querySelector('[name="email"]');
      const msg = contactForm.querySelector('[name="message"]');
      const feedback = document.getElementById("contact-feedback");
      if (!feedback) return;
      feedback.classList.remove("hidden");
      if (!name?.value.trim() || !email?.value.trim() || !msg?.value.trim()) {
        feedback.textContent = "Please fill in all required fields.";
        feedback.className = "mt-1 min-h-[1.25rem] text-sm text-red-700";
        return;
      }
      feedback.textContent =
        "Thank you for reaching out. Our team will respond within one business day.";
      feedback.className = "mt-1 min-h-[1.25rem] text-sm text-sage-muted";
      contactForm.reset();
    });
  }

  /* Optional: scroll reveal removed for reliability; [data-reveal] stays visible in CSS */

  /* GSAP: counters + subtle hero */
  if (
    !prefersReduced &&
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined"
  ) {
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll("[data-counter]").forEach(function (el) {
      const end = parseInt(el.getAttribute("data-counter"), 10);
      if (Number.isNaN(end)) return;
      const obj = { val: 0 };
      gsap.fromTo(
        obj,
        { val: 0 },
        {
          val: end,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: function () {
            el.textContent = Math.round(obj.val).toLocaleString("en-IN");
          },
        }
      );
    });

    const hero = document.querySelector("[data-hero-inner]");
    if (hero) {
      gsap.from(hero.children, {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.05,
      });
    }
  } else {
    document.querySelectorAll("[data-counter]").forEach(function (el) {
      const end = parseInt(el.getAttribute("data-counter"), 10);
      if (!Number.isNaN(end)) el.textContent = end.toLocaleString("en-IN");
    });
  }
})();
