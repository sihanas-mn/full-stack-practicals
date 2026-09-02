import { useState, useEffect } from 'react';
import api from '../../utils/api';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => { api.get('/faq').then(res => setFaqs(res.data)); }, []);

  const categories = ['All', ...new Set(faqs.map(f => f.category))];
  const filtered = activeCategory === 'All' ? faqs : faqs.filter(f => f.category === activeCategory);

  return (
    <main id="main-content">
      <section className="page-hero page-hero--burgundy"><div className="container">
        <p className="text-overline">Support</p>
        <h1 className="page-hero__title">Frequently Asked Questions</h1>
        <p className="page-hero__subtitle">Find answers about the project, pricing, payment, approvals, overseas purchasing, and more.</p>
      </div></section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          {/* Category filter */}
          <div className="flex flex-wrap gap-2" style={{ marginBottom: 'var(--space-8)' }}>
            {categories.map(cat => (
              <button key={cat} className={`btn btn--sm ${activeCategory === cat ? 'btn--primary' : 'btn--secondary'}`}
                onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div role="list">
            {filtered.map((faq, i) => (
              <div key={faq._id} className="accordion-item" role="listitem">
                <button className="accordion-trigger" onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i} aria-controls={`faq-${i}`}>
                  <span>{faq.question}</span>
                  <span className="accordion-trigger__icon">{openIndex === i ? '−' : '+'}</span>
                </button>
                {openIndex === i && (
                  <div className="accordion-content" id={`faq-${i}`} role="region">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && <p className="text-center text-muted" style={{ padding: 'var(--space-8)' }}>No FAQs found for this category.</p>}
        </div>
      </section>
    </main>
  );
};

export default FAQ;
