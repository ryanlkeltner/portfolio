/* ============================================================================
   PROJECTS — this is the only file you need to edit to add work.
   ----------------------------------------------------------------------------
   Copy a whole { ... } block, paste it, change the values. Order here is the
   order on the page, so put your strongest project first.

   FIELDS
     id        unique slug, no spaces (becomes the shareable link #kinetic-clock)
     title     project name
     tagline   one line, plain language, what it is
     category  must match one of the CATEGORIES keys below (drives the filters)
     year      "2025" or "2024–25"
     role      what YOU did, especially on team projects — be honest
     timeline  how long it took
     team      "Solo" or "4 people (I led mechanical)"
     tags      short list of tools/skills shown on the card
     cover     "assets/img/clock-hero.jpg"  — or null for a drawn placeholder
     problem   WHY this exists. The constraint or need you were solving.
     process   ordered steps — how you actually attacked it
     iterations  the good part: what failed and what you changed. Keep the failures.
     outcome   result, with a number if you have one
     learned   honest reflection — this is what admissions readers remember
     media     [{ src, caption }] photos of the build. Captions matter.
     links     [{ label, href }] CAD files, code, writeup, video

   BLANKS: anything wrapped in FILL("...") shows up on the page as a dashed
   "✏️ Fill in" box so you can't miss it. Replace the whole FILL(...) with your
   own text in quotes when you've written it.
   ========================================================================== */

const FILL = (note) => "✏️ " + note;

const CATEGORIES = {
  vehicles:    "Vehicles",
  fabrication: "Fabrication",
  electronics: "Electronics",
  community:   "Community",
};

