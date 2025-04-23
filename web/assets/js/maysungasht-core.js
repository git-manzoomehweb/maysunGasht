// const headerMenu = document.querySelector(".header-menu");
// const headerMenuClose = document.querySelector(".header-menu-close");
// const bars3 = document.querySelector(".bars3");

// if (window.innerWidth >= 1024) {
//   headerMenuClose.addEventListener("click", function () {
//     headerMenu.style.visibility = "hidden";
//     headerMenu.style.opacity = "0";
//     document.body.classList.remove("overflow-hidden");
//   });

//   bars3.addEventListener("click", function () {
//     headerMenu.style.visibility = "visible";
//     headerMenu.style.opacity = "1";
//     document.body.classList.add("overflow-hidden");
//   });
// } else {
//   headerMenuClose.addEventListener("click", function () {
//     headerMenu.style.transform = "translateX(1024px)";
//     document.body.classList.remove("overflow-hidden");
//   });

//   bars3.addEventListener("click", function () {
//     headerMenu.style.transform = "translateX(0)";
//     document.body.classList.add("overflow-hidden");
//   });
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const toggleDropdowns = document.querySelectorAll(".toggle-dropdown");
//   const dropdownIcons = document.querySelectorAll(".dropdown-icon");

//   toggleDropdowns.forEach((toggle, index) => {
//     const submenu = toggle.nextElementSibling;
//     const dropdownIcon = dropdownIcons[index];

//     toggle.addEventListener("click", function () {
//       dropdownIcon.classList.toggle("rotate-180");

//       if (submenu.style.maxHeight) {
//         submenu.style.maxHeight = null;
//         submenu.style.opacity = "0";
//       } else {
//         submenu.style.maxHeight = submenu.scrollHeight * 30 + "px";
//         submenu.style.opacity = "1";
//       }
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
    const faqBoxes = document.querySelectorAll(".faq-box");
  
    faqBoxes.forEach((box) => {
      const answer = box.querySelector(".faq-answer");
  
      box.addEventListener("click", function () {
        const isOpen = answer.classList.contains("scale-y-100");
  
        faqBoxes.forEach((otherBox) => {
          if (otherBox !== box) {
            const otherAnswer = otherBox.querySelector(".faq-answer");
            otherAnswer.classList.remove("opacity-100", "scale-y-100", "max-h-96");
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
          box.style.backgroundColor = "#FFF4EA";
          box.style.border = "2px solid #FFE9D4";
        }
      });
    });
  });
  
  
  
