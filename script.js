// Highlight nav-link yang sesuai dengan halaman aktif saat ini.
// (Sudah diberi class "active" langsung di tiap file HTML,
// script ini hanya jaga-jaga kalau ada perubahan/duplikasi halaman.)
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkPage = link.getAttribute("href");
    link.classList.toggle("active", linkPage === currentPage);
  });
});