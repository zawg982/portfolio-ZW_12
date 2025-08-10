const aboutBtn = document.getElementById('aboutBtn');
const contactBtn = document.getElementById('contactBtn');
const workBtn = document.getElementById('workBtn');
const feedbackBtn = document.getElementById('feedbackBtn');
const aboutSection = document.getElementById('aboutSection');
const contactSection = document.getElementById('contactSection');
const workSection = document.getElementById('workSection');
const feedbackSection = document.getElementById('feedbackSection');
const pageTitle = document.getElementById('pageTitle');

const contactForm = document.getElementById('contactForm');
const envelope = document.getElementById('envelopeAnimation');
const statusText = document.getElementById('status');

const feedbackForm = document.getElementById('feedbackForm');
const feedbackList = document.getElementById('feedbackList');

const webhookURL = "https://discord.com/api/webhooks/1404185050206961725/hef0IKqJIXgPN_pAxcwC3TKUrPPd0BdB1ZYCp_17crlfEsYnZ9zdAAyot8DZmESoQpA7";

function showSection(sec, title, btn) {
  [aboutSection, contactSection, workSection, feedbackSection].forEach(s => s.classList.add('hidden'));
  sec.classList.remove('hidden');
  [aboutBtn, contactBtn, workBtn, feedbackBtn].forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  pageTitle.textContent = title;
}

aboutBtn.onclick = () => showSection(aboutSection, 'About Me', aboutBtn);
contactBtn.onclick = () => showSection(contactSection, 'Contact Me', contactBtn);
workBtn.onclick = () => showSection(workSection, 'Past Work', workBtn);
feedbackBtn.onclick = () => showSection(feedbackSection, 'Feedback', feedbackBtn);

showSection(aboutSection, 'About Me', aboutBtn);

contactForm.addEventListener('submit', async e => {
  e.preventDefault();
  envelope.classList.remove('hidden');
  const formData = new FormData(contactForm);
  formData.append('_captcha', 'false');
  formData.append('_template', 'table');
  try {
    const res = await fetch('https://formsubmit.co/ajax/xboxzacheus@gmail.com', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    });
    statusText.textContent = res.ok ? 'Email sent successfully!' : 'Failed to send email.';
    contactForm.reset();
  } catch {
    statusText.textContent = 'An error occurred.';
  }
  setTimeout(() => envelope.classList.add('hidden'), 1000);
});

let feedbackEntries = JSON.parse(localStorage.getItem('feedbackEntries') || '[]');

function renderFeedback() {
  feedbackList.innerHTML = '';
  feedbackEntries.forEach((entry, i) => {
    const div = document.createElement('div');
    div.className = 'feedback-entry';
    const guest = `Guest ${i + 1}`;
    div.innerHTML = `<strong>${guest}:</strong> ${entry.text}<small>${entry.time}</small>`;
    feedbackList.appendChild(div);
  });
}

feedbackForm.addEventListener('submit', async e => {
  e.preventDefault();
  const text = feedbackForm.feedback.value.trim();
  if (!text) return;

  const payload = { content: `New feedback received:\n${text}` };

  try {
    const res = await fetch(webhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const now = new Date();
      const time = now.toLocaleString();
      feedbackEntries.push({ text, time });
      localStorage.setItem('feedbackEntries', JSON.stringify(feedbackEntries));
      feedbackForm.reset();
      renderFeedback();
    } else {
      alert('Failed to send feedback to Discord.');
    }
  } catch (err) {
    alert('Error sending feedback: ' + err.message);
  }
});

renderFeedback();
