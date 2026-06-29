import { notFound } from "next/navigation";
import { companyContact, services } from "../../site-data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} | Heavenection`,
    description: service.text,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Heavenection`,
      description: service.text,
      url: `/services/${service.slug}`,
      siteName: "Heavenection",
      images: ["/brand/admin-heavenection-logo.png"],
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const enquiryUrl = `/?service=${encodeURIComponent(service.title)}#contact`;
  const whatsappUrl = `https://wa.me/919746862047?text=${encodeURIComponent(
    `Hi Heavenection, I need guidance for ${service.title}.`,
  )}`;

  return (
    <main className="service-page">
      <header className="service-hero">
        <a className="service-back" href="/">
          Back to home
        </a>
        <span>{service.tag}</span>
        <h1>{service.title}</h1>
        <p>{service.intro}</p>
        <div className="service-actions">
          <a className="button button-primary" href={enquiryUrl}>
            Send request
          </a>
          <a className="button button-light" href={whatsappUrl} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </header>

      <section className="service-detail-grid">
        <article>
          <span>Benefits</span>
          <h2>How we can help</h2>
          <ul>
            {service.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <span>Preparation</span>
          <h2>Common details</h2>
          <ul>
            {service.documents.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="service-contact-strip">
        <div>
          <span>Heavenection</span>
          <h2>Talk with the team before deciding.</h2>
          <p>
            {companyContact.addressLineOne}, {companyContact.addressLineTwo}
          </p>
        </div>
        <a className="button button-primary" href={`tel:${companyContact.phone}`}>
          Call {companyContact.phone}
        </a>
      </section>
    </main>
  );
}
