const loader = document.getElementById("loader");
const refreshBtn = document.getElementById("refreshBtn");
const catalogue = document.getElementById("catalogue");

/* DATA */
const windowsData = [
  {
    text: "Section 1, Assignment 1",
    link: "https://codepen.io/Song-Zhang-the-solid/pen/OPXmqYG"
  },
  {
    text: "Section 1, Assignment 2",
    link: "https://codepen.io/Song-Zhang-the-solid/pen/EayXqEo"
  },
  {
    text: "Section 1, Final Project",
    link: "https://songzhangjk2018.github.io/s1fp01/test.html"
  }
];

/* WINDOW SIZE (must match CSS roughly) */
const WIN_W = 280;
const WIN_H = 180;
const GAP = 20;

/* GENERATE GRID POSITIONS */
function generatePositions(count) {
  const positions = [];

  const cols = Math.floor(window.innerWidth / (WIN_W + GAP));
  const rows = Math.floor(window.innerHeight / (WIN_H + GAP));

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      positions.push({
        top: r * (WIN_H + GAP),
        left: c * (WIN_W + GAP)
      });
    }
  }

  // shuffle positions so it still feels random
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  return positions.slice(0, count);
}

/* CREATE WINDOWS */
function spawnWindows() {
  const positions = generatePositions(windowsData.length);

  windowsData.forEach((data, i) => {
    setTimeout(() => {
      const win = document.createElement("div");
      win.className = "window";

      win.style.top = positions[i].top + "px";
      win.style.left = positions[i].left + "px";

      win.innerHTML = `
        <div class="titlebar">Local Disk (C:)</div>
        <div class="content">
          <div>Click GO to Access</div>
          <a href="#">${data.text}</a>
          <button onclick="window.open('${data.link}', '_blank')">GO</button>
        </div>
      `;

      document.body.appendChild(win);
    }, i * 600);
  });

  refreshBtn.style.display = "block";
}

/* LOADER CLICK */
loader.addEventListener("click", () => {
  loader.style.display = "none";
  spawnWindows();
});

/* REFRESH → CATALOGUE */
refreshBtn.addEventListener("click", () => {
  document.querySelectorAll(".window").forEach(w => w.remove());
  refreshBtn.style.display = "none";
  catalogue.style.display = "block";
});