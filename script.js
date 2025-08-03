const aboutBtn = document.getElementById('aboutBtn');
const contactBtn = document.getElementById('contactBtn');
const workBtn = document.getElementById('workBtn');
const feedbackBtn = document.getElementById('feedbackBtn');
const aboutSection = document.getElementById('aboutSection');
const contactSection = document.getElementById('contactSection');
const workSection = document.getElementById('workSection');
const feedbackSection = document.getElementById('feedbackSection');
const pageTitle = document.getElementById('pageTitle');
// Contact pieces (existing)
const contactForm = document.getElementById('contactForm');
const envelope = document.getElementById('envelopeAnimation');
const statusText = document.getElementById('status');
// Feedback pieces
const feedbackForm = document.getElementById('feedbackForm');
const feedbackList = document.getElementById('feedbackList');

// Navigation handler
function showSection(sec, title, btn) {
  [aboutSection, contactSection, workSection, feedbackSection]
    .forEach(s=>s.classList.add('hidden'));
  sec.classList.remove('hidden');
  [aboutBtn, contactBtn, workBtn, feedbackBtn]
    .forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  pageTitle.textContent = title;
}

aboutBtn.onclick = () => showSection(aboutSection, 'About Me', aboutBtn);
contactBtn.onclick = () => showSection(contactSection, 'Contact Me', contactBtn);
workBtn.onclick = () => showSection(workSection, 'Past Work', workBtn);
feedbackBtn.onclick = () => showSection(feedbackSection, 'Feedback', feedbackBtn);
showSection(aboutSection, 'About Me', aboutBtn);

// Contact submission (unchanged)
contactForm.addEventListener('submit', async e=>{
  e.preventDefault();
  envelope.classList.remove('hidden');
  const formData = new FormData(contactForm);
  formData.append('_captcha','false');
  formData.append('_template','table');
  try {
    const res = await fetch('https://formsubmit.co/ajax/xboxzacheus@gmail.com',{method:'POST',headers:{'Accept':'application/json'},body: formData});
    statusText.textContent = res.ok ? 'Email sent successfully!' : 'Failed to send email.';
    contactForm.reset();
  } catch(err) {
    statusText.textContent = 'An error occurred.';
  }
  setTimeout(()=>envelope.classList.add('hidden'),1000);
});

// Feedback handling
let feedbackEntries = JSON.parse(localStorage.getItem('feedbackEntries')||'[]');
let guestCount = feedbackEntries.length;

function renderFeedback(){
  feedbackList.innerHTML = '';
  feedbackEntries.forEach((entry,i)=>{
    const div = document.createElement('div');
    div.className = 'feedback-entry';
    const guest = `Guest ${i+1}`;
    div.innerHTML = `<strong>${guest}:</strong> ${entry.text}<small>${entry.time}</small>`;
    feedbackList.appendChild(div);
  });
}

feedbackForm.addEventListener('submit', e=>{
  e.preventDefault();
  const text = feedbackForm.feedback.value.trim();
  if(!text) return;
  const now = new Date();
  const time = now.toLocaleString();
  feedbackEntries.push({ text, time });
  localStorage.setItem('feedbackEntries', JSON.stringify(feedbackEntries));
  feedbackForm.reset();
  renderFeedback();
});

// initial load
renderFeedback();
