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
            const accent = getAccent();
            console.log('%c' + banner, 'color:' + accent + '; font-family:monospace; font-weight:700; line-height:1.1');
            console.log('%c' + t('console.greeting'), 'font-size:13px; color:#5f6368');
            console.log('%c' + t('console.hint'), 'font-size:12px; color:#8a8f98; font-style:italic');
        } catch (e) { /* noop */ }
    }

    function fireEgg(id) {
        try {
            document.dispatchEvent(new CustomEvent('fr:egg', { detail: { id: id } }));
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
            fireEgg('konami');
            startDataRain();
        }
    }

    function startDataRain() {
        if (rainActive) return;

        // Sem animação para quem pediu menos movimento — só a confirmação
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            showToast(t('toast.konami'));
            return;
        }
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
        const accent = getAccent();
        const accentBright = lightenHex(accent, 0.45);
        let W = canvas.width = window.innerWidth;
        let H = canvas.height = window.innerHeight;

        const fontSize = 16;
        const colWidth = 110;

        function makeDrops() {
            const cols = Math.ceil(W / colWidth);
            return new Array(cols).fill(0).map(function () {
                return {
                    y: Math.random() * H / fontSize,
                    word: words[Math.floor(Math.random() * words.length)],
                    speed: 0.4 + Math.random() * 0.8
                };
            });
        }
        let drops = makeDrops();

        let resizeT;
        function resize() {
            clearTimeout(resizeT);
            resizeT = setTimeout(function () {
                W = canvas.width = window.innerWidth;
                H = canvas.height = window.innerHeight;
                drops = makeDrops();
            }, 100);
        }
        window.addEventListener('resize', resize);

        let rafId;
        let last = 0;
        function draw(now) {
            const dt = Math.min(last ? now - last : 16, 50);
            last = now;
            const k = dt / 16.67;
            ctx.fillStyle = 'rgba(15, 17, 21, 0.10)';
            ctx.fillRect(0, 0, W, H);
            ctx.font = '600 ' + fontSize + 'px ui-monospace, Menlo, monospace';
            for (let i = 0; i < drops.length; i++) {
                const d = drops[i];
                const y = d.y * fontSize;
                ctx.fillStyle = i % 7 === 0 ? accentBright : accent;
                ctx.fillText(d.word, i * colWidth + 8, y);
                d.y += d.speed * k;
                if (y > H && Math.random() > 0.975) {
                    d.y = 0;
                    d.word = words[Math.floor(Math.random() * words.length)];
                }
            }
            rafId = requestAnimationFrame(draw);
        }
        rafId = requestAnimationFrame(draw);
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
                fireEgg('avatar');
                setTimeout(function () { avatar.classList.remove('spin'); }, 1200);
            }
        });
    }

    /* ============================================================
       4. Command palette
       ============================================================ */
    const EMAIL = 'filiperp' + '@' + 'gmail.com';

    function buildCommands() {
        const ttsActive = (window.__tts && window.__tts.isActive());
        const ttsLabel = ttsActive ? 'cmdk.tts.toggle_off' : 'cmdk.tts.toggle';
        const ttsIcon = ttsActive ? '🔇' : '🔊';
        return [
            { icon: '👤', section: 'cmdk.section.nav', label: 'cmdk.go.about', run: function () { location.hash = '#about'; } },
            { icon: '💼', section: 'cmdk.section.nav', label: 'cmdk.go.experience', run: function () { location.hash = '#experience'; } },
            { icon: '🛠️', section: 'cmdk.section.nav', label: 'cmdk.go.skills', run: function () { location.hash = '#skills'; } },
            { icon: '🚀', section: 'cmdk.section.nav', label: 'cmdk.go.projects', run: function () { location.hash = '#projects'; } },
            { icon: '✉️', section: 'cmdk.section.nav', label: 'cmdk.go.contact', run: function () { location.hash = '#contact'; } },
            { icon: '🌓', section: 'cmdk.section.actions', label: 'cmdk.toggle.theme', run: function () { document.getElementById('theme-toggle').click(); } },
            { icon: '🌐', section: 'cmdk.section.actions', label: 'cmdk.toggle.lang', run: function () { if (window.__i18n) window.__i18n.toggle(); } },
            { icon: '📄', section: 'cmdk.section.actions', label: 'cmdk.download.cv', run: function () { window.location.href = 'assets/filipe_rodrigues.pdf'; } },
            { icon: '📋', section: 'cmdk.section.actions', label: 'cmdk.copy.email', run: function () {
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
            { icon: ttsIcon, section: 'cmdk.section.fun', label: ttsLabel, keywords: 'voz voice tts leitura reader', run: function () { if (window.__tts) window.__tts.toggle(); } },
            { icon: '🎨', section: 'cmdk.section.fun', label: 'cmdk.offduty', keywords: 'graffiti pichacao zoeira fun', run: function () { if (window.__offduty) window.__offduty.open(); } },
            { icon: '🌈', section: 'cmdk.section.fun', label: 'cmdk.color', keywords: 'accent cor theme paleta', run: function () { if (window.__color) window.__color.open(); } },
            { icon: '🌧️', section: 'cmdk.section.fun', label: 'cmdk.rain', keywords: 'matrix konami chuva data rain', run: function () { startDataRain(); } },
            { icon: '🏆', section: 'cmdk.section.fun', label: 'cmdk.achievements', keywords: 'conquistas trofeu badges eggs', run: function () { if (window.__achievements) window.__achievements.open(); } },
            { icon: '🏎️', section: 'cmdk.section.fun', label: 'cmdk.game.f1', keywords: 'corrida race jogo game', run: function () { if (window.__games) window.__games.f1(); } },
            { icon: '🐦', section: 'cmdk.section.fun', label: 'cmdk.game.flappy', keywords: 'bird passaro jogo game', run: function () { if (window.__games) window.__games.flappy(); } },
            { icon: '🐛', section: 'cmdk.section.fun', label: 'cmdk.game.worms', keywords: 'tanque artilharia artillery jogo game', run: function () { if (window.__games) window.__games.worms(); } },
            { icon: '📅', section: 'cmdk.section.external', label: 'cmdk.open.schedule', run: function () { window.open('https://calendar.app.google/2aG8genMhXuws8dKA', '_blank', 'noopener'); } },
            { icon: '💼', section: 'cmdk.section.external', label: 'cmdk.open.linkedin', run: function () { window.open('https://www.linkedin.com/in/filiperp', '_blank', 'noopener'); } },
            { icon: '🐙', section: 'cmdk.section.external', label: 'cmdk.open.github', run: function () { window.open('https://github.com/filiperp', '_blank', 'noopener'); } },
            { icon: '📊', section: 'cmdk.section.external', label: 'cmdk.open.mdb', run: function () { window.open('https://midiadados.gm.org.br/', '_blank', 'noopener'); } }
        ];
    }

    /* ---- Fuzzy matching (subsequência com score, acento-insensível) ---- */
    function normChars(str) {
        return Array.from(str).map(function (ch) {
            const d = ch.normalize ? ch.normalize('NFD') : ch;
            return d.charAt(0).toLowerCase();
        });
    }
    function fuzzyMatch(query, text, extra) {
        const labelChars = normChars(text);
        const target = extra ? labelChars.concat(normChars(' ' + extra)) : labelChars;
        const q = normChars(query).filter(function (c) { return c !== ' '; });
        if (!q.length) return { score: 0, indices: [] };
        let qi = 0, score = 0, lastIdx = -2;
        const indices = [];
        for (let i = 0; i < target.length && qi < q.length; i++) {
            if (target[i] === q[qi]) {
                if (i < labelChars.length) indices.push(i);
                score += 1;
                if (i === lastIdx + 1) score += 2;
                if (i === 0 || target[i - 1] === ' ') score += 2;
                lastIdx = i;
                qi++;
            }
        }
        if (qi < q.length) return null;
        if (indices.length > 1) {
            score -= (indices[indices.length - 1] - indices[0] - indices.length + 1) * 0.15;
        }
        return { score: score, indices: indices, labelLen: labelChars.length };
    }

    /* ---- Mini-engine SQL: consulte o CV no ⌘K ---- */
    const SQL_RE = /^\s*(select|show|describe|desc|drop|delete|insert|update|alter|truncate)\b/i;

    function escHtml(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function sqlTables() {
        const jobIds = ['goldenlearn', 'kreios', 'athena', 'bbi', 'band', 'aennova', 'md', 'unasp'];
        const SKILLS = [
            ['Python', 'languages', 8], ['SQL', 'languages', 10], ['JavaScript', 'languages', 11],
            ['PHP', 'languages', 11], ['Alteryx', 'data', 10], ['Data Engineering', 'data', 6],
            ['Business Intelligence', 'data', 7], ['Big Data', 'data', 4], ['Machine Learning', 'ai', 3],
            ['MySQL', 'databases', 13], ['PostgreSQL', 'databases', 3], ['AWS/Azure/GCP', 'cloud', 9],
            ['CI/CD', 'cloud', 6], ['Angular', 'frontend', 8], ['Vue', 'frontend', 8],
            ['React', 'frontend', 4], ['Laravel', 'backend', 10], ['Django', 'backend', 4],
            ['Agile/Scrum', 'methods', 10]
        ];
        return {
            experience: {
                columns: ['role', 'company', 'period'],
                rows: jobIds.map(function (id) {
                    return { role: t('jobs.' + id + '.title'), company: t('jobs.' + id + '.company'), period: t('jobs.' + id + '.meta') };
                })
            },
            skills: {
                columns: ['name', 'category', 'years'],
                rows: SKILLS.map(function (s) { return { name: s[0], category: s[1], years: s[2] }; })
            },
            projects: {
                columns: ['name', 'url'],
                rows: [
                    { name: t('projects.mdb.title'), url: 'midiadados.gm.org.br' },
                    { name: t('projects.athena.title'), url: '—' },
                    { name: t('projects.life.title'), url: 'lifeacademy.pro' }
                ]
            },
            certifications: {
                columns: ['name', 'issuer'],
                rows: [
                    { name: 'Alteryx Designer Core', issuer: t('certs.alteryx_core.desc') },
                    { name: 'Alteryx Designer Advanced', issuer: t('certs.alteryx_adv.desc') },
                    { name: 'Alteryx Certified Professional', issuer: t('certs.alteryx_pro.desc') },
                    { name: 'Data Science & ML: Making Data-Driven Decisions', issuer: t('certs.mit.desc') },
                    { name: t('certs.uchicago.title'), issuer: t('certs.uchicago.desc') }
                ]
            }
        };
    }

    function sqlError(msg, hint) {
        let out = '<span class="sql-err">ERROR: ' + escHtml(msg) + '</span>';
        if (hint) out += '\n<span class="sql-meta">HINT: ' + escHtml(hint) + '</span>';
        return out;
    }

    function sqlRenderRows(columns, rows, elapsed) {
        const widths = columns.map(function (c) { return String(c).length; });
        rows.forEach(function (r) {
            columns.forEach(function (c, i) {
                widths[i] = Math.max(widths[i], String(r[c] == null ? '' : r[c]).length);
            });
        });
        function pad(s, w) {
            s = String(s == null ? '' : s);
            return s + new Array(Math.max(0, w - s.length) + 1).join(' ');
        }
        let out = '<span class="sql-head">' + escHtml(columns.map(function (c, i) { return pad(c, widths[i]); }).join(' | ')) + '</span>\n';
        out += '<span class="sql-meta">' + escHtml(widths.map(function (w) { return new Array(w + 1).join('-'); }).join('-+-')) + '</span>\n';
        rows.forEach(function (r) {
            out += escHtml(columns.map(function (c, i) { return pad(r[c], widths[i]); }).join(' | ')) + '\n';
        });
        out += '\n<span class="sql-meta">' + rows.length + (rows.length === 1 ? ' row' : ' rows') + ' in ' + elapsed.toFixed(2) + ' ms</span>';
        return out;
    }

    function runSql(query) {
        const startAt = performance.now();
        const tables = sqlTables();
        const q = query.trim().replace(/;+\s*$/, '');

        if (/^(drop|delete|insert|update|alter|truncate)\b/i.test(q)) {
            return sqlError('permission denied (nice try)', 'this CV is read-only — SELECT, SHOW and DESCRIBE are allowed');
        }
        if (/^show\s+tables$/i.test(q)) {
            fireEgg('sql');
            const rows = Object.keys(tables).map(function (n) { return { table_name: n }; });
            return sqlRenderRows(['table_name'], rows, performance.now() - startAt);
        }
        const descM = q.match(/^(?:describe|desc)\s+([a-z_]+)$/i);
        if (descM) {
            const tb = tables[descM[1].toLowerCase()];
            if (!tb) return sqlError('relation "' + descM[1] + '" does not exist', 'tables: ' + Object.keys(tables).join(', '));
            fireEgg('sql');
            return sqlRenderRows(['column'], tb.columns.map(function (c) { return { column: c }; }), performance.now() - startAt);
        }

        const selM = q.match(/^select\s+(.+?)\s+from\s+([a-z_]+)(?:\s+where\s+([a-z_]+)\s*(=|like)\s*'([^']*)')?(?:\s+order\s+by\s+([a-z_]+)(\s+desc)?)?(?:\s+limit\s+(\d+))?$/i);
        if (!selM) {
            if (/^select\s+\*\s+from\s+secrets$/i.test(q)) {
                fireEgg('sql');
                return sqlRenderRows(['secret'], [{ secret: 'há mais easter eggs do que você imagina — tente o Konami code' }], performance.now() - startAt);
            }
            if (/^select\b/i.test(q)) {
                return sqlError('syntax error at or near "' + q.slice(0, 24) + '…"',
                    "supported: SELECT cols FROM table [WHERE col = 'x' | LIKE '%x%'] [ORDER BY col [DESC]] [LIMIT n]");
            }
            return sqlError('unsupported statement', 'try SHOW TABLES');
        }

        const tableName = selM[2].toLowerCase();
        if (tableName === 'secrets') {
            fireEgg('sql');
            return sqlRenderRows(['secret'], [{ secret: 'há mais easter eggs do que você imagina — tente o Konami code' }], performance.now() - startAt);
        }
        const table = tables[tableName];
        if (!table) return sqlError('relation "' + tableName + '" does not exist', 'tables: ' + Object.keys(tables).join(', '));

        let columns;
        if (selM[1].trim() === '*') {
            columns = table.columns;
        } else {
            columns = selM[1].split(',').map(function (c) { return c.trim().toLowerCase(); });
            const bad = columns.filter(function (c) { return table.columns.indexOf(c) < 0; });
            if (bad.length) return sqlError('column "' + bad[0] + '" does not exist', 'columns: ' + table.columns.join(', '));
        }

        let rows = table.rows.slice();
        if (selM[3]) {
            const col = selM[3].toLowerCase();
            if (table.columns.indexOf(col) < 0) return sqlError('column "' + col + '" does not exist', 'columns: ' + table.columns.join(', '));
            const op = selM[4].toLowerCase();
            const val = selM[5];
            if (op === '=') {
                rows = rows.filter(function (r) { return String(r[col]).toLowerCase() === val.toLowerCase(); });
            } else {
                const needle = val.replace(/%/g, '').toLowerCase();
                rows = rows.filter(function (r) { return String(r[col]).toLowerCase().indexOf(needle) >= 0; });
            }
        }
        if (selM[6]) {
            const col = selM[6].toLowerCase();
            if (table.columns.indexOf(col) < 0) return sqlError('column "' + col + '" does not exist', 'columns: ' + table.columns.join(', '));
            const dir = selM[7] ? -1 : 1;
            rows.sort(function (a, b) {
                const av = a[col], bv = b[col];
                if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
                return String(av).localeCompare(String(bv)) * dir;
            });
        }
        if (selM[8]) rows = rows.slice(0, parseInt(selM[8], 10));

        fireEgg('sql');
        return sqlRenderRows(columns, rows, performance.now() - startAt);
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

        input.setAttribute('role', 'combobox');
        input.setAttribute('aria-expanded', 'true');
        input.setAttribute('aria-controls', 'cmdk-list');
        input.setAttribute('aria-autocomplete', 'list');

        let selected = 0;
        let filtered = [];
        let sqlMode = false;
        let prevFocus = null;

        function markedLabel(label, indices) {
            const chars = Array.from(label);
            const idxSet = {};
            (indices || []).forEach(function (i) { idxSet[i] = true; });
            return chars.map(function (ch, i) {
                const safe = escHtml(ch);
                return idxSet[i] ? '<mark>' + safe + '</mark>' : safe;
            }).join('');
        }

        function itemHtml(c, idx) {
            return '<div class="cmdk-item" role="option" id="cmdk-item-' + idx + '" data-idx="' + idx + '">' +
                       '<span class="cmdk-emoji">' + (c.icon || '') + '</span>' +
                       '<span class="cmdk-label">' + markedLabel(c._label, c._indices) + '</span>' +
                       '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>' +
                   '</div>';
        }

        function render(filter) {
            const raw = filter || '';
            sqlMode = SQL_RE.test(raw);

            if (sqlMode) {
                filtered = [];
                list.innerHTML = '<div class="cmdk-sql">' + runSql(raw) + '</div>';
                hint.textContent = t('cmdk.sql_mode_hint');
                return;
            }
            hint.textContent = t('cmdk.hint');

            const cmds = buildCommands().map(function (c) {
                return Object.assign({}, c, { _label: t(c.label), _section: t(c.section) });
            });
            const q = raw.trim();

            if (!q) {
                filtered = cmds;
                const grouped = {};
                filtered.forEach(function (c) {
                    (grouped[c._section] = grouped[c._section] || []).push(c);
                });
                let html = '';
                let idx = 0;
                Object.keys(grouped).forEach(function (sectionLabel) {
                    html += '<div class="cmdk-section">' + escHtml(sectionLabel) + '</div>';
                    grouped[sectionLabel].forEach(function (c) {
                        html += itemHtml(c, idx);
                        idx++;
                    });
                });
                list.innerHTML = html;
                if (selected >= filtered.length) selected = 0;
                highlight();
                return;
            }

            // fuzzy: pontua label + seção + keywords, ordena por score
            filtered = [];
            cmds.forEach(function (c) {
                const m = fuzzyMatch(q, c._label, (c.keywords || '') + ' ' + c._section);
                if (m) {
                    c._score = m.score;
                    c._indices = m.indices;
                    filtered.push(c);
                }
            });
            filtered.sort(function (a, b) { return b._score - a._score; });

            if (!filtered.length) {
                list.innerHTML = '<div class="cmdk-empty">' + t('cmdk.empty') + '</div>' +
                    '<div class="cmdk-sql"><span class="sql-meta">' + escHtml(t('cmdk.sql_hint')) + '</span></div>';
                return;
            }
            list.innerHTML = filtered.map(itemHtml).join('');
            if (selected >= filtered.length) selected = 0;
            highlight();
        }

        function highlight() {
            list.querySelectorAll('.cmdk-item').forEach(function (el) {
                const isSel = parseInt(el.getAttribute('data-idx'), 10) === selected;
                el.classList.toggle('is-selected', isSel);
                el.setAttribute('aria-selected', isSel ? 'true' : 'false');
                if (isSel) {
                    input.setAttribute('aria-activedescendant', el.id);
                    const r = el.getBoundingClientRect();
                    const lr = list.getBoundingClientRect();
                    if (r.bottom > lr.bottom) el.scrollIntoView({ block: 'end' });
                    else if (r.top < lr.top) el.scrollIntoView({ block: 'start' });
                }
            });
        }

        function open() {
            prevFocus = document.activeElement;
            root.classList.add('cmdk-open');
            root.setAttribute('aria-hidden', 'false');
            selected = 0;
            input.value = '';
            render('');
            input.setAttribute('placeholder', t('cmdk.placeholder'));
            fireEgg('cmdk');
            setTimeout(function () { input.focus(); }, 10);
        }
        function close() {
            root.classList.remove('cmdk-open');
            root.setAttribute('aria-hidden', 'true');
            if (prevFocus && typeof prevFocus.focus === 'function') {
                try { prevFocus.focus(); } catch (e) { /* noop */ }
            }
        }
        function execute() {
            if (sqlMode) return;
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
       5. TTS — voice reader
       ============================================================ */
    function initTTS() {
        let active = false;
        const supported = 'speechSynthesis' in window;

        function setActive(v) {
            active = v;
            document.body.classList.toggle('tts-on', v);
        }
        function speak(text) {
            if (!supported) return;
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(text);
            const lang = (window.__i18n && window.__i18n.current()) === 'pt' ? 'pt-BR' : 'en-US';
            u.lang = lang;
            u.rate = 1.0;
            window.speechSynthesis.speak(u);
        }
        function activate() {
            if (!supported) { showToast(t('toast.tts_unsupported')); return; }
            setActive(true);
            showToast(t('toast.tts_on'));
            fireEgg('tts');
        }
        function deactivate() {
            if (supported) window.speechSynthesis.cancel();
            setActive(false);
            showToast(t('toast.tts_off'));
        }
        function toggle() { active ? deactivate() : activate(); }

        const READABLE = 'p, li, h1, h2, h3, .lead, .section-lead, .eyebrow, .cred-title, .cred-meta, .cred-desc';
        document.body.addEventListener('click', function (e) {
            if (!active) return;
            const target = e.target;
            if (target.closest('.cmdk-panel, .cmdk-backdrop, .toast, .btn, .nav, .lang-toggle, .theme-toggle, .offduty-overlay, .color-modal, .game-modal, button, a')) return;
            const el = target.closest(READABLE);
            if (!el) return;
            e.preventDefault();
            e.stopPropagation();
            if (window.speechSynthesis && window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                return;
            }
            speak(el.textContent.trim());
        }, true);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && active) deactivate();
        });

        window.__tts = { activate: activate, deactivate: deactivate, toggle: toggle, isActive: function () { return active; } };
    }

    /* ============================================================
       6. Off-duty mode — pichação orgânica + modo zoeira
       ============================================================ */

    const OFFDUTY_OVERRIDES = {
        pt: {
            'nav.about': 'Sobre',
            'nav.experience': 'Pretexto',
            'nav.skills': 'Vibes',
            'nav.projects': 'Aventuras',
            'nav.contact': 'Bora?',

            'hero.eyebrow': 'Procrastinador certificado · Filósofo de boteco · Café-dependente',
            'hero.title.before': 'Acordei e a única certeza foi o ',
            'hero.title.accent': 'café',
            'hero.title.after': '.',
            'hero.lead': '"Só sei que nada sei" — Sócrates (e ele nem usava Jira). Funciono com 70% café, 20% trilha do Goonies e 10% prazo vencendo. Aceito ser convencido por GIF.',
            'hero.cta.cv': '📥 Baixar lista de séries',
            'hero.cta.contact': 'Me xinga (educadamente)',
            'hero.cta.schedule': 'Marcar um café (ou cerveja)',

            'stats.years': 'anos enrolando o despertador',
            'stats.tb': 'litros de café/dia',
            'stats.users': 'memes salvos sem motivo',
            'stats.clients': "vezes que cliquei 'mais tarde'",

            'about.title': 'Sobre (calma)',
            'about.lead': '"Penso, logo existo" — Descartes. Aguardando confirmação na Receita. Tenho opinião forte sobre como abrir saco de salgadinho e qual é o melhor filme do Cage.',
            'about.meta.location_label': 'Localização real',
            'about.meta.location_value': 'Entre a geladeira e o sofá',
            'about.meta.languages_label': 'Comunicação',
            'about.meta.languages_value': 'Português · Inglês de Netflix · Espanhol de festa · Linguagem do silêncio',
            'about.meta.available_label': 'Disponível para',
            'about.meta.available_value': 'Indicações de série · Discussões inúteis · Pizza · Sextou',

            'experience.title': 'Currículo paralelo',

            'jobs.goldenlearn.title': 'Tester Profissional de Sofá',
            'jobs.goldenlearn.company': 'Sala de Estar Inc.',
            'jobs.goldenlearn.meta': '2003 – Presente · Em qualquer almofada',
            'jobs.goldenlearn.b1': 'Testei 47 modelos de sofá em busca da posição ideal pra cochilo.',
            'jobs.goldenlearn.b2': 'Liderei retrospectivas semanais segurando o controle remoto.',
            'jobs.goldenlearn.b3': 'Otimizei o pipeline chips→boca→sofá em 180%.',
            'jobs.goldenlearn.b4': 'Aceitei 100% das atualizações de termos do iTunes sem ler.',

            'jobs.kreios.title': 'Detective de Geladeira',
            'jobs.kreios.company': 'Cozinha Central',
            'jobs.kreios.meta': 'Madrugada · 1995 – Presente',
            'jobs.kreios.b1': 'Especialista em achar exatamente o que NÃO quero comer.',
            'jobs.kreios.b2': 'Abri a porta 32x em uma única noite acreditando que algo novo apareceria.',
            'jobs.kreios.b3': 'Provei que existem prazos de validade dentro de prazos de validade.',
            'jobs.kreios.b4': 'Reduzi rollbacks de iogurte em 10%.',
            'jobs.kreios.b5': "Encurtei o ciclo 'fome → comer → arrependimento' de 30 min pra 8 min.",

            'jobs.athena.title': 'Arquiteto de Castelinhos de Areia',
            'jobs.athena.company': 'Praia & Cia',
            'jobs.athena.meta': 'Verão · Múltiplos contratos · Remoto (com vista pro mar)',
            'jobs.athena.b1': 'Lidero equipes infantis em projetos de alta complexidade costeira.',
            'jobs.athena.b2': "Sobrevivi a 100% das marés altas usando metodologia ágil de 'corre'.",
            'jobs.athena.b3': 'Pioneiro do método balde-pá-grito.',
            'jobs.athena.b4': 'Implementei pipelines de areia molhada com latência de 0.5s.',

            'jobs.bbi.title': 'Diretor de Pensamentos Aleatórios',
            'jobs.bbi.company': 'Chuveiro & Associados',
            'jobs.bbi.meta': 'Banho · Vida toda · Em paralelo a tudo',
            'jobs.bbi.b1': 'Cofundei a teoria que o chuveiro é o melhor escritório do mundo.',
            'jobs.bbi.b2': 'Lancei 47 ideias revolucionárias que esqueci ao secar a cabeça.',
            'jobs.bbi.b3': 'Liderei brainstorms unipessoais com altíssima rotatividade interna.',
            'jobs.bbi.b4': "Construí e mantenho um repositório mental de 'depois eu faço'.",

            'jobs.band.title': 'Operador de Controle Remoto Sênior',
            'jobs.band.company': 'Sofá Bandeirantes',
            'jobs.band.meta': 'Sofá · 1990 – Presente',
            'jobs.band.b1': 'Multitarefa entre 6 canais e Instagram simultaneamente.',
            'jobs.band.b2': 'Treinamento avançado em zapping de comerciais.',

            'jobs.aennova.title': 'Estagiário de Bons Modos',
            'jobs.aennova.company': 'Mesa de Almoço da Família',
            'jobs.aennova.meta': 'Domingo · 2008 – 2014',
            'jobs.aennova.b1': 'Aprendi a usar garfo e faca ao mesmo tempo.',
            'jobs.aennova.b2': 'Liderei iniciativas de não falar de boca cheia (sucesso parcial).',
            'jobs.aennova.b3': "Documentei pedidos de 'mais um pouquinho'.",
            'jobs.aennova.b4': 'Apresentei recomendações sobre não mexer no celular à mesa.',

            'jobs.md.title': 'Professor de Filosofia de Boteco',
            'jobs.md.company': 'Mesa 5, Sempre',
            'jobs.md.meta': 'Sextou · 2008',
            'jobs.md.b1': 'Ministrei aulas magnas sobre a vida para quem não pediu.',

            'jobs.unasp.title': 'Pesquisador de Travesseiros',
            'jobs.unasp.company': 'Cama de Casal',
            'jobs.unasp.meta': 'Madrugada · 1985 – Presente',
            'jobs.unasp.b1': 'Conduzi estudos longitudinais sobre o lado frio do travesseiro.',
            'jobs.unasp.b2': 'Liderei dois grupos: dorminhocos e cochiladores.',
            'jobs.unasp.b2a': 'Processamento de sonos — arquiteturas e técnicas para cochilo industrial.',
            'jobs.unasp.b2b': 'Sistemas Dinâmicos do Travesseiro — modelos de virar o lado frio.',
            'jobs.unasp.b3': 'Reduzi em 92% o tempo entre acordar e fechar o olho de novo.',

            'skills.title': 'Habilidades reais',
            'skills.languages': 'Idiomas (que arrisco)',
            'skills.data': 'Dados (afetivos)',
            'skills.ai': 'Inteligência ✨',
            'skills.ai.badge': 'vibe',
            'skills.db': 'Bancos (de afetos)',
            'skills.cloud': 'Nuvem (cinza)',
            'skills.frontend': 'Frameworks de Poltrona',
            'skills.backend': 'Frameworks de Cozinha',
            'skills.methods': 'Metodologias de Domingo',

            'certs.title': 'Certificações da vida',
            'certs.active': 'Vivo',
            'certs.alteryx_core.desc': 'Universidade da Vida · contínuo',
            'certs.alteryx_adv.desc': 'Universidade da Vida · contínuo',
            'certs.alteryx_pro.desc': 'Pais · 2003',
            'certs.mit.desc': 'Escola da Esquina · sempre',
            'certs.uchicago.title': 'Storytelling em jantar de família',
            'certs.uchicago.desc': 'Mãe · todo domingo',

            'edu.title': 'Educação real',
            'edu.ugf.title': 'Especialização em Procrastinação Aplicada',
            'edu.ugf.meta': 'Quarto · 2009 – 2010',
            'edu.ugf.desc': 'Programa focado em adiar tarefas grandes em favor de séries pequenas. Pesquisa em sistemas dinâmicos do controle remoto.',
            'edu.unicesumar.title': 'Tecnólogo em Vídeo-Cassete',
            'edu.unicesumar.meta': 'VHS · 2000 – 2003',

            'projects.title': 'Projetos paralelos',
            'projects.mdb.title': 'MDB – Mistério Demais Boletos',
            'projects.mdb.desc': 'Plataforma de visualização das contas que esqueço de pagar. Adotada 100% por bancos quando me ligam.',
            'projects.athena.title': 'Athena Beer Index',
            'projects.athena.desc': 'Plataforma de inteligência para escolher cerveja servindo 4000+ chopes consumidos. Multi-mercado: boteco, rooftop, casa.',
            'projects.life.title': 'Life Academy',
            'projects.life.badge': 'vibe',
            'projects.life.desc': 'Iniciativa pessoal: aprender a abrir saco de salgadinho sem explodir. 2500+ saquinhos abertos, 47% com sucesso.',

            'contact.title': 'Bora?',
            'contact.lead': 'Aberto para conversas sobre F1, Niki Lauda, Broncos, Weezer, qual o melhor episódio de Breaking Bad e por que Dostoyevsky é difícil mas vale a pena.',
            'contact.cta.email': 'Mandar coração',
            'contact.cta.schedule': 'Agendar bate-papo',
            'contact.cta.linkedin': 'LinkedIn (raramente uso)',
            'contact.cta.cv': 'Baixar lista de séries',

            'footer.tagline': 'Feito sem pressa em São Paulo'
        },
        en: {
            'hero.lead': '"I know that I know nothing" — Socrates. Running on 70% coffee, 20% Goonies soundtrack, 10% deadline panic.',
            'about.lead': '"I think, therefore I am" — Descartes. Pending confirmation. Strong opinions on chip bags and which Cage movie is the best.',
            'experience.title': 'Parallel résumé',
            'contact.title': "Let's go?"
        }
    };

    const SKILLS_OFFDUTY_LISTS = {
        'Linguagens':        ['Português coloquial', 'Inglês de Netflix', 'Espanhol de festa', 'Emoji avançado'],
        'Languages':         ['Português coloquial', 'Inglês de Netflix', 'Espanhol de festa', 'Emoji avançado'],
        'Dados & Analytics': ['Análise de Memes', 'Big Procrastinação', 'Streaming Quality Index'],
        'Data & Analytics':  ['Análise de Memes', 'Big Procrastinação', 'Streaming Quality Index'],
        'IA & Data Science': ['ML: Mama Lê', 'Classificação de Pizzas', 'Clustering de Hábitos Ruins', 'Análise Preditiva do Sextou'],
        'AI & Data Science': ['ML: Mama Lê', 'Classificação de Pizzas', 'Clustering de Hábitos Ruins', 'Análise Preditiva do Sextou'],
        'Bancos de dados':   ['MyHeart', 'PostgreSadness', 'RedShift Mental', 'Snowflake Emocional'],
        'Databases':         ['MyHeart', 'PostgreSadness', 'RedShift Mental', 'Snowflake Emocional'],
        'Cloud & DevOps':    ['Nuvem 9', 'CI/Café', 'S3: Sofá-Sono-Sopa', 'Deploy de Roupa'],
        'Frontend Frameworks':['Angular do Sofá', 'Reactish', 'Vue da Janela', 'Cordas (de roupa)'],
        'Backend Frameworks': ['Laravel de Frango', 'Djangostosa', 'FastForApi', 'YiYiYi', 'PontoNET (de pesca)'],
        'Metodologias':       ['Scrum no Sextou', 'Kanban da Geladeira', "DRY: Don't Repeat Domingos"],
        'Methodologies':      ['Scrum no Sextou', 'Kanban da Geladeira', "DRY: Don't Repeat Domingos"]
    };

    const CRED_TITLES_OFFDUTY = [
        'Certificado de Resistência ao Despertador',
        'Diploma de Procrastinador Avançado',
        'Faixa Preta em Pijama',
        "Pós-graduação em 'Já vai 5 minutos'",
        'Reconhecimento de Filme dos anos 90',
        "MBA em 'Tô indo'",
        "Tecnólogo em 'Já tô descendo'"
    ];

    const ORIGINAL_TEXT_CACHE = new Map();
    const ORIGINAL_SKILL_LISTS = new Map();
    const ORIGINAL_CRED_TITLES = [];

    function getOverride(key) {
        const lang = (window.__i18n && window.__i18n.current()) || 'pt';
        const block = OFFDUTY_OVERRIDES[lang] || {};
        if (block[key] != null) return block[key];
        return OFFDUTY_OVERRIDES.pt[key];
    }

    function applyOffdutyTexts() {
        // A) Por chave i18n
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            const key = el.getAttribute('data-i18n');
            const override = getOverride(key);
            if (override == null) return;
            if (!ORIGINAL_TEXT_CACHE.has(el)) ORIGINAL_TEXT_CACHE.set(el, el.textContent);
            el.textContent = override;
        });

        // B) Skill chips: substituir ul de cada .skill-group baseado no texto do h3
        document.querySelectorAll('.skill-group').forEach(function (group) {
            const h3 = group.querySelector('h3');
            const ul = group.querySelector('ul');
            if (!h3 || !ul) return;
            const titleText = h3.textContent.trim();
            // Trim badge suffix se houver (ex: "IA & Data Science MIT" → "IA & Data Science")
            const matchTitle = Object.keys(SKILLS_OFFDUTY_LISTS).find(function (k) {
                return titleText.indexOf(k) === 0;
            });
            if (!matchTitle) return;
            if (!ORIGINAL_SKILL_LISTS.has(ul)) ORIGINAL_SKILL_LISTS.set(ul, ul.innerHTML);
            ul.innerHTML = SKILLS_OFFDUTY_LISTS[matchTitle].map(function (item) {
                return '<li>' + item + '</li>';
            }).join('');
        });

        // C) Cred titles literais — substituir na ordem do DOM
        const credTitles = document.querySelectorAll('.cred-title');
        credTitles.forEach(function (el, i) {
            if (ORIGINAL_CRED_TITLES[i] == null) ORIGINAL_CRED_TITLES[i] = el.textContent;
            if (el.hasAttribute('data-i18n')) return; // already handled by A
            const replacement = CRED_TITLES_OFFDUTY[i];
            if (replacement) el.textContent = replacement;
        });
    }

    function restoreOriginalTexts() {
        // A) Restaurar i18n textContent
        ORIGINAL_TEXT_CACHE.forEach(function (originalText, el) {
            el.textContent = originalText;
        });
        ORIGINAL_TEXT_CACHE.clear();

        // Reaplicar i18n (garante consistência com idioma atual)
        if (window.__i18n) window.__i18n.apply(window.__i18n.current());

        // B) Restaurar skill chips
        ORIGINAL_SKILL_LISTS.forEach(function (originalHTML, ul) {
            ul.innerHTML = originalHTML;
        });
        ORIGINAL_SKILL_LISTS.clear();

        // C) Restaurar cred titles literais
        document.querySelectorAll('.cred-title').forEach(function (el, i) {
            if (ORIGINAL_CRED_TITLES[i] != null && !el.hasAttribute('data-i18n')) {
                el.textContent = ORIGINAL_CRED_TITLES[i];
            }
        });
        ORIGINAL_CRED_TITLES.length = 0;
    }
    const SVG_HEART = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 21s-7-4.5-9.5-9C.8 8.6 2.6 4 7 4c2 0 3.5 1 5 3 1.5-2 3-3 5-3 4.4 0 6.2 4.6 4.5 8-2.5 4.5-9.5 9-9.5 9z"/></svg>';
    const SVG_DUMBBELL = '<svg viewBox="0 0 64 24" fill="currentColor" aria-hidden="true"><rect x="2" y="6" width="6" height="12" rx="1"/><rect x="10" y="3" width="6" height="18" rx="1"/><rect x="18" y="10" width="28" height="4"/><rect x="48" y="3" width="6" height="18" rx="1"/><rect x="56" y="6" width="6" height="12" rx="1"/></svg>';
    const SVG_HELMET = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3c-5 0-9 4-9 9v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-5-4-9-9-9zm-6 9c0-3.3 2.7-6 6-6s6 2.7 6 6v1H6v-1zm12 4H6v-1h12v1z"/><rect x="7" y="14" width="10" height="3" fill="rgba(0,0,0,0.4)"/></svg>';

    function initOffDuty() {
        const root = document.getElementById('offduty-root');
        if (!root) return;
        let active = false;
        let resizeTimer = null;

        const ITEMS = [
            { type: 'sticker', key: 'graff.1',  anchor: '.hero h1',                     anchorY: 'top',    anchorX: 'right',  dx:  -20, dy: -30, rot: -8,  color: '#fb4f14' },
            { type: 'tag',     key: 'graff.2',  anchor: '.avatar',                      anchorY: 'bottom', anchorX: 'center', dx:  -60, dy:  20, rot:  6,  color: '#dc2626' },
            { type: 'doodle',  svg: SVG_HEART,  anchor: '.hero .lead',                  anchorY: 'top',    anchorX: 'right',  dx:   10, dy: -10, rot: 15,  color: 'var(--accent)', size: 52 },
            { type: 'tag',     key: 'graff.4',  anchor: '#about .section-title',        anchorY: 'center', anchorX: 'right',  dx:   20, dy: -15, rot: -5,  color: '#0ea5e9' },
            { type: 'sticker', key: 'graff.5',  anchor: '#about .meta-grid',            anchorY: 'top',    anchorX: 'right',  dx:  -10, dy: -25, rot:  4,  color: '#16a34a' },
            { type: 'tag',     key: 'graff.6',  anchor: '#experience .section-title',   anchorY: 'top',    anchorX: 'right',  dx:   20, dy:   0, rot: -7,  color: '#111111' },
            { type: 'sticker', key: 'graff.7',  anchor: '#experience .timeline',        anchorY: 'top',    anchorX: 'right',  dx:   30, dy:  20, rot:  9,  color: '#1d4ed8' },
            { type: 'tag',     key: 'graff.8',  anchor: '#experience',                  anchorY: 'center', anchorX: 'left',   dx:  -30, dy:   0, rot:  4,  color: '#52525b' },
            { type: 'doodle',  svg: SVG_DUMBBELL, anchor: '#experience',                anchorY: 'bottom', anchorX: 'right',  dx:    0, dy: -40, rot: -8,  color: '#dc2626', size: 96, height: 32 },
            { type: 'sticker', key: 'graff.10', anchor: '#skills .section-title',       anchorY: 'top',    anchorX: 'right',  dx:   30, dy: -10, rot: -6,  color: '#eab308' },
            { type: 'tag',     key: 'graff.11', anchor: '#skills',                      anchorY: 'top',    anchorX: 'left',   dx:  -10, dy:  40, rot:  8,  color: '#14532d' },
            { type: 'sticker', key: 'graff.12', anchor: '#projects .section-title',     anchorY: 'top',    anchorX: 'right',  dx:   20, dy: -10, rot:  5,  color: '#d4af37' },
            { type: 'tag',     key: 'graff.13', anchor: '#projects',                    anchorY: 'center', anchorX: 'left',   dx:  -40, dy:   0, rot: -6,  color: '#3f6212' },
            { type: 'doodle',  svg: SVG_HELMET, anchor: '#projects',                    anchorY: 'top',    anchorX: 'right',  dx:   20, dy:  80, rot: 12,  color: '#dc2626', size: 56 },
            { type: 'sticker', key: 'graff.15', anchor: '#projects',                    anchorY: 'bottom', anchorX: 'right',  dx:   -10, dy: -30, rot: -4, color: '#1e40af' },
            { type: 'tag',     key: 'graff.16', anchor: '#contact .section-title',      anchorY: 'top',    anchorX: 'left',   dx:  -30, dy:   0, rot: -8,  color: '#7c2d12' },
            { type: 'sticker', key: 'graff.17', anchor: '.footer',                      anchorY: 'top',    anchorX: 'left',   dx:   10, dy: -40, rot: -5,  color: '#002244' },
            { type: 'tag',     key: 'graff.18', anchor: '.footer',                      anchorY: 'center', anchorX: 'right',  dx:  -20, dy:   0, rot:  7,  color: 'var(--accent)' }
        ];

        function resolveColor(c) {
            if (c && c.indexOf('var(') === 0) {
                return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#fb923c';
            }
            return c;
        }

        function clampInsideViewport(el, leftBase, topBase) {
            requestAnimationFrame(function () {
                const rect = el.getBoundingClientRect();
                const docW = document.documentElement.clientWidth;
                const margin = 10;
                let dx = 0;
                if (rect.right > docW - margin) dx = (docW - margin) - rect.right;
                if (rect.left + dx < margin) dx = margin - rect.left;
                if (dx !== 0) el.style.left = (leftBase + dx) + 'px';
                // Y: nunca abaixo do topo do documento
                if (topBase < margin) el.style.top = margin + 'px';
            });
        }

        function place() {
            root.innerHTML = '';
            const scrollY = window.scrollY || window.pageYOffset;
            const scrollX = window.scrollX || window.pageXOffset;

            ITEMS.forEach(function (item, i) {
                const anchor = document.querySelector(item.anchor);
                if (!anchor) return;
                const rect = anchor.getBoundingClientRect();

                let top, left;
                if (item.anchorY === 'top') top = scrollY + rect.top;
                else if (item.anchorY === 'bottom') top = scrollY + rect.bottom;
                else top = scrollY + rect.top + rect.height / 2;

                if (item.anchorX === 'left') left = scrollX + rect.left;
                else if (item.anchorX === 'right') left = scrollX + rect.right;
                else left = scrollX + rect.left + rect.width / 2;

                top += (item.dy || 0);
                left += (item.dx || 0);

                const tagName = item.type === 'doodle' ? 'div' : 'span';
                const el = document.createElement(tagName);
                el.className = 'graff graff-' + item.type;
                const resolvedColor = resolveColor(item.color);
                let style = 'top:' + top + 'px;left:' + left + 'px;' +
                            '--rot:' + item.rot + 'deg;' +
                            '--color:' + resolvedColor + ';' +
                            '--delay:' + (i * 70) + 'ms;';
                if (item.size) style += 'width:' + item.size + 'px;';
                if (item.height) style += 'height:' + item.height + 'px;';
                el.style.cssText = style;

                if (item.type === 'doodle') {
                    el.innerHTML = item.svg;
                } else {
                    const text = window.__i18n ? window.__i18n.t(item.key) : item.key;
                    el.textContent = text;
                }
                root.appendChild(el);
                clampInsideViewport(el, left, top);
            });

            const exit = document.createElement('button');
            exit.className = 'graff-exit';
            exit.textContent = window.__i18n ? window.__i18n.t('offduty.exit') : '✕';
            exit.addEventListener('click', deactivate);
            root.appendChild(exit);
        }

        function activate() {
            if (active) return;
            active = true;
            // Fontes de grafite só são baixadas quando o modo é usado pela primeira vez
            if (!document.getElementById('graffiti-fonts')) {
                const l = document.createElement('link');
                l.id = 'graffiti-fonts';
                l.rel = 'stylesheet';
                l.href = 'https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Caveat:wght@700&display=swap';
                document.head.appendChild(l);
            }
            document.body.classList.add('offduty-on');
            root.classList.add('is-on');
            root.setAttribute('aria-hidden', 'false');
            applyOffdutyTexts();
            fireEgg('offduty');
            // Wait one frame so DOM updates settle, then place anchors with new heights
            requestAnimationFrame(place);
        }
        function deactivate() {
            active = false;
            document.body.classList.remove('offduty-on');
            root.classList.remove('is-on');
            root.setAttribute('aria-hidden', 'true');
            root.innerHTML = '';
            restoreOriginalTexts();
        }
        function toggle() { active ? deactivate() : activate(); }

        window.addEventListener('resize', function () {
            if (!active) return;
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(place, 200);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && active) deactivate();
        });
        document.addEventListener('langchange', function () {
            if (active) {
                applyOffdutyTexts();
                requestAnimationFrame(place);
            }
        });

        window.__offduty = { open: activate, close: deactivate, toggle: toggle, isActive: function () { return active; } };
    }

    /* ============================================================
       7. Color picker
       ============================================================ */
    const COLOR_PRESETS = [
        { name: 'Burnt orange', light: '#c2410c', dark: '#fb923c' },
        { name: 'Amber',        light: '#b45309', dark: '#f59e0b' },
        { name: 'Emerald',      light: '#047857', dark: '#34d399' },
        { name: 'Cyan',         light: '#0e7490', dark: '#22d3ee' },
        { name: 'Indigo',       light: '#4338ca', dark: '#818cf8' },
        { name: 'Purple',       light: '#7c3aed', dark: '#a78bfa' },
        { name: 'Pink',         light: '#be185d', dark: '#f472b6' },
        { name: 'Red',          light: '#b91c1c', dark: '#f87171' }
    ];

    function hexToRgb(hex) {
        const h = hex.replace('#', '');
        return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }
    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(function (x) { return Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0'); }).join('');
    }
    function darkenHex(hex, pct) {
        const [r, g, b] = hexToRgb(hex);
        const f = 1 - pct;
        return rgbToHex(r * f, g * f, b * f);
    }
    function lightenHex(hex, pct) {
        const [r, g, b] = hexToRgb(hex);
        return rgbToHex(r + (255 - r) * pct, g + (255 - g) * pct, b + (255 - b) * pct);
    }
    function softHex(hex) {
        const [r, g, b] = hexToRgb(hex);
        return 'rgba(' + r + ',' + g + ',' + b + ',0.13)';
    }

    function relLuminance(hex) {
        const rgb = hexToRgb(hex).map(function (c) {
            c /= 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    }
    function applyAccent(lightHex, darkHex) {
        // Cores customizadas muito claras quebram a legibilidade no tema claro
        if (relLuminance(lightHex) > 0.55) lightHex = darkenHex(lightHex, 0.3);
        const r = document.documentElement;
        r.style.setProperty('--accent-user-light', lightHex);
        r.style.setProperty('--accent-user-dark', darkHex);
        r.style.setProperty('--accent-user-light-hover', darkenHex(lightHex, 0.18));
        r.style.setProperty('--accent-user-dark-hover', lightenHex(darkHex, 0.18));
        r.style.setProperty('--accent-user-light-soft', softHex(lightHex));
        r.style.setProperty('--accent-user-dark-soft', softHex(darkHex));
        // Texto sobre o accent: branco ou quase-preto conforme a luminância
        r.style.setProperty('--accent-user-light-contrast', relLuminance(lightHex) > 0.45 ? '#1a1a1a' : '#fff');
        r.style.setProperty('--accent-user-dark-contrast', relLuminance(darkHex) > 0.45 ? '#0f1115' : '#fff');
    }
    function resetAccent() {
        const r = document.documentElement;
        ['--accent-user-light', '--accent-user-dark', '--accent-user-light-hover', '--accent-user-dark-hover',
         '--accent-user-light-soft', '--accent-user-dark-soft',
         '--accent-user-light-contrast', '--accent-user-dark-contrast'].forEach(function (k) {
            r.style.removeProperty(k);
        });
        localStorage.removeItem('accent');
    }
    function loadAccent() {
        const saved = localStorage.getItem('accent');
        if (!saved) return;
        try {
            const obj = JSON.parse(saved);
            if (obj.light && obj.dark) applyAccent(obj.light, obj.dark);
        } catch (e) { /* noop */ }
    }

    function initColor() {
        const root = document.getElementById('color-root');
        if (!root) return;

        function render() {
            const saved = JSON.parse(localStorage.getItem('accent') || 'null');
            const swatches = COLOR_PRESETS.map(function (p, i) {
                const isSel = saved && saved.light === p.light;
                return '<button class="color-swatch' + (isSel ? ' is-selected' : '') + '" ' +
                       'style="background:' + p.light + ';" ' +
                       'data-idx="' + i + '" ' +
                       'aria-label="' + p.name + '" title="' + p.name + '"></button>';
            }).join('');

            root.innerHTML =
                '<div class="color-backdrop" data-close></div>' +
                '<div class="color-modal" role="dialog" aria-modal="true">' +
                    '<h2 data-i18n="color.title">Cor de acento</h2>' +
                    '<p class="color-sub" data-i18n="color.subtitle">Escolha um preset ou personalize</p>' +
                    '<div class="color-swatches">' + swatches + '</div>' +
                    '<div class="color-actions">' +
                        '<input type="color" id="color-custom-input" value="' + (saved ? saved.light : '#c2410c') + '" aria-label="Custom color">' +
                        '<button class="btn btn-ghost" id="color-reset" data-i18n="color.reset">Restaurar padrão</button>' +
                        '<button class="btn btn-ghost" id="color-close" data-i18n="color.close" style="margin-left:auto">Fechar</button>' +
                    '</div>' +
                '</div>';
            if (window.__i18n) window.__i18n.apply(window.__i18n.current());
        }

        let wiredUp = false;
        function wire() {
            if (wiredUp) return;
            wiredUp = true;

            // Event delegation — listeners survive re-renders of root.innerHTML
            root.addEventListener('click', function (e) {
                if (e.target.closest('[data-close]') || e.target.id === 'color-close') return close();
                if (e.target.id === 'color-reset') { resetAccent(); render(); return; }
                const swatch = e.target.closest('.color-swatch');
                if (swatch) {
                    const idx = parseInt(swatch.getAttribute('data-idx'), 10);
                    const p = COLOR_PRESETS[idx];
                    applyAccent(p.light, p.dark);
                    localStorage.setItem('accent', JSON.stringify({ light: p.light, dark: p.dark }));
                    fireEgg('color');
                    render();
                }
            });
            root.addEventListener('input', function (e) {
                if (e.target.id !== 'color-custom-input') return;
                const light = e.target.value;
                const dark = lightenHex(light, 0.35);
                applyAccent(light, dark);
                localStorage.setItem('accent', JSON.stringify({ light: light, dark: dark }));
                fireEgg('color');
            });
        }

        function open() {
            render();
            wire();
            root.classList.add('is-open');
            root.setAttribute('aria-hidden', 'false');
        }
        function close() {
            root.classList.remove('is-open');
            root.setAttribute('aria-hidden', 'true');
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && root.classList.contains('is-open')) close();
        });

        window.__color = { open: open, close: close };
    }

    /* ============================================================
       8. F1 Race game (+ shared mini-game infra)
       ============================================================ */
    let REDUCED_MOTION = false;
    try {
        REDUCED_MOTION = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    } catch (e) { /* noop */ }

    /* ---- Procedural WebAudio (lazy, shared by the 3 games) ---- */
    let gameAudioCtx = null;
    function getGameAudio() {
        if (gameAudioCtx) return gameAudioCtx;
        try {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (AC) gameAudioCtx = new AC();
        } catch (e) { gameAudioCtx = null; }
        return gameAudioCtx;
    }
    function gamesMuted() {
        try { return localStorage.getItem('games_muted') === '1'; } catch (e) { return false; }
    }
    function setGamesMuted(v) {
        try { localStorage.setItem('games_muted', v ? '1' : '0'); } catch (e) { /* noop */ }
    }
    function soundCtx() {
        if (gamesMuted()) return null;
        const ac = getGameAudio();
        if (!ac) return null;
        if (ac.state === 'suspended') {
            try { ac.resume(); } catch (e) { /* noop */ }
        }
        return ac;
    }
    function blip(freq, dur) {
        const ac = soundCtx();
        if (!ac) return;
        const osc = ac.createOscillator();
        const g = ac.createGain();
        osc.type = 'square';
        osc.frequency.value = freq;
        g.gain.setValueAtTime(0.06, ac.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
        osc.connect(g);
        g.connect(ac.destination);
        osc.start();
        osc.stop(ac.currentTime + dur);
    }
    function sweep(f0, f1, dur) {
        const ac = soundCtx();
        if (!ac) return;
        const osc = ac.createOscillator();
        const g = ac.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(Math.max(1, f0), ac.currentTime);
        osc.frequency.exponentialRampToValueAtTime(Math.max(1, f1), ac.currentTime + dur);
        g.gain.setValueAtTime(0.08, ac.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
        osc.connect(g);
        g.connect(ac.destination);
        osc.start();
        osc.stop(ac.currentTime + dur);
    }
    function noise(dur) {
        const ac = soundCtx();
        if (!ac) return;
        const len = Math.max(1, Math.floor(ac.sampleRate * dur));
        const buf = ac.createBuffer(1, len, ac.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < len; i++) {
            data[i] = (Math.random() * 2 - 1) * (1 - i / len);
        }
        const src = ac.createBufferSource();
        const g = ac.createGain();
        src.buffer = buf;
        g.gain.setValueAtTime(0.12, ac.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
        src.connect(g);
        g.connect(ac.destination);
        src.start();
    }

    /* ---- Shared screen shake (respects prefers-reduced-motion) ---- */
    function applyShake(ctx, shake) {
        if (shake > 0.5) {
            const s = REDUCED_MOTION ? Math.min(shake, 2) : shake;
            ctx.translate((Math.random() - 0.5) * s, (Math.random() - 0.5) * s);
        }
    }

    let currentShell = null;

    function makeGameShell(titleKey, controlsKey) {
        if (currentShell) closeGame();
        const root = document.getElementById('game-root');
        const prevFocus = document.activeElement;
        root.innerHTML =
            '<div class="game-backdrop" data-close></div>' +
            '<div class="game-modal" role="dialog" aria-modal="true">' +
                '<div class="game-header">' +
                    '<h3 data-i18n="' + titleKey + '"></h3>' +
                    '<button class="game-mute" type="button"></button>' +
                    '<button class="game-close" aria-label="Close" data-close>×</button>' +
                '</div>' +
                '<canvas class="game-canvas" width="360" height="520"></canvas>' +
                '<div class="game-footer" data-i18n="' + controlsKey + '"></div>' +
            '</div>';
        root.classList.add('is-open');
        root.setAttribute('aria-hidden', 'false');
        if (window.__i18n) window.__i18n.apply(window.__i18n.current());

        const modal = root.querySelector('.game-modal');
        const canvas = root.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        canvas.style.touchAction = 'none';

        // DPR scaling: backing store at device pixels, logical CSS coords for games
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const W = Math.round(rect.width) || 360;
        const H = Math.round(rect.height) || 520;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const shell = {
            root: root, modal: modal, canvas: canvas, ctx: ctx,
            W: W, H: H, dpr: dpr,
            paused: false, gameOver: false,
            prevFocus: prevFocus, cleanups: []
        };

        // Warm the audio context (opening a game is a user gesture)
        soundCtx();

        const muteBtn = root.querySelector('.game-mute');
        function refreshMute() {
            muteBtn.textContent = gamesMuted() ? '🔇' : '🔊';
            muteBtn.setAttribute('aria-label', gamesMuted() ? t('game.unmute') : t('game.mute'));
        }
        refreshMute();
        muteBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            setGamesMuted(!gamesMuted());
            refreshMute();
        });

        const closeBtn = root.querySelector('.game-close');
        setTimeout(function () {
            try { closeBtn.focus(); } catch (e) { /* noop */ }
        }, 0);

        function showPauseOverlay() {
            if (modal.querySelector('.game-pause-overlay')) return;
            const ov = document.createElement('div');
            ov.className = 'game-pause-overlay';
            ov.innerHTML =
                '<div class="game-overlay-title">' + t('game.paused') + '</div>' +
                '<div class="game-overlay-sub">' + t('game.resume_hint') + '</div>';
            ov.addEventListener('click', function () { shell.setPaused(false); });
            modal.appendChild(ov);
        }
        function hidePauseOverlay() {
            const ov = modal.querySelector('.game-pause-overlay');
            if (ov) ov.remove();
        }
        shell.setPaused = function (v) {
            if (shell.gameOver) return;
            if (shell.paused === v) return;
            shell.paused = v;
            if (v) showPauseOverlay();
            else hidePauseOverlay();
        };

        shell.showGameOver = function (opts) {
            shell.gameOver = true;
            hidePauseOverlay();
            const old = modal.querySelector('.game-over-overlay');
            if (old) old.remove();
            const ov = document.createElement('div');
            ov.className = 'game-over-overlay';
            let html = '<div class="game-overlay-title">' + opts.title + '</div>';
            if (opts.isRecord) html += '<div class="game-record">' + t('game.new_record') + '</div>';
            if (opts.score != null) html += '<div class="game-overlay-score">' + t('game.score_final') + ': ' + opts.score + '</div>';
            if (opts.best != null) html += '<div class="game-overlay-best">' + t('game.best') + ': ' + opts.best + '</div>';
            if (opts.extraHTML) html += opts.extraHTML;
            html += '<div class="game-overlay-actions">' +
                        '<button class="game-btn game-btn-primary" type="button" data-restart>' + t('game.restart') + '</button>' +
                        '<button class="game-btn" type="button" data-close-game>' + t('game.close') + '</button>' +
                    '</div>';
            ov.innerHTML = html;
            ov.querySelector('[data-restart]').addEventListener('click', function (e) {
                e.stopPropagation();
                shell.hideGameOver();
                if (opts.onRestart) opts.onRestart();
            });
            ov.querySelector('[data-close-game]').addEventListener('click', function (e) {
                e.stopPropagation();
                if (opts.onClose) opts.onClose();
                else closeGame();
            });
            if (opts.tapToRestart) {
                ov.addEventListener('click', function (e) {
                    if (e.target.closest('button')) return;
                    shell.hideGameOver();
                    if (opts.onRestart) opts.onRestart();
                });
            }
            modal.appendChild(ov);
            setTimeout(function () {
                const b = ov.querySelector('[data-restart]');
                if (b) { try { b.focus(); } catch (e) { /* noop */ } }
            }, 50);
        };
        shell.hideGameOver = function () {
            shell.gameOver = false;
            const ov = modal.querySelector('.game-over-overlay');
            if (ov) ov.remove();
        };

        // Auto-pause when the tab is hidden; resume only via click/key
        function onVisibility() {
            if (document.hidden) shell.setPaused(true);
        }
        document.addEventListener('visibilitychange', onVisibility);
        shell.cleanups.push(function () { document.removeEventListener('visibilitychange', onVisibility); });

        // Tab trap + P (pause) + resume keys — capture so it runs before game handlers
        function onShellKey(e) {
            if (e.key === 'Tab') {
                const focusables = modal.querySelectorAll('button, [href], input, select, [tabindex]:not([tabindex="-1"])');
                if (!focusables.length) return;
                const first = focusables[0];
                const lastEl = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
                else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
                else if (!modal.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
                return;
            }
            if ((e.key === 'p' || e.key === 'P') && !shell.gameOver) {
                e.preventDefault();
                e.stopImmediatePropagation();
                shell.setPaused(!shell.paused);
                return;
            }
            if (shell.paused && (e.key === ' ' || e.key === 'Enter' || e.code === 'Space')) {
                e.preventDefault();
                e.stopImmediatePropagation();
                shell.setPaused(false);
            }
        }
        document.addEventListener('keydown', onShellKey, true);
        shell.cleanups.push(function () { document.removeEventListener('keydown', onShellKey, true); });

        currentShell = shell;
        return shell;
    }
    function closeGame() {
        const root = document.getElementById('game-root');
        if (!root) return;
        if (currentShell) {
            currentShell.cleanups.forEach(function (fn) {
                try { fn(); } catch (e) { /* noop */ }
            });
            const prev = currentShell.prevFocus;
            currentShell = null;
            if (prev && typeof prev.focus === 'function') {
                try { prev.focus(); } catch (e) { /* noop */ }
            }
        }
        root.classList.remove('is-open');
        root.setAttribute('aria-hidden', 'true');
        root.innerHTML = '';
    }
    function getAccent() {
        return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#fb923c';
    }

    function drawF1Car(ctx, x, y, w, h, color, isPlayer) {
        // Car body
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x + w * 0.5, y); // Nose tip
        ctx.bezierCurveTo(x + w * 0.5, y + h * 0.2, x, y + h * 0.1, x, y + h * 0.3);
        ctx.lineTo(x, y + h * 0.8);
        ctx.lineTo(x + w * 0.2, y + h);
        ctx.lineTo(x + w * 0.8, y + h);
        ctx.lineTo(x + w, y + h * 0.8);
        ctx.lineTo(x + w, y + h * 0.3);
        ctx.bezierCurveTo(x + w, y + h * 0.1, x + w * 0.5, y + h * 0.2, x + w * 0.5, y);
        ctx.closePath();
        ctx.fill();

        // Front wing
        ctx.fillStyle = '#222';
        ctx.beginPath();
        ctx.moveTo(x - w * 0.1, y + h * 0.25);
        ctx.lineTo(x + w * 1.1, y + h * 0.25);
        ctx.lineTo(x + w * 1.0, y + h * 0.4);
        ctx.lineTo(x + w * 0.0, y + h * 0.4);
        ctx.closePath();
        ctx.fill();

        // Rear wing
        ctx.fillRect(x - w * 0.15, y + h * 0.85, w * 1.3, h * 0.12);

        // Cockpit & Helmet
        ctx.fillStyle = '#222';
        ctx.beginPath();
        ctx.roundRect(x + w * 0.2, y + h * 0.3, w * 0.6, h * 0.4, 5);
        ctx.fill();
        if (isPlayer) {
            ctx.fillStyle = '#FFF';
            ctx.beginPath();
            ctx.arc(x + w * 0.5, y + h * 0.5, h * 0.08, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initF1Game() {
        function start() {
            const shell = makeGameShell('game.f1.title', 'game.controls');
            const root = shell.root;
            const canvas = shell.canvas;
            const ctx = shell.ctx;
            const W = shell.W, H = shell.H;
            const ROAD_X = 35;
            const ROAD_W = W - 70;
            const LANE_W = 48;
            const CAR_H = 70;
            const OBSTACLE_COLORS = ['#9aa0a6', '#ef4444', '#3b82f6', '#f59e0b', '#10b981'];

            function laneX(lane) {
                return ROAD_X + (ROAD_W / 4) * lane + ((ROAD_W / 4) - LANE_W) / 2;
            }

            let player = { lane: 1, x: 0, targetX: 0, y: H - 100, w: LANE_W, h: CAR_H };
            player.x = player.targetX = laneX(player.lane);
            let obstacles = [];
            let particles = [];
            let dashOffset = 0;
            let speed = 4;
            let score = 0;
            let alive = true;
            let last = 0;
            let rafId;
            let spawnTimer = 0;
            let shake = 0;
            let closeFlash = 0;
            let crashTimer = 0;
            let overlayShown = false;
            let isRecord = false;
            let lastLane = null;
            let ptr = null;
            let bestScore = parseInt(localStorage.getItem('f1_best_score') || '0', 10);

            function reset() {
                player.lane = 1;
                player.x = player.targetX = laneX(player.lane);
                obstacles = []; particles = [];
                speed = 4; score = 0; alive = true;
                spawnTimer = 0; shake = 0; closeFlash = 0;
                crashTimer = 0; overlayShown = false; isRecord = false;
                lastLane = null; last = 0;
            }
            function saveBest() {
                if (Math.floor(score) > bestScore) {
                    bestScore = Math.floor(score);
                    try { localStorage.setItem('f1_best_score', bestScore); } catch (e) { /* noop */ }
                    return true;
                }
                return false;
            }
            function spawnInterval() {
                return Math.max(420, 900 - score / 10);
            }
            function spawn() {
                // Fairness: never double-stack a lane that just spawned and, when the
                // interval is short, keep the new lane reachable (<= 2 lanes away)
                const interval = spawnInterval();
                const recent = obstacles.filter(function (o) { return o.y < CAR_H * 1.6; });
                const candidates = [];
                for (let l = 0; l < 4; l++) {
                    let blocked = false;
                    for (let i = 0; i < recent.length; i++) {
                        if (recent[i].lane === l) { blocked = true; break; }
                    }
                    if (blocked) continue;
                    if (interval < 560 && lastLane != null && Math.abs(l - lastLane) > 2) continue;
                    candidates.push(l);
                }
                if (!candidates.length) return; // guarantees there is always a path
                const lane = candidates[Math.floor(Math.random() * candidates.length)];
                const color = OBSTACLE_COLORS[Math.floor(Math.random() * OBSTACLE_COLORS.length)];
                obstacles.push({
                    x: laneX(lane), y: -CAR_H, w: LANE_W, h: CAR_H,
                    lane: lane, color: color,
                    rel: 0.5 + Math.random() * 0.4, // traffic has its own speed — you overtake it
                    nearMiss: false, scored: false
                });
                lastLane = lane;
            }
            function spawnCrashParticles(cx, cy) {
                const n = REDUCED_MOTION ? 8 : 26;
                for (let i = 0; i < n; i++) {
                    const a = Math.random() * Math.PI * 2;
                    const sp = 1 + Math.random() * 4;
                    particles.push({
                        x: cx, y: cy,
                        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1,
                        life: 400 + Math.random() * 400,
                        color: ['#ffc107', '#ff5722', '#f44336', '#ffffff'][Math.floor(Math.random() * 4)]
                    });
                }
            }
            function moveLane(dir) {
                if (!alive) return;
                const next = Math.max(0, Math.min(3, player.lane + dir));
                if (next === player.lane) return;
                player.lane = next;
                player.targetX = laneX(next);
                blip(500, 0.04);
            }
            function hitTest(o) {
                const m = LANE_W * 0.2; // 20% mercy margin, on RENDERED positions
                return player.x + m < o.x + o.w - m &&
                       player.x + player.w - m > o.x + m &&
                       player.y + 4 < o.y + o.h &&
                       player.y + player.h - 4 > o.y;
            }
            function die() {
                alive = false;
                crashTimer = 0;
                overlayShown = false;
                shake = 14;
                spawnCrashParticles(player.x + player.w / 2, player.y + player.h / 2);
                noise(0.4);
                isRecord = saveBest();
            }
            function updateParticles(step, dt) {
                for (let i = particles.length - 1; i >= 0; i--) {
                    const pt = particles[i];
                    pt.x += pt.vx * step;
                    pt.y += pt.vy * step;
                    pt.vy += 0.06 * step;
                    pt.life -= dt;
                    if (pt.life <= 0) particles.splice(i, 1);
                }
            }
            function update(dt) {
                const step = dt / 16.67;
                shake *= Math.pow(0.88, step);
                if (closeFlash > 0) closeFlash -= dt;

                if (!alive) {
                    crashTimer += dt;
                    if (crashTimer < 80) return; // freeze-frame
                    updateParticles(step, dt);
                    if (crashTimer > 950 && !overlayShown) {
                        overlayShown = true;
                        shell.showGameOver({
                            title: t('game.f1.over'),
                            score: Math.floor(score),
                            best: bestScore,
                            isRecord: isRecord,
                            tapToRestart: true,
                            onRestart: restart,
                            onClose: stop
                        });
                    }
                    return;
                }

                dashOffset = (dashOffset + speed * step) % 80;
                player.x += (player.targetX - player.x) * (1 - Math.pow(0.75, step));
                spawnTimer += dt;
                if (spawnTimer > spawnInterval()) { spawn(); spawnTimer = 0; }

                // keep same-lane traffic from overlapping (car behind matches the slower one)
                for (let i = 0; i < obstacles.length; i++) {
                    for (let j = 0; j < obstacles.length; j++) {
                        if (i === j) continue;
                        const a = obstacles[i], b = obstacles[j];
                        if (a.lane === b.lane && a.y < b.y && b.y - a.y < CAR_H + 14 && a.rel > b.rel) a.rel = b.rel;
                    }
                }

                for (let i = obstacles.length - 1; i >= 0; i--) {
                    const o = obstacles[i];
                    o.y += speed * o.rel * step;
                    if (o.y > H + 100) { obstacles.splice(i, 1); continue; }

                    const yOverlap = player.y < o.y + o.h && player.y + player.h > o.y;
                    if (yOverlap) {
                        if (hitTest(o)) { die(); return; }
                        const hgap = Math.max(o.x - (player.x + player.w), player.x - (o.x + o.w));
                        if (hgap < 14) o.nearMiss = true;
                    } else if (!o.scored && o.nearMiss && o.y > player.y + player.h) {
                        o.scored = true;
                        score += 25;
                        closeFlash = 700;
                        blip(1400, 0.07);
                    }
                }

                updateParticles(step, dt);
                score += dt * 0.05;
                speed = Math.min(12, 4 + score / 300);
            }
            function draw() {
                ctx.setTransform(shell.dpr, 0, 0, shell.dpr, 0, 0);
                applyShake(ctx, shake);
                ctx.fillStyle = '#14171c';
                ctx.fillRect(-10, -10, W + 20, H + 20);
                // grass
                ctx.fillStyle = '#1a2a1a';
                ctx.fillRect(0, 0, ROAD_X, H);
                ctx.fillRect(W - ROAD_X, 0, ROAD_X, H);
                // kerbs
                for (let i = 0; i < H / 20 + 1; i++) {
                    const y = (i * 20 - (dashOffset / 2)) % H;
                    ctx.fillStyle = i % 2 === 0 ? '#dc2626' : '#fff';
                    ctx.fillRect(ROAD_X - 10, y, 10, 10);
                    ctx.fillRect(W - ROAD_X, y, 10, 10);
                }
                // road
                ctx.fillStyle = '#2a2a2a';
                ctx.fillRect(ROAD_X, 0, ROAD_W, H);
                // finish line
                for (let i = 0; i < 2; i++) {
                    for (let j = 0; j < 4; j++) {
                        ctx.fillStyle = (i + j) % 2 === 0 ? '#fff' : '#000';
                        ctx.fillRect(ROAD_X + j * (ROAD_W / 4), H - 140 + i * 10, ROAD_W / 4, 10);
                    }
                }
                // lane markers
                ctx.strokeStyle = '#ffffff66';
                ctx.lineWidth = 3;
                ctx.setLineDash([20, 20]);
                ctx.lineDashOffset = -dashOffset;
                for (let i = 1; i < 4; i++) {
                    const x = ROAD_X + (ROAD_W / 4) * i;
                    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
                }
                ctx.setLineDash([]);
                // obstacles
                obstacles.forEach(function (o) {
                    drawF1Car(ctx, o.x, o.y, o.w, o.h, o.color, false);
                });
                // player (blinks after crash, before the overlay)
                const blink = !alive && Math.floor(crashTimer / 110) % 2 === 1;
                if (!blink) drawF1Car(ctx, player.x, player.y, player.w, player.h, getAccent(), true);
                // particles
                particles.forEach(function (pt) {
                    ctx.globalAlpha = Math.max(0, Math.min(1, pt.life / 400));
                    ctx.fillStyle = pt.color;
                    ctx.fillRect(pt.x, pt.y, 3, 3);
                });
                ctx.globalAlpha = 1;
                // HUD
                ctx.fillStyle = '#fff';
                ctx.font = '600 13px ui-monospace, Menlo, monospace';
                ctx.textAlign = 'left';
                ctx.fillText(t('game.f1.score') + ': ' + Math.floor(score), 12, 26);
                ctx.textAlign = 'center';
                ctx.fillText('BEST: ' + bestScore, W / 2, 26);
                ctx.textAlign = 'right';
                ctx.fillText(Math.round(speed * 25) + ' KPH', W - 12, 26);
                ctx.textAlign = 'left';
                // near-miss flash
                if (closeFlash > 0) {
                    ctx.globalAlpha = Math.min(1, closeFlash / 400);
                    ctx.fillStyle = '#ffd166';
                    ctx.font = '800 18px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(t('game.f1.near_miss'), W / 2, player.y - 30);
                    ctx.textAlign = 'left';
                    ctx.globalAlpha = 1;
                }
            }
            function tick(now) {
                rafId = requestAnimationFrame(tick);
                if (shell.paused) { last = 0; return; }
                const dt = Math.min(last ? now - last : 16, 50);
                last = now;
                update(dt);
                draw();
            }
            function restart() {
                shell.hideGameOver();
                reset();
            }
            function onKey(e) {
                if (e.key === 'Escape') { stop(); return; }
                if (e.key.toLowerCase() === 'r') { restart(); return; }
                if (shell.paused || !alive) return;
                if (e.key === 'ArrowLeft') { e.preventDefault(); moveLane(-1); }
                else if (e.key === 'ArrowRight') { e.preventDefault(); moveLane(1); }
            }
            function onPointerDown(e) {
                e.preventDefault();
                ptr = { x: e.clientX };
            }
            function onPointerUp(e) {
                if (!ptr) return;
                const dx = e.clientX - ptr.x;
                ptr = null;
                if (shell.paused || !alive) return;
                if (Math.abs(dx) > 24) {
                    moveLane(dx > 0 ? 1 : -1); // swipe
                } else {
                    const r = canvas.getBoundingClientRect();
                    moveLane((e.clientX - r.left) < r.width / 2 ? -1 : 1); // tap halves
                }
            }
            function onClose(e) {
                if (e.target.hasAttribute('data-close') || e.target.classList.contains('game-backdrop') || e.target.classList.contains('game-close')) stop();
            }
            function stop() {
                cancelAnimationFrame(rafId);
                saveBest(); // also persist best score when closing the game
                document.removeEventListener('keydown', onKey);
                canvas.removeEventListener('pointerdown', onPointerDown);
                canvas.removeEventListener('pointerup', onPointerUp);
                root.removeEventListener('click', onClose);
                closeGame();
            }
            document.addEventListener('keydown', onKey);
            canvas.addEventListener('pointerdown', onPointerDown);
            canvas.addEventListener('pointerup', onPointerUp);
            root.addEventListener('click', onClose);
            rafId = requestAnimationFrame(tick);
        }
        return start;
    }

    /* ============================================================
       9. Flappy Corporate game
       ============================================================ */
    function initFlappyGame() {
        const NAMES = ['FAtDonalds', 'StarSucks', 'Bang of America', 'MetAfterlife',
                       'GoogleAt', 'AppleByte', 'AmaZone', 'MicroHard',
                       'NewtFlux', 'AbnB', 'UperBank', 'Spoutify',
                       'X (formerly Y)', 'Slacker', 'Salesfarce', 'Twatter', 'OpenSesame'];

        function start() {
            const shell = makeGameShell('game.flappy.title', 'game.flappy.controls');
            const root = shell.root;
            const ctx = shell.ctx;
            const W = shell.W, H = shell.H;
            const PIPE_W = 80;
            shell.modal.style.touchAction = 'none';

            const gravity = 0.35;
            const jump = -6.5;
            let bird = { x: 80, y: H / 2, vy: 0, r: 14, rot: 0 };
            let pipes = [];
            let score = 0;
            let alive = true;
            let started = false;
            let rafId;
            let last = 0;
            let spawnTimer = 0;
            let deathTimer = 0;
            let overlayShown = false;
            let isRecord = false;
            let flapT = 0;
            let scorePop = 0;
            let shake = 0;
            let best = parseInt(localStorage.getItem('flappy_best_score') || '0', 10);

            // Progressive difficulty
            function curGap() { return Math.max(140, 180 - score * 0.8); }
            function curSpeed() { return Math.min(2.8, 1.8 + score * 0.02); }
            function curSpawn() { return Math.max(1300, 1800 - score * 8); }

            function reset() {
                bird = { x: 80, y: H / 2, vy: 0, r: 14, rot: 0 };
                pipes = []; score = 0; alive = true; started = false;
                spawnTimer = 0; deathTimer = 0; overlayShown = false; isRecord = false;
                flapT = 0; scorePop = 0; shake = 0; last = 0;
            }
            function spawn() {
                const gap = curGap();
                const minTop = 60, maxTop = H - gap - 100;
                const topH = minTop + Math.random() * (maxTop - minTop);
                const name = NAMES[Math.floor(Math.random() * NAMES.length)];
                pipes.push({ x: W, topH: topH, gap: gap, name: name, passed: false, windowSeed: Math.random() });
            }
            function die() {
                if (!alive) return;
                alive = false;
                deathTimer = 0;
                shake = 9;
                noise(0.3);
                if (score > best) {
                    best = score;
                    isRecord = true;
                    try { localStorage.setItem('flappy_best_score', best); } catch (e) { /* noop */ }
                }
            }
            function medalHTML() {
                let medal = null;
                if (score >= 50) medal = '🥇 ' + t('game.flappy.medal_gold');
                else if (score >= 25) medal = '🥈 ' + t('game.flappy.medal_silver');
                else if (score >= 10) medal = '🥉 ' + t('game.flappy.medal_bronze');
                return medal ? '<div class="game-medal">' + medal + '</div>' : '';
            }
            function update(dt) {
                const step = dt / 16.67;
                shake *= Math.pow(0.88, step);
                if (flapT > 0) flapT = Math.max(0, flapT - dt / 140);
                if (scorePop > 0) scorePop = Math.max(0, scorePop - dt / 250);
                if (!started) return;

                bird.vy += gravity * step;
                bird.y += bird.vy * step;

                if (alive) {
                    // nose up when rising, nose dive when falling
                    const target = Math.max(-0.45, Math.min(1.25, bird.vy * 0.06));
                    bird.rot += (target - bird.rot) * Math.min(1, 0.25 * step);
                } else {
                    bird.rot += 0.18 * step; // death tumble
                    deathTimer += dt;
                    if (deathTimer > 800 && !overlayShown) {
                        overlayShown = true;
                        shell.showGameOver({
                            title: t('game.flappy.over'),
                            score: score,
                            best: best,
                            isRecord: isRecord,
                            extraHTML: medalHTML(),
                            tapToRestart: true,
                            onRestart: restart,
                            onClose: stop
                        });
                    }
                }

                if (bird.y + bird.r > H - 20) { // Ground collision
                    bird.y = H - 20 - bird.r;
                    bird.vy = 0;
                    die();
                }
                if (bird.y - bird.r < 0) { // Ceiling collision
                    bird.y = bird.r;
                    bird.vy = 0;
                }

                if (!alive) return;

                spawnTimer += dt;
                if (spawnTimer > curSpawn()) { spawn(); spawnTimer = 0; }
                const sp = curSpeed();
                pipes.forEach(function (p) { p.x -= sp * step; });
                pipes = pipes.filter(function (p) { return p.x > -140; });

                pipes.forEach(function (p) {
                    if (p.x < bird.x + bird.r && p.x + PIPE_W > bird.x - bird.r) {
                        if (bird.y - bird.r < p.topH || bird.y + bird.r > p.topH + p.gap) die();
                    }
                    if (!p.passed && p.x + PIPE_W < bird.x) {
                        p.passed = true;
                        score++;
                        scorePop = 1;
                        sweep(880, 1320, 0.1);
                    }
                });
            }
            function drawPipe(p) {
                // Building body
                ctx.fillStyle = '#2c3e50';
                ctx.fillRect(p.x, 0, PIPE_W, p.topH);
                ctx.fillRect(p.x, p.topH + p.gap, PIPE_W, H - p.topH - p.gap);
                // Building top/bottom caps
                ctx.fillStyle = '#233140';
                ctx.fillRect(p.x - 5, p.topH - 10, PIPE_W + 10, 10);
                ctx.fillRect(p.x - 5, p.topH + p.gap, PIPE_W + 10, 10);

                // Windows
                for (let yy = p.topH - 30; yy > 10; yy -= 30) {
                    for (let xx = 0; xx < 2; xx++) {
                        if (Math.sin(p.windowSeed * yy + xx) > 0.3) {
                            ctx.fillStyle = '#f1c40f'; // Lit window
                            ctx.fillRect(p.x + 15 + xx * 35, yy, 15, 15);
                        }
                    }
                }
                for (let yy = p.topH + p.gap + 20; yy < H - 30; yy += 30) {
                    for (let xx = 0; xx < 2; xx++) {
                        if (Math.sin(p.windowSeed * yy + xx) > 0.3) {
                            ctx.fillStyle = '#f1c40f'; // Lit window
                            ctx.fillRect(p.x + 15 + xx * 35, yy, 15, 15);
                        }
                    }
                }

                // Company sign mounted at the lower edge of the top building
                // (out of the flight corridor — the gap stays readable)
                const signH = 18;
                const signY = p.topH - 10 - signH - 2;
                ctx.fillStyle = 'rgba(231,76,60,0.95)';
                ctx.fillRect(p.x + 2, signY, PIPE_W - 4, signH);
                ctx.fillStyle = '#c0392b';
                ctx.fillRect(p.x + 2, signY + signH - 3, PIPE_W - 4, 3);
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 10px "Google Sans", sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                let label = p.name;
                if (ctx.measureText(label).width > PIPE_W - 10) {
                    while (label.length > 3 && ctx.measureText(label + '…').width > PIPE_W - 10) {
                        label = label.slice(0, -1);
                    }
                    label += '…';
                }
                ctx.fillText(label, p.x + PIPE_W / 2, signY + signH / 2);
                ctx.textBaseline = 'alphabetic';
            }
            function skyColor(f, top) {
                const day = top ? [52, 152, 219] : [135, 206, 235];
                const night = top ? [11, 23, 48] : [42, 56, 84];
                const r = Math.round(day[0] + (night[0] - day[0]) * f);
                const g = Math.round(day[1] + (night[1] - day[1]) * f);
                const b = Math.round(day[2] + (night[2] - day[2]) * f);
                return 'rgb(' + r + ',' + g + ',' + b + ')';
            }
            function draw() {
                ctx.setTransform(shell.dpr, 0, 0, shell.dpr, 0, 0);
                applyShake(ctx, shake);
                // Sky darkens gradually (~ every 25 points)
                const f = Math.min(0.85, (score / 25) * 0.2);
                const sky = ctx.createLinearGradient(0, 0, 0, H);
                sky.addColorStop(0, skyColor(f, true));
                sky.addColorStop(1, skyColor(f, false));
                ctx.fillStyle = sky;
                ctx.fillRect(-10, -10, W + 20, H + 20);
                pipes.forEach(drawPipe);
                // Ground
                ctx.fillStyle = '#27ae60';
                ctx.fillRect(0, H - 20, W, 20);
                ctx.fillStyle = '#2ecc71';
                ctx.fillRect(0, H - 20, W, 8);

                // Bird (rotation + flap squash)
                ctx.save();
                ctx.translate(bird.x, bird.y);
                ctx.rotate(bird.rot);
                const sq = REDUCED_MOTION ? 0 : flapT;
                ctx.scale(1 + 0.25 * sq, 1 - 0.3 * sq);
                ctx.fillStyle = getAccent();
                ctx.beginPath(); ctx.arc(0, 0, bird.r, 0, Math.PI * 2); ctx.fill();
                // Beak
                ctx.fillStyle = '#f1c40f';
                ctx.beginPath();
                ctx.moveTo(bird.r - 2, -2); ctx.lineTo(bird.r + 8, 2); ctx.lineTo(bird.r - 2, 5);
                ctx.closePath(); ctx.fill();
                // Eye
                ctx.fillStyle = '#fff';
                ctx.beginPath(); ctx.arc(4, -4, 4, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#000';
                ctx.beginPath(); ctx.arc(5, -4, 2, 0, Math.PI * 2); ctx.fill();
                ctx.restore();

                // Score + best
                const pop = REDUCED_MOTION ? 0 : scorePop;
                ctx.fillStyle = '#fff';
                ctx.font = '700 ' + Math.round(32 + pop * 10) + 'px "Google Sans", sans-serif';
                ctx.textAlign = 'center';
                ctx.strokeStyle = 'rgba(0,0,0,0.4)';
                ctx.lineWidth = 4;
                ctx.strokeText(score, W / 2, 50);
                ctx.fillText(score, W / 2, 50);
                ctx.font = '600 12px ui-monospace, Menlo, monospace';
                ctx.fillText('BEST: ' + best, W / 2, 70);
                ctx.textAlign = 'left';

                if (!started && alive) {
                    ctx.fillStyle = 'rgba(0,0,0,0.6)';
                    ctx.fillRect(0, H / 2 - 40, W, 80);
                    ctx.fillStyle = '#fff';
                    ctx.font = '600 18px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(t('game.flappy.start'), W / 2, H / 2);
                    ctx.textAlign = 'left';
                }
            }
            function tick(now) {
                rafId = requestAnimationFrame(tick);
                if (shell.paused) { last = 0; return; }
                const dt = Math.min(last ? now - last : 16, 50);
                last = now;
                update(dt);
                draw();
            }
            function flap() {
                if (!alive || shell.paused || shell.gameOver) return;
                if (!started) started = true;
                bird.vy = jump;
                flapT = 1;
                blip(600, 0.06);
            }
            function restart() {
                shell.hideGameOver();
                reset();
            }
            function onKey(e) {
                if (e.key === 'Escape') { stop(); return; }
                if (e.key.toLowerCase() === 'r') { restart(); return; }
                if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); flap(); }
            }
            function onPointerDown(e) {
                // whole modal flaps (pointerdown = no click latency); buttons/overlays excluded
                if (e.target.closest('button') || e.target.closest('.game-over-overlay') || e.target.closest('.game-pause-overlay')) return;
                e.preventDefault();
                flap();
            }
            function onRootClick(e) {
                if (e.target.hasAttribute('data-close') || e.target.classList.contains('game-backdrop') || e.target.classList.contains('game-close')) stop();
            }
            function stop() {
                cancelAnimationFrame(rafId);
                if (score > best) {
                    try { localStorage.setItem('flappy_best_score', score); } catch (e) { /* noop */ }
                }
                document.removeEventListener('keydown', onKey);
                shell.modal.removeEventListener('pointerdown', onPointerDown);
                root.removeEventListener('click', onRootClick);
                closeGame();
            }
            document.addEventListener('keydown', onKey);
            shell.modal.addEventListener('pointerdown', onPointerDown);
            root.addEventListener('click', onRootClick);
            rafId = requestAnimationFrame(tick);
        }
        return start;
    }

    /* ============================================================
       10. Worms-like Artillery game
       ============================================================ */
    function initWormsGame() {
        function start() {
            const shell = makeGameShell('game.worms.title', 'game.worms.controls');
            const root = shell.root;
            const canvas = shell.canvas;
            const ctx = shell.ctx;
            const W = shell.W, H = shell.H;

            let terrain = [];
            let players = [];
            let projectile = null;
            let particles = [];
            let turn = 0;
            let keys = {};
            let power = 0;
            let charging = false;
            let wind = (Math.random() - 0.5) * 0.05;
            let winner = null;
            let winTimer = 0;
            let overlayShown = false;
            let shake = 0;
            let rafId;
            let last = 0;
            let mode = null; // 'cpu' | '2p' — chosen on the start overlay
            let aim = null;  // touch slingshot state
            let touchMove = 0;
            let chargeBlipAcc = 0;
            let cpuError = 80;
            let cpu = { phase: 'idle', timer: 0, fromAngle: 0, target: null };
            let turnTimeout = null;
            let stopped = false;

            function isCpuTurn() { return mode === 'cpu' && turn === 1; }

            function generateTerrain() {
                terrain = [];
                let y = H * 0.7;
                for (let x = 0; x < W; x++) {
                    y += (Math.random() - 0.5) * 1.5;
                    y = Math.max(H * 0.5, Math.min(H - 20, y));
                    terrain.push(y);
                }
            }

            function createExplosion(x, y) {
                const n = REDUCED_MOTION ? 10 : 30;
                for (let i = 0; i < n; i++) {
                    particles.push({
                        x: x, y: y,
                        vx: (Math.random() - 0.5) * 6,
                        vy: (Math.random() - 0.5) * 6,
                        life: 50 + Math.random() * 50,
                        color: ['#ffc107', '#ff9800', '#f44336'][Math.floor(Math.random() * 3)]
                    });
                }
            }

            function reset() {
                generateTerrain();
                winner = null; winTimer = 0; overlayShown = false;
                turn = 0; keys = {}; charging = false; power = 0;
                projectile = null; particles = []; aim = null; touchMove = 0;
                cpuError = 80;
                cpu = { phase: 'idle', timer: 0, fromAngle: 0, target: null };
                wind = (Math.random() - 0.5) * 0.05;
                if (turnTimeout) { clearTimeout(turnTimeout); turnTimeout = null; }
                players = [
                    { x: 50, y: 0, angle: 45, hp: 100, color: '#3498db', dir: 1, hitFlash: 0 },
                    { x: W - 50, y: 0, angle: 135, hp: 100, color: '#e74c3c', dir: -1, hitFlash: 0 }
                ];
                players.forEach(function (p) {
                    p.y = terrain[Math.round(p.x)] - 10;
                });
                last = 0;
            }

            // Angle convention: degrees from +x axis, 0 = right, 90 = up, 180 = left
            function fire() {
                if (projectile) return;
                const p = players[turn];
                const a = p.angle * Math.PI / 180;
                const sp = Math.max(8, power) * 0.12;
                projectile = {
                    x: p.x + Math.cos(a) * 16,
                    y: p.y - 10 - Math.sin(a) * 16,
                    vx: Math.cos(a) * sp,
                    vy: -Math.sin(a) * sp
                };
                sweep(200, 80, 0.2);
                power = 0;
                charging = false;
            }

            function explodeAt(ix, iy, directHit) {
                createExplosion(ix, iy);
                noise(0.5);
                shake = 10;
                const radius = 25;
                for (let i = -radius; i <= radius; i++) {
                    const idx = Math.round(ix) + i;
                    if (idx >= 0 && idx < W) {
                        const dist = Math.abs(i);
                        const craterDepth = (radius - dist) * 1.2;
                        terrain[idx] = Math.min(H - 5, terrain[idx] + craterDepth);
                    }
                }
                players.forEach(function (pl) {
                    let dmg = 0;
                    const dist = Math.hypot(pl.x - ix, pl.y - iy);
                    if (dist < radius * 1.8) dmg += Math.max(0, Math.floor(50 * (1 - dist / (radius * 1.8))));
                    if (pl === directHit) dmg += 30; // direct hit bonus damage
                    if (dmg > 0) {
                        pl.hp = Math.max(0, pl.hp - dmg);
                        pl.hitFlash = 400;
                    }
                });
            }

            function nextTurn() {
                if (stopped || winner !== null) return;
                turn = (turn + 1) % 2;
                wind = (Math.random() - 0.5) * 0.05;
                keys = {};
                charging = false;
                power = 0;
                aim = null;
                if (isCpuTurn()) { cpu.phase = 'wait'; cpu.timer = 0; }
            }
            function scheduleNextTurn() {
                if (turnTimeout) clearTimeout(turnTimeout);
                turnTimeout = setTimeout(nextTurn, 1000);
            }

            // ---- CPU: bracketing search with decaying noise (it "learns") ----
            function simulateShot(px, py, angleDeg, pw) {
                const a = angleDeg * Math.PI / 180;
                const sp = pw * 0.12;
                let x = px + Math.cos(a) * 16;
                let y = py - 10 - Math.sin(a) * 16;
                let vx = Math.cos(a) * sp;
                let vy = -Math.sin(a) * sp;
                for (let i = 0; i < 600; i++) {
                    vx += wind; vy += 0.15; x += vx; y += vy;
                    if (x < 0 || x >= W) return x;
                    if (y > terrain[Math.round(x)]) return x;
                }
                return x;
            }
            function cpuComputeShot() {
                const me = players[1];
                const targetX = players[0].x + (Math.random() - 0.5) * 2 * cpuError;
                const angles = targetX < me.x ? [110, 120, 130, 140, 150] : [30, 40, 50, 60, 70];
                let best = { angle: 135, power: 50, diff: Infinity };
                for (let ai = 0; ai < angles.length; ai++) {
                    for (let pw = 20; pw <= 100; pw += 4) {
                        const ix = simulateShot(me.x, me.y, angles[ai], pw);
                        const diff = Math.abs(ix - targetX);
                        if (diff < best.diff) best = { angle: angles[ai], power: pw, diff: diff };
                    }
                }
                cpuError *= 0.6; // error shrinks ~40% per turn
                return best;
            }

            function chargeBlip(dt) {
                chargeBlipAcc += dt;
                if (chargeBlipAcc > 90) {
                    chargeBlipAcc = 0;
                    blip(220 + power * 8, 0.03);
                }
            }

            function update(dt) {
                const step = dt / 16.67;
                shake *= Math.pow(0.88, step);
                players.forEach(function (p) {
                    if (p.hitFlash > 0) p.hitFlash -= dt;
                    p.y = terrain[Math.max(0, Math.min(W - 1, Math.round(p.x)))] - 10;
                });

                for (let i = particles.length - 1; i >= 0; i--) {
                    const pt = particles[i];
                    pt.x += pt.vx * step;
                    pt.y += pt.vy * step;
                    pt.life -= step;
                    if (pt.life <= 0) particles.splice(i, 1);
                }

                if (winner !== null) {
                    winTimer += dt;
                    if (winTimer > 800 && !overlayShown) {
                        overlayShown = true;
                        let title;
                        if (mode === 'cpu') title = winner === 0 ? t('game.worms.win_you') : t('game.worms.win_cpu');
                        else title = t('game.worms.player') + ' ' + (winner + 1) + ' ' + t('game.worms.wins');
                        shell.showGameOver({
                            title: title,
                            onRestart: restart,
                            onClose: stop
                        });
                    }
                    return;
                }
                if (!mode) return; // waiting for mode selection

                const p = players[turn];

                if (!isCpuTurn() && !projectile) {
                    const mv = (keys['ArrowLeft'] ? -1 : 0) + (keys['ArrowRight'] ? 1 : 0) + touchMove;
                    if (mv) p.x = Math.max(10, Math.min(W - 10, p.x + mv * step));
                    if (keys['ArrowUp']) p.angle = p.dir === 1 ? Math.min(90, p.angle + step) : Math.max(90, p.angle - step);
                    if (keys['ArrowDown']) p.angle = p.dir === 1 ? Math.max(0, p.angle - step) : Math.min(180, p.angle + step);
                    if (charging) {
                        power = Math.min(100, power + dt * 0.1);
                        chargeBlip(dt);
                    }
                }

                // CPU brain: wait → telegraph aim (~700ms) → charge → fire
                if (isCpuTurn() && !projectile) {
                    cpu.timer += dt;
                    if (cpu.phase === 'wait' && cpu.timer > 600) {
                        cpu.target = cpuComputeShot();
                        cpu.fromAngle = p.angle;
                        cpu.phase = 'aim';
                        cpu.timer = 0;
                    } else if (cpu.phase === 'aim' && cpu.target) {
                        const k = Math.min(1, cpu.timer / 700);
                        p.angle = cpu.fromAngle + (cpu.target.angle - cpu.fromAngle) * k;
                        if (k >= 1) { cpu.phase = 'charge'; cpu.timer = 0; power = 0; }
                    } else if (cpu.phase === 'charge' && cpu.target) {
                        power = Math.min(cpu.target.power, power + dt * 0.12);
                        chargeBlip(dt);
                        if (power >= cpu.target.power) {
                            cpu.phase = 'idle';
                            fire();
                        }
                    }
                }

                if (projectile) {
                    projectile.vx += wind;
                    projectile.vy += 0.15; // gravity
                    projectile.x += projectile.vx;
                    projectile.y += projectile.vy;

                    // direct hit on a tank
                    let direct = null;
                    for (let i = 0; i < players.length; i++) {
                        const pl = players[i];
                        if (Math.hypot(pl.x - projectile.x, (pl.y - 4) - projectile.y) < 16) { direct = pl; break; }
                    }
                    if (direct) {
                        explodeAt(projectile.x, projectile.y, direct);
                        projectile = null;
                        scheduleNextTurn();
                    } else if (projectile.x < 0 || projectile.x >= W) {
                        projectile = null;
                        scheduleNextTurn();
                    } else if (projectile.y > terrain[Math.round(projectile.x)]) {
                        explodeAt(projectile.x, projectile.y, null);
                        projectile = null;
                        scheduleNextTurn();
                    }
                }

                if (players[0].hp <= 0 && winner === null) winner = 1;
                else if (players[1].hp <= 0 && winner === null) winner = 0;
            }

            function drawTank(p, active) {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.fillStyle = p.color;
                // Body
                ctx.beginPath();
                ctx.roundRect(-12, -8, 24, 12, 4);
                ctx.fill();
                // Tracks
                ctx.fillStyle = '#555';
                ctx.fillRect(-14, 4, 28, 5);
                // Turret (0° = right, 90° = up)
                ctx.rotate((90 - p.angle) * Math.PI / 180);
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.roundRect(-5, -18, 10, 20, 3);
                ctx.fill();
                ctx.fillStyle = '#444';
                ctx.fillRect(-2, -28, 4, 10);
                ctx.restore();

                // Hit flash
                if (p.hitFlash > 0 && Math.floor(p.hitFlash / 80) % 2 === 0) {
                    ctx.save();
                    ctx.globalAlpha = 0.5;
                    ctx.fillStyle = '#fff';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y - 4, 18, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }

                // HP bar + number
                ctx.fillStyle = '#333';
                ctx.fillRect(p.x - 16, p.y - 30, 32, 7);
                ctx.fillStyle = p.hp > 40 ? '#2ecc71' : '#e74c3c';
                ctx.fillRect(p.x - 15, p.y - 29, (p.hp / 100) * 30, 5);
                ctx.fillStyle = 'rgba(0,0,0,0.75)';
                ctx.font = '700 10px ui-monospace, Menlo, monospace';
                ctx.textAlign = 'center';
                ctx.fillText(p.hp, p.x, p.y - 34);

                // Active player marker
                if (active && winner === null) {
                    ctx.fillStyle = '#fff';
                    ctx.beginPath();
                    ctx.moveTo(p.x - 5, p.y - 50);
                    ctx.lineTo(p.x + 5, p.y - 50);
                    ctx.lineTo(p.x, p.y - 43);
                    ctx.closePath();
                    ctx.fill();
                }
            }

            // Visible power bar above the active tank (green → yellow → red)
            function drawPowerBar(p) {
                const bw = 52, bh = 8;
                const bx = p.x - bw / 2;
                const by = Math.max(8, p.y - 62);
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fillRect(bx - 1, by - 1, bw + 2, bh + 2);
                const grad = ctx.createLinearGradient(bx, 0, bx + bw, 0);
                grad.addColorStop(0, '#2ecc71');
                grad.addColorStop(0.5, '#f1c40f');
                grad.addColorStop(1, '#e74c3c');
                ctx.fillStyle = grad;
                ctx.fillRect(bx, by, bw * (power / 100), bh);
            }

            // Wind flag with scale at the top
            function drawWindFlag() {
                const cx = W / 2, baseY = 30;
                ctx.strokeStyle = 'rgba(0,0,0,0.35)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(cx - 40, baseY); ctx.lineTo(cx + 40, baseY);
                for (let i = -4; i <= 4; i++) {
                    ctx.moveTo(cx + i * 10, baseY - (i % 2 === 0 ? 4 : 2));
                    ctx.lineTo(cx + i * 10, baseY);
                }
                ctx.stroke();
                ctx.strokeStyle = '#5d4037';
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(cx, baseY); ctx.lineTo(cx, baseY - 16); ctx.stroke();
                const len = (wind / 0.025) * 36; // signed length ∝ wind
                ctx.fillStyle = Math.abs(wind) > 0.017 ? '#e74c3c' : '#f1c40f';
                ctx.beginPath();
                ctx.moveTo(cx, baseY - 16);
                ctx.lineTo(cx + len, baseY - 12);
                ctx.lineTo(cx, baseY - 8);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.font = 'bold 11px "Google Sans", sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(t('game.worms.wind') + ' ' + Math.abs(wind * 100).toFixed(1), cx, baseY + 12);
            }

            // Trajectory preview — simulates the SAME physics (vx += wind, vy += 0.15)
            function drawPreview() {
                const p = players[turn];
                const a = p.angle * Math.PI / 180;
                const sp = Math.max(power, 12) * 0.12;
                let x = p.x + Math.cos(a) * 16;
                let y = p.y - 10 - Math.sin(a) * 16;
                let vx = Math.cos(a) * sp;
                let vy = -Math.sin(a) * sp;
                for (let i = 0; i < 40; i++) {
                    vx += wind; vy += 0.15; x += vx; y += vy;
                    if (x < 0 || x >= W) break;
                    if (y > terrain[Math.round(x)]) break;
                    if (i % 2 === 0) {
                        ctx.fillStyle = 'rgba(255,255,255,' + (0.75 * (1 - i / 40)).toFixed(2) + ')';
                        ctx.beginPath();
                        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            function draw() {
                ctx.setTransform(shell.dpr, 0, 0, shell.dpr, 0, 0);
                applyShake(ctx, shake);
                // Sky
                const sky = ctx.createLinearGradient(0, 0, 0, H);
                sky.addColorStop(0, '#87ceeb');
                sky.addColorStop(1, '#a0dff2');
                ctx.fillStyle = sky;
                ctx.fillRect(-10, -10, W + 20, H + 20);
                // Terrain
                ctx.fillStyle = '#27ae60';
                ctx.beginPath();
                ctx.moveTo(0, H);
                for (let x = 0; x < W; x++) {
                    ctx.lineTo(x, terrain[x]);
                }
                ctx.lineTo(W, H);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#2ecc71';
                ctx.beginPath();
                ctx.moveTo(0, H);
                for (let x = 0; x < W; x++) {
                    ctx.lineTo(x, terrain[x] + 5);
                }
                ctx.lineTo(W, H);
                ctx.closePath();
                ctx.fill();

                players.forEach(function (p, i) { drawTank(p, i === turn); });

                const showingAim = (charging || aim || cpu.phase === 'charge') && !projectile && winner === null && mode;
                if (showingAim) {
                    drawPreview();
                    drawPowerBar(players[turn]);
                }

                if (projectile) {
                    ctx.fillStyle = '#333';
                    ctx.beginPath();
                    ctx.arc(projectile.x, projectile.y, 4, 0, Math.PI * 2);
                    ctx.fill();
                    // chevron when the projectile leaves the top of the screen
                    if (projectile.y < -4) {
                        const px = Math.max(10, Math.min(W - 10, projectile.x));
                        ctx.fillStyle = '#e74c3c';
                        ctx.beginPath();
                        ctx.moveTo(px - 7, 8);
                        ctx.lineTo(px + 7, 8);
                        ctx.lineTo(px, 18);
                        ctx.closePath();
                        ctx.fill();
                    }
                }

                particles.forEach(function (pt) {
                    ctx.fillStyle = pt.color;
                    ctx.fillRect(pt.x, pt.y, 3, 3);
                });

                drawWindFlag();

                // HUD
                const p = players[turn];
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.font = 'bold 13px "Google Sans", sans-serif';
                ctx.textAlign = 'left';
                ctx.fillText('Angle: ' + Math.round(p.angle) + '°', 10, 20);
                ctx.fillText('Power: ' + Math.round(power), 10, 38);
                ctx.textAlign = 'right';
                ctx.fillStyle = p.color;
                let name;
                if (mode === 'cpu') name = turn === 0 ? t('game.worms.you') : 'CPU';
                else name = t('game.worms.player') + ' ' + (turn + 1);
                if (isCpuTurn() && cpu.phase !== 'idle') name = t('game.worms.cpu_thinking');
                ctx.fillText(name, W - 10, 20);
                ctx.textAlign = 'left';
            }

            function showModeOverlay() {
                const ov = document.createElement('div');
                ov.className = 'game-mode-overlay';
                ov.innerHTML =
                    '<div class="game-overlay-title">' + t('game.worms.mode_title') + '</div>' +
                    '<div class="game-overlay-actions game-overlay-col">' +
                        '<button class="game-btn game-btn-primary" type="button" data-mode="cpu">' + t('game.worms.mode_cpu') + '</button>' +
                        '<button class="game-btn" type="button" data-mode="2p">' + t('game.worms.mode_2p') + '</button>' +
                    '</div>';
                ov.addEventListener('click', function (e) {
                    const b = e.target.closest('[data-mode]');
                    if (!b) return;
                    mode = b.getAttribute('data-mode');
                    ov.remove();
                    last = 0;
                });
                shell.modal.appendChild(ov);
                setTimeout(function () {
                    const b = ov.querySelector('[data-mode="cpu"]');
                    if (b) { try { b.focus(); } catch (e) { /* noop */ } }
                }, 50);
            }

            function restart() {
                shell.hideGameOver();
                reset();
            }

            function tick(now) {
                rafId = requestAnimationFrame(tick);
                if (shell.paused) { last = 0; return; }
                const dt = Math.min(last ? now - last : 16, 50);
                last = now;
                update(dt);
                draw();
            }

            function humanCanAct() {
                return mode && winner === null && !projectile && !isCpuTurn() && !shell.paused && !shell.gameOver;
            }
            function onKey(e) {
                if (e.key === 'Escape') { stop(); return; }
                if (e.key.toLowerCase() === 'r') {
                    if (mode) restart();
                    return;
                }
                if (e.key.indexOf('Arrow') === 0) {
                    e.preventDefault(); // do not scroll the page behind the modal
                    if (humanCanAct()) keys[e.key] = true;
                    return;
                }
                if (e.key === ' ' || e.code === 'Space') {
                    e.preventDefault();
                    if (humanCanAct() && !charging) { charging = true; power = 0; chargeBlipAcc = 0; }
                }
            }
            function onKeyUp(e) {
                if (e.key === ' ' || e.code === 'Space') {
                    e.preventDefault();
                    if (charging && humanCanAct()) fire();
                    charging = false;
                } else {
                    keys[e.key] = false;
                }
            }

            // ---- Touch slingshot: press near the tank, drag, release to fire ----
            function canvasPos(e) {
                const r = canvas.getBoundingClientRect();
                return { x: e.clientX - r.left, y: e.clientY - r.top };
            }
            function onPointerDown(e) {
                if (!humanCanAct()) return;
                const pos = canvasPos(e);
                const p = players[turn];
                if (Math.hypot(pos.x - p.x, pos.y - p.y) < 60) {
                    e.preventDefault();
                    aim = { sx: pos.x, sy: pos.y };
                    power = 0;
                    if (canvas.setPointerCapture) {
                        try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
                    }
                }
            }
            function onPointerMove(e) {
                if (!aim) return;
                e.preventDefault();
                const pos = canvasPos(e);
                const dx = aim.sx - pos.x; // inverted drag vector (slingshot)
                const dy = aim.sy - pos.y;
                const dist = Math.hypot(dx, dy);
                if (dist < 8) { power = 0; return; }
                let ang = Math.atan2(-dy, dx) * 180 / Math.PI;
                if (ang < 0) ang = ang > -90 ? 0 : 180;
                players[turn].angle = Math.max(0, Math.min(180, ang));
                power = Math.max(10, Math.min(100, dist * 0.7));
            }
            function onPointerUp(e) {
                if (!aim) return;
                e.preventDefault();
                aim = null;
                if (humanCanAct() && power >= 10) fire();
                else power = 0;
            }

            // ---- Footer: ⟨ ⟩ buttons to move the tank on touch ----
            const footer = root.querySelector('.game-footer');
            footer.removeAttribute('data-i18n');
            footer.classList.add('game-footer-flex');
            footer.innerHTML =
                '<button class="game-move-btn" type="button" data-move="-1" aria-label="←">⟨</button>' +
                '<span class="game-footer-text">' + t('game.worms.controls') + '</span>' +
                '<button class="game-move-btn" type="button" data-move="1" aria-label="→">⟩</button>';
            function onFooterDown(e) {
                const b = e.target.closest('[data-move]');
                if (!b) return;
                e.preventDefault();
                touchMove = parseInt(b.getAttribute('data-move'), 10);
            }
            function onFooterUp() { touchMove = 0; }
            footer.addEventListener('pointerdown', onFooterDown);
            footer.addEventListener('pointerup', onFooterUp);
            footer.addEventListener('pointercancel', onFooterUp);
            footer.addEventListener('pointerleave', onFooterUp);

            function onClose(e) {
                if (e.target.hasAttribute('data-close') || e.target.classList.contains('game-backdrop') || e.target.classList.contains('game-close')) stop();
            }
            function stop() {
                stopped = true;
                cancelAnimationFrame(rafId);
                if (turnTimeout) clearTimeout(turnTimeout);
                keys = {};
                document.removeEventListener('keydown', onKey);
                document.removeEventListener('keyup', onKeyUp);
                canvas.removeEventListener('pointerdown', onPointerDown);
                canvas.removeEventListener('pointermove', onPointerMove);
                canvas.removeEventListener('pointerup', onPointerUp);
                canvas.removeEventListener('pointercancel', onPointerUp);
                root.removeEventListener('click', onClose);
                closeGame();
            }

            reset();
            showModeOverlay();
            document.addEventListener('keydown', onKey);
            document.addEventListener('keyup', onKeyUp);
            canvas.addEventListener('pointerdown', onPointerDown);
            canvas.addEventListener('pointermove', onPointerMove);
            canvas.addEventListener('pointerup', onPointerUp);
            canvas.addEventListener('pointercancel', onPointerUp);
            root.addEventListener('click', onClose);
            rafId = requestAnimationFrame(tick);
        }
        return start;
    }

    /* ============================================================
       Bootstrap
       ============================================================ */
    document.addEventListener('DOMContentLoaded', function () {
        loadAccent();
        consoleGreeting();
        document.addEventListener('keydown', onKonami);
        avatarEgg();
        initCmdk();
        initTTS();
        initOffDuty();
        initColor();
        window.__games = { f1: initF1Game(), flappy: initFlappyGame(), worms: initWormsGame() };

        // Re-greet on language change
        document.addEventListener('langchange', consoleGreeting);
    });
})();