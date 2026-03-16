# secpwd

**English** | [中文](./README.zh-CN.md)

A lightweight front-end password derivation tool. You can generate strong, copyable passwords either from a "master password + helper password" pair or directly from a `SecKey`, making it suitable for self-hosted static deployment.

## Features

- Pure static page, no backend required
- Supports both "dual-password" mode and "secure key" mode
- Supports custom symbols in password generation
- Adjustable output password length
- One-click copy for generated `Key` and password
- Responsive layout optimized for mobile access

## Project Structure

```text
.
├── index.html              # Page structure and styles
├── sec.js                  # Password generation logic
├── static/                 # Front-end dependencies
├── CNAME                   # GitHub Pages domain config
├── LICENSE
└── README.md
```

## How It Works

The current implementation derives passwords entirely in the browser:

1. The master password and helper password are processed with MD5
2. Intermediate values are combined through AES and then hashed with SHA256 to produce a `SecKey`
3. The final password is derived from that `SecKey`
4. The UI shows one primary result and several alternatives for convenience

`sec.js` also keeps a placeholder for remote API usage, so you can swap the local derivation flow for your own backend if needed.

## Run Locally

This is a static site, so any static file server will work.

### Option 1: Python

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

### Option 2: Node.js

If you already use `serve`:

```bash
npx serve .
```

## Usage

### Dual-Password Mode

- Master password: enter a password only you know and can remember consistently
- Helper password: enter a target-specific label such as `github`, `mail`, or `@example.com`
- The page generates a `SecKey` and the derived password automatically

### Secure Key Mode

- Enter a `SHA256` value directly as the `SecKey`
- The page derives passwords from that key

### Symbols

- Enable symbol-based password generation
- Enter the symbols you want to allow, such as `!@#$%^&*`

### Password Length

- Use the slider in the UI to control the displayed password length
- Supported range: `6` to `32`

## Mobile Optimization

The responsive update includes:

- Added a `viewport` meta tag for proper mobile rendering
- Improved spacing and layout for forms, tabs, and result sections
- Converted the result table into stacked cards on small screens to avoid horizontal overflow
- Improved tap targets for copy buttons and the length slider

## Deployment

This project works well on any static hosting platform, including:

- GitHub Pages
- Vercel
- Netlify
- Nginx static hosting

If you already use GitHub Pages, just push the updated files to the configured branch.

## Security Notes

- This repository uses a client-side derivation flow, so the core logic is visible in the browser
- If you need stronger control, move the generation flow to your own backend API
- Do not enter your real master password on an untrusted third-party deployment
