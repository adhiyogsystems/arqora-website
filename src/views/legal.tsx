import { Container, PageHero } from "@/components/ui";
import type { Lang } from "@/i18n/config";
import { pageMetadata } from "@/i18n/config";
import { germanOffice, legal, site, telHref } from "@/lib/site";

/*
 * Drafts for the Impressum and privacy policy. They describe how this site
 * actually works (Vercel hosting, self-hosted fonts, no cookies or analytics,
 * contact by WhatsApp or email). Have them checked by someone qualified in
 * German law before relying on them, and update them if the site changes.
 */

type Section = { h: string; body: React.ReactNode };

function LegalPage({ eyebrow, title, intro, sections, updated }: { eyebrow: string; title: string; intro: string; sections: Section[]; updated: string }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} />
      <section data-theme="light" className="bg-white py-20 sm:py-28">
        <Container>
          <div className="max-w-3xl space-y-12">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">{s.h}</h2>
                <div className="mt-4 space-y-3 leading-relaxed text-ink-soft [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-ink">
                  {s.body}
                </div>
              </div>
            ))}
            <p className="border-t border-ink/10 pt-6 text-sm text-ink-soft">{updated}</p>
          </div>
        </Container>
      </section>
    </>
  );
}

const Lines = ({ lines }: { lines: string[] }) => (
  <p>
    {lines.map((l) => (
      <span key={l} className="block">{l}</span>
    ))}
  </p>
);

function contactBlock(lang: Lang) {
  const emails = [germanOffice.email, site.email].filter(Boolean) as string[];
  return (
    <p>
      {emails.map((e) => (
        <span key={e} className="block">
          {lang === "de" ? "E-Mail" : "Email"}: <a href={`mailto:${e}`}>{e}</a>
        </span>
      ))}
      <span className="block">
        {lang === "de" ? "Telefon" : "Phone"}: <a href={telHref(site.phone)}>{site.phone}</a>
      </span>
      {germanOffice.phone && (
        <span className="block">
          {lang === "de" ? "Telefon (Deutschland)" : "Phone (Germany)"}: <a href={telHref(germanOffice.phone)}>{germanOffice.phone}</a>
        </span>
      )}
    </p>
  );
}

/* ---------- Impressum ---------- */

export const impressumMeta = (lang: Lang) =>
  pageMetadata(lang, "/impressum", lang === "de" ? "Impressum" : "Legal notice", lang === "de" ? "Impressum von Arqora Technology Solutions." : "Legal notice (Impressum) of Arqora Technology Solutions.");

