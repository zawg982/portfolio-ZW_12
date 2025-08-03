const pageTitle = document.getElementById("pageTitle");
const aboutBtn = document.getElementById("aboutBtn");
const contactBtn = document.getElementById("contactBtn");
const workBtn = document.getElementById("workBtn");

const aboutSection = document.getElementById("aboutSection");
const contactSection = document.getElementById("contactSection");
const workSection = document.getElementById("workSection");

function showSection(sectionName) {
  // Hide all
  aboutSection.classList.add("hidden");
  contactSection.classList.add("hidden");
  workSection.classList.add("hidden");

  aboutBtn.classList.remove("active");
  contactBtn.classList.remove("active");
  workBtn.classList.remove("active");

  // Show selected
  if (sectionName === "about") {
    aboutSection.classList.remove("hidden");
    aboutBtn.classList.add("active");
    pageTitle.textContent = "About Me";
  } else if (sectionName === "contact") {
    contactSection.classList.remove("hidden");
    contactBtn.classList.add("active");
    pageTitle.textContent = "Contact Me";
  } else if (sectionName === "work") {
    workSection.classList.remove("hidden");
    workBtn.classList.add("active");
    pageTitle.textContent = "Past Work";
  }
}

aboutBtn.onclick = () => showSection("about");
contactBtn.onclick = () => showSection("contact");
workBtn.onclick = () => showSection("work");

function sendEmail() {
  const email = document.getElementById("email").value;
  const discord = document.getElementById("discord").value;
  const message = document.getElementById("message").value;

  const mailtoLink = `mailto:xboxzacheus@gmail.com?subject=Portfolio Contact&body=Email: ${email}%0D%0ADiscord: ${discord}%0D%0AMessage: ${message}`;
  window.location.href = mailtoLink;

  document.getElementById("status").textContent = "Opening your email client...";
}
