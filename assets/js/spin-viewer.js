/* ============================================================
   spin-viewer.js — drag-to-rotate turntable viewer (welding art).
   <spin-viewer src="assets/spin/dog/" frames="24" alt="..."></spin-viewer>
   Expects src/poster.webp and src/frames/01.webp … NN.webp.
   Shows the poster right away; frames load only once the viewer
   is near the screen. Spins slowly until someone drags it (off
   for prefers-reduced-motion). Add `reverse` to flip direction.
   ============================================================ */
class SpinViewer extends HTMLElement {
  connectedCallback() {
    if (this.img) return;
    const base = (this.getAttribute("src") || "").replace(/\/?$/, "/");
    this.n = parseInt(this.getAttribute("frames") || "24", 10);
    this.turn = parseFloat(this.getAttribute("autoplay") ?? "8");
    this.spinDir = this.hasAttribute("reverse") ? -1 : 1;
    this.i = 0;
    this.srcs = Array.from({ length: this.n }, (_, k) => `${base}frames/${String(k + 1).padStart(2, "0")}.webp`);

    this.tabIndex = 0;
    this.setAttribute("role", "img");
    this.setAttribute("aria-label", (this.getAttribute("alt") || "Rotating view") + ". Drag or use the arrow keys to rotate.");

    this.img = document.createElement("img");
    this.img.src = `${base}poster.webp`;
    this.img.alt = "";
    this.img.draggable = false;
    this.hint = document.createElement("span");
    this.hint.className = "spin-hint";
    this.hint.textContent = "⟲ drag to rotate";
    this.append(this.img, this.hint);

    // Load all frames once the viewer is close to the screen.
    this.io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      this.io.disconnect();
      this.load();
    }, { rootMargin: "300px" });
    this.io.observe(this);

    let startX = 0, startI = 0, down = false;
    const pxPerFrame = () => Math.max(4, this.clientWidth / this.n);
    this.addEventListener("pointerdown", (e) => {
      down = true; this.stop();
      startX = e.clientX; startI = this.i;
      this.setPointerCapture(e.pointerId);
      this.classList.add("dragging");
    });
    this.addEventListener("pointermove", (e) => {
      if (down) this.show(startI + this.spinDir * Math.round((e.clientX - startX) / pxPerFrame()));
    });
    const up = () => { down = false; this.classList.remove("dragging"); };
    this.addEventListener("pointerup", up);
    this.addEventListener("pointercancel", up);
    this.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault(); e.stopPropagation(); this.stop();
      this.show(this.i + this.spinDir * (e.key === "ArrowRight" ? 1 : -1));
    });
  }

  load() {
    if (this.cache) return;
    this.cache = this.srcs.map((s) => { const im = new Image(); im.src = s; return im; });
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (this.turn > 0 && !reduce) {
      Promise.all(this.cache.map((im) => im.decode().catch(() => {}))).then(() => {
        if (this.touched) return;
        this.timer = setInterval(() => this.show(this.i + 1), (this.turn * 1000) / this.n);
      });
    }
  }

  stop() {
    this.touched = true;
    this.load();
    clearInterval(this.timer); this.timer = null;
    this.hint.style.opacity = "0";
  }

  show(k) {
    if (!this.cache) return;
    this.i = ((k % this.n) + this.n) % this.n;
    this.img.src = this.srcs[this.i];
  }

  disconnectedCallback() { clearInterval(this.timer); this.io?.disconnect(); }
}
customElements.define("spin-viewer", SpinViewer);
