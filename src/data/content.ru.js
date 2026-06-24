export const contentRu = {
  brand: {
    name: 'AB.interactive',
    tagline: 'Строй • Создавай • Играй',
    available: 'Открыта для проектов',
  },

  hero: {
    greeting: 'Привет, я Альбина 👋',
    subtitle: 'Я создаю игры, приложения и цифровые продукты.',
    cta1: '🎮 Выбери путь',
    cta2: '💬 Написать мне',
  },

  about: {
    title: 'Обо мне',
    whatIDoTitle: 'Что я делаю',
    paragraphs: [
      'Привет! Я Альбина.',
      'Я разработчик, создающий Roblox-игры, сайты, образовательные платформы, приложения и интерактивные цифровые продукты.',
      'Люблю превращать идеи в реальные проекты.',
    ],
    whatIDo: [
      { icon: '🎮', label: 'Roblox\nИгры' },
      { icon: '💻', label: 'Сайты' },
      { icon: '📱', label: 'Мобильные\nПриложения' },
      { icon: '🤖', label: 'AI\nРешения' },
    ],
  },

  choosePathTitle: 'Выбери направление',

  paths: [
    {
      id: 'roblox',
      icon: '🎮',
      prefix: 'Мне нужна',
      title: 'Roblox Игра',
      accentColor: '#E8448A',
      bgColor: '#FFF0F6',
      services: ['UI Системы', 'Карты / Уровни', 'Игровые Механики', 'Концепции Игр'],
    },
    {
      id: 'website',
      icon: '💻',
      prefix: 'Мне нужен',
      title: 'Сайт',
      accentColor: '#7C3AED',
      bgColor: '#F3F0FF',
      services: ['Лендинги', 'Бизнес Сайты', 'Образовательные Платформы', 'Онлайн Магазины'],
    },
    {
      id: 'app',
      icon: '📱',
      prefix: 'Мне нужно',
      title: 'Приложение',
      accentColor: '#D97706',
      bgColor: '#FFFBEB',
      services: ['Мобильные Приложения', 'MVP Разработка', 'UI / UX Дизайн', 'Прототипы Стартапов'],
    },
  ],

  projectsTitle: 'Мои проекты',
  projectsSeeMore: 'Смотреть ещё',
  projectViewMore: 'Подробнее',

  projects: [
    {
      id: 'brickton',
      name: 'Brickton',
      type: 'Roblox Игра',
      typeColor: '#E8448A',
      typeBg: '#FFF0F6',
      desc: 'Уютный симулятор жизни и строительства, созданный с нуля на Roblox.',
      gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
      emoji: '🏙️',
      image: '/brickton-2.jpg',
      fullDesc: 'Полноценная ролевая и строительная игра на Roblox, созданная с нуля в одиночку. 18 кастомных систем: телефон ОС, строительство, готовка, машины, DataStore и другие. 100% оригинальный Lua/Luau код — без бесплатных моделей.',
      tags: ['Roblox Studio', 'Lua / Luau', 'DataStore', 'ModuleScripts', 'UI/UX'],
      stats: [
        { value: '18', label: 'Систем' },
        { value: '100%', label: 'Ориг.' },
        { value: 'Соло', label: 'Dev' },
      ],
      gallery: ['/project-brickton.png', '/brickton-2.jpg', '/brickton-3.jpg', '/brickton-4.jpg'],
      video: '/brickton-trailer.mp4',
      link: null,
      linkLabel: 'В разработке',
    },
    {
      id: 'gotab',
      name: 'GoTAB',
      type: 'Веб Платформа',
      typeColor: '#7C3AED',
      typeBg: '#F3F0FF',
      desc: 'Онлайн-платформа для обучения студентов.',
      gradient: 'linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 50%, #7c3aed 100%)',
      emoji: '📚',
      image: '/project-gotab.png',
      fullDesc: 'Онлайн-платформа для обучения на казахском и русском языках. Включает дашборд студента с расписанием уроков, аналитикой оценок, достижениями, комментариями учителей и двуязычным интерфейсом.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
      stats: [
        { value: 'КЗ/РУ', label: 'Языки' },
        { value: 'Live', label: 'Платформа' },
        { value: 'Полный', label: 'Дашборд' },
      ],
      gallery: ['/gotab-1.jpg', '/gotab-2.jpg', '/gotab-3.jpg'],
      video: '/gotab-trailer.mp4',
      link: 'https://gotab.onrender.com',
      linkLabel: 'Открыть GoTAB →',
    },
    {
      id: 'aulhub',
      name: 'AulHub',
      type: 'Маркетплейс',
      typeColor: '#059669',
      typeBg: '#ECFDF5',
      desc: 'Маркетплейс для сельских сообществ.',
      gradient: 'linear-gradient(135deg, #064e3b 0%, #059669 50%, #34d399 100%)',
      emoji: '🛒',
      image: '/project-aulhub.jpg',
      fullDesc: 'Маркетплейс для сельских сообществ Казахстана. Объединяет продавцов и покупателей в 10+ категориях: сельхозпродукты, скот, еда, мёд, работа, транспорт. Разработан mobile-first.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Mobile-First'],
      stats: [
        { value: '10+', label: 'Категорий' },
        { value: 'КЗ', label: 'Рынок' },
        { value: 'Работа', label: 'Доска' },
      ],
      gallery: ['/aulhub-1.jpg', '/aulhub-2.jpg', '/aulhub-3.jpg', '/aulhub-4.jpg', '/aulhub-5.jpg'],
      link: null,
      linkLabel: 'В разработке',
    },
  ],

  whyMeTitle: 'Почему я?',

  whyMe: [
    {
      icon: '✨',
      title: 'Творческие идеи',
      desc: 'Люблю уникальные идеи, которые выделяются и запоминаются.',
      iconBg: '#FFF0F6',
    },
    {
      icon: '⚡',
      title: 'Быстрая разработка',
      desc: 'Сдаю проекты быстро и качественно.',
      iconBg: '#FFFBEB',
    },
    {
      icon: '📱',
      title: 'Mobile First',
      desc: 'Все решения адаптивны и удобны на мобильных устройствах.',
      iconBg: '#FFF7ED',
    },
    {
      icon: '🎨',
      title: 'Современный дизайн',
      desc: 'Красивые, эстетичные и удобные интерфейсы.',
      iconBg: '#F0FDF4',
    },
    {
      icon: '🤖',
      title: 'AI Ассистент',
      desc: 'Использую AI-инструменты для создания умных продуктов.',
      iconBg: '#F3F0FF',
    },
  ],

  contact: {
    title: 'Давай создадим что-то',
    titleAccent: 'вместе',
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
    sub: 'Сделано с ❤️ и кодом',
  },
}
