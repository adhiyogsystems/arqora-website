# Arqora: Global SEO & Growth Strategy

Arqora Technology Solutions, a brand of Adhiyog Systems (India). Website: `arqoratech.vercel.app` → `arqoratech.com` once bought.
Languages: English (`/`, global) and German (`/de`, DACH). Last reviewed: November 2026.

**Legend:** ✅ done in code · 🔧 next code task · 👤 owner action (you or your partner) · 📊 measure

> Search volumes below are **not measured yet**. Keywords are prioritised by intent and fit. Confirm volumes in
> Google Keyword Planner and, after launch, in Google Search Console before investing in content.

---

## 1. Website audit

| Area | Status |
|---|---|
| Pages | Home, Services (5), Work (3 projects), About, Contact, Impressum, Privacy, in EN and DE (29 pages) ✅ |
| Design | Dark/light scenes, bold type, motion, works without JavaScript, reduced-motion respected ✅ |
| Navigation | Floating header, language switch on every page, footer with all services and legal links ✅ |
| Content | Service pages with includes, audiences and FAQs; home with engagement models, global delivery, industries, process, FAQ ✅ |
| Functionality | Contact form → WhatsApp or email; no backend yet 🔧 (add email delivery so non-WhatsApp visitors can enquire) |
| Gaps | No founder/team section, no testimonials, no pricing signals, no blog 👤🔧 |

## 2. SEO strategy & positioning

- **Positioning:** a *global software partner* for small and mid-sized businesses: fixed quotes, you own the code, a team in India with a European presence in Kiel.
- **Niche to win first:** SMEs that need *more than a website*: website + app + CRM + dashboards from one partner. Big agencies are too expensive for them; freelancers can't cover all four.
- **Audiences:** (1) Indian SMEs (clinics, schools, traders, travel); (2) German/EU SMEs and startups wanting cost-effective development with German-language contact; (3) founders needing MVPs/PWAs; (4) public bodies through partners.
- **Competitors (by type):** large offshore agencies (strong domains, generic content); local web agencies in Kiel/Hamburg (strong local, expensive); freelancer marketplaces (cheap, no ownership/continuity). **Our edge to state everywhere:** one partner for everything, fixed price, code ownership, German-speaking contact, real live products.

## 3. Keyword universe

### English (global)
| Type | Keywords |
|---|---|
| Short-tail | software development company · web development company · app development company · custom software development · CRM development |
| Mid-tail | custom CRM development services · PWA development company · website development and SEO services · business automation services · dashboard development services · offshore software development India |
| Long-tail (commercial) | hire dedicated developers from India · fixed price website development for small business · custom CRM for clinics · school management software development · booking app development for hotels · convert Excel to dashboard service · WhatsApp automation for business · AI chatbot for website and WhatsApp · multilingual website development English German |
| Long-tail (questions) | how much does a custom CRM cost · PWA vs native app for small business · should I build custom software or buy SaaS · how to digitise paper records · what is an MVP and how much does it cost |
| India local | website development company Solapur / Pune / Maharashtra · software company in Maharashtra · GeM website development partner |

### German (DACH)
| Type | Keywords |
|---|---|
| Short-tail | Softwareentwicklung · Webentwicklung · App-Entwicklung · Individualsoftware · CRM-Software |
| Mid-tail | Webentwicklung Agentur · CRM individuell entwickeln · PWA Entwicklung · Softwareentwicklung Festpreis · Dashboard erstellen lassen · Prozessautomatisierung KMU |
| Long-tail | Website erstellen lassen Kosten · App entwickeln lassen Kosten · Softwareentwicklung Indien Erfahrungen · Excel zu Dashboard · KI-Chatbot für Website · mehrsprachige Website erstellen lassen · Nearshore/Offshore Entwicklung Indien deutschsprachig |
| Local | Webdesign Kiel · Softwareentwicklung Kiel · App-Entwicklung Kiel · Webagentur Schleswig-Holstein · IT-Dienstleister Kiel |

### Mapping (one primary keyword per page, no cannibalisation)
| Page | EN primary | DE primary |
|---|---|---|
| Home | web, app & custom software development company ✅ | Web-, App- & Softwareentwicklung ✅ |
| /services/websites | website development & SEO services ✅ | Webentwicklung & SEO ✅ |
| /services/apps | PWA & mobile app development ✅ | App-Entwicklung PWA, Android, iOS ✅ |
| /services/crm-software | custom CRM & business software development ✅ | CRM- & Individualsoftware-Entwicklung ✅ |
| /services/data-automation | data analytics, dashboards & automation ✅ | Datenanalyse, Dashboards & Automatisierung ✅ |
| /services/government-projects | government & public sector software ✅ | Software für Behörden ✅ |
| Future /locations/kiel | – | Softwareentwicklung & Webdesign Kiel 🔧 |
| Future /hire-developers | hire dedicated developers India 🔧 | Entwickler aus Indien beauftragen 🔧 |

