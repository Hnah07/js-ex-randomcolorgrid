import "./style.css";
import randomColor from "randomcolor";

// Maak de hoofdstructuur van de layout
const main = document.createElement("main");
main.style.display = "grid";
main.style.gridTemplateColumns = "5fr 1fr";
main.style.gridTemplateRows = "1fr 5fr";
main.style.height = "100vh";

// Header
const header = document.createElement("div");
header.className = "header";
header.style.gridRow = "1 / 2";
header.style.gridColumn = "1 / 2";
header.style.padding = "2rem";
header.innerHTML = `
  <h1 style="font-size: 3rem;">Set your amount</h1>
  <div class="form" style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 1rem; padding-top: 2rem;">
    <div class="input" style="grid-column: 1 / 2;">
      ${["Columns", "Rows", "Colors"]
        .map(
          (label) =>
            `<p style="display: flex; justify-content: space-between; padding: 1rem 5rem 0 0;">
              <label for="${label.toLowerCase()}">${label}</label>
              <input id="${label.toLowerCase()}" name="${label.toLowerCase()}" type="number" style="background-color: green; border-radius: 5px;" />
            </p>`
        )
        .join("")}
    </div>
    <button style="grid-column: 2 / 3; font-size: 3rem; background-color: green; border-radius: 5px; margin-top: 1rem; color: black;">GO</button>
  </div>
`;

const zoneStats = document.createElement("div");
zoneStats.className = "zoneStats";
zoneStats.style.gridRow = "1 / -1";
zoneStats.style.gridColumn = "2 / 3";

const grid = document.createElement("div");
grid.className = "grid";
grid.style.gridRow = "2 / -1";
grid.style.gridColumn = "1 / 2";

main.append(header, zoneStats, grid);
document.body.appendChild(main);

document.querySelectorAll("div").forEach((div) => {
  if (!div.classList.contains("form") && !div.classList.contains("input")) {
    div.style.borderStyle = "solid";
    div.style.borderColor = "black";
    div.style.borderWidth = "1px";
  }
});

document.querySelector("button").onclick = () => {
  const columns = document.querySelector("#columns").value;
  const rows = document.querySelector("#rows").value;
  const colors = document.querySelector("#colors").value;

  grid.style.display = "grid";
  grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  grid.innerHTML = "";

  const kleurekes = Array.from({ length: colors }, () => randomColor());

  for (let i = 0; i < columns * rows; i++) {
    const span = document.createElement("span");
    span.style.backgroundColor =
      kleurekes[Math.floor(Math.random() * kleurekes.length)];
    grid.appendChild(span);
  }

  zoneStats.innerHTML = "";
  const kleurkesTellen = {};
  Array.from(grid.children).forEach((el) => {
    const kleur = el.style.backgroundColor;
    kleurkesTellen[kleur] = (kleurkesTellen[kleur] || 0) + 1;
  });

  for (const kleur in kleurkesTellen) {
    const count = kleurkesTellen[kleur];
    const stat = document.createElement("p");
    stat.style.display = "flex";
    stat.style.alignItems = "center";
    stat.style.margin = "1rem";

    const kleureke = document.createElement("span");
    kleureke.style.backgroundColor = kleur;
    kleureke.style.width = "2rem";
    kleureke.style.height = "2rem";
    kleureke.style.marginRight = "1rem";
    kleureke.style.border = "1px solid black";

    stat.append(kleureke, `${count}`);
    zoneStats.appendChild(stat);
  }
};
