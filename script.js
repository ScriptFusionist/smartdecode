const toast = document.getElementById('toast');
const output = document.getElementById('output');
const decodeBtn = document.getElementById('decode-button');
const decodeBtnText = document.getElementById('decode-btn-text');
const inputLink = document.getElementById('input-link');
const clearBtn = document.getElementById('clear-button');
const langToggle = document.getElementById('lang-toggle');
const langMenu = document.getElementById('lang-menu');
const langLabel = document.getElementById('lang-label');
const descText = document.getElementById('desc-text');

const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const historyMenuItem = document.getElementById('history-menu-item');
const historyPanel = document.getElementById('history-panel');
const historyList = document.getElementById('history-list');
const closeHistoryBtn = document.getElementById('close-history');
const desktopHistoryBtn = document.getElementById('desktop-history-btn');
const desktopMenuToggle = document.getElementById('desktop-menu-toggle');
const desktopSidebar = document.getElementById('desktop-sidebar');
const desktopSidebarOverlay = document.getElementById('desktop-sidebar-overlay');
const desktopSidebarHistoryBtn = document.getElementById('desktop-sidebar-history');

const hamburgerIconMobile = hamburgerBtn.querySelector('.hamburger-icon');
const hamburgerIconDesktop = desktopMenuToggle.querySelector('.hamburger-icon');

let langNow = 'id';
const LANG = {
  id: {
    desc: 'Decode otomatis link base64',
    placeholder: 'Tempelkan link shortlink atau encoded...',
    decodeNow: 'Decode Sekarang',
    success: 'Link berhasil didecode.',
    error: 'Gagal mendecode link.',
    copied: 'Link disalin ke clipboard',
    copyFail: 'Gagal menyalin ke clipboard.',
    empty: 'Masukkan link terlebih dahulu.',
    source: 'Sumber',
    result: 'Hasil Decode:',
    open: 'Buka',
    copy: 'Salin',
    notUrl: 'Hasil decode bukan URL yang valid.',
    noNeed: 'Link ini tidak perlu didecode.',
    invalidInput: 'Input bukan link valid.',
    failed: 'Gagal Decode',
    noHistory: 'Belum ada history'
  },
  en: {
    desc: 'Automatically decode base64 links',
    placeholder: 'Paste shortlink or encoded link...',
    decodeNow: 'Decode Now',
    success: 'Link decoded successfully.',
    error: 'Failed to decode link.',
    copied: 'Link copied to clipboard',
    copyFail: 'Failed to copy to clipboard.',
    empty: 'Please enter a link.',
    source: 'Source',
    result: 'Decoded Result:',
    open: 'Open',
    copy: 'Copy',
    notUrl: 'Decoded result is not a valid URL.',
    noNeed: 'This link does not need decoding.',
    invalidInput: 'Input is not a valid link.',
    failed: 'Decode Failed',
    noHistory: 'No history yet'
  }
};

let decodeHistory = JSON.parse(localStorage.getItem('decodeHistory')) || [];

function updateLangUI() {
  const t = LANG[langNow];
  decodeBtnText.textContent = t.decodeNow;
  descText.textContent = t.desc;
  inputLink.placeholder = t.placeholder;
}

function showToast(msg, type = 'success') {
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => toast.style.display = 'none', 3000);
}

function showErrorDetail(reason) {
  output.innerHTML = `
    <div class="p-4 bg-red-700/80 text-white rounded-lg shadow space-y-2">
      <div class="font-semibold flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        ${LANG[langNow].failed}
      </div>
      <div class="text-sm break-words opacity-90">${reason}</div>
    </div>
  `;
}

function autoDetectAndDecode(str) {
  try {
    if (/^[A-Za-z0-9+/=]+$/.test(str) && str.length % 4 === 0) {
      return atob(str);
    }
    
    if (str.includes('%')) {
      return decodeURIComponent(str);
    }
    
    if (/^(0x)?[0-9a-f]+$/i.test(str)) {
      const hex = str.replace(/^0x/, '');
      return hex.match(/.{1,2}/g)
        .map(b => String.fromCharCode(parseInt(b, 16)))
        .join('');
    }
    
    return str;
  } catch (e) {
    console.error('Decode error:', e);
    return str;
  }
}

