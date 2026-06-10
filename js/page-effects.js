/* ============================================================
   page-effects.js — comportamentos compartilhados (index + projects)
   - Fade-in nos cards/blocos quando entram em viewport
   - Scroll-spy: chips de empresa (projects) e nav principal (index)
   - Scroll-progress: width % via rAF (fallback p/ Safari sem scroll-timeline)
   - Print: window.print() + garante is-visible em todos antes de imprimir
   ============================================================ */

(function () {
    'use strict';

    const fadeSelector = [
        '.product-card', '.solution-card', '.initiative-card', '.compare-cell',
        '.company-stats', '.company-lead',
        '.job', '.skill-group', '.cred-card', '.project', '.meta'
    ].join(', ');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---------- Fade-in ----------
    const fadeTargets = document.querySelectorAll(fadeSelector);
    fadeTargets.forEach(el => el.classList.add('fade-in'));

    if (prefersReduced || !('IntersectionObserver' in window)) {
        fadeTargets.forEach(el => el.classList.add('is-visible'));
    } else {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        fadeTargets.forEach(el => io.observe(el));
    }

    // ---------- Scroll-spy genérico ----------
    // (links âncora -> seções correspondentes; vale para .company-jump e para a nav do index)
    function spyOn(links) {
        const sectionMap = new Map();
        links.forEach(link => {
            const href = link.getAttribute('href') || '';
            if (href.indexOf('#') < 0) return;
            const id = href.slice(href.indexOf('#') + 1);
            const section = document.getElementById(id);
            if (section) sectionMap.set(section, link);
        });
        if (!('IntersectionObserver' in window) || sectionMap.size === 0) return;
        const all = Array.from(sectionMap.values());
        const spy = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                const link = sectionMap.get(e.target);
                if (!link) return;
                if (e.isIntersecting) {
                    all.forEach(l => l.classList.remove('is-active'));
                    link.classList.add('is-active');
                }
            });
        }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });
        sectionMap.forEach((_link, section) => spy.observe(section));
    }

    spyOn(document.querySelectorAll('.company-jump a[href^="#company-"]'));
    spyOn(document.querySelectorAll('.topbar .nav a[href^="#"]'));

    // ---------- Scroll-progress (fallback p/ browsers sem scroll-timeline) ----------
    const progressBar = document.querySelector('.scroll-progress span');
    const supportsScrollTimeline = window.CSS && CSS.supports && CSS.supports('animation-timeline: scroll()');

    if (progressBar && !supportsScrollTimeline) {
        let ticking = false;
        const update = () => {
            const doc = document.documentElement;
            const scrollTop = window.scrollY;
            const max = doc.scrollHeight - doc.clientHeight;
            const pct = max > 0 ? Math.min(100, Math.max(0, (scrollTop / max) * 100)) : 0;
            progressBar.style.width = pct + '%';
            ticking = false;
        };
        window.addEventListener('scroll', () => {
            if (!ticking) { requestAnimationFrame(update); ticking = true; }
        }, { passive: true });
        update();
    }

    // ---------- Print button ----------
    const printBtn = document.getElementById('print-button');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            // garante que todos os fade-in estejam visíveis antes da captura do print
            document.querySelectorAll('.fade-in').forEach(el => el.classList.add('is-visible'));
            window.print();
        });
    }
    // beforeprint dispara em qualquer Cmd/Ctrl+P também
    window.addEventListener('beforeprint', () => {
        document.querySelectorAll('.fade-in').forEach(el => el.classList.add('is-visible'));
    });
})();
