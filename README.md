# Cross Platform Design System

This is a cross-platform compatible application that showcases and demonstrates cross-platform UI/UX principles, platform-adapttive components and connected user experiences. Aims to create an advanced responsive design that works from mobile to desktop while maitaining design consistency and proper design system documentation for future development or team collaboration. It's also ARIA enabled for screen-readers, aria labels for accessibility.

## Platforms Tested On

This app was tested on iOS (monile and iPad/tablets) and Web (browser).

## Features

- Button System: 3 variants (primary, secondary, ghost) adapted for respective platform conventions
- Input Components: has validation states and platfor-appropriate styling
- Card Components: responsive layouts and content adaption
- Navigation Bar: mobile tabs vs desktop horizontal navigation
- Modal Components: adapted for each platform (bottom sheeet mobile - dialog for web)

Platform-Adaptive Implementations:

- Responsive behavior adapting to mobile(375px) to desktop
  (1200px+)
- Platform Detection: automatically applying appropriate interaction patterns

## Core Connected Features

- Theme Switching: light/dark mode with preference persistence
- Live Component Previewing: showing components responding to themes changes
- Basic Responsive testing: viewport width adjustments
- Cross-platform sync: theme preference between mobile and web

## Tech Stack

- Framework: Expo (latest stable version)
- Language: TypeScript
- Styling: StyleSheet (Skipping NativeWind)
- Navigation: Expo Router with platform-adaptive routing patterns
- Storage: AsyncStorage for user prreferences and theme persistence.
- Animation: React Native Reanimated for smooth cross-platform animations..

## Enhanced Feature

-

## Setup Prject

1. Clone Repop + Install

```bash

git clone https://github.com/VictoriaSavannah-FS/Cross-Platform_DesignSystem.git

cd DesignSystemPortfolio

```

2. Install Dev Dependencies

```bash
npm install
```

3. Run App

- For mobile

```bash
npx start --ios
```

- for Web: `bash npx start --web`
