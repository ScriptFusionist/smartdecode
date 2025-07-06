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
const disclaimerText = document.getElementById('disclaimer-text');
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
const mobileHelpBtn = document.getElementById('mobile-help-btn');
const desktopSidebarHelpBtn = document.getElementById('desktop-sidebar-help');
const helpModal = document.getElementById('help-modal');
const closeHelpModalBtn = document.getElementById('close-help-modal');
const confirmHelpModalBtn = document.getElementById('confirm-help-modal');
const helpModalTitle = document.getElementById('help-modal-title');
const helpTextContent = document.getElementById('help-text-content');
const feedbackButton = document.getElementById('feedback-button');
const feedbackButtonText = document.getElementById('feedback-button-text');
const feedbackDescription = document.getElementById('feedback-description');
const videoTutorialTitle = document.getElementById('video-tutorial-title');
const hamburgerIconMobile = hamburgerBtn.querySelector('.hamburger-icon');
const hamburgerIconDesktop = desktopMenuToggle.querySelector('.hamburger-icon');
const mobileSettingsBtn = document.getElementById('mobile-settings-btn');
const desktopSidebarSettingsBtn = document.getElementById('desktop-sidebar-settings');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsModalBtn = document.getElementById('close-settings-modal');
const saveSettingsBtn = document.getElementById('save-settings');
const autoCopyCheckbox = document.getElementById('auto-copy');
const autoClearCheckbox = document.getElementById('auto-clear');
const historyLimitInput = document.getElementById('history-limit');
const clearAllHistoryBtn = document.getElementById('clear-all-history-btn');
const confirmModal = document.getElementById('confirm-modal');
const confirmModalTitle = document.getElementById('confirm-modal-title');
const confirmModalMessage = document.getElementById('confirm-modal-message');
const confirmModalCancel = document.getElementById('confirm-modal-cancel');
const confirmModalConfirm = document.getElementById('confirm-modal-confirm');
const closeConfirmModalBtn = document.getElementById('close-confirm-modal');
const feedbackModal = document.getElementById('feedback-modal');
const closeFeedbackModalBtn = document.getElementById('close-feedback-modal');
const feedbackForm = document.getElementById('feedback-form');
const feedbackName = document.getElementById('feedback-name');
const feedbackEmail = document.getElementById('feedback-email');
const feedbackMessage = document.getElementById('feedback-message');
const feedbackSubmitText = document.getElementById('feedback-submit-text');
const feedbackModalTitle = document.getElementById('feedback-modal-title');
const donateModal = document.getElementById('donate-modal');
const closeDonateModalBtn = document.getElementById('close-donate-modal');
const donateModalTitle = document.getElementById('donate-modal-title');
const donateModalDescription = document.getElementById('donate-modal-description');
const trakteerText = document.getElementById('trakteer-text');
const kofiText = document.getElementById('kofi-text');
const trakteerLink = document.getElementById('trakteer-link');
const kofiLink = document.getElementById('kofi-link');
const donateSupportMessage = document.getElementById('donate-support-message');

function showModal(modal) {
  modal.classList.add('modal-visible');
}

function hideModal(modal) {
  modal.classList.remove('modal-visible');
}

function detectBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.toLowerCase().startsWith('id') ? 'id' : 'en';
}

let langNow = localStorage.getItem('lang') || detectBrowserLanguage();
let lastResult = null;

