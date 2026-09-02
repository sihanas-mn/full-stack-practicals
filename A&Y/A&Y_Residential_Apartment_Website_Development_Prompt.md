# Detailed Website Development Prompt

## Project instruction

Act as a senior product designer, UX strategist, real-estate conversion specialist, full-stack engineer, SEO specialist, accessibility expert, and QA engineer. Design and develop a premium, responsive, production-ready website for **A&Y Consolidated (PVT) Ltd's proposed residential apartment development in Dehiwala, Sri Lanka**.

Use the supplied **"Proposal Final 1.pdf"** as the primary content source. The website must communicate the project convincingly to homebuyers, overseas Sri Lankans, investors, bank credit teams, brokers, and referral partners while remaining factual, legally careful, fast, accessible, and easy for non-technical staff to update.

Do not produce a generic real-estate template. Create a distinctive, credible digital experience that combines luxury residential presentation with the clarity and discipline of a bankable investment proposal.

## Non-negotiable content rules

1. Preserve all approved project figures exactly. Never silently change, round, merge, or invent a number.
2. Distinguish confirmed facts, proposed concepts, market observations, forecasts, and items awaiting approval.
3. Never describe projected returns, price appreciation, rental yield, IRR, sales, or completion dates as guaranteed.
4. Label financial material as **"Illustrative projections based on proposal assumptions; subject to due diligence, final approvals, contracts, market conditions, tax treatment, and financing terms."**
5. The land is described as a proposed acquisition/location concept. Do not imply that an exact site has been purchased or approved unless the administrator confirms it.
6. Do not place an exact map pin without a verified address or coordinates. Until then, show a clearly labelled **"Preferred Dehiwala search area"** or an area-level map.
7. Do not state that UDA/CMA approval, COC, clear deed, bank finance, or any legal approval has been obtained unless verified. Show approval statuses as configurable values such as Not started, In progress, Submitted, or Approved.
8. The proposal contains figures for different purposes. Present them with the correct context:
   - The base financial model uses a **LKR 67.20 million bank-loan drawdown**.
   - The formal bank request seeks a flexible **LKR 100 million combined facility**, provisionally split into a **LKR 70 million five-year term loan** and **LKR 30 million revolving POD/overdraft facility**.
   - Never combine these into one misleading figure. Explain that the first is the base-case model and the second is the requested maximum combined facility structure.
9. Resolve or visibly flag these source-document differences before public launch:
   - Parking is described as basement parking in the concept profile and ground-floor parking in the forecast. Use **"dedicated parking - final configuration subject to architectural confirmation"** until approved.
   - Unit size is broadly stated as 1,250-1,450 sq. ft., while the detailed mix specifies 1,425 sq. ft. and 1,273 sq. ft. Use the detailed unit sizes for inventory and the broad range only in overview copy.
   - Construction is forecast at 36 months, while the cash-flow model spans four years. Present these as a 36-month construction programme within a four-year financial horizon.
   - Profit before tax/finance is LKR 113.50 million, while estimated profit after financing is approximately LKR 85.91 million. Label both accurately.
   - The proposal uses IRR ranges of 20%-25% and 21%-24%. Use **"approximately 21%-24% project IRR under the detailed model"** and keep the broader source range in supporting documents only, subject to approval.
10. Correct obvious spelling and grammar in public-facing copy without changing meaning or numerical data.
11. Do not publish competitors' or third parties' logos. Where market sources are mentioned, provide a source/date field in the CMS and show it beside the claim.
12. Use licensed, commissioned, or generated imagery. Do not reuse unlicensed photos from the proposal.

## Primary audiences and conversion goals

Design audience-specific journeys:

