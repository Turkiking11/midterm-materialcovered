const examData = [
  {
    id: 1,
    subject: "biology",
    subjectName: "Biology",
    title: "Module 22",
    date: "Sunday (October 18, 2026)",
    topics: [
      "Lesson 22.2 (The Skeletal System)",
      "Lesson 22.3 (The Muscular System)",
    ]
  },
  {
    id: 2,
    subject: "english",
    subjectName: "English",
    title: "English Grammar",
    date: "Monday (October 19, 2026)",
    topics: [
      "Direct & Indirect Objects",
      "Prepositional Phrases",
      "Participal Phrases",
      "Gerund Phrases"
    ]
  },
  {
    id: 3,
    subject: "english",
    subjectName: "English",
    title: "Vocabulary & Literature",
    date: "Monday (October 19, 2026)",
    topics: [
      "Vocabulary Workshop: Unit 2",
      "Literature: The Refusal",
    ]
  },
  {
    id: 4,
    subject: "chemistry",
    subjectName: "Chemistry",
    title: "Module 2",
    date: "Tuesday (October 20, 2026)",
    topics: [
      "Lesson 2.2 (Changes in Matter)",
      "Lesson 2.3 (Elements & Compounds)",
      "Lesson 2.4 (Mixtures of Matter)",
    ]
  },
    {
    id: 5,
    subject: "arabic",
    subjectName: "Arabic (ASL)",
    title: "ASL Arabic",
    date: "Wednesday (October 21, 2026)",
    topics: [
      "صفحة  2  إلى صفحة  22 (Pages 2 to 22)",
    ]
  },
  {
    id: 6,
    subject: "arabic",
    subjectName: "Arabic (Normal)",
    title: "Normal Arabic",
    date: "Wednesday (October 21, 2026)",
    topics: [
      "الفهم القرائي: استيعاب النصوص وتحليلها.",
      "حالات إعراب الأسماء: الرفع، والنصب، والجر.",
      "علامات الإعراب: العلامات الأصلية والعلامات الفرعية.",
      " موضوع التعبير: كتابة المقال."
    ]
  },
  {
    id: 7,
    subject: "physics",
    subjectName: "Physics",
    title: "Module 1",
    date: "Thursday (October 22, 2026)",
    topics: [
      "Lesson 1.2 (Mathematics & Physics)",
      "Lesson 1.3 (Measurement)",
      "Lesson 1.4 (Graphing Data)"
    ]
  },
    {
    id: 8,
    subject: "math",
    subjectName: "Math",
    title: "Module 1 & 2",
    date: "Tuesday (October 27, 2026)",
    topics: [
      "Lesson 1.4 (Distance)",
      "Lesson 1.6 (Locating Points on a Coordinate Plane)",
      "Lesson 1.7 (Midpoints & Bisectors)",
      "Lesson 2.1 (Angles & Congruence)",
      "Lesson 2.2 (Angle Relationshops)",
      "Lesson 2.3 (Two-Dimensional Figures)"
    ]
  },
];

let selectedSubject = "all";
let searchQuery = "";

const grid = document.getElementById("lessonsGrid");
const searchInput = document.getElementById("searchInput");
const filterPills = document.querySelectorAll("#subjectFilters .pill");

function renderCards() {
  grid.innerHTML = "";

  const filtered = examData.filter(item => {
    const matchesSubject = selectedSubject === "all" || item.subject === selectedSubject;
    const matchesQuery = 
      item.title.toLowerCase().includes(searchQuery) ||
      item.subjectName.toLowerCase().includes(searchQuery) ||
      item.topics.some(t => t.toLowerCase().includes(searchQuery));
    
    return matchesSubject && matchesQuery;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty">No lessons found.</div>`;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    const topicsHtml = item.topics.map(t => `<li>${t}</li>`).join("");

    card.innerHTML = `
      <div class="card-top">
        <span class="subject-badge">${item.subjectName}</span>
        <span class="date">${item.date}</span>
      </div>
      <h2 class="card-title">${item.title}</h2>
      <ul class="topic-list">
        ${topicsHtml}
      </ul>
    `;

    grid.appendChild(card);
  });
}

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase().trim();
  renderCards();
});

filterPills.forEach(pill => {
  pill.addEventListener("click", () => {
    filterPills.forEach(p => p.classList.remove("active"));
    pill.classList.add("active");
    selectedSubject = pill.dataset.subject;
    renderCards();
  });
});

renderCards();