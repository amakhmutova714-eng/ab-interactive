export const contentKz = {
  brand: {
    name: 'AB.interactive',
    tagline: 'Сал • Жаса • Ойна',
    available: 'Жобаларға дайынмын',
  },

  hero: {
    greeting: 'Сәлем, мен Альбина 👋',
    subtitle: 'Мен ойындар, қосымшалар және цифрлық өнімдер жасаймын.',
    cta1: '🎮 Жолды таңда',
    cta2: '💬 Маған жаз',
  },

  about: {
    title: 'Мен туралы',
    whatIDoTitle: 'Мен не жасаймын',
    paragraphs: [
      'Сәлем! Мен Альбина.',
      'Мен Roblox ойындарын, сайттарды, білім беру платформаларын, қосымшалар мен интерактивті цифрлық өнімдер жасаймын.',
      'Идеяларды нақты жобаларға айналдыруды ұнатамын.',
    ],
    whatIDo: [
      { icon: '🎮', label: 'Roblox\nОйындар' },
      { icon: '💻', label: 'Сайттар' },
      { icon: '📱', label: 'Мобильді\nҚосымшалар' },
      { icon: '🤖', label: 'AI\nШешімдер' },
    ],
  },

  choosePathTitle: 'Бағытыңды таңда',

  paths: [
    {
      id: 'roblox',
      icon: '🎮',
      prefix: 'Маған керек',
      title: 'Roblox Ойын',
      accentColor: '#E8448A',
      bgColor: '#FFF0F6',
      services: ['UI Жүйелер', 'Карталар / Деңгейлер', 'Ойын Механикалары', 'Ойын Концепциялары'],
    },
    {
      id: 'website',
      icon: '💻',
      prefix: 'Маған керек',
      title: 'Сайт',
      accentColor: '#7C3AED',
      bgColor: '#F3F0FF',
      services: ['Лендингтер', 'Бизнес Сайттар', 'Білім беру Платформалар', 'Онлайн Дүкендер'],
    },
    {
      id: 'app',
      icon: '📱',
      prefix: 'Маған керек',
      title: 'Қосымша',
      accentColor: '#D97706',
      bgColor: '#FFFBEB',
      services: ['Мобильді Қосымшалар', 'MVP Әзірлеу', 'UI / UX Дизайн', 'Стартап Прототиптері'],
    },
  ],

  projectsTitle: 'Менің жобаларым',
  projectsSeeMore: 'Тағы қарау',
  projectViewMore: 'Толығырақ',

  projects: [
    {
      id: 'brickton',
      name: 'Brickton',
      type: 'Roblox Ойын',
      typeColor: '#E8448A',
      typeBg: '#FFF0F6',
      desc: 'Roblox-та нөлден жасалған өмір симуляторы мен құрылыс ойыны.',
      gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
      emoji: '🏙️',
      image: '/brickton-2.jpg',
      fullDesc: 'Roblox-та нөлден жасалған ролдік және құрылыс ойыны. 18 жүйе бар: телефон ОС, құрылыс, тамақ пісіру, көлік, DataStore, учаске жүйесі және т.б. 100% түпнұсқа Lua/Luau коды — тегін модельсіз.',
      tags: ['Roblox Studio', 'Lua / Luau', 'DataStore', 'ModuleScripts', 'UI/UX'],
      stats: [
        { value: '18', label: 'Жүйе' },
        { value: '100%', label: 'Түпнұсқа' },
        { value: 'Жалғыз', label: 'Dev' },
      ],
      gallery: ['/project-brickton.png', '/brickton-2.jpg', '/brickton-3.jpg', '/brickton-4.jpg'],
      video: '/brickton-trailer.mp4',
      link: null,
      linkLabel: 'Жасалуда',
    },
    {
      id: 'gotab',
      name: 'GoTAB',
      type: 'Веб Платформа',
      typeColor: '#7C3AED',
      typeBg: '#F3F0FF',
      desc: 'Студенттерге арналған онлайн оқу платформасы.',
      gradient: 'linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 50%, #7c3aed 100%)',
      emoji: '📚',
      image: '/project-gotab.png',
      fullDesc: 'Қазақ және орыс тілдеріндегі онлайн оқу платформасы. Студенттерге арналған дашборд: сабақ кестесі, бағалар аналитикасы, жетістіктер, мұғалімдердің пікірлері және екі тілді интерфейс.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
      stats: [
        { value: 'ҚЗ/РУ', label: 'Тіл' },
        { value: 'Live', label: 'Платформа' },
        { value: 'Толық', label: 'Дашборд' },
      ],
      gallery: ['/gotab-1.jpg', '/gotab-2.jpg', '/gotab-3.jpg'],
      video: '/gotab-trailer.mp4',
      link: 'https://gotab.onrender.com',
      linkLabel: 'GoTAB-ты ашу →',
    },
    {
      id: 'aulhub',
      name: 'AulHub',
      type: 'Маркетплейс Қосымша',
      typeColor: '#059669',
      typeBg: '#ECFDF5',
      desc: 'Ауыл қауымдастықтарына арналған маркетплейс.',
      gradient: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #34d399 100%)',
      emoji: '🛒',
      image: '/project-aulhub.jpg',
      fullDesc: 'Қазақстанның ауыл қауымдастықтарына арналған маркетплейс. 10+ санат: ауылшаруашылық өнімдері, мал, тамақ, бал, жұмыс, көлік. Mobile-first тәсілмен жасалған.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Mobile-First'],
      stats: [
        { value: '10+', label: 'Санат' },
        { value: 'ҚЗ', label: 'Нарық' },
        { value: 'Жұмыс', label: 'Тақта' },
      ],
      gallery: ['/aulhub-1.jpg', '/aulhub-2.jpg', '/aulhub-3.jpg', '/aulhub-4.jpg', '/aulhub-5.jpg'],
      link: null,
      linkLabel: 'Жасалуда',
    },
  ],

  whyMeTitle: 'Неліктен мен?',

  whyMe: [
    {
      icon: '✨',
      title: 'Шығармашыл идеялар',
      desc: 'Мен ерекше және айқын идеяларды ұнатамын.',
      iconBg: '#FFF0F6',
    },
    {
      icon: '⚡',
      title: 'Жылдам әзірлеу',
      desc: 'Жобаларды тез және сапалы жеткіземін.',
      iconBg: '#FFFBEB',
    },
    {
      icon: '📱',
      title: 'Mobile First',
      desc: 'Барлық шешімдер мобильді құрылғыларға бейімделген.',
      iconBg: '#FFF7ED',
    },
    {
      icon: '🎨',
      title: 'Заманауи дизайн',
      desc: 'Әдемі, эстетикалық және пайдаланушыға ыңғайлы дизайн.',
      iconBg: '#F0FDF4',
    },
    {
      icon: '🤖',
      title: 'AI Көмекші',
      desc: 'AI құралдарын пайдаланып ақылды өнімдер жасаймын.',
      iconBg: '#F3F0FF',
    },
  ],

  contact: {
    title: 'Бірге бірдеңе',
    titleAccent: 'жасайық',
    links: [
      {
        label: 'Instagram',
        icon: '📸',
        bg: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
        href: 'https://instagram.com/ab.interactive',
      },
      {
        label: 'Telegram',
        icon: '✈️',
        bg: 'linear-gradient(135deg, #2196F3 0%, #0d8ecf 100%)',
        href: 'https://t.me/ab_interactive',
      },
      {
        label: 'WhatsApp',
        icon: '💬',
        bg: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
        href: 'https://wa.me/77052506772',
      },
    ],
  },

  footer: {
    copy: '© 2026 AB.interactive',
    sub: '❤️ және кодпен жасалды',
  },
}
