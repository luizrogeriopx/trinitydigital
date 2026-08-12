/**
 * Conteúdo central do site — editável por um administrador (hoje via arquivo,
 * futuramente via painel administrativo alimentado pelo banco de dados).
 */

export const site = {
  nome: "Trinity Digital",
  slogan: "Tecnologia que transforma negócios em resultados.",
  descricao:
    "Agência de desenvolvimento web e marketing digital. Criamos sites, lojas virtuais, sistemas, CRM e campanhas que geram presença, autoridade e resultados.",
  email: "contato@trinitydigital.com.br",
  whatsapp: "5562996897483",
  whatsappExibicao: "(62) 99689-7483",
  cidade: "Goiânia",
  estado: "GO",
  pais: "BR",
  url: "https://trinitydigital.com.br",
  redes: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    linkedin: "https://linkedin.com/",
  },
  // Espaços prontos para os IDs de rastreamento (Analytics, GTM, Pixel, Ads).
  analytics: {
    googleAnalyticsId: "",
    googleTagManagerId: "",
    metaPixelId: "",
    googleAdsConversionId: "",
    searchConsoleVerification: "",
  },
};

export function whatsappLink(mensagem?: string) {
  const texto =
    mensagem ??
    "Olá! Vim pelo site e gostaria de solicitar um orçamento para o meu projeto digital.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export const navegacao = [
  { label: "Início", to: "/" },
  { label: "Serviços", to: "/servicos" },
  { label: "Soluções", to: "/servicos", hash: "solucoes" },
  { label: "Portfólio", to: "/portfolio" },
  { label: "Sobre", to: "/sobre" },
  { label: "Blog", to: "/blog" },
  { label: "Contato", to: "/contato" },
] as const;

export const indicadores = [
  { valor: "180+", label: "Sites desenvolvidos" },
  { valor: "240+", label: "Projetos entregues" },
  { valor: "150+", label: "Clientes atendidos" },
  { valor: "10", label: "Anos de experiência" },
];

export type Servico = {
  slug: string;
  nome: string;
  icone: string;
  resumo: string;
  beneficios: string[];
  titleSeo: string;
  descricaoSeo: string;
  intro: string;
  entregas: { titulo: string; texto: string }[];
  paraQuem: string[];
  mensagemWhatsapp: string;
};

