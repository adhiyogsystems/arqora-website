import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section data-theme="dark" className="flex min-h-[80svh] items-center bg-night text-white">
      <Container className="py-32 text-center">
        <p className="font-display text-[7rem] font-semibold leading-none tracking-[-0.06em] text-gradient sm:text-[10rem]">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">this page doesn&apos;t exist.</h1>
        <div className="mt-10">
          <ButtonLink href="/" variant="light">back to home</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
