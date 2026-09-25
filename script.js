// Highlight nav-link yang sesuai dengan halaman aktif saat ini.
// (Sudah diberi class "active" langsung di tiap file HTML,
// script ini hanya jaga-jaga kalau ada perubahan/duplikasi halaman.)
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkPage = link.getAttribute("href");
    link.classList.toggle("active", linkPage === currentPage);
  });

  // Navigasi antarhalaman sebagai tombol kembali dan selanjutnya.
  const pages = [...document.querySelectorAll(".nav-link")];
  const currentIndex = pages.findIndex((link) =>
    link.classList.contains("active")
  );
  const section = document.querySelector(".content-section");

  if (section && currentIndex !== -1) {
    const controls = document.createElement("div");
    controls.className = "slide-navigation";

    const addNavigationButton = (label, page, className) => {
      if (!page) {
        const disabled = document.createElement("span");
        disabled.className = `slide-button is-disabled ${className}`;
        disabled.setAttribute("aria-disabled", "true");
        disabled.textContent = label;
        controls.append(disabled);
        return;
      }

      const button = document.createElement("a");
      button.className = `slide-button ${className}`;
      button.href = page.getAttribute("href");
      button.textContent = label;
      controls.append(button);
    };

    if (currentIndex > 0) {
      addNavigationButton("← Kembali", pages[currentIndex - 1], "back");
    }
    addNavigationButton("Selanjutnya →", pages[currentIndex + 1], "next");
    section.querySelector(".container, .hero-text")?.append(controls);
  }

  // Jalankan animasi progress keahlian saat bagian tersebut terlihat.
  const skillCards = document.querySelectorAll(".skill-card");
  if (!skillCards.length) return;

  const showSkills = () => {
    skillCards.forEach((card, index) => {
      const level = card.dataset.skill;
      const bar = card.querySelector(".skill-bar i");

      setTimeout(() => {
        card.classList.add("is-visible");
        bar.style.width = `${level}%`;
      }, index * 110);
    });
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showSkills();
    return;
  }

  const skillsSection = document.querySelector(".skills");
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      if (entries[0].isIntersecting) {
        showSkills();
        currentObserver.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(skillsSection);
});
