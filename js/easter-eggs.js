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
            { icon: ttsIcon, section: 'cmdk.section.fun', label: ttsLabel, run: function () { if (window.__tts) window.__tts.toggle(); } },
            { icon: '🎨', section: 'cmdk.section.fun', label: 'cmdk.offduty', run: function () { if (window.__offduty) window.__offduty.open(); } },
            { icon: '🌈', section: 'cmdk.section.fun', label: 'cmdk.color', run: function () { if (window.__color) window.__color.open(); } },
            { icon: '🏎️', section: 'cmdk.section.fun', label: 'cmdk.game.f1', run: function () { if (window.__games) window.__games.f1(); } },
            { icon: '🐦', section: 'cmdk.section.fun', label: 'cmdk.game.flappy', run: function () { if (window.__games) window.__games.flappy(); } },
            { icon: '📅', section: 'cmdk.section.external', label: 'cmdk.open.schedule', run: function () { window.open('https://calendar.app.google/2aG8genMhXuws8dKA', '_blank', 'noopener'); } },
            { icon: '💼', section: 'cmdk.section.external', label: 'cmdk.open.linkedin', run: function () { window.open('https://www.linkedin.com/in/filiperp', '_blank', 'noopener'); } },
            { icon: '🐙', section: 'cmdk.section.external', label: 'cmdk.open.github', run: function () { window.open('https://github.com/filiperp', '_blank', 'noopener'); } },
            { icon: '📊', section: 'cmdk.section.external', label: 'cmdk.open.mdb', run: function () { window.open('https://midiadados.gm.org.br/', '_blank', 'noopener'); } }
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
                              '<span class="cmdk-emoji">' + (c.icon || '') + '</span>' +
                              '<span class="cmdk-label">' + c._label + '</span>' +
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
            'skills.frameworks': 'Frameworks de Poltrona',
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
        'Frameworks & Tools':['Angular do Sofá', 'Reactish', 'Cordas (de roupa)'],
        'Metodologias':      ['Scrum no Sextou', 'Kanban da Geladeira', "DRY: Don't Repeat Domingos"],
        'Methodologies':     ['Scrum no Sextou', 'Kanban da Geladeira', "DRY: Don't Repeat Domingos"]
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
            document.body.classList.add('offduty-on');
            root.classList.add('is-on');
            root.setAttribute('aria-hidden', 'false');
            applyOffdutyTexts();
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

    function applyAccent(lightHex, darkHex) {
        const r = document.documentElement;
        r.style.setProperty('--accent-user-light', lightHex);
        r.style.setProperty('--accent-user-dark', darkHex);
        r.style.setProperty('--accent-user-light-hover', darkenHex(lightHex, 0.18));
        r.style.setProperty('--accent-user-dark-hover', lightenHex(darkHex, 0.18));
        r.style.setProperty('--accent-user-light-soft', softHex(lightHex));
        r.style.setProperty('--accent-user-dark-soft', softHex(darkHex));
    }
    function resetAccent() {
        const r = document.documentElement;
        ['--accent-user-light', '--accent-user-dark', '--accent-user-light-hover', '--accent-user-dark-hover', '--accent-user-light-soft', '--accent-user-dark-soft'].forEach(function (k) {
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
                    render();
                }
            });
            root.addEventListener('input', function (e) {
                if (e.target.id !== 'color-custom-input') return;
                const light = e.target.value;
                const dark = lightenHex(light, 0.35);
                applyAccent(light, dark);
                localStorage.setItem('accent', JSON.stringify({ light: light, dark: dark }));
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
       8. F1 Race game
       ============================================================ */
    function makeGameShell(titleKey, controlsKey) {
        const root = document.getElementById('game-root');
        root.innerHTML =
            '<div class="game-backdrop" data-close></div>' +
            '<div class="game-modal" role="dialog" aria-modal="true">' +
                '<div class="game-header">' +
                    '<h3 data-i18n="' + titleKey + '"></h3>' +
                    '<button class="game-close" aria-label="Close" data-close>×</button>' +
                '</div>' +
                '<canvas class="game-canvas" width="360" height="520"></canvas>' +
                '<div class="game-footer" data-i18n="' + controlsKey + '"></div>' +
            '</div>';
        root.classList.add('is-open');
        root.setAttribute('aria-hidden', 'false');
        if (window.__i18n) window.__i18n.apply(window.__i18n.current());
        return root;
    }
    function closeGame() {
        const root = document.getElementById('game-root');
        if (!root) return;
        root.classList.remove('is-open');
        root.setAttribute('aria-hidden', 'true');
        root.innerHTML = '';
    }
    function getAccent() {
        return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#fb923c';
    }

    function initF1Game() {
        function start() {
            const root = makeGameShell('game.f1.title', 'game.controls');
            const canvas = root.querySelector('canvas');
            const ctx = canvas.getContext('2d');
            const W = canvas.width, H = canvas.height;
            const LANES = [60, 130, 200, 270];
            const LANE_W = 50;

            let player = { lane: 1, x: 0, targetX: 0, y: H - 100, w: LANE_W, h: 70 };
            player.x = player.targetX = LANES[player.lane];
            let obstacles = [];
            let dashOffset = 0;
            let speed = 4;
            let score = 0;
            let alive = true;
            let last = 0;
            let rafId;
            let spawnTimer = 0;

            function reset() {
                player.lane = 1; player.x = player.targetX = LANES[player.lane];
                obstacles = []; speed = 4; score = 0; alive = true; spawnTimer = 0;
            }
            function spawn() {
                const lane = Math.floor(Math.random() * 4);
                obstacles.push({ x: LANES[lane], y: -80, w: LANE_W, h: 70, lane: lane });
            }
            function update(dt) {
                if (!alive) return;
                dashOffset = (dashOffset + speed) % 40;
                player.x += (player.targetX - player.x) * 0.25;
                spawnTimer += dt;
                const spawnInterval = Math.max(380, 900 - score / 50);
                if (spawnTimer > spawnInterval) { spawn(); spawnTimer = 0; }
                obstacles.forEach(function (o) { o.y += speed; });
                obstacles = obstacles.filter(function (o) { return o.y < H + 100; });
                obstacles.forEach(function (o) {
                    if (o.x < player.x + player.w && o.x + o.w > player.x &&
                        o.y < player.y + player.h && o.y + o.h > player.y) {
                        alive = false;
                    }
                });
                score += dt * 0.05;
                speed = Math.min(12, 4 + score / 300);
            }
            function draw() {
                ctx.fillStyle = '#14171c';
                ctx.fillRect(0, 0, W, H);
                // grass
                ctx.fillStyle = '#1a2a1a';
                ctx.fillRect(0, 0, 35, H);
                ctx.fillRect(W - 35, 0, 35, H);
                // road
                ctx.fillStyle = '#2a2a2a';
                ctx.fillRect(35, 0, W - 70, H);
                // lane markers
                ctx.strokeStyle = '#ffffff66';
                ctx.lineWidth = 3;
                ctx.setLineDash([20, 20]);
                ctx.lineDashOffset = -dashOffset;
                for (let i = 1; i < 4; i++) {
                    const x = 35 + (W - 70) / 4 * i;
                    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
                }
                ctx.setLineDash([]);
                // obstacles
                obstacles.forEach(function (o) {
                    ctx.fillStyle = '#9aa0a6';
                    ctx.fillRect(o.x, o.y, o.w, o.h);
                    ctx.fillStyle = '#404040';
                    ctx.fillRect(o.x + 8, o.y + 10, o.w - 16, 18);
                    ctx.fillRect(o.x + 8, o.y + o.h - 28, o.w - 16, 18);
                });
                // player
                const accent = getAccent();
                ctx.fillStyle = accent;
                ctx.fillRect(player.x, player.y, player.w, player.h);
                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                ctx.fillRect(player.x + 8, player.y + 12, player.w - 16, 14);
                ctx.fillRect(player.x + 8, player.y + player.h - 22, player.w - 16, 14);
                // score
                ctx.fillStyle = '#fff';
                ctx.font = '600 16px ui-monospace, Menlo, monospace';
                ctx.fillText(t('game.f1.score') + ': ' + Math.floor(score), 12, 26);
                if (!alive) {
                    ctx.fillStyle = 'rgba(0,0,0,0.75)';
                    ctx.fillRect(0, H / 2 - 50, W, 100);
                    ctx.fillStyle = '#fff';
                    ctx.font = '600 18px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(t('game.f1.over'), W / 2, H / 2 + 6);
                    ctx.textAlign = 'left';
                }
            }
            function tick(now) {
                const dt = last ? now - last : 16;
                last = now;
                update(dt);
                draw();
                rafId = requestAnimationFrame(tick);
            }
            function onKey(e) {
                if (e.key === 'ArrowLeft') { e.preventDefault(); player.lane = Math.max(0, player.lane - 1); player.targetX = LANES[player.lane]; }
                else if (e.key === 'ArrowRight') { e.preventDefault(); player.lane = Math.min(3, player.lane + 1); player.targetX = LANES[player.lane]; }
                else if (e.key.toLowerCase() === 'r') { reset(); }
                else if (e.key === 'Escape') { stop(); }
            }
            function onClose(e) {
                if (e.target.hasAttribute('data-close') || e.target.classList.contains('game-backdrop') || e.target.classList.contains('game-close')) stop();
            }
            function stop() {
                cancelAnimationFrame(rafId);
                document.removeEventListener('keydown', onKey);
                root.removeEventListener('click', onClose);
                closeGame();
            }
            document.addEventListener('keydown', onKey);
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
            const root = makeGameShell('game.flappy.title', 'game.flappy.controls');
            const canvas = root.querySelector('canvas');
            const ctx = canvas.getContext('2d');
            const W = canvas.width, H = canvas.height;

            let bird = { x: 80, y: H / 2, vy: 0, r: 14 };
            let pipes = [];
            let gap = 150;
            let pipeSpeed = 2.2;
            let gravity = 0.45;
            let jump = -7.5;
            let score = 0;
            let alive = true;
            let started = false;
            let rafId;
            let spawnTimer = 0;

            function reset() {
                bird = { x: 80, y: H / 2, vy: 0, r: 14 };
                pipes = []; score = 0; alive = true; started = false; spawnTimer = 0;
            }
            function spawn() {
                const minTop = 50, maxTop = H - gap - 80;
                const topH = minTop + Math.random() * (maxTop - minTop);
                pipes.push({ x: W, topH: topH, gap: gap, name: NAMES[Math.floor(Math.random() * NAMES.length)], passed: false });
            }
            function update(dt) {
                if (!alive) return;
                if (!started) return;
                bird.vy += gravity;
                bird.y += bird.vy;
                spawnTimer += dt;
                if (spawnTimer > 1400) { spawn(); spawnTimer = 0; }
                pipes.forEach(function (p) { p.x -= pipeSpeed; });
                pipes = pipes.filter(function (p) { return p.x > -90; });

                if (bird.y + bird.r > H || bird.y - bird.r < 0) alive = false;
                pipes.forEach(function (p) {
                    if (p.x < bird.x + bird.r && p.x + 70 > bird.x - bird.r) {
                        if (bird.y - bird.r < p.topH || bird.y + bird.r > p.topH + p.gap) alive = false;
                    }
                    if (!p.passed && p.x + 70 < bird.x) { p.passed = true; score++; }
                });
            }
            function drawPipe(p) {
                ctx.fillStyle = '#9aa0a6';
                ctx.fillRect(p.x, 0, 70, p.topH);
                ctx.fillRect(p.x, p.topH + p.gap, 70, H - p.topH - p.gap);
                // windows
                ctx.fillStyle = '#404040';
                for (let yy = 12; yy < p.topH - 12; yy += 18) {
                    ctx.fillRect(p.x + 8, yy, 12, 8);
                    ctx.fillRect(p.x + 26, yy, 12, 8);
                    ctx.fillRect(p.x + 44, yy, 12, 8);
                }
                for (let yy = p.topH + p.gap + 12; yy < H - 12; yy += 18) {
                    ctx.fillRect(p.x + 8, yy, 12, 8);
                    ctx.fillRect(p.x + 26, yy, 12, 8);
                    ctx.fillRect(p.x + 44, yy, 12, 8);
                }
                // name vertical
                ctx.save();
                ctx.translate(p.x + 35, p.topH / 2);
                ctx.rotate(-Math.PI / 2);
                ctx.fillStyle = '#fff';
                ctx.font = '600 11px ui-monospace, Menlo, monospace';
                ctx.textAlign = 'center';
                ctx.fillText(p.name, 0, 4);
                ctx.restore();
            }
            function draw() {
                // sky gradient
                const sky = ctx.createLinearGradient(0, 0, 0, H);
                sky.addColorStop(0, '#1a2333');
                sky.addColorStop(1, '#14171c');
                ctx.fillStyle = sky;
                ctx.fillRect(0, 0, W, H);
                pipes.forEach(drawPipe);
                // bird
                ctx.fillStyle = getAccent();
                ctx.beginPath(); ctx.arc(bird.x, bird.y, bird.r, 0, Math.PI * 2); ctx.fill();
                // eye
                ctx.fillStyle = '#fff';
                ctx.beginPath(); ctx.arc(bird.x + 4, bird.y - 4, 4, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#000';
                ctx.beginPath(); ctx.arc(bird.x + 5, bird.y - 4, 2, 0, Math.PI * 2); ctx.fill();
                // score
                ctx.fillStyle = '#fff';
                ctx.font = '700 22px sans-serif';
                ctx.textAlign = 'right';
                ctx.fillText(score, W - 14, 32);
                ctx.textAlign = 'left';
                // start/over messages
                if (!started && alive) {
                    ctx.fillStyle = 'rgba(0,0,0,0.6)';
                    ctx.fillRect(0, H / 2 - 30, W, 60);
                    ctx.fillStyle = '#fff';
                    ctx.font = '600 16px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(t('game.flappy.start'), W / 2, H / 2 + 6);
                    ctx.textAlign = 'left';
                }
                if (!alive) {
                    ctx.fillStyle = 'rgba(0,0,0,0.75)';
                    ctx.fillRect(0, H / 2 - 50, W, 100);
                    ctx.fillStyle = '#fff';
                    ctx.font = '600 18px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText(t('game.flappy.over'), W / 2, H / 2 + 6);
                    ctx.textAlign = 'left';
                }
            }
            let last = 0;
            function tick(now) {
                const dt = last ? now - last : 16;
                last = now;
                update(dt);
                draw();
                rafId = requestAnimationFrame(tick);
            }
            function flap() {
                if (!alive) return;
                if (!started) started = true;
                bird.vy = jump;
            }
            function onKey(e) {
                if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); flap(); }
                else if (e.key.toLowerCase() === 'r') { reset(); }
                else if (e.key === 'Escape') { stop(); }
            }
            function onCanvasClick(e) {
                e.preventDefault();
                flap();
            }
            function onRootClick(e) {
                if (e.target.hasAttribute('data-close') || e.target.classList.contains('game-backdrop') || e.target.classList.contains('game-close')) stop();
            }
            function stop() {
                cancelAnimationFrame(rafId);
                document.removeEventListener('keydown', onKey);
                canvas.removeEventListener('click', onCanvasClick);
                root.removeEventListener('click', onRootClick);
                closeGame();
            }
            document.addEventListener('keydown', onKey);
            canvas.addEventListener('click', onCanvasClick);
            root.addEventListener('click', onRootClick);
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
        window.__games = { f1: initF1Game(), flappy: initFlappyGame() };

        // Re-greet on language change
        document.addEventListener('langchange', consoleGreeting);
    });
})();
