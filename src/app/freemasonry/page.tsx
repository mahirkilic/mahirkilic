import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { freemasonry } from "@/lib/site";

export const metadata: Metadata = {
  title: "Freemasonry",
};

export default function FreemasonryPage() {
  return (
    <>
      <PageIntro title="Freemasonry">
        <p>{freemasonry.intro}</p>
        <ul className="mt-4 space-y-1 text-sm text-muted">
          {freemasonry.pillars.map((p) => (
            <li key={p}>— {p}</li>
          ))}
        </ul>
      </PageIntro>

      <div className="site-shell py-6 md:py-8">
        <Section title={freemasonry.craft.title} note={freemasonry.craft.currentTitle}>
          <CardGrid
            cards={freemasonry.craft.lodges.map((lodge) => ({
              title: lodge.name,
              note: lodge.note,
              items: lodge.items,
            }))}
          />
        </Section>

        <Section title={freemasonry.supreme.title} note={freemasonry.supreme.subtitle}>
          <Rows rows={freemasonry.supreme.items.map((item) => ({ text: item }))} />
        </Section>

        <Section title="Progressive Orders">
          <h3 className="text-sm font-semibold text-ink">{freemasonry.promotions.title}</h3>
          <Rows rows={freemasonry.promotions.items.map((item) => ({ text: item }))} />
          <div className="mt-6">
            <CardGrid
              cards={freemasonry.otherOrders.map((order) => ({
                title: order.title,
                items: order.items,
              }))}
            />
          </div>
        </Section>

        {[freemasonry.mark, freemasonry.ram].map((order) => (
          <Section key={order.title} title={order.title}>
            <div className="space-y-2 text-sm leading-relaxed text-muted">
              {order.summary.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <Rows rows={order.timeline.map((item) => ({ text: item.role, date: item.date }))} />
          </Section>
        ))}
      </div>
    </>
  );
}

/** One block of the page: title on the left, content on the right, a rule above. */
function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-3 border-t border-line py-6 first:border-t-0 first:pt-0 last:pb-0 lg:grid-cols-[16rem_1fr] lg:gap-10">
      <div>
        <h2 className="font-[family-name:var(--font-display)] text-2xl leading-tight tracking-tight text-ink">
          {title}
        </h2>
        {note ? <p className="mt-1 text-sm text-soft">{note}</p> : null}
      </div>
      <div>{children}</div>
    </section>
  );
}

/** A list of entries, one per line, with the date pushed to the right. */
function Rows({ rows }: { rows: { text: string; date?: string }[] }) {
  return (
    <ul className="mt-3 divide-y divide-line border-y border-line text-sm first:mt-0">
      {rows.map((row) => (
        <li key={row.text} className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <span className="text-ink">{row.text}</span>
          {row.date ? <span className="shrink-0 text-soft">{row.date}</span> : null}
        </li>
      ))}
    </ul>
  );
}

/** Lodges and orders as small cards in a grid. */
function CardGrid({ cards }: { cards: { title: string; note?: string; items: string[] }[] }) {
  return (
    <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <article key={card.title}>
          <h3 className="text-[0.95rem] font-semibold text-ink">{card.title}</h3>
          {card.note ? <p className="text-xs text-soft">{card.note}</p> : null}
          <ul className="mt-1.5 space-y-0.5 text-sm text-muted">
            {card.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
