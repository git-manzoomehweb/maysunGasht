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
            [".Basis_Date.end_date", ".Basis_Date.start_date"].forEach(
              (selector) => {
                const dateInputs = document.querySelectorAll(selector);
                dateInputs.forEach((input) => {
                  input.placeholder = "";
                });
              }
            );
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
            if (document.querySelector(".landing-flight")) {
              let departure1 = document.querySelector(".departure");
              let destination1 = document.getElementById("destination1");
              let depLocationId = document.querySelector(".locationId.from");
              let desLocationId = document.querySelector(".locationId.to");
              let depTitleSearched = document.querySelector(
                ".dep-title-searched"
              );
              let desTitleSearched = document.querySelector(
                ".des-title-searched"
              );
              let FCDid1 = document.querySelector(".co-id.FCDid1");
              let FCDid2 = document.querySelector(".co-id.FCDid2");

              departure1.value = depTitleSearched.value;
              destination1.value = desTitleSearched.value;
              depLocationId.value = FCDid1.value;
              desLocationId.value = FCDid2.value;
            }
            if (document.querySelector(".landing-hotel")) {
              let departure2Hotel = document.querySelector(
                ".formhotel .reserve-field.departure-route #departure2"
              );
              let depLocationIdHotel =
                document.querySelector(".locationId.from");
              let depTitleSearchedHotel = document.querySelector(
                ".dep-title-searched"
              );
              let FCDid1Hotel = document.querySelector(".co-id.FCDid1");

              departure2Hotel.value = depTitleSearchedHotel.value;
              depLocationIdHotel.value = FCDid1Hotel.value;
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

// fixed header
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

// form header
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

// fetch tour default
document.addEventListener("DOMContentLoaded", function () {
  const fetchContentTour = document.querySelector(".fetch-content-tour");
  const tourLi = document.querySelectorAll(".tour-li");

  if (fetchContentTour) {
    async function firstContent() {
      const firstDataId = tourLi[0].getAttribute("data-id");
      fetchContentTour.innerHTML =
        '<div class="flex justify-center"><span class="fetch-loader"></span></div>';
      try {
        const firstResponse = await fetch(
          `/tour-load-items.bc?catid=${firstDataId}`
        );
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
          li.style.border = "";
        });

        item.style.backgroundColor = "#FFF8E3";
        item.style.color = "#FD7523";
        item.style.border = "1px solid #FFE189";

        let cmsQuery = item.getAttribute("data-id");

        async function secondContent() {
          fetchContentTour.innerHTML =
            '<div class="flex justify-center"><span class="fetch-loader"></span></div>';
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

// fetch faq default
document.addEventListener("DOMContentLoaded", function () {
  const fetchContentFaq = document.querySelector(".fetch-content-faq");
  const faqLi = document.querySelectorAll(".faq-li");

  if (fetchContentFaq) {
    async function firstContent() {
      const firstDataId = faqLi[0].getAttribute("data-id");

      fetchContentFaq.innerHTML =
        '<div class="flex justify-center"><span class="fetch-loader"></span></div>';

      try {
        const firstResponse = await fetch(
          `/faq-load-items.bc?id=${firstDataId}`
        );
        const firstData = await firstResponse.text();
        fetchContentFaq.innerHTML = firstData;
      } catch (error) {
        fetchContentFaq.innerHTML =
          "<p>خطا در دریافت اطلاعات: " + error.message + "</p>";
      }

      if (faqLi.length > 0) {
        faqLi[0].style.backgroundColor = "#FD7523";
        faqLi[0].style.color = "#fff";
        faqLi[0].style.border = "none";
      }
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

        const cmsQuery = item.getAttribute("data-id");

        async function secondContent() {
          fetchContentFaq.innerHTML =
            '<div class="flex justify-center"><span class="fetch-loader"></span></div>';
          try {
            const firstResponse = await fetch(
              `/faq-load-items.bc?id=${cmsQuery}`
            );
            const firstData = await firstResponse.text();
            fetchContentFaq.innerHTML = firstData;
          } catch (error) {
            fetchContentFaq.innerHTML =
              "<p>خطا در دریافت اطلاعات: " + error.message + "</p>";
          }
        }

        secondContent();
      });
    });

    fetchContentFaq.addEventListener("click", function (event) {
      const box = event.target.closest(".faq-box");
      if (!box) return;

      const answer = box.querySelector(".faq-answer");

      document.querySelectorAll(".faq-box").forEach((otherBox) => {
        if (otherBox !== box) {
          const otherAnswer = otherBox.querySelector(".faq-answer");
          if (!otherAnswer) return;

          otherAnswer.classList.remove(
            "opacity-100",
            "scale-y-100",
            "max-h-96",
            "mt-2"
          );
          otherAnswer.classList.add("opacity-0", "scale-y-0", "max-h-0");
          otherBox.style.backgroundColor = "";
          otherBox.style.border = "";
        }
      });

      const isOpen = answer.classList.contains("scale-y-100");

      if (!isOpen) {
        answer.classList.remove("opacity-0", "scale-y-0", "max-h-0");
        answer.classList.add("opacity-100", "scale-y-100", "max-h-96", "mt-2");
        box.style.backgroundColor = "#FFF8E3";
        box.style.border = "2px solid #FFE189";
      } else {
        answer.classList.remove(
          "opacity-100",
          "scale-y-100",
          "max-h-96",
          "mt-2"
        );
        answer.classList.add("opacity-0", "scale-y-0", "max-h-0");
        box.style.backgroundColor = "";
        box.style.border = "";
      }
    });
  }
});

// fetch flight default
document.addEventListener("DOMContentLoaded", function () {
  const fetchContentFlight = document.querySelector(".fetch-content-flight");
  const flightLi = document.querySelectorAll(".flight-li");

  if (fetchContentFlight) {
    async function firstContent() {
      const firstDataId = flightLi[0].getAttribute("data-id");
      fetchContentFlight.innerHTML =
        '<div class="flex justify-center"><span class="fetch-loader"></span></div>';
      try {
        const firstResponse = await fetch(
          `/flight-load-items.bc?catid=${firstDataId}`
        );
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
        flightLi[0].style.backgroundColor = "#FD7523";
        flightLi[0].style.color = "#fff";
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
            '<div class="flex justify-center"><span class="fetch-loader"></span></div>';
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

// search hotel list
document.querySelectorAll(".hotel-list-search").forEach(function (hotelItem) {
  const checkCity = hotelItem.querySelector(".city-hotel")?.textContent || "";
  const checkCityInput = document.querySelector(".hotelcity")?.value || "";

  const checkName = hotelItem.querySelector(".title-hotel")?.textContent || "";
  const checkNameInput = document.querySelector(".hotelname")?.value || "";

  const checkStar =
    hotelItem.querySelector(".star-hotel")?.getAttribute("data-star") || "";
  const checkStarInput = document.querySelector(".hotelstar")?.value || "";

  let shouldHide = false;

  if (!checkCity.toUpperCase().includes(checkCityInput.toUpperCase())) {
    shouldHide = true;
  }

  if (!checkName.toUpperCase().includes(checkNameInput.toUpperCase())) {
    shouldHide = true;
  }

  if (checkStarInput.length !== 0 && checkStar !== checkStarInput) {
    shouldHide = true;
  }

  hotelItem.style.display = shouldHide ? "none" : "";
});

const anyHidden = Array.from(
  document.querySelectorAll(".hotel-list-search")
).some((item) => item.style.display === "none");
if (anyHidden) {
  const hotelsListSearch = document.querySelector(".hotels-list-search");
  if (hotelsListSearch) {
    hotelsListSearch.style.display = "block";
  }
}

// search hotel,tour,article catlist
document.addEventListener("DOMContentLoaded", function () {
  function setupFilter(
    inputSelector,
    itemSelector,
    titleSelector,
    containerSelector
  ) {
    const input = document.querySelector(inputSelector);
    const allItems = Array.from(document.querySelectorAll(itemSelector));
    const container = document.querySelector(containerSelector);

    if (!input || !container || allItems.length === 0) return;

    input.addEventListener("input", function () {
      const searchText = input.value.trim().toLowerCase();
      container.innerHTML = "";

      allItems.forEach((item) => {
        const titleEl = item.querySelector(titleSelector);
        const titleText = titleEl ? titleEl.textContent.toLowerCase() : "";

        if (titleText.includes(searchText)) {
          const clone = item.cloneNode(true);
          container.appendChild(clone);
        }
      });
    });
  }

  setupFilter(
    ".hotel-cat-search",
    ".hotel-cat-item",
    ".hotel-cat-title",
    ".hotel-cat-container"
  );

  setupFilter(
    ".tour-cat-search",
    ".tour-cat-item",
    ".tour-cat-title",
    ".tour-cat-container"
  );

  setupFilter(
    ".article-cat-search",
    ".article-cat-item",
    ".article-cat-title",
    ".article-cat-container"
  );
});

// search hotel,tour,article catlist with header
function handleSearch(inputSelector, redirectUrl) {
  const headerInput = document.querySelector(inputSelector);

  headerInput.addEventListener("input", function () {
    const searchText = headerInput.value.trim();

    if (searchText.length > 0) {
      const url = new URL(window.location.href);
      url.pathname = redirectUrl;
      url.searchParams.set("t", "all");
      url.searchParams.set("search-content-name", searchText);
      window.location.href = url.toString();
    }
  });
}
function filterItemsOnSearch() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchText = urlParams.get("search-content-name");
  const tParam = urlParams.get("t");

  if (tParam === "all" && searchText) {
    const allItems = Array.from(
      document.querySelectorAll(
        ".hotel-cat-item, .tour-cat-item, .article-cat-item"
      )
    );
    const container = document.querySelector(".all-cat-item");
    container.innerHTML = "";

    allItems.forEach((item) => {
      const titleEl = item.querySelector(
        ".hotel-cat-title, .tour-cat-title, .article-cat-title"
      );
      const titleText = titleEl ? titleEl.textContent.toLowerCase() : "";

      if (titleText.includes(searchText.toLowerCase())) {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
      }
    });
  }
}
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".header-input")) {
    handleSearch(".header-input", "/search-content.bc");
  }

  if (window.location.pathname === "/search-content.bc") {
    filterItemsOnSearch();
  }
});

//hotel with hotel word
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const tParam = urlParams.get("t");

  if (tParam === "all") {
    const allItems = Array.from(
      document.querySelectorAll(".hotel-list-search")
    );
    const container = document.querySelector(".hotel-list-container");
    const section = document.querySelector(".hotel-list-section");

    if (!container || allItems.length === 0) {
      if (section) section.style.display = "none";
      return;
    }

    container.innerHTML = "";

    let hasMatch = false;

    allItems.forEach((item) => {
      const titleEl = item.querySelector(".title-hotel");
      const titleText = titleEl ? titleEl.textContent.toLowerCase() : "";

      if (titleText.includes("hotel") || titleText.includes("هتل")) {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
        hasMatch = true;
      }
    });

    if (!hasMatch && section) {
      section.style.display = "none";
    }
  }
});

