(function ($) {
  "use strict";

  // Mean Menu
  $(".mean-menu").meanmenu({
    meanScreenWidth: "991",
    meanMenuOpen:  "<span></span><span></span><span></span>",
    meanMenuClose: "<span></span><span></span><span></span>",
  });
  $(".meanmenu-reveal").attr("aria-label", "Menü öffnen");

  // Give Owl Carousel's auto-generated dot buttons an accessible name
  function labelOwlDots(carousel) {
    $(carousel)
      .find(".owl-dot")
      .each(function (i) {
        $(this).attr("aria-label", "Slide " + (i + 1));
      });
  }
  $(document).on(
    "initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel",
    ".owl-carousel",
    function () {
      labelOwlDots(this);
    }
  );

  // Close mobile menu on outside click.
  // Uses composedPath() so the check survives meanmenu replacing the button's
  // inner spans mid-event (detached nodes break .closest()).
  $(document).on("click", function (e) {
    if ($(window).width() > 991) return;
    var path = e.originalEvent.composedPath ? e.originalEvent.composedPath() : [];
    var inMobileNav = path.length
      ? path.some(function (node) {
          return node.classList && node.classList.contains("mobile-responsive-nav");
        })
      : !!$(e.target).closest(".mobile-responsive-nav").length;
    if (!inMobileNav && $(".meanmenu-reveal").hasClass("meanclose")) {
      $(".meanmenu-reveal").trigger("click");
    }
  });

  // Header Sticky + Go To Top
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 150) {
      $(".navbar-area").addClass("is-sticky");
    } else {
      $(".navbar-area").removeClass("is-sticky");
    }
    var scrolled = $(window).scrollTop();
    if (scrolled > 300) $(".go-top").addClass("active");
    if (scrolled < 300) $(".go-top").removeClass("active");
  });

  // Hero Slider
  $(".hero-slider").owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    mouseDrag: true,
    items: 1,
    dots: true,
    autoplay: true,
    smartSpeed: 1500,
    autoplayHoverPause: true,
  });

  // Professional Services Slider
  $(".professional-services-slider").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: false,
    autoplay: true,
    smartSpeed: 1000,
    autoplayHoverPause: true,
    navText: [
      "<i class='ri-arrow-left-line'></i>",
      "<i class='ri-arrow-right-line'></i>",
    ],
    responsive: {
      0:    { items: 1 },
      414:  { items: 1 },
      576:  { items: 2 },
      768:  { items: 2 },
      992:  { items: 3 },
      1200: { items: 4 },
    },
  });

  // Testimonials Slider
  $(".testimonials-slider").owlCarousel({
    items: 1,
    loop: true,
    margin: 0,
    nav: true,
    dots: false,
    autoplay: true,
    smartSpeed: 1000,
    autoplayHoverPause: true,
    navText: [
      "<i class='ri-arrow-left-line'></i>",
      "<i class='ri-arrow-right-line'></i>",
    ],
  });

  $(".testimonials-slider-two").owlCarousel({
    items: 1,
    loop: true,
    margin: 30,
    nav: false,
    dots: true,
    autoplay: false,
    smartSpeed: 1000,
    autoplayHoverPause: true,
    responsive: {
      0:    { items: 1 },
      576:  { items: 1 },
      768:  { items: 2 },
      992:  { items: 2 },
      1200: { items: 3 },
    },
  });

  // Partner Slider
  $(".partner-slider").owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
    autoplay: true,
    smartSpeed: 1000,
    autoplayHoverPause: true,
    responsive: {
      0:    { items: 1 },
      414:  { items: 2 },
      576:  { items: 3 },
      768:  { items: 4 },
      992:  { items: 5 },
      1200: { items: 6 },
    },
  });

  // Go To Top click
  $(".go-top").on("click", function () {
    $("html, body").animate({ scrollTop: "0" }, 50);
  });

  // FAQ Accordion
  $(".accordion")
    .find(".accordion-title")
    .on("click", function () {
      $(this).toggleClass("active");
      $(this).next().slideToggle("fast");
      $(".accordion-content").not($(this).next()).slideUp("fast");
      $(".accordion-title").not($(this)).removeClass("active");
    });

  // Preloader
  $(window).on("load", function () {
    $(".preloader").addClass("preloader-deactivate");
  });

})(jQuery);

// Contact form
function sendMail(event) {
  event.preventDefault();
  var form = event.target;
  var submitBtn = form.querySelector('button[type="submit"]');
  var originalBtnText = submitBtn ? submitBtn.innerHTML : null;
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Wird gesendet...";
  }

  fetch("https://formspree.io/f/moqgerva", {
    method: "POST",
    body: new FormData(form),
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "./send_mail.html";
      } else {
        throw new Error("Formspree responded with status " + response.status);
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Ihre Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
}

// Cookie banner
document.addEventListener("DOMContentLoaded", function () {
  var cookieBanner = document.getElementById("cookie-banner");
  var acceptBtn = document.getElementById("accept-cookies");
  var declineBtn = document.getElementById("decline-cookies");

  if (!localStorage.getItem("cookiesAccepted") && !localStorage.getItem("cookiesDeclined")) {
    cookieBanner.style.display = "block";
  }

  acceptBtn.addEventListener("click", function () {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.style.display = "none";
  });

  declineBtn.addEventListener("click", function () {
    localStorage.setItem("cookiesDeclined", "true");
    cookieBanner.style.display = "none";
  });
});
