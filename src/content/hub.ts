/**
 * The hub's own words, carried over from the original kadhub.ng pages. Only
 * template filler (placeholder authors, comment counts, lorem ipsum, dummy
 * tags) was dropped in the move.
 */
export const hubIntro =
  'A world-class innovation hub that from inception has trained more than 20,000 residents of Kaduna State. It is an outsourcing powerhouse from which the public and private sector can outsource their tech needs, as well as an incubation and acceleration destination for startups.';

export const stats = [
  { value: '20,000+', label: 'Kaduna residents trained' },
  { value: '55', label: 'women-led startups accelerated with the U.S. Embassy' },
  { value: '3', label: 'patents from partnerships with tertiary institutions' },
];

export const pillars = [
  {
    title: 'Training Programs',
    tagline: 'Learn from the best, master the latest.',
    body: 'Our team of certified instructors is dedicated to providing top-notch training on the latest and most in-demand technologies. With their expertise and passion for teaching, they deliver engaging courses that equip learners with the skills they need to excel in today’s competitive tech landscape.',
  },
  {
    title: 'Software Development',
    tagline: 'Crafting tomorrow’s tech solutions, today.',
    body: 'Our software development team creates innovative, tailored solutions for government agencies, private organisations and individuals. By leveraging modern technologies and industry best practice, we deliver high-quality software that drives efficiency, improves operations and solves complex challenges.',
  },
  {
    title: 'Consultancy',
    tagline: 'Your trusted partners for growth and success.',
    body: 'Our experienced consultants offer expert guidance across management, information technology and more. With a deep understanding of industry trends and best practice, we help organisations identify opportunities, optimise processes and achieve their strategic goals.',
  },
];

export const incubation =
  'The KAD ICT Hub is a dynamic innovation ecosystem that fosters growth and development for startups. Through strategic partnerships with local and international tertiary institutions, we have achieved significant milestones, including the generation of three patents and the development of innovative products for domestic and global markets. Our incubation and acceleration programs provide startups with the support and resources they need to succeed. In collaboration with the U.S. Embassy, we have accelerated 55 women-led startups through the Academy for Women Entrepreneurs program, empowering them with grants and seed funding to fuel their ventures.';

export const history =
  'The KAD ICT Hub is a premier innovation centre dedicated to fostering technological advancement in Kaduna State. Since its establishment, the hub has trained more than 20,000 local residents, equipping them with the skills they need to thrive in the digital age. As an outsourcing powerhouse, the hub serves the public and private sectors with expert tech solutions for their diverse needs, and as an incubation and acceleration hub it gives startups the support and resources required to grow and succeed.';

export const mission =
  'To bridge the gap between cutting-edge technologies and local communities, fostering a culture of innovation and empowerment. By bringing together world-class innovation and expertise, we aim to drive economic growth, create sustainable jobs and improve the quality of life for all.';

export const vision =
  'To become a leading hub for entrepreneurs, computer engineers, software developers and IT professionals: a vibrant, supportive environment where individuals connect, collaborate and thrive, with access to modern resources, mentorship and networks that empower the next generation of tech innovators and drive the digital transformation of our region.';

export const testimonials = [
  {
    quote:
      'This is a rare opportunity, created by Kaduna State Government, that I encourage youths from within and outside the state.',
    name: 'Prof. Isa Ali Ibrahim Pantami',
    role: 'Minister, Ministry of Communications and Digital Economy',
    image: '/images/people/pantami.jpg',
  },
  {
    quote:
      'We are glad to see brilliant young people endowed with creative and innovative talents from schools to come together to showcase their talents.',
    name: 'Dr. Hadiza Balarabe',
    role: 'Deputy Governor, Kaduna State',
    image: '/images/people/balarabe.jpg',
  },
  {
    quote:
      'We are very grateful partnering with the KAD ICT Hub because they are doing amazingly very well as we have young people now doing great things from Kaduna State.',
    name: 'Hon. Prof. Kabir Mato',
    role: 'Commissioner, Ministry of Business, Innovation and Technology',
    image: '/images/people/mato.jpg',
  },
];

export type Startup = {
  name: string;
  description: string;
  logo: string;
  website?: string;
  links: { label: string; href: string }[];
};

export const startups: Startup[] = [
  {
    name: 'Cyber-aim Tech',
    description: 'IoT and software startup accelerated by KAD ICT Hub.',
    logo: '/images/startups/cyberaim.jpg',
    website: 'https://cyberaim.ng/',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/cyberaimtech' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cyber-aim-tech/' },
    ],
  },
  {
    name: 'Sunstream Tech',
    description: 'Drone production startup incubated by KAD ICT Hub.',
    logo: '/images/startups/sunstream.jpg',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/sunstreamtech' },
      { label: 'X', href: 'https://x.com/SunstreamTech' },
    ],
  },
  {
    name: 'Reflex Agritech Solutions',
    description: 'Farmer support community incubated by KAD ICT Hub.',
    logo: '/images/startups/reflex-agritech.jpg',
    website: 'https://rasproject.ng/',
    links: [],
  },
];

export type HubEvent = {
  slug: string;
  href: string;
  title: string;
  when: string;
  image: string;
  summary: string;
};

export const events: HubEvent[] = [
  {
    slug: 'kaduna-at-55-hackathon',
    href: '/kad55hack',
    title: 'Kaduna @55 Hackathon',
    when: '2022',
    image: '/images/events/kaduna-at-55-hackathon.jpg',
    summary:
      'The Kaduna Innovation Challenge hackathon drew 70 registered teams from across the country; the ten best ideas were selected for the final.',
  },
  {
    slug: 'stem-festival',
    href: '/stemfest',
    title: 'STEM and Creativity Festival',
    when: 'Annual',
    image: '/images/events/stem-festival.jpg',
    summary:
      'An annual festival that exposes young people to Science, Technology, Engineering, Mathematics and the creative arts, with leading scientists and artists from Nigeria and abroad.',
  },
  {
    slug: 'innovation-challenge',
    href: '/challenge',
    title: 'Kaduna State Innovation Challenge',
    when: '2023',
    image: '/images/gallery/challenge-1.jpg',
    summary:
      'A state-wide competition that celebrates creativity and ingenuity, where innovators compete for awards and cash prizes.',
  },
];

export const stemFestivalBrochure = '/assets/img/STEM Festival 2024 Print final.pdf';