const LANG = {
  id: {
    pageTitle: "SmartDecode Web",
    desc: 'Dekode link yang terkode secara otomatis',
    placeholder: 'Tempelkan link shortlink atau yang terenkripsi...',
    decodeNow: 'Dekode Sekarang',
    success: 'Link berhasil didekode!',
    error: 'Ups, gagal mendekode link.',
    copied: 'Link berhasil disalin',
    copyFail: 'Gagal menyalin link.',
    empty: 'Masukkan link dulu, ya!',
    source: 'Sumber',
    result: 'Hasil Dekode:',
    open: 'Buka',
    copy: 'Salin',
    notUrl: 'Hasil dekode bukan link yang valid.',
    noNeed: 'Link ini tidak perlu didekode.',
    invalidInput: 'Link yang kamu masukkan tidak valid.',
    failed: 'Gagal Dekode',
    noHistory: 'Belum ada riwayat',
    helpTitle: 'Bantuan',
    helpText: `
      <p class="mb-3">SmartDecode saya buat karena sering nemu link download komik atau novel yang malah ngarah ke situs penuh iklan, popup, dan halaman aneh. Capek, kan? Nah, alat ini bantu kamu langsung dapetin link asli yang sebenarnya tersembunyi di balik encoding kayak base64, URL, hex, atau shortlink.</p>
      <p class="mb-3">Format yang didukung:</p>
      <ul class="list-disc pl-5 mb-3">
        <li>Base64 (contoh: <code>aHR0cHM6Ly9leGFtcGxlLmNvbQ==</code>)</li>
        <li>URL-encoded (contoh: <code>https%3A%2F%2Fexample.com</code>)</li>
        <li>Hexadecimal (contoh: <code>68747470733a2f2f...</code>)</li>
        <li>Beberapa shortlink seperti adtival, dll.</li>
      </ul>
      <p class="mb-3">Riwayat dekode tersimpan di browser kamu dan bisa dicek lewat tombol <strong>Riwayat</strong>. Semuanya aman dan bersifat lokal.</p>
      <p class="mb-3">Catatan: Alat ini <strong>nggak bisa lewati iklan atau captcha</strong>. Cuma bantu munculin link bersih yang tersembunyi.</p>
    `,
    videoTutorial: 'Lihat Video Tutorial',
    feedbackText: 'Ada saran atau masalah? Yuk bantu kami jadi lebih baik!',
    videoId: 'pYJZLmRHqrk',
    clearAll: 'Hapus Semua',
    confirmTitle: 'Konfirmasi',
    confirmMessage: 'Yakin mau hapus semua riwayat?',
    cancel: 'Batal',
    confirm: 'Hapus',
    settingsTitle: 'Pengaturan Aplikasi',
    generalSettings: 'Pengaturan Umum',
    autoCopy: 'Salin Otomatis',
    autoClear: 'Bersihkan Otomatis',
    historySettings: 'Pengaturan Riwayat',
    historyLimit: 'Batas Riwayat',
    clearHistory: 'Hapus Riwayat',
    saveSettings: 'Simpan Pengaturan',
    historyTitle: 'Riwayat',
    menuHistory: 'Riwayat',
    menuDonate: 'Dukung',
    menuSettings: 'Pengaturan',
    menuHelp: 'Bantuan',
    ok: 'Oke',
    unknownSource: 'Sumber tidak dikenal',
    disclaimer: `
      Gunakan alat ini dengan bijak. SmartDecode dibuat hanya untuk keperluan pribadi dan edukasi. 
      Kami tidak bertanggung jawab atas penyalahgunaan. 
      Jika memungkinkan, <strong>gunakanlah situs resmi atau legal</strong> untuk menghargai kerja keras pembuat konten.
    `,
    feedbackButton: 'Kirim Masukan',
    feedbackTitle: 'Kirim Masukan',
    feedbackName: 'Nama',
    feedbackEmail: 'Email',
    feedbackMessage: 'Pesan',
    feedbackSubmit: 'Kirim',
    feedbackSuccess: 'Terima kasih! Masukan kamu sudah terkirim.',
    feedbackError: 'Gagal mengirim. Coba lagi, ya!',
    feedbackRequired: 'Pesan wajib diisi',
    donateTitle: "Dukung SmartDecode",
    donateDescription: "Kalau kamu merasa alat ini bermanfaat, yuk dukung saya, Hehe",
    trakteer: "Trakteer",
    kofi: "Ko-fi",
    donateVia: "Dukung lewat",
    supportMessage: "Dukungan kamu bantu saya terus mengembangkan dan menyempurnakan alat ini, Hehe",
  },
  en: {
    pageTitle: "SmartDecode Web",
    desc: 'Auto-decode encrypted or shortened links',
    placeholder: 'Paste a shortlink or encoded link...',
    decodeNow: 'Decode Now',
    success: 'Link decoded successfully!',
    error: 'Oops, failed to decode the link.',
    copied: 'Link copied successfully',
    copyFail: 'Could not copy the link.',
    empty: 'Please enter a link first!',
    source: 'Source',
    result: 'Decoded Result:',
    open: 'Open',
    copy: 'Copy',
    notUrl: 'Decoded result is not a valid link.',
    noNeed: 'This link does not need decoding.',
    invalidInput: 'The input is not a valid link.',
    failed: 'Decode Failed',
    noHistory: 'No history yet',
    helpTitle: 'Help',
    helpText: `
      <p class="mb-3">I made SmartDecode because I was tired of trying to download comics or novels and ending up on sites full of ads, popups, or shady redirects. This tool helps you instantly uncover the real link hidden behind encoding like base64, URL, hex, or shortlinks.</p>
      <p class="mb-3">Supported formats:</p>
      <ul class="list-disc pl-5 mb-3">
        <li>Base64 (e.g. <code>aHR0cHM6Ly9leGFtcGxlLmNvbQ==</code>)</li>
        <li>URL-encoded (e.g. <code>https%3A%2F%2Fexample.com</code>)</li>
        <li>Hexadecimal (e.g. <code>68747470733a2f2f...</code>)</li>
        <li>Some shortlink services like adtival, etc.</li>
      </ul>
      <p class="mb-3">Decoded history is saved locally in your browser. You can view it by clicking the <strong>History</strong> button. Your data stays private.</p>
      <p class="mb-3">Note: This tool <strong>does not bypass ads or captchas</strong>. It only shows the clean, hidden link.</p>
    `,
    videoTutorial: 'Watch Tutorial Video',
    feedbackText: 'Got ideas or found a bug? Let us know and help make this better!',
    videoId: 'pYJZLmRHqrk',
    clearAll: 'Clear All',
    confirmTitle: 'Confirm',
    confirmMessage: 'Are you sure you want to clear all history?',
    cancel: 'Cancel',
    confirm: 'Delete',
    settingsTitle: 'App Settings',
    generalSettings: 'General Settings',
    autoCopy: 'Auto Copy',
    autoClear: 'Auto Clear',
    historySettings: 'History Settings',
    historyLimit: 'History Limit',
    clearHistory: 'Clear History',
    saveSettings: 'Save Settings',
    historyTitle: 'History',
    menuHistory: 'History',
    menuDonate: 'Support',
    menuSettings: 'Settings',
    menuHelp: 'Help',
    ok: 'OK',
    unknownSource: 'Unknown Source',
    disclaimer: `
      Please use this tool responsibly. SmartDecode is intended for personal and educational use only. 
      We are not responsible for any misuse. 
      Whenever possible, <strong>please use official or legal sources</strong> to support content creators.
    `,
    feedbackButton: 'Send Feedback',
    feedbackTitle: 'Send Feedback',
    feedbackName: 'Name',
    feedbackEmail: 'Email',
    feedbackMessage: 'Message',
    feedbackSubmit: 'Send',
    feedbackSuccess: 'Thanks! Your feedback has been sent.',
    feedbackError: 'Could not send feedback. Please try again.',
    feedbackRequired: 'Message is required',
    donateTitle: "Support SmartDecode",
    donateDescription: "If you find this tool helpful, consider supporting its development!",
    trakteer: "Trakteer",
    kofi: "Ko-fi",
    donateVia: "Support via",
    supportMessage: "Your support helps me keep improving and expanding SmartDecode!",
  }
};

