# Service Cards Summary

This document provides a reference for all service card components used throughout the website, categorized by their assigned types.

## Our Services Service Cards

These cards are used in the "Our Services" section on the hero page.

- **Component:** `src/components/NebulaDepthCard.tsx`
- **Usage:** Homepage "Our Services" section
- **Visual Style:** Depth-based cards with particle effects and 3D interactions

## Bordered Service Cards

These cards are used in various sections throughout the site including the "Why Choose SuperNova Automations" on the hero page, "Key Features" on the voice page, "Common Use Cases" on the Process Automations page, and "Integration Types" and "Our Integration Approach" on the Custom Integration Page.

- **Component:** `src/components/FeatureCard.tsx`
  - **Usage:** Homepage "Why Choose SuperNova Automations" section
  - **Visual Style:** Center-aligned cards with circular icons, orbit particles, and interactive glowing border effect

- **Component:** `src/components/KeyFeaturesWrapper.tsx` (using CardWrapper)
  - **Usage:** Voice AI page "Key Features" section, Process Automations page "Common Use Cases" section, Custom Integrations page "Integration Types" section
  - **Visual Style:** Standard cards with interactive glowing border effect (no constellation network connections)

- **Component:** `src/components/ApproachWrapper.tsx` (using ApproachStepWrapper)
  - **Usage:** Custom Integrations page "Our Integration Approach" section
  - **Visual Style:** Cards with numbered steps and interactive glowing border effect (no constellation network connections)

## Constellation Effect

These cards feature a constellation network that connects cards, highlighting relationships when hovering.

- **Component:** `src/components/BenefitsWrapper.tsx` (using BenefitWrapper)
  - **Usage:** Process Automations page "Benefits of Process Automation" section, Custom Integrations page "Common Integration Scenarios" section
  - **Visual Style:** Flex cards with icon on left and content on right, connected by constellation network (without glowing borders)

## Other Service Cards

These cards are used in various other sections of the website not covered by the categories above.

- **Component:** `src/components/ServiceCard.tsx`
  - **Usage:** General-purpose service cards used in other sections
  - **Visual Style:** Cards with glowing edges and proximity-based lighting effects

## Tag Implementation

All service cards have been tagged with:

1. A CSS class name matching their card type
2. A data attribute `data-card-type` with the value matching their card type

This allows for:
- Easy selection via CSS using class names
- Programmatic selection via JavaScript using data attributes
- Potential styling variations based on card type
