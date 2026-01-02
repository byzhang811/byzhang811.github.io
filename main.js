// main.js

document.addEventListener('DOMContentLoaded', () => {
  safeRun(renderSidebar);

  if (document.getElementById('home-content')) safeRun(renderHome);

  // List pages
  if (document.getElementById('research-list')) safeRun(renderResearch);
  if (document.getElementById('pub-list')) safeRun(renderPublications);

  // Detail pages
  if (document.getElementById('rtds-detail-page')) safeRun(renderRTDSDetail);
  if (document.getElementById('research-detail-page')) safeRun(renderResearchDetail);

  // New pages
  if (document.getElementById('news-list')) safeRun(renderNews);

  // AboutMe (support both ids)
  if (document.getElementById('aboutme-content') || document.getElementById('mylife-content')) {
    safeRun(renderAboutMe);
  }
});

function safeRun(fn) {
  try { fn(); } catch (e) { console.error(`[main.js] ${fn.name} failed:`, e); }
}

/* =========================
   Sidebar
========================= */
function renderSidebar() {
  const container = document.getElementById('sidebar-container');
  if (!container || typeof sidebarData === 'undefined') return;

  const sb = sidebarData;
  const listHtml = sb.infoList.map(item => {
    const content = item.link
      ? `<a href="${item.link}" target="_blank" rel="noopener">${item.text}</a>`
      : item.text;
    return `<li><i class="${item.icon}"></i> ${content}</li>`;
  }).join('');

  container.innerHTML = `
    <img src="${sb.image}" alt="${sb.name}" class="profile-img">
    <div class="sidebar-name">${sb.name}</div>
    <div class="sidebar-title">${sb.title}</div>
    <div class="sidebar-school">${sb.prev_edu}</div>
    <ul class="sidebar-info">${listHtml}</ul>
  `;
}

/* =========================
   Research list
========================= */
function renderResearch() {
  const container = document.getElementById('research-list');
  if (!container || typeof researchData === 'undefined') return;

  container.className = "pub-grid";

  container.innerHTML = researchData.map(item => `
    <a href="${item.detailUrl}" class="pub-card">
      <div class="pub-img-wrapper">
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="pub-content">
        <div class="pub-title">${item.title}</div>
        <div class="pub-meta">
          ${item.role} <br>
          ${item.meta} | ${item.time}
        </div>
        <div class="pub-keywords">
          ${(item.keywords || []).map(k => `<span class="keyword-tag">${k}</span>`).join('')}
        </div>
      </div>
    </a>
  `).join('');
}

/* =========================
   Publications list
========================= */
function renderPublications() {
  const container = document.getElementById('pub-list');
  if (!container || typeof pubData === 'undefined') return;

  container.className = "pub-grid";

  container.innerHTML = pubData.map(pub => `
    <a href="${pub.detailUrl}" class="pub-card">
      <div class="pub-img-wrapper">
        <img src="${pub.image}" alt="${pub.title}">
      </div>
      <div class="pub-content">
        <div class="pub-title">${pub.title}</div>
        <div class="pub-meta">
          ${pub.authors} <br>
          ${pub.venue}, ${pub.year}
        </div>
        <div class="pub-keywords">
          ${(pub.keywords || []).map(k => `<span class="keyword-tag">${k}</span>`).join('')}
        </div>
      </div>
    </a>
  `).join('');
}

