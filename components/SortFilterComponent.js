// components/SortFilterComponent.js
export class SortFilterComponent {
  constructor(parent, onSortChange) {
    this.parent = parent;
    this.onSortChange = onSortChange;
  }

  render() {
    const html = `
      <div class="mb-3">
        <label for="sortSelect" class="form-label">Сортировка:</label>
        <select id="sortSelect" class="form-select">
          <option value="id_asc">По ID (возрастание)</option>
          <option value="id_desc">По ID (убывание)</option>
          <option value="time_asc">По времени (старые)</option>
          <option value="time_desc">По времени (новые)</option>
        </select>
      </div>
    `;
    this.parent.innerHTML = html;

    this.parent.querySelector('#sortSelect').addEventListener('change', (e) => {
      this.onSortChange(e.target.value);
    });
  }
}