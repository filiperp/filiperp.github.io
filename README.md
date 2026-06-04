# Filipe Rodrigues — Personal Page

> **Senior Data Engineer · Solution Architect · Tech Lead**
> 22+ anos construindo arquiteturas de dados que escalam.

🌐 **Live:** <https://filiperp.github.io>

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
- Stack: Python, SQL, Alteryx, AWS/Azure/GCP, Airflow, dbt, Angular, PHP

## A página

Site estático, mono-arquivo HTML, **CSS puro** (sem frameworks) e **JavaScript vanilla**. Sem build, sem `npm install`, sem dependências de runtime. Hospedado via GitHub Pages.

### Funcionalidades

- 🌓 **Tema claro/escuro** — detecta a preferência do sistema operacional, com toggle manual persistido em `localStorage`.
- 🌐 **Bilíngue PT/EN** — dicionário em JSON + atributo `data-i18n`; troca dinâmica sem reload. Detecta idioma do navegador no primeiro acesso.
- 🎨 **Tipografia Google Sans** com fallbacks robustos (Product Sans → Inter → system-ui).
- 🟧 **Identidade visual** — burnt orange como cor de acento, grid sutil no background com fade radial central.
- 📄 **CV em PDF** disponível em `assets/filipe_rodrigues.pdf`.
- 🗓️ **Agendamento direto** via Google Calendar.
- ⌨️ **Command palette** (estilo Raycast) para navegação por teclado.
- ♿ **Acessível** — skip link, ARIA labels, foco visível, suporte a `prefers-reduced-motion`.

### Estrutura

```
filiperp.github.io/
├── index.html
├── css/style.css
├── js/
│   ├── main.js          # tema + email ofuscado + ano do footer
│   ├── i18n.js          # dicionário PT/EN + troca dinâmica
│   └── easter-eggs.js   # Konami, console, foto, command palette
├── assets/
│   ├── filipe_rodrigues.pdf
│   └── foto.jpg
└── README.md
```

### Rodar localmente

```bash
python3 -m http.server 8765
# abre em http://localhost:8765/
```

Ou qualquer outro servidor estático (`npx serve`, `caddy file-server`, etc).

---

## Easter eggs

A página esconde **9 detalhes** para visitantes curiosos. Todos (exceto Konami e foto) podem ser acionados pelo command palette:

### 1. 🎮 Konami code

Digite a sequência clássica em qualquer parte da página:

```
↑ ↑ ↓ ↓ ← → ← → B A
```

Resultado: overlay full-screen com uma **chuva de dados** caindo na tela — colunas de palavras como `SELECT`, `df.fit()`, `S3://`, `airflow`, `40 TB/day`, renderizadas com `<canvas>`. Dura ~6 segundos. `Esc` cancela antes.

Junto aparece um toast confirmando: *"🎉 Modo Data Engineer ativado"*.

### 2. 💻 Mensagem no DevTools

Abra o console do navegador (F12 / ⌥⌘I). Você verá um ASCII art "FR" colorido na cor de acento atual e uma **mensagem bilíngue** convidando para conversar, que segue o idioma ativo no momento. A mensagem é reemitida ao trocar de idioma.

### 3. 📸 Foto clicada 7×

Clique 7 vezes seguidas na minha foto no hero. Ela gira **360°** com uma animação cubic-bezier suave e aparece um toast comemorativo. Janela de detecção: 2 segundos sem clique reseta o contador.

### 4. ⌘K Command palette

Pressione **`/`** ou **`⌘K`** (Mac) / **`Ctrl+K`** (Win/Linux) em qualquer lugar da página. Abre um command palette estilo Raycast / Linear com comandos organizados em 4 grupos:

**Navegar** — Sobre · Experiência · Skills · Projetos · Contato

**Ações** — Alternar tema · Alternar idioma · Baixar CV · Copiar email

**Diversão** — Modo leitura por voz · Off-duty · Cor de acento · F1 · Flappy

**Externo** — Agendar conversa · LinkedIn · GitHub · MDB

Controles:
- `↑` `↓` — navegar pela lista
- `Enter` — executar comando selecionado
- `Esc` — fechar
- digitar — filtrar por substring

A busca é case-insensitive e considera nome do comando e seção. A ação "Copiar email" usa a Clipboard API com fallback para `document.execCommand`.

### 5. 🔊 Modo leitura por voz (TTS)

Comando: `⌘K → "Ativar leitura por voz"`. Usa a Web Speech API nativa do navegador.

Quando ativo, clique em qualquer parágrafo, título ou bullet para **ouvir** a leitura na voz do sistema, no idioma atual da página (PT-BR ou EN-US). Clique novamente cancela a leitura em andamento. `Esc` desativa o modo.

Não requer conexão com APIs externas — tudo roda no navegador. Qualidade da voz varia por SO.

### 6. 🎨 Modo Off-duty (pichação)

Comando: `⌘K → "Modo Off-duty"`. **Picha o site inteiro** — sobrepõe ~18 tags grafite, stickers e doodles SVG ancorados em pontos do conteúdo real, como se alguém tivesse invadido a página profissional para deixar marcas pessoais:

- **Tags** (handwriting Permanent Marker, rotação aleatória): Niki Lauda > all, RT.66, Crossfit > cardio, post malone, Breaking Bad ⚗, Band of Brothers, Dostoyevsky 😱, Off-duty 🤙
- **Stickers** (caixa colorida estilo skate): 🏈 GO BRONCOS!, 🇧🇷❤️🇦🇴, WEEZER 🎸, Veritasium ⚡, QUEEN 👑, SUBARU 💙, DENVER ⛰️
- **Doodles SVG**: coração na cor de acento, halter na seção de experiência, capacete F1 vermelho nos projetos

Animação sequencial de pop-in (cada uma com ~70ms de delay). Botão flutuante "✕ tirar a pichação" no canto inferior direito (rotação -3°, sombra accent offset). `Esc` ou clique no botão limpa tudo. Redimensionar a janela recoloca as pichações.

### 7. 🎨 Color picker

Comando: `⌘K → "Trocar cor de acento"`. Abre um modal com:

- **8 presets curados** — Burnt orange (padrão), Amber, Emerald, Cyan, Indigo, Purple, Pink, Red
- **Personalizada** — `<input type="color">` nativo para liberdade total
- **Restaurar padrão** — volta ao burnt orange

A cor escolhida é salva em `localStorage` e persiste entre visitas. Hover e soft variants são derivados automaticamente em JS. Funciona em ambos os temas (claro e escuro).

### 8. 🏎️ Mini-jogo F1

Comando: `⌘K → "Jogo: corrida F1"`. Mini-jogo em canvas:

- Carro na **cor de acento atual** (atualiza dinamicamente se você mudar a cor).
- `←` `→` movem entre 4 pistas
- Obstáculos descem aleatoriamente; velocidade aumenta com o tempo
- Score em tempo real no topo
- `R` reinicia · `Esc` sai

### 9. 🐦 Flappy Corporate

Comando: `⌘K → "Flappy corporativo"`. Versão paródica do Flappy Bird:

- Pássaro circular na cor de acento
- `Space` ou click pulam
- Os "canos" são **prédios corporativos parodiados**: FAtDonalds, StarSucks, Bang of America, MetAfterlife, MicroHard, AmaZone, NewtFlux, X (formerly Y)…
- Score = prédios passados
- `R` reinicia · `Esc` sai

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