export function ImpressumView({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const company = [site.name, ...(legal.legalForm[lang] ? [legal.legalForm[lang]] : []), de ? "Sitz: Indien" : "Registered office: India"];
  const sections: Section[] = [
    {
      h: de ? "Angaben gemäß § 5 DDG" : "Information according to § 5 DDG (German Digital Services Act)",
      body: (
        <>
          <Lines lines={company} />
          <p className="pt-2 font-medium text-ink">{de ? "Kontaktanschrift in Deutschland" : "Contact address in Germany"}</p>
          <Lines lines={germanOffice.lines[lang]} />
        </>
      ),
    },
    ...(legal.owner
      ? [{ h: de ? "Vertreten durch" : "Represented by", body: <p>{legal.owner}</p> }]
      : []),
    { h: de ? "Kontakt" : "Contact", body: contactBlock(lang) },
    ...(legal.registration || legal.taxId
      ? [
          {
            h: de ? "Registrierung und Steuern" : "Registration and tax",
            body: (
              <p>
                {legal.registration && <span className="block">{de ? "Registrierung" : "Registration"}: {legal.registration}</span>}
                {legal.taxId && <span className="block">{de ? "Steuernummer / USt-IdNr." : "Tax / VAT ID"}: {legal.taxId}</span>}
              </p>
            ),
          },
        ]
      : []),
    ...(legal.owner
      ? [
          {
            h: de ? "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV" : "Responsible for content according to § 18 (2) MStV",
            body: <p>{legal.owner}, {de ? "Anschrift wie oben" : "address as above"}</p>,
          },
        ]
      : []),
    {
      h: de ? "Verbraucherstreitbeilegung" : "Consumer dispute resolution",
      body: (
        <p>
          {de
            ? "Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."
            : "We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board."}
        </p>
      ),
    },
    {
      h: de ? "Haftung für Links" : "Liability for links",
      body: (
        <p>
          {de
            ? "Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich."
            : "Our website contains links to external third-party websites whose content we do not control. The provider or operator of each linked site is always responsible for its content."}
        </p>
      ),
    },
  ];

  return (
    <LegalPage
      eyebrow={de ? "rechtliches" : "legal"}
      title={de ? "impressum" : "legal notice"}
      intro={de ? "Angaben zum Anbieter dieser Website." : "Information about the provider of this website (Impressum)."}
      sections={sections}
      updated={`${de ? "Stand" : "Last updated"}: ${legal.updated[lang]}`}
    />
  );
}

/* ---------- Privacy ---------- */

export const privacyMeta = (lang: Lang) =>
  pageMetadata(lang, "/privacy", lang === "de" ? "Datenschutz" : "Privacy policy", lang === "de" ? "Datenschutzerklärung von Arqora Technology Solutions." : "Privacy policy of Arqora Technology Solutions.");

export function PrivacyView({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const sections: Section[] = de
    ? [
        {
          h: "1. Verantwortlicher",
          body: (
            <>
              <Lines lines={germanOffice.lines.de} />
              {contactBlock("de")}
            </>
          ),
        },
        {
          h: "2. Hosting und Server-Logdateien",
          body: (
            <>
              <p>
                Diese Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf der Seiten verarbeitet der Hoster technisch notwendige Daten
                wie IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser und Betriebssystem, um die Website auszuliefern und vor
                Missbrauch zu schützen.
              </p>
              <p>
                Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und stabilen Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Die
                Übermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework bzw. der EU-Standardvertragsklauseln.
              </p>
            </>
          ),
        },
        {
          h: "3. Keine Cookies, kein Tracking",
          body: (
            <p>
              Wir setzen keine Cookies und keine Analyse- oder Tracking-Werkzeuge ein. Schriftarten werden von unserem eigenen Server
              geladen; es findet keine Verbindung zu Google Fonts statt.
            </p>
          ),
        },
        {
          h: "4. Kontakt per E-Mail, Telefon, WhatsApp und Kontaktformular",
          body: (
            <>
              <p>
                Wenn Sie uns kontaktieren, verarbeiten wir Ihre Angaben (z. B. Name, Telefonnummer, Nachricht), um Ihre Anfrage zu
                beantworten (Art. 6 Abs. 1 lit. b DSGVO bei Vertragsanbahnung, sonst lit. f).
              </p>
              <p>
                Unser Kontaktformular speichert keine Daten auf unserem Server. Es öffnet WhatsApp oder Ihr E-Mail-Programm mit Ihrer
                vorbereiteten Nachricht. Wenn Sie WhatsApp nutzen, gelten zusätzlich die Datenschutzbestimmungen von WhatsApp Ireland
                Limited (Meta). Wir löschen Ihre Daten, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine gesetzlichen
                Aufbewahrungspflichten bestehen.
              </p>
            </>
          ),
        },
        {
          h: "5. Ihre Rechte",
          body: (
            <>
              <p>
                Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung, auf Datenübertragbarkeit
                sowie auf Widerspruch gegen die Verarbeitung (Art. 15–21 DSGVO). Wenden Sie sich dafür an die oben genannten Kontaktdaten.
              </p>
              <p>
                Sie können sich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel beim Unabhängigen Landeszentrum
                für Datenschutz Schleswig-Holstein (ULD).
              </p>
            </>
          ),
        },
      ]
    : [
        {
          h: "1. Controller",
          body: (
            <>
              <Lines lines={germanOffice.lines.en} />
              {contactBlock("en")}
            </>
          ),
        },
        {
          h: "2. Hosting and server logs",
          body: (
            <>
              <p>
                This website is hosted by Vercel Inc. (USA). When you open a page, the host processes technically necessary data such as
                your IP address, date and time, the page requested, browser and operating system, to deliver the site and protect it
                against misuse.
              </p>
              <p>
                The legal basis is our legitimate interest in running the site securely and reliably (Art. 6(1)(f) GDPR). Transfers to the
                USA are based on the EU-US Data Privacy Framework or the EU standard contractual clauses.
              </p>
            </>
          ),
        },
        {
          h: "3. No cookies, no tracking",
          body: (
            <p>
              We do not use cookies or any analytics or tracking tools. Fonts are served from our own server; no connection is made to
              Google Fonts.
            </p>
          ),
        },
        {
          h: "4. Contact by email, phone, WhatsApp and the contact form",
          body: (
            <>
              <p>
                When you contact us, we process the details you give us (such as your name, phone number and message) to answer your
                enquiry (Art. 6(1)(b) GDPR for pre-contract enquiries, otherwise Art. 6(1)(f)).
              </p>
              <p>
                Our contact form does not store anything on our server. It opens WhatsApp or your email app with your message ready to
                send. If you use WhatsApp, the privacy policy of WhatsApp Ireland Limited (Meta) also applies. We delete your data once it
                is no longer needed and no legal retention period applies.
              </p>
            </>
          ),
        },
        {
          h: "5. Your rights",
          body: (
            <>
              <p>
                You have the right to access, rectify and erase your data, to restrict processing, to data portability and to object to
                processing (Art. 15–21 GDPR). Contact us using the details above.
              </p>
              <p>
                You can also complain to a data protection supervisory authority, for example the Independent Centre for Privacy
                Protection Schleswig-Holstein (ULD).
              </p>
            </>
          ),
        },
      ];

  return (
    <LegalPage
      eyebrow={de ? "rechtliches" : "legal"}
      title={de ? "datenschutz" : "privacy policy"}
      intro={de ? "Wie wir mit Ihren Daten umgehen: so wenig wie möglich." : "How we handle your data: as little as possible."}
      sections={sections}
      updated={`${de ? "Stand" : "Last updated"}: ${legal.updated[lang]}`}
    />
  );
}
