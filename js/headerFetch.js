document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category") || "Unknown";

  const tableHeader = document.getElementById("tableHeader");
  const tableBody = document.getElementById("itemTableBody");
  const categoryTitle = document.getElementById("categoryTitle");
  const backBtn = document.getElementById("backBtn");
  const modal = document.getElementById("addItemModal");
  const addItemBtn = document.getElementById("addItemBtn");
  const closeModal = document.getElementById("closeItemModal");
  const form = document.getElementById("addItemForm");

  // 🧩 Dynamic Title
  categoryTitle.textContent = `${category} Accessories`;

  // 🧠 Change file paths here only (reusable)
  const headersFile = "../data/accessoryHeaders.json";
  const dataFile = "../data/accessories.json";

  try {
    // ===== Fetch Headers =====
    const headerRes = await fetch(headersFile);
    if (!headerRes.ok) throw new Error("Header fetch failed");
    const headerData = await headerRes.json();
    const headers = headerData[category]?.headers;

    if (!headers || headers.length === 0) {
      tableHeader.innerHTML = `<tr><th>Unable to fetch headers</th></tr>`;
      return;
    }

    // ===== Render Headers =====
    tableHeader.innerHTML = `
      <tr>
        <th><input type="checkbox" id="selectAll" /></th>
        ${headers.map((h) => `<th>${h}</th>`).join("")}
        <th>Actions</th>
      </tr>
    `;

    // ===== Fetch Data =====
    const dataRes = await fetch(dataFile);
    if (!dataRes.ok) throw new Error("Data fetch failed");
    const data = await dataRes.json();
    let items = data[category] || [];

    renderTable(items, headers);

    // ===== Add Item Modal =====
    addItemBtn.addEventListener("click", () => (modal.style.display = "flex"));
    closeModal.addEventListener("click", () => (modal.style.display = "none"));
    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const newItem = {
        id: `AC-${Date.now().toString().slice(-5)}`,
        model: document.getElementById("itemName").value,
        spec: document.getElementById("itemSpec").value,
        status: "Available",
        date: new Date().toISOString().split("T")[0],
      };
      items.push(newItem);
      renderTable(items, headers);
      modal.style.display = "none";
      form.reset();
    });

    // ===== Back Button =====
    backBtn.addEventListener("click", () => {
      window.location.href = "accessory.html";
    });

    function renderTable(items, headers) {
      if (!items.length) {
        tableBody.innerHTML = `<tr><td colspan="${headers.length + 2}">No items found</td></tr>`;
        return;
      }

      tableBody.innerHTML = items
        .map(
          (item) => `
          <tr>
            <td><input type="checkbox" class="row-checkbox" /></td>
            ${headers
              .map((key) => `<td>${item[key.toLowerCase()] || "-"}</td>`)
              .join("")}
            <td class="action-buttons">
              <button class="edit-btn"><span class="material-icons">edit</span></button>
              <button class="delete-btn"><span class="material-icons">delete</span></button>
            </td>
          </tr>`
        )
        .join("");
    }
  } catch (err) {
    console.error(err);
    tableHeader.innerHTML = `<tr><th>Error loading headers</th></tr>`;
    tableBody.innerHTML = `<tr><td colspan="10">Error fetching data</td></tr>`;
  }
});
