(function () {
    'use strict';

    /* ---------- Tema claro/escuro ---------- */
    const root = document.documentElement;
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

    if (toggle) {
        toggle.addEventListener('click', function () {
            const next = currentTheme() === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            localStorage.setItem(STORAGE_KEY, next);
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

    /* ---------- Ano no footer ---------- */
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();
