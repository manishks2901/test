# Design Guidelines for Wadhwa&Co. Law Firm Website

## Design Approach
Reference-based approach inspired by top-tier law firms (Kirkland & Ellis, Skadden) emphasizing authority, trustworthiness, and sophisticated professionalism. This is a utility-focused, information-dense application where credibility and clarity are paramount.

## Typography System
- **Headings**: Playfair Display (serif) - 600/700 weights
  - H1: 48px/56px desktop, 36px/42px mobile
  - H2: 36px/42px desktop, 28px/34px mobile
  - H3: 28px/34px desktop, 24px/30px mobile
- **Body**: Source Sans Pro (sans-serif) - 400/600 weights
  - Large body: 18px/28px
  - Regular body: 16px/24px
  - Small text: 14px/20px

## Color Palette (User-Specified)
- Primary: #1B365D (deep navy)
- Secondary: #C9A961 (gold accent)
- Background: #FFFFFF (white)
- Text: #2C3E50 (charcoal)
- Neutral: #F8F9FA (light grey)
- Success: #27AE60 (forest green)

## Layout System
Use Tailwind spacing units: 4, 6, 8, 12, 16, 20, 24, 32 for consistent rhythm. Container max-width: 1280px with responsive padding (px-4 mobile, px-8 tablet, px-12 desktop).

## Component Library

### Homepage Structure
**Hero Section**: Full-width with professional imagery (80vh)
- Centered headline with Playfair Display
- 2-line subheading in Source Sans Pro
- Primary CTA button with gold accent, secondary button outlined
- Subtle overlay for text readability

**Services Grid**: 3-column layout (desktop), stacked mobile
- Icon + title + description cards
- Subtle hover effect with gold accent border
- Equal height cards with py-12 padding

**Team Section**: 3-4 column attorney profiles
- Professional headshots (square, 300x300px)
- Name (H3), Title, Brief bio
- "View Profile" link in gold

**Testimonials**: 2-column alternating layout
- Client quote with large quotation marks
- Client name, company, case type below

**Footer**: 4-column information architecture
- About, Services, Resources, Contact columns
- Social links and newsletter signup
- Copyright and legal disclaimers

### Admin Dashboard
**Sidebar Navigation**: Fixed left sidebar (240px wide)
- Logo at top
- Navigation items with icons (Heroicons)
- Active state with gold accent background
- Logout at bottom

**Content Area**: Clean, spacious layout
- Page title (H1) + action buttons in header
- Data tables with hover states
- Pagination controls
- Search and filter inputs

**Blog Editor**: Two-column layout (desktop)
- Left: Rich text editor (70% width)
- Right: Publishing options sidebar (30%)
- Category tags, featured image upload, publish/draft toggle

### Blog Section
**Blog Listing**: Masonry-style grid (2-3 columns)
- Featured image (16:9 ratio)
- Category badge (gold background)
- Title (H3), excerpt (2 lines), author, date
- "Read More" link

**Individual Post**: Single column, max-width 720px
- Large hero image (full-width)
- Title (H1), author, date, reading time
- Body content with generous line-height
- Related posts carousel at bottom

**Search/Filter Bar**: Sticky top bar
- Search input, category dropdown, date range
- Results count display

## Interactive Elements
**Buttons**:
- Primary: Navy background, white text, gold hover
- Secondary: Gold outline, navy text, gold background on hover
- Rounded corners (border-radius: 6px)
- Padding: py-3 px-8

**Forms**:
- Input fields with subtle grey border, navy focus ring
- Labels above inputs (14px Source Sans Pro)
- Error states in red, success in forest green
- Generous spacing between fields (mb-6)

**Cards**:
- White background with subtle shadow
- Hover: slight lift effect (transform: translateY(-4px))
- Border-radius: 8px
- Padding: p-8

## Images
**Homepage**:
- Hero: Professional office interior or city skyline with legal symbolism (1920x1080px minimum)
- Team photos: Formal headshots with consistent lighting and backgrounds
- Services section: Consider abstract legal imagery or icons instead of photos

**Blog**:
- Featured images: Legal-related stock photography or abstract concepts (1200x675px)
- Author avatars: Professional headshots (80x80px, circular)

**Admin Panel**: 
- Dashboard charts and data visualizations
- Placeholder images for blog post previews

## Accessibility
- Minimum contrast ratio 4.5:1 for body text
- Focus indicators on all interactive elements
- ARIA labels for icon-only buttons
- Keyboard navigation support throughout

## Responsive Breakpoints
- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (2 column)
- Desktop: > 1024px (3-4 column layouts)

## Animations
Use sparingly - subtle fade-ins on scroll for homepage sections (0.3s ease), smooth transitions for hover states (0.2s ease). No distracting animations on critical forms or content.