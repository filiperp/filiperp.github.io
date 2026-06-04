(function () {
    'use strict';

    function t(key) {
        return (window.__i18n && window.__i18n.t(key)) || key;
    }

    /* ============================================================
       Shared: toast
       ============================================================ */
    function showToast(message, ms) {
        ms = ms || 3500;
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

    /* ============================================================
       1. Console greeting
       ============================================================ */
    function consoleGreeting() {
        const banner = [
            '',
            '  ███████╗██████╗ ',
            '  ██╔════╝██╔══██╗',
            '  █████╗  ██████╔╝',
            '  ██╔══╝  ██╔══██╗',
            '  ██║     ██║  ██║',
            '  ╚═╝     ╚═╝  ╚═╝',
            ''
        ].join('\n');

        try {
            console.log('%c' + banner, 'color:#1a73e8; font-family:monospace; font-weight:700; line-height:1.1');
            console.log('%c' + t('console.greeting'), 'font-size:13px; color:#5f6368');
            console.log('%c' + t('console.hint'), 'font-size:12px; color:#8a8f98; font-style:italic');
        } catch (e) { /* noop */ }
    }

    /* ============================================================
       2. Konami code → data rain
       ============================================================ */
    const KONAMI = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let konamiBuf = [];
    let rainActive = false;

    function onKonami(e) {
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        konamiBuf.push(key);
        if (konamiBuf.length > KONAMI.length) konamiBuf.shift();
        if (konamiBuf.length === KONAMI.length && konamiBuf.every(function (k, i) { return k === KONAMI[i]; })) {
            konamiBuf = [];
            startDataRain();
        }
    }

    function startDataRain() {
        if (rainActive) return;
        rainActive = true;

        const words = ['SELECT', 'JOIN', 'WHERE', 'GROUP BY', 'INSERT', 'UPDATE',
                       'df.fit()', 'model.predict', 'pandas', 'numpy', 'scikit',
                       'S3://', 'GCS://', 'airflow', 'dag', 'dbt run', 'spark',
                       'KAFKA', 'PARQUET', 'DELTA', 'snowflake', 'redshift',
                       'BigQuery', '40 TB/day', 'ETL', 'OLAP', 'pipeline',
                       'ML', 'AI', 'CI/CD', 'docker', 'k8s'];

        const overlay = document.createElement('div');
        overlay.className = 'matrix-overlay';
        const canvas = document.createElement('canvas');
        overlay.appendChild(canvas);
        document.body.appendChild(overlay);
        requestAnimationFrame(function () { overlay.classList.add('matrix-overlay--in'); });

        const ctx = canvas.getContext('2d');
        let W = canvas.width = window.innerWidth;
        let H = canvas.height = window.innerHeight;

        const fontSize = 16;
        const colWidth = 110;
        const cols = Math.ceil(W / colWidth);
        const drops = new Array(cols).fill(0).map(function () {
            return {
                y: Math.random() * H / fontSize,
                word: words[Math.floor(Math.random() * words.length)],
                speed: 0.4 + Math.random() * 0.8
            };
        });

        function resize() {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);

        let rafId;
        function draw() {
            ctx.fillStyle = 'rgba(15, 17, 21, 0.10)';
            ctx.fillRect(0, 0, W, H);
            ctx.font = '600 ' + fontSize + 'px ui-monospace, Menlo, monospace';
            for (let i = 0; i < drops.length; i++) {
                const d = drops[i];
                const y = d.y * fontSize;
                ctx.fillStyle = i % 7 === 0 ? '#aecbfa' : '#1a73e8';
                ctx.fillText(d.word, i * colWidth + 8, y);
                d.y += d.speed;
                if (y > H && Math.random() > 0.975) {
                    d.y = 0;
                    d.word = words[Math.floor(Math.random() * words.length)];
                }
            }
            rafId = requestAnimationFrame(draw);
        }
        draw();
        showToast(t('toast.konami'));

        function stop() {
            cancelAnimationFrame(rafId);
            window.removeEventListener('resize', resize);
            document.removeEventListener('keydown', escStop);
            overlay.classList.remove('matrix-overlay--in');
            setTimeout(function () {
                overlay.remove();
                rainActive = false;
            }, 400);
        }
        function escStop(e) { if (e.key === 'Escape') stop(); }
        document.addEventListener('keydown', escStop);
        setTimeout(stop, 6500);
    }

    /* ============================================================
       3. Avatar clicks → spin
       ============================================================ */
    function avatarEgg() {
        const avatar = document.querySelector('.avatar');
        if (!avatar) return;
        let count = 0;
        let resetT;
        avatar.style.cursor = 'pointer';
        avatar.addEventListener('click', function () {
            count++;
            clearTimeout(resetT);
            resetT = setTimeout(function () { count = 0; }, 2000);
            if (count >= 7) {
                count = 0;
                avatar.classList.remove('spin');
                void avatar.offsetWidth; // restart animation
                avatar.classList.add('spin');
                showToast(t('toast.photo'));
                setTimeout(function () { avatar.classList.remove('spin'); }, 1200);
            }
        });
    }

    /* ============================================================
       4. Command palette
       ============================================================ */
    const EMAIL = 'filiperp' + '@' + 'gmail.com';

    function buildCommands() {
        return [
            { section: 'cmdk.section.nav', label: 'cmdk.go.about', run: function () { location.hash = '#about'; } },
            { section: 'cmdk.section.nav', label: 'cmdk.go.experience', run: function () { location.hash = '#experience'; } },
            { section: 'cmdk.section.nav', label: 'cmdk.go.skills', run: function () { location.hash = '#skills'; } },
            { section: 'cmdk.section.nav', label: 'cmdk.go.projects', run: function () { location.hash = '#projects'; } },
            { section: 'cmdk.section.nav', label: 'cmdk.go.contact', run: function () { location.hash = '#contact'; } },
            { section: 'cmdk.section.actions', label: 'cmdk.toggle.theme', run: function () { document.getElementById('theme-toggle').click(); } },
            { section: 'cmdk.section.actions', label: 'cmdk.toggle.lang', run: function () { if (window.__i18n) window.__i18n.toggle(); } },
            { section: 'cmdk.section.actions', label: 'cmdk.download.cv', run: function () { window.location.href = 'assets/filipe_rodrigues.pdf'; } },
            { section: 'cmdk.section.actions', label: 'cmdk.copy.email', run: function () {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(EMAIL).then(function () {
                        showToast(t('toast.email_copied'));
                    });
                } else {
                    const ta = document.createElement('textarea');
                    ta.value = EMAIL;
                    document.body.appendChild(ta);
                    ta.select();
                    try { document.execCommand('copy'); showToast(t('toast.email_copied')); } catch (e) {}
                    ta.remove();
                }
            }},
            { section: 'cmdk.section.external', label: 'cmdk.open.linkedin', run: function () { window.open('https://www.linkedin.com/in/filiperp', '_blank', 'noopener'); } },
            { section: 'cmdk.section.external', label: 'cmdk.open.github', run: function () { window.open('https://github.com/filiperp', '_blank', 'noopener'); } },
            { section: 'cmdk.section.external', label: 'cmdk.open.mdb', run: function () { window.open('https://midiadados.gm.org.br/', '_blank', 'noopener'); } }
        ];
    }

    function initCmdk() {
        const root = document.getElementById('cmdk-root');
        if (!root) return;

        root.innerHTML =
            '<div class="cmdk-backdrop" data-cmdk-close></div>' +
            '<div class="cmdk-panel" role="dialog" aria-modal="true" aria-label="Command palette">' +
              '<div class="cmdk-search">' +
                '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/></svg>' +
                '<input id="cmdk-input" type="text" autocomplete="off" spellcheck="false">' +
                '<kbd>esc</kbd>' +
              '</div>' +
              '<div class="cmdk-list" id="cmdk-list" role="listbox"></div>' +
              '<div class="cmdk-hint" id="cmdk-hint"></div>' +
            '</div>';

        const backdrop = root.querySelector('.cmdk-backdrop');
        const input = root.querySelector('#cmdk-input');
        const list = root.querySelector('#cmdk-list');
        const hint = root.querySelector('#cmdk-hint');

        let selected = 0;
        let filtered = [];

        function render(filter) {
            const cmds = buildCommands().map(function (c) {
                return Object.assign({}, c, { _label: t(c.label), _section: t(c.section) });
            });
            const q = (filter || '').trim().toLowerCase();
            filtered = q
                ? cmds.filter(function (c) { return c._label.toLowerCase().indexOf(q) >= 0 || c._section.toLowerCase().indexOf(q) >= 0; })
                : cmds;

            if (!filtered.length) {
                list.innerHTML = '<div class="cmdk-empty">' + t('cmdk.empty') + '</div>';
                return;
            }
            const grouped = {};
            filtered.forEach(function (c) {
                (grouped[c._section] = grouped[c._section] || []).push(c);
            });
            let html = '';
            let idx = 0;
            Object.keys(grouped).forEach(function (sectionLabel) {
                html += '<div class="cmdk-section">' + sectionLabel + '</div>';
                grouped[sectionLabel].forEach(function (c) {
                    html += '<div class="cmdk-item" role="option" data-idx="' + idx + '">' +
                              '<span>' + c._label + '</span>' +
                              '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>' +
                            '</div>';
                    idx++;
                });
            });
            list.innerHTML = html;
            if (selected >= filtered.length) selected = 0;
            highlight();
        }

        function highlight() {
            list.querySelectorAll('.cmdk-item').forEach(function (el) {
                const isSel = parseInt(el.getAttribute('data-idx'), 10) === selected;
                el.classList.toggle('is-selected', isSel);
                el.setAttribute('aria-selected', isSel ? 'true' : 'false');
                if (isSel) {
                    const r = el.getBoundingClientRect();
                    const lr = list.getBoundingClientRect();
                    if (r.bottom > lr.bottom) el.scrollIntoView({ block: 'end' });
                    else if (r.top < lr.top) el.scrollIntoView({ block: 'start' });
                }
            });
        }

        function open() {
            root.classList.add('cmdk-open');
            root.setAttribute('aria-hidden', 'false');
            selected = 0;
            input.value = '';
            render('');
            hint.textContent = t('cmdk.hint');
            input.setAttribute('placeholder', t('cmdk.placeholder'));
            setTimeout(function () { input.focus(); }, 10);
        }
        function close() {
            root.classList.remove('cmdk-open');
            root.setAttribute('aria-hidden', 'true');
        }
        function execute() {
            if (!filtered[selected]) return;
            const cmd = filtered[selected];
            close();
            setTimeout(function () { cmd.run(); }, 50);
        }

        input.addEventListener('input', function () { render(input.value); });
        input.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown') { e.preventDefault(); selected = Math.min(selected + 1, filtered.length - 1); highlight(); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); selected = Math.max(selected - 1, 0); highlight(); }
            else if (e.key === 'Enter') { e.preventDefault(); execute(); }
            else if (e.key === 'Escape') { e.preventDefault(); close(); }
        });
        list.addEventListener('click', function (e) {
            const item = e.target.closest('.cmdk-item');
            if (!item) return;
            selected = parseInt(item.getAttribute('data-idx'), 10);
            execute();
        });
        list.addEventListener('mousemove', function (e) {
            const item = e.target.closest('.cmdk-item');
            if (!item) return;
            const idx = parseInt(item.getAttribute('data-idx'), 10);
            if (idx !== selected) { selected = idx; highlight(); }
        });
        backdrop.addEventListener('click', close);

        document.addEventListener('keydown', function (e) {
            const isOpen = root.classList.contains('cmdk-open');
            const target = e.target;
            const inField = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
            if (!isOpen) {
                if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); }
                else if (e.key === '/' && !inField) { e.preventDefault(); open(); }
            }
        });

        // Re-translate when language changes
        document.addEventListener('langchange', function () {
            if (root.classList.contains('cmdk-open')) {
                hint.textContent = t('cmdk.hint');
                input.setAttribute('placeholder', t('cmdk.placeholder'));
                render(input.value);
            }
        });
    }

    /* ============================================================
       Bootstrap
       ============================================================ */
    document.addEventListener('DOMContentLoaded', function () {
        consoleGreeting();
        document.addEventListener('keydown', onKonami);
        avatarEgg();
        initCmdk();

        // Re-greet on language change
        document.addEventListener('langchange', consoleGreeting);
    });
})();
