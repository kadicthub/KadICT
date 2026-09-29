import Image from 'next/image';
import type { LmsCourse } from '@/lib/lms';

/**
 * A KAD Learn course, drawn exactly like the card on learn.kadhub.ng so a
 * course looks the same on both sites. The whole card links to its page there.
 */
export function CourseCard({ course, preload = false }: { course: LmsCourse; preload?: boolean }) {
  const titleId = `course-${course.slug}-title`;
  return (
    <article
      aria-labelledby={titleId}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border bg-card transition-shadow focus-within:ring-3 focus-within:ring-ring/50 hover:shadow-md"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        {course.coverUrl ? (
          <Image
            src={course.coverUrl}
            alt=""
            fill
            preload={preload}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center font-heading text-5xl font-semibold text-muted-foreground"
          >
            {course.title.trim().charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {course.category && (
          <p className="text-xs font-medium text-muted-foreground uppercase">
            {course.category.name}
          </p>
        )}
        <h3 id={titleId} className="font-heading text-lg leading-tight font-semibold">
          <a
            href={course.url}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {course.title}
          </a>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{course.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3 text-sm">
          <span className="text-muted-foreground">By {course.teacher}</span>
          <span className="text-right font-medium">{course.price.label}</span>
        </div>
      </div>
    </article>
  );
}
