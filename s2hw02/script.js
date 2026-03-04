const bg = document.getElementById("bgImage");
const diver = document.getElementById("diver");
const bubbleContainer = document.getElementById("bubbleContainer");
const spongebob = document.getElementById("spongebob");

/* ================= IMAGES ================= */

const images = [
  "iceberg0-01.jpg",
  "iceberg0-02.jpg",
  "iceberg0-03.jpg",
  "iceberg0-04.jpg",
  "iceberg0-05.jpg"
];

let currentIndex = 0;

/* ================= CLICK DIVER ================= */

diver.addEventListener("click", () => {

  currentIndex = (currentIndex + 1) % images.length;

  bg.src = images[currentIndex];

  createBubbles();

  /* Show SpongeBob only on iceberg05 */

  if(images[currentIndex] === "iceberg0-05.jpg"){
    spongebob.style.display = "block";
  }
  else{
    spongebob.style.display = "none";
  }

});

/* ================= BUBBLES ================= */

function createBubbles(){

  const styles = getComputedStyle(document.documentElement);

  const bubbleOffsetX = parseFloat(styles.getPropertyValue("--bubble-x"));
  const bubbleOffsetY = parseFloat(styles.getPropertyValue("--bubble-y"));

  const rect = diver.getBoundingClientRect();
  const wrapperRect = bubbleContainer.getBoundingClientRect();

  for(let i=0;i<8;i++){

    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const x = rect.left - wrapperRect.left + rect.width * bubbleOffsetX;
    const y = rect.top - wrapperRect.top + rect.height * bubbleOffsetY;

    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;

    const size = Math.random()*10 + 6;

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    const duration = Math.random()*1 + 1.5;

    bubble.style.animationDuration = `${duration}s`;

    bubbleContainer.appendChild(bubble);

    setTimeout(()=>{
      bubble.remove();
    }, duration*1000);

  }
}

/* ================= SPONGEBOB HOVER SWAP ================= */

spongebob.addEventListener("mouseenter", () => {
  spongebob.src = "Spongebob02.png";
});

spongebob.addEventListener("mouseleave", () => {
  spongebob.src = "Spongebob.png";
});