function extractParameter(url) {
  try {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split('/').filter(Boolean);
    
    if (pathParts.length > 0) {
      const lastSegment = pathParts[pathParts.length - 1];
      if (lastSegment.length > 10) return lastSegment;
    }
    
    const params = new URLSearchParams(parsed.search);
    const keys = ['s','url','go','link','target','redirect','r','u','dest','to','page','id','site','jump','out','v','ref','q'];
    
    for (const key of keys) {
      if (params.has(key)) {
        const value = params.get(key);
        if (value && value.length > 5) return value;
      }
    }
  } catch (e) {
    console.error('URL parsing error:', e);
  }
  return url;
}

function detectSource(url) {
  const sources = [
    { name: 'Google Drive', keyword: 'drive.google.com' },
    { name: 'Mediafire', keyword: 'mediafire.com' },
    { name: 'Mega.nz', keyword: 'mega.nz' },
    { name: 'Zippyshare', keyword: 'zippyshare.com' },
    { name: 'Pixeldrain', keyword: 'pixeldrain.com' },
    { name: 'Mixdrop', keyword: 'mixdrop.co' },
    { name: 'GitHub', keyword: 'github.com' },
    { name: 'Anonfiles', keyword: 'anonfiles.com' },
    { name: 'Gofile', keyword: 'gofile.io' },
    { name: 'Bayfiles', keyword: 'bayfiles.com' },
    { name: 'Terabox', keyword: 'terabox.com' },
    { name: '1fichier', keyword: '1fichier.com' }
  ];
  
  const found = sources.find(source => url.includes(source.keyword));
  return found ? found.name : (langNow === 'id' ? 'Tidak diketahui' : 'Unknown');
}

function isValidURL(str) {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

function isDirectLink(url) {
  const directSites = [
    'instagram.com', 'facebook.com', 'youtube.com', 'tiktok.com',
    'twitter.com', 'x.com', 'linkedin.com', 'reddit.com',
    'whatsapp.com', 'telegram.org', 'discord.com'
  ];
  return directSites.some(site => url.includes(site));
}

function decodeLink() {
  const t = LANG[langNow];
  const input = inputLink.value.trim();
  output.innerHTML = '';
  
  if (!input) {
    return showErrorDetail(t.empty);
  }
  
  if (!isValidURL(input)) {
    return showErrorDetail(t.invalidInput);
  }
  
  if (isDirectLink(input)) {
    return showErrorDetail(`${t.noNeed} (${input})`);
  }

  try {
    const encoded = extractParameter(input);
    const decoded = autoDetectAndDecode(encoded);
    
    const isValid = decoded.startsWith('http://') || decoded.startsWith('https://');
    if (!isValid) {
      return showErrorDetail(t.notUrl);
    }
    
    if (decoded === input || decoded === encoded) {
      return showErrorDetail(t.noNeed);
    }
    
    saveToHistory(input, decoded);
    
    const source = detectSource(decoded);
    
    const result = document.createElement('div');
    result.className = 'p-4 bg-gray-700/80 rounded-lg shadow space-y-3';
    result.innerHTML = `
      <div class="flex items-center gap-2 text-green-300 font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        ${t.result}
      </div>
      <div class="break-words text-blue-400">
        <a href="${decoded}" target="_blank" class="underline hover:text-blue-300 transition-colors">${decoded}</a>
      </div>
      <p class="text-sm text-gray-400">${t.source}: ${source}</p>
      <div class="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 pt-2">
        <button class="copy-btn flex items-center justify-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition" data-link="${decoded.replace(/"/g, '&quot;')}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          ${t.copy}
        </button>
        <a href="${decoded}" target="_blank" class="flex items-center justify-center gap-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          ${t.open}
        </a>
      </div>
    `;
    
    output.appendChild(result);
    
    const copyBtn = result.querySelector('.copy-btn');
    copyBtn.addEventListener('click', () => {
      copyToClipboard(decoded);
    });
    
    showToast(t.success);
  } catch (err) {
    console.error('[Decode Error]', err);
    showErrorDetail(t.error);
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => showToast(LANG[langNow].copied),
    () => showToast(LANG[langNow].copyFail, 'error')
  );
}

function saveToHistory(originalLink, decodedLink) {
  decodeHistory.unshift({
    original: originalLink,
    decoded: decodedLink,
    timestamp: new Date().toISOString()
  });
  
  if (decodeHistory.length > 10) {
    decodeHistory = decodeHistory.slice(0, 10);
  }
  
  localStorage.setItem('decodeHistory', JSON.stringify(decodeHistory));
  
  if (!historyPanel.classList.contains('hidden')) {
    renderHistoryList();
  }
}

function renderHistoryList() {
  historyList.innerHTML = '';
  
  if (decodeHistory.length === 0) {
    historyList.innerHTML = `
      <div class="text-center py-4 text-gray-400">
        ${LANG[langNow].noHistory}
      </div>
    `;
    return;
  }
  
  decodeHistory.forEach((item) => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item p-3 bg-gray-800 rounded-md cursor-pointer';
    historyItem.innerHTML = `
      <div class="text-xs text-gray-400 mb-1">
        ${new Date(item.timestamp).toLocaleString()}
      </div>
      <div class="text-sm truncate">${item.original}</div>
      <div class="text-xs text-blue-300 truncate mt-1">${item.decoded}</div>
    `;
    
    historyItem.addEventListener('click', () => {
      inputLink.value = item.original;
      clearBtn.classList.remove('hidden');
      historyPanel.classList.add('hidden');
      decodeLink();
    });
    
    historyList.appendChild(historyItem);
  });
}

