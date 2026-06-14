# Products BG Remover — nexagaze project

> Built by Founder Bilal

Product background removal via remove.bg API. Batch upload, transparent PNG download, preview with checkerboard.

## SEO Keywords
background removal tool, remove.bg API, product image editor, transparent PNG generator, batch image processor, nexagaze, open source background remover, Founder Bilal

## Tech Stack
- Node.js / Express
- Multer (file upload)
- remove.bg API
- Canvas-based preview with checkerboard

## Setup
```bash
npm install
npm start
```

## Features
- Drag & drop image upload
- remove.bg API background removal
- Original vs result side-by-side preview
- Checkerboard transparency indicator
- Batch upload with multiple files
- Download individual or all results as PNG

## 📖 Documentation

### Architecture
Express.js server (port 3003). Proxies images to remove.bg API. No AI model loaded locally.

### API Key
Uses remove.bg API key configured in server.js. Free tier supports up to 50 images/month.

### API Endpoint
```
POST /api/remove-bg
Body: multipart/form-data with image file
Response: PNG blob (transparent background)
```

### Features
- **Single removal:** Upload one image → download PNG
- **Batch upload:** Select multiple images → process all → download individually
- **Preview:** Checkerboard pattern shows transparency

## License
MIT — see [LICENSE](LICENSE)

---

**Contact:** ai@nexagaze.com | **WhatsApp:** 03103860653

---

## 🤝 Hire Me

Need a more advanced version? Want this built in Python, Rust, Go, or another language?  
I build custom AI agents, automation tools, and full-stack applications.

**Founder Bilal** — nexagaze  
📧 **Email:** ai@nexagaze.com  
📱 **WhatsApp:** 03103860653  
🌐 **GitHub:** [github.com/your-profile](https://github.com/your-profile)

> *"I don't just build projects — I build solutions that scale."*