## 4. Website architecture

```
/                         /de
/services                 /de/services
/services/{5 services}    /de/services/{5}
/work                     /de/work            → later /work/{case-study}
/about  /contact          /de/about  /de/contact
/impressum  /privacy      /de/impressum  /de/privacy
Next: /industries/{healthcare|travel|education|retail|startups|public-sector}
      /insights/{article}  (blog, topic clusters below)
      /locations/kiel  /locations/india
      /hire-developers
```
Topic clusters: **Custom software** (pillar: CRM page → articles on cost, build vs buy, migration) · **Apps** (pillar: apps page → PWA vs native, booking apps, app cost) · **Websites & SEO** · **Data & automation** · **Industry** pages linking to the relevant services and case studies.

## 5. Technical SEO ✅
- Canonical URL on every page, following the real production domain automatically ✅
- hreflang `en`, `de`, `x-default` on every page; correct `<html lang>` per language ✅
- XML sitemap with both languages and alternates ✅ · robots.txt allowing all, sitemap and host declared ✅
- Static pre-rendering for all pages except contact (needs `?service=`) ✅ · 404 with correct status ✅
- 👤 After buying the domain: set it as **production domain** in Vercel → canonicals, sitemap and hreflang switch automatically. Add a redirect from `arqoratech.vercel.app`.
- 👤 Google Search Console + Bing Webmaster Tools: verify, submit `/sitemap.xml`.

## 6. On-page SEO ✅
- Unique keyword-led `<title>` and meta description on every page, EN and DE ✅
- One H1 per page; H2 per section; FAQ questions as summaries ✅
- Open Graph + Twitter cards with branded 1200×630 images (EN/DE) ✅
- 🔧 Add internal "related service" links inside service copy (not only the "other services" grid).

## 7. Content strategy
Publish **2 articles a month** per language, each targeting one long-tail question and linking to its pillar service:
1. How much does a custom CRM cost in 2026? (EN/DE)
2. PWA vs native app: which should a small business build?
3. Build vs buy: custom software or SaaS?
4. From Excel to live dashboard: a practical guide
5. WhatsApp automation for business: what's possible and legal
6. Website erstellen lassen: Kosten, Ablauf, Fallstricke (DE)
7. Softwareentwicklung mit Team in Indien: so funktioniert's (DE)
8. Case studies: Akkalkot Yatra (bilingual PWA), Sukh-Arogyam (monorepo PWA + Supabase): problem → approach → result, with numbers once available.

## 8. E-E-A-T (experience, expertise, authority, trust)
- ✅ Real live projects with screenshots and stacks · legal operator, Impressum, privacy, offices in India and Kiel
- 👤 **Founder/team section** with real names, photos, LinkedIn and years of experience (strongest missing trust signal)
- 👤 **Client testimonials** with name, company and permission · logos of clients
- 👤 Author names and bios on articles · Google Business Profile reviews

## 9. Backlinks
1. Own properties: link Arqora from Akkalkot Yatra and Sukh-Arogyam footers ("Built by Arqora") 👤🔧
2. Directories: Clutch, GoodFirms, DesignRush, Google Business Profile, LinkedIn, Crunchbase 👤
3. German: Gelbe Seiten, Das Örtliche, KITZ member/tenant listing, Kiel startup network, IHK Kiel listings 👤
4. India: Udyam/Startup India profile, NASSCOM listings, local business associations 👤
5. Content: guest posts on startup/SME blogs; answer questions on Reddit, Quora, Stack Overflow with genuine help 👤
6. Open source: publish a small useful package (e.g. bilingual Next.js starter) on GitHub 🔧
Avoid paid link schemes.

## 10. Internal linking ✅ / 🔧
- ✅ Header → services/work/about/contact; footer → all services and legal; home → every service, work, contact; service pages → all other services and contact with the service preselected
- 🔧 Work case studies ↔ related services; articles → pillar service; industry pages → services + case studies

## 11. Schema (structured data) ✅
Organization (legal name, parent organisation, addresses, contact points) · WebSite · FAQPage (home + every service) · Service with OfferCatalog (every service) · BreadcrumbList (service pages). 🔧 Later: Article for blog posts, CreativeWork/CaseStudy for work items, LocalBusiness for Kiel only if a staffed office exists.

## 12. Image SEO
✅ Descriptive alt text on project screenshots · Next.js image optimisation (AVIF/WebP, responsive sizes) · branded share images.
🔧 Phone mockups of each project; descriptive file names (`arqora-crm-dashboard.jpg`); 👤 real team/office photos (not stock).

