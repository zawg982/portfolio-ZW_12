const aboutBtn = document.getElementById("aboutBtn");
const contactBtn = document.getElementById("contactBtn");
const workBtn = document.getElementById("workBtn");
const aboutSection = document.getElementById("aboutSection");
const contactSection = document.getElementById("contactSection");
const workSection = document.getElementById("workSection");
const pageTitle = document.getElementById("pageTitle");
const contactForm = document.getElementById("contactForm");
const envelope = document.getElementById("envelopeAnimation");
const statusText = document.getElementById("status");

function showSection(sectionToShow, titleText, activeBtn) {
  [aboutSection, contactSection, workSection].forEach(sec => sec.classList.add("hidden"));
  sectionToShow.classList.remove("hidden");

  [aboutBtn, contactBtn, workBtn].forEach(btn => btn.classList.remove("active"));
  activeBtn.classList.add("active");

  pageTitle.textContent = titleText;
}

aboutBtn.onclick = () => showSection(aboutSection, "About Me", aboutBtn);
contactBtn.onclick = () => showSection(contactSection, "Contact Me", contactBtn);
workBtn.onclick = () => showSection(workSection, "Past Work", workBtn);

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  envelope.classList.remove("hidden");

  const formData = new FormData(contactForm);
  formData.append("_captcha", "false");
  formData.append("_template", "table");

  try {
    const res = await fetch("https://formsubmit.co/ajax/xboxzacheus@gmail.com", {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: formData
    });

    if (res.ok) {
      statusText.textContent = "Email sent successfully!";
      contactForm.reset();
    } else {
      statusText.textContent = "Failed to send email. Try again.";
    }
  } catch (err) {
    statusText.textContent = "An error occurred. Try again later.";
  }

  setTimeout(() => {
    envelope.classList.add("hidden");
  }, 1000);
});

showSection(aboutSection, "About Me", aboutBtn);
