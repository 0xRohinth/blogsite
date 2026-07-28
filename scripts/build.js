const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

// Directories
const postsDir = path.join(__dirname, '../posts');
const outputDir = path.join(__dirname, '../');
const templatePath = path.join(__dirname, '../template.html');
const postTemplatePath = path.join(__dirname, '../post-template.html');

// Read main templates
const mainTemplate = fs.readFileSync(templatePath, 'utf-8');
const postTemplate = fs.readFileSync(postTemplatePath, 'utf-8');

// Custom marked renderer for Code Blocks and Images
const renderer = new marked.Renderer();

renderer.code = function (code, language) {
  const validLang = language || 'code';
  // Escape html in code
  const escapedCode = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  return `
  <div class="code-wrapper">
    <div class="code-wrapper-header">
      <span class="font-mono text-xs text-cyan-400">${validLang.toUpperCase()}</span>
      <button class="copy-btn" onclick="copyCode(this)">COPY</button>
    </div>
    <pre><code class="language-${validLang}">${escapedCode}</code></pre>
  </div>`;
};

renderer.image = function (href, title, text) {
  const titleAttr = title ? `title="${title}"` : '';
  const altAttr = text ? `alt="${text}"` : 'alt="Walkthrough image"';
  return `
  <div class="my-6">
    <img src="${href}" ${altAttr} ${titleAttr} loading="lazy" onclick="openLightbox(this.src)" class="rounded-lg border border-slate-700 hover:border-cyan-400 cursor-pointer shadow-lg transition-all duration-200" />
    ${text ? `<div class="img-caption">${text}</div>` : ''}
  </div>`;
};

marked.setOptions({
  renderer: renderer,
  breaks: true,
  gfm: true
});

// Read all markdown files
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

const postsData = [];