function uploadDocumentContact(args) {
  document.querySelector("#contact-form-resize .Loading_Form").style.display =
    "block";
  const captcha = document
    .querySelector("#contact-form-resize")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#contact-form-resize")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadContact", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}

function refreshCaptchaContact(e) {
  $bc.setSource("captcha.refreshContact", true);
}

async function OnProcessedEditObjectContact(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#contact-form-resize .Loading_Form").style.display =
      "none";
    document.querySelector("#contact-form-resize .message-api").innerHTML =
      "درخواست شما با موفقیت ثبت شد.";
  } else {
    refreshCaptchaContact();
    setTimeout(() => {
      document.querySelector(
        "#contact-form-resize .Loading_Form"
      ).style.display = "none";
      document.querySelector("#contact-form-resize .message-api").innerHTML =
        "خطایی رخ داده, لطفا مجدد اقدام کنید.";
    }, 2000);
  }
}

async function RenderFormContact() {
  var inputElementVisa7 = document.querySelector(
    " .about-form-username input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "نام نام خانوادگی");

  var inputElementVisa7 = document.querySelector(
    " .about-form-email input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "ایمیل");
}

//pov form

function uploadDocumentPov(args) {
  document.querySelector("#pov-form-resize .Loading_Form").style.display =
    "block";
  const captcha = document
    .querySelector("#pov-form-resize")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#pov-form-resize")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadPov", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}

function refreshCaptchaPov(e) {
  $bc.setSource("captcha.refreshPov", true);
}

async function OnProcessedEditObjectPov(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#pov-form-resize .Loading_Form").style.display =
      "none";
    document.querySelector("#pov-form-resize .message-api").innerHTML =
      "درخواست شما با موفقیت ثبت شد.";
  } else {
    refreshCaptchaPov();
    setTimeout(() => {
      document.querySelector("#pov-form-resize .Loading_Form").style.display =
        "none";
      document.querySelector("#pov-form-resize .message-api").innerHTML =
        "خطایی رخ داده, لطفا مجدد اقدام کنید.";
    }, 2000);
  }
}

async function RenderFormPov() {
  var inputElementVisa7 = document.querySelector(
    " .pov-form-username input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "نام نام خانوادگی");

  var inputElementVisa7 = document.querySelector(
    " .pov-form-phone input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "شماره تماس");

  var inputElementVisa7 = document.querySelector(
    " .pov-form-message textarea[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "توضیحات");
}

if (document.querySelector(".swiper-suggestion-landing-mobile")) {
  var swiperSuggestionLandingMobile = new Swiper(
    ".swiper-suggestion-landing-mobile",
    {
      slidesPerView: "auto",
      direction: "vertical",
      speed: 400,
      centeredSlides: false,
      spaceBetween: 0,
      grabCursor: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next-custom",
        prevEl: ".swiper-button-prev-custom",
      },
    }
  );
}
if (document.querySelector(".swiper-suggestion-mobile")) {
  var swiperSuggestionMobile = new Swiper(".swiper-suggestion-mobile", {
    slidesPerView: "auto",
    direction: "vertical",
    speed: 400,
    centeredSlides: false,
    spaceBetween: 0,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
  });
}
if (document.querySelector(".swiper-suggestion")) {
  var swiperSuggestion = new Swiper(".swiper-suggestion", {
    slidesPerView: 3,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 8,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
  });
}
if (document.querySelector(".swiper-suggestion-landing")) {
  var swiperSuggestionLanding = new Swiper(".swiper-suggestion-landing", {
    slidesPerView: 3,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 8,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
  });
}