- **Homebuyers and families:** understand the location, lifestyle, unit layouts, amenities, pricing, payment process, parking, approvals, and completion status; then request a brochure, price list, call, or site consultation.
- **Overseas Sri Lankans:** understand remote-purchase support, project credibility, payment milestones, document access, and consultation options across time zones.
- **Investors:** review rental-demand context, capital-value rationale, unit economics, risks, assumptions, and downloadable investor information; then submit a qualified enquiry.
- **Banks and lenders:** securely review project cost, financing structure, cash flow, repayment capacity, risk mitigation, security offered, and supporting documents.
- **Brokers and referral partners:** request registration and submit a buyer lead without exposing confidential commission terms publicly.

The primary conversion actions are:

1. Request brochure
2. Request current price and availability
3. Book a consultation/site visit
4. Make an investor enquiry
5. Request bank/data-room access
6. Register as a broker or referral partner
7. Call or start a WhatsApp conversation using administrator-configured contact details

## Brand and visual direction

Create a modern **editorial-luxury** identity inspired by the proposal's burgundy, black, gold, ivory, and white palette. Retain the A&Y logo proportions and brand recognition, but modernise the digital presentation.

Suggested design tokens:

- Deep burgundy: `#6F0B18`
- Dark wine: `#2B0B10`
- Charcoal: `#171717`
- Warm gold: `#C5A253`
- Soft ivory: `#F7F2E8`
- Warm grey: `#E8E2D9`
- White: `#FFFFFF`
- Success green, warning amber, and error red must be accessible and used only for statuses.

Use an elegant serif display face for selected headings and a highly readable sans-serif for body text, navigation, tables, and forms. Load fonts efficiently and provide system fallbacks. The visual style should feel architectural, established, trustworthy, and premium - not flashy, over-animated, or like a generic property marketplace.

Use:

- Large architectural photography or approved 3D renders
- Dehiwala coastal/urban imagery
- Refined grid layouts, generous whitespace, crisp rules, and restrained gold details
- Clean data visualisations for financial and market content
- Human imagery showing professionals, families, overseas buyers, and investors
- Subtle motion such as fade/slide reveals, count-up statistics, hover states, and map transitions

Avoid:

- Fake testimonials, fake awards, fake partner logos, fake availability, or invented reviews
- Autoplay audio, aggressive parallax, excessive glassmorphism, gold gradients everywhere, or stock-market-style hype
- Dense PDF-like pages that are difficult to read on mobile
- Claims such as "guaranteed return," "risk free," "best investment," or "approved project" unless independently verified

## Information architecture

Build the following public pages and secure areas:

1. Home
2. Project Overview
3. Residences and Availability
4. Amenities and Lifestyle
5. Dehiwala Location
6. Market Opportunity
7. Investor Overview
8. Development Timeline and Updates
9. About A&Y Consolidated
10. Frequently Asked Questions
11. Contact / Book a Consultation
12. Privacy Policy, Cookie Policy, Terms of Use, and Investment Disclaimer
13. Secure Bank and Investor Data Room
14. Admin CMS and Lead Dashboard

The top navigation should remain compact. Group secondary pages under **Explore**, **Investment**, and **Company** menus. Use a sticky header, visible active states, accessible dropdowns, a mobile drawer, and persistent but non-obstructive enquiry CTA.

## Page-by-page requirements

### 1. Home

Create a high-impact but credible homepage with this order:

1. **Hero:** clearly label the project as a proposed mid-to-upper-middle-income residential apartment development in Dehiwala. Use a concise value proposition around connected urban living, thoughtful space, and Dehiwala convenience. Provide two CTAs: **Explore the Residences** and **Request Information**.
2. **Project snapshot:** 14-perch proposed land requirement; G+5 concept; 10 three-bedroom apartments; two units per residential floor; detailed unit sizes of approximately 1,425 sq. ft. and 1,273 sq. ft.; dedicated parking subject to final architectural confirmation; proposed maximum 36-month construction programme.
3. **Why Dehiwala:** strong connectivity, established social infrastructure, residential demand, rental market, and constrained land supply.
4. **Residence preview:** show both unit types with floor, size, indicative proposal price, status, and enquiry button.
5. **Amenity preview:** gym, rooftop leisure, CCTV, generator backup, intercom, air-conditioning provision, parking, and water-backup status if confirmed.
6. **Market/investment snapshot:** use restrained cards for LKR 472.06M projected sales revenue, LKR 358.55M project cost, LKR 113.50M profit before tax/finance, approximately 24.05% gross margin, and 18.74% base-case loan-to-cost ratio. Mark all figures as projections and link to methodology/assumptions.
7. **Timeline:** five construction phases and a progress status controlled from the CMS.
8. **Developer credibility:** include approved company history, management profiles, completed projects, and the proposal's statements regarding the Kawdana Residence and Hill Street sales record only after supporting evidence is uploaded and approved.
9. **Latest development updates:** CMS-managed progress posts with images, dates, milestones, and document links.
10. **Final CTA:** request brochure, current availability, investor call, or data-room access.

