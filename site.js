/* SUJAG Creative site script */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  /* Contact links from site-data.js */
  var wa = function (msg) { return "https://wa.me/" + SITE.whatsappIntl + "?text=" + encodeURIComponent(msg || SITE.whatsappMessage); };
  $$("[data-call]").forEach(function (a) { a.href = "tel:+" + SITE.phoneIntl; });
  $$("[data-wa]").forEach(function (a) { a.href = wa(a.getAttribute("data-msg")); a.target = "_blank"; a.rel = "noopener"; });
  $$("[data-phone]").forEach(function (e) { e.textContent = SITE.phone; });
  $$("[data-location]").forEach(function (e) { e.textContent = SITE.location; });
  $$("[data-email]").forEach(function (e) { if (SITE.email) { e.textContent = SITE.email; e.href = "mailto:" + SITE.email; } else { var r = e.closest(".row") || e; r.hidden = true; } });
  $$("[data-socials]").forEach(function (e) { e.innerHTML = SITE.socials.map(function (s) { return '<a href="' + esc(s.u) + '" target="_blank" rel="noopener">' + esc(s.n) + "</a>"; }).join(""); });
  $$("[data-year]").forEach(function (e) { e.textContent = new Date().getFullYear(); });

  $$("[data-whatsapp]").forEach(function (e) { e.textContent = SITE.whatsapp; });

  /* Mobile menu */
  var bg = $(".burger"), dr = $("#drawer");
  if (bg && dr) bg.addEventListener("click", function () { var o = dr.classList.toggle("open"); bg.setAttribute("aria-expanded", o); });

  /* Tech logo marquee: duplicate the row so it loops forever */
  $$(".track").forEach(function (t) { var c = t.innerHTML; t.insertAdjacentHTML("beforeend", c.replace(/<div class="logo"/g, '<div aria-hidden="true" class="logo"')); });

  /* Rotating words in the hero */
  var rot = $("#rot");
  if (rot && !reduce) {
    var w = ["websites", "web apps", "WordPress sites", "UI designs", "installable apps"], i = 0;
    setInterval(function () { rot.classList.add("out"); setTimeout(function () { i = (i + 1) % w.length; rot.textContent = w[i]; rot.classList.remove("out"); }, 350); }, 2600);
  }

  /* Projects */
  var typeName = { website: "Website", app: "Web app", wordpress: "WordPress", design: "UI/UX design" };
  function card(p) {
    return '<article class="card proj rv"><img class="project-cover" src="assets/salu-preview.svg" width="1100" height="760" loading="lazy" alt="Illustrated SALU Community project preview"><div class="top"><span>' + esc(typeName[p.type] || p.type) + " &middot; " + esc(p.status) + (p.year ? " &middot; " + esc(p.year) : "") + '</span></div><div class="body"><h3>' + esc(p.name) + "</h3><p>" + esc(p.desc) + '</p><div class="tags">' +
      (p.tags || []).map(function (t) { return "<i>" + esc(t) + "</i>"; }).join("") + "</div>" + (p.result ? '<p class="result">' + esc(p.result) + "</p>" : "") +
      (p.link ? '<div style="margin-top:auto;padding-top:8px"><a class="btn" href="' + esc(p.link) + '" target="_blank" rel="noopener">View project</a></div>' : "") + "</div></article>";
  }
  var empty = '<div class="card empty rv"><div><h3>Your project could be here</h3><p>Tell us about your idea and we will build it.</p><p style="margin-top:12px"><a class="btn" data-wa href="#">Start a project</a></p></div></div>';
  var feat = $("#featured");
  if (feat) feat.innerHTML = PROJECTS.slice(0, 3).map(card).join("") + (PROJECTS.length < 3 ? empty : "");
  var grid = $("#projectGrid");
  if (grid) {
    var draw = function (f) { var l = PROJECTS.filter(function (p) { return f === "all" || p.type === f || p.status.toLowerCase() === f; }); grid.innerHTML = l.map(card).join("") + (f === "all" ? empty : ""); reveal(); wireWa(); };
    $$(".chip").forEach(function (b) { b.addEventListener("click", function () { $$(".chip").forEach(function (x) { x.classList.toggle("on", x === b); }); draw(b.getAttribute("data-f")); }); });
    draw("all");
  }
  function wireWa() { $$("[data-wa]").forEach(function (a) { if (!a.target) { a.href = wa(a.getAttribute("data-msg")); a.target = "_blank"; a.rel = "noopener"; } }); }
  wireWa();

  /* Manual, keyboard-accessible four-image design carousel. */
  var slider = $(".reference-slider");
  if (slider) {
    var slides = $$(".reference-slide", slider), dots = $$("[data-slide]", slider), current = 0;
    var captions = ["Education & Learning", "Engineering & SaaS", "Digital Banking", "Beauty & Skincare"];
    function showSlide(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) { slide.hidden = i !== current; });
      dots.forEach(function (dot, i) { dot.classList.toggle("active", i === current); dot.setAttribute("aria-pressed", String(i === current)); });
      $(".slider-caption", slider).textContent = "0" + (current + 1) + " / 04 — " + captions[current];
    }
    $(".previous", slider).addEventListener("click", function () { showSlide(current - 1); });
    $(".next", slider).addEventListener("click", function () { showSlide(current + 1); });
    dots.forEach(function (dot) { dot.addEventListener("click", function () { showSlide(+dot.getAttribute("data-slide")); }); });
    slider.addEventListener("keydown", function (event) { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); showSlide(current + (event.key === "ArrowRight" ? 1 : -1)); } });
    var touchX = null;
    slider.addEventListener("touchstart", function (event) { touchX = event.touches[0].clientX; }, {passive: true});
    slider.addEventListener("touchend", function (event) { if (touchX !== null) { var delta = event.changedTouches[0].clientX - touchX; if (Math.abs(delta) > 50) showSlide(current + (delta < 0 ? 1 : -1)); touchX = null; } }, {passive: true});
  }

  /* Client marquee motion control. */
  var pauseClients = $(".client-pause"), clientsMarquee = $(".clients-marquee");
  if (pauseClients && clientsMarquee) pauseClients.addEventListener("click", function () {
    var paused = clientsMarquee.classList.toggle("paused");
    pauseClients.setAttribute("aria-pressed", String(paused));
    pauseClients.textContent = paused ? "Resume scrolling" : "Pause scrolling";
  });

  /* Testimonials */
  var tw = $("#testimonials");
  if (tw && TESTIMONIALS.length) { tw.hidden = false; $("#tGrid", tw).innerHTML = TESTIMONIALS.map(function (t) { return '<div class="card rv"><p>&ldquo;' + esc(t.text) + '&rdquo;</p><h3 style="margin-top:12px">' + esc(t.name) + '</h3><p>' + esc(t.role) + "</p></div>"; }).join(""); }

  /* Counters */
  function count(el) {
    var to = +el.getAttribute("data-count"), suf = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = to + suf; return; }
    var s = performance.now(), d = 1400;
    (function tick(n) { var p = Math.min((n - s) / d, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(tick); })(s);
  }
  var cmap = { completed: STATS.completed, ongoing: STATS.ongoing, happy: STATS.happy };
  $$("[data-stat]").forEach(function (e) { e.setAttribute("data-count", cmap[e.getAttribute("data-stat")]); e.textContent = "0" + (e.getAttribute("data-suffix") || ""); });

  /* Scroll reveal + counters */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (!e.isIntersecting) return; var el = e.target; io.unobserve(el); if (el.hasAttribute("data-count")) count(el); else el.classList.add("in"); });
  }, { threshold: 0.12 }) : null;
  function reveal() {
    var n = 0;
    $$(".card,.step,.logo,.sec-h,.industry-card").forEach(function (el) { if (!el.classList.contains("rv") && !el.closest(".track")) el.classList.add("rv"); });
    $$(".rv:not([data-o])").forEach(function (el) { el.setAttribute("data-o", 1); el.style.setProperty("--d", (n++ % 4) * 80 + "ms"); io ? io.observe(el) : el.classList.add("in"); });
    $$("[data-count]:not([data-o])").forEach(function (el) { el.setAttribute("data-o", 1); io ? io.observe(el) : count(el); });
  }
  reveal();

  /* Contact form: opens WhatsApp with the message already written */
  var f = $("#contactForm");
  if (f) f.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = function (id) { return (document.getElementById(id).value || "").trim(); };
    var m = "Hello SUJAG Creative,\nName: " + v("fn") + (v("fp") ? "\nPhone: " + v("fp") : "") + "\nProject type: " + v("ft") + "\n\n" + v("fm");
    window.open(wa(m), "_blank", "noopener");
  });

  /* Google Analytics (only if you set GA_ID in site-data.js) */
  if (typeof GA_ID !== "undefined" && GA_ID) {
    window.dataLayer = window.dataLayer || []; window.gtag = function () { window.dataLayer.push(arguments); };
    gtag("js", new Date()); gtag("config", GA_ID);
    var g = document.createElement("script"); g.async = true; g.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID); document.head.appendChild(g);
  }
})();
