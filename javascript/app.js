if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(function (error) {
    console.warn("Service worker registration failed:", error);
  });
}

const windows = {
  welcome: document.getElementById("welcome-window"),
  archive: document.getElementById("archive-window"),
  about: document.getElementById("about-window")
};

const dockItems = [...document.querySelectorAll(".dock-item")];
const openButtons = [...document.querySelectorAll("[data-app]")];
const spotlight = document.getElementById("spotlight");
const spotlightInput = document.getElementById("spotlight-input");
const clock = document.getElementById("clock");

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  clock.textContent = time;
}

function openApp(name) {
  Object.entries(windows).forEach(([key, el]) => {
    el.classList.toggle("hidden", key !== name);
    el.classList.toggle("active", key === name);
  });

  dockItems.forEach((item) => {
    const isMatch = item.dataset.app === name;
    item.classList.toggle("active", isMatch);
  });
}

openButtons.forEach((button) => {
  button.addEventListener("click", () => openApp(button.dataset.app));
});

dockItems.forEach((item) => {
  if (!item.dataset.app) return;
  item.addEventListener("click", () => openApp(item.dataset.app));
});

document.getElementById("search-launcher").addEventListener("click", () => {
  spotlight.hidden = false;
  spotlightInput.focus();
});

spotlight.addEventListener("click", (event) => {
  if (event.target === spotlight) {
    spotlight.hidden = true;
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    spotlight.hidden = false;
    spotlightInput.focus();
  }

  if (event.key === "Escape" && !spotlight.hidden) {
    spotlight.hidden = true;
  }
});

updateClock();
setInterval(updateClock, 15000);
