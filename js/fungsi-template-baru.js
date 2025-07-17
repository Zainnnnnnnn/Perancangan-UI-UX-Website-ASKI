// FUNGSI TOMBOL FULLSCREEN
  document.addEventListener('DOMContentLoaded', function () {
    const fullscreenBtn = document.querySelector('[data-widget="fullscreen"]');
    const fullscreenIcon = fullscreenBtn?.querySelector('i');

    function setIcon(isFullscreen) {
      if (fullscreenIcon) {
        if (isFullscreen) {
          fullscreenIcon.classList.remove('fa-up-right-and-down-left-from-center');
          fullscreenIcon.classList.add('fa-down-left-and-up-right-to-center');
        } else {
          fullscreenIcon.classList.remove('fa-down-left-and-up-right-to-center');
          fullscreenIcon.classList.add('fa-up-right-and-down-left-from-center');
        }
      }
    }

    fullscreenBtn?.addEventListener('click', function (e) {
      e.preventDefault();

      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
          setIcon(true);
        }).catch((err) => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
        setIcon(false);
      }
    });

    // Listen for fullscreen change (user presses ESC or F11)
    document.addEventListener('fullscreenchange', function () {
      setIcon(!!document.fullscreenElement);
    });
  });
// FUNGSI TOMBOL FULLSCREEN

// FUNGSI FLOATING SUBMENU
                  document.addEventListener('DOMContentLoaded', () => {
                    const navItems = document.querySelectorAll('#sidenav-main.sidenav-collapsed .nav-item');

                    navItems.forEach(item => {
                      item.addEventListener('mouseenter', () => {
                        const submenu = item.querySelector('.floating-submenu');
                        if (!submenu) return;

                        const cloned = submenu.cloneNode(true);
                        cloned.classList.add('floating-clone');
                        cloned.style.position = 'absolute';
                        cloned.style.top = `${item.getBoundingClientRect().top}px`;
                        cloned.style.left = `${item.getBoundingClientRect().right}px`;
                        cloned.style.zIndex = '9999';
                        cloned.style.minWidth = '250px';
                        cloned.style.background = '#fff';
                        cloned.style.boxShadow = ' rgba(0,0,0,0.15)';
                        cloned.style.borderRadius = '0.5rem';

                        const container = document.getElementById('floating-submenus-container');
                        container.innerHTML = ''; // clear any old
                        container.appendChild(cloned);
                      });

                      item.addEventListener('mouseleave', () => {
                        const container = document.getElementById('floating-submenus-container');
                        container.innerHTML = '';
                      });
                    });
                  });
// FUNGSI FLOATING SUBMENU

// FUNGSI DISPLAY WAKTU
              function updateDateTime() {
                const now = new Date();

                const options = {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                };

                const formattedDate = now.toLocaleDateString('id-ID', options);
                const display = document.getElementById('datetime-display');
                display.textContent = formattedDate + " WIB";

                // Ambil warna teks dari main-content
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                  const computedStyle = window.getComputedStyle(mainContent);
                  const textColor = computedStyle.color;
                  display.style.color = textColor;
                }
              }

              setInterval(updateDateTime, 1000);
              updateDateTime();
// FUNGSI DISPLAY WAKTU

// SIDENAV COLLAPSED
                      document.addEventListener("DOMContentLoaded", () => {
                        const hamburgerToggle = document.getElementById("hamburgerToggle");
                        const sidenav = document.getElementById("sidenav-main");
                        const mainContent = document.querySelector(".main-content");
                        const submenuTitles = document.querySelectorAll(".floatingSubmenuTitle");
                        const categoryLines = document.querySelectorAll(".category-line");

                        const toggleClasses = [
                          { selector: ".nav-link-text", className: "hidden-text" },
                          { selector: ".sidenav-header", className: "hidden-sidenav-header" },
                          { selector: ".sidenav-category", className: "hidden-sidenav-category" },
                          { selector: ".sidenav-submenu", className: "hidden-sidenav-submenu" },
                          { selector: ".navbar-brand-img", className: "navbar-brand-img-collapsed" },
                          { selector: ".nav-link", className: "nav-link-collapsed" },
                          { selector: ".sidenav-icon", className: "sidenav-icon-collapsed" },
                          { selector: ".material-symbols-rounded", className: "material-symbols-rounded-collapsed" },
                        ];

                          const toggleFloatingArrows = (isCollapsed) => {
                            document.querySelectorAll('.floating-submenu .floating-arrow').forEach(el => {
                              el.classList.toggle('d-none', !isCollapsed);
                            });
                          };

                        // ✅ Jalankan toggleClass agar layout langsung sesuai (collapsed) saat page load
                        if (sidenav.classList.contains("sidenav-collapsed")) {
                          mainContent?.classList.add("main-content-collapsed");

                          toggleClasses.forEach(({ selector, className }) => {
                            document.querySelectorAll(selector).forEach(el => el.classList.add(className));
                          });

                          submenuTitles.forEach(title => {
                            title.classList.remove("d-none");
                          });

                          categoryLines.forEach(line => {
                            line.classList.remove("d-none");
                          });

                          toggleFloatingArrows(true);
                        }
                        

                        // 🔄 Toggle saat tombol diklik
                        hamburgerToggle?.addEventListener("click", () => {
                          sidenav.classList.toggle("sidenav-collapsed");
                          mainContent?.classList.toggle("main-content-collapsed");

                          toggleClasses.forEach(({ selector, className }) => {
                            document.querySelectorAll(selector).forEach(el => el.classList.toggle(className));
                          });

                          const isCollapsed = sidenav.classList.contains("sidenav-collapsed");

                          submenuTitles.forEach(title => {
                            title.classList.toggle("d-none", !isCollapsed);
                          });

                          categoryLines.forEach(line => {
                            line.classList.toggle("d-none", !isCollapsed);
                          });

                          toggleFloatingArrows(isCollapsed);
                        });
                      });
