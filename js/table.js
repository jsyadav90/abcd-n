document.addEventListener("DOMContentLoaded", function () {
  const selectAll = document.getElementById("selectAll");
  const checkboxes = document.querySelectorAll(".row-checkbox");
// 

  // ====== Row Selection Logic ======
  function updateSelectAllState() {
    const total = checkboxes.length;
    const checked = document.querySelectorAll(".row-checkbox:checked").length;
    if (checked === total) {
      selectAll.checked = true;
      selectAll.indeterminate = false;
    } else if (checked > 0 && checked < total) {
      selectAll.checked = false;
      selectAll.indeterminate = true;
    } else {
      selectAll.checked = false;
      selectAll.indeterminate = false;
    }
  }

  function toggleRowHighlight(checkbox) {
    const row = checkbox.closest("tr");
    row.classList.toggle("selected", checkbox.checked);
  }

  if (selectAll) {
    selectAll.addEventListener("change", function () {
      checkboxes.forEach((cb) => {
        cb.checked = this.checked;
        toggleRowHighlight(cb);
      });
      updateSelectAllState();
    });
  }

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      toggleRowHighlight(this);
      updateSelectAllState();
    });
  });


});
