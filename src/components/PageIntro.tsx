export function PageIntro({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper">
      <div className="site-shell py-6 md:py-8">
        <p className="fade-up text-xs uppercase tracking-[0.22em] text-soft">Mahir Kılıç</p>
        <h1 className="fade-up-delay mt-1 font-[family-name:var(--font-display)] text-3xl leading-tight tracking-tight text-ink md:text-4xl">
          {title}
        </h1>
        {children ? (
          <div className="fade-up-delay-2 mt-3 text-base leading-relaxed text-muted">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
