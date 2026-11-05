// Minimal motion: a restrained hero entrance and subtle scroll reveals.
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  menuButton?.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  }));

  // Keep the site fully usable if GSAP/CDN is unavailable.
  if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.registerPlugin(ScrollTrigger);

  const heroItems = gsap.utils.toArray(".hero .reveal");
  gsap.fromTo(heroItems,
    { y: 18, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power2.out", clearProps: "all" }
  );

  gsap.utils.toArray("main section:not(.hero) .reveal").forEach((element) => {
    gsap.fromTo(element,
      { y: 18, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.65, ease: "power2.out",
        scrollTrigger: { trigger: element, start: "top 88%", once: true },
        clearProps: "all"
      }
    );
  });
});
