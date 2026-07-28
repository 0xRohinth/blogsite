# 🏴‍☠️ 0xRohinth // Hacker & CTF Writeup Static Blog

[![Deploy Blog to GitHub Pages](https://github.com/0xRohinth/blogsite/actions/workflows/deploy.yml/badge.svg)](https://github.com/0xRohinth/blogsite/actions/workflows/deploy.yml)
![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B-00ff9d?style=flat-square&logo=node.js)
![Theme](https://img.shields.io/badge/Theme-Blue%20Team%20Cyan-58a6ff?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)

A lightweight, high-performance static blog generator built with **Node.js**, **Markdown**, and **Dark-Theme CSS**. Specially designed for **Cybersecurity Professionals**, **CTF Players**, and **DevOps Engineers** to write and publish machine walkthroughs with zero framework bloat.

---

## 🌟 Key Features

- 🎯 **CTF Machine Metadata Box**: Automatically formats target specifications (Target IP, OS, Platform, Points, Difficulty Badges).
- 🔍 **Instant Search & Category Filtering**: Client-side instant filtering across titles, tags, and categories (`Web`, `Pwn`, `Reverse`, `Crypto`, `Forensics`, `DevOps`).
- 🖼️ **Image Lightbox Viewer**: Click any screenshot or diagram to view it in high-resolution full-screen modal mode.
- 📋 **One-Click Code Copy**: Embedded copy buttons on all code blocks with toast feedback.
- ⚡ **Zero Heavy Build Frameworks**: Fast, pure Node.js build pipeline powered by `marked` and `gray-matter`.
- 🤖 **GitHub Actions CI/CD**: Automatic build and deployment to **GitHub Pages** whenever you push a markdown file.

---

## 📁 Repository Structure

```text
blogsite/
│
├── posts/                     # Markdown post files (.md)
│   ├── sample-ctf-writeup.md  # Example HTB / CTF walkthrough
│   ├── devops.md              # DevOps security guide
│   └── first-blog.md          # Intro post
│
├── scripts/
│   └── build.js               # Core static generator engine (Markdown -> HTML)
│
├── css/
│   └── main.css               # Cyber dark theme design system
│
├── template.html              # Homepage layout template
├── post-template.html         # Individual writeup page template
│
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions deployment workflow
│
├── index.html                 # Generated homepage
├── package.json               # Dependencies & build scripts
└── README.md                  # Project documentation
```

---

## 🚀 Quick Start (Local Setup)

### 1. Clone the Repository
```bash
git clone https://github.com/0xRohinth/blogsite.git
cd blogsite
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Build the Site
Generate `index.html` and static post HTML pages:
```bash
npm run build
```

Open `index.html` in your browser to view your site locally!

---

## ✍️ How to Write a Post or CTF Walkthrough

Create a new `.md` file inside the `posts/` directory.

### Example CTF Walkthrough (`posts/my-target.md`)

```markdown
---
title: "HackTheBox: Lame Machine Walkthrough"
date: "2026-03-15"
category: "Pwn"
difficulty: "Easy"
platform: "HackTheBox"
os: "Linux"
ip: "10.10.10.3"
points: "20"
tags: ["HackTheBox", "Nmap", "Samba", "Linux"]
image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
summary: "Comprehensive walkthrough of Lame from HackTheBox, exploiting Samba CVE-2007-2447."
---

# Executive Summary

**Lame** is a beginner-friendly Linux machine on HackTheBox requiring enumeration of Samba 3.0.20.

## 1. Enumeration

```bash
nmap -sC -sV 10.10.10.3
```

> [!NOTE]
> Key Findings: Samba 3.0.20 is vulnerable to CVE-2007-2447.
```

### Frontmatter Options

| Field | Description | Example |
| :--- | :--- | :--- |
| `title` | Title of the writeup or article | `"HackTheBox: Lame"` |
| `date` | Date published | `"2026-03-15"` |
| `category` | Category filter | `Web`, `Pwn`, `Reverse`, `Crypto`, `Forensics`, `DevOps` |
| `difficulty` | CTF difficulty rating | `Easy`, `Medium`, `Hard`, `Insane` |
| `platform` | CTF platform or event | `HackTheBox`, `TryHackMe`, `PicoCTF` |
| `os` | Target operating system | `Linux`, `Windows`, `Android` |
| `ip` | Target machine IP address | `"10.10.10.3"` |
| `points` | Challenge point value | `"20"` |
| `tags` | Array of tags | `["Nmap", "Samba"]` |
| `image` | Header image URL | `"https://..."` |

---

## 🌐 Deploying to GitHub Pages

1. Push your repository to GitHub.
2. Go to **Repository Settings** &rarr; **Pages**.
3. Under **Build and deployment**:
   - Set **Source** to **GitHub Actions**.
4. Push any new post to your `main` branch — GitHub Actions will automatically build and publish your site!

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**0xRohinth**  
🎓 Student & Cybersecurity Researcher  
🔗 [GitHub Profile](https://github.com/0xRohinth)
