const DISCLAIMER = 'Illustrative projections based on proposal assumptions; subject to due diligence, final approvals, contracts, market conditions, tax treatment, and financing terms.';

export const units = [];
for (let floor = 1; floor <= 5; floor++) {
  units.push({
    unitId: `AY-${floor}A`,
    unitType: 'Larger 3-Bedroom',
    floor,
    orientation: 'To be confirmed',
    views: 'To be confirmed',
    bedrooms: 3,
    bathrooms: 2,
    balconies: 1,
    parkingAllocation: 'Dedicated parking — final configuration subject to architectural confirmation',
    grossArea: 1425,
    saleableArea: 1425,
    basePrice: 49875000,
    premiumDiscount: 0,
    finalPrice: 49875000,
    status: 'Coming soon'
  });
  units.push({
    unitId: `AY-${floor}B`,
    unitType: 'Compact 3-Bedroom',
    floor,
    orientation: 'To be confirmed',
    views: 'To be confirmed',
    bedrooms: 3,
    bathrooms: 2,
    balconies: 1,
    parkingAllocation: 'Dedicated parking — final configuration subject to architectural confirmation',
    grossArea: 1273,
    saleableArea: 1273,
    basePrice: 44555000,
    premiumDiscount: 0,
    finalPrice: 44555000,
    status: 'Coming soon'
  });
}

export const amenities = [
  { name: 'Gymnasium', description: 'Fully equipped fitness centre for residents', icon: 'gym', status: 'Proposed', category: 'Fitness', sortOrder: 1 },
  { name: 'Rooftop Leisure Area', description: 'Premium rooftop space for relaxation and social gatherings', icon: 'rooftop', status: 'Proposed', category: 'Leisure', sortOrder: 2 },
  { name: 'CCTV & Security System', description: '24/7 surveillance and security monitoring', icon: 'security', status: 'Proposed', category: 'Security', sortOrder: 3 },
  { name: 'Generator Backup', description: 'Uninterrupted power supply during outages', icon: 'generator', status: 'Proposed', category: 'Utilities', sortOrder: 4 },
  { name: 'Intercom System', description: 'Building-wide intercom communication', icon: 'intercom', status: 'Proposed', category: 'Security', sortOrder: 5 },
  { name: 'Air-Conditioning Provision', description: 'Pre-installed air-conditioning infrastructure in all units', icon: 'ac', status: 'Proposed', category: 'Utilities', sortOrder: 6 },
  { name: 'Dedicated Parking', description: 'Dedicated parking — final configuration subject to architectural confirmation', icon: 'parking', status: 'Proposed', category: 'Parking', sortOrder: 7 },
  { name: 'Water-Backup System', description: 'Backup water supply system, subject to approval', icon: 'water', status: 'Proposed', category: 'Utilities', sortOrder: 8 },
];

export const constructionPhases = [
  { name: 'Mobilisation & Site Preparation', phaseNumber: 1, durationMonths: 2, costAllocationPercent: 3, approximateCost: 8236614.38, status: 'Not started' },
  { name: 'Foundation & Substructure', phaseNumber: 2, durationMonths: 6, costAllocationPercent: 15, approximateCost: 41183071.88, status: 'Not started' },
  { name: 'Superstructure', phaseNumber: 3, durationMonths: 12, costAllocationPercent: 32, approximateCost: 87857220.00, status: 'Not started' },
  { name: 'Architectural Finishes, MEP & External Works', phaseNumber: 4, durationMonths: 13, costAllocationPercent: 45, approximateCost: 123549215.63, status: 'Not started' },
  { name: 'Testing, Commissioning & Handover', phaseNumber: 5, durationMonths: 3, costAllocationPercent: 5, approximateCost: 13727690.63, status: 'Not started' },
];

