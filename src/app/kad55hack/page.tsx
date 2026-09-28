import type { Metadata } from 'next';
import Link from 'next/link';
import { EventArticle } from '@/components/site/EventArticle';

export const metadata: Metadata = {
  title: 'Kaduna @55 Hackathon',
  description:
    'The Kaduna Innovation Challenge hackathon: 70 registered teams from across the country, and the ten best ideas selected.',
  alternates: { canonical: '/kad55hack' },
};

export default function Kad55HackPage() {
  return (
    <EventArticle
      title="Kaduna @55 Hackathon"
      when="2022"
      image="/images/events/kaduna-at-55-hackathon.jpg"
      imageAlt="Participants at the Kaduna @55 Hackathon"
    >
      <p>
        As part of Kaduna State’s 55th anniversary, KAD ICT Hub hosted the Kaduna Innovation
        Challenge hackathon.
      </p>
      <blockquote>
        <p>
          The Kaduna Innovation Challenge (HACKATHON) application form was designed on the KAD ICT
          HUB website, a total number of 70 teams registered and the best 10 ideas were selected
          from 10 teams across the country.
        </p>
      </blockquote>
      <p>
        See photos from the <Link href="/challenge">Kaduna State Innovation Challenge</Link>.
      </p>
    </EventArticle>
  );
}
