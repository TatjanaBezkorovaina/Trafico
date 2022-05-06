// Animations scroll

const animItems = document.querySelectorAll("._anim-items");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll(params) {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (scrollY > animItemOffset - animItemPoint && scrollY < animItemOffset + animItemHeight) {
        animItem.classList.add("_active");
      } else {
        if (!animItem.classList.contains("_anim-no-hide")) {
          animItem.classList.remove("_active");
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  setTimeout(() => {
    animOnScroll();
  }, 300);
}

// Accordion

let accordions;
const accordionWrapper = document.querySelector(".c-accordion__wrapper");

const contentData = [
  {
    id: 1,
    title: "What is a professional traffic permit?",
    content: "Traffic permits are a requirement for conducting professional traffic.",
  },
  {
    id: 2,
    title: "How to check the traffic condition?",
    content: "Traffic permits are a requirement for conducting professional traffic.",
  },
  {
    id: 3,
    title: "What are the requirements for a professional traffic permit?",
    content: "Traffic permits are a requirement for conducting professional traffic.",
  },
  {
    id: 4,
    title: "Are there professional traffic permit training courses at a distance?",
    content: "Traffic permits are a requirement for conducting professional traffic.",
  },
  {
    id: 5,
    title: "When is a professional traffic permit needed?",
    content: "Traffic permits are a requirement for conducting professional traffic.",
  },
  {
    id: 6,
    title: "How much does a commercial traffic permit cost for goods?",
    content: "Traffic permits are a requirement for conducting professional traffic.",
  },
  {
    id: 7,
    title: "How to plug in for the traffic permit test?",
    content: "Traffic permits are a requirement for conducting professional traffic.",
  },
  {
    id: 8,
    title: "How is the sample for a professional traffic permit booked?",
    content: "Traffic permits are a requirement for conducting professional traffic.",
  },
];

const createTemplate = (item) => {
  return `
    <div class="c-accordion__item">
      <div class="c-accordion__item-title">${item.title}</div>
      <div class="c-accordion__item-content">${item.content}</div>
    </div>
  `;
};

const fillHtmlList = () => {
  contentData.forEach((item) => {
    accordionWrapper.innerHTML += createTemplate(item);
  });
  accordions = document.querySelectorAll(".c-accordion__item");
};

fillHtmlList();

if (accordions) {
  for (item of accordions) {
    item.addEventListener("click", function () {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
      } else {
        for (el of accordions) {
          el.classList.remove("active");
        }
        this.classList.add("active");
      }
    });
  }
}

// Swiper
const swiper = new Swiper(".swiper", {
  // Optional parameters
  slidesPerView: 2.5,
  spaceBetween: 20,
  centeredSlides: false,
  simulateTouch: true,
  loop: true,
});

const swiperPrevBtn = document.getElementById("js-swiper-prev");
const swiperNextBtn = document.getElementById("js-swiper-next");

swiperPrevBtn.addEventListener("click", () => {
  swiper.slidePrev();
});

swiperNextBtn.addEventListener("click", () => {
  swiper.slideNext();
});

// Initialize and add the google map
function initMap() {
  // The location of Uluru
  const uluru = { lat: 47.617138, lng: -122.335637 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

// Form`s validation

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          alert("The email address was entered incorrectly");
        }
      } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input);
        error++;
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
  }
  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }
  // Checking mail
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});

// Menu burger

const toggleButton = document.querySelector(".toggle-menu");
const navBar = document.querySelector(".nav-bar");
const navList = document.querySelector(".nav-list");
toggleButton.addEventListener("click", function () {
  navBar.classList.toggle("toggle");
});
navList.addEventListener("click", function () {
  navBar.classList.remove("toggle");
});

// send form

const MODAL_ACTIVE_CLASS = "modal-active";

const callModal = document.querySelector("#modal-form-submit");

const modalForm = document.querySelector("#modal-form");
const modalSuccess = document.querySelector("#modal-success");

const form = document.querySelector("#modal-form form");

function closeModals(e) {
  e.preventDefault();

  modalForm.classList.remove(MODAL_ACTIVE_CLASS);
  modalSuccess.classList.remove(MODAL_ACTIVE_CLASS);

  document.body.classList.remove("body-fixed");
}

function openSuccessModal() {
  modalForm.classList.remove(MODAL_ACTIVE_CLASS);
  modalSuccess.classList.add(MODAL_ACTIVE_CLASS);

  document.body.classList.add("body-fixed");

  const modalFormClose = document.querySelector("#modal-success-close");
  modalFormClose.addEventListener("click", closeModals);
}

function sendUserInfo(e) {
  e.preventDefault();
  const formData = new FormData(form);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  }).then(openSuccessModal);
}

callModal.addEventListener("click", function () {
  // modalForm.classList.add(MODAL_ACTIVE_CLASS);

  // const modalFormClose = document.querySelector("#modal-form-close");
  // modalFormClose.addEventListener("click", closeModals);

  document.body.classList.add("body-fixed");

  form.addEventListener("submit", sendUserInfo);
  // document.getElementById("form").reset();
});