export const financialMetrics = [
  { category: 'Revenue', label: 'Projected Total Sales Revenue', value: 472058125.00, unit: 'LKR', sortOrder: 1, description: 'Total projected sales from 10 apartment units' },
  { category: 'Cost', label: 'Total Project Cost', value: 358553812.50, unit: 'LKR', sortOrder: 2, description: 'All-inclusive project cost covering land, construction, equipment, and overheads' },
  { category: 'Cost', label: 'Proposed Land Acquisition', value: 84000000, unit: 'LKR', sortOrder: 3, description: '14 perches at approximately LKR 6.00M per perch' },
  { category: 'Cost', label: 'Direct Construction Cost', value: 245553812.50, unit: 'LKR', sortOrder: 4 },
  { category: 'Cost', label: 'Equipment & Installation', value: 7000000, unit: 'LKR', sortOrder: 5 },
  { category: 'Cost', label: 'Contingency', value: 7000000, unit: 'LKR', sortOrder: 6 },
  { category: 'Cost', label: 'Overheads', value: 10000000, unit: 'LKR', sortOrder: 7 },
  { category: 'Cost', label: 'Marketing & Promotion', value: 5000000, unit: 'LKR', sortOrder: 8 },
  { category: 'Cost', label: 'Total Indirect Construction Cost', value: 29000000, unit: 'LKR', sortOrder: 9 },
  { category: 'Cost', label: 'Total Construction Cost (Direct + Indirect)', value: 274553812.50, unit: 'LKR', sortOrder: 10 },
  { category: 'Profit', label: 'Projected Profit Before Tax/Finance', value: 113504312.50, unit: 'LKR', sortOrder: 11, description: 'Revenue minus total project cost' },
  { category: 'Profit', label: 'Estimated Profit After Financing', value: 85910000, unit: 'LKR', sortOrder: 12, description: 'Approximately LKR 85.91M after financing costs' },
  { category: 'Margin', label: 'Gross Profit Margin', value: 24.05, unit: 'Percent', sortOrder: 13 },
  { category: 'Margin', label: 'Net Profit Margin After Financing', value: 18.20, unit: 'Percent', sortOrder: 14 },
  { category: 'Return', label: 'ROI Before Finance', value: 31.66, unit: 'Percent', sortOrder: 15 },
  { category: 'Return', label: 'ROI After Financing', value: 23.96, unit: 'Percent', sortOrder: 16 },
  { category: 'Return', label: 'Project IRR (Detailed Model)', value: '21% – 24%', unit: 'Text', sortOrder: 17, description: 'Approximately 21%-24% project IRR under the detailed model' },
  { category: 'Return', label: 'Indicative Equity IRR', value: '35% – 45%', unit: 'Text', sortOrder: 18 },
  { category: 'BreakEven', label: 'Break-Even Saleable Area', value: 10244, unit: 'SqFt', sortOrder: 19 },
  { category: 'BreakEven', label: 'Total Saleable Area', value: 13487, unit: 'SqFt', sortOrder: 20 },
  { category: 'BreakEven', label: 'Margin of Safety', value: '3,243 sq. ft. (approximately 24%)', unit: 'Text', sortOrder: 21 },
  { category: 'Financing', label: 'Base-Case Model Loan Drawdown', value: 67200000, unit: 'LKR', sortOrder: 22, description: 'Base-case financial model uses a LKR 67.20M bank-loan drawdown' },
  { category: 'Financing', label: 'Requested Combined Bank Facility', value: 100000000, unit: 'LKR', sortOrder: 23, description: 'Formal bank request seeks LKR 100M combined facility: LKR 70M five-year term loan + LKR 30M revolving POD/overdraft' },
  { category: 'Financing', label: 'Base-Case Loan-to-Cost Ratio', value: 18.74, unit: 'Percent', sortOrder: 24 },
  { category: 'Financing', label: 'Loan-to-Sales Ratio', value: 14.19, unit: 'Percent', sortOrder: 25 },
  { category: 'Financing', label: 'Revenue Coverage', value: '7.02x', unit: 'Text', sortOrder: 26 },
  { category: 'Financing', label: 'Debt-to-Equity Ratio', value: '1.68:1', unit: 'Text', sortOrder: 27, description: 'Based on LKR 67.20M debt and LKR 40.00M equity' },
  { category: 'Assumption', label: 'Conservative Selling Rate', value: 35000, unit: 'LKR', sortOrder: 28, description: 'LKR 35,000 per sq. ft.' },
  { category: 'Assumption', label: 'Conservative Land Cost', value: 6000000, unit: 'LKR', sortOrder: 29, description: 'LKR 6.00M per perch' },
  { category: 'Assumption', label: 'Financing Rate (Interest/Rental)', value: 13.50, unit: 'Percent', sortOrder: 30 },
  { category: 'Assumption', label: 'Financing Tenure', value: 5, unit: 'Years', sortOrder: 31 },
  { category: 'Assumption', label: 'Grace Period', value: 1, unit: 'Years', sortOrder: 32 },
  { category: 'Assumption', label: 'Shareholder Equity', value: 40000000, unit: 'LKR', sortOrder: 33 },
];