## 13. Video SEO
👤 YouTube channel "Arqora": 60–90 s project walk-throughs (Akkalkot Yatra PWA install, Sukh-Arogyam Petal Scan), "how we work" explainer, EN + DE subtitles. 🔧 Embed on case-study pages with VideoObject schema.

## 14. Mobile UX ✅
Checked at 375 px in both languages: no horizontal overflow, readable headline sizes, hyphenation for long German words, tap targets ≥ 44 px, mobile menu with language switch. 👤 Final check on a real phone (Android + iPhone).

## 15. Performance (Core Web Vitals)
✅ Static pages, self-hosted fonts, optimised images, minimal JavaScript (header, tabs, form only), CSS animations.
📊 Run PageSpeed Insights on the live domain; targets LCP < 2.5 s, INP < 200 ms, CLS < 0.1. Watch the Core Web Vitals report in Search Console.

## 16. Multilingual SEO ✅
English (global) + German (DACH), each with its own URLs, titles, descriptions, FAQs, share images and schema `inLanguage`. 👤 Native German review of all copy. Future: Hindi/Marathi only if targeting Indian SMEs at scale (add `/hi`, `/mr` the same way).

## 17. Local SEO
- **Kiel:** 👤 Google Business Profile only if the KITZ address can legally receive visitors/mail for you (otherwise use a service-area profile); consistent name/address/phone (NAP) everywhere; 🔧 `/de/standorte/kiel` page.
- **India:** 👤 Google Business Profile for the India office/area with WhatsApp number; Indian directories.
- Keep NAP identical: *Adhiyog Systems / Arqora Technology Solutions, KITZ, Schauenburgerstraße 116, 24118 Kiel*.

## 18. Social SEO
👤 LinkedIn company page (primary for B2B; post every project and article) · Instagram (visual work) · YouTube (videos) · X optional. Use the same name, logo, tagline and link everywhere. 🔧 Add `sameAs` links to Organization schema once profiles exist.

## 19. AI SEO (AI Overviews, ChatGPT, Perplexity, Claude, Gemini) ✅
- ✅ `/llms.txt` generated from site data (services, engagement models, work, FAQ, contact)
- ✅ robots.txt explicitly allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and others
- ✅ Question-style FAQs with direct answers + FAQPage schema (easy to quote)
- 🔧 Articles that answer one question in the first two sentences, with facts, prices ranges and comparisons

## 20. Search appearance
✅ FAQ and breadcrumb rich results eligible · branded share cards · clear sitelinks structure.
🔧 Discover needs large images (≥1200 px) + articles; 👤 favicon will appear in Google results after recrawl.

## 21. Security ✅
HTTPS + HSTS preload, X-Frame-Options DENY, nosniff, strict referrer and permissions policies, no cookies, no third-party scripts. 🔧 Content-Security-Policy header. 👤 2-factor login on GitHub, Vercel, domain registrar and email.

## 22. Migration
- `catholicon-website.vercel.app` → 307 redirect to `arqoratech.vercel.app` ✅ (👤 change to permanent 308 in Vercel)
- 👤 When `arqoratech.com` is live: make it the production domain; redirect `arqoratech.vercel.app` → `arqoratech.com` (permanent). Keep all paths identical.
- If the brand changes again: keep URL paths, change only the domain, and use permanent redirects.

## 23. Distribution
Publish once, distribute everywhere: article → LinkedIn post (EN + DE) → carousel → short video → newsletter → WhatsApp Business status. Share every project launch with a case study. Monthly LinkedIn newsletter.

## 24. Conversion
✅ CTA in every section and page footer · contact form with service preselected · WhatsApp, phone and email · engagement models make the next step clear.
🔧 Email delivery for the form (many EU visitors don't use WhatsApp); 👤 booking link for a free 30-minute call (Cal.com/Calendly); 👤 "from" prices or packages; 👤 testimonials near CTAs.

## 25. Analytics
👤 Google Search Console (both languages) · 🔧 cookie-free analytics (Vercel Web Analytics or Plausible) + privacy page update · 📊 track: enquiries per week, WhatsApp clicks, form starts vs sends, top landing pages, rankings for the mapped keywords. Review monthly; update this document quarterly.

---

## Launch checklist (owner)
1. Buy `arqoratech.com`, set as production domain in Vercel
2. Search Console + submit sitemap (EN + DE)
3. Professional email (hello@arqoratech.com)
4. Impressum: owner name and legal form
5. Trademark search "Arqora" (India + EU)
6. LinkedIn page + Google Business Profile
7. "Built by Arqora" links from Akkalkot Yatra and Sukh-Arogyam
8. Vercel Pro (commercial use)
