/**
 * The hub's course flyers, shown in the welcome popup's slideshow. Each links
 * to the course on KAD Learn (same slug). Graphic Design has no flyer.
 */
export const flyers = [
  { slug: 'data-analytics', title: 'Data Analytics' },
  { slug: 'cyber-security', title: 'Cyber Security' },
  { slug: 'artificial-intelligence', title: 'Artificial Intelligence' },
  { slug: 'ui-ux-design', title: 'UI/UX Design' },
  { slug: 'web-development', title: 'Web Development' },
  { slug: 'software-engineering', title: 'Software Engineering' },
  { slug: 'mobile-app-development', title: 'Mobile App Development' },
  { slug: 'networking', title: 'Networking' },
  { slug: 'digital-literacy', title: 'Digital Literacy' },
].map((f) => ({ ...f, image: `/images/flyers/${f.slug}.jpg` }));

export type Flyer = (typeof flyers)[number];
