export type ListItem = string | { text: string; sub: string[] };

export type Block =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: ListItem[] };

export type LegalSection = {
  id: string;
  heading: string;
  body: Block[];
};

export type LegalDoc = {
  slug: string;
  title: string;
  lastUpdated: string;
  intro?: Block[];
  sections: LegalSection[];
};

const p = (text: string): Block => ({ type: 'p', text });
const ul = (items: string[]): Block => ({ type: 'ul', items });
const ol = (items: ListItem[]): Block => ({ type: 'ol', items });

export const TERMS: LegalDoc = {
  slug: 'terms',
  title: 'Terms of Service',
  lastUpdated: 'January 01, 2026',
  sections: [
    {
      id: 'general-information',
      heading: '1. General information',
      body: [
        p('These Terms of Service govern the use of the website and services offered under the **Struxa** brand.'),
        p('The service provider is:'),
        ul([
          '**Disaster Limited**',
          'Address: **71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ**',
          'E-mail: **hello@struxa.cloud**',
        ]),
        p('By using the Service or Services, you confirm that you have read these Terms and agree to their content.'),
      ],
    },
    {
      id: 'definitions',
      heading: '2. Definitions',
      body: [
        p('For the purposes of these Terms, the following definitions apply:'),
        ul([
          '**Service Provider** — Disaster Limited, as identified in section 1.',
          '**User** — any natural person, legal person, or organisational unit using the Service or Services.',
          '**Service** — the website and related resources available under the Struxa brand.',
          '**Services** — features, tools, and solutions made available by the Service Provider through the Service.',
          '**Terms** — this document.',
        ]),
      ],
    },
    {
      id: 'scope-and-nature',
      heading: '3. Scope and nature of services',
      body: [
        ol([
          'The Service Provider makes available to Users features related to the Struxa platform, as described on the Service at any given time.',
          'Services may be developed, modified, or limited in order to improve quality, security, or regulatory compliance.',
          'Some features may be available only to selected Users (e.g. beta testing, staged access).',
        ]),
      ],
    },
    {
      id: 'conditions-of-use',
      heading: '4. Conditions of use',
      body: [
        ol([
          {
            text: 'The User agrees to use the Service and Services in accordance with:',
            sub: ['applicable law,', 'these Terms,', 'good practice and community standards.'],
          },
          'It is prohibited to submit unlawful content, content infringing the rights of third parties, or content that may disrupt the operation of the Service.',
          'The User is responsible for actions taken using their access credentials.',
        ]),
      ],
    },
    {
      id: 'user-account',
      heading: '5. User account (where applicable)',
      body: [
        ol([
          'Use of some Services may require creating an account.',
          'The User is required to provide accurate and current information.',
          {
            text: 'The Service Provider may temporarily restrict or block access to an account in the event of:',
            sub: [
              'a breach of these Terms,',
              'reasonable suspicion of abuse,',
              'actions threatening the security of the Service or other Users.',
            ],
          },
        ]),
      ],
    },
    {
      id: 'payments-and-billing',
      heading: '6. Payments and billing (where applicable)',
      body: [
        ol([
          'Information about prices, plans, and billing methods is published on the Service.',
          'Prices are stated in the currency indicated on the Service and include all legally required components, unless otherwise stated.',
          'Payment processing may be handled by external payment operators under their own terms and policies.',
        ]),
      ],
    },
    {
      id: 'intellectual-property',
      heading: '7. Intellectual property',
      body: [
        ol([
          'All rights to the Service, its graphic elements, content, code, marks, and materials belong to the Service Provider or its partners.',
          'Use of the Service does not constitute the acquisition of any intellectual property rights.',
          'Copying, modifying, distributing, or using elements of the Service without prior consent of the rightsholder is prohibited, except as permitted by law.',
        ]),
      ],
    },
    {
      id: 'liability-and-disclaimers',
      heading: '8. Liability and disclaimers',
      body: [
        ol([
          'The Service Provider takes reasonable care to ensure continuous and secure operation of the Service, but does not guarantee uninterrupted availability of all features.',
          'The Service and Services are provided on an "as is" basis, subject to the limitations inherent in digital services.',
          {
            text: 'The Service Provider is not liable for:',
            sub: [
              'technical interruptions resulting from maintenance, failures, or force majeure,',
              'consequences of using the Service contrary to these Terms,',
              'damage resulting from unauthorised access to User data due to circumstances attributable to the User.',
            ],
          },
          'The User uses automated and recommendation features at their own risk and should independently verify results before making business, legal, or financial decisions.',
        ]),
      ],
    },
    {
      id: 'complaints-and-contact',
      heading: '9. Complaints and contact',
      body: [
        ol([
          'Users may submit complaints about the operation of the Services electronically to: **hello@struxa.cloud**.',
          {
            text: 'A complaint should include at minimum:',
            sub: [
              'information enabling identification of the User,',
              'a description of the issue,',
              "the User's request.",
            ],
          },
          'Complaints will be handled without undue delay, no later than 14 business days, unless the nature of the matter requires additional clarification.',
        ]),
      ],
    },
    {
      id: 'personal-data-protection',
      heading: '10. Personal data protection',
      body: [
        p(
          'The principles of personal data processing are set out in a separate document: the [Privacy Policy](/privacy) available on the Service.',
        ),
      ],
    },
    {
      id: 'changes-to-the-terms',
      heading: '11. Changes to the Terms',
      body: [
        ol([
          {
            text: 'The Service Provider may amend these Terms for legitimate reasons, in particular:',
            sub: [
              'changes in applicable law,',
              'development or modification of Service features,',
              'the need to clarify provisions.',
            ],
          },
          'The current version of the Terms is published on the Service together with the date of the last update.',
          'Continued use of the Service after changes take effect constitutes acceptance of those changes, unless otherwise required by law.',
        ]),
      ],
    },
    {
      id: 'final-provisions',
      heading: '12. Final provisions',
      body: [
        ol([
          'These Terms are governed by the laws of England and Wales.',
          'Matters not covered by these Terms are subject to the applicable provisions of generally binding law.',
          'Disputes arising from these Terms shall be resolved by the competent courts of England and Wales, taking into account consumer rights.',
        ]),
      ],
    },
    {
      id: 'contact',
      heading: '13. Contact',
      body: [
        p('For matters related to these Terms, please contact us:'),
        ul([
          'E-mail: **hello@struxa.cloud**',
          'Address: **71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ**',
          'Legal entity: **Disaster Limited**',
        ]),
      ],
    },
  ],
};