export const servicos: Servico[] = [
  {
    slug: "criacao-de-sites",
    nome: "Criação de Sites",
    icone: "Globe",
    resumo:
      "Sites institucionais, empresariais e profissionais rápidos, responsivos e prontos para converter visitantes em clientes.",
    beneficios: [
      "Sites institucionais e empresariais",
      "Layout responsivo em todos os dispositivos",
      "Integração com WhatsApp",
      "Painel administrativo",
    ],
    titleSeo: "Criação de Sites Profissionais | Trinity Digital",
    descricaoSeo:
      "Empresa de criação de sites institucionais, empresariais e responsivos com integração ao WhatsApp, painel administrativo e SEO desde a estrutura.",
    intro:
      "Desenvolvimento de sites sob medida para empresas, profissionais liberais, escolas, igrejas e lojas que precisam de uma presença digital sólida, rápida e preparada para gerar contatos.",
    entregas: [
      {
        titulo: "Site institucional",
        texto:
          "Estrutura clara de páginas, conteúdo estratégico e identidade visual alinhada à sua marca.",
      },
      {
        titulo: "Site empresarial",
        texto:
          "Páginas de serviços, unidades, equipe e diferenciais com foco em autoridade e captação.",
      },
      {
        titulo: "Design responsivo",
        texto:
          "Experiência impecável em desktop, tablet e celular, com performance e acessibilidade.",
      },
      {
        titulo: "Integração com WhatsApp",
        texto: "Botões e formulários que abrem conversas com mensagem pré-preenchida por página.",
      },
      {
        titulo: "Painel administrativo",
        texto: "Arquitetura preparada para você editar textos, imagens, serviços e leads.",
      },
      {
        titulo: "SEO desde a estrutura",
        texto: "URLs amigáveis, títulos únicos, dados estruturados e Core Web Vitals otimizados.",
      },
    ],
    paraQuem: ["Empresas", "Profissionais liberais", "Escolas e igrejas", "Comércio local"],
    mensagemWhatsapp:
      "Olá! Vim pelo site e gostaria de solicitar um orçamento para criação de um site.",
  },
  {
    slug: "blogs",
    nome: "Criação de Blogs",
    icone: "PenLine",
    resumo:
      "Blogs profissionais com estrutura otimizada para SEO, categorias, tags e publicação simples de artigos.",
    beneficios: [
      "Estrutura otimizada para SEO",
      "Categorias, tags e autores",
      "Publicação simples de artigos",
      "Painel administrativo",
    ],
    titleSeo: "Criação de Blogs Profissionais e Otimizados para SEO | Trinity Digital",
    descricaoSeo:
      "Criamos blogs empresariais com arquitetura de conteúdo otimizada para SEO, categorias, tags, autores e painel de publicação.",
    intro:
      "Um blog bem estruturado é o motor do tráfego orgânico. Construímos a base técnica e editorial para sua empresa atrair visitantes qualificados todos os meses.",
    entregas: [
      {
        titulo: "Arquitetura de conteúdo",
        texto:
          "Categorias, tags e clusters de assuntos planejados a partir de palavras-chave reais.",
      },
      {
        titulo: "SEO on-page nativo",
        texto: "Title, meta description, headings, links internos e dados estruturados por artigo.",
      },
      {
        titulo: "Publicação simples",
        texto: "Fluxo editorial claro com autor, data, imagem destacada e posts relacionados.",
      },
      {
        titulo: "Performance",
        texto: "Imagens otimizadas, lazy loading e carregamento rápido em qualquer conexão.",
      },
    ],
    paraQuem: [
      "Empresas que querem tráfego orgânico",
      "Escritórios e clínicas",
      "E-commerces",
      "Educação",
    ],
    mensagemWhatsapp:
      "Olá! Vim pelo site e gostaria de um orçamento para criação de um blog profissional.",
  },
  {
    slug: "lojas-virtuais",
    nome: "Lojas Virtuais",
    icone: "ShoppingCart",
    resumo:
      "E-commerce completo com catálogo, carrinho, checkout, pagamentos integrados e gestão de pedidos.",
    beneficios: [
      "Cadastro de produtos e variações",
      "Carrinho e checkout otimizados",
      "Integração com pagamentos",
      "Gestão de pedidos",
    ],
    titleSeo: "Criação de Loja Virtual e E-commerce Completo | Trinity Digital",
    descricaoSeo:
      "Desenvolvimento de loja virtual com catálogo de produtos, carrinho, checkout, integração com pagamentos, gestão de pedidos e layout responsivo.",
    intro:
      "Da vitrine ao pós-venda: desenvolvemos lojas virtuais rápidas, seguras e pensadas para aumentar a taxa de conversão em cada etapa da compra.",
    entregas: [
      {
        titulo: "Catálogo completo",
        texto: "Produtos, variações, estoque, categorias, filtros e busca inteligente.",
      },
      {
        titulo: "Checkout de alta conversão",
        texto: "Fluxo curto, frete, cupons e recuperação de carrinho abandonado.",
      },
      { titulo: "Pagamentos", texto: "Integração com meios de pagamento, Pix e cartão." },
      { titulo: "Gestão de pedidos", texto: "Painel com status, clientes e relatórios de vendas." },
    ],
    paraQuem: [
      "Lojas físicas que querem vender online",
      "Marcas próprias",
      "Distribuidores",
      "Serviços com venda recorrente",
    ],
    mensagemWhatsapp:
      "Olá! Vim pelo site e gostaria de um orçamento para criação de uma loja virtual.",
  },
  {
    slug: "paginas-de-vendas",
    nome: "Páginas de Vendas",
    icone: "Rocket",
    resumo:
      "Landing pages de alta conversão para campanhas, com copywriting, formulários e rastreamento de conversões.",
    beneficios: [
      "Estrutura para campanhas de tráfego",
      "Copywriting orientado a conversão",
      "Formulários e botões de WhatsApp",
      "Rastreamento de conversões",
    ],
    titleSeo: "Landing Page e Páginas de Vendas de Alta Conversão | Trinity Digital",
    descricaoSeo:
      "Criação de landing pages e páginas de vendas de alta conversão para campanhas de Google Ads e Meta Ads, com copywriting e rastreamento.",
    intro:
      "Páginas construídas para um único objetivo: transformar cliques pagos em leads e vendas, com mensagem clara, prova social e caminhos curtos até o contato.",
    entregas: [
      {
        titulo: "Copywriting",
        texto:
          "Promessa, dores, benefícios, objeções e chamada para ação em uma narrativa consistente.",
      },
      {
        titulo: "Estrutura para campanhas",
        texto: "Variações por público, UTMs e testes A/B para escalar o que funciona.",
      },
      {
        titulo: "Conversão",
        texto: "Formulários curtos, WhatsApp com mensagem pré-preenchida e provas sociais.",
      },
      {
        titulo: "Rastreamento",
        texto: "Eventos de conversão no Google Ads, Meta Pixel, GA4 e Tag Manager.",
      },
    ],
    paraQuem: [
      "Campanhas de tráfego pago",
      "Lançamentos",
      "Captação de leads",
      "Eventos e infoprodutos",
    ],
    mensagemWhatsapp:
      "Olá! Vim pelo site e gostaria de um orçamento para uma landing page de vendas.",
  },
  {
    slug: "crm",
    nome: "Desenvolvimento de CRM",
    icone: "Workflow",
    resumo:
      "CRM personalizado com funil de vendas, leads, oportunidades, tarefas, automação e relatórios.",
    beneficios: [
      "Funil de vendas e oportunidades",
      "Gestão de clientes e tarefas",
      "Automação e relatórios",
      "Integração com WhatsApp",
    ],
    titleSeo: "CRM Personalizado e Desenvolvimento de Sistemas | Trinity Digital",
    descricaoSeo:
      "Desenvolvimento de CRM personalizado e sistemas sob medida: funil de vendas, leads, oportunidades, tarefas, automação, relatórios e WhatsApp.",
    intro:
      "Quando a planilha não dá mais conta, desenvolvemos um CRM sob medida para o seu processo comercial — não o contrário.",
    entregas: [
      {
        titulo: "Funil sob medida",
        texto: "Etapas, campos e regras desenhadas a partir do seu processo real de vendas.",
      },
      {
        titulo: "Leads e oportunidades",
        texto: "Captação automática pelos formulários do site e distribuição para o time.",
      },
      { titulo: "Automação", texto: "Lembretes, tarefas, follow-ups e notificações automáticas." },
      {
        titulo: "Relatórios",
        texto: "Indicadores de conversão, origem de leads e desempenho por vendedor.",
      },
    ],
    paraQuem: [
      "Times comerciais",
      "Clínicas e escritórios",
      "Imobiliárias",
      "Empresas com muitos leads",
    ],
    mensagemWhatsapp:
      "Olá! Vim pelo site e gostaria de um orçamento para desenvolvimento de um CRM personalizado.",
  },
  {
    slug: "seo",
    nome: "Otimização SEO",
    icone: "Search",
    resumo:
      "SEO on-page, técnico e local para posicionar seu negócio nas primeiras posições do Google.",
    beneficios: [
      "SEO on-page e técnico",
      "SEO local e Google Business Profile",
      "Pesquisa de palavras-chave",
      "Monitoramento de posicionamento",
    ],
    titleSeo: "Otimização SEO On-Page, Técnico e Local | Trinity Digital",
    descricaoSeo:
      "Consultoria e execução de SEO: otimização on-page, SEO técnico, SEO local, Google Business Profile, palavras-chave e monitoramento de posições.",
    intro:
      "Tráfego orgânico é o ativo digital mais rentável a médio prazo. Trabalhamos estrutura técnica, conteúdo e autoridade para você aparecer quando o cliente procura.",
    entregas: [
      {
        titulo: "SEO técnico",
        texto:
          "Indexação, sitemap, canonical, dados estruturados, Core Web Vitals e arquitetura de URLs.",
      },
      {
        titulo: "SEO on-page",
        texto: "Títulos, headings, conteúdo, links internos e otimização de imagens.",
      },
      {
        titulo: "SEO local",
        texto:
          "Google Business Profile, páginas por cidade e região, avaliações e citações locais.",
      },
      {
        titulo: "Monitoramento",
        texto: "Acompanhamento de posições, cliques e impressões no Search Console.",
      },
    ],
    paraQuem: ["Negócios locais", "E-commerces", "Serviços B2B", "Clínicas e escritórios"],
    mensagemWhatsapp: "Olá! Vim pelo site e gostaria de um orçamento para otimização de SEO.",
  },
  {
    slug: "google-ads",
    nome: "Google Ads",
    icone: "BarChart3",
    resumo:
      "Campanhas de pesquisa e remarketing criadas, monitoradas e otimizadas para gerar conversões.",
    beneficios: [
      "Criação e configuração de campanhas",
      "Pesquisa de palavras-chave",
      "Remarketing",
      "Otimização e conversões",
    ],
    titleSeo: "Gestão de Google Ads para Empresas | Trinity Digital",
    descricaoSeo:
      "Criação, configuração e gestão de campanhas de Google Ads: pesquisa de palavras-chave, anúncios, remarketing, rastreamento e otimização de conversões.",
    intro:
      "Aparecer no exato momento em que o cliente busca pela sua solução. Estruturamos campanhas enxutas, com foco em custo por lead e não em vaidade de cliques.",
    entregas: [
      {
        titulo: "Estratégia e palavras-chave",
        texto: "Mapeamento de intenção de busca, negativação e estrutura de campanhas.",
      },
      { titulo: "Anúncios", texto: "Textos, extensões e páginas de destino alinhadas à busca." },
      { titulo: "Remarketing", texto: "Reimpacto de visitantes e listas de clientes." },
      {
        titulo: "Otimização contínua",
        texto: "Acompanhamento de conversões, lances e relatórios objetivos.",
      },
    ],
    paraQuem: [
      "Negócios que precisam de resultado rápido",
      "Serviços de alta demanda",
      "E-commerces",
      "Lançamentos",
    ],
    mensagemWhatsapp:
      "Olá! Vim pelo site e gostaria de um orçamento para gestão de campanhas no Google Ads.",
  },
  {
    slug: "meta-ads",
    nome: "Facebook e Instagram Ads",
    icone: "Megaphone",
    resumo:
      "Meta Ads para geração de leads, vendas e conversas no WhatsApp, com criativos e públicos personalizados.",
    beneficios: [
      "Campanhas de leads e vendas",
      "Campanhas para WhatsApp",
      "Públicos personalizados e remarketing",
      "Criativos e otimização",
    ],
    titleSeo: "Gestão de Facebook Ads e Instagram Ads (Meta Ads) | Trinity Digital",
    descricaoSeo:
      "Gestão de campanhas no Facebook Ads e Instagram Ads: geração de leads, campanhas para WhatsApp, vendas, remarketing, públicos personalizados e criativos.",
    intro:
      "Demanda que ainda não está buscando você precisa ser despertada. Meta Ads é o canal para gerar volume de leads com custo previsível e escala.",
    entregas: [
      {
        titulo: "Estratégia de campanha",
        texto: "Objetivo, oferta, públicos frios, mornos e quentes.",
      },
      { titulo: "Criativos", texto: "Direção de imagens, vídeos e textos testados por variação." },
      {
        titulo: "WhatsApp e leads",
        texto: "Campanhas de conversas e formulários instantâneos integrados ao seu funil.",
      },
      {
        titulo: "Otimização",
        texto: "Pixel, eventos de conversão, remarketing e relatórios semanais.",
      },
    ],
    paraQuem: ["Comércio e serviços", "Infoprodutos", "Clínicas e estética", "E-commerces"],
    mensagemWhatsapp:
      "Olá! Vim pelo site e gostaria de um orçamento para campanhas no Facebook e Instagram Ads.",
  },
];

