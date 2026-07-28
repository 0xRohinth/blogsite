---
title: "Welcome to 0xRohinth's Security & Writeups Blog"
date: "2025-10-13"
category: "Web"
difficulty: "Easy"
platform: "Blog Meta"
tags: ["StaticSite", "NodeJS", "Tailwind", "DarkTheme"]
image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
summary: "An introduction to this minimal, static-built hacker blog engine powered by Node.js and dark theme Tailwind styling."
---

# Welcome to 0xRohinth's Security & Writeups Blog

Welcome to my central knowledge hub for **CTF machine walkthroughs, penetration testing notes, and security research**.

This site is custom-built with a lightweight static generator using **Node.js**, **Markdown**, and a custom **Hacker / CTF Dark Theme**.

---

## 🛠 Features of This Blog

- ⚡ **Ultra Fast Static Build**: Pure Node.js markdown parsing without heavy frameworks.
- 🎯 **CTF Walkthrough Format**: Machine specs, difficulty badges, target IP indicators, and flag notes.
- 🎨 **Dark Theme & Lightbox Images**: Click any screenshot or image to expand it in full high resolution.
- 📋 **Code Snippet Copy Buttons**: Instant copy-paste for commands and scripts.
- 🔍 **Instant Search & Category Filters**: Filter writeups by Web, Pwn, Reverse, Forensics, and difficulty.

---

## 📝 Markdown Structure for Writeups

Writing a new CTF post is as simple as adding a `.md` file to `/posts` with frontmatter:

```markdown
---
title: "Box Name Walkthrough"
date: "2026-03-15"
category: "Pwn"
difficulty: "Medium"
platform: "HackTheBox"
os: "Linux"
ip: "10.10.10.15"
points: "30"
tags: ["Nmap", "PrivEsc"]
---
```

After adding your post, simply run:

```bash
npm run build
```

The script converts your markdown files into clean static HTML pages ready for **GitHub Pages**!