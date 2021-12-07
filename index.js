const timeFrame = document.querySelector(".time__dedicated");
const daily = document.querySelector(".daily");
const weekly = document.querySelector(".weekly");
const monthly = document.querySelector(".monthly");

let duration = "weekly";
let prevDuration = "week";

daily.addEventListener("click", () => {
  duration = "daily";
  prevDuration = "day";
  daily.classList.add("active");
  monthly.classList.remove("active");
  weekly.classList.remove("active");
  getData();
});
weekly.addEventListener("click", () => {
  duration = "weekly";
  prevDuration = "week";
  daily.classList.remove("active");
  monthly.classList.remove("active");
  weekly.classList.add("active");
  getData();
});
monthly.addEventListener("click", () => {
  duration = "monthly";
  prevDuration = "month";
  daily.classList.remove("active");
  monthly.classList.add("active");
  weekly.classList.remove("active");
  getData();
});

const getData = async () => {
  const res = await fetch("./data.json");
  const data = await res.json();

  let template = "";
  data.forEach((item) => {
    let nameNew = item.title.replace(" ", "").toLowerCase();

    template += `
     <div class="block">
          <div class="block__header block__header--${nameNew}">
          </div>
          <div class="block__data">
            <div class="block__data--header">
              <h4 class="block__title">${item.title}</h4>
              <p class="block__more">...</p>
            </div>
            <div class="block__data--details">
              <h2 class = "block__data--hours" >${item.timeframes[duration].current}hrs</h2>
              <p class = "previous duration" >Last ${prevDuration} -${item.timeframes[duration].previous}hrs</p>
            </div>
          </div>
        </div>
    `;
  });
  timeFrame.innerHTML = template;
};
getData();
