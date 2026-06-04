(function () {
    'use strict';

    const translations = {
        pt: {
            'title.page': 'Filipe Rodrigues — Senior Data Engineer & Solution Architect',
            'meta.description': 'Filipe Rodrigues — Senior Data Engineer, Solution Architect e Tech Lead com 22+ anos de experiência em engenharia de dados, arquitetura cloud e plataformas analíticas.',

            'a11y.skip': 'Pular para o conteúdo',
            'a11y.nav': 'Navegação principal',
            'a11y.brand': 'Filipe Rodrigues — início',
            'a11y.theme': 'Alternar tema',
            'a11y.lang': 'Alternar idioma',
            'a11y.socials': 'Redes profissionais',
            'brand.tooltip': 'Filipe Rodrigues (IPA: /fi.ˈli.pɘ rʊ.ˈdri.ɡəʒ/)',

            'nav.about': 'Sobre',
            'nav.experience': 'Experiência',
            'nav.skills': 'Skills',
            'nav.projects': 'Projetos',
            'nav.contact': 'Contato',

            'hero.eyebrow': 'Senior Data Engineer · Solution Architect · Tech Lead',
            'hero.title.before': 'Construindo arquiteturas de dados que ',
            'hero.title.accent': 'escalam',
            'hero.title.after': '.',
            'hero.lead': 'Olá, sou o Filipe Rodrigues (IPA: /fi.ˈli.pɘ rʊ.ˈdri.ɡəʒ/). 22+ anos desenhando e operando pipelines, plataformas analíticas e arquiteturas cloud para organizações que processam dezenas de terabytes por dia. Lidero times multidisciplinares com práticas ágeis e DevOps/CI-CD.',
            'hero.cta.cv': 'Baixar CV (PDF)',
            'hero.cta.contact': 'Entrar em contato',
            'hero.cta.schedule': 'Agendar conversa',

            'stats.years': 'anos de experiência',
            'stats.tb': 'processados / dia',
            'stats.users': 'usuários enterprise',
            'stats.clients': 'clientes enterprise',

            'about.title': 'Sobre',
            'about.lead': 'Engenheiro de Dados e Arquiteto de Soluções orientado a resultados. Projeto e implanto pipelines de dados escaláveis, arquiteturas cloud e plataformas analíticas. Lidero times multifuncionais de 18+ engenheiros usando Agile/Scrum e práticas de DevOps/CI-CD. Certificado Alteryx Designer Core & Advanced, com expertise em Python, SQL, Angular, PHP e tecnologias cloud-native (AWS / Azure / GCP).',
            'about.meta.location_label': 'Localização',
            'about.meta.location_value': 'São Paulo, SP — Brasil',
            'about.meta.languages_label': 'Idiomas',
            'about.meta.languages_value': 'Português (nativo) · Inglês (fluente) · Espanhol (conversacional)',
            'about.meta.available_label': 'Disponível para',
            'about.meta.available_value': 'Consultoria · Arquitetura · Tech Leadership · Advisory · Palestras',

            'experience.title': 'Experiência profissional',

            'jobs.goldenlearn.title': 'Release Manager & Solution Architect',
            'jobs.goldenlearn.company': 'Goldenlearn',
            'jobs.goldenlearn.meta': 'Set 2023 – Out 2024 · São Paulo, Brasil',
            'jobs.goldenlearn.b1': 'Arquitetei e coordenei ciclos de entrega ponta a ponta integrando soluções de Data Warehouse e Data Science em 3 projetos simultâneos.',
            'jobs.goldenlearn.b2': 'Implementei automação de fluxos de dados e pipelines em tempo real com IA/ML, reduzindo intervenção manual em 40% e acelerando time-to-insight em 180%.',
            'jobs.goldenlearn.b3': 'Liderei time multifuncional de 10+ engenheiros, elevando a taxa de entrega no prazo de 20% para 60%.',
            'jobs.goldenlearn.b4': 'Padronizei práticas de release management em 3 linhas de produto, reduzindo defeitos pós-release em 18%.',

            'jobs.kreios.title': 'QA Engineer & Test Automation Engineer',
            'jobs.kreios.company': 'Kreios (Luxemburgo) — projeto SustainCERT',
            'jobs.kreios.meta': 'Mar 2022 – Out 2023 · Luxemburgo (Remoto)',
            'jobs.kreios.b1': 'QA e automação dedicada à plataforma SustainCERT — sistema de certificação de impacto climático regulado.',
            'jobs.kreios.b2': 'Projetei suítes automatizadas cobrindo 1000+ cenários funcionais, de regressão e integração em 2 ambientes, aumentando detecção de defeitos pré-release em até 25%.',
            'jobs.kreios.b3': 'Conduzi processos de release ponta a ponta com 6 deploys por trimestre.',
            'jobs.kreios.b4': 'Reduzi incidentes de rollback em 10% via melhorias em Go-Live e retrospectivas.',
            'jobs.kreios.b5': 'Encurtei ciclo de testes de 7-10 para 2-3 dias com Scrum e Kanban.',

            'jobs.athena.title': 'Tech Lead & Project Coordinator',
            'jobs.athena.company': 'Athena.bi',
            'jobs.athena.meta': 'Out 2018 – Presente · Évora, Portugal (Remoto) · Concorrente',
            'jobs.athena.b1': 'Lidero times entregando soluções analíticas e arquiteturas de dados integrando Alteryx, Python e cloud (AWS/Azure/GCP) para 9+ clientes enterprise.',
            'jobs.athena.b2': 'Arquitetei soluções de BI adotadas por grandes corporações brasileiras e portuguesas dos mercados de publicidade e mídia, suportando 360+ usuários.',
            'jobs.athena.b3': 'Cadência média de 1-2 deploys por mês com práticas DevOps.',
            'jobs.athena.b4': 'Pipelines processando 1 TB/dia a partir de 55+ sistemas fonte.',

            'jobs.bbi.title': 'Partner / CTO',
            'jobs.bbi.company': 'BBI.Solutions',
            'jobs.bbi.meta': 'Jun 2015 – Presente · São Paulo, Brasil · Concorrente',
            'jobs.bbi.b1': 'Cofundador e diretor de estratégia tecnológica em empresa de produtos de dados; escalei produtos Big Data para 30+ clientes enterprise, com volume agregado > 60 TB.',
            'jobs.bbi.b2': 'Liderei iniciativas de integração de Data Warehouse e modelos de ML em produção para análise estratégica.',
            'jobs.bbi.b3': 'Supervisiono operações e releases em ambientes de 4-10 milhões de transações/dia, gerenciando times de até 30 engenheiros.',
            'jobs.bbi.b4': 'Construí e mantenho modelos avançados de analytics, integrando 100+ datasets.',

            'jobs.band.title': 'Multimedia Developer — Market Intelligence',
            'jobs.band.company': 'Grupo Bandeirantes de Comunicação',
            'jobs.band.meta': 'Jul 2014 – Jun 2015 · São Paulo, Brasil',
            'jobs.band.b1': 'Engenheirei soluções multimídia de BI com Tableau, Alteryx, HTML5, JavaScript e Ionic para 2400+ stakeholders internos.',
            'jobs.band.b2': 'Distribuição mobile de analytics via Phonegap/Cordova, expandindo acesso em mais de 50%.',

            'jobs.aennova.title': 'Software Engineering Lead',
            'jobs.aennova.company': 'Aennova',
            'jobs.aennova.meta': '2008 – 2014 · São Paulo, Brasil',
            'jobs.aennova.b1': 'Gestão técnica de soluções de games e e-learning entregues em parceria com fornecedores.',
            'jobs.aennova.b2': 'Modelagem e validação via System Dynamics com desk-testing antes da implementação.',
            'jobs.aennova.b3': 'Análise UML para serious games, traduzindo requisitos pedagógicos em arquiteturas funcionais.',
            'jobs.aennova.b4': 'Frameworks de comunicação entre engines de simulação e interfaces visuais.',

            'jobs.md.title': 'Professor universitário — Game Development',
            'jobs.md.company': 'MD Educacional',
            'jobs.md.meta': '2008 · São Paulo, Brasil',
            'jobs.md.b1': 'Ensino de Game Development na graduação (200 alunos, 3 turmas), desenho de currículo e projetos práticos com POO e System Dynamics.',

            'jobs.unasp.title': 'Senior Developer — Delphi & PHP',
            'jobs.unasp.company': 'Centro Universitário Adventista de São Paulo (UNASP)',
            'jobs.unasp.meta': 'Jan 2004 – Jun 2008 · São Paulo, Brasil',
            'jobs.unasp.b1': 'Desenvolvi e mantive sistemas Delphi e PHP para 5000+ usuários, com análise, integração e QA ponta a ponta.',
            'jobs.unasp.b2': 'Liderei dois grupos de pesquisa institucionais:',
            'jobs.unasp.b2a': 'Processamento Distribuído — arquiteturas e técnicas aplicadas a sistemas corporativos.',
            'jobs.unasp.b2b': 'System Dynamics & Simulação — modelos para aprendizagem baseada em jogos e simuladores corporativos.',
            'jobs.unasp.b3': 'Redução de 7-12% em incidentes de produção através de melhorias em QA.',

            'skills.title': 'Habilidades técnicas',
            'skills.languages': 'Linguagens',
            'skills.data': 'Dados & Analytics',
            'skills.ai': 'IA & Data Science',
            'skills.ai.badge': 'MIT',
            'skills.db': 'Bancos de dados',
            'skills.cloud': 'Cloud & DevOps',
            'skills.frameworks': 'Frameworks & Tools',
            'skills.methods': 'Metodologias',

            'certs.title': 'Certificações',
            'certs.active': 'Ativo',
            'certs.alteryx_core.desc': 'Alteryx',
            'certs.alteryx_adv.desc': 'Alteryx',
            'certs.alteryx_pro.desc': 'Alteryx · Jul 2016',
            'certs.mit.desc': 'MIT Schwarzman College of Computing · Dez 2023',
            'certs.uchicago.title': 'Storytelling com Dados Estratégicos',
            'certs.uchicago.desc': 'University of Chicago · Dez 2023',

            'edu.title': 'Educação',
            'edu.ugf.title': 'Especialização em Gestão de TI — Engenharia de Software',
            'edu.ugf.meta': 'Universidade Gama Filho · 2009 – 2010 · Rio de Janeiro, Brasil',
            'edu.ugf.desc': 'Programa focado em projetos de alta variabilidade sob prazos curtos, com aplicação de Agile, SCRUM e ITIL. Ênfase em System Dynamics e simulação de negócios.',
            'edu.unicesumar.title': 'Tecnólogo em Informática',
            'edu.unicesumar.meta': 'UniCesumar · 2000 – 2003 · Brasil',

            'projects.title': 'Projetos relevantes',
            'projects.mdb.title': 'MDB – Mídia Dados Brasil',
            'projects.mdb.desc': 'Plataforma interativa de visualização de dados construída para BBI.Solutions, permitindo análises demográficas e de mídia ao longo do tempo. Adotada por 75% das grandes mídias brasileiras; processa dados demográficos de 100+ fontes.',
            'projects.athena.title': 'Athena.bi BI Platform',
            'projects.athena.desc': 'Plataforma de inteligência de dados servindo 4000+ especialistas de marketing e vendas nos mercados português e brasileiro, com analytics avançado e ferramentas de decisão sobre 100+ fontes de dados.',
            'projects.life.title': 'Life Academy',
            'projects.life.badge': 'sem fins lucrativos',
            'projects.life.desc': 'Iniciativa sem fins lucrativos que fundei em 2020, focada em desenvolvimento pessoal e profissional. 2500+ pessoas atendidas em workshops, mentorias e conteúdos sobre tecnologia, soft skills e empreendedorismo. Plataforma multilíngue.',

            'contact.title': 'Vamos conversar',
            'contact.lead': 'Aberto para conversas sobre consultoria, arquitetura de dados, tech leadership, advisory e palestras.',
            'contact.cta.email': 'Enviar email',
            'contact.cta.schedule': 'Agendar conversa',
            'contact.cta.linkedin': 'LinkedIn',
            'contact.cta.cv': 'Baixar CV',

            'footer.tagline': 'Feito com cuidado em São Paulo',

            'lang.label': 'Idioma',

            'cmdk.placeholder': 'Buscar um comando…',
            'cmdk.empty': 'Nada encontrado.',
            'cmdk.hint': '↑↓ navegar · ↵ executar · esc fechar',
            'cmdk.section.nav': 'Navegar',
            'cmdk.section.actions': 'Ações',
            'cmdk.section.external': 'Externo',
            'cmdk.go.about': 'Ir para Sobre',
            'cmdk.go.experience': 'Ir para Experiência',
            'cmdk.go.skills': 'Ir para Skills',
            'cmdk.go.projects': 'Ir para Projetos',
            'cmdk.go.contact': 'Ir para Contato',
            'cmdk.toggle.theme': 'Alternar tema (claro/escuro)',
            'cmdk.toggle.lang': 'Alternar idioma (PT/EN)',
            'cmdk.download.cv': 'Baixar CV',
            'cmdk.copy.email': 'Copiar email',
            'cmdk.open.linkedin': 'Abrir LinkedIn',
            'cmdk.open.github': 'Abrir GitHub',
            'cmdk.open.mdb': 'Abrir MDB – Mídia Dados Brasil',
            'cmdk.open.schedule': 'Agendar conversa (Google Calendar)',

            'toast.konami': '🎉 Modo Data Engineer ativado',
            'toast.photo': '🏆 22+ anos em um clique. Bora conversar?',
            'toast.email_copied': '✓ Email copiado para a área de transferência',

            'console.greeting': 'Curtindo o código? Vamos trocar uma ideia: filiperp@gmail.com',
            'console.hint': 'Dica: experimente o Konami code ↑↑↓↓←→←→BA ou tecle "/" para o command palette.',

            'cmdk.section.fun': 'Diversão',
            'cmdk.tts.toggle': 'Ativar leitura por voz',
            'cmdk.tts.toggle_off': 'Desativar leitura por voz',
            'cmdk.offduty': 'Modo Off-duty (pichação)',
            'cmdk.color': 'Trocar cor de acento',
            'cmdk.game.f1': '🏎️ Jogo: corrida F1',
            'cmdk.game.flappy': '🐦 Flappy corporativo',

            'toast.tts_on': '🔊 Leitura ativa — clique em qualquer texto',
            'toast.tts_off': '🔇 Leitura desativada',
            'toast.tts_unsupported': 'TTS não suportado neste navegador',

            'offduty.exit': '✕ tirar a pichação',
            'graff.1': '🏈 GO BRONCOS!',
            'graff.2': 'Niki Lauda > all',
            'graff.4': 'RT.66 🚐',
            'graff.5': '🇧🇷 ❤️ 🇦🇴',
            'graff.6': 'Crossfit > cardio',
            'graff.7': 'WEEZER 🎸',
            'graff.8': 'post malone',
            'graff.10': 'Veritasium ⚡',
            'graff.11': 'Breaking Bad ⚗',
            'graff.12': 'QUEEN 👑',
            'graff.13': 'Band of Brothers',
            'graff.15': 'SUBARU 💙',
            'graff.16': 'Dostoyevsky 😱',
            'graff.17': 'DENVER ⛰️',
            'graff.18': 'Off-duty 🤙',

            'color.title': 'Cor de acento',
            'color.subtitle': 'Escolha um preset ou personalize',
            'color.custom': 'Personalizada',
            'color.reset': 'Restaurar padrão',
            'color.close': 'Fechar',

            'game.controls': '← → mover · Esc sair · R reiniciar',
            'game.f1.title': '🏎️ Corrida F1',
            'game.f1.score': 'Pontos',
            'game.f1.over': 'Game Over — pressione R para reiniciar',
            'game.flappy.title': '🐦 Flappy Corporate',
            'game.flappy.start': 'Space ou click para começar',
            'game.flappy.controls': 'Space/click pular · Esc sair · R reiniciar',
            'game.flappy.over': 'Game Over — R para reiniciar'
        },

        en: {
            'title.page': 'Filipe Rodrigues — Senior Data Engineer & Solution Architect',
            'meta.description': 'Filipe Rodrigues — Senior Data Engineer, Solution Architect and Tech Lead with 22+ years of experience in data engineering, cloud architecture, and analytics platforms.',

            'a11y.skip': 'Skip to content',
            'a11y.nav': 'Main navigation',
            'a11y.brand': 'Filipe Rodrigues — home',
            'a11y.theme': 'Toggle theme',
            'a11y.lang': 'Toggle language',
            'a11y.socials': 'Professional networks',
            'brand.tooltip': 'Filipe Rodrigues (IPA: /fi.ˈli.pɘ rʊ.ˈdri.ɡəʒ/)',

            'nav.about': 'About',
            'nav.experience': 'Experience',
            'nav.skills': 'Skills',
            'nav.projects': 'Projects',
            'nav.contact': 'Contact',

            'hero.eyebrow': 'Senior Data Engineer · Solution Architect · Tech Lead',
            'hero.title.before': 'Building data architectures that ',
            'hero.title.accent': 'scale',
            'hero.title.after': '.',
            'hero.lead': "Hi, I'm Filipe Rodrigues (IPA: /fi.ˈli.pɘ rʊ.ˈdri.ɡəʒ/). 22+ years designing and operating pipelines, analytics platforms, and cloud architectures for organizations processing tens of terabytes per day. I lead cross-functional teams with Agile and DevOps/CI-CD practices.",
            'hero.cta.cv': 'Download CV (PDF)',
            'hero.cta.contact': 'Get in touch',
            'hero.cta.schedule': 'Schedule a chat',

            'stats.years': 'years of experience',
            'stats.tb': 'processed / day',
            'stats.users': 'enterprise users',
            'stats.clients': 'enterprise clients',

            'about.title': 'About',
            'about.lead': 'Results-driven Data Engineer and Solution Architect. I design and deploy scalable data pipelines, cloud architectures, and analytics platforms. I lead cross-functional teams of 18+ engineers using Agile/Scrum and DevOps/CI-CD practices. Certified Alteryx Designer Core & Advanced, with expertise in Python, SQL, Angular, PHP, and cloud-native technologies (AWS / Azure / GCP).',
            'about.meta.location_label': 'Location',
            'about.meta.location_value': 'São Paulo, SP — Brazil',
            'about.meta.languages_label': 'Languages',
            'about.meta.languages_value': 'Portuguese (native) · English (fluent) · Spanish (conversational)',
            'about.meta.available_label': 'Available for',
            'about.meta.available_value': 'Consulting · Architecture · Tech Leadership · Advisory · Speaking',

            'experience.title': 'Professional experience',

            'jobs.goldenlearn.title': 'Release Manager & Solution Architect',
            'jobs.goldenlearn.company': 'Goldenlearn',
            'jobs.goldenlearn.meta': 'Sep 2023 – Oct 2024 · São Paulo, Brazil',
            'jobs.goldenlearn.b1': 'Architected and coordinated end-to-end product delivery cycles integrating Data Warehouse and Data Science solutions across 3 concurrent projects in high-demand environments.',
            'jobs.goldenlearn.b2': 'Engineered data flow automation and real-time data processing pipelines using AI/ML applications, reducing manual pipeline intervention by 40% and accelerating time-to-insight by 180%.',
            'jobs.goldenlearn.b3': 'Led cross-functional development team of 10+ engineers to meet release timelines, improving on-time delivery rate from 20% to 60%.',
            'jobs.goldenlearn.b4': 'Standardized release management practices across 3 product lines, decreasing post-release defect rate by 18%.',

            'jobs.kreios.title': 'QA Engineer & Test Automation Engineer',
            'jobs.kreios.company': 'Kreios (Luxembourg) — SustainCERT project',
            'jobs.kreios.meta': 'Mar 2022 – Oct 2023 · Luxembourg (Remote)',
            'jobs.kreios.b1': 'Embedded QA and test automation engineer exclusively allocated to the SustainCERT web platform — a regulated climate-impact certification system.',
            'jobs.kreios.b2': 'Designed and productionized automated test suites covering 1000+ functional, regression, and integration scenarios across 2 environments, raising defect detection rate by up to 25% pre-release.',
            'jobs.kreios.b3': 'Owned release and delivery processes end-to-end, coordinating 6 deployments per quarter.',
            'jobs.kreios.b4': 'Led Go-Live activities and retrospectives, reducing rollback incidents by 10%.',
            'jobs.kreios.b5': 'Standardized QA procedures using Agile frameworks, shortening test-cycle duration from 7-10 to 2-3 days.',

            'jobs.athena.title': 'Tech Lead & Project Coordinator',
            'jobs.athena.company': 'Athena.bi',
            'jobs.athena.meta': 'Oct 2018 – Present · Évora, Portugal (Remote) · Concurrent',
            'jobs.athena.b1': 'Lead engineering teams delivering analytical solutions and data architectures, integrating Alteryx, Python, and cloud platforms (AWS / Azure / GCP) for 9+ enterprise clients.',
            'jobs.athena.b2': 'Architected BI solutions adopted by major Brazilian and Portuguese corporations in the advertising and media markets, supporting 360+ end users.',
            'jobs.athena.b3': 'Coordinate technical teams using DevOps practices, driving an average release cadence of 1-2 deployments per month.',
            'jobs.athena.b4': 'Built data pipelines processing 1 TB/day from 55+ source systems, enabling near-real-time marketing analytics.',

            'jobs.bbi.title': 'Partner / CTO',
            'jobs.bbi.company': 'BBI.Solutions',
            'jobs.bbi.meta': 'Jun 2015 – Present · São Paulo, Brazil · Advisory',
            'jobs.bbi.b1': 'Co-founded and direct technology strategy for a data-products company; built and scaled Big Data products serving 30+ enterprise clients with aggregate data volumes exceeding 60 TB.',
            'jobs.bbi.b2': 'Spearheaded Data Warehouse integration initiatives and productionized machine learning models for strategic data analysis.',
            'jobs.bbi.b3': 'Supervise operations and releases for high-performance environments handling 4-10 million transactions/day, managing cross-functional teams of up to 30 engineers.',
            'jobs.bbi.b4': 'Built and maintain advanced analytics models, onboarding 100+ datasets for enterprise clients.',

            'jobs.band.title': 'Multimedia Developer — Market Intelligence',
            'jobs.band.company': 'Grupo Bandeirantes de Comunicação',
            'jobs.band.meta': 'Jul 2014 – Jun 2015 · São Paulo, Brazil',
            'jobs.band.b1': 'Engineered multimedia BI solutions using Tableau, Alteryx, HTML5, JavaScript, and Ionic, delivering market-intelligence dashboards used by 2400+ internal stakeholders.',
            'jobs.band.b2': 'Productionized mobile analytics distribution via Phonegap/Cordova, expanding internal analytics access by 50+%.',

            'jobs.aennova.title': 'Software Engineering Lead',
            'jobs.aennova.company': 'Aennova',
            'jobs.aennova.meta': '2008 – 2014 · São Paulo, Brazil',
            'jobs.aennova.b1': 'Led technical management of game and e-learning solutions delivered in partnership with third-party vendors.',
            'jobs.aennova.b2': 'Designed and validated System Dynamics models using desk-testing methodologies, ensuring accuracy before implementation.',
            'jobs.aennova.b3': 'Conducted UML analysis for serious games, translating complex behavioral and pedagogical requirements into functional software architectures.',
            'jobs.aennova.b4': 'Engineered frameworks and communication layers bridging System Dynamics simulation engines and visual interfaces.',

            'jobs.md.title': 'University Professor — Game Development',
            'jobs.md.company': 'MD Educacional',
            'jobs.md.meta': '2008 · São Paulo, Brazil',
            'jobs.md.b1': 'Taught Game Development at undergraduate level (200 students, 3 classes), designing curriculum and hands-on projects applying object-oriented programming and System Dynamics.',

            'jobs.unasp.title': 'Senior Developer — Delphi & PHP',
            'jobs.unasp.company': 'Centro Universitário Adventista de São Paulo (UNASP)',
            'jobs.unasp.meta': 'Jan 2004 – Jun 2008 · São Paulo, Brazil',
            'jobs.unasp.b1': 'Developed and maintained Delphi and PHP enterprise systems for educational applications, owning end-to-end system analysis, integration, and QA for institutional platforms serving 5000+ users.',
            'jobs.unasp.b2': 'Led two institutional research groups:',
            'jobs.unasp.b2a': 'Distributed Processing — architectures and techniques for distributed computing applied to enterprise software systems.',
            'jobs.unasp.b2b': 'System Dynamics & Simulation — simulation models for educational and business applications, with focus on game-based learning environments.',
            'jobs.unasp.b3': 'Strengthened QA practices and system reliability, reducing production incidents by 7-12%.',

            'skills.title': 'Technical skills',
            'skills.languages': 'Languages',
            'skills.data': 'Data & Analytics',
            'skills.ai': 'AI & Data Science',
            'skills.ai.badge': 'MIT',
            'skills.db': 'Databases',
            'skills.cloud': 'Cloud & DevOps',
            'skills.frameworks': 'Frameworks & Tools',
            'skills.methods': 'Methodologies',

            'certs.title': 'Certifications',
            'certs.active': 'Active',
            'certs.alteryx_core.desc': 'Alteryx',
            'certs.alteryx_adv.desc': 'Alteryx',
            'certs.alteryx_pro.desc': 'Alteryx · Jul 2016',
            'certs.mit.desc': 'MIT Schwarzman College of Computing · Dec 2023',
            'certs.uchicago.title': 'Storytelling with Strategic Data',
            'certs.uchicago.desc': 'University of Chicago · Dec 2023',

            'edu.title': 'Education',
            'edu.ugf.title': 'Specialization in IT Management — Software Engineering',
            'edu.ugf.meta': 'Universidade Gama Filho · 2009 – 2010 · Rio de Janeiro, Brazil',
            'edu.ugf.desc': 'Program focused on managing high-scope-variability projects under tight deadlines, with practical application of Agile, SCRUM, and ITIL. Research emphasis on System Dynamics and business simulation.',
            'edu.unicesumar.title': "Associate's Degree in Computer Science",
            'edu.unicesumar.meta': 'UniCesumar · 2000 – 2003 · Brazil',

            'projects.title': 'Relevant projects',
            'projects.mdb.title': 'MDB – Mídia Dados Brasil',
            'projects.mdb.desc': 'Interactive data visualization platform built for BBI.Solutions, enabling demographic and media analysis over time. Adopted by 75% of major Brazilian media companies; processes demographic data from 100+ sources.',
            'projects.athena.title': 'Athena.bi BI Platform',
            'projects.athena.desc': 'Data intelligence platform serving 4000+ marketing and sales experts in the Portuguese and Brazilian markets, with advanced analytics and decision-support tools over 100+ data sources.',
            'projects.life.title': 'Life Academy',
            'projects.life.badge': 'non-profit',
            'projects.life.desc': "Non-profit I founded in 2020, focused on personal and professional development. 2500+ people reached through workshops, mentoring, and content on technology, soft skills, and entrepreneurship. Multilingual platform.",

            'contact.title': "Let's talk",
            'contact.lead': "Open to conversations about consulting, data architecture, tech leadership, advisory, and speaking.",
            'contact.cta.email': 'Send email',
            'contact.cta.schedule': 'Schedule a chat',
            'contact.cta.linkedin': 'LinkedIn',
            'contact.cta.cv': 'Download CV',

            'footer.tagline': 'Crafted with care in São Paulo',

            'lang.label': 'Language',

            'cmdk.placeholder': 'Search for a command…',
            'cmdk.empty': 'Nothing found.',
            'cmdk.hint': '↑↓ navigate · ↵ run · esc close',
            'cmdk.section.nav': 'Navigate',
            'cmdk.section.actions': 'Actions',
            'cmdk.section.external': 'External',
            'cmdk.go.about': 'Go to About',
            'cmdk.go.experience': 'Go to Experience',
            'cmdk.go.skills': 'Go to Skills',
            'cmdk.go.projects': 'Go to Projects',
            'cmdk.go.contact': 'Go to Contact',
            'cmdk.toggle.theme': 'Toggle theme (light/dark)',
            'cmdk.toggle.lang': 'Toggle language (PT/EN)',
            'cmdk.download.cv': 'Download CV',
            'cmdk.copy.email': 'Copy email',
            'cmdk.open.linkedin': 'Open LinkedIn',
            'cmdk.open.github': 'Open GitHub',
            'cmdk.open.mdb': 'Open MDB – Mídia Dados Brasil',
            'cmdk.open.schedule': 'Schedule a chat (Google Calendar)',

            'toast.konami': '🎉 Data Engineer mode unlocked',
            'toast.photo': '🏆 22+ years in one click. Want to talk?',
            'toast.email_copied': '✓ Email copied to clipboard',

            'console.greeting': "Enjoying the code? Let's talk: filiperp@gmail.com",
            'console.hint': 'Tip: try the Konami code ↑↑↓↓←→←→BA or press "/" for the command palette.',

            'cmdk.section.fun': 'Fun',
            'cmdk.tts.toggle': 'Enable voice reader',
            'cmdk.tts.toggle_off': 'Disable voice reader',
            'cmdk.offduty': 'Off-duty mode (graffiti)',
            'cmdk.color': 'Change accent color',
            'cmdk.game.f1': '🏎️ Game: F1 race',
            'cmdk.game.flappy': '🐦 Corporate Flappy',

            'toast.tts_on': '🔊 Voice reader on — click any text',
            'toast.tts_off': '🔇 Voice reader off',
            'toast.tts_unsupported': 'TTS not supported in this browser',

            'offduty.exit': '✕ clean it up',
            'graff.1': '🏈 GO BRONCOS!',
            'graff.2': 'Niki Lauda > all',
            'graff.4': 'RT.66 🚐',
            'graff.5': '🇧🇷 ❤️ 🇦🇴',
            'graff.6': 'Crossfit > cardio',
            'graff.7': 'WEEZER 🎸',
            'graff.8': 'post malone',
            'graff.10': 'Veritasium ⚡',
            'graff.11': 'Breaking Bad ⚗',
            'graff.12': 'QUEEN 👑',
            'graff.13': 'Band of Brothers',
            'graff.15': 'SUBARU 💙',
            'graff.16': 'Dostoyevsky 😱',
            'graff.17': 'DENVER ⛰️',
            'graff.18': 'Off-duty 🤙',

            'color.title': 'Accent color',
            'color.subtitle': 'Pick a preset or customize',
            'color.custom': 'Custom',
            'color.reset': 'Reset to default',
            'color.close': 'Close',

            'game.controls': '← → move · Esc exit · R restart',
            'game.f1.title': '🏎️ F1 Race',
            'game.f1.score': 'Score',
            'game.f1.over': 'Game Over — press R to restart',
            'game.flappy.title': '🐦 Corporate Flappy',
            'game.flappy.start': 'Space or click to start',
            'game.flappy.controls': 'Space/click flap · Esc exit · R restart',
            'game.flappy.over': 'Game Over — R to restart'
        }
    };

    const STORAGE_KEY = 'lang';
    const DEFAULT = 'pt';
    const SUPPORTED = ['pt', 'en'];

    function detectInitial() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (SUPPORTED.includes(saved)) return saved;
        const browser = (navigator.language || 'pt').toLowerCase();
        if (browser.startsWith('en')) return 'en';
        return DEFAULT;
    }

    function t(key, lang) {
        const dict = translations[lang] || translations[DEFAULT];
        return dict[key] != null ? dict[key] : key;
    }

    function applyLang(lang) {
        if (!SUPPORTED.includes(lang)) lang = DEFAULT;
        const dict = translations[lang];

        document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');

        // textContent
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            const key = el.getAttribute('data-i18n');
            if (dict[key] != null) el.textContent = dict[key];
        });

        // attributes — format: "attr1:key1;attr2:key2"
        document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
            const spec = el.getAttribute('data-i18n-attr');
            spec.split(';').forEach(function (pair) {
                const idx = pair.indexOf(':');
                if (idx < 0) return;
                const attr = pair.slice(0, idx).trim();
                const key = pair.slice(idx + 1).trim();
                if (dict[key] != null) el.setAttribute(attr, dict[key]);
            });
        });

        // <title>
        if (dict['title.page']) document.title = dict['title.page'];

        // meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && dict['meta.description']) metaDesc.setAttribute('content', dict['meta.description']);

        // lang-toggle visual state
        document.querySelectorAll('[data-lang-option]').forEach(function (el) {
            const opt = el.getAttribute('data-lang-option');
            el.classList.toggle('is-active', opt === lang);
            el.setAttribute('aria-pressed', opt === lang ? 'true' : 'false');
        });

        localStorage.setItem(STORAGE_KEY, lang);

        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
    }

    function currentLang() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (SUPPORTED.includes(saved)) return saved;
        return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'pt';
    }

    function toggleLang() {
        applyLang(currentLang() === 'pt' ? 'en' : 'pt');
    }

    window.__i18n = {
        apply: applyLang,
        current: currentLang,
        toggle: toggleLang,
        t: function (key) { return t(key, currentLang()); },
        supported: SUPPORTED.slice()
    };

    // Apply on load + wire up toggle button
    document.addEventListener('DOMContentLoaded', function () {
        applyLang(detectInitial());
        const btn = document.getElementById('lang-toggle');
        if (btn) btn.addEventListener('click', toggleLang);
    });
})();