export const diferenciais = [
  {
    titulo: "Desenvolvimento personalizado",
    texto:
      "Nada de template genérico: cada projeto é construído a partir do seu objetivo de negócio.",
    icone: "Code2",
  },
  {
    titulo: "Design moderno",
    texto: "Interfaces elegantes, com hierarquia visual clara e identidade própria.",
    icone: "Sparkles",
  },
  {
    titulo: "Sites responsivos",
    texto: "Experiência consistente em desktop, tablet e celular.",
    icone: "Smartphone",
  },
  {
    titulo: "Performance",
    texto: "Carregamento rápido e excelentes Core Web Vitals.",
    icone: "Gauge",
  },
  {
    titulo: "SEO desde a estrutura",
    texto: "Semântica, dados estruturados e arquitetura pensada para o Google.",
    icone: "Search",
  },
  {
    titulo: "Integrações digitais",
    texto: "WhatsApp, Analytics, Tag Manager, Pixel, pagamentos e CRM.",
    icone: "Plug",
  },
  {
    titulo: "Suporte",
    texto: "Acompanhamento próximo e manutenção contínua após a publicação.",
    icone: "LifeBuoy",
  },
  {
    titulo: "Foco em conversão",
    texto: "Cada seção tem uma função: gerar contato, confiança ou venda.",
    icone: "Target",
  },
  {
    titulo: "Soluções escaláveis",
    texto: "Arquitetura preparada para crescer junto com o seu negócio.",
    icone: "TrendingUp",
  },
];

