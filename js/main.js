(function () {
    'use strict';

    const root = document.documentElement;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* ---------- Tema claro/escuro (com View Transitions quando suportado) ---------- */
    const toggle = document.getElementById('theme-toggle');
    const STORAGE_KEY = 'theme';

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
        root.setAttribute('data-theme', saved);
    }

    function currentTheme() {
        const attr = root.getAttribute('data-theme');
        if (attr) return attr;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setTheme(next) {
        root.setAttribute('data-theme', next);
        localStorage.setItem(STORAGE_KEY, next);
        document.dispatchEvent(new CustomEvent('fr:egg', { detail: { id: 'theme' } }));
    }

    if (toggle) {
        toggle.addEventListener('click', function () {
            const next = currentTheme() === 'dark' ? 'light' : 'dark';

            if (!document.startViewTransition || prefersReduced.matches) {
                setTheme(next);
                return;
            }

            // Reveal circular a partir do centro do botão
            const rect = toggle.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const r = Math.hypot(
                Math.max(x, window.innerWidth - x),
                Math.max(y, window.innerHeight - y)
            );

            root.classList.add('vt-active');
            const transition = document.startViewTransition(function () {
                setTheme(next);
            });
            transition.ready.then(function () {
                document.documentElement.animate(
                    { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + r + 'px at ' + x + 'px ' + y + 'px)'] },
                    { duration: 420, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
                );
            }).catch(function () { /* noop */ });
            transition.finished.finally(function () {
                root.classList.remove('vt-active');
            });
        });
    }

    /* ---------- Menu mobile (hamburger) ---------- */
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('site-nav');

    function t(key, fallback) {
        return (window.__i18n && window.__i18n.t(key)) || fallback;
    }

    if (navToggle && nav) {
        function setMenu(open) {
            nav.classList.toggle('is-open', open);
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            const label = open ? t('a11y.menu_close', 'Fechar menu') : t('a11y.menu_open', 'Abrir menu');
            navToggle.setAttribute('aria-label', label);
            navToggle.setAttribute('title', label);
        }
        navToggle.addEventListener('click', function () {
            setMenu(!nav.classList.contains('is-open'));
        });
        nav.addEventListener('click', function (e) {
            if (e.target.closest('a')) setMenu(false);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                setMenu(false);
                navToggle.focus();
            }
        });
        document.addEventListener('click', function (e) {
            if (!nav.classList.contains('is-open')) return;
            if (!e.target.closest('.topbar')) setMenu(false);
        });
    }

    /* ---------- Email ofuscado (anti-scraping) ---------- */
    const user = 'filiperp';
    const domain = 'gmail.com';
    const email = user + '@' + domain;

    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        emailLink.setAttribute('href', 'mailto:' + email);
        emailLink.setAttribute('title', email);
    }
    const emailCta = document.getElementById('email-cta');
    if (emailCta) {
        emailCta.setAttribute('href', 'mailto:' + email);
        emailCta.textContent = 'Enviar email → ' + email;
    }
    const footerEmailCta = document.getElementById('footer-email-cta');
    if (footerEmailCta) {
        footerEmailCta.setAttribute('href', 'mailto:' + email);
    }

    /* ---------- Ano + hora local no footer ---------- */
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    const localTime = document.getElementById('local-time');
    if (localTime) {
        function renderTime() {
            try {
                const fmt = new Intl.DateTimeFormat('pt-BR', {
                    hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo'
                });
                localTime.textContent = fmt.format(new Date()) + ' UTC−3';
            } catch (e) { /* mantém o fallback estático */ }
        }
        renderTime();
        setInterval(renderTime, 30000);
    }

    /* ---------- Linha de status com métricas reais (Performance API) ---------- */
    const status = document.getElementById('footer-status');
    if (status) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                try {
                    const nav2 = performance.getEntriesByType('navigation')[0];
                    if (!nav2) return;
                    const render = Math.max(0, Math.round(nav2.domContentLoadedEventEnd - nav2.startTime));
                    let bytes = nav2.transferSize || 0;
                    performance.getEntriesByType('resource').forEach(function (r) {
                        bytes += r.transferSize || 0;
                    });
                    const kb = Math.round(bytes / 1024);
                    const uptime = new Date().getFullYear() - 2004;
                    status.textContent = 'ingest ok · render ' + render + 'ms' +
                        (kb > 0 ? ' · transfer ' + kb + ' kB' : '') +
                        ' · uptime ' + uptime + 'y';
                } catch (e) { /* noop */ }
            }, 0);
        });
    }

    /* ---------- Versão (preenchida pelo pre-commit hook) ---------- */
    const ver = document.getElementById('app-version');
    if (ver && window.__APP_VERSION) ver.textContent = window.__APP_VERSION;

    /* ---------- Spotlight do grid de fundo (só ponteiro fino) ---------- */
    if (window.matchMedia('(pointer: fine)').matches && !prefersReduced.matches) {
        let raf = null;
        document.addEventListener('pointermove', function (e) {
            if (raf) return;
            raf = requestAnimationFrame(function () {
                root.style.setProperty('--mx', e.clientX + 'px');
                root.style.setProperty('--my', e.clientY + 'px');
                raf = null;
            });
        }, { passive: true });
        document.addEventListener('pointerleave', function () {
            root.style.setProperty('--mx', '-999px');
            root.style.setProperty('--my', '-999px');
        });
    }

    /* ---------- Count-up das stats do hero ---------- */
    const nums = document.querySelectorAll('.stat-num[data-count]');
    if (nums.length && 'IntersectionObserver' in window && !prefersReduced.matches) {
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                io.unobserve(entry.target);
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'), 10);
                if (!isFinite(target)) return;
                // trava a largura final para não deslocar o layout durante a contagem
                el.style.display = 'inline-block';
                el.style.minWidth = el.getBoundingClientRect().width + 'px';
                const dur = 900;
                const startAt = performance.now();
                function frame(now) {
                    const p = Math.min(1, (now - startAt) / dur);
                    const eased = 1 - Math.pow(2, -10 * p);
                    el.textContent = Math.round(target * eased);
                    if (p < 1) requestAnimationFrame(frame);
                    else el.textContent = target;
                }
                requestAnimationFrame(frame);
            });
        }, { threshold: 0.6 });
        nums.forEach(function (el) { io.observe(el); });
    }
})();