/* =========================
   Home
========================= */
function renderHome() {
  if (typeof homeData === 'undefined') return;
  const h = homeData;

  document.getElementById('home-name').innerText = `${h.header.name} ${h.header.name_cn || ''}`;
  document.getElementById('home-title').innerText = h.header.title;
  document.getElementById('home-dept').innerText = h.header.department;
  document.getElementById('home-bio').innerHTML = h.header.bio.map(p => `<p>${p}</p>`).join('');

  document.getElementById('interests-list').innerText = (h.interests || []).join(', ');

  document.getElementById('edu-list').innerHTML = (h.education || []).map((edu, i) => `
    <li>
      <div class="list-header">(${i + 1}) ${edu.period}: ${edu.school}</div>
      <ul class="bullet-list">
        <li><strong>${edu.degree}</strong></li>
        <li>${edu.advisor}</li>
        ${(edu.details || []).map(d => `<li>${d}</li>`).join('')}
      </ul>
    </li>
  `).join('');

  document.getElementById('work-list').innerHTML = (h.work || []).map((w, i) => `
    <li>
      <div class="list-header">(${i + 1}) ${w.period}: ${w.company}</div>
      <div class="list-sub">${w.role}</div>
      <ul class="bullet-list">
        ${(w.details || []).map(d => `<li>${d}</li>`).join('')}
      </ul>
    </li>
  `).join('');

  document.getElementById('honor-list').innerHTML = (h.honors || []).map(item => `<li>${item}</li>`).join('');
  document.getElementById('footer-note').innerText = h.footer.text;
  document.getElementById('btn-cv').href = h.footer.cvLink;
}

/* =========================
   Detail pages
========================= */
function renderRTDSDetail() {
  if (typeof rtdsData === 'undefined') return;
  fillDetailPage(rtdsData);
}

function renderResearchDetail() {
  if (typeof projectData === 'undefined') return;
  fillDetailPage(projectData);
}

/* =========================
   Helpers for Detail Page
========================= */
function buildMetaHTML(d) {
  if (d.metaInfo && String(d.metaInfo).trim()) return d.metaInfo;

  const lines = [];
  if (d.authors) lines.push(d.authors);

  const venueParts = [];
  if (d.venue) venueParts.push(d.venue);
  if (d.year) venueParts.push(String(d.year));
  if (d.status) venueParts.push(String(d.status));
  if (venueParts.length) lines.push(venueParts.join(" | "));

  return lines.join("<br>");
}

function isGithubLink(link) {
  const t = (link.text || "").toLowerCase();
  const u = (link.url || "").toLowerCase();
  const i = (link.icon || "").toLowerCase();
  return t.includes("github") || u.includes("github.com") || i.includes("github");
}

function renderFigureBlock({ src = "", caption = "", alt = "", label = "Figure" }) {
  const safeSrc = (src || "").trim();
  const safeCap = (caption || "").trim();
  const safeAlt = (alt || "").trim();

  return `
    <div class="detail-fig-box">
      <div class="fig-wrap">
        <img ${safeSrc ? `src="${safeSrc}"` : `src=""`} alt="${safeAlt}">
        <div class="figure-placeholder" aria-label="Figure placeholder">${label}</div>
      </div>
      ${safeCap ? `<p class="fig-caption">${safeCap}</p>` : `<p class="fig-caption"></p>`}
    </div>
  `;
}

