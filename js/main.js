// Babel Technology Group — Main JavaScript (Aniq-UI Inspired)

document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // ─── Mobile Menu ───
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
            // Toggle icon
            const icon = menuBtn.querySelector('[data-lucide]');
            if (icon) {
                const isOpen = !mobileMenu.classList.contains('hidden');
                icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
                lucide.createIcons();
            }
        });

        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // ─── Navbar Scroll Effect ───
    const nav = document.getElementById('navbar');
    if (nav) {
        function updateNav() {
            if (window.scrollY > 20) {
                nav.style.background = 'rgba(6, 12, 24, 0.95)';
                nav.style.borderBottomColor = 'rgba(105, 155, 207, 0.1)';
            } else {
                nav.style.background = 'rgba(6, 12, 24, 0.6)';
                nav.style.borderBottomColor = 'rgba(105, 155, 207, 0.05)';
            }
        }
        updateNav();
        window.addEventListener('scroll', updateNav, { passive: true });
    }

    // ─── Intersection Observer — Reveal on Scroll ───
    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
        revealObserver.observe(el);
    });

    // ─── Card Spotlight Effect (mouse tracking) ───
    document.querySelectorAll('.glow-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = ((e.clientX - rect.left) / rect.width) * 100;
            var y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });

    // ─── Smooth Scroll for Anchor Links ───
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ─── Counter Animation ───
    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var target = parseInt(el.getAttribute('data-count'), 10);
                if (isNaN(target)) return;
                var duration = 1500;
                var start = performance.now();
                function tick(now) {
                    var elapsed = now - start;
                    var progress = Math.min(elapsed / duration, 1);
                    // ease-out cubic
                    var eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.round(eased * target);
                    if (progress < 1) requestAnimationFrame(tick);
                    else el.textContent = target;
                }
                requestAnimationFrame(tick);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(function (el) {
        counterObserver.observe(el);
    });
});
