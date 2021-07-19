"use strict";

const headerNav = document.querySelector(".header__nav");
const headerToggle = document.querySelector(".header__toggle");

headerNav.classList.remove("header__nav--nojs");

headerToggle.addEventListener("click", function () {
  if (headerNav.classList.contains("header__nav--closed")) {
    headerNav.classList.remove("header__nav--closed");
    headerNav.classList.add("header__nav--opened");
  } else {
    headerNav.classList.add("header__nav--closed");
    headerNav.classList.remove("header__nav--opened");
  }
})
