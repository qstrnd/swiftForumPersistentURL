import './index.css'

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggleSetting') as HTMLInputElement | null;

  if (!toggle) return;

  const body = document.body;
  body.classList.add('no-transition');

  chrome.storage.local.get('featureEnabled', (data) => {
    if (data.featureEnabled === undefined) {
      chrome.storage.local.set({ featureEnabled: true });
      toggle.checked = true;
    } else {
      toggle.checked = Boolean(data.featureEnabled);
    }

    // Remove no-transition after toggle is updated
    requestAnimationFrame(() => {
      body.classList.remove('no-transition');
    });
  });

  toggle.addEventListener('change', () => {
    chrome.storage.local.set({ featureEnabled: toggle.checked });
  });
});