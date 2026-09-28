import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CourseCard } from '@/components/site/CourseCard';

describe('CourseCard', () => {
  it('links the whole card to the course on KAD Learn', () => {
    render(
      <CourseCard
        course={{
          slug: 'networking',
          title: 'Networking',
          summary: 'Computer networks and device connectivity.',
          url: 'https://learn.kadhub.ng/courses/networking',
          coverUrl: null,
          category: { name: 'Networking', slug: 'networking' },
          teacher: 'KAD ICT Hub',
          price: { kind: 'closed', label: 'Next intake to be announced' },
          nextCohort: null,
        }}
      />,
    );
    expect(screen.getByRole('link', { name: 'Networking' })).toHaveAttribute(
      'href',
      'https://learn.kadhub.ng/courses/networking',
    );
    expect(screen.getByText('Next intake to be announced')).toBeInTheDocument();
    expect(screen.getByText('By KAD ICT Hub')).toBeInTheDocument();
  });
});