const PROJECTS = [
  {
    id: "solar-car",
    title: "Perihelion Solar Car",
    tagline: "Team-built solar car #3, raced at Texas Motor Speedway in 2025 and on the road in 2026.",
    category: "vehicles",
    year: "2025–26",
    role: "Team captain and mechanical lead. Designed the wheel adapter in CAD; wrote the telemetry, team website, and Raspberry Pi failsafes; chassis welding; test driver.",
    timeline: FILL("When you joined the team and roughly how many hours"),
    team: FILL("Team size, e.g. '14 students'"),
    tags: ["CAD", "Raspberry Pi", "Telemetry", "Web", "MIG welding", "Test driving"],
    cover: "assets/img/solar-track.jpg",
    problem: FILL("What problem were you solving on this car? e.g. why the wheel adapter was needed, or what the team couldn't see before you built telemetry."),
    process: [
      "Designed a wheel adapter in CAD. " + FILL("What did it connect, what material, how was it made?"),
      "Wrote the car's telemetry system. " + FILL("What data (speed, battery voltage, temps?), what language, how does it reach the pit laptop?"),
      "Built failsafes on the onboard Raspberry Pi. " + FILL("What conditions do they catch, and what does the car do when one trips?"),
      "Built the team website. " + FILL("What's on it / link below"),
      "Welded on the chassis and drove the car through testing. " + FILL("What you were testing for"),
    ],
    iterations: [
      { version: FILL("v1"), change: FILL("Something that didn't work the first time: telemetry dropouts, an adapter that didn't fit, a failsafe that tripped wrongly…"), result: FILL("What you changed because of it") },
    ],
    outcome: FILL("Results at Texas Motor Speedway 2025 and the 2026 road event: laps/miles, placing, inspection, anything with a number."),
    learned: FILL("What leading the team as captain taught you that building alone didn't."),
    media: [
      { src: "assets/img/solar-telemetry.jpg", caption: "Running telemetry from the pit tent at Texas." },
      { src: "assets/img/solar-welding.jpg",   caption: "Welding at the fixture table, summer 2026. " + FILL("what part?") },
      { src: "assets/img/solar-testing.jpg",   caption: "Array lifted for a systems check during parking-lot testing." },
      { src: "assets/img/solar-driving.jpg",   caption: "In the driver's seat for a test session." },
      { src: "assets/img/solar-roadside.jpg",  caption: "Under the car on the roadside during the 2026 road event." },
      { src: "assets/img/solar-team.jpg",      caption: "The team with the car at Texas Motor Speedway." },
    ],
    links: [
      { label: FILL("Team website"), href: "#" },
      { label: FILL("Telemetry code"), href: "#" },
    ],
  },

  {
    id: "eagle-scout-pergola",
    title: "Eagle Scout Project: Garden Pergola",
    tagline: "Designed and led the build of a steel-and-wood pergola and raised garden beds with a volunteer crew.",
    category: "community",
    year: "2025",
    role: "Project lead: planning, materials, leading volunteers, welding the post brackets",
    timeline: FILL("Planning time + build days, e.g. '4 months planning, 3 build days'"),
    team: FILL("How many volunteers and total volunteer hours"),
    tags: ["Project leadership", "Welding", "Carpentry"],
    cover: "assets/img/eagle-cover.jpg",
    problem: FILL("Who is this garden for, what was missing (shade? places to grow?), and who asked for it."),
    process: [
      FILL("Design: how you sized the pergola and got it approved"),
      "Bought and hauled the lumber and garden supplies.",
      "Ran a staining day for the beams with a volunteer crew.",
      "Welded brackets onto the steel posts on site.",
      "Raised the beams, fastened the slats, and added shade cloth; assembled and filled the raised beds.",
    ],
    iterations: [
      { version: FILL("Plan"), change: FILL("Something that changed between the plan and the build"), result: FILL("How you adapted") },
    ],
    outcome: FILL("What got built (dimensions, number of beds), volunteer hours, and how it's being used now."),
    learned: FILL("What leading adults and friends on a job site taught you."),
    media: [
      { src: "assets/img/eagle-lumber.jpg", caption: "Picking up the lumber." },
      { src: "assets/img/eagle-crew.jpg",   caption: "Staining day crew with the beams." },
      { src: "assets/img/eagle-weld.jpg",   caption: "Welding brackets onto the posts." },
      { src: "assets/img/eagle-beam.jpg",   caption: "Lifting the first beams onto the posts." },
      { src: "assets/img/eagle-slats.jpg",  caption: "Fastening the top slats." },
      { src: "assets/img/eagle-shade.jpg",  caption: "Shade cloth going on, with the raised beds behind." },
    ],
    links: [],
  },

  {
    id: "bmw-e39",
    title: "BMW E39 Project Car",
    tagline: FILL("One line: what you're turning this car into"),
    category: "vehicles",
    year: "2026",
    role: "My own car",
    timeline: FILL("Since January 2026, ~hours so far"),
    team: FILL("Solo? Who helped?"),
    tags: ["Automotive", "Wiring", "MIG welding", FILL("more")],
    cover: "assets/img/bmw-cover.jpg",
    problem: FILL("Why this car, and what's the goal for it?"),
    process: [
      "Brought the car in on a trailer and stripped the interior down to the floor pan.",
      "Pulled the dash to get at the wiring.",
      FILL("What you've fabricated or welded for it so far"),
    ],
    iterations: [],
    outcome: FILL("Where it stands now and what's next."),
    learned: FILL("What working on a real car taught you that the shop didn't."),
    media: [
      { src: "assets/img/bmw-towed.jpg",    caption: "Arriving on the trailer, January 2026." },
      { src: "assets/img/bmw-stripped.jpg", caption: "Interior stripped to the floor pan, dash out." },
      { src: "assets/img/bmw-wiring.jpg",   caption: "Working behind the dash. " + FILL("what were you tracing?") },
      { src: "assets/img/bmw-weld.jpg",     caption: FILL("What you're welding here") },
      { src: "assets/img/bmw-part.jpg",     caption: FILL("What this welded part is for") },
    ],
    links: [],
  },

  {
    id: "custom-pcb",
    title: "Custom Circuit Board",
    tagline: FILL("One line: what the board does"),
    category: "electronics",
    year: "2024",
    role: "Solo: schematic, board layout, prototyping, soldering",
    timeline: FILL("e.g. 'Aug–Sep 2024'"),
    team: "Solo",
    tags: ["PCB design", "Breadboarding", "Soldering", FILL("software used")],
    cover: "assets/img/pcb-cover.jpg",
    problem: FILL("What this board is for and why you designed your own instead of buying one."),
    process: [
      "Prototyped the circuit on breadboards.",
      "Drew the schematic.",
      "Laid out the board.",
      "Soldered the assembled boards.",
    ],
    iterations: [
      { version: FILL("Rev A"), change: FILL("What was wrong with the first board"), result: FILL("What you fixed") },
    ],
    outcome: FILL("Did it work? How is it being used?"),
    learned: FILL("Reflection"),
    media: [
      { src: "assets/img/pcb-breadboard.jpg", caption: "Breadboard prototype." },
      { src: "assets/img/pcb-schematic.jpg",  caption: "Schematic." },
      { src: "assets/img/pcb-layout.jpg",     caption: "Board layout. " + FILL("what are these parts?") },
      { src: "assets/img/pcb-solder.jpg",     caption: "Soldering the finished boards." },
    ],
    links: [],
  },

  {
    id: "printed-guitar",
    title: "3D-Printed Electric Guitar",
    tagline: "A playable electric guitar with a 3D-printed honeycomb body that I printed, wired, and assembled.",
    category: "electronics",
    year: "2023",
    role: "Solo: printing, wiring, assembly",
    timeline: FILL("e.g. 'May–June 2023'"),
    team: "Solo",
    tags: ["3D printing", "Soldering", "Guitar electronics"],
    cover: "assets/img/guitar-cover.jpg",
    problem: FILL("Why build a guitar? Did you design the body or adapt a model?"),
    process: [
      "Printed the body in four sections with an open honeycomb pattern.",
      "Wired the three pickups and controls on the pickguard.",
      "Assembled the body, neck, and hardware, then set it up and played it.",
      FILL("How the printed sections are joined and how the neck is held"),
    ],
    iterations: [
      { version: FILL("v1"), change: FILL("What didn't work the first time"), result: FILL("What you changed") },
    ],
    outcome: FILL("How it plays and sounds; where you showed it."),
    learned: FILL("Reflection"),
    media: [
      { src: "assets/img/guitar-parts.jpg",      caption: "The four printed body sections." },
      { src: "assets/img/guitar-pickguard.jpg",  caption: "Pickguard with three pickups, wired." },
      { src: "assets/img/guitar-solder.jpg",     caption: "Soldering the electronics." },
      { src: "assets/img/guitar-fair.jpg",       caption: FILL("Showing it at… (event name)") },
      { src: "assets/img/guitar-pedalboard.jpg", caption: "A pedalboard I built for it later, in 2025." },
    ],
    links: [],
  },

  {
    id: "forge-and-fire",
    title: "Blacksmithing, Knifemaking & Glass",
    tagline: "Hot work since 2022: forging, grinding, and glassblowing.",
    category: "fabrication",
    year: "2022–24",
    role: "Student",
    timeline: FILL("Classes or sessions and where"),
    team: "Solo",
    tags: ["Forging", "Belt grinding", "Glassblowing"],
    cover: "assets/img/forge-cover.jpg",
    problem: FILL("What got you into hot work, and what you made."),
    process: [
      "2022: first blacksmithing sessions: drawing out, twisting, and scrolling steel.",
      "2023: glassblowing.",
      "2024: back at the forge, then shaping the piece on the belt grinder.",
    ],
    iterations: [],
    outcome: FILL("What you made"),
    learned: FILL("Reflection: how this carried into your welding on the solar car and the pergola."),
    media: [
      { src: "assets/img/forge-2022.jpg",    caption: "First time at the anvil, 2022." },
      { src: "assets/img/forge-twist.jpg",   caption: "A twisted hook from those first sessions." },
      { src: "assets/img/forge-glass.jpg",   caption: "Glassblowing, 2023." },
      { src: "assets/img/forge-2024.jpg",    caption: "At the forge, 2024." },
      { src: "assets/img/forge-grinder.jpg", caption: "Shaping on the belt grinder. " + FILL("what piece?") },
    ],
    links: [],
  },
];
