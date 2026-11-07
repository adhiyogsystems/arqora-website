import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="text-sm font-semibold text-saffron">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">This page doesn&apos;t exist.</h1>
      <div className="mt-8">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </Container>
  );
}