let decodeHistory = JSON.parse(localStorage.getItem('decodeHistory')) || [];

function loadSettings() {
  const settings = JSON.parse(localStorage.getItem('appSettings')) || {};
  autoCopyCheckbox.checked = settings.autoCopy || false;
  autoClearCheckbox.checked = settings.autoClear || false;
  historyLimitInput.value = settings.historyLimit || 10;
  return settings;
}

function saveSettings() {
  const settings = {
    autoCopy: autoCopyCheckbox.checked,
    autoClear: autoClearCheckbox.checked,
    historyLimit: parseInt(historyLimitInput.value) || 10
  };
  
  localStorage.setItem('appSettings', JSON.stringify(settings));
  showToast(langNow === 'id' ? 'Pengaturan disimpan' : 'Settings saved');
  
  if (decodeHistory.length > settings.historyLimit) {
    decodeHistory = decodeHistory.slice(0, settings.historyLimit);
    localStorage.setItem('decodeHistory', JSON.stringify(decodeHistory));
    renderHistoryList();
  }
  
  return settings;
}

function updateLangUI() {
  const t = LANG[langNow];
  
  document.title = t.pageTitle;
  decodeBtnText.textContent = t.decodeNow;
  descText.textContent = t.desc;
  inputLink.placeholder = t.placeholder;
  disclaimerText.innerHTML = t.disclaimer;
  
  document.getElementById('desktop-sidebar-history-text').textContent = t.menuHistory;
  document.getElementById('desktop-sidebar-donate-text').textContent = t.menuDonate;
  document.getElementById('desktop-sidebar-settings-text').textContent = t.menuSettings;
  document.getElementById('desktop-sidebar-help-text').textContent = t.menuHelp;
  
  document.getElementById('desktop-history-btn-text').textContent = t.menuHistory;
  document.getElementById('desktop-donate-btn-text').textContent = t.menuDonate;
  
  document.getElementById('mobile-menu-history-text').textContent = t.menuHistory;
  document.getElementById('mobile-menu-donate-text').textContent = t.menuDonate;
  document.getElementById('mobile-menu-settings-text').textContent = t.menuSettings;
  document.getElementById('mobile-menu-help-text').textContent = t.menuHelp;
  
  document.getElementById('history-panel-title').textContent = t.historyTitle;
  document.getElementById('clear-all-history-small-text').textContent = t.clearAll;
  
  helpModalTitle.textContent = t.helpTitle;
  helpTextContent.innerHTML = t.helpText;
  document.getElementById('confirm-help-modal-text').textContent = t.ok;
  
  document.getElementById('settings-modal-title').textContent = t.settingsTitle;
  document.getElementById('settings-general-title').textContent = t.generalSettings;
  document.getElementById('auto-copy-label').textContent = t.autoCopy;
  document.getElementById('auto-clear-label').textContent = t.autoClear;
  document.getElementById('settings-history-title').textContent = t.historySettings;
  document.getElementById('history-limit-label').textContent = t.historyLimit;
  document.getElementById('clear-history-label').textContent = t.clearHistory;
  document.getElementById('clear-all-history-text').textContent = t.clearAll;
  document.getElementById('save-settings-text').textContent = t.saveSettings;
  
  document.getElementById('confirm-modal-title').textContent = t.confirmTitle;
  document.getElementById('confirm-modal-message').textContent = t.confirmMessage;
  document.getElementById('confirm-modal-cancel-text').textContent = t.cancel;
  document.getElementById('confirm-modal-confirm-text').textContent = t.confirm;
  
  langLabel.textContent = langNow === 'id' ? '🇮🇩 ID' : '🇬🇧 EN';
  
  const videoFrame = document.querySelector('#help-modal iframe');
//   you knowlah ini buat apa, dan kenapa saya komen
//   if (videoFrame && t.videoId) {
//     videoFrame.src = `https://www.youtube.com/embed/${t.videoId}`;
//   }
  if (videoFrame && t.videoId) {
  const newSrc = `https://www.youtube.com/embed/${t.videoId}`;
  if (videoFrame.src !== newSrc) {
    videoFrame.src = newSrc;
  }
}
  
  feedbackButtonText.textContent = t.feedbackButton;
  feedbackDescription.textContent = t.feedbackText;
  videoTutorialTitle.textContent = t.videoTutorial;
  
  feedbackModalTitle.textContent = t.feedbackTitle;
  document.querySelector('label[for="feedback-name"]').textContent = t.feedbackName;
  document.querySelector('label[for="feedback-email"]').textContent = t.feedbackEmail;
  document.querySelector('label[for="feedback-message"]').textContent = t.feedbackMessage;
  feedbackSubmitText.textContent = t.feedbackSubmit;
  feedbackName.placeholder = `${t.feedbackName} (${langNow === 'id' ? 'opsional' : 'optional'})`;
  feedbackEmail.placeholder = `${t.feedbackEmail} (${langNow === 'id' ? 'opsional' : 'optional'})`;
  feedbackMessage.placeholder = t.feedbackMessage;
  
  donateModalTitle.textContent = t.donateTitle;
  donateModalDescription.textContent = t.donateDescription;
  trakteerText.textContent = t.trakteer;
  kofiText.textContent = t.kofi;
  trakteerLink.textContent = `${t.donateVia} ${t.trakteer}`;
  kofiLink.textContent = `${t.donateVia} ${t.kofi}`;
  donateSupportMessage.textContent = t.supportMessage;
  
  if (!historyPanel.classList.contains('hidden')) {
    renderHistoryList();
  }
  
  if (lastResult) {
    if (lastResult.type === 'error') {
      showErrorDetail(lastResult.code, lastResult.data);
    } else if (lastResult.type === 'success') {
      renderSuccessResult(lastResult.decoded);
    }
  }
}

