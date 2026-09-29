import { FileDown } from 'lucide-react';
import type { Metadata } from 'next';
import { EventArticle } from '@/components/site/EventArticle';
import { stemFestivalBrochure } from '@/content/hub';

export const metadata: Metadata = {
  title: 'STEM and Creativity Festival',
  description:
    'An annual festival that exposes young people to Science, Technology, Engineering, Mathematics and the creative arts.',
  alternates: { canonical: '/stemfest' },
};

export default function StemFestPage() {
  return (
    <EventArticle
      title="STEM and Creativity Festival"
      when="Annual"
      image="/images/events/stem-festival.jpg"
      imageAlt="Young people at the STEM and Creativity Festival"
    >
      <p>
        The STEM and Creativity Festival is an annual event that exposes young people to Science,
        Technology, Engineering, Mathematics and the creative arts. The festival provides a platform
        for leading scientists and creative artists, both local and international, to engage with
        young people, inspire them to embark on careers in science or the creative arts, and become
        leaders in these fields.
      </p>
      <p>
        It also identifies and designs unique interactive events and educational resources with
        scientific integrity, to advance science and creativity and to facilitate learning in an
        informal way. This gives learners an opportunity for discovery outside the classroom.
      </p>
      <blockquote>
        <p>
          The event is inspired by Scifest South Africa and the USA Science &amp; Engineering
          Festival.
        </p>
      </blockquote>
      <p>
        Scifest South Africa and the USA Science &amp; Engineering Festival are two of the largest
        interactive science festivals for students, teachers and families in the world. With the
        continued support of the Kaduna State Government and other sponsors, the festival makes
        learning accessible to the public, encouraging parents and schools from around the country
        to bring learners to the event.
      </p>
      <p>
        <a
          href={stemFestivalBrochure}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5"
        >
          <FileDown className="size-4" aria-hidden="true" /> Download the STEM Festival 2024
          brochure (PDF, 24 MB)
        </a>
      </p>
    </EventArticle>
  );
}