### 2. Project Overview

Explain the development concept with an architectural, buyer-friendly layout:

- Development type: mid-to-upper-middle-income residential apartment complex
- Proposed land requirement: 14 perches, approximately 3,811.50 sq. ft.
- G+5 financial-development concept
- Five residential floors and ten three-bedroom apartments
- Two apartments on each residential floor
- Typical saleable residential floor: approximately 2,698 sq. ft.
- Total saleable/marketable construction area including balconies: approximately 13,487.38 sq. ft.
- Larger unit: approximately 1,425 sq. ft.
- Compact unit: approximately 1,273 sq. ft.
- Proposed nearby areas/roads: Marine Drive, Kawdana Road, Hill Street, Galle Road, Kalubowila Road, and Allen Avenue
- Proximity to a mosque is identified in the proposal as a potential community-specific USP; communicate this respectfully and only when the exact site is confirmed.

Include sections for design philosophy, floor-stack visualisation, proposed specifications, sustainability/efficiency features, approvals tracker, construction team, and downloadable fact sheet. Use placeholders labelled **To be confirmed** for architect, contractor, structural engineer, MEP consultant, material schedule, sustainability certification, exact address, and legal/approval information.

### 3. Residences and Availability

Create an inventory experience, not just static cards.

Display ten units: one 1,425 sq. ft. unit and one 1,273 sq. ft. unit on each of Floors 1-5. Use these proposal base prices:

| Unit type | Approx. size | Base proposal price per unit |
| --- | ---: | ---: |
| Larger 3-bedroom | 1,425 sq. ft. | LKR 49,875,000 |
| Compact 3-bedroom | 1,273 sq. ft. | LKR 44,555,000 |

For each unit, support fields for unit ID, floor, orientation, views, bedrooms, bathrooms, balconies, parking allocation, gross area, saleable area, price, premium/discount, availability status, floor plan, reservation status, and last-updated date.

Allowed inventory statuses: Coming soon, Available, On hold, Reserved, Sold, and Unavailable. Never hard-code false availability. Higher-floor premiums must be entered by an administrator; do not assume the proposal's general 10%-25% market observation applies automatically to this project.

Provide filters by floor, size, price, view, and availability. Include a comparison drawer for up to three units, a printable/shareable unit sheet, enquiry CTA, and optional mortgage/payment calculator where the user enters the interest rate and tenure. Clearly mark all prices as indicative and subject to confirmation.

### 4. Amenities and Lifestyle

Present proposed amenities with individual status badges:

- Gym
- Rooftop leisure area
- CCTV/security system
- Generator backup
- Intercom
- Air-conditioning provision
- Dedicated parking
- Water-backup system, if approved
- Smart parking or smart-home features, if adopted
- Co-working, rooftop garden, children's area, or energy-efficient features only if approved later

Each amenity must be CMS-managed as Proposed, Confirmed, Under construction, or Complete. Do not show an unconfirmed amenity as delivered.

### 5. Dehiwala Location

Build a story-led location page using an area-level interactive map until the exact site is confirmed.

