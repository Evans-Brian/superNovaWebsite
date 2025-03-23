# Service Cards Summary

This document summarizes the different types of service cards used throughout the SuperNova Automations website, organized by their type.

**Note:** All service cards within the same section now have consistent heights to create a cleaner, more cohesive user interface. This is achieved using dynamic height equalization that automatically adjusts all cards to match the tallest card in each section.

## Our Services Service Cards

These cards are found under the "Our Services" section on the hero page:

- `src/components/NebulaDepthCard.tsx` - Main service cards with 3D depth effect and particle animations

## Bordered Service Cards

These cards feature a glowing border effect and are found in the following sections:

1. **Why Choose SuperNova Automations** (hero page)
   - `src/components/FeatureCard.tsx` - Feature cards with glowing border

2. **Key Features** (voice page)
   - `src/components/KeyFeaturesWrapper.tsx` - Wrapper component for Key Features cards

3. **Common Use Cases** (Process Automations page)
   - `src/components/ApproachWrapper.tsx` - Approach/Use Case cards with glowing border

4. **Integration Types and Our Integration Approach** (Custom Integration Page)
   - `src/components/BenefitsWrapper.tsx` - Benefits/Integration cards with glowing border

## Other Service Cards

These cards have different styles without the constellation effect or bordered style:

- `src/components/ServiceCard.tsx` - Generic service cards
- `src/components/VideoCard.tsx` - Cards for video content
- `src/components/StellarLifecycleCard.tsx` - Cards with lifecycle information
- `src/components/CosmicPortalCard.tsx` - Portal-style cards with different visual effect

## Technical Implementation Details

### Height Equalization
- Implemented in all card components: `ServiceCard.tsx`, `NebulaDepthCard.tsx`, and `FeatureCard.tsx`
- Uses a DOM-based approach to find all cards of the same type within a section
- Measures natural heights and sets all cards to match the tallest card
- Responsive to window resizing and content changes
- Maintains consistent card heights within each section while preserving the unique styling of each card type
- Ensures all card height calculations run client-side only to prevent server-side rendering issues

### Constellation Effect
- Implemented in `src/components/ConstellationNetwork.tsx`
- Features smooth 2-second fade-in/fade-out transitions for connection lines
- Enhanced visual effect with higher contrast between active connections (0.6 opacity) and inactive ones (0.03 opacity)
- Adds particle flow from active cards to connected nodes

### Glowing Border Effect
- Implemented in `components/ui/glowing-effect.tsx`
- Creates an interactive glowing border that responds to mouse movement
- Used by all "Bordered Service Cards"

### 3D Depth Effect
- Implemented in `src/components/NebulaDepthCard.tsx`
- Creates a parallax 3D effect with multiple layers on mouse hover
- Used by "Our Services Service Cards"