export const processo = [
  {
    numero: "01",
    titulo: "Briefing",
    texto: "Entendemos seu negócio, público, concorrência e objetivos.",
  },
  {
    numero: "02",
    titulo: "Planejamento",
    texto: "Definimos escopo, arquitetura de páginas, palavras-chave e cronograma.",
  },
  {
    numero: "03",
    titulo: "Design",
    texto: "Criamos a interface, identidade visual e protótipos navegáveis.",
  },
  {
    numero: "04",
    titulo: "Desenvolvimento",
    texto: "Codificação limpa, componentizada, rápida e segura.",
  },
  {
    numero: "05",
    titulo: "Testes",
    texto: "Responsividade, formulários, links, acessibilidade e performance.",
  },
  {
    numero: "06",
    titulo: "Publicação",
    texto: "Deploy, domínio, SSL, Analytics, Search Console e sitemap.",
  },
  {
    numero: "07",
    titulo: "Otimização",
    texto: "Monitoramento contínuo, SEO e melhorias de conversão.",
  },
];

export type Projeto = {
  slug: string;
  nome: string;
  categoria: "Sites" | "Lojas" | "Landing Pages" | "Sistemas" | "CRM";
  descricao: string;
  tecnologias: string[];
  imagem: string;
  link?: string;
};

