const loader = document.getElementById("loader");
const refreshBtn = document.getElementById("refreshBtn");
const catalogue = document.getElementById("catalogue");

/* ALL ASSIGNMENTS */
const windowsData = [
  { text: "Section 1, Assignment 1", link: "https://codepen.io/Song-Zhang-the-solid/pen/OPXmqYG" },
  { text: "Section 1, Assignment 2", link: "https://codepen.io/Song-Zhang-the-solid/pen/EayXqEo" },
  { text: "Section 1, Final Project", link: "https://songzhangjk2018.github.io/s1fp01/test.html" },

  { text: "Section 2, Assignment 1", link: "https://kolydic.github.io/artweb/webring/" },
  { text: "Section 2, Assignment 2", link: "https://songzhangjk2018.github.io/s2hw02/test" },
  { text: "Section 2, Final Project", link: "https://editor.p5js.org/songzhangjk2018/sketches/zN-wt1bef" },

  { text: "Section 3, Assignment 1", link: "https://songzhangjk2018.github.io/S3A1/" },
  { text: "Section 3, Assignment 2", link: "https://dumrong1.github.io/tool/index.html" },

  { text: "Section 3, Final Project", link: null },
  { text: "Reading Response", link: null }
];

/* WINDOW SIZE */
const WIN_W = 280;
const WIN_H = 180;

/* SAFE ZONE (center area containing link + GO) */
const SAFE_W = 180;
const SAFE_H = 80;

/* store safe zones */
let placedZones = [];

/* check overlap between rectangles */
function isOverlapping(a, b) {
  return !(
    a.x + a.w < b.x ||
    a.x > b.x + b.w ||
    a.y + a.h < b.y ||
    a.y > b.y + b.h
  );
}

/* generate position with safe-zone protection */
function getSafePosition() {
  let tries = 0;

  while (tries < 200) {
    const x = Math.random() * (window.innerWidth - WIN_W);
    const y = Math.random() * (window.innerHeight - WIN_H);

    // define safe zone centered inside window
    const safeZone = {
      x: x + (WIN_W - SAFE_W) / 2,
      y: y + (WIN_H - SAFE_H) / 2,
      w: SAFE_W,
      h: SAFE_H
    };

    let collision = placedZones.some(zone => isOverlapping(zone, safeZone));

    if (!collision) {
      placedZones.push(safeZone);
      return { x, y };
    }

    tries++;
  }

  // fallback (if crowded)
  return {
    x: Math.random() * (window.innerWidth - WIN_W),
    y: Math.random() * (window.innerHeight - WIN_H)
  };
}

/* SPAWN WINDOWS */
function spawnWindows() {
  placedZones = [];

  windowsData.forEach((data, i) => {
    setTimeout(() => {
      const pos = getSafePosition();

      const win = document.createElement("div");
      win.className = "window";

      win.style.top = pos.y + "px";
      win.style.left = pos.x + "px";
      win.style.zIndex = i + 1;

      const buttonHTML = data.link
        ? `<button onclick="window.open('${data.link}', '_blank')">GO</button>`
        : `<button disabled>GO</button>`;

      const titleHTML = data.link
        ? `<a href="#">${data.text}</a>`
        : `<div>${data.text}</div>`;

      win.innerHTML = `
        <div class="titlebar">Local Disk (C:)</div>
        <div class="content">
          <div>Click GO to Access</div>
          ${titleHTML}
          ${buttonHTML}
        </div>
      `;

      document.body.appendChild(win);
    }, i * 250);
  });

  refreshBtn.style.display = "block";
}

/* EVENTS */
loader.addEventListener("click", () => {
  loader.style.display = "none";
  spawnWindows();
});

refreshBtn.addEventListener("click", () => {
  document.querySelectorAll(".window").forEach(w => w.remove());
  refreshBtn.style.display = "none";
  catalogue.style.display = "block";
});