const pageTitle = document.getElementById("pageTitle");
const aboutBtn = document.getElementById("aboutBtn");
const contactBtn = document.getElementById("contactBtn");
const workBtn = document.getElementById("workBtn");

const aboutSection = document.getElementById("aboutSection");
const contactSection = document.getElementById("contactSection");
const workSection = document.getElementById("workSection");

function showSection(section) {
  [aboutSection, contactSection, workSection].forEach(s => s.classList.add("hidden"));
  [aboutBtn, contactBtn, workBtn].forEach(b => b.classList.remove("active"));

  switch (section) {
    case "about":
      aboutSection.classList.remove("hidden");
      aboutBtn.classList.add("active");
      pageTitle.textContent = "About Me";
      break;
    case "contact":
      contactSection.classList.remove("hidden");
      contactBtn.classList.add("active");
      pageTitle.textContent = "Contact Me";
      break;
    case "work":
      workSection.classList.remove("hidden");
      workBtn.classList.add("active");
      pageTitle.textContent = "Past Work";
      break;
  }
}

aboutBtn.onclick = () => showSection("about");
contactBtn.onclick = () => showSection("contact");
workBtn.onclick = () => showSection("work");
