// Highlight nav-link yang sesuai dengan halaman aktif saat ini.
// (Sudah diberi class "active" langsung di tiap file HTML,
// script ini hanya jaga-jaga kalau ada perubahan/duplikasi halaman.)
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkPage = link.getAttribute("href");
    link.classList.toggle("active", linkPage === currentPage);
  });

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