export const categoriasPortfolio = [
  "Todos",
  "Sites",
  "Lojas",
  "Landing Pages",
  "Sistemas",
  "CRM",
] as const;

export const projetos: Projeto[] = [
  {
    slug: "clinica-vitalis",
    nome: "Clínica Vitalis",
    categoria: "Sites",
    descricao:
      "Site institucional para clínica multiespecialidades com agendamento via WhatsApp e SEO local.",
    tecnologias: ["React", "TypeScript", "SEO", "WhatsApp API"],
    imagem: "/images/portfolio-1.jpg",
  },
  {
    slug: "loja-nova-casa",
    nome: "Nova Casa Decor",
    categoria: "Lojas",
    descricao:
      "Loja virtual de decoração com catálogo completo, checkout otimizado e gestão de pedidos.",
    tecnologias: ["E-commerce", "Pagamentos", "Analytics"],
    imagem: "/images/portfolio-2.jpg",
  },
  {
    slug: "lp-construtora-atlas",
    nome: "Construtora Atlas",
    categoria: "Landing Pages",
    descricao:
      "Landing page de captação de leads para lançamento imobiliário com rastreamento de conversões.",
    tecnologias: ["Landing Page", "Meta Ads", "GA4"],
    imagem: "/images/portfolio-3.jpg",
  },
  {
    slug: "sistema-escola-horizonte",
    nome: "Escola Horizonte",
    categoria: "Sistemas",
    descricao: "Portal escolar com área de matrículas, comunicados e painel administrativo.",
    tecnologias: ["React", "Banco de dados", "Autenticação"],
    imagem: "/images/portfolio-4.jpg",
  },
  {
    slug: "crm-prime-servicos",
    nome: "Prime Serviços",
    categoria: "CRM",
    descricao:
      "CRM personalizado com funil de vendas, tarefas, automações e relatórios comerciais.",
    tecnologias: ["CRM", "Automação", "Relatórios"],
    imagem: "/images/portfolio-5.jpg",
  },
  {
    slug: "site-igreja-esperanca",
    nome: "Comunidade Esperança",
    categoria: "Sites",
    descricao: "Site institucional com agenda de eventos, blog e área de contribuições.",
    tecnologias: ["React", "Blog", "SEO"],
    imagem: "/images/portfolio-6.jpg",
  },
];