financialMetrics.forEach(m => {
  m.disclaimer = DISCLAIMER;
  m.source = 'A&Y Consolidated Proposal';
  m.isPublic = !['Financing'].includes(m.category) || m.sortOrder <= 24;
});

export const risks = [
  { category: 'Market Risk', description: 'Changes in property market conditions, demand shifts, or price corrections in the Dehiwala area', likelihood: 'Medium', impact: 'High', mitigation: 'Conservative pricing assumptions below market averages; diversified buyer targeting across homebuyers, investors, and overseas buyers', residualRisk: 'Medium', sortOrder: 1 },
  { category: 'Cost Escalation', description: 'Construction material or labour costs exceeding budgeted amounts', likelihood: 'Medium', impact: 'High', mitigation: 'Contingency reserve of LKR 7.00M; fixed-price/protected contracts where practical; supplier diversification', residualRisk: 'Medium', sortOrder: 2 },
  { category: 'Construction Risk', description: 'Quality issues, structural defects, or workmanship below standard', likelihood: 'Low', impact: 'High', mitigation: 'Experienced consultants and contractors; quality inspections; staged progress monitoring', residualRisk: 'Low', sortOrder: 3 },
  { category: 'Completion Delay', description: 'Project not completed within the 36-month construction programme', likelihood: 'Medium', impact: 'High', mitigation: 'Detailed programme management; early approvals; contractor performance monitoring; contingency planning', residualRisk: 'Medium', sortOrder: 4 },
  { category: 'Regulatory Risk', description: 'Failure to obtain UDA, CMA, or other required approvals', likelihood: 'Low', impact: 'Critical', mitigation: 'Early engagement with regulatory authorities; experienced legal and compliance team', residualRisk: 'Low', sortOrder: 5 },
  { category: 'Interest-Rate Risk', description: 'Increase in financing costs above the assumed 13.50% rate', likelihood: 'Medium', impact: 'Medium', mitigation: 'Conservative interest-rate assumptions; base-case loan-to-cost ratio of only 18.74%', residualRisk: 'Low', sortOrder: 6 },
  { category: 'Liquidity Risk', description: 'Insufficient cash flow to meet obligations during construction', likelihood: 'Low', impact: 'High', mitigation: 'Monthly cash-flow monitoring; revolving POD/overdraft facility of LKR 30M; staged customer collections', residualRisk: 'Low', sortOrder: 7 },
  { category: 'Foreign-Exchange Risk', description: 'Currency fluctuations affecting overseas buyer transactions', likelihood: 'Low', impact: 'Medium', mitigation: 'Pricing in LKR; transparent conversion policies', residualRisk: 'Low', sortOrder: 8 },
  { category: 'Developer Risk', description: 'Key-person dependency or changes in company management', likelihood: 'Low', impact: 'Medium', mitigation: 'Documented processes; governance framework; experienced management team', residualRisk: 'Low', sortOrder: 9 },
  { category: 'Contractor Risk', description: 'Contractor default, abandonment, or performance failure', likelihood: 'Low', impact: 'High', mitigation: 'Due diligence on contractor selection; performance guarantees; staged payments linked to progress', residualRisk: 'Low', sortOrder: 10 },
  { category: 'Supplier Risk', description: 'Supply chain disruption or material shortage', likelihood: 'Medium', impact: 'Medium', mitigation: 'Supplier diversification; early procurement of critical materials; contingency reserves', residualRisk: 'Low', sortOrder: 11 },
  { category: 'Legal Risk', description: 'Title disputes, boundary issues, or contract enforcement challenges', likelihood: 'Low', impact: 'Critical', mitigation: 'Comprehensive legal due diligence; clear deed verification; professional legal counsel', residualRisk: 'Low', sortOrder: 12 },
  { category: 'Environmental Risk', description: 'Environmental issues, drainage problems, or soil conditions', likelihood: 'Low', impact: 'Medium', mitigation: 'Environmental and drainage assessment before acquisition; soil testing', residualRisk: 'Low', sortOrder: 13 },
  { category: 'Natural-Disaster Risk', description: 'Flood, earthquake, or severe weather events', likelihood: 'Low', impact: 'High', mitigation: 'Comprehensive insurance coverage; structural engineering to local building codes', residualRisk: 'Low', sortOrder: 14 },
  { category: 'Competition Risk', description: 'Competing developments affecting demand or pricing in the Dehiwala area', likelihood: 'Medium', impact: 'Medium', mitigation: 'Differentiated product positioning; competitive pricing; quality differentiation', residualRisk: 'Medium', sortOrder: 15 },
  { category: 'Quality Risk', description: 'Finished product not meeting buyer expectations', likelihood: 'Low', impact: 'High', mitigation: 'Clear specifications; regular inspections; transparent communication with buyers', residualRisk: 'Low', sortOrder: 16 },
  { category: 'Customer-Credit Risk', description: 'Buyers defaulting on progressive payment obligations', likelihood: 'Low', impact: 'Medium', mitigation: 'Customer eligibility checks; staged collections linked to construction milestones; legal remedies in sale agreements', residualRisk: 'Low', sortOrder: 17 },
  { category: 'Sales-Collection Risk', description: 'Slower than forecast unit sales or delayed customer payments', likelihood: 'Medium', impact: 'High', mitigation: 'Conservative booking assumptions (50%/30%/20% over three years); revolving facility for timing gaps', residualRisk: 'Medium', sortOrder: 18 },
  { category: 'Reputation Risk', description: 'Negative publicity, customer complaints, or stakeholder disputes', likelihood: 'Low', impact: 'Medium', mitigation: 'Transparent communications; professional project management; customer relationship management', residualRisk: 'Low', sortOrder: 19 },
  { category: 'Operational Risk', description: 'Internal process failures, systems issues, or administrative delays', likelihood: 'Low', impact: 'Low', mitigation: 'Documented procedures; experienced team; regular management reviews', residualRisk: 'Low', sortOrder: 20 },
  { category: 'Health & Safety Risk', description: 'Construction-site accidents or worker safety incidents', likelihood: 'Medium', impact: 'High', mitigation: 'Safety controls; compliance with construction safety regulations; insurance coverage', residualRisk: 'Low', sortOrder: 21 },
  { category: 'Force Majeure', description: 'Pandemic, war, civil unrest, or other unforeseen events', likelihood: 'Low', impact: 'Critical', mitigation: 'Force majeure provisions in contracts; insurance coverage; financial reserves', residualRisk: 'Medium', sortOrder: 22 },
  { category: 'Economic Risk', description: 'Macroeconomic downturn, inflation, or recession affecting property demand', likelihood: 'Medium', impact: 'High', mitigation: 'Conservative financial assumptions; focus on mid-to-upper-middle-income segment with resilient demand', residualRisk: 'Medium', sortOrder: 23 },
  { category: 'Political/Policy Risk', description: 'Changes in government policy, taxation, or property regulations', likelihood: 'Low', impact: 'Medium', mitigation: 'Monitoring of regulatory environment; compliance with current regulations; diversified buyer base', residualRisk: 'Low', sortOrder: 24 },
  { category: 'Exit Risk', description: 'Difficulty in achieving planned returns or project exit', likelihood: 'Low', impact: 'Medium', mitigation: 'Conservative return assumptions; multiple exit options; strong location fundamentals', residualRisk: 'Low', sortOrder: 25 },
];

