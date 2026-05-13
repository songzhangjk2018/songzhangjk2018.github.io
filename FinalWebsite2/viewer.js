/* PROJECTS */

const projects = {

  s1a1: {

    title: "Section 1, Assignment 1",

    link:
      "https://codepen.io/Song-Zhang-the-solid/embed/OPXmqYG",

    description:
      "A sci-fi inspired logo where text is built entirely out of text itself!"

  },

  s1a2: {

    title: "Section 1, Assignment 2",

    link:
      "https://codepen.io/Song-Zhang-the-solid/embed/EayXqEo",

    description:
      "A digital collage exploring unexpected compositions made from everyday objects."

  },

  s1f: {

    title: "Section 1, Final Project",

    link:
      "https://songzhangjk2018.github.io/s1fp01/test.html",

    description:
      "A final exploration expanding the visual language of Section 1."

  },

  s2a1: {

    title: "Section 2, Assignment 1",

    link:
      "https://kolydic.github.io/artweb/webring/",

    description:
      "Come explore a web that unfolds somewhere between a game, a story, and a space."

  },

  s2a2: {

    title: "Section 2, Assignment 2",

    link:
      "https://songzhangjk2018.github.io/s2hw02/test",

    description:
      "Dive deeper and deeper to the bottom of the iceberg."

  },

  s2f: {

    title: "Section 2, Final Project",

    link:
      "https://editor.p5js.org/songzhangjk2018/sketches/zN-wt1bef",

    description:
      "A never-ending hill-climbing clock trapped in an endless cycle of time."

  },

  s3a1: {

    title: "Section 3, Assignment 1",

    link:
      "https://songzhangjk2018.github.io/S3A1/",

    description:
      "Roll the dice and race your way through a interactive game."

  },

  s3a2: {

    title: "Section 3, Assignment 2",

    link:
      "https://dumrong1.github.io/tool/index.html",

    description:
      "Try our “Healthy Self-Blackmail” app designed to keep your everyday fitness goals."

  },

  s3f: {

    title: "Section 3, Final Project",

    link:
      "https://editor.p5js.org/songzhangjk2018/sketches/IXzJS5-Rd",

    description:
      "Upload an image and watch what will happen."

  },

  reading: {

    title: "Reading Responses",

    link:
      "https://songzhangjk2018.github.io/ReadingResponses/",

    description:
      "A collection of thoughts and reflections inspired by the course readings."

  }

};

/* URL PARAM */

const params =
  new URLSearchParams(window.location.search);

const id =
  params.get("id");

const data =
  projects[id];

/* INSERT CONTENT */

document.getElementById("title")
  .innerText = data.title;

document.getElementById("description")
  .innerText = data.description;

document.getElementById("viewerFrame")
  .src = data.link;

/* BACK BUTTON */

document.getElementById("backBtn")
  .addEventListener("click", () => {

    window.location.href =
      "index.html?catalogue=true";

  });

/* DRAGGING */

const popup =
  document.getElementById("popupWindow");

const titlebar =
  popup.querySelector(".titlebar");

let dragging = false;

let offsetX = 0;
let offsetY = 0;

titlebar.addEventListener("mousedown", (e) => {

  dragging = true;

  offsetX =
    e.clientX - popup.offsetLeft;

  offsetY =
    e.clientY - popup.offsetTop;

});

document.addEventListener("mousemove", (e) => {

  if (!dragging) return;

  popup.style.left =
    (e.clientX - offsetX) + "px";

  popup.style.top =
    (e.clientY - offsetY) + "px";

});

document.addEventListener("mouseup", () => {

  dragging = false;

});