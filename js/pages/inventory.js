// =============================
// Inventory Page Script
// =============================

// === Product Data ===
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
  camera: [
    { id: "C001", model: "Canon EOS", brand: "Canon", type: "DSLR", lens: "24-70mm", qty: 5 },
    { id: "C002", model: "Sony A7", brand: "Sony", type: "Mirrorless", lens: "28-70mm", qty: 8 },
  ],
};

// === DOM Elements ===
const cardContainer = document.getElementById("card-container");
const detailsSection = document.getElementById("details-section");
const cards = document.querySelectorAll(".inventory-card");

let headerTemplatesLoaded = false;

// =============================
// Load Headers from One File (Modular System)
// =============================
async function loadAllHeaders() {
  if (headerTemplatesLoaded) return;

  try {
    const res = await fetch("../../pages/headerTemplates/headers.html");
    if (!res.ok) throw new Error("Failed to fetch headers.html");

    const text = await res.text();
    const div = document.createElement("div");
    div.innerHTML = text;
    div.style.display = "none";
    document.body.appendChild(div);

    headerTemplatesLoaded = true;
  } catch (err) {
    console.error("❌ Error loading headers:", err);
    headerTemplatesLoaded = false;
  }
}

// Dynamically get table header based on category
async function getTableHeader(category) {
  await loadAllHeaders();

  if (!headerTemplatesLoaded) {
    // Return a clear message row if headers cannot be loaded
    return `<tr><th colspan="10" style="color:red; text-align:center;">Unable to fetch headers.</th></tr>`;
  }

  const template = document.getElementById(`header-${category}`);
  if (template) {
    return template.innerHTML;
  }

  // If no template found for that category
  console.warn(`⚠️ No header template found for '${category}'.`);
  return `<tr><th colspan="10" style="color:red; text-align:center;">Unable to fetch headers.</th></tr>`;
}

// =============================
// Card → Button Animation + Logic
// =============================
cards.forEach((card) => {
  card.addEventListener("click", async () => {
    const category = card.dataset.category;

    // Add transition for smooth morph
    cardContainer.classList.add("morphing");
    cards.forEach((c) => {
      c.classList.add("morph");
      c.classList.remove("active");
    });

    // Highlight selected card
    card.classList.add("active");

    // Smooth horizontal scroll if overflow
    setTimeout(() => {
      card.scrollIntoView({ behavior: "smooth", inline: "center" });
    }, 400);

    // After animation delay, load table
    setTimeout(async () => {
      await showTable(category);
    }, 700);
  });
});

// =============================
// Show Table for Selected Category
// =============================
async function showTable(category) {
  const headerHTML = await getTableHeader(category);
  const data = products[category] || [];

  // If headers couldn’t be fetched, still show error table message
  if (headerHTML.includes("Unable to fetch headers")) {
    detailsSection.innerHTML = `
      <div class="table-actions">
        <button class="btn back-btn" id="backToCards">
          <span class="material-icons">arrow_back</span> Back
        </button>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>${headerHTML}</thead>
          <tbody></tbody>
        </table>
      </div>
    `;
    detailsSection.classList.remove("hidden");
    document.getElementById("backToCards").addEventListener("click", goBack);
    return;
  }

  // Normal table rendering
  const rows = data
    .map(
      (item) => `
        <tr>
          ${Object.values(item)
            .map((v) => `<td>${v}</td>`)
            .join("")}
          <td class="action-buttons">
            <button class="edit-btn" title="Edit"><span class="material-icons">edit</span></button>
            <button class="delete-btn" title="Delete"><span class="material-icons">delete</span></button>
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
      <button class="btn filter-btn">
        <span class="material-icons">filter_list</span> Filter
      </button>
      <button class="btn export-btn">
        <span class="material-icons">file_download</span> Export
      </button>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead>${headerHTML}</thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;

  detailsSection.classList.remove("hidden");
  document.getElementById("backToCards").addEventListener("click", goBack);
}

// =============================
// Back Button Function
// =============================
function goBack() {
  detailsSection.classList.add("hidden");
  cardContainer.classList.remove("morphing");
  document.querySelectorAll(".inventory-card").forEach((c) =>
    c.classList.remove("morph", "active")
  );
}
