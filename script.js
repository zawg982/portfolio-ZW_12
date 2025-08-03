const aboutBtn = document.getElementById('aboutBtn');
const contactBtn = document.getElementById('contactBtn');
const workBtn = document.getElementById('workBtn');
const feedbackBtn = document.getElementById('feedbackBtn');

const aboutSection = document.getElementById('aboutSection');
const contactSection = document.getElementById('contactSection');
const workSection = document.getElementById('workSection');
const feedbackSection = document.getElementById('feedbackSection');

const pageTitle = document.getElementById('pageTitle');

// Feedback functionality
const feedbackList = document.getElementById('feedbackList');
const feedbackInput = document.getElementById('feedbackInput');
const feedbackSend = document.getElementById('feedbackSend');

let feedbackEntries = JSON.parse(localStorage.getItem('feedbackEntries') || '[]');
function renderFeedback() {
  feedbackList.innerHTML = '';
  feedbackEntries.forEach((e, i) => {
    const div = document.createElement('div');
    div.className = 'feedback-entry';
    div.innerHTML = `<strong>Guest ${i+1}:</strong> ${e.text}<small>${e.time}</small>`;
    feedbackList.appendChild(div);
  });
}
feedbackSend.onclick = () => {
  const text = feedbackInput.value.trim();
  if (!text) return;
  const time = new Date().toLocaleString();
  feedbackEntries.push({ text, time });
  localStorage.setItem('feedbackEntries', JSON.stringify(feedbackEntries));
  feedbackInput.value = '';
  renderFeedback();
};

renderFeedback();

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

// initialize default view
showSection(aboutSection, 'About Me', aboutBtn);