Highlight access through Galle Road, Marine Drive, Southern Expressway links, Baseline Road, the Colombo-Matara coastal railway, multiple bus routes, and the proposed government Marine Drive extension from Dehiwala toward Panadura. Highlight proximity to Wellawatte, Bambalapitiya, Colombo 05, Mount Lavinia, Ratmalana, Moratuwa, Nugegoda, and Battaramulla.

Organise nearby amenities into education, healthcare, shopping, banking, dining, transport, and leisure. Mention Kalubowila Teaching Hospital, the National Zoological Gardens, Mount Lavinia Beach, and the Marine Drive commercial corridor where relevant. Do not invent travel times. Add travel times only through verified mapping data or administrator input, and show the measurement date.

If displaying the proposal's area statistics - approximately 245,000 municipal residents, 20 schools, five major hospitals, 40 banks, 60 restaurants, and 10 fuel stations - require a source and last-verified date in the CMS before publishing.

### 6. Market Opportunity

Translate the proposal's market analysis into short, readable sections with charts and source notes:

- Movement of apartment development from central Colombo to established suburbs
- Higher Colombo land cost versus more moderate suburban land cost
- Affordability and broader buyer demand in Dehiwala
- Buyer preference for larger homes, balconies, quieter areas, parking, amenities, and better family environments
- Transport and infrastructure improvements
- Dehiwala's established social infrastructure and constrained land availability
- Demand from owner-occupiers, professionals, families, expatriates, students, medical professionals, and investors
- Stronger emphasis after the economic crisis on developer integrity, construction quality, legal clarity, approvals, parking, backup systems, and value

Market figures from the proposal must show their source period and a disclaimer. Examples include approximately 15.66% annual apartment price appreciation, LKR 109.0M average city price for a 3-bedroom unit, 6%-7% premium-apartment rental yield observations, Dehiwala apartment price ranges, and LKR-per-square-foot comparisons. These values can become stale; manage them as dated CMS records and never present them as live data without verification.

### 7. Investor Overview

Create a public summary and a gated detailed section.

Public summary:

- Total project cost: LKR 358,553,812.50
- Projected total sales revenue: LKR 472,058,125.00
- Projected profit before tax/finance: LKR 113,504,312.50
- Gross profit margin: approximately 24.05%
- Estimated profit after financing: approximately LKR 85.91M
- Estimated net profit margin after financing: approximately 18.20%
- ROI before finance: approximately 31.66%
- ROI after financing: approximately 23.96%
- Detailed-model project IRR: approximately 21%-24%
- Indicative equity IRR: approximately 35%-45%
- Break-even saleable area: approximately 10,244 sq. ft.
- Total saleable area: approximately 13,487 sq. ft.
- Margin of safety: approximately 3,243 sq. ft., or 24%

Show assumptions beside results:

- Proposed land acquisition: LKR 84.00M
- Direct construction cost: LKR 245,553,812.50
- Equipment installation: LKR 7.00M
- Contingency: LKR 7.00M
- Overheads: LKR 10.00M
- Marketing and promotion: LKR 5.00M
- Total indirect construction cost: LKR 29.00M
- Total construction cost, direct and indirect: LKR 274,553,812.50
- Conservative assumed selling rate: LKR 35,000 per sq. ft.
- Conservative assumed land cost: LKR 6.00M per perch
- Financing-cost assumption in the detailed model: LKR 67M facility, 13.50% interest/rental rate, five-year tenure, one-year grace period

Use accessible charts for cost composition, funding mix, sales collection, annual cash flow, closing liquidity, and debt repayment. Always provide the same data in a table and make charts readable without colour alone.

### 8. Development Timeline and Updates

Use the proposal's 36-month construction programme:

| Phase | Duration | Cost allocation | Approx. cost |
| --- | ---: | ---: | ---: |
| Mobilisation and site preparation | 2 months | 3% | LKR 8,236,614.38 |
| Foundation and substructure | 6 months | 15% | LKR 41,183,071.88 |
| Superstructure | 12 months | 32% | LKR 87,857,220.00 |
| Architectural finishes, MEP, and external works | 13 months | 45% | LKR 123,549,215.63 |
| Testing, commissioning, and handover | 3 months | 5% | LKR 13,727,690.63 |

