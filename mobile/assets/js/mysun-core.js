const headerMenu = document.querySelector(".header-menu");
const headerMenuClose = document.querySelector(".header-menu-close");
const bars3 = document.querySelector(".bars3");

if (window.innerWidth >= 1024) {
  headerMenuClose.addEventListener("click", function () {
    headerMenu.style.visibility = "hidden";
    headerMenu.style.opacity = "0";
    document.body.classList.remove("overflow-hidden");
  });

  bars3.addEventListener("click", function () {
    headerMenu.style.visibility = "visible";
    headerMenu.style.opacity = "1";
    document.body.classList.add("overflow-hidden");
  });
} else {
  headerMenuClose.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(1024px)";
    document.body.classList.remove("overflow-hidden");
  });

  bars3.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(0)";
    document.body.classList.add("overflow-hidden");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleDropdowns = document.querySelectorAll(".toggle-dropdown");
  const dropdownIcons = document.querySelectorAll(".dropdown-icon");

  toggleDropdowns.forEach((toggle, index) => {
    const submenu = toggle.nextElementSibling;
    const dropdownIcon = dropdownIcons[index];

    toggle.addEventListener("click", function () {

      dropdownIcon.classList.toggle("rotate-180");

      if (submenu.style.maxHeight) {
        submenu.style.maxHeight = null;
        submenu.style.opacity = "0";
      } else {

        submenu.style.maxHeight = (submenu.scrollHeight*30) + "px"; 
        submenu.style.opacity = "1";
      }
    });
  });
});