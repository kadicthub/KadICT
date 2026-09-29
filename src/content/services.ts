import {
  Blocks,
  Briefcase,
  DatabaseZap,
  GraduationCap,
  MonitorCheck,
  Rocket,
  type LucideIcon,
} from 'lucide-react';

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
  overview: string;
  features: string[];
  benefits: string[];
  showcase?: { label: string; href: string };
};

export const services: Service[] = [
  {
    slug: 'erp-systems',
    title: 'ERP Systems',
    icon: Briefcase,
    description:
      'Our team of experts specialises in the development, design and deployment of Enterprise Resource Planning (ERP) systems.',
    overview:
      'We provide comprehensive ERP solutions that integrate all facets of your operations, from inventory and order management to accounting and human resources. Our custom-built systems streamline your processes, improve efficiency and give you real-time insight into your operations.',
    features: [
      'Custom ERP development',
      'System integration',
      'Data migration',
      'Training and support',
      'Cloud and on-premise solutions',
      'Real-time reporting and analytics',
    ],
    benefits: [
      'Improved operational efficiency',
      'Better decision-making with real-time data',
      'Reduced operational costs',
      'Enhanced collaboration across departments',
      'Scalable solutions that grow with your business',
    ],
    showcase: {
      label: 'KADVREG — Kaduna’s automated vehicle registration platform',
      href: 'https://kadvreg.net/index.php',
    },
  },
  {
    slug: 'training',
    title: 'Training',
    icon: GraduationCap,
    description:
      'Our certified instructors provide top-notch training on the latest and most in-demand technologies.',
    overview:
      'KAD ICT Hub has trained more than 20,000 people across technology disciplines. Our programs equip participants with practical, industry-relevant skills that make them employable or ready to launch their own ventures. Every course is now on KAD Learn, where you can see what it covers and register for the next intake.',
    features: [
      'Hands-on practical training',
      'Certified instructors',
      'Modern learning facilities',
      'Morning and afternoon classes',
      'Certificate upon completion',
      'Job placement assistance',
    ],
    benefits: [
      'Gain skills in high-demand technologies',
      'Learn from industry experts',
      'Build a portfolio of projects',
      'Network with fellow tech enthusiasts',
      'Access to ongoing mentorship',
    ],
  },
  {
    slug: 'software-testing',
    title: 'Software Testing',
    icon: MonitorCheck,
    description:
      'Comprehensive and reliable testing that assures the quality and performance of your digital products.',
    overview:
      'We provide end-to-end software testing that helps you ship high-quality applications: manual and automated testing, performance testing and security testing, so your software meets the highest standards.',
    features: [
      'Manual and automated testing',
      'Performance testing',
      'Security testing',
      'User acceptance testing (UAT)',
      'Regression testing',
      'Mobile app testing',
      'API testing',
    ],
    benefits: [
      'Reduced bugs and errors in production',
      'Improved user experience',
      'Faster time to market',
      'Enhanced security',
      'Cost savings from early bug detection',
    ],
  },
  {
    slug: 'blockchain-lab',
    title: 'Blockchain Lab',
    icon: Blocks,
    description:
      'The Africa Blockchain Lab, in partnership with Satoshi Capital Advisors, is a destination for blockchain research, development and innovation.',
    overview:
      'Our Blockchain Lab advances blockchain technology across Africa, providing research, development, training and consulting to help businesses and individuals put blockchain to work.',
    features: [
      'Blockchain research and development',
      'Smart contract development',
      'Cryptocurrency solutions',
      'NFT development',
      'Blockchain training programs',
      'Consulting services',
      'DApp development',
    ],
    benefits: [
      'Access to cutting-edge blockchain expertise',
      'Custom blockchain solutions',
      'Training on blockchain technologies',
      'Partnership with international blockchain experts',
      'Contribution to Africa’s blockchain ecosystem',
    ],
  },
  {
    slug: 'incubation-acceleration',
    title: 'Incubation & Acceleration',
    icon: Rocket,
    description:
      'Mentorship, funding opportunities, workspace and access to industry experts for startups at every stage.',
    overview:
      'We have incubated and accelerated startups across sectors, including 55 women-led startups through the Academy for Women Entrepreneurs program in partnership with the U.S. Embassy. Our programs provide the resources, mentorship and funding opportunities needed to turn ideas into businesses.',
    features: [
      'Mentorship from industry experts',
      'Access to funding and grants',
      'Co-working space',
      'Business development support',
      'Networking opportunities',
      'Technical resources',
      'Marketing and branding support',
    ],
    benefits: [
      'Transform your idea into a viable business',
      'Access to seed funding',
      'Expert guidance and mentorship',
      'Collaborative workspace',
      'Connections to investors and partners',
      'Structured program with measurable milestones',
    ],
  },
  {
    slug: 'big-data-cybersecurity',
    title: 'Big Data & Cybersecurity',
    icon: DatabaseZap,
    description:
      'A combined approach to big data and cybersecurity: insight from your data, and protection for it.',
    overview:
      'We provide big data analytics and cybersecurity services that help organisations protect their digital assets while extracting value from their data.',
    features: [
      'Big data analytics',
      'Security audits and assessments',
      'Penetration testing',
      'Security information and event management (SIEM)',
      'Data privacy and compliance',
      'Threat intelligence',
      'Incident response',
    ],
    benefits: [
      'Protect your digital assets',
      'Gain insights from your data',
      'Ensure regulatory compliance',
      'Proactive threat detection',
      'Reduced risk of data breaches',
      'Enhanced business intelligence',
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
