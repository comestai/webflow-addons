// based on
// https://www.flowrite.com/blog/dynamic-table-of-contents-on-webflow-cms

(function () {
  "use strict";

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting) {
          document.querySelectorAll(".active").forEach((z) => {
            z.classList.remove("active");
          });
          document.querySelector(`a[href="#${id}"]`).classList.add("active");
        }
      });
    },
    { rootMargin: "0px 0px -75% 0px" }
  );
  // CREATE TOC
  const toc = document.createElement("a");
  toc.classList.add('toc-wrapper')
  document.querySelector(".sticky-wrapper").prepend(toc);

  document
    .querySelector(".blog-content")
    .querySelectorAll("h1, h2, h3, h4, h5, h6")
    .forEach(function (heading, i) {
      // runs a function for all h2 elements inside your rich text element
      heading.setAttribute("id", "toc-" + i); // gives each h2 a unique id
      observer.observe(heading);
      let str = heading.innerHTML; // adds section titles to slugs
      str = str
        .replace(/\s+/g, "-")
        .replace(/[°&\/\\#,+()$~%.'":;*?<>{}]/g, "")
        .toLowerCase(); // replaces spaces with hyphens, removes special characters and extra spaces from the headings, and applies lowercase in slugs
      heading.setAttribute("id", str); // gives each heading a unique id
      const item = document.createElement("a"); // creates an anchor element called "item" for each h2
      item.style.display = "block";
      item.innerHTML = heading.innerHTML; // gives each item the text of the corresponding heading
      item.setAttribute("class", "tocitem"); // gives each item the correct class
      item.setAttribute("href", "#" + str); // gives each item the correct anchor link
      toc.appendChild(item); // places each item inside the Table of Contents div
    });
  // highlight stuff
  document.appendElement(styleTag);
})();
