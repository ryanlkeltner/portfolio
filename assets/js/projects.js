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
  design:      "Design & CAD",
  community:   "Community",
};

const PROJECTS = [
  {
    id: "solar-car",
    title: "Perihelion Solar Car",
    tagline: "Our team's solar car: 2nd in the Advanced Division at the 2025 Solar Car Challenge, then rebuilt for the 2026 cross-country road race, where we finished 3rd overall after 650 miles across Texas.",
    category: "vehicles",
    year: "2023–present",
    role: "Team captain and mechanical lead. Designed the new wheel adapter; built the live telemetry system, the drive-recovery failsafe, and the team website; chassis welding; test driver.",
    timeline: "4 years, since freshman year",
    team: "15–20 students",
    tags: ["CAD", "CNC (outsourced)", "Suspension", "Raspberry Pi", "CAN bus", "Telemetry", "Starlink", "Vercel", "MIG welding", "Test driving"],
    cover: "assets/img/solar-track.jpg",
    problem: "The 2026 race moved from a closed track to open roads, where conditions are unpredictable, so the car needed more ground clearance. At the same time, the team was nearly blind to what was happening inside the car: the only readout was a small in-car screen that was hard to read and couldn't fit everything we needed. And the car kept dropping from drive into neutral without warning, which meant power-cycling the whole car to recover.",
    process: [
      "Raised the car 4 inches by raising the suspension, which improved the approach angle from 8.73° to 15.95°. Our front suspension uses bike forks, so we bought larger forks with different dimensions.",
      "Designed a new adapter between the wheel hub and the new forks so our existing wheels and hubs would still fit. It was CNC-machined from aluminum on a 5-axis mill (outsourced to a machine shop in China).",
      "Built a live telemetry system with AI-assisted coding: the onboard Raspberry Pi reads the car's CAN bus and sends the data over Starlink to a web dashboard deployed on Vercel, where every team member, including the chase car driving directly behind the solar car, can watch it live. It shows battery and motor temperatures, speed, throttle position, drive state, solar input, power draw, pack voltage, state of charge, and the auxiliary battery's charge and voltage. It also tracks the car's GPS position along the day's route, with miles remaining, elevation gain and loss remaining, and the car's live position on an elevation chart of the day's drive.",
      "Wrote a failsafe on the Pi that arms whenever the car drops from drive into neutral. It checks every drive requirement (proper voltages, proper temperatures) and only puts the car back into drive once everything is safe, so the driver no longer has to power-cycle the car.",
      "Built the team website, polysolarcar.org: the car and its specs, our sponsors, previous finishes and eras of the team, the competition, and a lot of photos.",
      "Welded chassis parts, including a brake caliper mount.",
      "Test-drove the raised car: handling with the higher suspension; whether the car and every driver could complete the required slaloms; turning diameter; stability taking turns at high speed; acceleration; power draw; and how much solar power we generated at solar noon.",
    ],
    iterations: [
      { version: "Visibility", change: "Before: one small in-car screen, hard to read and too small for all the data.", result: "After: every value on the CAN bus streamed live over Starlink to a Vercel webpage that every team member can open." },
      { version: "Neutral drops", change: "The car kept dropping from drive into neutral unpredictably, and the only fix was a full power cycle.", result: "Wrote a Pi failsafe that detects the drop, checks voltages and temperatures, and safely returns the car to drive on its own." },
      { version: "Clearance", change: "Raising the suspension meant bigger front bike forks, which no longer matched our wheel hubs.", result: "Designed a new aluminum hub-to-fork adapter so the existing wheels and hubs fit the new forks." },
    ],
    outcome: "2025: 2nd place in the Advanced Division at the Solar Car Challenge on the Texas Motor Speedway. 2026: 3rd overall in the Advanced Division on the cross-country road race: 650 miles over 5 days of racing across Texas, with 15,293 ft of elevation gain and 13,473 ft of loss.",
    learned: "Being captain taught me how much more goes into running a team than the engineering. Making sure everything gets done takes a lot of planning and logistics, so it's good to have skills beyond pure engineering, because some projects need those just as much.",
    media: [
      { src: "assets/img/solar-telemetry.jpg", caption: "In the pit tent at Texas Motor Speedway, 2025." },
      { src: "assets/img/solar-welding.jpg",   caption: "Welding a brake caliper mount at the fixture table, summer 2026." },
      { src: "assets/img/solar-testing.jpg",   caption: "Array lifted for a systems check during parking-lot testing." },
      { src: "assets/img/solar-roadside.jpg",  caption: "Under the car on the roadside during the 2026 cross-country race." },
      { src: "assets/img/solar-team.jpg",      caption: "The team with the car at Texas Motor Speedway." },
    ],
    links: [
      { label: "Team website: polysolarcar.org", href: "https://polysolarcar.org" },
    ],
  },

  {
    id: "eagle-scout-pergola",
    title: "Eagle Scout Project: Garden Pergola",
    tagline: "Designed and led the build of a pergola shade structure and vegetable garden at Olive View Medical Center, with about 20 volunteers.",
    category: "community",
    year: "2025",
    role: "Project lead: planning, materials, leading volunteers, welding the post brackets",
    timeline: "4 months of planning, 1 prep day, 2 build days",
    team: "About 20 volunteers, 160 volunteer hours",
    tags: ["Project leadership", "Welding", "Carpentry"],
    cover: "assets/img/eagle-cover.jpg",
    problem: "Olive View Medical Center runs a healthy food habits clinic for patients with obesity, but the space between two of its buildings was empty: no garden beds, and the old pergola there was in such bad shape it was barely standing. Nobody asked for this project. I noticed it while helping on another Eagle project at Olive View, then went to them with the idea and asked if it would help. They said it would be great.",
    process: [
      "Designed the roughly 18 × 10 ft pergola in Keynote and CAD to make sure everything would fit the space and look right, then got it approved by Olive View's project representative.",
      "Bought and hauled the lumber and garden supplies.",
      "Prep day: staining the beams with a volunteer crew.",
      "Build days: welded brackets onto the steel posts on site.",
      "Raised the beams, fastened the slats, and added shade cloth; assembled and filled the four raised beds and ran drip irrigation to them.",
    ],
    iterations: [
      { version: "Shade fabric", change: "The plan didn't settle how the shade fabric would stay attached to the top of the pergola once it was up.", result: "Fastened 1×4 trim pieces over the fabric to hold it down so it survives wind and rain." },
    ],
    outcome: "A finished pergola and vegetable garden, built in two days by about 20 volunteers over 160 volunteer hours. The pergola is about 18 × 10 ft, with four raised beds. The clinic now uses the garden to teach patients to grow their own vegetables, so they learn firsthand that vegetables are good and build healthier eating habits.",
    learned: "The project was really two builds at once, the pergola and the garden beds, and managing both at the same time was the biggest challenge.",
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
    id: "caltech-internship",
    title: "Caltech AMBER Lab: Humanoid Robot Hardware",
    tagline: "An internship in Caltech's AMBER Lab, designing the stereo camera mounts and compute backpack for a Unitree G1 humanoid robot to give it more autonomy and awareness.",
    category: "design",
    year: "2026",
    role: "Robotics intern on the hardware side: designed the front stereo camera mounts and the compute backpack in Fusion 360",
    timeline: "About 8 weeks, summer 2026",
    team: "Worked with two postdocs in the AMBER Lab",
    tags: ["Fusion 360", "CAD", "3D printing", "Robotics", "Humanoids", "Unitree G1", "NVIDIA Jetson Thor"],
    cover: "assets/img/caltech-cover.jpg",
    problem: "The lab's humanoid robots needed more onboard compute and cameras to be more autonomous and aware of their surroundings, and that hardware needed custom parts to mount it on a Unitree G1 humanoid. Because the lab does cutting-edge research, there are no off-the-shelf mounts for what goes on the robot, so every part has to be made in house.",
    process: [
      "Designed mounts in Fusion 360 for two wide-lens stereo cameras on the front of the robot. They had to fit the robot's torso and hold each camera at a specific angle and placement.",
      "Designed a \"backpack\" for the robot's back that holds an NVIDIA Jetson Thor computer and a ZED Box.",
      "3D printed the parts, then test-fit them on the robot itself to check fitment and balance.",
    ],
    iterations: [
      { version: "Camera mounts", change: "My first design was a tiltable mount that let the camera angle be adjusted, but it wasn't rigid enough.", result: "Switched to a fixed mount that holds the cameras at their set angle, for more rigidity." },
    ],
    outcome: "The parts I designed ended up in use on the lab's Unitree G1 humanoid robot.",
    learned: "Mostly, I learned that function matters more than form: the adjustable camera mount was the more elegant idea, but the fixed mount was what the robot needed. I also learned more about building tolerances into my CAD models to leave room for 3D printing error.",
    media: [
      { src: "assets/img/caltech-compute.jpg", caption: "The compute backpack I designed, holding the NVIDIA Jetson Thor and the ZED Box." },
      { src: "assets/img/caltech-parts.jpg",   caption: "My printed parts on the bench: the backpack and the two stereo camera mounts." },
      { src: "assets/img/caltech-zed.jpg",     caption: "The two wide-lens stereo cameras on the mounts I designed." },
      { src: "assets/img/caltech-front.jpg",   caption: "The G1 from the front, with the stereo cameras mounted on its torso." },
      { src: "assets/img/caltech-side.jpg",    caption: "Side view of the G1 wearing the backpack." },
    ],
    links: [],
  },

  {
    id: "lemons-e39",
    title: "24 Hours of Lemons Race Car",
    tagline: "A $500 BMW E39 that I'm turning into an endurance race car for 24 Hours of Lemons, the budget-car endurance race.",
    category: "vehicles",
    year: "2026",
    role: "Founded and run the team: I own the car, plan our meetings and work days, decide what we do to the car, and handle all the paperwork",
    timeline: "Since January 2026",
    team: "3 (me and 2 teammates)",
    tags: ["Race car prep", "Interior teardown", "Wiring", "Welding", "Team founder"],
    cover: "assets/img/bmw-cover.jpg",
    problem: "24 Hours of Lemons is an endurance race for cars bought cheap, so the challenge is making a $500 car safe and reliable enough to run for hours on track. That means stripping the interior to make room for the safety equipment a race car needs: a roll cage, a fire suppression system, and racing bucket seats. I picked the E39 because it's an amazing base that we could find cheap: it's a larger car, so it feels very planted, but it still handles well as a race platform. I started the team because I like cars and motorsports, and I do a little sim racing too.",
    process: [
      "Found a BMW E39 for $500 in Ventura, rented a trailer, and drove two hours each way to bring it home.",
      "Stripped the interior down to the floor pan to make room for the cage, fire suppression system, and bucket seats.",
      "Pulled the dash and all the trim. Now sorting through the wiring to keep what's necessary and cut what isn't, to save weight and go faster.",
      "Welding custom parts for the car, including a spoiler.",
    ],
    iterations: [],
    outcome: "Still in teardown: all the trim and interior are out, and the wiring is being sorted and cleaned up. Next come the cage, fire suppression system, and bucket seats. No race date is set yet.",
    learned: "Starting and running my own team has taught me that it can be really hard to get started on something, especially something like this, where I don't have much experience working on cars. But it's also shown me that you can get things done: you just have to keep working at them, and not be afraid to turn to online resources or to people who know what they're doing.",
    media: [
      { src: "assets/img/bmw-towed.jpg",    caption: "The $500 car arriving on the trailer, January 2026." },
      { src: "assets/img/bmw-stripped.jpg", caption: "Interior stripped to the floor pan to make room for the cage, fire suppression, and bucket seats." },
    ],
    links: [],
  },

  {
    id: "fuzz-pedal",
    title: "DIY Germanium Fuzz Pedal",
    tagline: "An attempt at designing my own germanium fuzz guitar pedal, from breadboard to custom circuit board.",
    category: "electronics",
    year: "2024",
    role: "Solo: schematic, board layout, prototyping, soldering",
    timeline: "August–September 2024",
    team: "Solo, with some help from my dad",
    tags: ["PCB design", "Analog audio", "Germanium transistors", "EasyEDA", "Soldering"],
    cover: "assets/img/pcb-cover.jpg",
    problem: "I was after a vintage fuzz sound for guitar. I decided to build a pedal instead of buying one because it would be really cool to have a home-built pedal to play with my home-built guitar.",
    process: [
      "Found a basic, high-level fuzz schematic online and started from there.",
      "Prototyped the circuit on breadboards, where it worked.",
      "Drew the full schematic in EasyEDA.",
      "Laid it out on a custom circuit board sized to fit inside a pedal enclosure, and had the boards manufactured.",
      "Soldered the boards.",
    ],
    iterations: [
      { version: "Breadboard", change: "The breadboard prototype worked, but it also acted like a radio and picked up radio stations.", result: "Most likely because it had no enclosure around it; a grounded pedal box should shield it." },
      { version: "Soldered board", change: "Even inside the box, the soldered board didn't work. I think some of the parts got fried during soldering.", result: "Troubleshot it with a multimeter. Next time I'd practice soldering first, especially managing iron temperature, since I didn't know much about it then." },
    ],
    outcome: "The finished pedal didn't work: the circuit worked on the breadboard, but something fried on the soldered board. I still came away with a custom-designed, manufactured circuit board and a clear idea of what to do differently.",
    learned: "It was a really interesting project, and it taught me a lot about electrical engineering: circuit design, laying out a custom circuit board, and making the most of the space on it. It also taught me a lot about troubleshooting with a multimeter to figure out what might be wrong.",
    media: [
      { src: "assets/img/pcb-breadboard.jpg", caption: "Breadboard prototype of the fuzz circuit." },
      { src: "assets/img/pcb-schematic.jpg",  caption: "Drawing the pedal schematic." },
      { src: "assets/img/pcb-schematic-easyeda.png", caption: "The finished schematic in EasyEDA (rev 1.0): a two-transistor germanium fuzz with trimmers and test points for biasing each transistor, a footswitch, an indicator LED, and battery or DC power with reverse-polarity protection." },
      { src: "assets/img/pcb-layout.jpg",     caption: "Laying out the pedal's circuit board." },
      { src: "assets/img/pcb-layout-easyeda.png", caption: "The finished two-layer board layout, with my \"RK Engineering\" logo." },
      { src: "assets/img/pcb-solder.jpg",     caption: "Soldering the boards." },
    ],
    links: [],
  },

  {
    id: "printed-guitar",
    title: "3D-Printed Electric Guitar",
    tagline: "A playable electric guitar with a 3D-printed honeycomb body that I printed, wired, and assembled.",
    category: "electronics",
    year: "2023",
    role: "Solo: adapting the model, printing, wiring, assembly",
    timeline: "May–June 2023 (my 8th grade end-of-year project)",
    team: "Solo",
    tags: ["3D printing", "CAD", "Soldering", "Guitar electronics"],
    cover: "assets/img/guitar-cover.jpg",
    problem: "For my 8th grade end-of-year project, I wanted to build a guitar with the shape and pickups I wanted. I started from an existing 3D model of a body and adapted it to fit the parts I had.",
    process: [
      "Printed the body in four sections with an open honeycomb pattern.",
      "Wired the three pickups and controls on the pickguard.",
      "Joined the printed sections with tabs and slots bonded with two-part epoxy, and ran three aluminum rods through the middle section for rigidity against string tension.",
      "Bolted on the neck with four neck bolts through the printed body, printing that area in ABS with higher infill so it could hold the neck and the tension.",
      "Assembled the body, neck, and hardware, then set it up and played it.",
    ],
    iterations: [
      { version: "Neck", change: "The neck I bought was not a perfect fit for the model in any way.", result: "Adapted the model to fit the neck." },
      { version: "Pickups", change: "My pickups weren't the standard size the model was designed for, and their magnet spacing didn't match.", result: "Added a pickguard to hold the pickups, designed my own pickup covers, and cut open the cover tops so the magnets would fit." },
      { version: "Wiring", change: "Some of the soldering wasn't quite right the first time.", result: "Fixed it quickly by following wiring diagrams I found online." },
    ],
    outcome: "A playable electric guitar that worked pretty well the first time, after a quick wiring fix.",
    learned: "This taught me a lot about soldering and putting electronics together, and about fitting them inside a mechanical design. Most of all, it taught me to adapt a design to the parts I actually have, not the parts it was drawn for.",
    media: [
      { src: "assets/img/guitar-parts.jpg",      caption: "The four printed body sections." },
      { src: "assets/img/guitar-pickguard.jpg",  caption: "Pickguard with three pickups, wired." },
      { src: "assets/img/guitar-solder.jpg",     caption: "Soldering the electronics." },
      { src: "assets/img/guitar-fair.jpg",       caption: "Showing it at my school's 8th grade project night." },
      { src: "assets/img/guitar-pedalboard.jpg?v=2", caption: "A pedalboard I built for it later, in 2025." },
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
    timeline: "A blacksmithing session at Adam's Forge, glassblowing classes with my mom, and a knifemaking class in Japan",
    team: "Solo",
    tags: ["Forging", "Belt grinding", "Glassblowing"],
    cover: "assets/img/forge-cover.jpg",
    problem: "I've always been interested in metalworking because it's heavier and more hardcore than working with wood, and the results feel sturdier. There's a lot more nuance to it, too. A session at Adam's Forge was my first blacksmithing and my first real metalwork, and it got me hooked.",
    process: [
      "2022: at Adam's Forge, made a butter knife: heating it in the forge, bending and twisting the steel, and finishing it on a belt grinder.",
      "2023: glassblowing with my mom: blew a bowl, and used glass forming to make a little two-color robin, with a different color inside.",
      "2024: a knifemaking class in Japan, where I forged and ground a Japanese cooking knife.",
    ],
    iterations: [],
    outcome: "A forged butter knife; a blown-glass bowl, a multi-color bowl, a two-color robin, and two paperweights (one clear, one orange and clear); and a Japanese cooking knife that I still use today.",
    learned: "Through all of this I've gotten very comfortable working with metal, and it's always so much fun. The grinding and metalwork carried straight into welding: solar car chassis parts, the post brackets on my Eagle project pergola, and custom parts for my race car.",
    media: [
      { src: "assets/img/forge-2022.jpg",    caption: "First time at the anvil, 2022." },
      { src: "assets/img/forge-twist.jpg",   caption: "Learning to shape heated steel." },
      { src: "assets/img/forge-glass.jpg",   caption: "Glassblowing, 2023." },
      { src: "assets/img/forge-2024.jpg",    caption: "Forging my cooking knife at the knifemaking class in Japan, 2024." },
      { src: "assets/img/forge-grinder.jpg", caption: "Shaping the Japanese cooking knife on the belt grinder." },
    ],
    links: [],
  },

  {
    id: "welding-art",
    title: "Welding Art",
    tagline: "Little welded art pieces I make in my free time, built from nuts, bolts, washers, spare TIG rods, and sheet metal.",
    category: "fabrication",
    year: "2026",
    role: "Solo: design and welding",
    timeline: "Ongoing since 2026, in my free time",
    team: "Solo",
    tags: ["MIG welding", "TIG welding", "Angle grinder"],
    cover: "assets/img/weldart-cover.jpg",
    problem: "Welding is a practical fabrication technique, mostly used for industrial work. I like welding as art because it gives that technique a more creative side. I make pieces from things in my life: I'm a guitarist, so I made a guitarist; I have dogs, so I made a dog; and lilies are my favorite flower.",
    process: [
      "Pick a subject from my own life.",
      "Welded a small dog and a small cowboy playing guitar from nuts, bolts, washers, and spare TIG rods, using MIG and TIG.",
      "Cut the petals for a lily from sheet metal with clippers, then welded the flower together.",
    ],
    iterations: [],
    outcome: "So far: a small dog, a guitar-playing cowboy, and a lily flower, with more on the way.",
    learned: "Welding with this much precision can be much harder than welding larger projects, even though the pieces don't need structural strength. Just holding the small parts in place while welding them is hard, too.",
    media: [
      { src: "assets/img/weldart-guitar-34.jpg",     caption: "The guitar-playing cowboy: a bolt-head hat, a hex-nut guitar with a bolt for the neck, and TIG rod arms and legs." },
      { src: "assets/img/weldart-dog-34.jpg",        caption: "The dog: a body of hex nuts, bolts for the legs and tail, and washers for the ears." },
      { src: "assets/img/weldart-dog-side.jpg",      caption: "The dog from the side." },
      { src: "assets/img/weldart-lily-front.jpg",    caption: "The lily, with petals cut from sheet metal." },
      { src: "assets/img/weldart-lily-34.jpg",       caption: "The lily from a three-quarter view." },
    ],
    links: [],
  },
];