function showHistoryPanel() {
  renderHistoryList();
  historyPanel.classList.remove('hidden');
}

function toggleDesktopSidebar() {
  desktopSidebar.classList.toggle('-translate-x-full');
  desktopSidebarOverlay.classList.toggle('hidden');
  hamburgerIconDesktop.classList.toggle('open');
}

decodeBtn.addEventListener('click', decodeLink);

inputLink.addEventListener('keydown', e => {
  if (e.key === 'Enter') decodeLink();
});

inputLink.addEventListener('input', () => {
  clearBtn.classList.toggle('hidden', !inputLink.value);
});

clearBtn.addEventListener('click', () => {
  inputLink.value = '';
  clearBtn.classList.add('hidden');
  output.innerHTML = '';
  inputLink.focus();
});

langToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  langMenu.classList.toggle('scale-y-0');
  langMenu.classList.toggle('opacity-0');
  langMenu.classList.toggle('scale-y-100');
  langMenu.classList.toggle('opacity-100');
});

langMenu.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    langNow = btn.dataset.lang;
    langLabel.textContent = btn.textContent;
    updateLangUI();
    langMenu.classList.add('scale-y-0', 'opacity-0');
    langMenu.classList.remove('scale-y-100', 'opacity-100');
  });
});

document.addEventListener('click', (e) => {
  if (!langToggle.contains(e.target) && !langMenu.contains(e.target)) {
    langMenu.classList.add('scale-y-0', 'opacity-0');
    langMenu.classList.remove('scale-y-100', 'opacity-100');
  }
});

hamburgerBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  mobileMenu.classList.toggle('open');
  hamburgerIconMobile.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
    mobileMenu.classList.remove('open');
    hamburgerIconMobile.classList.remove('open');
  }
});

historyMenuItem.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  hamburgerIconMobile.classList.remove('open');
  showHistoryPanel();
});

desktopMenuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleDesktopSidebar();
});

desktopSidebarOverlay.addEventListener('click', (e) => {
  toggleDesktopSidebar();
});

desktopHistoryBtn.addEventListener('click', showHistoryPanel);

desktopSidebarHistoryBtn.addEventListener('click', () => {
  toggleDesktopSidebar();
  showHistoryPanel();
});

closeHistoryBtn.addEventListener('click', () => {
  historyPanel.classList.add('hidden');
});

updateLangUI();
clearBtn.classList.add('hidden');