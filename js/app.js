// Local storage color settings
const colorsNodeList = document.querySelectorAll(".colors-list li");
const iconContainer = document.querySelector(".icon-container");
let localStorageColor = localStorage.getItem("color");
if (localStorageColor !== null) {
  document.documentElement.style.setProperty("--main-color", localStorageColor);
  iconContainer.style.color = localStorageColor;
  colorsNodeList.forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === localStorageColor) {
      element.classList.add("active");
    }
  });
}

// Settings Box
document.querySelector(".fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("exist");
};

// Colors settings
colorsNodeList.forEach((colorLi) => {
  colorLi.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    iconContainer.style.color = e.target.dataset.color;
    localStorage.setItem("color", e.target.dataset.color);
    handleActive(e);
  });
});

/*
  Change the background randomly
  Save functionality and the active class on local storage
*/
const buttonsContainer = document.querySelectorAll(".buttons-container");
const landingPage = document.querySelector(".landing-page");
let backgroundOption = true;
let intervalFn;
let localStorageBackground = localStorage.getItem("background-status");
let imgsArr = [];
let imageNum = 6;
for (let i = 1; i <= imageNum; i++) {
  imgsArr.push(`img_${i}.jpg`);
}
let backgroundChange = () => {
  if (backgroundOption) {
    intervalFn = setInterval(() => {
      let randomNum = Math.floor(Math.random() * imgsArr.length);
      landingPage.style.backgroundImage = `url(resources/${imgsArr[randomNum]})`;
    }, 2000);
  }
};
buttonsContainer.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      backgroundChange();
      localStorage.setItem("background-status", true);
    } else {
      backgroundOption = false;
      clearInterval(intervalFn);
      localStorage.setItem("background-status", false);
    }
  });
});
if (localStorageBackground !== null) {
  document.querySelectorAll(".buttons-container span").forEach((span) => {
    span.classList.remove("active");
  });
  if (localStorageBackground === "true") {
    document.querySelector(".buttons-container .yes").classList.add("active");
    backgroundChange();
  } else {
    document.querySelector(".buttons-container .no").classList.add("active");
  }
} else {
  backgroundChange();
}

// Skills Animation
const skills = document.querySelector(".skills");
const allSkills = document.querySelectorAll(".skill-box .skill-progress span");
window.onscroll = function () {
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > 800) {
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else if (windowScrollTop < 450) {
    allSkills.forEach((skill) => {
      skill.style.width = 0;
    });
  }
};

// The popup Box creation
const galleryImages = document.querySelectorAll(".gallery img");
galleryImages.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popup = document.createElement("div");
    popup.className = "popup";
    let imageHeading = document.createElement("h3");
    let headingText = document.createTextNode(img.alt);
    imageHeading.appendChild(headingText);
    popup.appendChild(imageHeading);
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popup.appendChild(popupImage);
    let closeButton = document.createElement("span");
    closeButton.className = "close-button";
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    popup.appendChild(closeButton);
    document.body.appendChild(popup);
  });
});

// Close the popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// Links and bullets scrolling
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");
function scrolling(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrolling(allBullets);
scrolling(allLinks);

// Handle active class function
handleActive = (event) => {
  event.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  event.target.classList.add("active");
};

/*
  Bullets in settings box
  Save functionality and the active class on local storage
*/
const bulletsButtons = document.querySelectorAll(".bullets-container span");
const bulletsContainer = document.querySelector(".nav-bullets");
const bulletsLocalStorage = localStorage.getItem("bullets-status");
bulletsButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-status", "active");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-status", "not-active");
    }
    handleActive(e);
  });
});
if (bulletsLocalStorage !== null) {
  bulletsButtons.forEach((button) => {
    button.classList.remove("active");
  });
  if (bulletsLocalStorage === "active") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-container .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-container .no").classList.add("active");
  }
}

// Reset options
document.querySelector(".reset-options").onclick = function () {
  document.querySelector(".message-box").style.display = "block";
  document.querySelectorAll(".message-buttons span").forEach((span) => {
    span.addEventListener("click", (e) => {
      if (e.target.className === "yes") {
        localStorage.removeItem("color");
        localStorage.removeItem("background-status");
        localStorage.removeItem("bullets-status");
        window.location.reload();
      } else {
        document.querySelector(".message-box").style.display = "none";
      }
    });
  });
};

// Toggle menu
const toggleMenu = document.querySelector(".toggle-menu");
const links = document.querySelector(".links");
toggleMenu.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  links.classList.toggle("open");
};
document.addEventListener("click", (e) => {
  if (
    e.target !== toggleMenu &&
    e.target !== links &&
    links.classList.contains("open")
  ) {
    toggleMenu.classList.remove("menu-active");
    links.classList.remove("open");
  }
});
links.onclick = function (e) {
  e.stopPropagation();
};
