// Contact modal for every "Book to Open" button: talk first, no order details
(function () {
  const IG_URL = 'https://ig.me/m/kwenmedia';
  const WA_NUMBER = '84326652340';
  const IG_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
  const WA_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.070-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.42 9.42 0 0 1-1.44-5.020c0-5.21 4.24-9.45 9.47-9.45 2.53 0 4.9.99 6.69 2.78a9.4 9.4 0 0 1 2.77 6.69c0 5.21-4.24 9.44-9.46 9.44zm8.05-17.5A11.32 11.32 0 0 0 12.04.66C5.77.66.66 5.77.66 12.04c0 2 .52 3.96 1.52 5.69L.57 23.6l6.02-1.58a11.36 11.36 0 0 0 5.44 1.39h.01c6.27 0 11.38-5.1 11.38-11.38 0-3.04-1.18-5.9-3.33-8.05z"/></svg>';
  const TOPICS = ['Discuss a project', 'Ask a question', 'Long-term collaboration', 'Something else'];

  function mount() {
    // email shown in the modal is read from the page footer's mailto link
    const mail = document.querySelector('footer a[href^="mailto:"]');
    const mailRow = mail ? `<dt>Email</dt><dd><a href="${mail.getAttribute('href')}">${mail.textContent.trim()}</a></dd>` : '';
    const wrap = document.createElement('div');
    wrap.innerHTML = `
<div class="cq" id="cq" role="dialog" aria-modal="true" aria-labelledby="cqTitle">
  <div class="cq-card">
    <button class="cq-x" id="cqX" type="button" aria-label="Close">&times;</button>
    <p class="cq-l">Get in touch</p>
    <h3 id="cqTitle">Let&rsquo;s talk</h3>
    <p class="cq-intro">Tell us a bit about you and what you have in mind. We&rsquo;ll get back to you, usually within a day.</p>
    <dl class="cq-ways">
      <dt>Instagram</dt><dd><a href="https://www.instagram.com/kwenmedia/" target="_blank" rel="noopener">@kwenmedia</a></dd>
      <dt>WhatsApp</dt><dd>(84) 326652340</dd>
      ${mailRow}
    </dl>
    <div class="cq-grid">
      <label class="cq-row"><span class="cq-l">Your name *</span><input id="cqName" type="text" placeholder="First and last name" autocomplete="name"></label>
      <label class="cq-row"><span class="cq-l">Company / brand</span><input id="cqCo" type="text" placeholder="Optional"></label>
      <div class="cq-row cq-full"><span class="cq-l">What&rsquo;s it about?</span>
        <div class="cq-chips" id="cqTopics">${TOPICS.map((t, i) => `<button type="button" data-t="${t}" class="${i === 0 ? 'on' : ''}">${t}</button>`).join('')}</div>
      </div>
      <label class="cq-row cq-full"><span class="cq-l">Tell us more</span><textarea id="cqNote" placeholder="Your listings, the style you like, how often you post, any questions…"></textarea></label>
    </div>
    <label class="cq-l cq-msg-l" for="cqMsg">Your message (you can edit it)</label>
    <textarea id="cqMsg" spellcheck="false"></textarea>
    <div class="cq-act">
      <a class="cq-btn cq-btn-solid" id="cqGo" href="${IG_URL}" target="_blank" rel="noopener">${IG_SVG} Copy &amp; open Instagram <span>&rarr;</span></a>
      <button class="cq-btn cq-btn-line" id="cqCopy" type="button">Copy</button>
    </div>
    <a class="cq-btn cq-btn-wa" id="cqWa" href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener">${WA_SVG} Send via WhatsApp <span>&rarr;</span></a>
    <p class="cq-note">Instagram doesn&rsquo;t allow pre-filled messages, so we copy yours and open our chat. Just paste and send. On WhatsApp your message is already filled in.</p>
  </div>
</div>`;
    document.body.appendChild(wrap.firstElementChild);
  }

  function init() {
    mount();
    const $ = id => document.getElementById(id);
    const box = $('cq'), msg = $('cqMsg');
    let topic = TOPICS[0], about = '', edited = false;

    function build() {
      if (edited) return;
      const name = $('cqName').value.trim(), co = $('cqCo').value.trim(), note = $('cqNote').value.trim();
      const lines = [`Hi Kwen Media, I'd like to get in touch.`, ''];
      lines.push(`• Name: ${name || '(please add your name)'}`);
      if (co) lines.push(`• Company / brand: ${co}`);
      lines.push(`• Topic: ${topic}`);
      if (about) lines.push(`• Interested in: ${about}`);
      if (note) lines.push('', note);
      lines.push('', `(sent from kwenmedia.netlify.app)`);
      msg.value = lines.join('\n');
    }
    function open(ctx) {
      about = ctx || ''; edited = false;
      $('cqName').classList.remove('err');
      build();
      box.classList.add('active'); document.body.classList.add('cq-open');
      if (!matchMedia('(hover: none)').matches) setTimeout(() => $('cqName').focus(), 50);
    }
    function close() { box.classList.remove('active'); document.body.classList.remove('cq-open'); }

    // hook every "Book to Open" button; inside a service card, remember which service
    document.querySelectorAll('a, button').forEach(el => {
      if (el.closest('#cq')) return;
      if (el.textContent.trim().toLowerCase() !== 'book to open') return;
      el.addEventListener('click', e => {
        e.preventDefault();
        let ctx = '';
        const card = el.parentElement;
        if (card && card.tagName !== 'NAV' && !card.classList.contains('nav-ctas')) {
          const h = card.querySelector('h2, h3');
          if (h) ctx = h.textContent.trim();
        }
        open(ctx);
      });
    });

    $('cqTopics').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      $('cqTopics').querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      topic = b.dataset.t; build();
    });
    ['cqName', 'cqCo', 'cqNote'].forEach(id => $(id).addEventListener('input', build));
    msg.addEventListener('input', () => { edited = true; });
    $('cqX').addEventListener('click', close);
    box.addEventListener('click', e => { if (e.target === box) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && box.classList.contains('active')) close(); });

    function copySync(text) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;font-size:16px;';
      document.body.appendChild(ta); ta.focus(); ta.select(); ta.setSelectionRange(0, text.length);
      let ok = false; try { ok = document.execCommand('copy'); } catch (_) {}
      document.body.removeChild(ta);
      if (!ok && navigator.clipboard) navigator.clipboard.writeText(text).then(() => {}, () => {});
      return ok;
    }
    function toast(t) {
      let el = $('cqToast');
      if (!el) { el = document.createElement('div'); el.id = 'cqToast'; document.body.appendChild(el); }
      el.textContent = t; el.classList.add('show');
      clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('show'), 4000);
    }
    function needName() {
      if ($('cqName').value.trim()) return false;
      $('cqName').classList.add('err'); $('cqName').focus(); return true;
    }
    $('cqName').addEventListener('input', () => $('cqName').classList.remove('err'));
    const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const go = url => { if (mobile) setTimeout(() => { location.href = url; }, 600); else window.open(url, '_blank', 'noopener'); };

    $('cqCopy').addEventListener('click', () => {
      if (needName()) return;
      copySync(msg.value); const b = $('cqCopy');
      b.textContent = 'Copied ✓'; setTimeout(() => { b.textContent = 'Copy'; }, 1800);
    });
    $('cqGo').addEventListener('click', e => {
      e.preventDefault(); if (needName()) return;
      copySync(msg.value);
      toast('Message copied ✓  Paste it in the Instagram chat and hit send.');
      go(IG_URL);
    });
    $('cqWa').addEventListener('click', e => {
      e.preventDefault(); if (needName()) return;
      go(`https://wa.me/${WA_NUMBER}?text=` + encodeURIComponent(msg.value));
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
