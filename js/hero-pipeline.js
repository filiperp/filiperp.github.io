/* ============================================================
   hero-pipeline.js — DAG de pipeline de dados animado no hero
   - Nós em 4 camadas (sources → ingest → transform → serve)
   - Partículas fluem pelas arestas na cor de acento atual
   - Pausa fora da viewport e com a aba oculta; estático sob
     prefers-reduced-motion; oculto no mobile (CSS)
   ============================================================ */

(function () {
    'use strict';

    const canvas = document.getElementById('hero-pipeline');
    if (!canvas) return;

    const hero = canvas.closest('.hero');
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, dpr = 1;
    let nodes = [], edges = [], particles = [];
    let running = false;
    let rafId = null;
    let accent = '#fb923c';
    let lineColor = 'rgba(128,128,128,0.16)';

    function readColors() {
        const cs = getComputedStyle(document.documentElement);
        accent = (cs.getPropertyValue('--accent') || '#fb923c').trim();
        const fg = (cs.getPropertyValue('--fg') || '#888').trim();
        lineColor = fg;
    }

    // Layout determinístico: 12 nós em 4 camadas, com jitter fixo
    const LAYOUT = [
        { x: 0.04, ys: [0.18, 0.42, 0.66, 0.88] },
        { x: 0.32, ys: [0.28, 0.58, 0.84] },
        { x: 0.62, ys: [0.20, 0.50, 0.78] },
        { x: 0.93, ys: [0.34, 0.68] }
    ];
    const JITTER = [0.013, -0.021, 0.008, -0.011, 0.019, -0.006, 0.015, -0.017, 0.004, -0.013, 0.011, -0.009];

    function build() {
        nodes = [];
        edges = [];
        let j = 0;
        LAYOUT.forEach(function (layer, li) {
            layer.ys.forEach(function (fy) {
                nodes.push({
                    layer: li,
                    x: (layer.x + JITTER[j % JITTER.length]) * W,
                    y: (fy + JITTER[(j + 5) % JITTER.length]) * H,
                    r: 3,
                    glow: 0
                });
                j++;
            });
        });
        // conecta cada nó a 1-2 nós da camada seguinte (padrão fixo)
        const byLayer = [[], [], [], []];
        nodes.forEach(function (n, i) { byLayer[n.layer].push(i); });
        for (let li = 0; li < 3; li++) {
            byLayer[li].forEach(function (from, k) {
                const next = byLayer[li + 1];
                const a = next[k % next.length];
                const b = next[(k + 1) % next.length];
                edges.push({ from: from, to: a });
                if (b !== a && (k + li) % 2 === 0) edges.push({ from: from, to: b });
            });
        }
        // partículas distribuídas pelas arestas
        particles = [];
        const COUNT = Math.min(26, edges.length * 2);
        for (let p = 0; p < COUNT; p++) {
            particles.push({
                edge: p % edges.length,
                t: (p * 0.41) % 1,
                speed: 0.0016 + ((p * 7) % 10) * 0.00022
            });
        }
    }

    function resize() {
        const rect = hero.getBoundingClientRect();
        if (rect.width < 10 || canvas.offsetParent === null) { stop(); return; }
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = rect.width;
        H = rect.height;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        build();
        if (reduced) drawFrame(0);
        else start();
    }

    function edgePoint(e, t) {
        const a = nodes[e.from], b = nodes[e.to];
        // Bézier quadrática com controle deslocado para curvas suaves
        const cx = (a.x + b.x) / 2 + (b.y - a.y) * 0.18;
        const cy = (a.y + b.y) / 2 - (b.x - a.x) * 0.06;
        const u = 1 - t;
        return {
            x: u * u * a.x + 2 * u * t * cx + t * t * b.x,
            y: u * u * a.y + 2 * u * t * cy + t * t * b.y
        };
    }

    function drawFrame(dt) {
        ctx.clearRect(0, 0, W, H);

        // arestas
        ctx.save();
        ctx.globalAlpha = 0.13;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        edges.forEach(function (e) {
            const a = nodes[e.from], b = nodes[e.to];
            const cx = (a.x + b.x) / 2 + (b.y - a.y) * 0.18;
            const cy = (a.y + b.y) / 2 - (b.x - a.x) * 0.06;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.quadraticCurveTo(cx, cy, b.x, b.y);
            ctx.stroke();
        });
        ctx.restore();

        // nós
        nodes.forEach(function (n) {
            ctx.save();
            ctx.globalAlpha = 0.35 + n.glow * 0.6;
            ctx.fillStyle = n.glow > 0.05 ? accent : lineColor;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r + n.glow * 1.6, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            n.glow = Math.max(0, n.glow - dt * 0.0016);
        });

        // partículas
        if (!reduced) {
            particles.forEach(function (p) {
                p.t += p.speed * dt;
                if (p.t >= 1) {
                    nodes[edges[p.edge].to].glow = 1;
                    p.edge = (p.edge + 3) % edges.length;
                    p.t = 0;
                }
                const pos = edgePoint(edges[p.edge], p.t);
                ctx.save();
                ctx.globalAlpha = 0.75;
                ctx.fillStyle = accent;
                ctx.shadowColor = accent;
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.arc(pos.x, pos.y, 1.8, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        }
    }

    let last = 0;
    function tick(now) {
        const dt = Math.min(last ? now - last : 16, 50);
        last = now;
        drawFrame(dt);
        rafId = requestAnimationFrame(tick);
    }

    function start() {
        if (running || reduced) return;
        running = true;
        last = 0;
        rafId = requestAnimationFrame(tick);
    }
    function stop() {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
    }

    // pausa fora da viewport / aba oculta
    if ('IntersectionObserver' in window && !reduced) {
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting && document.visibilityState === 'visible') start();
                else stop();
            });
        }, { threshold: 0.05 });
        io.observe(hero);
    }
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') stop();
        else if (hero.getBoundingClientRect().bottom > 0) start();
    });

    // acompanha mudanças de tema e de cor de acento (color picker)
    const mo = new MutationObserver(function () {
        readColors();
        if (reduced) drawFrame(0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'style'] });

    let resizeT = null;
    window.addEventListener('resize', function () {
        clearTimeout(resizeT);
        resizeT = setTimeout(resize, 150);
    });

    readColors();
    resize();
})();
