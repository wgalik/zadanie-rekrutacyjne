const subMenu = document.querySelector("#sub-menu");
const subListItems = document.querySelectorAll(".sub-list li");
const magnifyingGlass = document.querySelector("i.fa-magnifying-glass");
const searchInput = document.querySelector("#searchInput");
let isMenuOpen = false;
let isSearchUnhide = false;
let isInputPressed = false;

function dropDownMenu() {
  if (!isMenuOpen) {
    subListItems.forEach((el) => el.classList.add("show"));
    isMenuOpen = true;
  } else {
    subListItems.forEach((el) => el.classList.remove("show"));
    isMenuOpen = false;
  }
}

subMenu.addEventListener("mouseleave", () => {
  if (isMenuOpen) {
    subListItems.forEach((el) => el.classList.remove("show"));
    isMenuOpen = false;
  }
});

subMenu.addEventListener("click", dropDownMenu);

// search input

function unHideInput() {
  if (!isSearchUnhide) {
    magnifyingGlass.classList.add("unhide");
    searchInput.classList.add("unhide_search");
    searchInput.setAttribute("placeholder", "Szukaj...");
    searchInput.focus();
    isSearchUnhide = true;
  }
}

function HideInput() {
  if (isSearchUnhide && !searchInput.value) {
    magnifyingGlass.classList.remove("unhide");
    searchInput.classList.remove("unhide_search");
    searchInput.setAttribute("placeholder", "");
    searchInput.blur();
    isSearchUnhide = false;
  }
}

magnifyingGlass.addEventListener("click", unHideInput);
magnifyingGlass.addEventListener("mouseleave", () => {
  setTimeout(HideInput, 5000);
});

// podswietlanie i wyszukiwanie

// const searchInput = document.getElementById('searchInput');

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let text = searchInput.value;
    removeHighlights(); // czyścimy wcześniejsze zaznaczenia
    highlightText(document.body, text);
  }
});

function highlightText(node, text) {
  if (!text) return;

  const regex = new RegExp(`(${text})`, "gi");

  for (let child of [...node.childNodes]) {
    if (child.nodeType === 3) {
      // tekst
      const matches = child.nodeValue.match(regex);
      if (matches) {
        const span = document.createElement("span");
        span.innerHTML = child.nodeValue.replace(
          regex,
          '<span class="highlight">$1</span>'
        );
        child.replaceWith(span);
      }
    } else if (
      child.nodeType === 1 &&
      child.tagName !== "SCRIPT" &&
      child.tagName !== "STYLE"
    ) {
      highlightText(child, text);
    }
  }
  searchInput.value = "";
  HideInput();
}

function removeHighlights() {
  document.querySelectorAll(".highlight").forEach((span) => {
    span.replaceWith(document.createTextNode(span.textContent));
  });
}
//

const slider = document.getElementById("slider");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

const images = [
  "url('https://picsum.photos/id/1018/600/400')",
  "url('https://picsum.photos/id/1015/600/400')",
  "url('https://picsum.photos/id/1016/600/400')",
];

let currentIndex = 0;

function updateSlide() {
  slider.style.backgroundImage = images[currentIndex];
}

next.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateSlide();
});

prev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlide();
});

// Start with the first image
updateSlide();


// galeria

// vanilla JS
// init with element
var grid = document.querySelector('.grid');
var msnry = new Masonry( grid, {
  // options...
  itemSelector: '.grid-item',
  columnWidth: 100
});
 
// // init with selector
// var msnry = new Masonry( '.grid', {
//   // options...
// });

msnry.appended( elements )