var data = {
  fullName: 'Trinh Tran Phuong Nam',
  information: {
    gender: 'Male',
    dateOfBirth: {
      year: 1996,
      month: 12,
      day: 18,
    },
  },
  summary:
    'I am a web developer with more than 7 years of experience (including more than 4 years in Front-End web development and over 7 years in Back-End web development). I graduated from university with a major in IT. I have a solid knowledge of Object-Oriented Programming and Design Patterns. I have about 1 year of experience leading a small team of 4 developers.',
  contact: {
    address: {
      label: 'District 3, Ho Chi Minh city',
    },
    email: {
      label: 'ttpn18121996@gmail.com',
      link: 'mailto:ttpn18121996@gmail.com',
    },
    phone: {
      label: '+84 764 196 421',
      link: 'tel:+84764196421',
    },
    linkedin: {
      label: 'linkedin',
      link: 'https://www.linkedin.com/in/trinh-tran-phuong-nam',
    },
  },
  technicalSkills: {
    languages: ['PHP', 'Javascript'],
    databaseManagementSystems: ['MySQL', 'SQLite', 'Postgres'],
    frameworkPlatforms: ['Laravel', 'React/Next.js', 'Vue', 'Jquery', 'Bootstrap', 'Tailwind CSS'],
    others: ['Git', 'Docker', 'AWS', 'Design pattern', 'SOLID priciples, standard code PSR-12'],
  },
  experiences: [
    {
      name: 'WAO',
      from: 2017,
      to: 2020,
    },
    {
      name: 'International Digital Services Vietnam',
      from: 2020,
      to: 2022,
    },
    {
      name: 'Voyager',
      from: 2022,
      to: null,
    },
  ],
  projects: [
    {
      name: 'Sunnyview (PHP Laravel, PostgreSQL, AWS SDK, Bootstrap, Jquery, Vue)',
      description:
        'Provide comprehensive support for application development on AWS, building AWS environment, deployment and operation support.',
      technologies: ['PHP Laravel', 'PostgreSQL', 'AWS SDK', 'Bootstrap', 'Jquery', 'Vue'],
      teamSize: 5,
      responsibilities:
        'write API, make management features through AWS SDK, technology transfer, frontend development using Vue',
      dedications:
        'Research and implement AWS QuickSight service into company product. Deal with dashboards, stats, predictions, and what-if scenarios with QuickSight for growth',
    },
    {
      name: 'MaybeVN (PHP, MySQL, Next.js)',
      description:
        'Information and news-sharing community. Where users can create their own groups to share with members and have basic features like a social networking site.',
      technologies: ['PHP Laravel', 'MySQL', 'Next.js'],
      teamSize: 5,
      responsibilities:
        'front-end development, client-side interactive features and effects, review of the code, and resolve pull requests',
      dedications:
        'front-end development, client-side interactive features and effects, review of the code, and resolve pull requests.',
    },
    {
      name: 'TPCOMS (PHP Laravel, React, MySQL, Bootstrap, JQuery)',
      description:
        'Manage devices, network infrastructure and issues. Assign tasks to infrastructure maintenance staff.',
      technologies: ['PHP Laravel', 'MySQL', 'Bootstrap', 'JQuery'],
      teamSize: 5,
      responsibilities:
        'write API, make management functions for dashboard admin and staff portal, support and maintain the project',
      dedications:
        'Responsible for working directly with customers, taking requirements, clarifying requirements, and designing features (as a BA).',
    },
    {
      name: 'Simple repository package for laravel',
      description: 'Build repository and service patterns quickly and simply.',
      technologies: ['PHP', 'Laravel'],
      teamSize: 1,
      links: [
        {
          label: 'Packagist',
          url: 'https://packagist.org/packages/ttpn18121996/simple-repository',
        },
        {
          label: 'Github',
          url: 'https://github.com/ttpn18121996/simple-repository',
        },
      ],
    },
    {
      name: 'Personal framework',
      description:
        'Building a framework in PHP based on the idea of Laravel aims to study how it works and the necessary conditions for a framework. Learn the nature and application of patterns in solving difficult problems.',
      technologies: ['PHP'],
      teamSize: 1,
      links: [
        {
          label: 'Packagist',
          url: 'https://packagist.org/packages/brightmoon/framework',
        },
        {
          label: 'Github',
          url: 'https://github.com/ttpn18121996/framework',
        },
      ],
    },
    {
      name: 'Nodejs packages',
      description:
        'This is a collection of nodejs packages written in TypeScript, which can be used for nodejs projects',
      technologies: ['Typescript', 'Javascript'],
      teamSize: 1,
      links: [
        {
          label: 'Npm',
          url: 'https://www.npmjs.com/search?q=%40noravel',
        },
        {
          label: 'Github',
          url: 'https://github.com/ttpn18121996/noravel',
        },
      ],
    },
    {
        name: 'This CV',
        description: 'Generate the cv automatically',
        technologies: ['HTML/CSS', 'Javascript'],
        teamSize: 1,
    },
  ],
};