function fillDetailPage(d) {
  const titleEl = document.getElementById('p-title');
  const metaEl = document.getElementById('p-meta');
  const linksEl = document.getElementById('p-links');
  const absEl = document.getElementById('p-abstract');
  const imgEl = document.getElementById('p-img');
  const capEl = document.getElementById('p-caption');
  const detailsContainer = document.getElementById('p-more-details');

  if (titleEl) titleEl.innerText = d.title || '';
  if (metaEl) metaEl.innerHTML = buildMetaHTML(d);

  const links = Array.isArray(d.links) ? d.links : [];
  const linksHtml = links.map(link => {
    const extraClass = isGithubLink(link) ? 'btn-github' : '';
    const url = link.url || '#';
    const icon = link.icon || '';
    const text = link.text || '';
    return `
      <a href="${url}" class="btn-link ${extraClass}" target="_blank" rel="noopener">
        ${icon ? `<i class="${icon}"></i>` : ''} ${text}
      </a>
    `;
  }).join('');

  if (linksEl) {
    linksEl.innerHTML = linksHtml;
    linksEl.style.display = linksHtml ? '' : 'none';
  }

  if (absEl) absEl.innerHTML = d.abstract || '';

  if (imgEl) {
    imgEl.removeAttribute('src');
    imgEl.setAttribute('src', '');
    imgEl.setAttribute('alt', '');
  }
  if (capEl) capEl.innerText = '';

  const mainSrc = (d.figure && d.figure.src) ? String(d.figure.src).trim() : '';
  const mainCap = (d.figure && d.figure.caption) ? String(d.figure.caption).trim() : '';
  const mainAlt = (d.figure && d.figure.alt) ? String(d.figure.alt).trim() : '';

  if (mainSrc && imgEl) imgEl.src = mainSrc;
  if (capEl) capEl.innerText = mainCap || '';
  if (imgEl) imgEl.alt = mainAlt || '';

  if (!detailsContainer) return;

  const details = Array.isArray(d.details) ? d.details : [];
  let html = '';
  let inList = false;

  const closeListIfNeeded = () => {
    if (inList) {
      html += `</ul>`;
      inList = false;
    }
  };

  details.forEach((item) => {
    if (!item) return;

    const type = item.type;
    const content = item.content || '';

    if (type === 'li') {
      if (!inList) {
        html += `<ul class="bullet-list">`;
        inList = true;
      }
      html += `<li>${content}</li>`;
      return;
    } else {
      closeListIfNeeded();
    }

    if (type === 'h3') html += `<h3>${content}</h3>`;
    else if (type === 'h4') html += `<h4>${content}</h4>`;
    else if (type === 'h5') html += `<h5>${content}</h5>`;
    else if (type === 'p') html += `<p>${content}</p>`;
    else if (type === 'html') html += (item.content || '');
    else if (type === 'img') {
      html += renderFigureBlock({
        src: item.src || '',
        caption: item.caption || '',
        alt: item.alt || 'Figure',
        label: item.label || 'Figure'
      });
    }
  });

  closeListIfNeeded();
  detailsContainer.innerHTML = html;
}

/* =========================
   News
========================= */
function parseISODate(s) {
  const str = String(s || "").trim();
  const m = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return null;
  const y = parseInt(m[1], 10);
  const mo = parseInt(m[2], 10) - 1;
  const d = parseInt(m[3], 10);
  return new Date(y, mo, d);
}

function monthNameFull(monthIndex0) {
  const names = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  return names[monthIndex0] || "";
}

function formatNewsDate(iso) {
  const dt = parseISODate(iso);
  if (!dt) return "";
  const m = monthNameFull(dt.getMonth());
  const day = String(dt.getDate()).padStart(2, "0");
  return `${m} ${day}`;
}

function renderNews() {
  const container = document.getElementById('news-list');
  if (!container || typeof newsData === 'undefined') return;

  const items = Array.isArray(newsData) ? [...newsData] : [];

  items.sort((a, b) => {
    const da = parseISODate(a.date);
    const db = parseISODate(b.date);
    return (db?.getTime() || 0) - (da?.getTime() || 0);
  });

  const groups = new Map();
  items.forEach(it => {
    const dt = parseISODate(it.date);
    if (!dt) return;
    const y = dt.getFullYear();
    if (!groups.has(y)) groups.set(y, []);
    groups.get(y).push(it);
  });

  const years = Array.from(groups.keys()).sort((a, b) => b - a);

  container.innerHTML = years.map(year => {
    const yearItems = groups.get(year) || [];

    const listHtml = yearItems.map(it => {
      const dateLabel = formatNewsDate(it.date);
      const text = it.text || "";

      const imgs = Array.isArray(it.images) ? it.images : [];
      const photosHtml = imgs.length ? `
        <div class="news-photos">
          ${imgs.map((im, idx) => {
            const src = (im && im.src) ? String(im.src).trim() : "";
            const alt = (im && im.alt) ? im.alt : `Photo ${idx + 1}`;
            return src
              ? `<img src="${src}" alt="${alt}">`
              : ``;
          }).join("")}
        </div>
      ` : "";

      return `
        <li>
          <span class="news-date">[${dateLabel}]</span>${text}
          ${photosHtml}
        </li>
      `;
    }).join("");

    return `
      <div class="news-year-block">
        <div class="news-year">${year}</div>
        <hr class="news-divider">
        <ul class="news-list">
          ${listHtml}
        </ul>
      </div>
    `;
  }).join('');
}

