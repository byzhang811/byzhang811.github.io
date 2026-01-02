// contact_data.js
const contactData = {
  intro: [
    "The easiest way to reach me is email.",
    "For casual updates, you can also find me on the platforms below."
  ],
  items: [
    {
      key: "email",
      icon: "fa-solid fa-envelope",
      label: "Email",
      value: "theostnc@bu.edu",
      href: "mailto:theostnc@bu.edu",
      note: "preferred"
    },
    {
      key: "instagram",
      icon: "fa-brands fa-instagram",
      label: "Instagram",
      value: "@byzhang811",
      href: "https://www.instagram.com/byzhang811/"
    },
    {
      key: "rednote",
      icon: "fa-solid fa-book",
      label: "REDnote",
      value: "空心菜大王",
      href: "https://www.xiaohongshu.com/user/profile/613b7b1d0000000002020267",
      note: ""
    },
    {
      key: "wechat",
      icon: "fa-brands fa-weixin",
      label: "WeChat",
      value: "SoulNeverBreak",
      copyOnly: true,
      note: "copy to add"
    },
    {
      key: "phone",
      icon: "fa-solid fa-phone",
      label: "Phone",
      value: "+1 (650)788-4328",
      href: "tel:+1__________",
      note: "optional"
    }
  ],
  footer:
    "If you’re reaching out about research or collaboration, a short note with context and what you’re looking for is perfect."
};

function escapeHTML(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function copyText(text, btn) {
  const done = () => {
    if (!btn) return;
    const old = btn.textContent;
    btn.textContent = "Copied";
    setTimeout(() => (btn.textContent = old), 900);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallback());
  } else {
    fallback();
  }

  function fallback() {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
    done();
  }
}

function renderContact() {
  const root = document.getElementById("contact-content");
  if (!root) return;

  // intro
  const intro = document.createElement("div");
  intro.className = "contact-intro";
  intro.innerHTML = (contactData.intro || []).map(t => `<p>${escapeHTML(t)}</p>`).join("");
  root.appendChild(intro);

  // list
  const section = document.createElement("div");
  section.className = "contact-section";

  const list = document.createElement("div");
  list.className = "contact-list";

  (contactData.items || []).forEach(item => {
    const row = document.createElement("div");
    row.className = "contact-row";

    const icon = document.createElement("i");
    icon.className = item.icon || "fa-solid fa-link";

    const label = document.createElement("div");
    label.className = "contact-label";
    label.textContent = item.label || "";

    const value = document.createElement("div");
    value.className = "contact-value";

    if (item.href && !item.copyOnly) {
      const a = document.createElement("a");
      a.href = item.href;
      a.target = item.href.startsWith("http") ? "_blank" : "_self";
      a.rel = item.href.startsWith("http") ? "noopener noreferrer" : "";
      a.textContent = item.value || item.href;
      value.appendChild(a);
    } else {
      value.textContent = item.value || "";
    }

    if (item.note) {
      const note = document.createElement("span");
      note.className = "contact-note";
      note.textContent = `· ${item.note}`;
      value.appendChild(note);
    }

    const action = document.createElement("div");
    if (item.value && item.copyOnly) {
      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.type = "button";
      btn.textContent = "Copy";
      btn.addEventListener("click", () => copyText(item.value, btn));
      action.appendChild(btn);
    } else if (item.value && !item.href) {
      // value-only items: still allow copy
      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.type = "button";
      btn.textContent = "Copy";
      btn.addEventListener("click", () => copyText(item.value, btn));
      action.appendChild(btn);
    }

    row.appendChild(icon);
    row.appendChild(label);
    row.appendChild(value);
    row.appendChild(action);
    list.appendChild(row);
  });

  section.appendChild(list);
  root.appendChild(section);

  // footer
  if (contactData.footer) {
    const footer = document.createElement("div");
    footer.className = "contact-footer";
    footer.textContent = contactData.footer;
    root.appendChild(footer);
  }
}

document.addEventListener("DOMContentLoaded", renderContact);
