// All attack examples are visible in the HTML; enhance supplied videos in place.
(() => {
  document.querySelectorAll('.attack-example').forEach(section => {
    const key = section.dataset.attack;
    const attackName = section.querySelector('h3').textContent;
    section.querySelectorAll('.video-card').forEach(card => {
      const config = window.TMT_DEMOS?.[key]?.[card.dataset.slot];
      if (!config?.src) return;

      const media = card.querySelector('.video-stage');
      const video = document.createElement('video');
      video.controls = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.src = config.src;
      video.setAttribute('aria-label', `${attackName}: ${card.querySelector('h4').textContent}`);
      if (config.poster) video.poster = config.poster;
      video.addEventListener('error', () => {
        const error = document.createElement('p');
        error.className = 'video-error';
        error.textContent = 'Video unavailable. Check the media file path.';
        media.replaceChildren(error);
      });
      media.replaceChildren(video);
      if (config.caption) card.querySelector('.video-caption').textContent = config.caption;
    });
  });
})();

// Copy the displayed citation, with selectable text if clipboard access is unavailable.
(() => {
  const button = document.getElementById('copy-bibtex');
  const code = document.getElementById('bibtex-code');
  const status = document.getElementById('copy-status');
  if (!button || !code || !status) return;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(code.textContent.trim());
      status.textContent = 'Citation copied.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Citation selected. Press Ctrl+C or ⌘C to copy.';
    }
  });
})();
