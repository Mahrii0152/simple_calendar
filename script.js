const monthYear = document.getElementById("monthYear");
const daysContainer = document.getElementById("days");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let currentDate = new Date();
let selectedDay = localStorage.getItem("selectedDay");

function renderCalendar() {
  daysContainer.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.textContent = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  // dias vazios
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.classList.add("day", "empty");
    daysContainer.appendChild(empty);
  }

  // dias do mês
  for (let day = 1; day <= lastDate; day++) {
    const dayEl = document.createElement("div");
    dayEl.classList.add("day");
    dayEl.textContent = day;

    const key = `${year}-${month}-${day}`;

    // hoje
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayEl.classList.add("today");
    }

    // selecionado
    if (key === selectedDay) {
      dayEl.classList.add("selected");
    }

    dayEl.addEventListener("click", () => {
      selectedDay = key;
      localStorage.setItem("selectedDay", selectedDay);
      renderCalendar();
    });

    daysContainer.appendChild(dayEl);
  }
}

prevBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};

nextBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

renderCalendar();