function showToast(msg, type = 'success') {
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => toast.style.display = 'none', 3000);
}

function showErrorDetail(errorCode, data = null) {
  const t = LANG[langNow];
  lastResult = { type: 'error', code: errorCode, data };
  
  let errorMessage = t.error;
  
  switch(errorCode) {
    case 'empty': errorMessage = t.empty; break;
    case 'invalidInput': errorMessage = t.invalidInput; break;
    case 'noNeed': errorMessage = data ? `${t.noNeed} (${data})` : t.noNeed; break;
    case 'notUrl': errorMessage = t.notUrl; break;
  }
  
  output.innerHTML = `
    <div class="p-4 bg-red-700/80 text-white rounded-lg shadow space-y-2">
      <div class="font-semibold flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        ${t.failed}
      </div>
      <div class="text-sm break-words opacity-90">${errorMessage}</div>
    </div>
  `;
}

function renderSuccessResult(decoded) {
  const t = LANG[langNow];
  const source = detectSource(decoded);
  lastResult = { type: 'success', decoded };
  
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
  
  output.innerHTML = '';
  output.appendChild(result);
  
  const copyBtn = result.querySelector('.copy-btn');
  copyBtn.addEventListener('click', () => copyToClipboard(decoded));
}

function autoDetectAndDecode(str) {
  let current = str;
  let prev = '';
  let iterations = 0;
  const maxIterations = 5;

  while (iterations < maxIterations && current !== prev) {
    prev = current;
    if (isValidURL(current)) return current;

    if (/^(?:[0-9a-fA-F]{2})+$/.test(current)) {
      try {
        const hexDecoded = current.match(/.{2}/g)
          .map(b => String.fromCharCode(parseInt(b, 16)))
          .join('');
        if (hexDecoded !== current) {
          current = hexDecoded;
          iterations++;
          continue;
        }
      } catch (e) {}
    }

    if (/%[0-9a-fA-F]{2}/.test(current)) {
      try {
        const decoded = decodeURIComponent(current);
        if (decoded !== current) {
          current = decoded;
          iterations++;
          continue;
        }
      } catch (e) {}
    }

    if (/^[A-Za-z0-9+/]+={0,2}$/.test(current) && current.length % 4 === 0) {
      try {
        const decoded = atob(current);
        if (/^[\x20-\x7E]*$/.test(decoded)) {
          current = decoded;
          iterations++;
          continue;
        }
      } catch (e) {}
    }

    const hexPattern = /(?:0x)?([0-9a-fA-F]{2,})/g;
    let hexMatch;
    let replaced = false;
    
    while ((hexMatch = hexPattern.exec(current)) !== null) {
      const hexStr = hexMatch[0];
      try {
        let hex = hexStr.replace(/^0x/, '');
        if (hex.length % 2 !== 0) hex = '0' + hex;
        
        const hexDecoded = hex.match(/.{2}/g)
          .map(b => String.fromCharCode(parseInt(b, 16)))
          .join('');
          
        if (hexDecoded !== hexStr) {
          current = current.replace(hexStr, hexDecoded);
          replaced = true;
        }
      } catch (e) {}
    }
    
    if (replaced) {
      iterations++;
      continue;
    }

    if (/[a-zA-Z]/.test(current)) {
      const rotDecoded = current.replace(/[a-zA-Z]/g, c => {
        const base = c <= 'Z' ? 65 : 97;
        return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
      });
      
      if (rotDecoded !== current) {
        current = rotDecoded;
        iterations++;
        continue;
      }
    }
    break;
  }

  if (isValidURL(current)) return current;
  
  if (/^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(current)) {
    const withHttps = 'https://' + current;
    if (isValidURL(withHttps)) return withHttps;
    
    const withHttp = 'http://' + current;
    if (isValidURL(withHttp)) return withHttp;
  }

  return current;
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
    const keys = ['data','s','url','go','link','target','redirect','r','u','dest','to','page','id','site','jump','out','v','ref','q'];
    
    for (const key of keys) {
      if (params.has(key)) {
        const value = params.get(key);
        if (value && value.length > 5) return value;
      }
    }
  } catch (e) {}
  return url;
}

