const aboutBtn = document.getElementById("aboutBtn");
const contactBtn = document.getElementById("contactBtn");
const workBtn = document.getElementById("workBtn");

const aboutSection = document.getElementById("aboutSection");
const contactSection = document.getElementById("contactSection");
const workSection = document.getElementById("workSection");

const pageTitle = document.getElementById("pageTitle");

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

// Default
showSection(aboutSection, "About Me", aboutBtn);
