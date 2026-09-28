import Link from 'next/link';
import { Container } from '@/components/site/Container';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-4 py-24">
      <p className="font-heading text-sm font-semibold tracking-widest text-primary uppercase">
        404
      </p>
      <h1 className="font-heading text-4xl font-bold">Page not found</h1>
      <p className="max-w-xl text-muted-foreground">
        The page you were looking for has moved or no longer exists.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className={buttonVariants({ size: 'lg' })}>
          Go to the home page
        </Link>
        <Link href="/programs" className={buttonVariants({ size: 'lg', variant: 'outline' })}>
          See our courses
        </Link>
      </div>
    </Container>
  );
}
