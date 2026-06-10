# Filipe Rodrigues — Personal Page

> **Senior Data Engineer · Solution Architect · Tech Lead**
> 22+ anos construindo arquiteturas de dados que escalam.

🌐 **Live:** <https://rodrigues.haus> (também em <https://filiperp.github.io>)

---

## Sobre o Filipe

Olá, sou o Filipe Rodrigues (IPA: /fi.ˈli.pɘ rʊ.ˈdri.ɡəʒ/) — engenheiro de dados e arquiteto de soluções com 22+ anos de mercado. Atualmente atuo como Tech Lead e Solution Architect em projetos de Data Engineering, BI e plataformas analíticas para clientes enterprise.

Baseado em **São Paulo, Brasil**, trabalho remotamente para times no Brasil, Portugal e Luxemburgo. Falo Português (nativo), Inglês (fluente) e Espanhol (conversacional).

Disponível para **consultoria, arquitetura, tech leadership, advisory e palestras**. Para conversar, agende direto: [Google Calendar](https://calendar.app.google/2aG8genMhXuws8dKA).

## Highlights

- **22+ anos** em engenharia de software, BI, dados e arquitetura cloud
- Pipelines processando **40 TB/dia** para **3000+ usuários enterprise**
- Tech Lead de times de **até 30 engenheiros**
- **Certificado** Alteryx Designer Core/Advanced (ativas), MIT Data Science, University of Chicago
- Cofundador da **BBI.Solutions** e da iniciativa social **Life Academy**
- Stack: Python, SQL, PostgreSQL, Alteryx, AWS/Azure/GCP, Airflow, dbt, Coolify, n8n, Angular, Vue, React, Laravel, Django, FastAPI, .NET, PHP

## A página

Site estático, **CSS puro** (sem frameworks) e **JavaScript vanilla**. Sem build, sem `npm install`, sem dependências de runtime. Hospedado via GitHub Pages.

### Funcionalidades

- 🌓 **Tema claro/escuro** — detecta a preferência do sistema, toggle persistido em `localStorage`, e transição com **View Transitions API** (reveal circular a partir do botão, com fallback gracioso).
- 🌐 **Bilíngue PT/EN** — dicionário em JSON + atributo `data-i18n`; troca dinâmica sem reload. Detecta idioma do navegador no primeiro acesso.
- 🕸️ **Pipeline animado no hero** — canvas com um DAG (sources → ingest → transform → serve) e partículas fluindo na cor de acento; pausa fora da viewport, respeita `prefers-reduced-motion`, oculto no mobile.
- ✨ **Grid reativo** — o grid de fundo "acende" na cor de acento ao redor do cursor (só pointer fino, GPU-only via mask).
- 📈 **Stats com count-up** — números do hero animam ao entrar na viewport, com `tabular-nums` para não deslocar o layout.
- 🍔 **Menu hamburger no mobile** — painel acessível (`aria-expanded`, Esc fecha e devolve o foco, fecha ao clicar fora).
- 🧭 **Scroll progress + scroll-spy + reveal** — nas duas páginas (`js/page-effects.js`).
- 🦶 **Footer com observabilidade** — hora local de São Paulo ao vivo e linha de status com métricas reais da página (render, transfer) via Performance API.
- 🟧 **Identidade visual** — burnt orange como acento, eyebrow em monospace, seções numeradas (`01`, `02`, …), grid sutil no background.
- 📄 **CV em PDF** em `assets/filipe_rodrigues.pdf` · 🗓️ **Agendamento** via Google Calendar.
- ⌨️ **Command palette** (estilo Raycast) com **fuzzy search** (acento-insensível, com highlight) — e um segredo SQL (veja abaixo).
- 🚨 **404 temática** — a página de erro é um log de DAG falhado, com streaming de linhas e acesso ao mini-jogo.
- ♿ **Acessível** — skip link, ARIA (combobox no ⌘K, foco preso/restaurado nos modais), `:focus-visible` global, contraste AA, `prefers-reduced-motion` em todas as animações.
- 🔎 **SEO** — `og-image.png` (1200×630, gerado do SVG fonte), JSON-LD, sitemap.

### Estrutura

```
filiperp.github.io/
├── index.html
├── projects.html        # 3 empresas, 20 produtos
├── 404.html             # log de DAG falhado + mini-jogo
├── css/style.css
├── js/
│   ├── main.js          # tema (View Transitions) + hamburger + email + count-up + footer vivo + spotlight
│   ├── i18n.js          # dicionário PT/EN + troca dinâmica
│   ├── page-effects.js  # fade-in, scroll-spy, scroll-progress, print (index + projects)
│   ├── hero-pipeline.js # DAG animado do hero
│   ├── easter-eggs.js   # Konami, console, ⌘K + SQL, off-duty, color picker, 3 jogos
│   ├── achievements.js  # conquistas dos easter eggs (12, com confete no 100%)
│   └── version.js       # carimbo de versão (regenerado por git hook)
├── assets/
│   ├── filipe_rodrigues.pdf
│   ├── foto.jpg
│   ├── og-image.svg     # fonte
│   ├── og-image.png     # 1200×630 para social scrapers
│   └── companies/       # logos e mockups (BBI, GoldenLearn, Integratech)
├── .githooks/
│   ├── pre-commit       # stampa js/version.js em cada commit
│   └── install.sh       # ativa o hook localmente
└── README.md
```

### Rodar localmente

```bash
python3 -m http.server 8765
# abre em http://localhost:8765/
```

Ou qualquer outro servidor estático (`npx serve`, `caddy file-server`, etc).

### Versionamento

A página exibe a versão no rodapé no formato `Y.m.d.H.i.S` — por exemplo `v2026.06.04.03.19.59`. Ela é regenerada automaticamente antes de cada commit por um git hook em `.githooks/pre-commit`. Para ativar após clonar:

```bash
bash .githooks/install.sh
# ou manualmente:
git config core.hooksPath .githooks
```

---

## Easter eggs

A página esconde **12 conquistas** para visitantes curiosos — todas rastreadas pelo sistema de **achievements** (`⌘K → "Conquistas"`), com progresso persistido e **confete** ao fechar 100%. Quase tudo pode ser acionado pelo command palette.

### 1. ⌨️ Command palette (⌘K ou `/`)

Estilo Raycast/Linear, com **fuzzy search** com score e highlight (digite `exprincia` e ele acha "Experiência"), aliases por comando e grupos: Navegar · Ações · Diversão · Externo.

### 2. 🗄️ SQL console — *query the CV*

Dentro do ⌘K, digite SQL e o currículo vira um banco de dados:

```sql
SHOW TABLES;
SELECT * FROM experience;
SELECT name, years FROM skills WHERE category = 'data' ORDER BY years DESC LIMIT 5;
DESCRIBE certifications;
```

Tabelas: `experience`, `skills`, `projects`, `certifications` (bilíngues — seguem o idioma da página). Erros no estilo Postgres. `DROP TABLE` responde `permission denied (nice try)`. Há uma tabela `secrets`…

### 3. 🎮 Konami code

`↑ ↑ ↓ ↓ ← → ← → B A` → chuva de dados em canvas (SELECT, airflow, dbt run, 40 TB/day…) **na cor de acento atual**. `Esc` cancela. Também disponível no ⌘K ("Chuva de dados") para quem está no celular. Respeita `prefers-reduced-motion`.

### 4. 💻 Mensagem no DevTools

ASCII art "FR" na cor de acento + convite bilíngue. Reemitida ao trocar de idioma.

### 5. 📸 Foto clicada 7×

Gira 360° com toast comemorativo. Janela de 2s entre cliques.

### 6. 🔊 Modo leitura por voz (TTS)

`⌘K → "Ativar leitura por voz"` — clique em qualquer texto para ouvir (Web Speech API, no idioma atual). `Esc` desativa.

### 7. 🎨 Modo Off-duty (pichação)

`⌘K → "Modo Off-duty"` — pichações, stickers e doodles tomam conta do site, e os textos viram um currículo paralelo de zoeira. As fontes de grafite só são baixadas quando o modo é ativado. `Esc` limpa tudo.

### 8. 🌈 Color picker

8 presets + cor personalizada, persistida. Cores muito claras são escurecidas automaticamente e o texto sobre o acento troca para preto/branco conforme a luminância (WCAG). Tudo no site — inclusive o pipeline do hero e a chuva de dados — segue a cor escolhida.

### 9. 🏎️ Mini-jogo F1

Canvas nítido em retina (DPR scaling), **touch** (swipe/tap), colisão justa (AABB com mercy margin), bônus de *near-miss* (+25), tráfego com velocidades diferentes, spawn que nunca cria paredes impossíveis, partículas + screen shake + freeze-frame no crash, recorde persistido, pause automático ao trocar de aba (`P` pausa manual), sons procedurais WebAudio com mute persistido.

### 10. 🐦 Flappy Corporate

Prédios corporativos parodiados (FAtDonalds, StarSucks, MicroHard…). Recorde persistido, medalhas (🥉 ≥10 · 🥈 ≥25 · 🥇 ≥50), dificuldade progressiva, céu que anoitece, rotação/squash/tumble do pássaro, `pointerdown` no modal inteiro (zero latência no touch).

### 11. 💥 Batalha de Artilharia

**1 Jogador vs CPU** (IA por bracketing que erra perto e vai fechando o cerco, com telegraph de mira) ou 2 jogadores locais. Barra de força visível, bandeira de vento, preview de trajetória com a física real, chevron quando o projétil sai da tela, **estilingue touch** (arraste perto do tanque), dano direto com bônus, crateras no terreno.

### 12. 🏆 Conquistas

`⌘K → "Conquistas"` — 12 badges (tema, idioma, Konami, foto, TTS, off-duty, cor, ⌘K, SQL e os 3 jogos). Bloqueadas aparecem como `???`. No 100%: confete na cor de acento.

---

## Contato

- 🗓️ **Agendar conversa:** [Google Calendar](https://calendar.app.google/2aG8genMhXuws8dKA)
- 💼 **LinkedIn:** [linkedin.com/in/filiperp](https://www.linkedin.com/in/filiperp)
- 💻 **GitHub:** [github.com/filiperp](https://github.com/filiperp)
- ✉️ **Email:** disponível na página (ofuscado contra scrapers)

---

## License

- **Conteúdo** (texto, foto, CV): © Filipe Rodrigues — todos os direitos reservados.
- **Código** (HTML/CSS/JS): MIT — sinta-se à vontade para reutilizar a estrutura.

---

<!--
  Manter este README sincronizado com a página: cada mudança estrutural
  (nova feature, novo easter egg, mudança de tecnologia, nova seção,
  alteração de stack ou de identidade visual) deve ser refletida aqui.
-->