Show planned dates, actual dates, progress percentage, milestone status, latest evidence, and reason for delay. Do not display a fake progress percentage. Add a chronological update feed, image gallery, and optional subscriber update emails.

### 9. Bank Finance and Secure Data Room

Keep detailed bank-facility and security information behind authenticated, role-based access. The public site may state only that financing discussions are proposed, subject to bank approval.

Inside the bank portal, clearly present:

- Requested combined limit: LKR 100M
- Proposed term loan: LKR 70M for five years, including a one-year principal grace period, mainly for land acquisition and eligible capital expenditure
- Proposed revolving POD/overdraft: LKR 30M for working capital, construction expenses, contractor/supplier advances, and temporary timing gaps in customer collections
- Reallocation between the two sub-limits may be requested subject to bank approval, while aggregate outstanding must never exceed LKR 100M
- Base-case financial-model drawdown: LKR 67.20M
- Base-case loan-to-cost: approximately 18.74%
- Loan-to-sales: approximately 14.19%
- Revenue coverage: approximately 7.02 times
- Debt-to-equity: approximately 1.68:1 based on LKR 67.20M debt and LKR 40.00M equity
- Proposed sources of project funding in the base model: shareholder equity LKR 40.00M, bank facility approximately LKR 67.00-67.20M, and customer advances/progressive collections funding the balance
- Proposed security: mortgage over other borrower-owned land/building, simple lodgement relating to the proposed purchase property, and an escrow collection account with the financing bank - all subject to legal and bank confirmation

Data-room features:

- Invite-only access, email verification, optional MFA, expiring invitations, and role-based permissions
- Watermarked preview/downloads, download-disable option, document versioning, expiry dates, and access audit log
- Folders for corporate documents, land/title, approvals, plans, bills of quantity, contracts, valuations, insurance, financial model, bank documents, construction reports, and sales evidence
- NDA/terms acceptance before access
- Administrator approval and revocation
- Never expose private data-room URLs in public search or site maps

### 10. Risk and governance

Create an investor/bank risk matrix with likelihood, impact, owner, mitigation, residual risk, status, and last review date. Include the proposal's categories:

- Market, cost escalation, construction, completion delay, regulatory, interest-rate, liquidity, foreign-exchange, developer, contractor, supplier, legal, environmental, natural-disaster, competition, quality, customer-credit, sales-collection, reputation, operational, health-and-safety, force-majeure, economic, political/policy, and exit risks.

Summarise mitigations such as conservative pricing assumptions, contingency reserves, fixed-price/protected contracts where practical, early approvals, experienced consultants and contractors, quality inspections, staged collections, customer eligibility checks, insurance, safety controls, supplier diversification, legal due diligence, drainage/environmental assessment, transparent communications, and monthly cash-flow monitoring. Do not mark any mitigation as implemented without evidence.

### 11. About A&Y Consolidated

Create a corporate page with company overview, registration details, leadership, experience, values, governance, past projects, partners, and contact information. Use only administrator-approved facts. Add a credibility timeline and project case studies. The proposal's statements that Kawdana Residence achieved full booking within one month and Hill Street was fully booked before official launch require supporting evidence before publication.

### 12. FAQ and contact

FAQ topics should cover project status, exact location, apartment sizes, indicative pricing, reservation process, payment milestones, parking, amenities, approvals, title/deed, completion estimate, foreign/overseas purchasing, bank finance, rental management, maintenance, document access, and refund/cancellation rules. Any legal or financial answer must be editable and approved before publication.

Contact form fields:

- Full name
- Email
- Phone and country code
- Country of residence
- Preferred language
- Enquiry type
- Buyer profile
- Preferred unit/floor
- Budget range
- Purchase timeline
- Preferred contact method/time
- Message
- Consent checkbox

