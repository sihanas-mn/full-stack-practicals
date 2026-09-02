const Legal = ({ type }) => {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      body: `This privacy policy explains how A&Y Consolidated (PVT) Ltd ("we", "us", "our") collects, uses, and protects your personal information when you use this website or submit enquiries.

We collect information you provide through our contact forms, including your name, email, phone number, country of residence, and enquiry details. This information is used solely for the purpose of responding to your enquiry and managing our relationship with you.

We do not sell, trade, or transfer your personal information to third parties without your consent, except as required by law or to trusted service providers who assist us in operating our website and conducting our business.

Your data is stored securely and access is restricted to authorised personnel only. We implement appropriate technical and organisational measures to protect your information.

You have the right to request access to, correction of, or deletion of your personal data by contacting us at the details provided on our contact page.

This policy is subject to amendment and should be reviewed by qualified legal counsel before publication. This is a placeholder for legal review.`
    },
    terms: {
      title: 'Terms of Use',
      body: `By accessing and using this website, you accept and agree to be bound by these terms and conditions.

All content on this website, including text, images, data, and design elements, is the property of A&Y Consolidated (PVT) Ltd and is protected by applicable intellectual property laws.

The information provided on this website is for general informational purposes only. While we strive to keep the information accurate and up to date, we make no representations or warranties of any kind about the completeness, accuracy, or reliability of the information.

All financial projections, market observations, and investment-related content are illustrative and subject to the disclaimers stated alongside such content. Nothing on this website constitutes financial, investment, or legal advice.

Unit availability, pricing, specifications, and amenities displayed on this website are indicative and subject to change without notice. Please contact our sales team for the most current information.

This website may contain links to third-party websites. We have no control over the content of those sites and accept no responsibility for them.

These terms are subject to amendment and should be reviewed by qualified legal counsel before publication. This is a placeholder for legal review.`
    },
    disclaimer: {
      title: 'Investment Disclaimer',
      body: `IMPORTANT: This notice must be read in conjunction with all financial and investment-related content on this website.

All financial projections, return estimates, market observations, and investment metrics presented on this website are illustrative projections based on proposal assumptions. They are subject to due diligence, final approvals, contracts, market conditions, tax treatment, and financing terms.

No projection, estimate, or return figure should be interpreted as guaranteed. Past performance of property markets or comparable developments does not guarantee future results.

The information presented does not constitute an offer to sell, a solicitation of an offer to buy, or a recommendation for any investment. Prospective investors should conduct their own independent due diligence and seek professional financial, legal, and tax advice before making any investment decision.

Key risk factors include, but are not limited to: market risk, cost escalation, construction delays, regulatory changes, interest rate fluctuations, liquidity risk, and economic conditions.

A&Y Consolidated (PVT) Ltd does not accept liability for any loss or damage arising from reliance on the information provided on this website.

This disclaimer is subject to amendment and should be reviewed by qualified legal counsel in Sri Lanka before publication. This is a placeholder for legal review.`
    }
  };

  const page = content[type] || content.privacy;

  return (
    <main id="main-content">
      <section className="page-hero page-hero--burgundy"><div className="container">
        <h1 className="page-hero__title">{page.title}</h1>
      </div></section>
      <section className="section">
        <div className="container" style={{ maxWidth: '700px' }}>
          <div className="alert alert--warning" style={{ marginBottom: 'var(--space-8)' }}>
            <span>⚠️</span><div><strong>Draft for Legal Review:</strong> This document is a placeholder and must be reviewed and approved by qualified legal counsel before publication.</div>
          </div>
          {page.body.split('\n\n').map((para, i) => (
            <p key={i} className="text-body" style={{ marginBottom: 'var(--space-4)', lineHeight: 'var(--leading-relaxed)' }}>{para}</p>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Legal;
