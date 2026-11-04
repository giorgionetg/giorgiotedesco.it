import { siteRole } from './site-role';

const roleDescription = `${siteRole} with 16+ years of experience in designing scalable Cloud Native systems, Enterprise Modernization, and Secure Web Architectures.`;
const fullDescription = `${roleDescription} Specializing in bridging legacy infrastructure with modern Next.js, Kubernetes, and Web3 technologies.`;

export const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://giorgiotedesco.it/#person',
      url: 'https://giorgiotedesco.it/',
      name: 'Giorgio Tedesco',
      givenName: 'Giorgio',
      familyName: 'Tedesco',
      image: 'https://giorgiotedesco.it/images/giorgiotedesco-ai-clone.png',
      jobTitle: siteRole,
      description: fullDescription,
      disambiguatingDescription: `Giorgio Tedesco is a ${siteRole.toLowerCase()} specializing in software engineering and 3D graphics, distinct from the legal professional Avvocato Giorgio Tedesco.`,
      sameAs: [
        'https://www.linkedin.com/in/giorgiotedesco',
        'https://github.com/giorgionetg',
        'https://x.com/giorgionetg',
        'https://registry.jsonresume.org/giorgionetg',
      ],
      knowsAbout: [
        'Solution Architecture',
        'System Design',
        'Cloud Native Computing',
        'Cybersecurity & Data Integrity',
        'Next.js & React Ecosystem',
        'TypeScript',
        'Kubernetes & Docker',
        'Microservices Architecture',
        'Web3 & Blockchain Integration',
        '3D Web Development (Three.js, R3F)',
        'Legacy System Modernization',
      ],
      alumniOf: {
        '@type': 'Organization',
        name: 'Lumsa',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://giorgiotedesco.it/#website',
      url: 'https://giorgiotedesco.it/',
      name: 'Giorgio Tedesco',
      description: roleDescription,
      inLanguage: 'en',
      publisher: { '@id': 'https://giorgiotedesco.it/#person' },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://giorgiotedesco.it/#webpage',
      url: 'https://giorgiotedesco.it/',
      name: `Giorgio Tedesco | ${siteRole}`,
      description: fullDescription,
      isPartOf: { '@id': 'https://giorgiotedesco.it/#website' },
      about: { '@id': 'https://giorgiotedesco.it/#person' },
      mainEntity: { '@id': 'https://giorgiotedesco.it/#person' },
      inLanguage: 'en',
    },
  ],
};