Include inline validation, clear success/error states, spam protection, rate limiting, duplicate detection, server-side validation, notification emails, and CRM-ready lead storage. Never expose private lead data in client-side code.

## Sales and payment presentation

Explain the proposal's sales model without treating it as a binding offer:

- Total inventory: ten apartments
- Forecast booking mix: 50% in Year 1, 30% in Year 2, and 20% in Year 3
- Common market practice described in the proposal: 30%-50% initial down payment, with the balance paid progressively
- Conservative model assumption: 25% initial customer payment with progressive collections linked to construction
- All payment terms must be administrator-configurable and marked **Subject to the final sale and purchase agreement**

If a reservation workflow is added, make it an enquiry/hold request only unless a secure, legally approved payment gateway and reservation agreement are separately implemented. Do not accept money through a fake checkout.

## CMS and data model

Build an authenticated admin console with Admin, Editor, Sales, Finance, and Data-room Viewer roles. Use role-based permissions and log sensitive changes.

Core entities:

- Project
- Project fact/claim with source, date, status, and approval state
- Unit type
- Unit inventory
- Floor plan
- Amenity
- Location/point of interest
- Approval/legal milestone
- Construction phase
- Progress update
- Financial assumption
- Financial metric
- Annual cash flow
- Funding source
- Risk and mitigation
- Document and document version
- Data-room invitation/access log
- Lead
- Appointment/site visit
- Broker/referral application
- Team member
- FAQ
- Testimonial/case study with approval proof
- Media asset with licence/alt text
- SEO metadata
- Site setting and contact channel

CMS requirements:

- Draft, review, approved, published, and archived states
- Preview before publishing
- Scheduled publishing
- Version history and rollback
- Required source/reference for market and financial claims
- Required last-verified date for time-sensitive content
- CSV export for leads and inventory
- Filterable lead dashboard, lead status, owner, notes, follow-up date, and audit log
- No destructive deletion of finance or lead records; use archival/soft deletion

## Preferred technical implementation

Use a maintainable production architecture. Preferred stack:

- Latest stable Next.js with App Router
- React and TypeScript in strict mode
- Tailwind CSS with reusable design tokens and accessible component primitives
- PostgreSQL with a typed ORM
- Secure authentication and role-based authorisation
- Object storage for media and gated documents
- Transactional email service for enquiries and access invitations
- Schema-based server validation
- Server-rendered metadata and structured data
- Automated tests and CI checks

If the environment uses another framework, preserve the same security, accessibility, performance, data-model, and CMS behaviour. Keep business figures in structured data/configuration rather than duplicated inside components.

Engineering requirements:

- Component-based architecture and clear separation of UI, domain logic, data access, and validation
- Reusable currency, percentage, date, status, and source-note components
- Sri Lankan rupee formatting with full accessible values and sensible display abbreviations
- No hard-coded secrets; provide `.env.example`
- Database migrations and seed data drawn from the proposal
- Secure HTTP-only session cookies, CSRF protection where applicable, input sanitisation, parameterised database access, least-privilege storage rules, secure headers, and file-upload validation
- Validate MIME type, extension, file size, and permissions for uploads; scan documents where infrastructure supports it
- Rate-limit public forms and authentication endpoints
- Log security-relevant and financial-content changes without logging secrets or sensitive document contents
- Responsive image optimisation, lazy loading below the fold, and no layout shift
- Graceful empty/loading/error states and custom 404/500 pages

## Responsive and accessibility requirements

Meet WCAG 2.2 AA across 320 px mobile screens through large desktop displays.

- Semantic landmarks and heading hierarchy
- Full keyboard navigation
- Visible focus states
- Accessible menu/dialog/table patterns
- Skip link
- Sufficient colour contrast
- Descriptive alternative text
- Labels, instructions, and error summaries for forms
- Captions/transcripts for video
- Reduced-motion support
- Charts with text summaries and data tables
- Do not rely on colour alone for unit, approval, risk, or progress statuses
- Tables must become usable card/scroll patterns on small screens without hiding data

## SEO, analytics, and compliance