export const resultados = [
  {
    valor: "+312%",
    label: "Crescimento de acessos",
    texto: "Média de aumento de tráfego orgânico em 12 meses de SEO.",
  },
  {
    valor: "+1.900",
    label: "Leads gerados",
    texto: "Solicitações qualificadas geradas por sites e campanhas em 2025.",
  },
  {
    valor: "+68%",
    label: "Conversões",
    texto: "Aumento médio de conversão após redesign focado em performance.",
  },
  {
    valor: "+R$ 4,2M",
    label: "Vendas influenciadas",
    texto: "Receita atribuída a lojas virtuais e campanhas gerenciadas.",
  },
  {
    valor: "Top 3",
    label: "Posicionamento no Google",
    texto: "Palavras-chave estratégicas de clientes locais no topo da busca.",
  },
];

export const depoimentos = [
  {
    nome: "Marcelo Andrade",
    empresa: "Atlas Engenharia",
    texto:
      "O site ficou impecável e, mais importante, começou a gerar orçamentos na primeira semana. A equipe entendeu nosso negócio antes de desenhar qualquer tela.",
    estrelas: 5,
    iniciais: "MA",
  },
  {
    nome: "Fernanda Lima",
    empresa: "Nova Casa Decor",
    texto:
      "Nossa loja virtual triplicou o faturamento em seis meses. O checkout ficou muito mais simples e o suporte é rápido de verdade.",
    estrelas: 5,
    iniciais: "FL",
  },
  {
    nome: "Ricardo Souza",
    empresa: "Prime Serviços",
    texto:
      "O CRM foi desenhado exatamente no nosso processo comercial. Hoje sabemos de onde vem cada lead e quanto ele custa.",
    estrelas: 5,
    iniciais: "RS",
  },
  {
    nome: "Juliana Prado",
    empresa: "Clínica Vitalis",
    texto:
      "Aparecemos no topo do Google para as buscas da nossa região. A agenda mudou de patamar depois do trabalho de SEO local.",
    estrelas: 5,
    iniciais: "JP",
  },
];

