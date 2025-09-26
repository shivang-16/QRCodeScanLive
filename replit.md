# QR Code Scanner App

## Overview

This is a Next.js-based QR code scanner web application that uses device cameras to scan QR codes in real-time. The app provides a simple, clean interface for users to scan QR codes and view the decoded results immediately. Built with React 19 and Next.js 15, it leverages modern web APIs for camera access and QR code detection.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **Next.js 15 with App Router**: Chosen for its modern React server components, built-in optimization features, and excellent developer experience. The app router provides better routing performance and easier layout management compared to the pages router.

- **React 19**: Utilizes the latest React features including improved concurrent rendering and better TypeScript support for enhanced performance and developer experience.

- **TypeScript**: Provides static type checking to catch errors during development and improve code maintainability. Configured with strict mode for maximum type safety.

### Styling Architecture
- **Tailwind CSS v4**: Modern utility-first CSS framework for rapid UI development. Uses the new PostCSS plugin architecture for better performance and smaller bundle sizes. Configured to scan all app directory files for class usage.

- **Responsive Design**: Mobile-first approach with responsive utilities to ensure the scanner works well across different device sizes.

### Camera and QR Scanning
- **@yudiel/react-qr-scanner**: Dedicated React component for QR code scanning that wraps the browser's media APIs. Chosen for its React-specific optimizations, TypeScript support, and reliable QR code detection algorithms.

- **Camera Constraints**: Configured to prefer the rear-facing camera ('environment') for better QR code scanning experience on mobile devices.

### Component Architecture
- **Client-Side Rendering**: The main scanner component uses 'use client' directive since it requires browser APIs for camera access and real-time scanning.

- **State Management**: Uses React's built-in useState for managing scan results and error states, keeping the architecture simple for this focused use case.

- **Error Handling**: Implements comprehensive error handling for camera permission issues and scanning failures with user-friendly error messages.

### Development Configuration
- **Custom Dev Server**: Configured to run on all network interfaces (0.0.0.0) on port 5000, enabling testing on mobile devices connected to the same network.

- **Path Aliases**: TypeScript configured with '@/*' alias for cleaner imports and better project organization.

## External Dependencies

### Core Framework Dependencies
- **Next.js 15**: React framework for production-ready applications
- **React 19**: JavaScript library for building user interfaces
- **TypeScript**: Static type checking for JavaScript

### Styling Dependencies  
- **Tailwind CSS v4**: Utility-first CSS framework
- **PostCSS**: CSS transformation tool
- **Autoprefixer**: CSS vendor prefix automation

### QR Scanning Dependencies
- **@yudiel/react-qr-scanner**: React-specific QR code scanning component that handles camera access and QR detection

### Development Dependencies
- **@types packages**: TypeScript definitions for Node.js, React, and React DOM

The application is designed to be lightweight and focused, with minimal external dependencies to ensure fast loading times and reliable performance across different devices and network conditions.