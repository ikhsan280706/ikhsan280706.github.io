function showSection(sectionId) {
  // Sembunyikan semua section
  document.querySelectorAll('.content-section').forEach(function (section) {
    section.style.display = 'none';
  });

  // Tampilkan section yang dipilih
  document.getElementById(sectionId).style.display = 'block';

  // Hapus class "active" dari semua link navbar
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.classList.remove('active');
  });

  // Tambahkan class "active" ke link yang sedang diklik (kalau ada di menu utama)
  var activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
  if (activeLink) {
    activeLink.classList.add('active');
  }
}