export const faqs = [
  {
    pergunta: "Quanto custa criar um site?",
    resposta:
      "O investimento depende do escopo: número de páginas, funcionalidades, integrações e conteúdo. Por isso trabalhamos com orçamento personalizado — em geral apresentamos a proposta em até 2 dias úteis após o briefing.",
  },
  {
    pergunta: "Quanto tempo leva para desenvolver um site?",
    resposta:
      "Sites institucionais costumam ficar prontos entre 15 e 30 dias. Lojas virtuais, sistemas e CRMs variam conforme a complexidade, normalmente de 30 a 90 dias.",
  },
  {
    pergunta: "O site funciona no celular?",
    resposta:
      "Sim. Todos os projetos são desenvolvidos com design responsivo e testados em desktop, tablet e celular, com foco em performance e acessibilidade.",
  },
  {
    pergunta: "Vocês fazem manutenção?",
    resposta:
      "Sim. Oferecemos planos de manutenção que incluem atualizações, backups, monitoramento, ajustes de conteúdo e suporte técnico.",
  },
  {
    pergunta: "Vocês trabalham com SEO?",
    resposta:
      "Sim. Todo projeto já nasce com SEO técnico e on-page. Também oferecemos SEO contínuo, incluindo SEO local, conteúdo e monitoramento de posições.",
  },
  {
    pergunta: "Vocês gerenciam Google Ads?",
    resposta:
      "Sim. Criamos, configuramos e otimizamos campanhas de pesquisa, remarketing e conversões, com relatórios periódicos.",
  },
  {
    pergunta: "Vocês criam lojas virtuais?",
    resposta:
      "Sim. Desenvolvemos e-commerces completos com cadastro de produtos, carrinho, checkout, integração com pagamentos e gestão de pedidos.",
  },
  {
    pergunta: "Vocês desenvolvem sistemas personalizados?",
    resposta:
      "Sim. Desenvolvemos sistemas web sob medida, com autenticação, painéis administrativos, relatórios e integrações.",
  },
  {
    pergunta: "Vocês criam CRM?",
    resposta:
      "Sim. Criamos CRMs personalizados com funil de vendas, leads, oportunidades, tarefas, automações, relatórios e integração com WhatsApp.",
  },
  {
    pergunta: "Posso contratar somente o tráfego pago?",
    resposta:
      "Pode. É possível contratar apenas a gestão de Google Ads e/ou Meta Ads, desde que exista uma página de destino adequada — se necessário, criamos.",
  },
  {
    pergunta: "Vocês fazem integração com WhatsApp?",
    resposta:
      "Sim. Botões flutuantes, links por página e formulários com mensagem pré-preenchida conforme o serviço de origem.",
  },
  {
    pergunta: "O site possui painel administrativo?",
    resposta:
      "Sim. A arquitetura já é preparada para painel administrativo, com gestão de serviços, portfólio, depoimentos, blog, FAQs, leads e configurações.",
  },
];