- Create unique page titles, meta descriptions, canonical URLs, Open Graph/Twitter metadata, XML sitemap, robots rules, and breadcrumb navigation.
- Add valid schema markup where appropriate: Organization, RealEstateListing/Residence, ApartmentComplex where supported, FAQPage, BreadcrumbList, and Article for progress updates. Never mark proposed units as available if availability is not confirmed.
- Target natural search themes such as Dehiwala apartments, three-bedroom apartments in Dehiwala, apartments near Colombo, and Sri Lanka property for overseas buyers without keyword stuffing.
- Optimise Core Web Vitals and aim for Lighthouse scores of 90+ for performance, accessibility, SEO, and best practices on representative pages.
- Use privacy-conscious analytics and record conversions for brochure requests, availability enquiries, consultations, investor enquiries, WhatsApp clicks, phone clicks, and approved document-access requests.
- Load non-essential analytics only after the relevant consent.
- Include privacy, cookie, terms, and investment-risk notices drafted for Sri Lankan legal review.
- Do not expose lead, investor, bank, corporate, or document-access data in analytics.

## Content tone

Use polished international English: calm, transparent, specific, and confident. Write for informed buyers and credit professionals. Avoid exaggerated luxury clichés and speculative language. Use short paragraphs, meaningful headings, and scannable facts.

Suggested positioning direction:

**"Connected Dehiwala living, designed around space, value, and everyday convenience."**

Treat this as a working direction, not a final slogan. Make all marketing copy editable in the CMS.

## Required deliverables

Produce a complete implementation, not only a visual mock-up:

1. Responsive public website
2. Secure bank/investor data room
3. Admin CMS and lead dashboard
4. Database schema and migrations
5. Proposal-derived seed data
6. Reusable design system and component library
7. Functional forms and notifications
8. SEO and structured-data implementation
9. Privacy/terms/disclaimer placeholder pages for legal review
10. Unit, financial, timeline, risk, and document-management interfaces
11. Automated unit, integration, accessibility, and key end-to-end tests
12. Setup, environment, deployment, backup, restore, and administrator documentation

## Acceptance criteria

The project is complete only when:

- All public pages work at mobile, tablet, and desktop sizes.
- All figures match the approved source data and show appropriate context/disclaimers.
- No exact land location, approval, amenity, availability, testimonial, return, or completion claim is fabricated.
- The 67.20M base financial-model loan and 100M requested combined bank facility are clearly distinguished.
- Unit inventory is editable and never displays false real-time availability.
- Every public form validates on both client and server, stores the lead securely, and shows a reliable submission result.
- Admin roles prevent unauthorised users from viewing or editing leads, financial information, or documents.
- Gated documents cannot be indexed or reached through predictable public URLs.
- Financial charts exactly reconcile with the displayed tables.
- Keyboard-only and screen-reader use is supported.
- Reduced motion works.
- No horizontal overflow exists at 320 px.
- Core pages meet the agreed performance targets.
- There are no broken links, missing images, console errors, placeholder lorem ipsum, fake contact details, or exposed secrets.
- The codebase passes type checking, linting, automated tests, production build, and security checks.

## Execution order

1. Extract and structure the proposal facts into a single source-of-truth data file/database seed.
2. Produce a sitemap, content model, user journeys, and list of unresolved facts requiring client confirmation.
3. Create the design tokens and responsive page system.
4. Build the public pages and reusable components.
5. Build inventory, CMS, lead management, and gated data-room functionality.
6. Add SEO, analytics consent, security controls, and legal placeholders.
7. Seed the approved proposal data.
8. Test every route, role, form, table, chart, responsive breakpoint, and document permission.
9. Provide a launch checklist that separates **Required before public launch** from **Can be completed after launch**.

Do not stop implementation because contact details, exact address, professional-team names, final parking configuration, final approvals, or final brand assets are missing. Use clearly labelled placeholders, centralise them in the CMS, and include them in the launch-blocker checklist. Do not invent replacements.
