# Heavenection Web

Next.js company website for Heavenection with a premium dark design and animated storytelling.

## Features

- Animated hero section
- Services showcase
- Platform highlights
- Workflow timeline
- Website enquiry form that posts into the admin inbox
- Mobile navigation
- Railway-ready Next.js deployment

## Run locally

> Requires Node.js 20.9.0 or newer.

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Environment

Set `BACKEND_API_URL` to the Railway backend base URL so the enquiry form can proxy submissions into the admin panel.

## Railway Deploy

This repo includes a `Dockerfile`, so Railway can build the app with Node 20.11.1 and avoid the older npm production install path that emits warnings.
