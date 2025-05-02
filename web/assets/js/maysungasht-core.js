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
    overlay.classList.remove("hidden");
  });

  function closePopup() {
    formHeader.classList.add("hidden");
    overlay.classList.add("hidden");
  }

  overlay.addEventListener("click", closePopup);

  formHeader.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  document.addEventListener("click", closePopup);
});

document.addEventListener("DOMContentLoaded", function () {
  const fetchContentTour = document.querySelector(".fetch-content-tour");
  const tourLi = document.querySelectorAll(".tour-li");

  if (fetchContentTour) {
    async function firstContent() {
      fetchContentTour.innerHTML =
        '<div class="flex justify-center"><span class="tour-loader"></span></div>';
      try {
        const firstResponse = await fetch("/tour-load-items.bc?catid=152130");
        if (!firstResponse.ok) {
          throw new Error(`HTTP error! Status: ${firstResponse.status}`);
        }
        const firstData = await firstResponse.text();
        fetchContentTour.innerHTML = firstData;
      } catch (error) {
        console.error("Fetch failed:", error);
        fetchContentTour.innerHTML =
          "<p>Error loading data: " + error.message + "</p>";
      }
      if (tourLi.length > 0) {
        tourLi[0].style.backgroundColor = "#FFF8E3";
        tourLi[0].style.color = "#FD7523";
        tourLi[0].style.border = "1px solid #FFE189";
      }
    }
    firstContent();

    tourLi.forEach((item) => {
      item.addEventListener("click", function () {
        tourLi.forEach((li) => {
          li.style.backgroundColor = "";
          li.style.color = "";
        });

        tourLi[0].style.backgroundColor = "#FFF8E3";
        tourLi[0].style.color = "#FD7523";
        tourLi[0].style.border = "1px solid #FFE189";

        let cmsQuery = item.getAttribute("data-id");

        async function secondContent() {
          fetchContentTour.innerHTML =
            '<div class="flex justify-center"><span class="tour-loader"></span></div>';
          try {
            const firstResponse = await fetch(
              `/tour-load-items.bc?catid=${cmsQuery}`
            );
            if (!firstResponse.ok) {
              throw new Error(`HTTP error! Status: ${firstResponse.status}`);
            }
            const firstData = await firstResponse.text();
            fetchContentTour.innerHTML = firstData;
          } catch (error) {
            fetchContentTour.innerHTML =
              "<p>Error loading data: " + error.message + "</p>";
          }
        }
        secondContent();
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const fetchContentFaq = document.querySelector(".fetch-content-tour");
  const faqLi = document.querySelectorAll(".faq-li");

  if (fetchContentFaq) {
    async function firstContent() {
      fetchContentFaq.innerHTML =
        '<div class="flex justify-center"><span class="faq-loader"></span></div>';
      try {
        const firstResponse = await fetch("/faq-load-items.bc?catid=214532");
        if (!firstResponse.ok) {
          throw new Error(`HTTP error! Status: ${firstResponse.status}`);
        }
        const firstData = await firstResponse.text();
        fetchContentFaq.innerHTML = firstData;
        attachFaqBoxEvents();
      } catch (error) {
        console.error("Fetch failed:", error);
        fetchContentFaq.innerHTML =
          "<p>Error loading data: " + error.message + "</p>";
      }

      if (faqLi.length > 0) {
        item.style.backgroundColor = "#FD7523";
        item.style.color = "#fff";
        item.style.border = "none";
      }
    }

    function attachFaqBoxEvents() {
      const faqBoxes = document.querySelectorAll(".faq-box");
      faqBoxes.forEach((box) => {
        box.addEventListener("click", function () {
          const answer = box.querySelector(".faq-answer");
          const isOpen = answer.classList.contains("scale-y-100");

          faqBoxes.forEach((otherBox) => {
            const otherAnswer = otherBox.querySelector(".faq-answer");
            otherAnswer.classList.remove(
              "opacity-100",
              "scale-y-100",
              "max-h-96"
            );
            otherAnswer.classList.add("opacity-0", "scale-y-0", "max-h-0");
            otherBox.style.backgroundColor = "";
            otherBox.style.border = "";
          });

          if (!isOpen) {
            answer.classList.remove("opacity-0", "scale-y-0", "max-h-0");
            answer.classList.add("opacity-100", "scale-y-100", "max-h-96");
            box.style.backgroundColor = "#FFF8E3";
            box.style.border = "2px solid #FFE189";
          }
        });
      });
    }

    firstContent();

    faqLi.forEach((item) => {
      item.addEventListener("click", function () {
        faqLi.forEach((li) => {
          li.style.backgroundColor = "";
          li.style.color = "";
          li.style.border = "";
        });

        item.style.backgroundColor = "#FD7523";
        item.style.color = "#fff";
        item.style.border = "none";

        let cmsQuery = item.getAttribute("data-id");

        async function secondContent() {
          fetchContentFaq.innerHTML =
            '<div class="flex justify-center"><span class="faq-loader"></span></div>';
          try {
            const firstResponse = await fetch(
              `/faq-load-items.bc?catid=${cmsQuery}`
            );
            if (!firstResponse.ok) {
              throw new Error(`HTTP error! Status: ${firstResponse.status}`);
            }
            const firstData = await firstResponse.text();
            fetchContentFaq.innerHTML = firstData;
            attachFaqBoxEvents();
          } catch (error) {
            fetchContentFaq.innerHTML =
              "<p>Error loading data: " + error.message + "</p>";
          }
        }
        secondContent();
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const fetchContentFlight = document.querySelector(".fetch-content-flight");
  const flightLi = document.querySelectorAll(".flight-li");

  if (fetchContentFlight) {
    async function firstContent() {
      fetchContentFlight.innerHTML =
        '<div class="flex justify-center"><span class="flight-loader"></span></div>';
      try {
        const firstResponse = await fetch("/flight-load-items.bc?catid=214545");
        if (!firstResponse.ok) {
          throw new Error(`HTTP error! Status: ${firstResponse.status}`);
        }
        const firstData = await firstResponse.text();
        fetchContentFlight.innerHTML = firstData;
      } catch (error) {
        console.error("Fetch failed:", error);
        fetchContentFlight.innerHTML =
          "<p>Error loading data: " + error.message + "</p>";
      }
      if (flightLi.length > 0) {
        item.style.backgroundColor = "#FD7523";
        item.style.color = "#fff";
      }
    }
    firstContent();

    flightLi.forEach((item) => {
      item.addEventListener("click", function () {
        flightLi.forEach((li) => {
          li.style.backgroundColor = "";
          li.style.color = "";
        });

        item.style.backgroundColor = "#FD7523";
        item.style.color = "#fff";

        let cmsQuery = item.getAttribute("data-id");

        async function secondContent() {
          fetchContentFlight.innerHTML =
            '<div class="flex justify-center"><span class="flight-loader"></span></div>';
          try {
            const firstResponse = await fetch(
              `/flight-load-items.bc?catid=${cmsQuery}`
            );
            if (!firstResponse.ok) {
              throw new Error(`HTTP error! Status: ${firstResponse.status}`);
            }
            const firstData = await firstResponse.text();
            fetchContentFlight.innerHTML = firstData;
          } catch (error) {
            fetchContentFlight.innerHTML =
              "<p>Error loading data: " + error.message + "</p>";
          }
        }
        secondContent();
      });
    });
  }
});