export const faqs = [
  { question: 'What is the current status of the project?', answer: 'This is a proposed residential apartment development. The project is currently in the planning and approval stage. Please contact us for the latest status updates.', category: 'Project', sortOrder: 1 },
  { question: 'Where exactly is the project located?', answer: 'The proposed development is located in the Dehiwala area, within close proximity to Marine Drive, Kawdana Road, Hill Street, Galle Road, Kalubowila Road, and Allen Avenue. The exact site address will be confirmed upon final land acquisition.', category: 'Location', sortOrder: 2 },
  { question: 'What apartment sizes are available?', answer: 'Two unit types are planned: a larger 3-bedroom apartment of approximately 1,425 sq. ft. and a compact 3-bedroom apartment of approximately 1,273 sq. ft. Each residential floor will have one of each type.', category: 'Project', sortOrder: 3 },
  { question: 'What are the indicative prices?', answer: 'Indicative proposal prices are approximately LKR 49,875,000 for the larger unit and LKR 44,555,000 for the compact unit. All prices are subject to confirmation and may vary based on floor premiums and final specifications. Please request the current price list for up-to-date pricing.', category: 'Pricing', sortOrder: 4 },
  { question: 'How do I reserve a unit?', answer: 'Please submit an enquiry through our contact form or call us directly. Our sales team will guide you through the reservation process, payment milestones, and documentation requirements. All reservation terms are subject to the final sale and purchase agreement.', category: 'Payment', sortOrder: 5 },
  { question: 'What are the payment terms?', answer: 'The common market practice described in the proposal includes a 30%-50% initial down payment, with the balance paid progressively linked to construction milestones. The conservative model assumes a 25% initial customer payment. All payment terms are subject to the final sale and purchase agreement.', category: 'Payment', sortOrder: 6 },
  { question: 'What parking is provided?', answer: 'Dedicated parking is planned for all units. The final parking configuration (basement or ground-floor) is subject to architectural confirmation.', category: 'Amenities', sortOrder: 7 },
  { question: 'What amenities are included?', answer: 'Proposed amenities include a gymnasium, rooftop leisure area, CCTV security, generator backup, intercom system, air-conditioning provision, dedicated parking, and water-backup system. Each amenity\'s status will be updated as it is confirmed and constructed.', category: 'Amenities', sortOrder: 8 },
  { question: 'What approvals have been obtained?', answer: 'Approval statuses are managed and updated as the project progresses. Please contact us for the current status of UDA, CMA, and other regulatory approvals.', category: 'Approvals', sortOrder: 9 },
  { question: 'When is the expected completion date?', answer: 'The proposed construction programme is 36 months within a four-year financial horizon. Actual dates will be confirmed once construction commences. Progress updates will be published regularly.', category: 'Project', sortOrder: 10 },
  { question: 'Can overseas Sri Lankans purchase units?', answer: 'Yes, the project is designed to support overseas buyers. We offer remote-purchase support, flexible consultation scheduling across time zones, and digital document access. Please contact us for details on the overseas purchasing process.', category: 'Overseas', sortOrder: 11 },
  { question: 'Is bank financing available for the project?', answer: 'The developer has proposed a financing arrangement with a commercial bank. Buyer mortgage options would be subject to individual bank assessments. We can connect you with banking partners for pre-approval discussions.', category: 'Investment', sortOrder: 12 },
  { question: 'What about rental management after purchase?', answer: 'Information on rental management services will be provided as the project progresses. The Dehiwala area has demonstrated rental demand from professionals, families, and expatriates.', category: 'Investment', sortOrder: 13 },
  { question: 'How can I access project documents?', answer: 'Detailed project documents are available through our secure data room. Qualified investors and banking partners can request access by submitting an enquiry. Access is subject to NDA acceptance and administrator approval.', category: 'Legal', sortOrder: 14 },
  { question: 'What is the refund and cancellation policy?', answer: 'Refund and cancellation terms will be specified in the final sale and purchase agreement. Please contact our sales team for detailed information.', category: 'Legal', sortOrder: 15 },
];

