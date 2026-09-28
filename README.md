# Makerspace Portfolio — Template

A single-page portfolio site for showing makerspace / engineering work to college admissions.
No build step, no dependencies. Open `index.html` in a browser and it works.

```
index.html              ← page structure + all written content (search for ✏️ EDIT)
assets/css/style.css    ← colors and type live at the very top in :root
assets/js/projects.js   ← YOUR PROJECTS. This is the file you'll edit most.
assets/js/main.js       ← rendering + interactions. You shouldn't need to touch it.
assets/img/             ← put your photos here
```

## Start here (about 30 minutes)

1. **Open `index.html`** in a text editor and search for `✏️ EDIT`. Every spot that needs
   your words is marked. Replace name, school, the hero sentence, About, Impact, Awards, Contact.
2. **Open `assets/js/projects.js`** and replace the six sample projects with yours.
   Copy a whole `{ ... }` block to add another. Order in the file = order on the page,
   so lead with your strongest project.
3. **Drop photos into `assets/img/`** and point `cover:` and `media:` at them.
4. **Change the accent color** — one line at the top of `style.css` (`--accent`).
5. Add a `resume.pdf` to the project folder, or delete that button from the hero.

## Adding a project

```js
{
  id: "my-project",              // no spaces — becomes the link yoursite.com/#my-project
  title: "Project Name",
  tagline: "One plain-language line about what it is.",
  category: "fabrication",       // fabrication | electronics | design | community
  year: "2026",
  role: "What YOU did — be specific on team projects",
  timeline: "3 months, ~80 hours",
  team: "Solo" or "5 people (I led electrical)",
  tags: ["Fusion 360", "TIG Welding"],
  cover: "assets/img/my-project.jpg",   // or null for a placeholder box
  problem:  "Why this exists. The constraint you were solving.",
  process:  ["Step one.", "Step two.", "Step three."],
  iterations: [
    { version: "v1", change: "What you tried", result: "How it failed" },
    { version: "v2", change: "What you changed", result: "What happened" },
  ],
  outcome:  "The result, with a number if you have one.",
  learned:  "Honest reflection. This is the part readers remember.",
  media:    [{ src: "assets/img/shot1.jpg", caption: "What's happening here." }],
  links:    [{ label: "CAD files", href: "https://..." }],
}
```

Categories live in the `CATEGORIES` object at the top of the same file — add or rename
them there and the filter buttons update themselves.

## Writing the content (the part that actually matters)

Admissions readers see plenty of nice photos. What separates a portfolio is evidence of
**thinking**. A few rules that the template's structure is built to enforce:

- **Lead with the problem, not the tool.** "The frame flexed under load" beats "I used Fusion 360."
- **Keep your failures in.** The `iterations` field is the most valuable part of every entry.
  A v1 that snapped, and what you changed because of it, is more convincing than a clean success.
- **Use numbers.** "38% lighter, 2.1× stiffer on the same test rig" — not "much better."
- **Be exact about your role on team projects.** Overclaiming is the fastest way to lose credibility
  in an interview when you can't explain a subsystem you said you built.
- **Caption every photo.** An uncaptioned photo of a machine says nothing; "tacking the frame in an
  alternating sequence to balance heat" says you know why you did it.
- **6–8 projects is plenty.** Depth beats volume. Cut the weakest one.

## Photos

- Target ~1600px wide, JPEG, under ~400 KB each. Big files are the only way this site gets slow.
- Include **process shots**, not just the finished object: jigs, fixtures, failed parts,
  sketches, screens of your CAD, test setups. Those are the ones that show how you work.

You have a `Solar Car 2026/` folder here with a lot of iPhone media. HEIC and MOV won't display
in browsers, so convert what you want to use (this leaves the originals untouched):

```bash
# HEIC → web-sized JPEG (macOS built-in, no install needed)
mkdir -p assets/img
for f in "Solar Car 2026"/*.HEIC; do
  sips -s format jpeg -Z 1600 "$f" --out "assets/img/$(basename "${f%.*}").jpg"
done

# MOV/MP4 → poster frame, if you have ffmpeg
ffmpeg -i "Solar Car 2026/clip.MP4" -vframes 1 -vf scale=1600:-1 assets/img/clip-still.jpg
```

Then pick the best 4–6 per project — you don't need 400 photos on the page.

## Publishing it

**GitHub Pages** (free, gives you `yourname.github.io`):

```bash
git init && git add -A && git commit -m "Portfolio"
gh repo create portfolio --public --source=. --push
# then: repo Settings → Pages → Source: main branch, / (root)
```

**Netlify Drop** — drag this folder onto https://app.netlify.com/drop. Live in ten seconds,
no account required to try it.

Either way, put the URL on your Common App activities list, your résumé, and your email signature.

## Extras built in

- **Dark mode** — follows the system setting, with a manual toggle that remembers your choice.
- **Deep links** — every project has its own URL (`#solar-car-chassis`). Send a college a link
  that opens straight to one project.
- **Print stylesheet** — Cmd-P → Save as PDF produces a clean document if a school wants a file.
- **Keyboard + screen reader accessible**, and it works on a phone.

## Checklist before you send it anywhere

- [ ] No "Your Name" or `you@example.com` left anywhere (`grep -rn "Your Name\|example.com" .`)
- [ ] Every project has a real `problem`, `iterations`, and `learned`
- [ ] All links work, including the résumé PDF
- [ ] Read it out loud once — typos are what people notice first
- [ ] Someone who isn't an engineer can tell what each project is from the tagline alone
