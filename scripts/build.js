const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Directories
const postsDir = path.join(__dirname, '../posts');
const outputDir = path.join(__dirname, '../');
const templatePath = path.join(__dirname, '../template.html');
const postTemplatePath = path.join(__dirname, '../post-template.html');

// Read main templates
const mainTemplate = fs.readFileSync(templatePath, 'utf-8');
const postTemplate = fs.readFileSync(postTemplatePath, 'utf-8');

// Make sure marked allows proper HTML output
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Read all markdown files
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

// Store post metadata for index
const postsData = [];

files.forEach(file => {
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Extract metadata (title, date)
  const titleLine = lines.find(l => l.startsWith('# ')) || 'Untitled Post';
  const title = titleLine.replace(/^# /, '').trim();
  const date = new Date(fs.statSync(filePath).mtime).toLocaleDateString();

  // Convert markdown to HTML
  const htmlContent = marked.parse(content);

  // Build post HTML
  const postHtml = postTemplate
    .replace(/<!-- POST_TITLE -->/g, title)
    .replace(/<!-- POST_DATE -->/g, date)
    .replace('<!-- POST_CONTENT -->', htmlContent);

  // Save the individual post
  const slug = file.replace(/\.md$/, '');
  const outputFilePath = path.join(outputDir, `${slug}.html`);
  fs.writeFileSync(outputFilePath, postHtml);

  // Push metadata for index
  postsData.push({
    title,
    date,
    link: `${slug}.html`
  });
});

// Generate blog cards for homepage
const blogCardsHtml = postsData
  .map(post => `
  <article class="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 hover:shadow-xl transition-shadow">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      <a href="${post.link}" class="hover:underline">${post.title}</a>
    </h2>
    <p class="text-gray-500 dark:text-gray-400 text-sm mb-3">${post.date}</p>
    <a href="${post.link}" class="text-indigo-600 dark:text-indigo-400 hover:underline">Read more →</a>
  </article>
`).join('\n');

// Insert into main template
const finalIndex = mainTemplate.replace('<!-- BLOG_POSTS_HERE -->', blogCardsHtml);

// Write index.html
fs.writeFileSync(path.join(outputDir, 'index.html'), finalIndex);

console.log(`Build complete! ${files.length} post(s) processed.`);