/* =========================
   AboutMe — robust + no placeholders
========================= */
function getAboutMeData() {
  // ✅ accept multiple names to avoid you being stuck on one variable name
  return (typeof aboutmeData !== "undefined" && aboutmeData)
      || (typeof mylifeData !== "undefined" && mylifeData)
      || (typeof AboutMeData !== "undefined" && AboutMeData)
      || null;
}

function renderAboutMe() {
  const container =
    document.getElementById('aboutme-content') ||
    document.getElementById('mylife-content');

  if (!container) return;

  const d = getAboutMeData();
  if (!d) {
    container.innerHTML = `
      <p style="color:#b00020; font-weight:700; margin:0;">
        AboutMe data not loaded.
      </p>
      <p style="color:#555; margin-top:8px;">
        Fix: make sure your page includes <code>aboutme_data.js</code> BEFORE <code>main.js</code>,
        and the file defines <code>const aboutmeData = {...}</code> (or <code>mylifeData</code>).
      </p>
    `;
    return;
  }

  const introHtml = Array.isArray(d.intro)
    ? `<div class="about-intro">${d.intro.map(p => `<p>${p}</p>`).join("")}</div>`
    : "";

  const sections = Array.isArray(d.sections) ? d.sections : [];

  container.innerHTML = `
    ${introHtml}
    ${sections.map(sec => renderAboutSection(sec)).join("")}
  `;
}

function renderAboutSection(sec) {
  const title = sec.title || "";
  const desc = (sec.desc || "").trim();
  const subtitle = (sec.subtitle || "").trim();
  const media = Array.isArray(sec.media) ? sec.media : [];

  const mediaHtml = media
    .filter(m => m && String(m.src || "").trim() !== "")
    .map(m => renderAboutMediaItem(m))
    .join("");

  return `
    <div class="about-section">
      <h3>${title}</h3>
      ${desc ? `<p class="about-desc">${desc}</p>` : ``}
      ${subtitle ? `<div class="section-subtitle">${subtitle}</div>` : ``}
      ${mediaHtml ? `<div class="media-stack">${mediaHtml}</div>` : ``}
    </div>
  `;
}

function renderAboutMediaItem(m) {
  const type = (m.type || "img").toLowerCase();
  const src = String(m.src || "").trim();
  if (!src) return "";

  const title = (m.title || "").trim();
  const text = (m.text || "").trim();

  let visual = "";

  if (type === "video") {
    const poster = String(m.poster || "").trim();
    visual = `
      <div class="media-visual">
        <video controls playsinline ${poster ? `poster="${poster}"` : ""}>
          <source src="${src}">
        </video>
      </div>
    `;
  } else if (type === "embed") {
    const iframeTitle = m.alt || title || "Embed";
    visual = `
      <div class="media-visual">
        <iframe
          src="${src}"
          title="${iframeTitle}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    `;
  } else {
    const alt = m.alt || title || "Photo";
    visual = `
      <div class="media-visual">
        <img src="${src}" alt="${alt}" loading="lazy">
      </div>
    `;
  }

  return `
    <div class="media-block">
      ${visual}
      ${title ? `<div class="media-title">${title}</div>` : ``}
      ${text ? `<p class="media-text">${text}</p>` : ``}
    </div>
  `;
}
