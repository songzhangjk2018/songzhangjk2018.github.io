const loader =
  document.getElementById("loader");

const refreshBtn =
  document.getElementById("refreshBtn");

const catalogue =
  document.getElementById("catalogue");

let highestZ = 100;

/* WINDOWS */

const windowsData = [

  {
    title: "Section 1, Assignment 1",
    link: "viewer.html?id=s1a1"
  },

  {
    title: "Section 1, Assignment 2",
    link: "viewer.html?id=s1a2"
  },

  {
    title: "Section 1, Final Project",
    link: "viewer.html?id=s1f"
  },

  {
    title: "Section 2, Assignment 1",
    link: "viewer.html?id=s2a1"
  },

  {
    title: "Section 2, Assignment 2",
    link: "viewer.html?id=s2a2"
  },

  {
    title: "Section 2, Final Project",
    link: "viewer.html?id=s2f"
  },

  {
    title: "Section 3, Assignment 1",
    link: "viewer.html?id=s3a1"
  },

  {
    title: "Section 3, Assignment 2",
    link: "viewer.html?id=s3a2"
  },

  {
    title: "Section 3, Final Project",
    link: "viewer.html?id=s3f"
  },

  {
    title: "Reading Responses",
    link: "viewer.html?id=reading"
  }

];

/* DRAGGING */

function makeDraggable(win) {

  const titlebar =
    win.querySelector(".titlebar");

  let dragging = false;

  let offsetX = 0;
  let offsetY = 0;

  titlebar.addEventListener("mousedown", (e) => {

    dragging = true;

    offsetX =
      e.clientX - win.offsetLeft;

    offsetY =
      e.clientY - win.offsetTop;

    highestZ++;

    win.style.zIndex = highestZ;

  });

  document.addEventListener("mousemove", (e) => {

    if (!dragging) return;

    win.style.left =
      (e.clientX - offsetX) + "px";

    win.style.top =
      (e.clientY - offsetY) + "px";

  });

  document.addEventListener("mouseup", () => {

    dragging = false;

  });

}

/* SPAWN WINDOWS */

function spawnWindows() {

  windowsData.forEach((data, i) => {

    setTimeout(() => {

      const win =
        document.createElement("div");

      win.className = "window";

      win.style.left =
        Math.random() *
        (window.innerWidth - 350) + "px";

      win.style.top =
        Math.random() *
        (window.innerHeight - 220) + "px";

      highestZ++;

      win.style.zIndex = highestZ;

      win.innerHTML = `

        <div class="titlebar">

          Local Disk (C:)

        </div>

        <div class="content">

          <div>

            Click GO to Access

          </div>

          <a href="${data.link}">

            ${data.title}

          </a>

          <button onclick="window.location.href='${data.link}'">

            GO

          </button>

        </div>

      `;

      document.body.appendChild(win);

      makeDraggable(win);

    }, i * 250);

  });

  refreshBtn.style.display = "block";

}

/* URL PARAMS */

const params =
  new URLSearchParams(window.location.search);

/* DIRECTLY OPEN CLEAN INDEX */

if (params.get("catalogue") === "true") {

  loader.style.display = "none";

  catalogue.style.display = "block";

}

/* LOADER */

loader.addEventListener("click", () => {

  loader.style.display = "none";

  spawnWindows();

});

/* REFRESH */

refreshBtn.addEventListener("click", () => {

  document.querySelectorAll(".window")
    .forEach(w => w.remove());

  refreshBtn.style.display = "none";

  catalogue.style.display = "block";

  /* UPDATE URL */

  history.replaceState(

    null,
    "",
    "index.html?catalogue=true"

  );

});