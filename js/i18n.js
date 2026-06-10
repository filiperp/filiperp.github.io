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
            'a11y.menu_open': 'Abrir menu',
            'a11y.menu_close': 'Fechar menu',
            'brand.tooltip': 'Filipe Rodrigues (IPA: /fi.ˈli.pɘ rʊ.ˈdri.ɡəʒ/)',

            'nav.about': 'Sobre',
            'nav.experience': 'Experiência',
            'nav.skills': 'Skills',
            'nav.projects': 'Projetos',
            'nav.companies': 'Empresas',
            'nav.contact': 'Contato',

            'projects.see_all': 'Ver todos os projetos por empresa →',

            'companies.page.title': 'Empresas & Projetos — Filipe Rodrigues',
            'companies.page.meta': 'Portfólio de projetos das três empresas das quais Filipe Rodrigues é sócio: GoldenLearn, BBI.Solutions e Instituto Integratech.',
            'companies.page.eyebrow': 'Portfólio · Empresas das quais sou sócio',
            'companies.page.title_before': 'Três empresas, ',
            'companies.page.title_accent': 'um portfólio',
            'companies.page.title_after': '.',
            'companies.page.lead': 'Cada projeto abaixo está claramente vinculado à empresa que o entrega e ao papel que ocupo nela. Use os links para visitar cada site.',
            'companies.cta.visit_site': 'Visitar site',

            'companies.bbi.name': 'BBI.Solutions',
            'companies.bbi.role': 'Founder · Tech Lead',
            'companies.bbi.lead.before': 'Plataforma de produtos de dados — família ',
            'companies.bbi.lead.after': '. Seis produtos que atendem desde análise multiagente até mídia programática de rádio.',
            'companies.bbi.stats.n1': '30+', 'companies.bbi.stats.l1': 'clientes enterprise',
            'companies.bbi.stats.n2': '60+ TB', 'companies.bbi.stats.l2': 'dados agregados',
            'companies.bbi.stats.n3': '10 anos', 'companies.bbi.stats.l3': 'no mercado',

            'companies.bbi.k2.eyebrow': 'Análise multiagente',
            'companies.bbi.k2.desc': 'Analista de inteligência artificial proativo e multiagente, estruturado sobre um backbone de 3 camadas. Atua como um agente sênior digital — recebe contexto, planeja a investigação, delega a sub-agentes especialistas e devolve a síntese diretamente para o tomador de decisão.',
            'companies.bbi.k2.p1': 'IA multi-agente', 'companies.bbi.k2.p2': 'Backbone 3 camadas', 'companies.bbi.k2.p3': 'Análise proativa',
            'companies.bbi.k2.impact': 'Reduz tempo de análise de horas para minutos em decisões executivas.',

            'companies.bbi.tailor.eyebrow': 'Visualização de dados',
            'companies.bbi.tailor.desc': 'Núcleo de visualização de dados remodelado para clientes da BBI, que integra dashboards do Tableau via trusted ticket. Entrega experiência white-label, controle de acesso granular e o mesmo conjunto analítico que já é referência no mercado de mídia brasileiro.',
            'companies.bbi.tailor.p1': 'Tableau embarcado', 'companies.bbi.tailor.p2': 'Trusted ticket', 'companies.bbi.tailor.p3': 'White-label',
            'companies.bbi.tailor.impact': 'Adotado por 75% das grandes mídias brasileiras.',

            'companies.bbi.livert.eyebrow': 'Audiovisual ao vivo',
            'companies.bbi.livert.desc': 'Central operacional com IA multimodal para monitoramento, transcrição e análise de audiência de livestreams minuto a minuto. Cruza vídeo, áudio e métricas de plataforma em uma única timeline, permitindo reagir em tempo real a quedas de engajamento ou picos de oportunidade.',
            'companies.bbi.livert.p1': 'IA multimodal', 'companies.bbi.livert.p2': 'Tempo real', 'companies.bbi.livert.p3': 'Transcrição + audiência',
            'companies.bbi.livert.impact': 'Análise minuto a minuto de audiência ao vivo, sem espera de relatórios.',

            'companies.bbi.flux.eyebrow': 'Inteligência OOH',
            'companies.bbi.flux.desc': 'Plataforma de inteligência para OOH que calcula o alcance real e o perfil do público nas ruas, cruzando geolocalização, ANATEL e IBGE. Substitui métricas estimadas por evidências cruzadas com fontes oficiais — o anunciante deixa de comprar pontos no mapa e passa a comprar audiência qualificada.',
            'companies.bbi.flux.p1': 'Geolocalização', 'companies.bbi.flux.p2': 'ANATEL', 'companies.bbi.flux.p3': 'IBGE',

            'companies.bbi.argus.eyebrow': 'Brand safety',
            'companies.bbi.argus.desc': 'SaaS de brand safety e auditoria de contexto para publishers: identifica anunciantes e classifica conteúdos via LLM multimodal. Mostra ao publisher exatamente quem anuncia onde — útil para times comerciais, jurídicos e de produto que precisam de evidência (não de planilha).',
            'companies.bbi.argus.p1': 'LLM multimodal', 'companies.bbi.argus.p2': 'Brand safety', 'companies.bbi.argus.p3': 'Publishers',

            'companies.bbi.hertz.eyebrow': 'Mídia radiofônica',
            'companies.bbi.hertz.desc': 'Infraestrutura que transforma rádio offline em mídia programática e líquida, auditada por IA de áudio 24/7 com registro em blockchain. Cada inserção comercial vira evento verificável e cada audiência vira inventário negociável — abrindo o rádio para o mesmo modelo de compra que o digital.',
            'companies.bbi.hertz.p1': 'Áudio 24/7', 'companies.bbi.hertz.p2': 'Blockchain', 'companies.bbi.hertz.p3': 'Mídia programática',

            'companies.goldenlearn.name': 'GoldenLearn',
            'companies.goldenlearn.role': 'CTO',
            'companies.goldenlearn.lead': 'EdTech que combina plataformas de aprendizagem, automação de treinamentos, psicometria e analytics de pessoas. Dez soluções modulares, do conteúdo EAD à gestão de ativos data-driven.',
            'companies.gl.stats.n1': '10', 'companies.gl.stats.l1': 'soluções modulares',
            'companies.gl.stats.n2': '3', 'companies.gl.stats.l2': 'linhas de produto',
            'companies.gl.stats.n3': '10+', 'companies.gl.stats.l3': 'engenheiros no time',

            'companies.gl.paths.eyebrow': 'Plataforma principal',
            'companies.gl.paths.title': 'Paths to Growth',
            'companies.gl.paths.desc': 'Plataforma SaaS que transforma a gestão do desenvolvimento de pessoas e carreiras. Arquitetura modular oferecendo visibilidade, controle e eficiência da capacitação ao crescimento profissional dos colaboradores — o RH deixa de operar por planilhas e passa a operar por trilhas vivas.',
            'companies.gl.paths.p1': 'SaaS', 'companies.gl.paths.p2': 'Arquitetura modular', 'companies.gl.paths.p3': 'Pessoas + carreiras',

            'companies.gl.tdplanner.eyebrow': 'Gestão de treinamentos',
            'companies.gl.tdplanner.title': 'TD Planner',
            'companies.gl.tdplanner.desc': 'Automatiza 100% do ciclo de planejamento, execução e certificação de treinamentos corporativos, com gestão centralizada e ágil. Tira do RH a operação repetitiva e libera tempo para o trabalho que realmente desenvolve gente.',
            'companies.gl.tdplanner.p1': 'Automação 100%', 'companies.gl.tdplanner.p2': 'Planejamento', 'companies.gl.tdplanner.p3': 'Certificação',

            'companies.gl.comprova.eyebrow': 'Avaliação de competências',
            'companies.gl.comprova.title': 'COMPROVA+',
            'companies.gl.comprova.desc': 'SaaS que automatiza a criação de questionários personalizados e gera relatórios analíticos detalhados sobre competências. Apoia decisões críticas de talento — mapeamento de gaps, plano de desenvolvimento individual e sucessão em posições-chave — com base em dado, não em achismo.',
            'companies.gl.comprova.p1': 'SaaS', 'companies.gl.comprova.p2': 'Avaliação personalizada', 'companies.gl.comprova.p3': 'Sucessão',

            'companies.gl.fabrica.eyebrow': 'Produção EAD',
            'companies.gl.fabrica.title': 'Fábrica de Conteúdo EAD',
            'companies.gl.fabrica.desc': 'Estrutura completa para converter treinamentos em experiências digitais — inteligência instrucional, recursos multimídia e integração aos sistemas corporativos. Escala conteúdo sem escalar custo: o conhecimento certo chega à pessoa certa, na hora certa.',
            'companies.gl.fabrica.p1': 'Multimídia', 'companies.gl.fabrica.p2': 'Personalização', 'companies.gl.fabrica.p3': 'Integração corporativa',

            'companies.gl.immersive.eyebrow': 'VR / AR para treinamento',
            'companies.gl.immersive.title': 'Immersive Learn',
            'companies.gl.immersive.desc': 'Virtual Learning que transforma treinamentos complexos em experiências imersivas com realidade virtual, aumentada e simuladores. Ideal para conteúdos DICE (perigosos, raros, caros ou inviáveis) — o aprendiz pratica o cenário difícil antes de viver o real.',
            'companies.gl.immersive.p1': 'VR', 'companies.gl.immersive.p2': 'AR', 'companies.gl.immersive.p3': 'Conteúdo DICE',

            'companies.gl.retention.eyebrow': 'IA para retenção',
            'companies.gl.retention.title': 'HR Retention Machine',
            'companies.gl.retention.desc': 'IA e ciência de dados que identificam riscos de desligamento, preveem padrões de rotatividade e orientam ações estratégicas de retenção. Transforma turnover em sinal early-warning em vez de surpresa de fim de trimestre.',
            'companies.gl.retention.p1': 'IA', 'companies.gl.retention.p2': 'Ciência de dados', 'companies.gl.retention.p3': 'Predição de turnover',
            'companies.gl.retention.impact': 'Antecipa risco de desligamento meses antes do pedido de demissão.',

            'companies.gl.datadriven.eyebrow': 'Cultura data-driven',
            'companies.gl.datadriven.title': 'Gestão Data-Driven',
            'companies.gl.datadriven.desc': 'Business Decision System completo: integração de dados, datalake, definição de KPIs, capacitação analítica e Business Decision Rooms com dashboards interativos. Implanta a cultura de decisão por dado em toda a empresa — não só na sala de TI.',
            'companies.gl.datadriven.p1': 'Datalake', 'companies.gl.datadriven.p2': 'KPIs', 'companies.gl.datadriven.p3': 'Decision Rooms',

            'companies.gl.ativos.eyebrow': 'Gestão de ativos',
            'companies.gl.ativos.title': 'Sistema Inteligente de Gestão de Ativos',
            'companies.gl.ativos.desc': 'Monitoramento e otimização do ciclo de vida de ativos integrando telemetria em tempo real, BI, dashboards e agentes de IA. Da aquisição à revenda — disponibilidade maior, custo menor e valor residual maximizado em cada fase.',
            'companies.gl.ativos.p1': 'Telemetria', 'companies.gl.ativos.p2': 'BI', 'companies.gl.ativos.p3': 'Agentes de IA',

            'companies.gl.ppt.eyebrow': 'Operações & Manutenção',
            'companies.gl.ppt.title': 'Process Performance Tools (PPT)',
            'companies.gl.ppt.desc': 'Solução digital e consultiva que transforma manutenção e operação com modelos de excelência, inspeções estruturadas e monitoramento inteligente. Reduz tempo de parada não-planejada e padroniza a operação em todas as plantas — garantindo disponibilidade, produtividade e segurança.',
            'companies.gl.ppt.p1': 'Inspeções estruturadas', 'companies.gl.ppt.p2': 'Modelos de excelência', 'companies.gl.ppt.p3': 'Monitoramento inteligente',

            'companies.gl.pontosfortes.eyebrow': 'Liderança & psicometria',
            'companies.gl.pontosfortes.title': 'Gestão Pontos Fortes',
            'companies.gl.pontosfortes.desc': 'Modelo de gestão e liderança combinando psicometria de última geração, IA e Big Five para mapear personalidade, talentos e habilidades. Vai além do feedback subjetivo: cada profissional ganha um mapa científico do que potencializa seu melhor desempenho — e cada gestor, um manual de como liderá-lo.',
            'companies.gl.pontosfortes.p1': 'Psicometria', 'companies.gl.pontosfortes.p2': 'Big Five', 'companies.gl.pontosfortes.p3': 'Liderança',
            'companies.gl.pontosfortes.impact': 'Baseado no modelo Big Five validado por Oxford e Johns Hopkins.',

            'companies.integratech.name': 'Instituto Integratech',
            'companies.integratech.role': 'Sócio · Sem fins lucrativos',
            'companies.integratech.lead': 'Instituto sem fins lucrativos que articula tecnologia, saúde e cidadania através de quatro iniciativas complementares.',
            'companies.integratech.life.badge': 'sem fins lucrativos',
            'companies.it.cta': 'Conhecer iniciativa →',
            'companies.it.cta_life': 'Visitar lifeacademy.pro →',
            'companies.it.stats.n1': '4', 'companies.it.stats.l1': 'iniciativas ativas',
            'companies.it.stats.n2': '2500+', 'companies.it.stats.l2': 'pessoas atendidas',
            'companies.it.stats.n3': 'PT · EN', 'companies.it.stats.l3': 'plataforma multilíngue',

            'companies.it.integracity.tagline': 'Software para gestão pública',
            'companies.it.integracity.title': 'IntegraCity',
            'companies.it.integracity.desc': 'Plataforma para reduzir o tempo de execução de tarefas em órgãos públicos, com acessibilidade cloud e segurança de dados como pilares. Hoje é o produto principal da nossa frente tech-pública — leva tecnologia de gestão moderna para quem mais precisa: a máquina pública municipal.',
            'companies.it.integracity.p1': 'Cloud', 'companies.it.integracity.p2': 'Acessibilidade', 'companies.it.integracity.p3': 'Segurança de dados',
            'companies.it.integracity.impact': 'Plataforma de cabeceira da frente tech-pública do Instituto.',

            'companies.it.cidades.tagline': 'Saúde pública orientada por dados',
            'companies.it.cidades.title': 'Cidades Saudáveis',
            'companies.it.cidades.desc': 'Programa que conecta dados de saúde pública e políticas urbanas para tornar municípios mais saudáveis. Une diagnóstico territorial, KPIs comparáveis entre cidades e priorização de intervenção baseada em evidências — gestão de saúde pública sai do retrovisor e ganha agenda preventiva.',
            'companies.it.cidades.p1': 'Diagnóstico territorial', 'companies.it.cidades.p2': 'KPIs comparáveis', 'companies.it.cidades.p3': 'Decisão baseada em evidência',

            'companies.it.fourhealth.tagline': 'Desenvolvimento humano integrado',
            'companies.it.fourhealth.title': '4Health',
            'companies.it.fourhealth.desc': 'Iniciativa de saúde integrativa baseada em dados e prevenção, conectando desenvolvimento humano, empregabilidade e empreendedorismo. Olha o indivíduo inteiro — físico, mental, financeiro e profissional — e oferece trilhas práticas para sair do diagnóstico e chegar à ação.',
            'companies.it.fourhealth.p1': 'Desenvolvimento humano', 'companies.it.fourhealth.p2': 'Empregabilidade', 'companies.it.fourhealth.p3': 'Empreendedorismo',

            'companies.it.life.tagline': 'Desenvolvimento pessoal & profissional',
            'companies.it.life.title': 'Life Academy',
            'companies.it.life.desc': 'Iniciativa que fundei em 2020, focada em desenvolvimento pessoal e profissional. 2500+ pessoas atendidas em workshops, mentorias e conteúdos sobre tecnologia, soft skills e empreendedorismo, numa plataforma multilíngue que cresceu como comunidade ativa — não como base de e-mails.',
            'companies.it.life.p1': '2500+ pessoas atendidas', 'companies.it.life.p2': 'Multilíngue (PT/EN/ES)', 'companies.it.life.p3': 'Comunidade ativa',
            'companies.it.life.invite': 'Quer conhecer o trabalho de perto? Visite o site e veja workshops, mentorias e a comunidade ativa.',

            'compare.title': 'Comparativo rápido',
            'compare.lead': 'Três empresas, três modos de operar. Resumo prático para você situar.',
            'compare.focus': 'Foco',
            'compare.lineup': 'Linha',
            'compare.role': 'Posição',
            'compare.signal': 'Diferencial',
            'compare.bbi.focus': 'Produtos de dados para mídia e publicidade',
            'compare.bbi.lineup': '6 produtos self.bi (k2, tailor, liveRT, flux, argus, hertz)',
            'compare.bbi.role': 'Founder · Tech Lead',
            'compare.bbi.signal': 'Especialização técnica profunda em mídia + IA',
            'compare.gl.focus': 'EdTech corporativa de ponta a ponta',
            'compare.gl.lineup': '10 soluções modulares — pessoas, conteúdo e ativos',
            'compare.gl.role': 'CTO',
            'compare.gl.signal': 'Stack inteira sob um mesmo guarda-chuva',
            'compare.it.focus': 'Tecnologia social — saúde, cidades e pessoas',
            'compare.it.lineup': '4 iniciativas (IntegraCity, Cidades Saudáveis, 4Health, Life Academy)',
            'compare.it.role': 'Sócio · Sem fins lucrativos',
            'compare.it.signal': 'Impacto público e desenvolvimento humano',

            'print.button': 'Baixar PDF',

            'companies.back.title': 'Quer ver o resto?',
            'companies.back.lead': 'Sobre, experiência, skills e contato continuam na página principal.',
            'companies.back.cta': 'Voltar ao início',

            'hero.eyebrow': 'Senior Data Engineer · Solution Architect · Tech Lead',
            'hero.title.before': 'Construindo arquiteturas de dados que ',
            'hero.title.accent': 'escalam',
            'hero.title.after': '.',
            'hero.lead': '22+ anos desenhando e operando pipelines, plataformas analíticas e arquiteturas cloud para organizações que processam dezenas de terabytes por dia. Lidero times multidisciplinares com práticas ágeis e DevOps/CI-CD.',
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
            'jobs.athena.meta': 'Out 2018 – Presente · Évora, Portugal (Remoto) · Em paralelo',
            'jobs.athena.b1': 'Lidero times entregando soluções analíticas e arquiteturas de dados integrando Alteryx, Python e cloud (AWS/Azure/GCP) para 9+ clientes enterprise.',
            'jobs.athena.b2': 'Arquitetei soluções de BI adotadas por grandes corporações brasileiras e portuguesas dos mercados de publicidade e mídia, suportando 360+ usuários.',
            'jobs.athena.b3': 'Cadência média de 1-2 deploys por mês com práticas DevOps.',
            'jobs.athena.b4': 'Pipelines processando 1 TB/dia a partir de 55+ sistemas fonte.',

            'jobs.bbi.title': 'Partner / CTO',
            'jobs.bbi.company': 'BBI.Solutions',
            'jobs.bbi.meta': 'Jun 2015 – Presente · São Paulo, Brasil · Em paralelo',
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
            'skills.yrs': 'anos',
            'skills.yr': 'ano',
            'skills.languages': 'Linguagens',
            'skills.data': 'Dados & Analytics',
            'skills.ai': 'IA & Data Science',
            'skills.ai.badge': 'MIT',
            'skills.db': 'Bancos de dados',
            'skills.cloud': 'Cloud & DevOps',
            'skills.frontend': 'Frontend Frameworks',
            'skills.backend': 'Backend Frameworks',
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
            'footer.cta_label': 'Próximo passo',
            'footer.cta': 'Vamos construir algo juntos? →',
            'footer.nav_label': 'Mapa',
            'footer.meta_label': 'Daqui',
            'footer.status_title': 'Métricas reais desta página via Performance API',

            'lang.label': 'Idioma',

            'cmdk.placeholder': 'Buscar um comando… (ou digite SQL)',
            'cmdk.empty': 'Nada encontrado.',
            'cmdk.hint': '↑↓ navegar · ↵ executar · esc fechar · psiu: SELECT * FROM experience',
            'cmdk.sql_hint': 'dica: tente SELECT * FROM skills ORDER BY years DESC',
            'cmdk.sql_mode_hint': 'modo SQL · SHOW TABLES lista as tabelas · esc fechar',
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
            'cmdk.game.worms': '🐛 Batalha de artilharia',

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
            'game.flappy.over': 'Game Over — R para reiniciar',
            'game.worms.title': '🐛 Batalha de Artilharia',
            'game.worms.controls': '←→ mover · ↑↓ ângulo · Espaço atirar (segure) · P pausa · no touch, arraste o tanque',

            'game.mute': 'Silenciar sons',
            'game.unmute': 'Ativar sons',
            'game.paused': 'Pausado',
            'game.resume_hint': 'Clique ou pressione Espaço para continuar',
            'game.restart': 'Reiniciar',
            'game.close': 'Fechar',
            'game.score_final': 'Pontuação',
            'game.best': 'Recorde',
            'game.new_record': 'NOVO RECORDE!',
            'game.f1.near_miss': 'PERTO! +25',
            'game.flappy.medal_bronze': 'Medalha de bronze',
            'game.flappy.medal_silver': 'Medalha de prata',
            'game.flappy.medal_gold': 'Medalha de ouro',
            'game.worms.mode_title': 'Escolha o modo',
            'game.worms.mode_cpu': '1 Jogador (vs CPU)',
            'game.worms.mode_2p': '2 Jogadores',
            'game.worms.you': 'Você',
            'game.worms.player': 'Jogador',
            'game.worms.wins': 'venceu!',
            'game.worms.win_you': 'Você venceu! 🏆',
            'game.worms.win_cpu': 'A CPU venceu!',
            'game.worms.wind': 'Vento',
            'game.worms.cpu_thinking': 'CPU mirando...',

            'cmdk.achievements': '🏆 Conquistas',
            'cmdk.rain': '🌧️ Chuva de dados',
            'ach.title': 'Conquistas',
            'ach.subtitle': 'Easter eggs descobertos nesta página',
            'ach.locked': 'Continue explorando…',
            'ach.close': 'Fechar',
            'ach.all_done': '🎉 100%! Você encontrou todos os easter eggs. Respeito.',
            'ach.cmdk.name': 'Atalho de quem sabe',
            'ach.cmdk.desc': 'Abriu o command palette (⌘K ou /)',
            'ach.theme.name': 'Fotossensível',
            'ach.theme.desc': 'Alternou entre tema claro e escuro',
            'ach.lang.name': 'Bilíngue',
            'ach.lang.desc': 'Trocou o idioma da página',
            'ach.konami.name': 'Old school',
            'ach.konami.desc': 'Digitou o Konami code ↑↑↓↓←→←→BA',
            'ach.avatar.name': 'Paparazzi',
            'ach.avatar.desc': 'Clicou 7× na foto e ela girou',
            'ach.tts.name': 'Modo audiobook',
            'ach.tts.desc': 'Ativou a leitura por voz',
            'ach.offduty.name': 'Pichador',
            'ach.offduty.desc': 'Viu o site fora do expediente',
            'ach.color.name': 'Decorador',
            'ach.color.desc': 'Trocou a cor de acento do site',
            'ach.f1.name': 'Box, box!',
            'ach.f1.desc': 'Pilotou na corrida de F1',
            'ach.flappy.name': 'Demissão voluntária',
            'ach.flappy.desc': 'Voou entre prédios corporativos',
            'ach.worms.name': 'Artilheiro',
            'ach.worms.desc': 'Disparou na batalha de artilharia',
            'ach.sql.name': 'SELECT * FROM cv',
            'ach.sql.desc': 'Consultou o currículo via SQL no ⌘K',

            'err.page_title': '404 — Filipe Rodrigues',
            'err.eyebrow': 'DAG site_router · execução falhou',
            'err.title': 'Esta rota não retornou nenhuma linha.',
            'err.cta_home': '← Voltar ao DAG principal',
            'err.cta_projects': 'Ver projetos',
            'err.cta_game': 'Enquanto o on-call não responde… 🐦'
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
            'a11y.menu_open': 'Open menu',
            'a11y.menu_close': 'Close menu',
            'brand.tooltip': 'Filipe Rodrigues (IPA: /fi.ˈli.pɘ rʊ.ˈdri.ɡəʒ/)',

            'nav.about': 'About',
            'nav.experience': 'Experience',
            'nav.skills': 'Skills',
            'nav.projects': 'Projects',
            'nav.companies': 'Companies',
            'nav.contact': 'Contact',

            'projects.see_all': 'See all projects by company →',

            'companies.page.title': 'Companies & Projects — Filipe Rodrigues',
            'companies.page.meta': 'Project portfolio of the three companies Filipe Rodrigues is a partner in: GoldenLearn, BBI.Solutions, and Instituto Integratech.',
            'companies.page.eyebrow': 'Portfolio · Companies I’m a partner in',
            'companies.page.title_before': 'Three companies, ',
            'companies.page.title_accent': 'one portfolio',
            'companies.page.title_after': '.',
            'companies.page.lead': 'Each project below is clearly linked to the company that delivers it and to my role there. Use the links to visit each website.',
            'companies.cta.visit_site': 'Visit website',

            'companies.bbi.name': 'BBI.Solutions',
            'companies.bbi.role': 'Founder · Tech Lead',
            'companies.bbi.lead.before': 'Data products platform — the ',
            'companies.bbi.lead.after': ' family. Six products ranging from proactive multi-agent analysis to programmatic radio media.',
            'companies.bbi.stats.n1': '30+', 'companies.bbi.stats.l1': 'enterprise clients',
            'companies.bbi.stats.n2': '60+ TB', 'companies.bbi.stats.l2': 'aggregated data',
            'companies.bbi.stats.n3': '10 years', 'companies.bbi.stats.l3': 'in the market',

            'companies.bbi.k2.eyebrow': 'Multi-agent analysis',
            'companies.bbi.k2.desc': 'Proactive, multi-agent AI analyst structured on a 3-layer backbone. Acts as a digital senior analyst — receives context, plans the investigation, delegates to specialist sub-agents, and delivers a synthesis straight to the decision-maker.',
            'companies.bbi.k2.p1': 'Multi-agent AI', 'companies.bbi.k2.p2': '3-layer backbone', 'companies.bbi.k2.p3': 'Proactive analysis',
            'companies.bbi.k2.impact': 'Cuts executive analysis time from hours to minutes.',

            'companies.bbi.tailor.eyebrow': 'Data visualization',
            'companies.bbi.tailor.desc': 'Data visualization core rebuilt for BBI clients, integrating Tableau dashboards via trusted ticket. White-label experience, granular access control, and the analytical toolkit already considered a reference in the Brazilian media market.',
            'companies.bbi.tailor.p1': 'Embedded Tableau', 'companies.bbi.tailor.p2': 'Trusted ticket', 'companies.bbi.tailor.p3': 'White-label',
            'companies.bbi.tailor.impact': 'Adopted by 75% of Brazil’s largest media companies.',

            'companies.bbi.livert.eyebrow': 'Live audiovisual',
            'companies.bbi.livert.desc': 'Operational hub with multimodal AI for monitoring, transcribing, and analyzing livestream audiences minute by minute. Cross-references video, audio, and platform metrics on a single timeline — letting teams react in real time to engagement dips and growth spikes.',
            'companies.bbi.livert.p1': 'Multimodal AI', 'companies.bbi.livert.p2': 'Real time', 'companies.bbi.livert.p3': 'Transcript + audience',
            'companies.bbi.livert.impact': 'Live audience analysis minute by minute, no waiting on reports.',

            'companies.bbi.flux.eyebrow': 'OOH intelligence',
            'companies.bbi.flux.desc': 'Out-of-home intelligence platform that calculates real reach and audience profile on the streets, combining geolocation, ANATEL, and IBGE data. Replaces estimated metrics with evidence cross-checked against official sources — advertisers stop buying dots on a map and start buying qualified audience.',
            'companies.bbi.flux.p1': 'Geolocation', 'companies.bbi.flux.p2': 'ANATEL', 'companies.bbi.flux.p3': 'IBGE',

            'companies.bbi.argus.eyebrow': 'Brand safety',
            'companies.bbi.argus.desc': 'SaaS for brand safety and context auditing for publishers — identifies advertisers and classifies content via multimodal LLMs. Shows publishers exactly who advertises where, useful for sales, legal, and product teams that need evidence (not a spreadsheet).',
            'companies.bbi.argus.p1': 'Multimodal LLM', 'companies.bbi.argus.p2': 'Brand safety', 'companies.bbi.argus.p3': 'Publishers',

            'companies.bbi.hertz.eyebrow': 'Radio media',
            'companies.bbi.hertz.desc': 'Infrastructure that turns offline radio into programmatic, liquid media — audited 24/7 by audio AI and recorded on blockchain. Every commercial insertion becomes a verifiable event and every audience becomes negotiable inventory, opening radio to the same buying model as digital.',
            'companies.bbi.hertz.p1': 'Audio 24/7', 'companies.bbi.hertz.p2': 'Blockchain', 'companies.bbi.hertz.p3': 'Programmatic media',

            'companies.goldenlearn.name': 'GoldenLearn',
            'companies.goldenlearn.role': 'CTO',
            'companies.goldenlearn.lead': 'EdTech combining learning platforms, training automation, psychometry, and people analytics. Ten modular solutions, from EAD content to data-driven asset management.',
            'companies.gl.stats.n1': '10', 'companies.gl.stats.l1': 'modular solutions',
            'companies.gl.stats.n2': '3', 'companies.gl.stats.l2': 'product lines',
            'companies.gl.stats.n3': '10+', 'companies.gl.stats.l3': 'engineers on the team',

            'companies.gl.paths.eyebrow': 'Main platform',
            'companies.gl.paths.title': 'Paths to Growth',
            'companies.gl.paths.desc': 'SaaS platform transforming people development and career management. Modular architecture offering visibility, control, and efficiency from training to professional growth — HR moves from spreadsheets to living journeys.',
            'companies.gl.paths.p1': 'SaaS', 'companies.gl.paths.p2': 'Modular architecture', 'companies.gl.paths.p3': 'People + careers',

            'companies.gl.tdplanner.eyebrow': 'Training management',
            'companies.gl.tdplanner.title': 'TD Planner',
            'companies.gl.tdplanner.desc': 'Automates 100% of the planning, execution, and certification cycle of corporate training, with centralized, agile management. Takes the repetitive ops off HR and frees up time for the work that actually develops people.',
            'companies.gl.tdplanner.p1': '100% automation', 'companies.gl.tdplanner.p2': 'Planning', 'companies.gl.tdplanner.p3': 'Certification',

            'companies.gl.comprova.eyebrow': 'Competency assessment',
            'companies.gl.comprova.title': 'COMPROVA+',
            'companies.gl.comprova.desc': 'SaaS that automates personalized questionnaire creation and generates detailed analytical reports on competencies. Backs critical talent decisions — gap mapping, individual development plans, succession in key positions — with data, not gut feel.',
            'companies.gl.comprova.p1': 'SaaS', 'companies.gl.comprova.p2': 'Personalized assessment', 'companies.gl.comprova.p3': 'Succession',

            'companies.gl.fabrica.eyebrow': 'EAD production',
            'companies.gl.fabrica.title': 'EAD Content Factory',
            'companies.gl.fabrica.desc': 'End-to-end structure to convert trainings into digital experiences — instructional intelligence, multimedia resources, and integration with corporate systems. Scales content without scaling cost: the right knowledge reaches the right person at the right time.',
            'companies.gl.fabrica.p1': 'Multimedia', 'companies.gl.fabrica.p2': 'Personalization', 'companies.gl.fabrica.p3': 'Corporate integration',

            'companies.gl.immersive.eyebrow': 'VR / AR training',
            'companies.gl.immersive.title': 'Immersive Learn',
            'companies.gl.immersive.desc': 'Virtual Learning that turns complex training into immersive experiences with VR, AR, and simulators. Ideal for DICE content (Dangerous, Rare, Expensive, Infeasible) — the trainee rehearses the hard scenario before living the real thing.',
            'companies.gl.immersive.p1': 'VR', 'companies.gl.immersive.p2': 'AR', 'companies.gl.immersive.p3': 'DICE content',

            'companies.gl.retention.eyebrow': 'AI for retention',
            'companies.gl.retention.title': 'HR Retention Machine',
            'companies.gl.retention.desc': 'AI and data science to identify exit risk, predict turnover patterns, and guide strategic retention actions. Turns turnover into an early-warning signal instead of an end-of-quarter surprise.',
            'companies.gl.retention.p1': 'AI', 'companies.gl.retention.p2': 'Data science', 'companies.gl.retention.p3': 'Turnover prediction',
            'companies.gl.retention.impact': 'Predicts exit risk months before the resignation letter.',

            'companies.gl.datadriven.eyebrow': 'Data-driven culture',
            'companies.gl.datadriven.title': 'Data-Driven Management',
            'companies.gl.datadriven.desc': 'Complete Business Decision System: data integration, datalake, KPI definition, analytical capability building, and Business Decision Rooms with interactive dashboards. Deploys the data-decision culture across the entire company — not just inside IT.',
            'companies.gl.datadriven.p1': 'Datalake', 'companies.gl.datadriven.p2': 'KPIs', 'companies.gl.datadriven.p3': 'Decision Rooms',

            'companies.gl.ativos.eyebrow': 'Asset management',
            'companies.gl.ativos.title': 'Intelligent Asset Management System',
            'companies.gl.ativos.desc': 'Asset lifecycle monitoring and optimization integrating real-time telemetry, BI, dashboards, and AI agents. From acquisition to resale — higher uptime, lower cost, and maximized residual value at every phase.',
            'companies.gl.ativos.p1': 'Telemetry', 'companies.gl.ativos.p2': 'BI', 'companies.gl.ativos.p3': 'AI agents',

            'companies.gl.ppt.eyebrow': 'Operations & maintenance',
            'companies.gl.ppt.title': 'Process Performance Tools (PPT)',
            'companies.gl.ppt.desc': 'Digital and consultative solution that transforms maintenance and operations with excellence models, structured inspections, and intelligent monitoring. Reduces unplanned downtime and standardizes operations across plants — ensuring uptime, productivity, and safety.',
            'companies.gl.ppt.p1': 'Structured inspections', 'companies.gl.ppt.p2': 'Excellence models', 'companies.gl.ppt.p3': 'Intelligent monitoring',

            'companies.gl.pontosfortes.eyebrow': 'Leadership & psychometry',
            'companies.gl.pontosfortes.title': 'Strengths-Based Management',
            'companies.gl.pontosfortes.desc': 'Management and leadership model combining state-of-the-art psychometry, AI, and the Big Five to map personality, talents, and skills. Goes beyond subjective feedback: each professional gets a scientific map of what drives their best performance — and each manager, a manual on how to lead them.',
            'companies.gl.pontosfortes.p1': 'Psychometry', 'companies.gl.pontosfortes.p2': 'Big Five', 'companies.gl.pontosfortes.p3': 'Leadership',
            'companies.gl.pontosfortes.impact': 'Based on the Big Five model validated by Oxford and Johns Hopkins.',

            'companies.integratech.name': 'Instituto Integratech',
            'companies.integratech.role': 'Partner · Non-profit',
            'companies.integratech.lead': 'Non-profit institute connecting technology, health, and citizenship through four complementary initiatives.',
            'companies.integratech.life.badge': 'non-profit',
            'companies.it.cta': 'Discover initiative →',
            'companies.it.cta_life': 'Visit lifeacademy.pro →',
            'companies.it.stats.n1': '4', 'companies.it.stats.l1': 'active initiatives',
            'companies.it.stats.n2': '2500+', 'companies.it.stats.l2': 'people reached',
            'companies.it.stats.n3': 'PT · EN', 'companies.it.stats.l3': 'multilingual platform',

            'companies.it.integracity.tagline': 'Software for public administration',
            'companies.it.integracity.title': 'IntegraCity',
            'companies.it.integracity.desc': 'Platform to reduce task execution time in public agencies, with cloud accessibility and data security as pillars. Today it is the lead product of our tech-for-public initiative — bringing modern management technology to those who need it most: the municipal public machine.',
            'companies.it.integracity.p1': 'Cloud', 'companies.it.integracity.p2': 'Accessibility', 'companies.it.integracity.p3': 'Data security',
            'companies.it.integracity.impact': 'Flagship of the Institute’s tech-for-public initiative.',

            'companies.it.cidades.tagline': 'Data-driven public health',
            'companies.it.cidades.title': 'Healthy Cities',
            'companies.it.cidades.desc': 'Program connecting public health data with urban policy to make municipalities healthier. Combines territorial diagnostics, comparable cross-city KPIs, and evidence-based intervention prioritization — public health management moves from rear-view to preventive agenda.',
            'companies.it.cidades.p1': 'Territorial diagnostics', 'companies.it.cidades.p2': 'Comparable KPIs', 'companies.it.cidades.p3': 'Evidence-based decisions',

            'companies.it.fourhealth.tagline': 'Integrated human development',
            'companies.it.fourhealth.title': '4Health',
            'companies.it.fourhealth.desc': 'Integrative health initiative based on data and prevention, connecting human development, employability, and entrepreneurship. Looks at the whole person — physical, mental, financial, and professional — and offers practical paths from diagnosis to action.',
            'companies.it.fourhealth.p1': 'Human development', 'companies.it.fourhealth.p2': 'Employability', 'companies.it.fourhealth.p3': 'Entrepreneurship',

            'companies.it.life.tagline': 'Personal & professional growth',
            'companies.it.life.title': 'Life Academy',
            'companies.it.life.desc': 'Initiative I founded in 2020, focused on personal and professional development. 2500+ people reached through workshops, mentoring, and content on technology, soft skills, and entrepreneurship — on a multilingual platform that grew as an active community, not as a mailing list.',
            'companies.it.life.p1': '2500+ people reached', 'companies.it.life.p2': 'Multilingual (PT/EN/ES)', 'companies.it.life.p3': 'Active community',
            'companies.it.life.invite': 'Want to see the work up close? Visit the site to explore workshops, mentoring, and the active community.',

            'compare.title': 'Quick comparison',
            'compare.lead': 'Three companies, three ways of operating. A practical recap to help you situate.',
            'compare.focus': 'Focus',
            'compare.lineup': 'Lineup',
            'compare.role': 'Role',
            'compare.signal': 'Edge',
            'compare.bbi.focus': 'Data products for media and advertising',
            'compare.bbi.lineup': '6 self.bi products (k2, tailor, liveRT, flux, argus, hertz)',
            'compare.bbi.role': 'Founder · Tech Lead',
            'compare.bbi.signal': 'Deep technical specialization in media + AI',
            'compare.gl.focus': 'End-to-end corporate EdTech',
            'compare.gl.lineup': '10 modular solutions — people, content, and assets',
            'compare.gl.role': 'CTO',
            'compare.gl.signal': 'Whole stack under a single umbrella',
            'compare.it.focus': 'Social tech — health, cities, and people',
            'compare.it.lineup': '4 initiatives (IntegraCity, Healthy Cities, 4Health, Life Academy)',
            'compare.it.role': 'Partner · Non-profit',
            'compare.it.signal': 'Public impact and human development',

            'print.button': 'Download PDF',

            'companies.back.title': 'Want to see the rest?',
            'companies.back.lead': 'About, experience, skills, and contact remain on the main page.',
            'companies.back.cta': 'Back to home',

            'hero.eyebrow': 'Senior Data Engineer · Solution Architect · Tech Lead',
            'hero.title.before': 'Building data architectures that ',
            'hero.title.accent': 'scale',
            'hero.title.after': '.',
            'hero.lead': '22+ years designing and operating pipelines, analytics platforms, and cloud architectures for organizations processing tens of terabytes per day. I lead cross-functional teams with Agile and DevOps/CI-CD practices.',
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
            'skills.yrs': 'yrs',
            'skills.yr': 'yr',
            'skills.languages': 'Languages',
            'skills.data': 'Data & Analytics',
            'skills.ai': 'AI & Data Science',
            'skills.ai.badge': 'MIT',
            'skills.db': 'Databases',
            'skills.cloud': 'Cloud & DevOps',
            'skills.frontend': 'Frontend Frameworks',
            'skills.backend': 'Backend Frameworks',
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
            'footer.cta_label': 'Next step',
            'footer.cta': "Let's build something together? →",
            'footer.nav_label': 'Map',
            'footer.meta_label': 'From here',
            'footer.status_title': 'Real metrics for this page via the Performance API',

            'lang.label': 'Language',

            'cmdk.placeholder': 'Search for a command… (or type SQL)',
            'cmdk.empty': 'Nothing found.',
            'cmdk.hint': '↑↓ navigate · ↵ run · esc close · psst: SELECT * FROM experience',
            'cmdk.sql_hint': 'tip: try SELECT * FROM skills ORDER BY years DESC',
            'cmdk.sql_mode_hint': 'SQL mode · SHOW TABLES lists the tables · esc to close',
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
            'cmdk.game.worms': '🐛 Artillery Battle',

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
            'game.flappy.over': 'Game Over — R to restart',
            'game.worms.title': '🐛 Artillery Battle',
            'game.worms.controls': '←→ move · ↑↓ angle · Space fire (hold) · P pause · on touch, drag the tank',

            'game.mute': 'Mute sounds',
            'game.unmute': 'Unmute sounds',
            'game.paused': 'Paused',
            'game.resume_hint': 'Click or press Space to resume',
            'game.restart': 'Restart',
            'game.close': 'Close',
            'game.score_final': 'Score',
            'game.best': 'Best',
            'game.new_record': 'NEW RECORD!',
            'game.f1.near_miss': 'CLOSE! +25',
            'game.flappy.medal_bronze': 'Bronze medal',
            'game.flappy.medal_silver': 'Silver medal',
            'game.flappy.medal_gold': 'Gold medal',
            'game.worms.mode_title': 'Choose mode',
            'game.worms.mode_cpu': '1 Player (vs CPU)',
            'game.worms.mode_2p': '2 Players',
            'game.worms.you': 'You',
            'game.worms.player': 'Player',
            'game.worms.wins': 'wins!',
            'game.worms.win_you': 'You win! 🏆',
            'game.worms.win_cpu': 'CPU wins!',
            'game.worms.wind': 'Wind',
            'game.worms.cpu_thinking': 'CPU aiming...',

            'cmdk.achievements': '🏆 Achievements',
            'cmdk.rain': '🌧️ Data rain',
            'ach.title': 'Achievements',
            'ach.subtitle': 'Easter eggs found on this page',
            'ach.locked': 'Keep exploring…',
            'ach.close': 'Close',
            'ach.all_done': "🎉 100%! You found every easter egg. Respect.",
            'ach.cmdk.name': 'Power user',
            'ach.cmdk.desc': 'Opened the command palette (⌘K or /)',
            'ach.theme.name': 'Photosensitive',
            'ach.theme.desc': 'Toggled between light and dark theme',
            'ach.lang.name': 'Bilingual',
            'ach.lang.desc': 'Switched the page language',
            'ach.konami.name': 'Old school',
            'ach.konami.desc': 'Typed the Konami code ↑↑↓↓←→←→BA',
            'ach.avatar.name': 'Paparazzi',
            'ach.avatar.desc': 'Clicked the photo 7× and it spun',
            'ach.tts.name': 'Audiobook mode',
            'ach.tts.desc': 'Enabled the voice reader',
            'ach.offduty.name': 'Tagger',
            'ach.offduty.desc': 'Saw the site off-duty',
            'ach.color.name': 'Decorator',
            'ach.color.desc': "Changed the site's accent color",
            'ach.f1.name': 'Box, box!',
            'ach.f1.desc': 'Raced in the F1 game',
            'ach.flappy.name': 'Voluntary resignation',
            'ach.flappy.desc': 'Flew between corporate buildings',
            'ach.worms.name': 'Gunner',
            'ach.worms.desc': 'Fired a shot in the artillery battle',
            'ach.sql.name': 'SELECT * FROM cv',
            'ach.sql.desc': 'Queried the CV via SQL in ⌘K',

            'err.page_title': '404 — Filipe Rodrigues',
            'err.eyebrow': 'DAG site_router · run failed',
            'err.title': 'This route returned zero rows.',
            'err.cta_home': '← Back to the main DAG',
            'err.cta_projects': 'See projects',
            'err.cta_game': "While on-call doesn't pick up… 🐦"
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

        // <title> — só usa a chave global quando o <title> não declara a própria chave
        const titleEl = document.querySelector('title');
        if (titleEl && !titleEl.hasAttribute('data-i18n') && dict['title.page']) {
            document.title = dict['title.page'];
        }

        // meta description — idem (projects.html usa data-i18n-attr próprio)
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && !metaDesc.hasAttribute('data-i18n-attr') && dict['meta.description']) {
            metaDesc.setAttribute('content', dict['meta.description']);
        }

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