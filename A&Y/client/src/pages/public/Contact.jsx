import { useState } from 'react';
import api from '../../utils/api';

const Contact = () => {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', countryCode: '+94', countryOfResidence: 'Sri Lanka',
    preferredLanguage: 'English', enquiryType: '', buyerProfile: '', preferredUnit: '',
    preferredFloor: '', budgetRange: '', purchaseTimeline: '', preferredContactMethod: 'Any',
    preferredContactTime: '', message: '', consentGiven: false
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address';
    if (!form.enquiryType) e.enquiryType = 'Please select an enquiry type';
    if (!form.consentGiven) e.consentGiven = 'You must consent to data processing';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setSubmitting(true);
    try {
      await api.post('/leads', form);
      setSubmitted(true);
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  if (submitted) {
    return (
      <main id="main-content">
        <section className="page-hero page-hero--burgundy"><div className="container"><h1 className="page-hero__title">Thank You</h1></div></section>
        <section className="section"><div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: 'var(--space-6)' }}>✓</div>
          <h2>Enquiry Received</h2>
          <p className="text-body-lg text-muted" style={{ margin: 'var(--space-4) 0 var(--space-8)' }}>
            Thank you for your interest in A&Y Residences. Our team will contact you within 24 hours.
          </p>
          <button className="btn btn--primary" onClick={() => { setSubmitted(false); setForm({ fullName: '', email: '', phone: '', countryCode: '+94', countryOfResidence: 'Sri Lanka', preferredLanguage: 'English', enquiryType: '', buyerProfile: '', preferredUnit: '', preferredFloor: '', budgetRange: '', purchaseTimeline: '', preferredContactMethod: 'Any', preferredContactTime: '', message: '', consentGiven: false }); }}>
            Submit Another Enquiry
          </button>
        </div></section>
      </main>
    );
  }

  return (
    <main id="main-content">
      <section className="page-hero page-hero--burgundy"><div className="container">
        <p className="text-overline">Get in Touch</p>
        <h1 className="page-hero__title">Contact & Consultation</h1>
        <p className="page-hero__subtitle">Request a brochure, current pricing, book a site visit, or make an investor enquiry.</p>
      </div></section>

      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="card" style={{ padding: 'var(--space-10)' }}>
            <h2 style={{ marginBottom: 'var(--space-2)' }}>Enquiry Form</h2>
            <p className="text-muted" style={{ marginBottom: 'var(--space-8)' }}>
              All fields marked with * are required. Your information is handled in accordance with our privacy policy.
            </p>

            {serverError && <div className="alert alert--error" style={{ marginBottom: 'var(--space-6)' }}><span>⚠️</span> {serverError}</div>}

            <form onSubmit={handleSubmit} noValidate>
              {/* Name & Email */}
              <div className="grid grid--2">
                <div className="form-group">
                  <label className="form-label form-label--required" htmlFor="fullName">Full Name</label>
                  <input id="fullName" className={`form-input ${errors.fullName ? 'form-input--error' : ''}`} value={form.fullName} onChange={e => handleChange('fullName', e.target.value)} />
                  {errors.fullName && <p className="form-error">{errors.fullName}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label form-label--required" htmlFor="email">Email</label>
                  <input id="email" type="email" className={`form-input ${errors.email ? 'form-input--error' : ''}`} value={form.email} onChange={e => handleChange('email', e.target.value)} />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>
              </div>

              {/* Phone */}
              <div className="grid grid--2">
                <div className="form-group">
                  <label className="form-label" htmlFor="countryCode">Country Code</label>
                  <select id="countryCode" className="form-select" value={form.countryCode} onChange={e => handleChange('countryCode', e.target.value)}>
                    <option value="+94">+94 (Sri Lanka)</option>
                    <option value="+1">+1 (US/Canada)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+61">+61 (Australia)</option>
                    <option value="+971">+971 (UAE)</option>
                    <option value="+65">+65 (Singapore)</option>
                    <option value="+91">+91 (India)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number</label>
                  <input id="phone" type="tel" className="form-input" value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
                </div>
              </div>

              {/* Country & Language */}
              <div className="grid grid--2">
                <div className="form-group">
                  <label className="form-label" htmlFor="country">Country of Residence</label>
                  <input id="country" className="form-input" value={form.countryOfResidence} onChange={e => handleChange('countryOfResidence', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="language">Preferred Language</label>
                  <select id="language" className="form-select" value={form.preferredLanguage} onChange={e => handleChange('preferredLanguage', e.target.value)}>
                    <option value="English">English</option>
                    <option value="Sinhala">Sinhala</option>
                    <option value="Tamil">Tamil</option>
                  </select>
                </div>
              </div>

              {/* Enquiry Type & Buyer Profile */}
              <div className="grid grid--2">
                <div className="form-group">
                  <label className="form-label form-label--required" htmlFor="enquiryType">Enquiry Type</label>
                  <select id="enquiryType" className={`form-select ${errors.enquiryType ? 'form-select--error' : ''}`} value={form.enquiryType} onChange={e => handleChange('enquiryType', e.target.value)}>
                    <option value="">Select...</option>
                    <option value="Brochure Request">Request Brochure</option>
                    <option value="Price & Availability">Price & Availability</option>
                    <option value="Consultation/Site Visit">Book Consultation/Site Visit</option>
                    <option value="Investor Enquiry">Investor Enquiry</option>
                    <option value="Bank/Data Room Access">Bank/Data Room Access</option>
                    <option value="Broker Registration">Broker/Referral Registration</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                  {errors.enquiryType && <p className="form-error">{errors.enquiryType}</p>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="buyerProfile">Buyer Profile</label>
                  <select id="buyerProfile" className="form-select" value={form.buyerProfile} onChange={e => handleChange('buyerProfile', e.target.value)}>
                    <option value="">Select...</option>
                    <option value="Homebuyer/Family">Homebuyer/Family</option>
                    <option value="Overseas Sri Lankan">Overseas Sri Lankan</option>
                    <option value="Investor">Investor</option>
                    <option value="Bank/Lender">Bank/Lender</option>
                    <option value="Broker/Referral Partner">Broker/Referral Partner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Preferences */}
              <div className="grid grid--3">
                <div className="form-group">
                  <label className="form-label" htmlFor="preferredUnit">Preferred Unit Type</label>
                  <select id="preferredUnit" className="form-select" value={form.preferredUnit} onChange={e => handleChange('preferredUnit', e.target.value)}>
                    <option value="">No preference</option>
                    <option value="Larger 3-Bedroom">Larger (1,425 sq. ft.)</option>
                    <option value="Compact 3-Bedroom">Compact (1,273 sq. ft.)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="budgetRange">Budget Range</label>
                  <select id="budgetRange" className="form-select" value={form.budgetRange} onChange={e => handleChange('budgetRange', e.target.value)}>
                    <option value="">Select...</option>
                    <option value="Under LKR 45M">Under LKR 45M</option>
                    <option value="LKR 45M - 50M">LKR 45M - 50M</option>
                    <option value="LKR 50M - 55M">LKR 50M - 55M</option>
                    <option value="Above LKR 55M">Above LKR 55M</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="timeline">Purchase Timeline</label>
                  <select id="timeline" className="form-select" value={form.purchaseTimeline} onChange={e => handleChange('purchaseTimeline', e.target.value)}>
                    <option value="">Select...</option>
                    <option value="Immediately">Immediately</option>
                    <option value="1-3 months">1-3 months</option>
                    <option value="3-6 months">3-6 months</option>
                    <option value="6-12 months">6-12 months</option>
                    <option value="Just exploring">Just exploring</option>
                  </select>
                </div>
              </div>

              {/* Contact preference */}
              <div className="grid grid--2">
                <div className="form-group">
                  <label className="form-label" htmlFor="contactMethod">Preferred Contact Method</label>
                  <select id="contactMethod" className="form-select" value={form.preferredContactMethod} onChange={e => handleChange('preferredContactMethod', e.target.value)}>
                    <option value="Any">Any</option>
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contactTime">Preferred Contact Time</label>
                  <input id="contactTime" className="form-input" placeholder="e.g., Weekday evenings" value={form.preferredContactTime} onChange={e => handleChange('preferredContactTime', e.target.value)} />
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea id="message" className="form-textarea" placeholder="Tell us more about what you're looking for..." value={form.message} onChange={e => handleChange('message', e.target.value)} maxLength={2000}></textarea>
                <p className="form-help">{form.message.length}/2000 characters</p>
              </div>

              {/* Consent */}
              <div className="form-group">
                <label className="form-checkbox">
                  <input type="checkbox" checked={form.consentGiven} onChange={e => handleChange('consentGiven', e.target.checked)} />
                  <span>
                    I consent to A&Y Consolidated processing my personal data for the purpose of this enquiry and agree to the privacy policy. <span className="text-burgundy">*</span>
                  </span>
                </label>
                {errors.consentGiven && <p className="form-error">{errors.consentGiven}</p>}
              </div>

              <button type="submit" className="btn btn--primary btn--lg btn--full" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="grid grid--3" style={{ marginTop: 'var(--space-10)' }}>
            <div className="card text-center">
              <div style={{ fontSize: '32px', marginBottom: 'var(--space-3)' }}>📞</div>
              <h4>Phone</h4>
              <p className="text-muted text-sm">+94 XX XXX XXXX</p>
              <p className="text-caption text-muted">Configure in CMS</p>
            </div>
            <div className="card text-center">
              <div style={{ fontSize: '32px', marginBottom: 'var(--space-3)' }}>💬</div>
              <h4>WhatsApp</h4>
              <p className="text-muted text-sm">+94 XX XXX XXXX</p>
              <p className="text-caption text-muted">Configure in CMS</p>
            </div>
            <div className="card text-center">
              <div style={{ fontSize: '32px', marginBottom: 'var(--space-3)' }}>✉️</div>
              <h4>Email</h4>
              <p className="text-muted text-sm">info@ayconsolidated.lk</p>
              <p className="text-caption text-muted">Configure in CMS</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
