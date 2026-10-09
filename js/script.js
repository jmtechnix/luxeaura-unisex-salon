/* LuxeAura demo interactions — vanilla JavaScript only */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("#primary-menu");
  const navLinks = navMenu ? navMenu.querySelectorAll('a[href^="#"]') : [];

  // Accessible mobile navigation.
  function closeMenu() {
    if (!menuToggle || !navMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      navMenu.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  // Service video previews: play a 10-second excerpt only when the card is visible.
  // The still image remains as a graceful fallback if a remote clip cannot load.
  const serviceVideos = document.querySelectorAll(".service-video");
  serviceVideos.forEach((video) => {
    const wrapper = video.closest(".service-image");
    const source = video.querySelector("source");
    video.addEventListener("loadeddata", () => {
      wrapper?.classList.add("video-ready");
      try { video.currentTime = 0; } catch (_) {}
    }, { once: true });
    video.addEventListener("error", () => {
      wrapper?.classList.remove("video-ready");
    });
    video.addEventListener("timeupdate", () => {
      if (video.currentTime >= 10) {
        video.currentTime = 0;
        if (!video.paused) video.play().catch(() => {});
      }
    });
    video.addEventListener("ended", () => {
      video.currentTime = 0;
      if (wrapper?.dataset.inView === "true") video.play().catch(() => {});
    });
    // Avoid downloading all twelve videos at once on page load.
    video.preload = "none";
  });
  if ("IntersectionObserver" in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        const wrapper = video.closest(".service-image");
        if (entry.isIntersecting) {
          if (wrapper) wrapper.dataset.inView = "true";
          video.play().catch(() => {});
        } else {
          if (wrapper) wrapper.dataset.inView = "false";
          video.pause();
        }
      });
    }, { threshold: 0.35 });
    serviceVideos.forEach((video) => videoObserver.observe(video));
  }

  // Service category filter.
  const filterButtons = document.querySelectorAll(".filter-button");
  const serviceCards = document.querySelectorAll(".service-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      serviceCards.forEach((card) => {
        const matches = selectedCategory === "all" || card.dataset.category === selectedCategory;
        card.hidden = !matches;
      });
    });
  });

  // Service booking buttons jump to the form and preselect their service.
  const serviceSelect = document.querySelector("#service-select");
  document.querySelectorAll(".book-service").forEach((button) => {
    button.addEventListener("click", () => {
      if (serviceSelect) {
        const wantedService = button.dataset.service;
        const matchingOption = Array.from(serviceSelect.options).find((option) => option.text === wantedService);
        if (matchingOption) serviceSelect.value = matchingOption.value;
      }
      document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => serviceSelect?.focus({ preventScroll: true }), 450);
    });
  });

  // Date field cannot select a date earlier than the user's local date.
  const dateInput = document.querySelector("#appointment-date");
  function getLocalDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  if (dateInput) dateInput.min = getLocalDateString();

  // Form shows a local-only preview; no network requests or storage are used.
  const bookingForm = document.querySelector("#booking-form");
  const bookingResult = document.querySelector("#booking-result");
  const bookingSummary = document.querySelector("#booking-summary");
  const editBookingButton = document.querySelector("#edit-booking");

  if (bookingForm && bookingResult && bookingSummary) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!bookingForm.reportValidity()) return;

      // Recheck the date in case the page remained open across midnight.
      if (dateInput && dateInput.value < getLocalDateString()) {
        dateInput.setCustomValidity("Please choose today or a future date.");
        dateInput.reportValidity();
        dateInput.setCustomValidity("");
        return;
      }

      const formData = new FormData(bookingForm);
      const labels = [
        ["Name", "fullName"],
        ["Phone", "phone"],
        ["Service", "service"],
        ["Preferred date", "date"],
        ["Preferred time", "time"]
      ];

      bookingSummary.replaceChildren();
      labels.forEach(([label, key]) => {
        const term = document.createElement("dt");
        const detail = document.createElement("dd");
        term.textContent = label;
        detail.textContent = String(formData.get(key) || "");
        bookingSummary.append(term, detail);
      });

      const message = String(formData.get("message") || "").trim();
      if (message) {
        const term = document.createElement("dt");
        const detail = document.createElement("dd");
        term.textContent = "Message";
        detail.textContent = message;
        bookingSummary.append(term, detail);
      }

      bookingForm.hidden = true;
      bookingResult.hidden = false;
      bookingResult.focus();
    });

    editBookingButton?.addEventListener("click", () => {
      bookingResult.hidden = true;
      bookingForm.hidden = false;
      document.querySelector("#full-name")?.focus();
    });
  }

  // Keep the copyright year current.
  const yearElement = document.querySelector("#current-year");
  if (yearElement) yearElement.textContent = String(new Date().getFullYear());
});
