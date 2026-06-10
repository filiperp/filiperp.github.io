/* ============================================================
   achievements.js — conquistas dos easter eggs
   - Escuta CustomEvent 'fr:egg' {detail:{id}} disparado pelos eggs
   - Persiste em localStorage 'fr_achievements'
   - Painel via ⌘K ('Conquistas') ou window.__achievements.open()
   - Confete em canvas quando fecha 100%
   ============================================================ */

(function () {
    'use strict';

    const STORAGE_KEY = 'fr_achievements';
    const root = document.getElementById('achievements-root');
    if (!root) return;

    function t(key) {
        return (window.__i18n && window.__i18n.t(key)) || key;
    }

    const ACHIEVEMENTS = [
        { id: 'cmdk',    icon: '⌨️' },
        { id: 'theme',   icon: '🌓' },
        { id: 'lang',    icon: '🌐' },
        { id: 'konami',  icon: '🌧️' },
        { id: 'avatar',  icon: '📸' },
        { id: 'tts',     icon: '🔊' },
        { id: 'offduty', icon: '🎨' },
        { id: 'color',   icon: '🌈' },
        { id: 'f1',      icon: '🏎️' },
        { id: 'flappy',  icon: '🐦' },
        { id: 'worms',   icon: '💥' },
        { id: 'sql',     icon: '🗄️' }
    ];

    let unlocked = new Set();
    try {
        const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        if (Array.isArray(raw)) unlocked = new Set(raw);
    } catch (e) { /* noop */ }

    function save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(unlocked)));
    }

    /* ---------- toast próprio (mesmas classes CSS do site) ---------- */
    function toast(message, ms) {
        ms = ms || 4000;
        const el = document.createElement('div');
        el.className = 'toast';
        el.setAttribute('role', 'status');
        el.textContent = message;
        document.body.appendChild(el);
        requestAnimationFrame(function () { el.classList.add('toast--in'); });
        setTimeout(function () {
            el.classList.remove('toast--in');
            setTimeout(function () { el.remove(); }, 300);
        }, ms);
    }

    /* ---------- confete ---------- */
    function hexToRgb(hex) {
        const h = hex.replace('#', '');
        return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }
    function shade(hex, f) {
        const rgb = hexToRgb(hex);
        return 'rgb(' + rgb.map(function (c) {
            return Math.max(0, Math.min(255, Math.round(f > 0 ? c + (255 - c) * f : c * (1 + f))));
        }).join(',') + ')';
    }
    function confetti() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const canvas = document.createElement('canvas');
        canvas.className = 'confetti-canvas';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const W = window.innerWidth, H = window.innerHeight;
        canvas.width = W * dpr; canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        let accent = '#fb923c';
        try {
            accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || accent;
        } catch (e) { /* noop */ }
        const colors = [accent, shade(accent, 0.35), shade(accent, -0.3), '#ffffff'];

        const pieces = [];
        for (let i = 0; i < 160; i++) {
            pieces.push({
                x: Math.random() * W,
                y: -20 - Math.random() * H * 0.4,
                w: 5 + Math.random() * 6,
                h: 8 + Math.random() * 8,
                vy: 2.2 + Math.random() * 3,
                vx: -1.2 + Math.random() * 2.4,
                rot: Math.random() * Math.PI,
                vr: -0.12 + Math.random() * 0.24,
                color: colors[i % colors.length]
            });
        }
        const startAt = performance.now();
        function frame(now) {
            const elapsed = now - startAt;
            ctx.clearRect(0, 0, W, H);
            pieces.forEach(function (p) {
                p.x += p.vx; p.y += p.vy; p.rot += p.vr;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });
            if (elapsed < 2800) requestAnimationFrame(frame);
            else canvas.remove();
        }
        requestAnimationFrame(frame);
    }

    /* ---------- unlock ---------- */
    function unlock(id) {
        if (unlocked.has(id)) return;
        if (!ACHIEVEMENTS.some(function (a) { return a.id === id; })) return;
        unlocked.add(id);
        save();
        const name = t('ach.' + id + '.name');
        toast('🏆 ' + name + ' — ' + unlocked.size + '/' + ACHIEVEMENTS.length);
        if (unlocked.size === ACHIEVEMENTS.length) {
            setTimeout(function () {
                toast(t('ach.all_done'), 6000);
                confetti();
            }, 800);
        }
        if (root.classList.contains('is-open')) render();
    }

    document.addEventListener('fr:egg', function (e) {
        if (e.detail && e.detail.id) unlock(e.detail.id);
    });

    /* ---------- gatilhos que não dependem de hooks externos ---------- */
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.addEventListener('click', function () { unlock('lang'); });

    // jogos: envelopa window.__games.* sem tocar no código dos jogos
    document.addEventListener('DOMContentLoaded', function () {
        if (!window.__games) return;
        ['f1', 'flappy', 'worms'].forEach(function (key) {
            const original = window.__games[key];
            if (typeof original !== 'function') return;
            window.__games[key] = function () {
                unlock(key);
                return original.apply(this, arguments);
            };
        });
    });

    /* ---------- painel ---------- */
    let prevFocus = null;

    function render() {
        const total = ACHIEVEMENTS.length;
        const n = unlocked.size;
        const pct = Math.round((n / total) * 100);
        const cards = ACHIEVEMENTS.map(function (a) {
            const has = unlocked.has(a.id);
            const name = has ? t('ach.' + a.id + '.name') : '???';
            const desc = has ? t('ach.' + a.id + '.desc') : t('ach.locked');
            return '<div class="ach-card ' + (has ? 'is-unlocked' : 'is-locked') + '">' +
                       '<span class="ach-icon" aria-hidden="true">' + a.icon + '</span>' +
                       '<div><strong>' + name + '</strong><small>' + desc + '</small></div>' +
                   '</div>';
        }).join('');

        root.innerHTML =
            '<div class="ach-backdrop" data-close></div>' +
            '<div class="ach-modal" role="dialog" aria-modal="true" aria-labelledby="ach-title">' +
                '<h2 id="ach-title">' + t('ach.title') + '</h2>' +
                '<p class="ach-sub">' + t('ach.subtitle') + ' · ' + n + '/' + total + '</p>' +
                '<div class="ach-progress" aria-hidden="true"><span style="width:' + pct + '%"></span></div>' +
                '<div class="ach-grid">' + cards + '</div>' +
                '<div class="ach-actions"><button class="btn btn-ghost" data-close>' + t('ach.close') + '</button></div>' +
            '</div>';
    }

    function open() {
        prevFocus = document.activeElement;
        render();
        root.classList.add('is-open');
        root.setAttribute('aria-hidden', 'false');
        const btn = root.querySelector('.ach-actions button');
        if (btn) btn.focus();
    }
    function close() {
        root.classList.remove('is-open');
        root.setAttribute('aria-hidden', 'true');
        root.innerHTML = '';
        if (prevFocus && prevFocus.focus) prevFocus.focus();
    }

    root.addEventListener('click', function (e) {
        if (e.target.closest('[data-close]')) close();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && root.classList.contains('is-open')) close();
    });
    document.addEventListener('langchange', function () {
        if (root.classList.contains('is-open')) render();
    });

    window.__achievements = {
        open: open,
        close: close,
        unlock: unlock,
        count: function () { return unlocked.size; },
        total: function () { return ACHIEVEMENTS.length; }
    };
})();
