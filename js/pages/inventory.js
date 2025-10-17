// assets/js/inventory.js

const products = {
  desktop: [
    { id: "D001", model: "HP EliteDesk", cpu: "i5", ram: "8GB", storage: "512GB SSD", qty: 10 },
    { id: "D002", model: "Dell OptiPlex", cpu: "i7", ram: "16GB", storage: "1TB SSD", qty: 7 },
  ],
  laptop: [
    { id: "L001", model: "Lenovo ThinkPad", brand: "Lenovo", cpu: "i5", ram: "8GB", storage: "512GB SSD", qty: 12 },
    { id: "L002", model: "MacBook Air", brand: "Apple", cpu: "M2", ram: "8GB", storage: "256GB", qty: 10 },
  ],
  printer: [
    { id: "P001", model: "HP LaserJet", type: "Laser", brand: "HP", qty: 6 },
    { id: "P002", model: "Canon Pixma", type: "Inkjet", brand: "Canon", qty: 4 },
  ],
  mobile: [
    { id: "M001", model: "iPhone 14", brand: "Apple", storage: "128GB", qty: 8 },
    { id: "M002", model: "Galaxy S23", brand: "Samsung", storage: "256GB", qty: 10 },
  ],
  scanner: [
    { id: "S001", model: "Canon DR-C240", type: "Document", brand: "Canon", qty: 5 },
    { id: "S002", model: "Epson DS-530", type: "Sheet-fed", brand: "Epson", qty: 3 },
  ],
};

const cards = document.querySelectorAll(".inventory-card");
const cardContainer = document.getElementById("card-container");
const detailsSection = document.getElementById("details-section");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const category = card.dataset.category;

    // Morph animation
    cardContainer.classList.add("morphing");
    cards.forEach((c) => {
      c.classList.add("morph");
      c.classList.remove("active");
    });

    // Highlight clicked one
    card.classList.add("active");

    // Scroll into view horizontally
    setTimeout(() => {
      card.scrollIntoView({ behavior: "smooth", inline: "center" });
    }, 400);

    // After animation, show table
    setTimeout(() => {
      showTable(category);
    }, 700);
  });
});

function showTable(category) {
  const headerHTML = inventoryHeaders[category];
  const data = products[category];

  const rows = data
    .map(
      (item) => `
    <tr>
      ${Object.values(item)
        .map((v) => `<td>${v}</td>`)
        .join("")}
      <td>
        <button class="edit-btn"><span class="material-icons">edit</span></button>
        <button class="delete-btn"><span class="material-icons">delete</span></button>
      </td>
    </tr>
  `
    )
    .join("");

  detailsSection.innerHTML = `
    <div class="table-actions">
      <button class="btn back-btn" id="backToCards">
        <span class="material-icons">arrow_back</span> Back
      </button>
    </div>
    <table class="data-table">
      <thead>${headerHTML}</thead>
      <tbody>${rows}</tbody>
    </table>
  `;
  detailsSection.classList.remove("hidden");

  document.getElementById("backToCards").addEventListener("click", () => {
    detailsSection.classList.add("hidden");
    cardContainer.classList.remove("morphing");
    cards.forEach((c) => c.classList.remove("morph", "active"));
  });
}
