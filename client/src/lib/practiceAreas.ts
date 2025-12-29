import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  Briefcase,
  Building2,
  Calculator,
  Coins,
  Gavel,
  HandCoins,
  Handshake,
  HeartHandshake,
  Home,
  Landmark,
  Layers,
  Lightbulb,
  Scale,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";

export type PracticeArea = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  services: string[];
  keyBenefits: string[];
  relatedCategories: string[];
  icon: LucideIcon;
};

export const practiceAreas: PracticeArea[] = [
  {
    id: "arbitration",
    icon: Gavel,
    title: "Arbitration",
    subtitle: "Domestic & International",
    description:
      "Strategic arbitration representation for complex domestic and international disputes.",
    fullDescription:
      "Our arbitration team handles commercial disputes under institutional and ad hoc rules. We support clients from drafting arbitration clauses to award enforcement, with a focus on efficient timelines and enforceable outcomes.",
    services: [
      "Domestic and international arbitration",
      "Arbitration clause drafting and review",
      "Institutional and ad hoc proceedings",
      "Interim measures and emergency relief",
      "Award enforcement and challenges",
      "Arbitrator appointment support",
    ],
    keyBenefits: [
      "Structured case strategy from notice to award",
      "Experience with institutional rules and procedures",
      "Outcome-focused approach with enforceability in mind",
    ],
    relatedCategories: ["arbitration", "tribunals", "awards"],
  },
  {
    id: "banking-finance",
    icon: Banknote,
    title: "Banking & Finance",
    subtitle: "Lending & Recovery",
    description:
      "Advisory on lending, security creation, restructuring, and enforcement actions.",
    fullDescription:
      "We advise lenders and borrowers on financing transactions, security creation, and restructuring. Our work spans documentation, negotiations, and enforcement actions including recovery proceedings.",
    services: [
      "Loan and security documentation",
      "Restructuring and workouts",
      "Insolvency and bankruptcy support",
      "Enforcement and recovery actions",
      "Regulatory compliance (RBI/FEMA)",
      "Project and infrastructure finance",
    ],
    keyBenefits: [
      "Balanced lender and borrower perspective",
      "Contested and uncontested recovery experience",
      "Integrated regulatory guidance",
    ],
    relatedCategories: ["banking", "finance", "recovery"],
  },
  {
    id: "capital-markets",
    icon: TrendingUp,
    title: "Capital Markets",
    subtitle: "Listings & Investments",
    description:
      "Counsel on fundraising, securities compliance, and capital market transactions.",
    fullDescription:
      "We guide issuers and investors through capital market transactions with a focus on regulatory compliance and commercial clarity. Our experience covers public and private offerings as well as continuous disclosure.",
    services: [
      "Equity and debt offerings",
      "Private placements",
      "Securities law compliance",
      "Due diligence and disclosures",
      "Listing and regulatory approvals",
      "Investor rights and governance",
    ],
    keyBenefits: [
      "Regulatory-led transaction planning",
      "Documentation tailored to investor needs",
      "Clear pathways to approvals and listings",
    ],
    relatedCategories: ["capital-markets", "securities", "fundraising"],
  },
  {
    id: "commercial",
    icon: Briefcase,
    title: "Commercial",
    subtitle: "Business Operations",
    description:
      "Day-to-day commercial contracting, risk allocation, and operational compliance.",
    fullDescription:
      "Our commercial practice supports business operations through pragmatic contracts and risk-aware advisory. We emphasize clarity, enforceability, and alignment with commercial objectives.",
    services: [
      "Vendor and customer contracts",
      "Joint ventures and collaborations",
      "Procurement and supply agreements",
      "Franchise and distribution arrangements",
      "Compliance frameworks for operations",
      "Standard form templates and playbooks",
    ],
    keyBenefits: [
      "Business-first drafting and negotiation",
      "Consistent playbooks for scale",
      "Risk mitigation aligned to operations",
    ],
    relatedCategories: ["commercial", "contracts", "operations"],
  },
  {
    id: "criminal-law",
    icon: Shield,
    title: "Criminal Law",
    subtitle: "Defense & Compliance",
    description:
      "Robust defense and advisory support across white-collar, economic, and general criminal matters.",
    fullDescription:
      "Our team defends and advises clients in criminal investigations and prosecutions, with particular focus on white-collar and economic offences. We guide clients through every procedural stage with measured strategy.",
    services: [
      "White-collar and economic offences",
      "Anticipatory and regular bail",
      "Trial strategy and defense",
      "Internal investigations",
      "Regulatory liaison and compliance",
      "Appeals and revisions",
    ],
    keyBenefits: [
      "Swift response in urgent matters",
      "Coordinated defense across forums",
      "Clear guidance on regulatory exposure",
    ],
    relatedCategories: ["criminal", "white-collar", "regulatory"],
  },
  {
    id: "litigation-dispute-resolution",
    icon: Scale,
    title: "Dispute Resolution",
    subtitle: "Strategy & Negotiation",
    description:
      "Strategic negotiation, mediation, and advisory support to resolve complex disputes efficiently.",
    fullDescription:
      "We handle high-stakes disputes with meticulous preparation, clear strategy, and focused advocacy. From pre-litigation assessments to mediation and settlement, we prioritize outcomes that align with our clients' business and personal goals.",
    services: [
      "Pre-litigation risk assessments",
      "Mediation and conciliation",
      "Negotiated settlements",
      "Dispute strategy and case management",
      "Interim reliefs and injunction strategy",
      "Settlement documentation and enforcement",
    ],
    keyBenefits: [
      "End-to-end dispute strategy and execution",
      "Outcome-focused and cost-aware approach",
      "Practical guidance to avoid protracted litigation",
    ],
    relatedCategories: ["dispute-resolution", "mediation", "settlement"],
  },
  {
    id: "employment",
    icon: Users,
    title: "Employment",
    subtitle: "Workforce Advisory",
    description:
      "Advisory on employment contracts, policies, disputes, and workforce transitions.",
    fullDescription:
      "We help employers build compliant workplaces, resolve disputes, and structure workforce transitions. Our counsel balances legal risk with employee experience.",
    services: [
      "Employment and contractor agreements",
      "Policy drafting and audits",
      "Disciplinary and termination actions",
      "Dispute resolution and settlement",
      "POSH compliance and training",
      "Workforce restructuring and transfers",
    ],
    keyBenefits: [
      "Practical HR-aligned guidance",
      "Dispute avoidance and rapid resolution",
      "Proactive compliance programs",
    ],
    relatedCategories: ["employment", "labor", "workplace"],
  },
  {
    id: "family-law",
    icon: HeartHandshake,
    title: "Family Law",
    subtitle: "Personal Matters",
    description:
      "Sensitive counsel across matrimonial, guardianship, succession, and estate-related matters.",
    fullDescription:
      "Our Family Law practice offers discreet and compassionate representation for sensitive personal matters. We combine strategic guidance with empathy to help clients navigate complex family dynamics while protecting their rights and interests.",
    services: [
      "Divorce and separation proceedings",
      "Child custody and guardianship",
      "Domestic violence protection",
      "Maintenance and alimony",
      "Adoption and surrogacy",
      "Inheritance and succession advisory",
    ],
    keyBenefits: [
      "Balanced representation for negotiated and contested matters",
      "Confidential handling of sensitive issues",
      "Holistic planning for family assets and succession",
    ],
    relatedCategories: ["family", "custody", "succession"],
  },
  {
    id: "insolvency-bankruptcy",
    icon: Building2,
    title: "Insolvency & Bankruptcy",
    subtitle: "Resolution & Restructuring",
    description:
      "Advisory and representation for creditors, debtors, and resolution professionals.",
    fullDescription:
      "We guide stakeholders through the Insolvency and Bankruptcy Code process, from pre-insolvency advisory to resolution and liquidation. Our team supports strategy, documentation, and advocacy before the NCLT and NCLAT.",
    services: [
      "CIRP strategy and advisory",
      "Representation before NCLT and NCLAT",
      "Creditor committee support",
      "Debt restructuring and workouts",
      "Liquidation and asset recovery",
      "Distressed asset transactions",
    ],
    keyBenefits: [
      "Practical guidance through time-bound processes",
      "Coordinated creditor and debtor strategies",
      "Experience in restructuring and recovery",
    ],
    relatedCategories: ["insolvency", "bankruptcy", "restructuring"],
  },
  {
    id: "intellectual-property",
    icon: Lightbulb,
    title: "Intellectual Property",
    subtitle: "Innovation Protection",
    description:
      "Protection, enforcement, and commercialization of IP portfolios across industries.",
    fullDescription:
      "We protect, enforce, and commercialize intellectual property assets through thoughtful strategy and precise execution. Our counsel spans portfolio development, licensing, and contentious enforcement.",
    services: [
      "Trademark and copyright protection",
      "Patent filing coordination",
      "Trade secret protection programs",
      "IP licensing and technology transfer",
      "Opposition and enforcement actions",
      "IP due diligence for transactions",
    ],
    keyBenefits: [
      "Lifecycle support from filing to enforcement",
      "Commercial focus for monetization",
      "Cross-industry experience",
    ],
    relatedCategories: ["ip", "technology", "licensing"],
  },
  {
    id: "litigation",
    icon: Landmark,
    title: "Litigation",
    subtitle: "Commercial & Civil",
    description:
      "Representation in commercial and civil litigation across courts and tribunals.",
    fullDescription:
      "Beyond commercial disputes, we represent clients in civil suits, writ petitions, and appellate matters. Our approach blends rigorous research with persuasive advocacy tailored to each forum.",
    services: [
      "Commercial and civil litigation",
      "Civil suits and injunctions",
      "Writ petitions and constitutional challenges",
      "Service law matters",
      "Consumer disputes",
      "Appellate and review proceedings",
    ],
    keyBenefits: [
      "Forum-specific advocacy experience",
      "Research-driven pleadings and strategy",
      "Clarity on timelines and procedural pathways",
    ],
    relatedCategories: ["litigation", "civil", "writs"],
  },
  {
    id: "mergers-acquisitions",
    icon: Handshake,
    title: "Mergers & Acquisitions",
    subtitle: "Deals & Integration",
    description:
      "End-to-end support for acquisitions, mergers, and strategic transactions.",
    fullDescription:
      "We advise on transaction structuring, due diligence, documentation, and post-closing integration for mergers and acquisitions. Our focus is on delivering clear deal outcomes with managed risk.",
    services: [
      "Buy-side and sell-side advisory",
      "Due diligence and risk assessments",
      "Share purchase and asset purchase agreements",
      "Regulatory approvals and filings",
      "Deal structuring and tax coordination",
      "Post-transaction integration support",
    ],
    keyBenefits: [
      "Balanced commercial and legal risk assessment",
      "Negotiation support across transaction stages",
      "Clear pathways to closing and integration",
    ],
    relatedCategories: ["m&a", "transactions", "corporate"],
  },
  {
    id: "private-equity",
    icon: Coins,
    title: "Private Equity",
    subtitle: "Investments & Exits",
    description:
      "Counsel for funds and investors on investments, governance, and exits.",
    fullDescription:
      "We advise private equity funds, family offices, and strategic investors on investments and portfolio management. Our support spans term sheets, shareholder arrangements, and exit strategies.",
    services: [
      "Fund formation and structuring",
      "Term sheets and investment documentation",
      "Shareholders agreements and governance",
      "Regulatory compliance and reporting",
      "Exit strategies and secondary sales",
      "Portfolio company advisory",
    ],
    keyBenefits: [
      "Deal support aligned to investment objectives",
      "Practical governance and compliance guidance",
      "Focus on efficient and value-driven exits",
    ],
    relatedCategories: ["private-equity", "investments", "funds"],
  },
  {
    id: "pro-bono",
    icon: HandCoins,
    title: "Pro Bono",
    subtitle: "Community Impact",
    description:
      "Pro bono support for deserving matters and access-to-justice initiatives.",
    fullDescription:
      "We devote resources to pro bono matters, supporting NGOs and individuals with representation and advisory services. Our work focuses on access to justice, community impact, and responsible advocacy.",
    services: [
      "Legal aid and representation",
      "NGO advisory and compliance",
      "Documentation and filings",
      "Public interest research",
      "Workshops and awareness initiatives",
      "Strategic litigation support",
    ],
    keyBenefits: [
      "Commitment to access-to-justice initiatives",
      "Experienced attorneys contributing time and expertise",
      "Responsible advocacy with measurable impact",
    ],
    relatedCategories: ["pro-bono", "legal-aid", "community"],
  },
  {
    id: "property",
    icon: Layers,
    title: "Property",
    subtitle: "Title & Possession",
    description:
      "Focused support on title verification, encumbrance checks, and possession issues.",
    fullDescription:
      "Our property practice zeroes in on title clarity and possession-related issues. We provide sharp diligence, documentation, and dispute support to safeguard ownership interests.",
    services: [
      "Title verification and encumbrance checks",
      "Conveyancing and registrations",
      "Landlord-tenant advisory",
      "Boundary and easement disputes",
      "Mutation and revenue record updates",
      "Possession and eviction actions",
    ],
    keyBenefits: [
      "Clear, actionable title opinions",
      "Speedy resolutions for possession issues",
      "Local registry and revenue office experience",
    ],
    relatedCategories: ["property", "title", "possession"],
  },
  {
    id: "real-estate-property-law",
    icon: Home,
    title: "Real Estate and Property Law",
    subtitle: "Transactions & Disputes",
    description:
      "End-to-end support for property acquisitions, development, leasing, and contentious matters.",
    fullDescription:
      "We advise on all aspects of real estate transactions and disputes, combining meticulous diligence with practical negotiation. Our team supports developers, investors, and individuals across residential and commercial assets.",
    services: [
      "Title due diligence and risk mapping",
      "Property acquisitions and sales",
      "Development and redevelopment projects",
      "Commercial and residential leasing",
      "RERA and regulatory approvals",
      "Property dispute resolution",
    ],
    keyBenefits: [
      "Practical guidance across the asset lifecycle",
      "Experience in contested and uncontested matters",
      "Regulatory navigation and compliance",
    ],
    relatedCategories: ["real-estate", "property", "rera"],
  },
  {
    id: "taxation-finance",
    icon: Calculator,
    title: "Taxation and Finance",
    subtitle: "Strategic Advisory",
    description:
      "Tax-efficient structuring, compliance, and representation before authorities and tribunals.",
    fullDescription:
      "Our tax practice combines strategic structuring with hands-on representation in disputes. We help clients stay compliant, reduce exposure, and resolve assessments effectively.",
    services: [
      "Direct and indirect tax advisory",
      "Transaction structuring",
      "GST and withholding compliance",
      "Tax controversy and litigation",
      "Advance ruling and appellate support",
      "Cross-border taxation guidance",
    ],
    keyBenefits: [
      "Forward-looking tax planning",
      "Coordinated defense in audits and disputes",
      "Sector-aware compliance programs",
    ],
    relatedCategories: ["tax", "finance", "compliance"],
  },
];

export const practiceAreaMap: Record<string, PracticeArea> = Object.fromEntries(
  practiceAreas.map((area) => [area.id, area]),
) as Record<string, PracticeArea>;

export const practiceAreaTitles = practiceAreas.map((area) => area.title);