export const PRIVACY: LegalDoc = {
  slug: 'privacy',
  title: 'Privacy Policy',
  lastUpdated: 'January 1, 2026',
  intro: [
    p(
      'This Privacy Policy describes how Struxa ("we", "us", "our") collects and processes personal data in connection with the use of the Struxa website and related services.',
    ),
    p('The data controller is:'),
    ul([
      '**Disaster Limited** (operating as Struxa)',
      '71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ',
      'E-mail: **privacy@struxa.cloud**',
    ]),
  ],
  sections: [
    {
      id: 'scope-and-purpose',
      heading: '1. Scope and purpose of processing',
      body: [
        p('We process personal data only to the extent necessary for:'),
        ul([
          'providing services electronically,',
          'handling inquiries and communicating with users,',
          'fulfilling legal obligations,',
          'ensuring the security of the service,',
          'conducting statistical analysis and improving services (to the extent permitted by law).',
        ]),
      ],
    },
    {
      id: 'what-data',
      heading: '2. What data we may process',
      body: [
        p('Depending on how you use the service, we may process:'),
        ul([
          'identification data (e.g. name, if provided),',
          'contact data (e.g. email address),',
          'technical and operational data (e.g. IP address, device information, system logs),',
          'data related to activity on the service.',
        ]),
        p('Providing data is voluntary in principle, but may be necessary to use certain features.'),
      ],
    },
    {
      id: 'legal-bases',
      heading: '3. Legal bases for processing',
      body: [
        p('We process personal data in accordance with the GDPR, in particular on the basis of:'),
        ul([
          'Art. 6(1)(b) GDPR — where processing is necessary for the performance of a contract or to take steps prior to entering into a contract,',
          'Art. 6(1)(c) GDPR — where processing is necessary to comply with a legal obligation,',
          'Art. 6(1)(f) GDPR — where processing is necessary for the legitimate interests of the controller,',
          'Art. 6(1)(a) GDPR — based on consent (where required).',
        ]),
      ],
    },
    {
      id: 'recipients',
      heading: '4. Recipients of data',
      body: [
        p('Data may be transferred to entities cooperating with us that support the provision of services, such as:'),
        ul([
          'hosting and IT infrastructure providers,',
          'analytics tool providers,',
          'communication service providers,',
          'accounting and legal service providers (where required).',
        ]),
        p(
          'These entities process data under appropriate agreements and solely in accordance with our instructions, unless they act as independent data controllers.',
        ),
      ],
    },
    {
      id: 'transfers-outside-eea',
      heading: '5. Transfers outside the EEA',
      body: [
        p(
          'If the use of external services results in data being transferred outside the European Economic Area, such transfers are made with appropriate legal safeguards as required by the GDPR (e.g. standard contractual clauses).',
        ),
      ],
    },
    {
      id: 'data-retention',
      heading: '6. Data retention',
      body: [
        p(
          'We retain data for the period necessary to fulfil the purposes of processing, and then for the period required by law or until claims become time-barred.',
        ),
        p('Where processing is based on consent — until consent is withdrawn, unless another legal basis for continued processing exists.'),
      ],
    },
    {
      id: 'your-rights',
      heading: '7. Your rights',
      body: [
        p('You have the right to:'),
        ul([
          'access your data,',
          'rectify your data,',
          'erase your data,',
          'restrict processing,',
          'data portability,',
          'object to processing,',
          'withdraw consent at any time (where processing is based on consent),',
          'lodge a complaint with a supervisory authority.',
        ]),
      ],
    },
    {
      id: 'cookies',
      heading: '8. Cookies and similar technologies',
      body: [
        p('The service may use cookies and similar technologies for the purposes of:'),
        ul([
          'ensuring the proper functioning of the service,',
          'maintaining user sessions,',
          'analytics and statistics,',
          'remembering preferences.',
        ]),
        p('Detailed information is available in our [Cookie Policy](/cookies).'),
      ],
    },
    {
      id: 'automated-decision-making',
      heading: '9. Automated decision-making',
      body: [
        p(
          'As a rule, we do not make decisions with legal effects based solely on automated processing, including profiling, unless required by applicable law or the user has given explicit consent.',
        ),
      ],
    },
    {
      id: 'data-security',
      heading: '10. Data security',
      body: [
        p(
          'We apply appropriate technical and organisational measures to protect personal data against unauthorised access, loss, destruction or unauthorised modification.',
        ),
      ],
    },
    {
      id: 'changes-to-this-policy',
      heading: '11. Changes to this policy',
      body: [
        p(
          'This Privacy Policy may be updated periodically, in particular in the event of legal or organisational changes. The current version is published on this page along with the date of the last update.',
        ),
      ],
    },
    {
      id: 'contact',
      heading: '12. Contact',
      body: [
        p('For matters relating to personal data, please contact us:'),
        ul([
          '**Disaster Limited** (operating as Struxa)',
          '71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ',
          '**privacy@struxa.cloud**',
        ]),
      ],
    },
  ],
};