files.forEach(file => {
  const filePath = path.join(postsDir, file);
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  
  // Parse frontmatter
  const { data, content } = matter(rawContent);

  // Fallback defaults for metadata
  const slug = file.replace(/\.md$/, '');
  const title = data.title || content.split('\n').find(l => l.startsWith('# '))?.replace(/^# /, '').trim() || slug;
  
  let formattedDate = 'Recent';
  if (data.date) {
    try {
      const d = new Date(data.date);
      formattedDate = d.toISOString().split('T')[0];
    } catch (e) {
      formattedDate = String(data.date);
    }
  } else {
    formattedDate = new Date(fs.statSync(filePath).mtime).toISOString().split('T')[0];
  }

  const category = data.category || data.tag || 'General';
  const difficulty = (data.difficulty || 'Easy').toLowerCase(); // easy, medium, hard, insane
  const platform = data.platform || 'Walkthrough';
  const os = data.os || '';
  const ip = data.ip || '';
  const points = data.points || '';
  const image = data.image || '';
  const summary = data.summary || content.slice(0, 160).replace(/[#*`_~]/g, '').trim() + '...';
  const tags = Array.isArray(data.tags) ? data.tags : (data.tag ? [data.tag] : ['CTF']);

  // Calculate estimated reading time
  const wordCount = content.trim().split(/\s+/).length;
  const readTime = `${Math.max(1, Math.ceil(wordCount / 180))} min read`;

  // Render markdown HTML
  const htmlContent = marked.parse(content);

  // Generate CTF Machine Specs box if specs exist
  let specsHtml = '';
  if (ip || os || points || platform) {
    specsHtml = `
    <div class="ctf-specs-grid">
      ${platform ? `<div class="ctf-spec-item"><span class="ctf-spec-label">PLATFORM</span><span class="ctf-spec-value">${platform}</span></div>` : ''}
      ${os ? `<div class="ctf-spec-item"><span class="ctf-spec-label">OPERATING SYSTEM</span><span class="ctf-spec-value">${os}</span></div>` : ''}
      ${ip ? `<div class="ctf-spec-item"><span class="ctf-spec-label">TARGET IP</span><span class="ctf-spec-value text-cyan-400">${ip}</span></div>` : ''}
      ${points ? `<div class="ctf-spec-item"><span class="ctf-spec-label">POINTS</span><span class="ctf-spec-value text-emerald-400">${points}</span></div>` : ''}
      ${difficulty ? `<div class="ctf-spec-item"><span class="ctf-spec-label">DIFFICULTY</span><span class="ctf-spec-value"><span class="cyber-badge badge-diff-${difficulty}">${difficulty}</span></span></div>` : ''}
    </div>`;
  }

  // Generate Tags HTML
  const tagsHtml = tags.map(t => `<span class="category-tag">#${t}</span>`).join(' ');

  // Hero image HTML inside post if image is present
  const heroImageHtml = image ? `
  <div class="mb-8 rounded-lg overflow-hidden border border-slate-700 shadow-xl">
    <img src="${image}" alt="${title}" onclick="openLightbox(this.src)" class="w-full h-64 md:h-80 object-cover cursor-pointer hover:scale-105 transition-transform duration-300" />
  </div>` : '';

  // Build post HTML
  const postHtml = postTemplate
    .replace(/<!-- POST_TITLE -->/g, title)
    .replace(/<!-- POST_DATE -->/g, formattedDate)
    .replace(/<!-- POST_CATEGORY -->/g, category)
    .replace(/<!-- POST_DIFFICULTY -->/g, difficulty)
    .replace(/<!-- POST_READ_TIME -->/g, readTime)
    .replace('<!-- POST_SPECS -->', specsHtml)
    .replace('<!-- HERO_IMAGE -->', heroImageHtml)
    .replace('<!-- POST_TAGS -->', tagsHtml)
    .replace('<!-- POST_CONTENT -->', htmlContent);

  // Save the post HTML
  const outputFilePath = path.join(outputDir, `${slug}.html`);
  fs.writeFileSync(outputFilePath, postHtml);

  // Collect metadata for homepage index
  postsData.push({
    title,
    date: formattedDate,
    category,
    difficulty,
    platform,
    readTime,
    summary,
    tags,
    image,
    link: `${slug}.html`
  });
});

// Sort posts by date descending
postsData.sort((a, b) => new Date(b.date) - new Date(a.date));

// Generate post cards for index.html
const blogCardsHtml = postsData.map(post => `
  <article class="cyber-card p-6 flex flex-col justify-between" data-category="${post.category.toLowerCase()}" data-difficulty="${post.difficulty.toLowerCase()}" data-search="${(post.title + ' ' + post.summary + ' ' + post.tags.join(' ')).toLowerCase()}">
    <div>
      ${post.image ? `
      <div class="mb-4 h-40 rounded overflow-hidden border border-slate-800">
        <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>` : ''}
      <div class="flex items-center justify-between gap-2 mb-3">
        <span class="category-tag">${post.category}</span>
        <span class="cyber-badge badge-diff-${post.difficulty}">${post.difficulty}</span>
      </div>
      <h2 class="text-xl font-bold text-white mb-2 hover:text-cyan-400 transition-colors">
        <a href="${post.link}">${post.title}</a>
      </h2>
      <p class="text-slate-400 text-sm mb-4 line-clamp-3">${post.summary}</p>
    </div>
    <div>
      <div class="flex flex-wrap gap-1 mb-4">
        ${post.tags.map(t => `<span class="text-xs text-slate-500 font-mono">#${t}</span>`).join(' ')}
      </div>
      <div class="flex justify-between items-center pt-3 border-t border-slate-800 text-xs text-slate-400 font-mono">
        <span>${post.date}</span>
        <a href="${post.link}" class="text-cyan-400 hover:text-emerald-400 flex items-center gap-1 font-semibold">
          Read Writeup &rarr;
        </a>
      </div>
    </div>
  </article>
`).join('\n');

// Unique Categories & Stats
const categories = [...new Set(postsData.map(p => p.category))];
const statsHtml = `
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-lg text-center">
      <div class="text-xs font-mono text-slate-400 uppercase">TOTAL WRITEUPS</div>
      <div class="text-2xl font-mono font-bold text-cyan-400 mt-1">${postsData.length}</div>
    </div>
    <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-lg text-center">
      <div class="text-xs font-mono text-slate-400 uppercase">CATEGORIES</div>
      <div class="text-2xl font-mono font-bold text-emerald-400 mt-1">${categories.length}</div>
    </div>
    <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-lg text-center">
      <div class="text-xs font-mono text-slate-400 uppercase">THEME</div>
      <div class="text-2xl font-mono font-bold text-purple-400 mt-1">DARK // CYBER</div>
    </div>
    <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-lg text-center">
      <div class="text-xs font-mono text-slate-400 uppercase">STATUS</div>
      <div class="text-2xl font-mono font-bold text-green-400 mt-1">ONLINE &#9679;</div>
    </div>
  </div>`;

// Insert into homepage template
const finalIndex = mainTemplate
  .replace('<!-- STATS_HERE -->', statsHtml)
  .replace('<!-- BLOG_POSTS_HERE -->', blogCardsHtml)
  .replace('/* POSTS_JSON_DATA */', JSON.stringify(postsData));

// Write index.html
fs.writeFileSync(path.join(outputDir, 'index.html'), finalIndex);

console.log(`Build complete! Processed ${files.length} markdown post(s).`);
