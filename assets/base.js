"use strict";

const toggleDropdown = document.querySelectorAll(".toggle-dropdown");
const overlay = document.querySelector(".overlay"); // may be null on some pages

// Function to hide ALL dropdowns
const hideDropdowns = function () {
  toggleDropdown.forEach(function (menu) {
    const dropdown = menu.querySelector(".dropdown-menu");
    if (!dropdown) return;
    dropdown.classList.add("opacity-0", "pointer-events-none");
  });

  if (overlay) overlay.classList.add("hidden");
};

toggleDropdown.forEach(function (menu) {
  menu.addEventListener("click", function (e) {
    e.stopPropagation(); // prevent document click from immediately closing it

    const dropdown = menu.querySelector(".dropdown-menu");
    if (!dropdown) return;

    // Incase this dropdown is already open before this click
    const wasOpen = !dropdown.classList.contains("opacity-0");

    // Close everything first
    hideDropdowns();

    // If it was closed, open it. If it was open, closed it
    if (!wasOpen) {
      dropdown.classList.remove("opacity-0", "pointer-events-none");
      if (overlay) overlay.classList.remove("hidden");
    }
  });
});

if (overlay) overlay.addEventListener("click", hideDropdowns);

document.addEventListener("click", hideDropdowns);

// Function to hide ALL mobiledropdowns
// const hideMobileDropdowns = function () {
//   toggleMobileDropdown.forEach(function (menu) {
//     const mobileDropdown = menu.querySelector(".mobile-dropdown-menu");

//     mobileDropdown.classList.add("opacity-0");
//     mobileDropdown.classList.add("pointer-events-none");
//     mobileDropdown.classList.add("h-0");
//     mobileDropdown.classList.remove("inline-block");
//   });
// };
// hideMobileDropdowns();

const toggleMobileNav = document.querySelectorAll(".mobile-menu-icon");

const toggleMobileDropdown = document.querySelectorAll(
  ".toggle-mobile-dropdown"
);

// ----- Mobile dropdowns: ensure only one open at a time -----

const closeAllMobileDropdowns = () => {
  toggleMobileDropdown.forEach((menu) => {
    const mobileDropdown = menu.querySelector(".mobile-dropdown-menu");
    if (!mobileDropdown) return;

    // put dropdown into the "closed" state
    mobileDropdown.classList.add("opacity-0", "pointer-events-none", "h-0");
    mobileDropdown.classList.remove("inline-block");

    // accessibility: mark as collapsed if there is a button
    const btn = menu.querySelector("button, [data-mobile-toggle]");
    if (btn) btn.setAttribute("aria-expanded", "false");
  });
};

toggleMobileDropdown.forEach((menu) => {
  menu.addEventListener("click", function (e) {
    e.stopPropagation();

    const mobileDropdown = menu.querySelector(".mobile-dropdown-menu");
    if (!mobileDropdown) return;

    // Check whether this menu was open BEFORE we close everything
    const wasOpen = !mobileDropdown.classList.contains("opacity-0");

    // Close all (this ensures only one can be open)
    closeAllMobileDropdowns();

    // If it was closed, open it. If it was open, we've already closed it above.
    if (!wasOpen) {
      mobileDropdown.classList.remove(
        "opacity-0",
        "pointer-events-none",
        "h-0"
      );
      mobileDropdown.classList.add("inline-block");
      const btn = menu.querySelector("button, [data-mobile-toggle]");
      if (btn) btn.setAttribute("aria-expanded", "true");
    }
  });
});

// Close mobile dropdowns when clicking outside
document.addEventListener("click", closeAllMobileDropdowns);

// CLOSE DROPDOWNS WHEN NAV IS CLOSED
// Also close mobile dropdowns when nav is closed via the hamburger/close icons
toggleMobileNav.forEach((icon) => {
  icon.addEventListener("click", function () {
    const mobileNav = document.querySelector(".toggler");
    if (!mobileNav) return;

    mobileNav.classList.toggle("-translate-x-full");
    mobileNav.classList.toggle("opacity-0");

    // toggle the hamburger/close icons visibility (your original behavior)
    toggleMobileNav.forEach((i) => i.classList.toggle("hidden"));

    // If nav is now closed (has -translate-x-full or opacity-0), ensure dropdowns are closed
    // Adjust the condition if your CSS uses different "closed" classes on the nav
    if (
      mobileNav.classList.contains("-translate-x-full") ||
      mobileNav.classList.contains("opacity-0")
    ) {
      // small delay optional if you want to wait for nav-close animation to finish
      closeAllMobileDropdowns();
    }
  });
});