function detectSource(url) {
  const sources = [
    { keyword: 'drive.google.com', name: 'Google Drive' },
    { keyword: 'mediafire.com', name: 'Mediafire' },
    { keyword: 'mega.nz', name: 'Mega.nz' },
    { keyword: 'zippyshare.com', name: 'Zippyshare' },
    { keyword: 'pixeldrain.com', name: 'Pixeldrain' },
    { keyword: 'mixdrop.co', name: 'Mixdrop' },
    { keyword: 'github.com', name: 'GitHub' },
    { keyword: 'anonfiles.com', name: 'Anonfiles' },
    { keyword: 'gofile.io', name: 'Gofile' },
    { keyword: 'bayfiles.com', name: 'Bayfiles' },
    { keyword: 'terabox.com', name: 'Terabox' },
    { keyword: '1fichier.com', name: '1fichier' }
  ];
  
  const found = sources.find(source => url.includes(source.keyword));
  return found ? found.name : LANG[langNow].unknownSource;
}

function isValidURL(str) {
  try {
    new URL(str);
    return true;
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
  
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    return directSites.some(site => hostname === site || hostname.endsWith(`.${site}`));
  } catch (e) {
    return false;
  }
}

function decodeLink() {
  const t = LANG[langNow];
  const input = inputLink.value.trim();
  output.innerHTML = '';
  lastResult = null;
  
  if (!input) return showErrorDetail('empty');
  if (!isValidURL(input)) return showErrorDetail('invalidInput');
  if (isDirectLink(input)) return showErrorDetail('noNeed', input);

  try {
    const encoded = extractParameter(input);
    const decoded = autoDetectAndDecode(encoded);
    
    const isValid = isValidURL(decoded);
    if (!isValid) return showErrorDetail('notUrl');
    
    const decodedURL = new URL(decoded);
    const inputURL = new URL(input);
    if (decodedURL.href === inputURL.href) return showErrorDetail('noNeed');
    
    saveToHistory(input, decoded);
    renderSuccessResult(decoded);
    
    const settings = JSON.parse(localStorage.getItem('appSettings')) || {};
    if (settings.autoCopy) copyToClipboard(decoded);
    if (settings.autoClear) {
      inputLink.value = '';
      clearBtn.classList.add('hidden');
    }
    
    showToast(t.success);
  } catch (err) {
    showErrorDetail('error');
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => showToast(LANG[langNow].copied),
    () => showToast(LANG[langNow].copyFail, 'error')
  );
}