// SIDENAV COLLAPSED

//FLOATING SUBMENU KLIK STAY
                  document.addEventListener('DOMContentLoaded', function () {
                    const sidenav = document.getElementById('sidenav-main');

                    function initFloatingSubmenuClickHandler() {
                      const navItems = document.querySelectorAll('#sidenav-main .nav-item');

                      navItems.forEach(function (item) {
                        const link = item.querySelector('.nav-link');

                        if (link) {
                          link.addEventListener('click', function (e) {
                            // Jalankan logika ini HANYA jika collapsed
                            if (!sidenav.classList.contains('sidenav-collapsed')) return;

                            // Cegah Bootstrap collapse bekerja
                            e.preventDefault();

                            // Cegah bubbling kalau klik submenu
                            if (e.target.closest('.floating-submenu')) return;

                            // Toggle submenu
                            const alreadyOpen = item.classList.contains('submenu-open');

                            // Tutup semua
                            document.querySelectorAll('#sidenav-main .nav-item').forEach(i => i.classList.remove('submenu-open'));

                            // Kalau belum terbuka, buka yang ini
                            if (!alreadyOpen) item.classList.add('submenu-open');
                          });
                        }
                      });

                      // Klik di luar sidenav = tutup semua submenu
                      document.addEventListener('click', function (e) {
                        const isInside = e.target.closest('#sidenav-main');
                        if (!isInside) {
                          document.querySelectorAll('#sidenav-main .nav-item').forEach(item => item.classList.remove('submenu-open'));
                        }
                      });
                    }

                    initFloatingSubmenuClickHandler();
                  });
// FLOATING SUBMENU KLIK STAY


//SKRIP UNTUK MENGATASI ERROR LINK FLOATING SUBMENU KETIKA DI KLIK
                  document.addEventListener("DOMContentLoaded", function () {
                    const sidenav = document.getElementById("sidenav-main");

                    document.querySelectorAll('.floating-submenu a.nav-link[href]').forEach(link => {
                      link.addEventListener('click', function (e) {
                        // ✅ Cek apakah sidenav dalam keadaan collapsed
                        if (!sidenav.classList.contains("sidenav-collapsed")) {
                          return; // ⛔ Keluar dari fungsi, biarkan default browser yang handle
                        }

                        const href = this.getAttribute('href');
                        console.log('Link diklik (collapsed mode):', href);

                        e.preventDefault();
                        e.stopPropagation();

                        setTimeout(() => {
                          console.log('Redirect ke:', href);
                          window.location.href = href;
                        }, 100);
                      });
                    });
                  });
//SKRIP UNTUK MENGATASI ERROR LINK FLOATING SUBMENU KETIKA DI KLIK




// DARK MODE TOGGLE
function toggleDarkMode() {
  const body = document.body;
  const icon = document.getElementById("themeSwitch").querySelector("i");
  const sidenav = document.querySelector('.sidenav');
  const sidenavClasses = ["bg-white", "bg-default", "bg-gradient-primary", "bg-gradient-dark"];

  const isDarkMode = !body.classList.contains("dark-version");

  // Toggle dark-version pada body
  body.classList.toggle("dark-version", isDarkMode);

  // Ganti icon
  icon.classList.toggle("fa-moon", !isDarkMode);
  icon.classList.toggle("fa-sun", isDarkMode);

  // Ganti background sidenav
  if (sidenav) {
    // Hapus semua kelas background terkait
    sidenav.classList.remove(...sidenavClasses);

    // Tambahkan bg-gradient-dark jika darkMode, selain itu bg-white (default)
    sidenav.classList.add(isDarkMode ? "bg-gradient-dark" : "bg-white");
  }

  // Simpan preferensi
  localStorage.setItem("darkMode", isDarkMode);
}

// Apply saat load awal
document.addEventListener("DOMContentLoaded", function () {
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  const icon = document.getElementById("themeSwitch")?.querySelector("i");
  const sidenav = document.querySelector('.sidenav');
  const sidenavClasses = ["bg-white", "bg-default", "bg-gradient-primary", "bg-gradient-dark"];

  if (savedDarkMode) {
    document.body.classList.add("dark-version");
    if (icon) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }

    if (sidenav) {
      sidenav.classList.remove(...sidenavClasses);
      sidenav.classList.add("bg-gradient-dark");
    }
  }
});
// DARK MODE TOGGLE