export type Post = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  tags: string[];
  autor: string;
  data: string;
  leitura: string;
  imagem: string;
  conteudo: { tipo: "h2" | "p" | "ul"; texto?: string; itens?: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "quanto-custa-criar-um-site-profissional",
    titulo: "Quanto custa criar um site profissional em 2026?",
    resumo:
      "Entenda o que realmente define o preço da criação de sites e como avaliar propostas de desenvolvimento de sites sem cair em armadilhas.",
    categoria: "Criação de Sites",
    tags: ["criação de sites", "desenvolvimento de sites", "orçamento"],
    autor: "Equipe Trinity Digital",
    data: "2026-07-28",
    leitura: "6 min",
    imagem: "/images/blog-1.jpg",
    conteudo: [
      {
        tipo: "p",
        texto:
          "O preço da criação de sites varia porque um site não é um produto de prateleira: ele é a soma de estratégia, design, desenvolvimento e otimização contínua.",
      },
      { tipo: "h2", texto: "O que define o investimento" },
      {
        tipo: "ul",
        itens: [
          "Quantidade de páginas e profundidade do conteúdo",
          "Funcionalidades como catálogo, área de login, blog ou integrações",
          "Nível de personalização do design",
          "Trabalho de SEO técnico e de conteúdo",
          "Manutenção e suporte após a publicação",
        ],
      },
      { tipo: "h2", texto: "Site barato costuma sair caro" },
      {
        tipo: "p",
        texto:
          "Templates genéricos entregam rapidez inicial e custo baixo, mas cobram depois em performance ruim, dificuldade de manutenção e ausência de estrutura de SEO — justamente o que traria clientes.",
      },
      { tipo: "h2", texto: "Como avaliar uma proposta" },
      {
        tipo: "p",
        texto:
          "Compare escopo, prazo, tecnologia, responsabilidade sobre SEO, hospedagem, propriedade do código e o que acontece depois da entrega. Uma empresa de criação de sites séria explica cada item.",
      },
    ],
  },
  {
    slug: "seo-local-como-aparecer-no-google-da-sua-cidade",
    titulo: "SEO local: como aparecer no Google da sua cidade",
    resumo:
      "Guia prático de SEO local para negócios que dependem de clientes da região: Google Business Profile, páginas por cidade e sinais de relevância.",
    categoria: "SEO",
    tags: ["SEO", "SEO local", "marketing digital"],
    autor: "Equipe Trinity Digital",
    data: "2026-06-14",
    leitura: "7 min",
    imagem: "/images/blog-2.jpg",
    conteudo: [
      {
        tipo: "p",
        texto:
          "SEO local é o conjunto de otimizações que faz o seu negócio aparecer para quem busca por serviços perto de onde está.",
      },
      { tipo: "h2", texto: "Comece pelo Google Business Profile" },
      {
        tipo: "p",
        texto:
          "Perfil completo, categorias corretas, fotos reais, horário atualizado e avaliações recentes formam a base de qualquer estratégia local.",
      },
      { tipo: "h2", texto: "Estrutura do site importa" },
      {
        tipo: "ul",
        itens: [
          "Páginas específicas por serviço e por região atendida",
          "Dados estruturados de negócio local",
          "NAP (nome, endereço e telefone) consistente",
          "Conteúdo real sobre a operação na cidade",
        ],
      },
      { tipo: "h2", texto: "Evite conteúdo artificial" },
      {
        tipo: "p",
        texto:
          "Duplicar a mesma página trocando apenas o nome da cidade não funciona mais. Produza conteúdo genuíno sobre cada região que você atende.",
      },
    ],
  },
  {
    slug: "google-ads-ou-meta-ads-qual-escolher",
    titulo: "Google Ads ou Meta Ads: qual escolher para o seu negócio?",
    resumo:
      "Compare intenção de busca e geração de demanda para decidir onde investir seu primeiro orçamento de tráfego pago.",
    categoria: "Tráfego Pago",
    tags: ["Google Ads", "Facebook Ads", "Instagram Ads", "marketing digital"],
    autor: "Equipe Trinity Digital",
    data: "2026-05-09",
    leitura: "5 min",
    imagem: "/images/blog-3.jpg",
    conteudo: [
      {
        tipo: "p",
        texto:
          "A escolha entre Google Ads e Meta Ads depende de um ponto central: seu cliente já procura pela solução ou precisa ser despertado?",
      },
      { tipo: "h2", texto: "Google Ads: captura de demanda" },
      {
        tipo: "p",
        texto:
          "Ideal quando existe volume de busca pelo seu serviço. O custo por clique é maior, mas a intenção também.",
      },
      { tipo: "h2", texto: "Meta Ads: geração de demanda" },
      {
        tipo: "p",
        texto:
          "Facebook e Instagram Ads funcionam bem para ofertas visuais, campanhas de WhatsApp e escala com custo por lead menor.",
      },
      { tipo: "h2", texto: "O melhor cenário" },
      {
        tipo: "p",
        texto:
          "Na maior parte dos casos, os dois canais somados entregam o melhor resultado: um captura quem está pronto, o outro alimenta o funil.",
      },
    ],
  },
];

export const opcoesOrcamento = [
  "Até R$ 3.000",
  "R$ 3.000 a R$ 8.000",
  "R$ 8.000 a R$ 20.000",
  "Acima de R$ 20.000",
  "Ainda não sei",
];
