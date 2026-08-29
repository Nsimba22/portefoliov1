const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];

$("#year").textContent = new Date().getFullYear();
$("#year2").textContent = new Date().getFullYear();

/* Mobile menu */
const sidebar = $("#sidebar");
$("#menuBtn").addEventListener("click", () => sidebar.classList.toggle("open"));
$$(".nav-link").forEach(link => link.addEventListener("click", () => sidebar.classList.remove("open")));

/* Cursor glow */
const glow = $(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* Animated particles */
const particleBox = $(".particles");
for (let i = 0; i < 32; i++) {
  const p = document.createElement("span");
  p.style.left = Math.random()*100 + "%";
  p.style.animationDelay = (-Math.random()*8) + "s";
  p.style.animationDuration = (5 + Math.random()*8) + "s";
  p.style.opacity = (.15 + Math.random()*.35);
  particleBox.appendChild(p);
}

/* Reveal on scroll */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:.12});
$$(".reveal").forEach(el => revealObserver.observe(el));

/* Skill bars */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      $$(".bar i", entry.target).forEach(bar => bar.style.width = bar.dataset.width);
      skillObserver.unobserve(entry.target);
    }
  });
}, {threshold:.25});
$$(".skills-card").forEach(el => skillObserver.observe(el));

/* Count-up statistics */
function countUp(el) {
  const target = Number(el.dataset.count);
  if (!target) return;
  let start = 0;
  const step = Math.max(1, Math.ceil(target / 30));
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = start;
  }, 35);
}
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      $$("[data-count]", entry.target).forEach(countUp);
      countObserver.unobserve(entry.target);
    }
  });
}, {threshold:.5});
$$(".stats-grid").forEach(el => countObserver.observe(el));

/* Active navigation */
const sections = $$("section[id]");
const navLinks = $$(".nav-link");
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, {rootMargin:"-35% 0px -55% 0px"});
sections.forEach(section => navObserver.observe(section));

/* Back to top */
const topBtn = $("#topBtn");
window.addEventListener("scroll", () => topBtn.classList.toggle("show", window.scrollY > 500));
topBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

/* Small parallax effect on hero photo */
const photo = $(".photo-card");
window.addEventListener("pointermove", e => {
  if (window.innerWidth < 800) return;
  const x = (e.clientX / window.innerWidth - .5) * 5;
  const y = (e.clientY / window.innerHeight - .5) * 5;
  photo.style.transform = `rotate(1.5deg) translate(${x}px,${y}px)`;
});

/* Typing-style role rotation */
const roles = ["PROFISSIONAL VERSÁTIL", "INFORMÁTICA", "ATENDIMENTO", "INGLÊS"];
let roleIndex = 0, charIndex = 0, deleting = false;
const roleEl = $(".hero-role");
function typeRole() {
  const word = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    roleEl.innerHTML = word + ' <i>•</i> INFORMÁTICA <i>•</i> ATENDIMENTO <i>•</i> INGLÊS';
    if (charIndex >= word.length) {
      deleting = true;
      setTimeout(typeRole, 1600);
      return;
    }
  } else {
    charIndex--;
    if (charIndex <= 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 45 : 90);
}
setTimeout(typeRole, 1300);


/* ===== DOCUMENT PREVIEW ===== */
const pdfModal = $("#pdfModal");
const pdfFrame = $("#pdfFrame");
const modalTitle = $("#pdfModalTitle");
const modalDownload = $("#modalDownload");
const closePdfModal = () => {
  pdfModal.classList.remove("open");
  pdfModal.setAttribute("aria-hidden","true");
  pdfFrame.src = "";
  document.body.style.overflow = "";
};
$$(".preview-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const file = btn.dataset.preview;
    modalTitle.textContent = btn.dataset.title || "Pré-visualização";
    pdfFrame.src = file + "#toolbar=1&navpanes=0&view=FitH";
    modalDownload.href = file;
    modalDownload.setAttribute("download", file.split("/").pop());
    pdfModal.classList.add("open");
    pdfModal.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
  });
});
$("#closePdfModal").addEventListener("click", closePdfModal);
$$("[data-close-modal]").forEach(el => el.addEventListener("click", closePdfModal));
document.addEventListener("keydown", e => { if (e.key === "Escape" && pdfModal.classList.contains("open")) closePdfModal(); });

/* Download-all feedback */
const downloadAll = $("#downloadAll");
if (downloadAll) {
  downloadAll.addEventListener("click", () => {
    const original = downloadAll.innerHTML;
    downloadAll.innerHTML = "A descarregar… ✓";
    setTimeout(() => downloadAll.innerHTML = original, 1800);
  });
}
