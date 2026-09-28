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

  function projectHTML(p) {
    const meta = [
      ["Role", p.role], ["Timeline", p.timeline], ["Team", p.team], ["Year", p.year],
    ].filter(([, v]) => v);

    return `
      <article class="project reveal" id="${esc(p.id)}" data-cat="${esc(p.category)}">
        <div class="p-top">
          <div class="p-cover">${shot(p.cover, p.title)}</div>
          <div class="m-head">
            <p class="kicker">${txt(CATEGORIES[p.category] || p.category)}</p>
            <h3>${txt(p.title)}</h3>
            <p class="m-tagline">${txt(p.tagline)}</p>
            <ul class="m-meta">
              ${meta.map(([k, v]) => `<li><span>${k}</span><b>${txt(v)}</b></li>`).join("")}
            </ul>
            <ul class="card-tags">${(p.tags || []).map((t) => `<li>${txt(t)}</li>`).join("")}</ul>
          </div>
        </div>
        <div class="m-body">
          ${block("The problem", p.problem ? `<p>${txt(p.problem)}</p>` : "")}
          ${block("Process", (p.process || []).length
            ? `<ol class="m-steps">${p.process.map((s) => `<li>${txt(s)}</li>`).join("")}</ol>` : "")}
          ${block("Iteration &amp; failure", (p.iterations || []).length
            ? `<div class="iters">${p.iterations.map((it) => `
                <div class="iter">
                  <b>${txt(it.version)}</b>
                  <p>${txt(it.change)}</p>
                  <p class="res">${txt(it.result)}</p>
                </div>`).join("")}</div>` : "")}
          ${block("Outcome", p.outcome ? `<p>${txt(p.outcome)}</p>` : "")}
          ${block("What I'd do differently", p.learned ? `<div class="callout"><p>${txt(p.learned)}</p></div>` : "")}
          ${block("Build photos", (p.media || []).length
            ? `<div class="m-gallery">${p.media.map((m) => `
                <figure>
                  <div class="shot">${shot(m.src, m.caption || p.title)}</div>
                  <figcaption>${txt(m.caption || "")}</figcaption>
                </figure>`).join("")}</div>` : "")}
          ${block("Files &amp; links", (p.links || []).length
            ? `<div class="m-links">${p.links.map((l) =>
                `<a href="${esc(l.href)}" target="_blank" rel="noopener">${txt(l.label)} &nearr;</a>`).join("")}</div>` : "")}
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
