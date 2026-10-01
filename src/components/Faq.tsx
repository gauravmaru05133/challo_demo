export type FaqItem = { q: string; a: string };

export default function Faq({ items, title = "Frequently Asked Questions" }: { items: FaqItem[]; title?: string }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-center text-3xl font-bold text-neutral-900">
        {title}
      </h2>
      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-neutral-200 bg-white p-5 shadow-sm open:shadow-md"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-neutral-900">
              {item.q}
              <span className="text-xl text-yellow-500 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-relaxed text-neutral-600">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