export const siteSettings = [
  { key: 'company_name', value: 'A&Y Consolidated (PVT) Ltd', label: 'Company Name', category: 'General' },
  { key: 'project_name', value: 'A&Y Residences Dehiwala', label: 'Project Name', category: 'General' },
  { key: 'tagline', value: 'Connected Dehiwala living, designed around space, value, and everyday convenience.', label: 'Tagline', category: 'General' },
  { key: 'phone', value: '+94 XX XXX XXXX', label: 'Phone Number', category: 'Contact' },
  { key: 'email', value: 'info@ayconsolidated.lk', label: 'Email Address', category: 'Contact' },
  { key: 'whatsapp', value: '+94XXXXXXXXX', label: 'WhatsApp Number', category: 'Contact' },
  { key: 'address', value: 'Dehiwala, Sri Lanka', label: 'Office Address', category: 'Contact' },
  { key: 'working_hours', value: 'Monday – Saturday: 9:00 AM – 6:00 PM', label: 'Working Hours', category: 'Contact' },
  { key: 'meta_title', value: 'A&Y Residences Dehiwala | Premium 3-Bedroom Apartments', label: 'SEO Title', category: 'SEO' },
  { key: 'meta_description', value: 'Proposed premium residential apartment development in Dehiwala, Sri Lanka. Ten spacious 3-bedroom apartments with modern amenities, excellent connectivity, and thoughtful design by A&Y Consolidated.', label: 'SEO Description', category: 'SEO' },
];
