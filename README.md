# 📝 Static Markdown Blog Generator (Node.js + TailwindCSS)

A **minimal, fast, and fully customizable static blog generator** built using **Node.js**, **Markdown**, and **TailwindCSS** — no frameworks, no bloat.  
Just write your posts in `.md`, run one command, and your clean static site is ready 🚀

---

## 🌟 Features

- ⚡ **Lightweight & Fast** — Pure Node.js script, no build frameworks
    
- 🧠 **Front Matter Support** (`title`, `date`, `image`, `tags`)
    
- 🎨 **TailwindCSS Styling** — Beautiful responsive layouts out of the box
    
- 🌓 **Dark/Light Theme Toggle** with localStorage memory
    
- 🗂️ **Auto-generated Index Page** — Lists posts with images, dates, and tags
    
- 🧩 **Customizable Templates** — Edit HTML & Tailwind styles easily
    

---

## 📁 Folder Structure

```
blog-site/
│
├── posts/                     # Your markdown posts (.md)
│   ├── first-post.md
│   ├── second-post.md
│
├── scripts/
│   └── build.js               # Main build script (Markdown → HTML)
│
├── template.html              # Homepage template
├── post-template.html         # Individual post template
│
├── index.html                 # Auto-generated after build
├── package.json               # Dependencies (optional)
└── README.md

```
---

## ✍️ Example Post File

Save inside `posts/first-post.md`

```
---
title: "My First Blog Post"
date: "2025-10-13"
image: "https://picsum.photos/800/400"
tags: ["project", "update", "blog"]
---

# Welcome to my **first blog post**!  
This site is powered by a custom static generator built with Node.js and TailwindCSS.

```
---

## 🛠️ What’s Inside?

- Markdown → HTML conversion via **Marked.js**
- Front Matter parsing via **gray-matter**
- Responsive Tailwind layout
- Automatic dark mode toggle

---

Run the build script to generate your pages:

```bash
node scripts/build.js

```

---  
## ⚙️ Installation & Setup  
### 1️⃣ Clone the Repository  
```bash
 git clone https://github.com/0xRohinth/commit-to-word.git cd commit-to-word
```

### 2️⃣ Install Dependencies

```
npm init -y 
npm install gray-matter marked
npm install -D @tailwindcss/typography
```

### 3️⃣ Add Your Posts

Create `.md` files in the `posts/` folder with front matter metadata.

### 4️⃣ Build the Site

`node scripts/build.js`

✅ This generates:

- `index.html` → Homepage with all post previews
    
- `your-post.html` → One page per post
    

---

## 🧩 Customization

### 🎨 Edit Templates

|Template File|Description|
|---|---|
|`template.html`|Homepage layout (index)|
|`post-template.html`|Individual post layout|

#### Available Placeholders:

|Placeholder|Description|
|---|---|
|`{{title}}`|Post title|
|`{{date}}`|Post date|
|`{{image}}`|Featured image|
|`{{tags}}`|Tags as badges|
|`{{content}}`|Markdown-rendered HTML|

---

## 🧠 How It Works

1. The script reads all `.md` files from `/posts`
    
2. Extracts metadata using **gray-matter**
    
3. Converts Markdown to HTML using **marked**
    
4. Fills the templates with the extracted data
    
5. Writes:
    
    - A full HTML page per post
        
    - A combined homepage (`index.html`) listing all posts
        

---

## 🖼️ Example Output

### ✅ Home Page

Displays:

- Post image thumbnail
    
- Title & date
    
- Tags as badges
    
- Read more → links to post page
    

### ✅ Post Page

Includes:

- Hero image
    
- Title, date, tags
    
- Markdown-rendered article
    

---

## 🛠️ Scripts

|Command|Description|
|---|---|
|`node scripts/build.js`|Build the site manually|
|`npm run build`|(optional) if added in package.json|

---

## 📦 Example `package.json

```json
{
  "name": "blog-site",
  "version": "1.0.0",
  "main": "scripts/build.js",
  "scripts": {
    "build": "node scripts/build.js"
  },
  "dependencies": {
    "gray-matter": "^4.0.3",
    "marked": "^11.1.0"
  }
}

```

---

## 🚀 Deployment

Your output is **100% static HTML** — you can deploy it anywhere!

- **GitHub Pages**
    
    - Push to a repo and enable Pages → “Deploy from branch”
        
- **Netlify / Vercel**
    
    - Drag & drop your folder or connect your repo
        

---

## 🧩 Future Roadmap

-  Excerpts or Previews for index
    
-  Tag-based post filtering
    
-  Pagination for posts
    
-  RSS Feed generation
    
-  Sitemap.xml builder
    

---

## 👨‍💻 Author

**Rohit Rathna**  
🎓 Student & Cybersecurity Enthusiast  
🔗 [GitHub Profile](https://github.com/0xRohinth)  
💬 Building this blog generator as part of my learning journey!

---

## 📄 License

MIT License © 2025 — Free to use, modify, and share.

---