export const COOKIES: LegalDoc = {
  slug: 'cookies',
  title: 'Cookie Policy',
  lastUpdated: 'January 1, 2026',
  sections: [
    {
      id: 'general-information',
      heading: '1. General information',
      body: [
        p('This Cookie Policy explains how Struxa ("we", "us", "our") uses cookies and similar technologies on the website and related services.'),
        p('The data controller is:'),
        ul([
          '**Disaster Limited** (operating as Struxa)',
          '71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ',
          'E-mail: **hello@struxa.cloud**',
        ]),
      ],
    },
    {
      id: 'what-are-cookies',
      heading: '2. What are cookies',
      body: [
        p(
          "Cookies are small text files saved on the user's device (e.g. computer, smartphone, tablet) when using the service. They enable, among other things, correct operation of the site, remembering preferences, and analysis of how the service is used.",
        ),
      ],
    },
    {
      id: 'technologies-we-use',
      heading: '3. Technologies we use',
      body: [
        p('We may use:'),
        ul([
          'essential (technical) cookies,',
          'functional cookies,',
          'analytical cookies,',
          'browser local storage (localStorage) to save consent decisions.',
        ]),
        p('For analytics we may use tools such as PostHog to measure performance and improve the service.'),
      ],
    },
    {
      id: 'purposes-of-cookies',
      heading: '4. Purposes of cookies',
      body: [
        p('We use cookies to:'),
        ul([
          'ensure the correct and secure operation of the service,',
          'remember user settings,',
          'analyse traffic and feature usage,',
          'improve service quality.',
        ]),
        p('We do not use cookies to make automated decisions with legal effects on users.'),
      ],
    },
    {
      id: 'legal-basis',
      heading: '5. Legal basis',
      body: [
        p('Essential cookies are used on the basis of our legitimate interest in ensuring the operation and security of the service.'),
        p('Optional cookies (e.g. analytical) are used on the basis of user consent.'),
      ],
    },
    {
      id: 'managing-consent',
      heading: '6. Managing consent',
      body: [
        p(
          'On your first visit, you may accept or decline optional cookies. Your decision may be saved in browser storage and can be changed at any time via browser settings or by resetting your cookie preferences on the service (where available).',
        ),
        p('You may also:'),
        ul(['delete saved cookies,', 'block cookies in your browser settings,', 'restrict tracking technologies.']),
        p('Restricting cookies may affect the correct operation of some service features.'),
      ],
    },
    {
      id: 'retention-period',
      heading: '7. Retention period',
      body: [
        p('Cookies may be stored:'),
        ul(['for the session (until the browser is closed),', 'for a defined period (persistent), depending on their function and configuration.']),
        p('The exact duration may vary depending on the tool used.'),
      ],
    },
    {
      id: 'recipients',
      heading: '8. Recipients of data',
      body: [
        p(
          'Data collected via cookies may be passed to entities providing us with technical support (e.g. hosting and analytics providers), solely to the extent necessary to fulfil the purposes set out in this policy and in accordance with applicable law.',
        ),
      ],
    },
    {
      id: 'changes-to-this-policy',
      heading: '9. Changes to this policy',
      body: [
        p(
          'We may update this Cookie Policy periodically, in particular in the event of legal or technical changes. The current version is always published on this page together with the date of the last update.',
        ),
      ],
    },
    {
      id: 'contact',
      heading: '10. Contact',
      body: [
        p('For questions about this Cookie Policy and data protection:'),
        ul(['E-mail: **hello@struxa.cloud**', 'Address: 71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ']),
      ],
    },
  ],
};

export const LEGAL_DOCS = [TERMS, PRIVACY, COOKIES];
