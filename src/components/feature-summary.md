# SuperNova Automations Website Component Summary

This document provides a high-level overview of the TypeScript React (.tsx) files used in the SuperNova Automations website. It is organized by directory and describes the purpose and functionality of each component.

## App Structure

### src/app/layout.tsx
- **Purpose**: Main layout wrapper for the entire application
- **Key Functions**: 
  - Defines font configurations (Geist Sans and Mono)
  - Sets up metadata for SEO
  - Provides the basic HTML structure
  - Wraps the app with the StarfieldProviderWrapper
  - Includes global components: Navbar and Footer

### src/app/page.tsx
- **Purpose**: Home page of the website
- **Key Functions**:
  - Renders the HeroSection component
  - Contains a Services section with NebulaDepthCard components for each service
  - Includes a "Why Choose Us" section with FeatureCardGrid
  - Has a call-to-action section linking to the contact page
  - Uses StarfieldBackground for the space theme

### src/app/about/page.tsx
- **Purpose**: About page for the company

### src/app/contact/page.tsx
- **Purpose**: Contact page with a form for user inquiries

### src/app/services/voice-ai/page.tsx
- **Purpose**: Dedicated page for Voice AI services

### src/app/services/process-automations/page.tsx
- **Purpose**: Dedicated page for Process Automation services

### src/app/services/custom-integrations/page.tsx
- **Purpose**: Dedicated page for Custom Integration services

### src/app/compare-designs/page.tsx
- **Purpose**: Page for comparing different design options

## Components

### src/components/ApproachWrapper.tsx
- **Purpose**: Container component for the company's approach section

### src/components/BenefitsWrapper.tsx
- **Purpose**: Container for displaying benefits of services

### src/components/ConstellationNetwork.tsx
- **Purpose**: Visual component that creates a network/node graph visualization with a constellation theme

### src/components/ContactForm.tsx
- **Purpose**: Form component for the contact page
- **Key Functions**:
  - Provides input fields for user information
  - Handles form submission
  - Manages form validation and error states

### src/components/FeatureCard.tsx
- **Purpose**: Card component for displaying individual features
- **Key Functions**:
  - Presents a feature with an icon, title and description
  - Includes visual styling consistent with the space theme

### src/components/FeatureCardGrid.tsx
- **Purpose**: Grid layout for FeatureCard components
- **Key Functions**:
  - Arranges multiple feature cards in a responsive grid
  - Manages spacing and alignment

### src/components/Footer.tsx
- **Purpose**: Footer component that appears on all pages
- **Key Functions**:
  - Displays company information, links, and copyright
  - Provides navigation to key pages
  - Maintains the cosmic visual theme

### src/components/HeroSection.tsx
- **Purpose**: Hero component for the homepage
- **Key Functions**:
  - Creates a visually striking introduction section
  - Contains headline, subheading, and call-to-action
  - Sets the overall visual tone for the site

### src/components/KeyFeaturesGrid.tsx
- **Purpose**: Grid component for displaying key features
- **Key Functions**:
  - Organizes key features in a grid layout
  - Makes features visually distinct and accessible

### src/components/KeyFeaturesWrapper.tsx
- **Purpose**: Container component that wraps the KeyFeaturesGrid

### src/components/Navbar.tsx
- **Purpose**: Navigation bar that appears on all pages
- **Key Functions**:
  - Provides links to main website sections
  - Includes dropdown for services
  - Supports responsive design with mobile menu
  - Handles navigation state (menu open/closed)

### src/components/NebulaDepthCard.tsx
- **Purpose**: Interactive card component with 3D/depth effects
- **Key Functions**:
  - Creates cards with parallax and 3D hover effects
  - Used for service cards on the homepage
  - Manages mouse interaction for visual effects
  - Supports different icons based on the service type
  - Equalizes heights of cards in the same section

### src/components/RippleSupernovaBg.tsx
- **Purpose**: Animated background component with ripple effects
- **Key Functions**:
  - Creates a visual background resembling supernova ripples
  - Handles animation timing and effects

### src/components/ServiceCard.tsx
- **Purpose**: Card component for displaying services
- **Key Functions**:
  - Presents service information in a card format
  - May include imagery and links to service pages

### src/components/StarfieldBackground.tsx
- **Purpose**: Creates a starfield/space background
- **Key Functions**:
  - Renders a cosmic background with stars
  - Integrates with the StarfieldContext
  - Provides container for content to appear over the starfield

### src/components/StarfieldProviderWrapper.tsx
- **Purpose**: Wrapper component that provides the StarfieldContext
- **Key Functions**:
  - Initializes the starfield context
  - Makes starfield functionality available to child components
  - Creates a consistent theme across the application

### src/components/StarfieldWindow.tsx
- **Purpose**: Component for displaying a window with starfield background
- **Key Functions**:
  - Creates a bounded area that shows the starfield
  - Can be used as a decorative element

### src/components/VideoCard.tsx
- **Purpose**: Card component for displaying video content
- **Key Functions**:
  - Embeds and formats video content
  - Maintains the cosmic visual theme

## Contexts

### src/contexts/StarfieldContext.tsx
- **Purpose**: React context for managing the starfield theme across the app
- **Key Functions**:
  - Creates a shared starfield background
  - Manages registration of starfield window elements
  - Handles generation of the starfield image
  - Provides context values to components that need starfield functionality
  - Uses an offscreen canvas for rendering efficient starfield graphics

## Additional/Special Components

### src/components/CompareDesigns.tsx
- **Purpose**: Component for design comparison functionality

### src/components/CosmicPortalCard.tsx
- **Purpose**: Special card component with cosmic portal visual effects

### src/components/ErrorBoundary.tsx
- **Purpose**: Error boundary component to catch and handle React errors gracefully

### src/components/StellarLifecycleCard.tsx
- **Purpose**: Card component possibly illustrating lifecycle stages with a stellar theme

## Summary

The SuperNova Automations website uses a consistent cosmic/space theme throughout its components. The architecture follows Next.js conventions with page components in the app directory and reusable UI components in the components directory. The StarfieldContext provides a shared theming system that allows for consistent space-themed visuals across the application.

Key visual elements include:
- Starfield backgrounds
- Nebula-themed cards with 3D effects
- Constellation networks
- Supernova ripple effects

The site is organized around showcasing three main service areas:
1. Voice Agent Solutions
2. Process Automations 
3. Custom Integrations

Most components feature interactive elements and visual effects that enhance the cosmic theme while maintaining usability and performance.