function saveToHistory(originalLink, decodedLink) {
  const settings = JSON.parse(localStorage.getItem('appSettings')) || {};
  const historyLimit = settings.historyLimit || 10;
  
  decodeHistory.unshift({
    original: originalLink,
    decoded: decodedLink,
    timestamp: new Date().toISOString()
  });
  
  if (decodeHistory.length > historyLimit) decodeHistory = decodeHistory.slice(0, historyLimit);
  localStorage.setItem('decodeHistory', JSON.stringify(decodeHistory));
  
  if (!historyPanel.classList.contains('hidden')) renderHistoryList();
}

function renderHistoryList() {
  historyList.innerHTML = '';
  const t = LANG[langNow];
  
  document.getElementById('history-count').textContent = decodeHistory.length;
  
  const countText = decodeHistory.length === 1 ? 
    (langNow === 'id' ? '1 item' : '1 item') : 
    (langNow === 'id' ? `${decodeHistory.length} item` : `${decodeHistory.length} items`);
  document.getElementById('history-items-count').textContent = countText;
  
  if (decodeHistory.length === 0) {
    historyList.innerHTML = `<div class="text-center py-4 text-gray-400">${t.noHistory}</div>`;
    return;
  }
  
  decodeHistory.forEach((item) => {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item bg-gray-800';
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

function showHelpModal() {
  showModal(helpModal);
}

function showSettingsModal() {
  loadSettings();
  showModal(settingsModal);
}

function clearHistory() {
  decodeHistory = [];
  localStorage.removeItem('decodeHistory');
  renderHistoryList();
  showToast(langNow === 'id' ? 'Riwayat dihapus' : 'History cleared');
}

function showConfirmModal() {
  showModal(confirmModal);
}

function showFeedbackModal() {
  feedbackName.value = '';
  feedbackEmail.value = '';
  feedbackMessage.value = '';
  showModal(feedbackModal);
}

function sendFeedback(e) {
  e.preventDefault();
  
  const t = LANG[langNow];
  const name = feedbackName.value.trim();
  const email = feedbackEmail.value.trim();
  const message = feedbackMessage.value.trim();
  
  if (!message) {
    showToast(t.feedbackRequired, 'error');
    return;
  }
  
  emailjs.send("service_5yr9a0x", "template_i3jwlxp", {
    from_name: name || "Anonymous User",
    from_email: email || "no-reply@smartdecode.com",
    message: message,
    app: "SmartDecode Web"
  })
  .then(() => {
    showToast(t.feedbackSuccess);
    hideModal(feedbackModal);
  }, (error) => {
    showToast(t.feedbackError, 'error');
  });
}

decodeBtn.addEventListener('click', decodeLink);
inputLink.addEventListener('keydown', e => { if (e.key === 'Enter') decodeLink(); });
inputLink.addEventListener('input', () => clearBtn.classList.toggle('hidden', !inputLink.value));
clearBtn.addEventListener('click', () => {
  inputLink.value = '';
  clearBtn.classList.add('hidden');
  output.innerHTML = '';
  lastResult = null;
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
    localStorage.setItem('lang', langNow);
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

desktopSidebarOverlay.addEventListener('click', (e) => toggleDesktopSidebar());
desktopHistoryBtn.addEventListener('click', showHistoryPanel);
desktopSidebarHistoryBtn.addEventListener('click', () => {
  toggleDesktopSidebar();
  showHistoryPanel();
});
closeHistoryBtn.addEventListener('click', () => historyPanel.classList.add('hidden'));

mobileHelpBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  hamburgerIconMobile.classList.remove('open');
  showHelpModal();
});

desktopSidebarHelpBtn.addEventListener('click', showHelpModal);
closeHelpModalBtn.addEventListener('click', () => hideModal(helpModal));
confirmHelpModalBtn.addEventListener('click', () => hideModal(helpModal));
helpModal.addEventListener('click', (e) => { if (e.target === helpModal) hideModal(helpModal); });

feedbackButton.addEventListener('click', showFeedbackModal);
mobileSettingsBtn.addEventListener('click', showSettingsModal);
desktopSidebarSettingsBtn.addEventListener('click', showSettingsModal);
closeSettingsModalBtn.addEventListener('click', () => hideModal(settingsModal));
saveSettingsBtn.addEventListener('click', saveSettings);

clearAllHistoryBtn.addEventListener('click', showConfirmModal);
closeConfirmModalBtn.addEventListener('click', () => hideModal(confirmModal));
confirmModalConfirm.addEventListener('click', () => {
  clearHistory();
  hideModal(confirmModal);
});
confirmModalCancel.addEventListener('click', () => hideModal(confirmModal));
confirmModal.addEventListener('click', (e) => { if (e.target === confirmModal) hideModal(confirmModal); });

document.getElementById('history-settings-btn').addEventListener('click', showSettingsModal);
document.getElementById('clear-all-history-small').addEventListener('click', showConfirmModal);

closeFeedbackModalBtn.addEventListener('click', () => hideModal(feedbackModal));
feedbackForm.addEventListener('submit', sendFeedback);
feedbackModal.addEventListener('click', (e) => { if (e.target === feedbackModal) hideModal(feedbackModal); });

document.querySelectorAll('.show-donate-modal').forEach(btn => {
  btn.addEventListener('click', () => showModal(donateModal));
});

closeDonateModalBtn.addEventListener('click', () => hideModal(donateModal));
donateModal.addEventListener('click', (e) => {
  if (e.target === donateModal) hideModal(donateModal);
});

updateLangUI();
clearBtn.classList.add('hidden');
loadSettings();
