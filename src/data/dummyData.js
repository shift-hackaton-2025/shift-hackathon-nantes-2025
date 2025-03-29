export const dummyMonitorings = [
  {
    id: 1,
    name: 'Veille Tech',
    prompt: 'Actualités sur l\'intelligence artificielle, le développement web et les nouvelles technologies',
    description: 'Suivez l\'actualité des nouvelles technologies',
    tags: ['Tech', 'IA', 'Web'],
    articles: [
      {
        id: 1,
        title: 'Les avancées de l\'IA générative en 2024',
        summary: 'Les dernières innovations en matière d\'IA générative et leurs impacts sur l\'industrie...',
        image: 'https://picsum.photos/seed/ai1/400/300',
        url: 'https://techcrunch.com/2024/03/ai-generative-advances',
        source: 'TechCrunch',
        tags: ['IA', 'Innovation']
      },
      {
        id: 2,
        title: 'React 19 : Les nouvelles fonctionnalités',
        summary: 'Découvrez les améliorations majeures apportées par React 19...',
        image: 'https://picsum.photos/seed/react/400/300',
        url: 'https://react.dev/blog/2024/03/react-19',
        source: 'React Blog',
        tags: ['Web', 'React']
      }
    ]
  },
  {
    id: 2,
    name: 'Veille Marketing Digital',
    prompt: 'Actualités et tendances du marketing digital, stratégies SEM et réseaux sociaux',
    description: 'Tendances du marketing numérique',
    tags: ['Marketing', 'Digital', 'Social'],
    articles: [
      {
        id: 3,
        title: 'TikTok : Nouvelles fonctionnalités marketing',
        summary: 'TikTok déploie de nouveaux outils pour les marketeurs...',
        image: 'https://picsum.photos/seed/tiktok/400/300',
        url: 'https://socialmediatoday.com/2024/03/tiktok-marketing',
        source: 'Social Media Today',
        tags: ['Social', 'TikTok']
      }
    ]
  },
];

export const dummySources = [
  {
    id: 1,
    name: 'Reuters Science',
    description: 'Actualités scientifiques',
    initials: 'RS',
    url: 'https://www.reuters.com/science',
    notes: 'Source fiable pour l\'actualité scientifique',
  },
  {
    id: 2,
    name: 'TechCrunch',
    description: 'Actualités tech et startups',
    initials: 'TC',
    url: 'https://techcrunch.com',
    notes: 'Excellent pour suivre les startups',
  },
  {
    id: 3,
    name: 'Harvard Business Review',
    description: 'Articles management et business',
    initials: 'HB',
    url: 'https://hbr.org',
    notes: 'Articles de fond sur le management',
  },
]

export const dummyTeams = [
  {
    id: 1,
    name: 'Équipe Marketing',
    memberCount: 4,
  },
  {
    id: 2,
    name: 'Équipe R&D',
    memberCount: 6,
  },
  {
    id: 3,
    name: 'Équipe Juridique',
    memberCount: 3,
  },
]

export const dummySharedItems = [
  {
    id: 1,
    title: 'Tendances Marketing 2025',
    sharedBy: 'Marie L.',
    date: '2024-03-15',
  },
  {
    id: 2,
    title: 'Impact de l\'IA sur le droit',
    sharedBy: 'Thomas B.',
    date: '2024-03-14',
  },
]

export const dummyNotifications = [
  {
    id: 1,
    title: 'Nouveau contenu dans "Veille Tech"',
    description: '3 nouveaux articles correspondent à vos critères.',
    type: 'update',
    time: '2 heures',
  },
  {
    id: 2,
    title: 'Invitation à collaborer',
    description: 'Thomas B. vous invite à rejoindre "Veille Juridique".',
    type: 'invitation',
    time: '1 jour',
  },
]