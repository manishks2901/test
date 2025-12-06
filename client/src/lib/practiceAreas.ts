import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  Briefcase,
  Calculator,
  Gavel,
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
    id: "family-law",
    icon: Gavel,
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
    id: "litigation-dispute-resolution",
    icon: Scale,
    title: "Dispute Resolution",
    subtitle: "Strategy & Advocacy",
    description:
      "Courtroom and arbitration advocacy with pragmatic strategies to resolve complex disputes.",
    fullDescription:
      "We handle high-stakes disputes with meticulous preparation, clear strategy, and focused advocacy. From pre-litigation assessments to trials and arbitration, we prioritize outcomes that align with our clients' business and personal goals.",
    services: [
      "Commercial and civil litigation",
      "Domestic and international arbitration",
      "Mediation and negotiated settlements",
      "Appellate strategy and filings",
      "Interim reliefs and injunctions",
      "Pre-litigation risk assessments",
    ],
    keyBenefits: [
      "End-to-end dispute strategy and execution",
      "Experience across courts and tribunals",
      "Outcome-focused and cost-aware approach",
    ],
    relatedCategories: ["litigation", "arbitration", "disputes"],
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
    id: "litigation",
    icon: Landmark,
    title: "Litigation",
    subtitle: "Civil & Writs",
    description:
      "Representation in civil, constitutional, and appellate litigation across forums.",
    fullDescription:
      "Beyond commercial disputes, we represent clients in civil suits, writ petitions, and appellate matters. Our approach blends rigorous research with persuasive advocacy tailored to each forum.",
    services: [
      "Civil suits and injunctions",
      "Writ petitions and constitutional challenges",
      "Service law matters",
      "Consumer disputes",
      "Appellate and review proceedings",
      "Advisory on enforcement of decrees",
    ],
    keyBenefits: [
      "Forum-specific advocacy experience",
      "Research-driven pleadings and strategy",
      "Clarity on timelines and procedural pathways",
    ],
    relatedCategories: ["litigation", "civil", "writs"],
  },
];

export const practiceAreaMap: Record<string, PracticeArea> = Object.fromEntries(
  practiceAreas.map((area) => [area.id, area]),
) as Record<string, PracticeArea>;

export const practiceAreaTitles = practiceAreas.map((area) => area.title);
