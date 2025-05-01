document.addEventListener("DOMContentLoaded", function () {
  const isDesktop = window.innerWidth > 1024;
  const requiredFiles = isDesktop
    ? ["maysungasht.ui.min.css"]
    : ["maysungasht-mob.ui.min.css"];

  function checkAllResourcesLoaded() {
    const resources = performance.getEntriesByType("resource");
    const loadedFiles = resources
      .map((res) => res.name.split("/").pop())
      .filter((name) => requiredFiles.includes(name));

    return requiredFiles.every((file) => loadedFiles.includes(file));
  }

  if (document.getElementById("search-box")) {
    function fetchEngine() {
      try {
        const xhrobj = new XMLHttpRequest();
        xhrobj.open("GET", "search-engine.bc");
        xhrobj.send();

        xhrobj.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            const container = document.getElementById("search-box");
            container.innerHTML = xhrobj.responseText;

            let r = document.querySelector(".flighttype-field");
            r.classList.add("flighttype-dropDown");
            ['.Basis_Date.end_date', '.Basis_Date.start_date'].forEach(selector => {
              const dateInputs = document.querySelectorAll(selector);
              dateInputs.forEach(input => {
                input.placeholder = '';
              });
            });
            const scripts = container.getElementsByTagName("script");
            for (let i = 0; i < scripts.length; i++) {
              const scriptTag = document.createElement("script");
              if (scripts[i].src) {
                scriptTag.src = scripts[i].src;
                scriptTag.async = false;
              } else {
                scriptTag.text = scripts[i].textContent;
              }
              document.head
                .appendChild(scriptTag)
                .parentNode.removeChild(scriptTag);
            }
          }
        };
      } catch (error) {
        console.error("مشکلی پیش آمده است. لطفا صبور باشید", error);
      }
    }

    function waitForFiles() {
      if (checkAllResourcesLoaded()) {
        fetchEngine();
      } else {
        setTimeout(waitForFiles, 500);
      }
    }
    waitForFiles();
  }
});
 

const headerMenu = document.querySelector(".header-menu");
const headerMenuClose = document.querySelector(".header-menu-close");
const bars3 = document.querySelector(".bars3");

if (window.innerWidth < 1024) {
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
        submenu.style.maxHeight = submenu.scrollHeight * 30 + "px";
        submenu.style.opacity = "1";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  let placeholder = null;
  const headerHeight = header.offsetHeight;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add(
        "fixed",
        "top-0",
        "left-0",
        "w-full",
        "z-50",
        "bg-white"
      );
      header.classList.add("shadow-lg");

      if (!placeholder) {
        placeholder = document.createElement("div");
        placeholder.style.height = headerHeight + "px";
        header.parentNode.insertBefore(placeholder, header.nextSibling);
      }
    } else {
      header.classList.remove(
        "fixed",
        "top-0",
        "left-0",
        "w-full",
        "z-50",
        "bg-white"
      );
      header.classList.remove("shadow-lg");

      if (placeholder) {
        placeholder.remove();
        placeholder = null;
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.querySelector(".search-header");
  const formHeader = document.querySelector(".form-header");
  const overlay = document.getElementById("overlay");

  searchIcon.addEventListener("click", function (event) {
    event.stopPropagation();
    formHeader.classList.remove("hidden");
    formHeader.classList.add("flex");
    overlay.classList.remove("hidden");
  });

  function closePopup() {
    formHeader.classList.add("hidden");
    formHeader.classList.remove("flex");
    overlay.classList.add("hidden");
  }

  overlay.addEventListener("click", closePopup);

  formHeader.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  document.addEventListener("click", closePopup);
});

document.addEventListener("DOMContentLoaded", function () {
  const faqBoxes = document.querySelectorAll(".faq-box");

  faqBoxes.forEach((box) => {
    const answer = box.querySelector(".faq-answer");

    box.addEventListener("click", function () {
      const isOpen = answer.classList.contains("scale-y-100");

      faqBoxes.forEach((otherBox) => {
        if (otherBox !== box) {
          const otherAnswer = otherBox.querySelector(".faq-answer");
          otherAnswer.classList.remove(
            "opacity-100",
            "scale-y-100",
            "max-h-96"
          );
          otherAnswer.classList.add("opacity-0", "scale-y-0", "max-h-0");
          otherBox.style.backgroundColor = "";
          otherBox.style.border = "";
        }
      });

      if (isOpen) {
        answer.classList.remove("opacity-100", "scale-y-100", "max-h-96");
        answer.classList.add("opacity-0", "scale-y-0", "max-h-0");
        box.style.backgroundColor = "";
        box.style.border = "";
      } else {
        answer.classList.remove("opacity-0", "scale-y-0", "max-h-0");
        answer.classList.add("opacity-100", "scale-y-100", "max-h-96");
        box.style.backgroundColor = "#FFF8E3";
        box.style.border = "2px solid #FFE189";
      }
    });
  });
});
