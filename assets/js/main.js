/* ============================================================
   main.js — rendering + interactions.
   You normally don't need to edit this file. Edit projects.js.
   ============================================================ */
(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- theme ---------- */
  const root = document.documentElement;
  const stored = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = stored || (prefersDark ? "dark" : "light");

  $("#themeToggle").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch {}
  });

  /* ---------- mobile nav + sticky header ---------- */
  const nav = $("#nav"), menuBtn = $("#menuBtn"), head = $("#siteHead");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }
  });
  const onScroll = () => head.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- proficiency bars ---------- */
  $$(".skill").forEach((el) => {
    const lvl = Math.max(1, Math.min(4, Number(el.dataset.level) || 1));
    $(".bars", el).innerHTML = [1, 2, 3, 4].map((i) => `<i class="${i <= lvl ? "on" : ""}"></i>`).join("");
  });

  // Text from FILL("...") in projects.js starts with ✏️ and is shown as a dashed to-do box.
  const txt = (s) => {
    const str = String(s ?? ""), i = str.indexOf("✏️");
    return i < 0 ? esc(str) : esc(str.slice(0, i)) + `<span class="todo">${esc(str.slice(i))}</span>`;
  };

  /* ---------- placeholder art when a project has no photo yet ---------- */
  const shot = (src, alt) =>
    src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">`
        : `<div class="ph"><b>Add photo</b></div>`;

  /* ---------- projects (full write-ups, inline) ---------- */
  const grid = $("#projectGrid"), filterBar = $("#filters"), empty = $("#emptyState");

  function block(title, inner) {
    return inner ? `<section class="m-block"><h4>${title}</h4>${inner}</section>` : "";
  }

  // Cover + build photos become one rotating gallery on the left.
  function carouselHTML(p) {
    const slides = [
      ...(p.cover ? [{ src: p.cover, caption: "" }] : []),
      ...(p.media || []),
    ];
    if (!slides.length) slides.push({ src: null, caption: "" });
    const many = slides.length > 1;
    return `
      <div class="carousel" aria-roledescription="carousel" aria-label="${esc(p.title)} photos">
        <div class="car-track" tabindex="-1">
          ${slides.map((m, i) => `
            <figure class="car-slide" aria-roledescription="slide" aria-label="${i + 1} of ${slides.length}">
              <div class="car-shot">${shot(m.src, m.caption || p.title)}</div>
              <figcaption>${txt(m.caption || "")}</figcaption>
            </figure>`).join("")}
        </div>
        ${many ? `
          <button class="car-btn car-prev" type="button" aria-label="Previous photo">&lsaquo;</button>
          <button class="car-btn car-next" type="button" aria-label="Next photo">&rsaquo;</button>
          <div class="car-dots">${slides.map((_, i) =>
            `<button type="button" aria-label="Photo ${i + 1}"${i ? "" : ' aria-current="true"'}></button>`).join("")}</div>` : ""}
      </div>`;
  }

  function projectHTML(p) {
    const meta = [
      ["Role", p.role], ["Timeline", p.timeline], ["Team", p.team], ["Year", p.year],
    ].filter(([, v]) => v);

    const more = [
      block("The problem", p.problem ? `<p>${txt(p.problem)}</p>` : ""),
      block("Process", (p.process || []).length
        ? `<ol class="m-steps">${p.process.map((s) => `<li>${txt(s)}</li>`).join("")}</ol>` : ""),
      block("Iteration &amp; failure", (p.iterations || []).length
        ? `<div class="iters">${p.iterations.map((it) => `
            <div class="iter">
              <b>${txt(it.version)}</b>
              <p>${txt(it.change)}</p>
              <p class="res">${txt(it.result)}</p>
            </div>`).join("")}</div>` : ""),
      block("What I learned", p.learned ? `<div class="callout"><p>${txt(p.learned)}</p></div>` : ""),
      block("Files &amp; links", (p.links || []).length
        ? `<div class="m-links">${p.links.map((l) =>
            `<a href="${esc(l.href)}" target="_blank" rel="noopener">${txt(l.label)} &nearr;</a>`).join("")}</div>` : ""),
    ].join("");

    return `
      <article class="project reveal" id="${esc(p.id)}" data-cat="${esc(p.category)}">
        <div class="p-media">${carouselHTML(p)}</div>
        <div class="p-text">
          <p class="kicker">${txt(CATEGORIES[p.category] || p.category)}</p>
          <h3>${txt(p.title)}</h3>
          <p class="m-tagline">${txt(p.tagline)}</p>
          <ul class="m-meta">
            ${meta.map(([k, v]) => `<li><span>${k}</span><b>${txt(v)}</b></li>`).join("")}
          </ul>
          <ul class="card-tags">${(p.tags || []).map((t) => `<li>${txt(t)}</li>`).join("")}</ul>
          ${block("Outcome", p.outcome ? `<p>${txt(p.outcome)}</p>` : "")}
          ${more ? `
            <details class="p-more">
              <summary><span class="when-closed">Read the full build log</span><span class="when-open">Hide the build log</span></summary>
              ${more}
            </details>` : ""}
        </div>
      </article>`;
  }

  grid.innerHTML = PROJECTS.map(projectHTML).join("");

  function render(cat) {
    let shown = 0;
    $$(".project", grid).forEach((el) => {
      const on = cat === "all" || el.dataset.cat === cat;
      el.hidden = !on;
      if (on) shown++;
    });
    empty.hidden = shown > 0;
  }

  // Filter buttons are built from the categories actually used.
  const used = ["all", ...Object.keys(CATEGORIES).filter((k) => PROJECTS.some((p) => p.category === k))];
  filterBar.innerHTML = used.map((k, i) =>
    `<button class="filter" type="button" data-cat="${k}" aria-pressed="${i === 0}">${k === "all" ? "All work" : esc(CATEGORIES[k])}</button>`
  ).join("");

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    $$(".filter", filterBar).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    render(btn.dataset.cat);
  });

  /* ---------- project photo carousels ---------- */
  const still = window.matchMedia("(prefers-reduced-motion: reduce)");
  const ROTATE_MS = 5000;

  function setupCarousel(car) {
    const track = $(".car-track", car), slides = $$(".car-slide", car), dots = $$(".car-dots button", car);
    let idx = 0, timer = null, userTook = false, visible = false, hovering = false;

    const go = (i, smooth = true) => {
      idx = (i + slides.length) % slides.length;
      dots.forEach((d, k) => d.toggleAttribute("aria-current", k === idx));
      track.scrollTo({ left: idx * track.clientWidth, behavior: smooth && !still.matches ? "smooth" : "auto" });
    };
    // Keep dots in sync with swipes / arrow clicks / programmatic moves.
    track.addEventListener("scroll", () => {
      const i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
      if (i === idx && dots[i]?.hasAttribute("aria-current")) return;
      idx = i;
      dots.forEach((d, k) => d.toggleAttribute("aria-current", k === i));
    }, { passive: true });

    // Slow auto-rotation: only while on screen, paused on hover/focus,
    // stopped for good once the visitor takes over.
    const tick = () => { if (visible && !hovering && !userTook && !box.open) go(idx + 1); };
    const sync = () => {
      const run = slides.length > 1 && visible && !userTook && !still.matches;
      if (run && !timer) timer = setInterval(tick, ROTATE_MS);
      if (!run && timer) { clearInterval(timer); timer = null; }
    };
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; sync(); }, { threshold: .5 }).observe(car);
    car.addEventListener("pointerenter", () => { hovering = true; });
    car.addEventListener("pointerleave", () => { hovering = false; });
    const takeOver = () => { userTook = true; sync(); };
    track.addEventListener("pointerdown", takeOver);
    track.addEventListener("wheel", (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) takeOver(); }, { passive: true });

    car.addEventListener("click", (e) => {
      if (e.target.closest(".car-prev")) { takeOver(); go(idx - 1); }
      else if (e.target.closest(".car-next")) { takeOver(); go(idx + 1); }
      else if (e.target.closest(".car-dots button")) { takeOver(); go(dots.indexOf(e.target.closest("button"))); }
    });
    car.addEventListener("keydown", (e) => {
      if (e.target.closest(".car-dots, .car-btn") || e.target.matches(".car-shot img")) {
        if (e.key === "ArrowLeft") { e.preventDefault(); takeOver(); go(idx - 1); }
        if (e.key === "ArrowRight") { e.preventDefault(); takeOver(); go(idx + 1); }
      }
    });
    window.addEventListener("resize", () => go(idx, false));
    car._go = (i) => { takeOver(); go(i, false); };
  }

  /* ---------- photo lightbox (click any project photo to enlarge) ---------- */
  const box = document.createElement("dialog");
  box.className = "lightbox";
  box.setAttribute("aria-label", "Enlarged photo");
  box.innerHTML = `
    <button class="lb-btn lb-close" type="button" aria-label="Close">&times;</button>
    <button class="lb-btn lb-prev" type="button" aria-label="Previous photo">&lsaquo;</button>
    <figure><img alt=""><figcaption></figcaption></figure>
    <button class="lb-btn lb-next" type="button" aria-label="Next photo">&rsaquo;</button>
    <p class="lb-count"></p>`;
  document.body.appendChild(box);
  const lbImg = $("img", box), lbCap = $("figcaption", box), lbCount = $(".lb-count", box);
  let lbList = [], lbIdx = 0;

  // Each photo's caption: gallery shots use their <figcaption>, covers use the project title.
  const capOf = (img) => {
    const fig = img.closest("figure");
    return fig ? $("figcaption", fig).innerHTML : esc(img.alt);
  };

  function lbShow(i) {
    lbIdx = (i + lbList.length) % lbList.length;
    const img = lbList[lbIdx];
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.innerHTML = capOf(img);
    lbCount.textContent = lbList.length > 1 ? `${lbIdx + 1} / ${lbList.length}` : "";
    box.classList.toggle("single", lbList.length < 2);
    // Keep the page's carousel on the same photo, so closing shrinks back onto it.
    img.closest(".carousel")?._go?.(lbIdx);
  }

  $$(".car-shot img", grid).forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "Enlarge photo" + (img.alt ? ": " + img.alt : ""));
  });

  // Zoom animation: the big photo grows out of / shrinks back into its thumbnail.
  function thumbTransform() {
    const a = lbList[lbIdx].getBoundingClientRect(), b = lbImg.getBoundingClientRect();
    const dx = a.left + a.width / 2 - (b.left + b.width / 2);
    const dy = a.top + a.height / 2 - (b.top + b.height / 2);
    return `translate(${dx}px, ${dy}px) scale(${Math.max(a.width / b.width, a.height / b.height)})`;
  }

  function lbOpen(img) {
    lbList = $$(".car-shot img", img.closest(".carousel"));
    lbShow(lbList.indexOf(img));
    box.showModal();
    // Chrome/Edge in page-initiated full screen: lock Esc so it doesn't exit full screen.
    if (document.fullscreenElement && navigator.keyboard?.lock) navigator.keyboard.lock(["Escape"]).catch(() => {});
    if (still.matches) return;
    lbImg.animate([{ transform: thumbTransform() }, { transform: "none" }],
      { duration: 320, easing: "cubic-bezier(.2,.8,.3,1)" });
  }

  let closing = false;
  function lbClose() {
    if (closing || !box.open) return;
    if (still.matches) { box.close(); return; }
    closing = true;
    const opts = { duration: 260, easing: "cubic-bezier(.4,0,.6,1)", fill: "forwards" };
    lbImg.animate([{ transform: "none" }, { transform: thumbTransform() }], opts);
    box.animate([{ opacity: 1 }, { opacity: 0 }], opts);
    setTimeout(() => {
      box.close();
      box.getAnimations().concat(lbImg.getAnimations()).forEach((a) => a.cancel());
      closing = false;
    }, opts.duration);
  }

  grid.addEventListener("click", (e) => {
    const img = e.target.closest(".car-shot img");
    if (img) lbOpen(img);
  });
  grid.addEventListener("keydown", (e) => {
    const img = e.target.closest(".car-shot img");
    if (img && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); lbOpen(img); }
  });
  box.addEventListener("click", (e) => {
    if (e.target.closest(".lb-prev")) lbShow(lbIdx - 1);
    else if (e.target.closest(".lb-next")) lbShow(lbIdx + 1);
    else if (e.target === box || e.target.closest(".lb-close")) lbClose();
  });
  box.addEventListener("close", () => navigator.keyboard?.unlock?.());
  // Esc: run the shrink animation instead of closing instantly.
  box.addEventListener("cancel", (e) => { e.preventDefault(); lbClose(); });
  // Keys while a photo is open. Esc is caught here (capture phase) and marked
  // handled so the browser is less likely to also drop out of full screen.
  // Space / Backspace / Enter also close, as an Esc-free option.
  window.addEventListener("keydown", (e) => {
    if (!box.open) return;
    if (e.key === "ArrowLeft") { e.preventDefault(); lbShow(lbIdx - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); lbShow(lbIdx + 1); }
    else if (e.key === "Escape" || e.key === " " || e.key === "Backspace" ||
             (e.key === "Enter" && !e.target.closest(".lb-btn"))) {
      e.preventDefault();
      e.stopPropagation();
      lbClose();
    }
  }, true);

  $$(".carousel", grid).forEach(setupCarousel);

  // Printing: open every build log so the PDF has everything.
  window.addEventListener("beforeprint", () => $$(".p-more", grid).forEach((d) => { d.open = true; }));

  /* ---------- scroll reveal ---------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); observer.unobserve(en.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: .05 });
  $$(".reveal").forEach((el) => observer.observe(el));

  /* ---------- count-up stats ---------- */
  const statObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target, end = Number(el.dataset.count) || 0, t0 = performance.now();
      const tick = (now) => {
        const k = Math.min(1, (now - t0) / 900);
        el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3))).toLocaleString();
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      statObs.unobserve(el);
    });
  }, { threshold: .6 });
  $$("[data-count]").forEach((el) => statObs.observe(el));

  /* ---------- nav scrollspy ---------- */
  const links = $$(".nav a");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach((s) => spy.observe(s));

  /* ---------- init ---------- */
  render("all");
  $("#year").textContent = new Date().getFullYear();
  // Projects are rendered by JS, so the browser's own jump-to-#hash ran too early.
  const initial = location.hash.slice(1);
  if (PROJECTS.some((p) => p.id === initial)) document.getElementById(initial).scrollIntoView();
})();
