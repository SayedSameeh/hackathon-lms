# Hackathon LMS

An AI-powered Learning Management System developed and customized by our team for a hackathon.

## About

This project is a customized and extended version of the LMS SaaS application originally created by **Adrian Hajdin / JavaScript Mastery**.

We cloned the original open-source repository as our starting point and have since configured, integrated, and modified the project to fit our hackathon requirements.

Our goal is to use the existing LMS foundation while adding our own functionality, integrations, database configuration, and project-specific features.

## Original Project

The project was originally created by **Adrian Hajdin / JavaScript Mastery**.

Original repository:

https://github.com/adrianhajdin/saas-app

The original project provides the foundation for the LMS interface, application architecture, and several of the existing learning features.

We acknowledge and credit the original creators for their work.

## Our Contributions

Our team has configured and extended the original project for this hackathon.

Current additions and configuration include:

* Supabase database integration and schema configuration
* Clerk authentication
* Clerk billing and access control
* Vapi voice AI integration
* Sentry error tracking and monitoring
* Environment configuration for the required services
* Custom database records and learning content
* Project-specific UI and functionality
* Additional features developed as part of the hackathon

Further functionality will be added and documented as development continues.

## Tech Stack

* **Next.js** - Application framework
* **TypeScript** - Programming language
* **Supabase** - PostgreSQL database and backend services
* **Clerk** - Authentication and user management
* **Vapi** - Voice AI
* **Sentry** - Error tracking and monitoring
* **Tailwind CSS** - Styling
* **shadcn/ui** - UI components
* **Zod** - Schema validation

## Features

### Learning

* AI-powered learning companions
* Subject and topic based learning
* Interactive learning sessions
* Custom learning companions
* Session history
* Bookmarks
* Search and filtering

### Authentication

* User registration and login
* Secure authentication through Clerk
* User-specific learning data

### Voice AI

* Voice-based AI learning sessions
* Conversational interaction with AI tutors
* Vapi-powered voice agents

### Platform

* Responsive user interface
* Supabase database
* Subscription and access management
* Error monitoring with Sentry

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Git
* Node.js
* npm

### 1. Clone the Repository

```bash
git clone https://github.com/SayedSameeh/hackathon-lms.git
cd hackathon-lms
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root.

Use `.env.example` as a reference for the required environment variables.

You will need credentials/configuration for:

* Clerk
* Supabase
* Vapi
* Sentry

Do not commit `.env.local` or any file containing private credentials to GitHub.

### 4. Run the Development Server

```bash
npm run dev
```

Open the application at:

http://localhost:3000

## Project Structure

```text
hackathon-lms/
├── app/                    # Next.js application routes and pages
├── components/             # Reusable UI components
├── constants/              # Application constants
├── lib/                    # Database, authentication, and application logic
├── public/                 # Static assets
├── types/                  # TypeScript types
├── .env.example            # Environment variable template
├── middleware.ts           # Authentication middleware
├── next.config.ts          # Next.js configuration
└── package.json            # Project dependencies and scripts
```

## Development

This repository is being actively developed as part of a hackathon project.

The original LMS implementation serves as the foundation, while our team is responsible for the configuration, integrations, modifications, and additional features being developed for this version.

## Credits

### Original Project

**Adrian Hajdin / JavaScript Mastery**

Original repository:

https://github.com/adrianhajdin/saas-app

We thank the original creator and contributors for providing the project that we used as the foundation for this hackathon application.

### Third-Party Technologies

This project also uses several third-party services and open-source technologies, including:

* Next.js
* TypeScript
* Supabase
* Clerk
* Vapi
* Sentry
* Tailwind CSS
* shadcn/ui
* Zod

Each technology remains subject to its respective license and terms.

## License

This repository contains code derived from the original project referenced above.

Please refer to the original repository and its applicable license/terms before redistributing this project or its derivative works.

Our team's original modifications and additions are intended for this hackathon project.
