// components/FilterComponent.js
export class SortFilterComponent {
  constructor(parent, onFilterChange) {
    this.parent = parent;
    this.onFilterChange = onFilterChange;
  }

  render() {
    const html = `
      <div class="mb-3">
        <label class="form-label">Фильтр:</label>
        <select class="form-select">
          <option value="managers">Администраторы (владелец + админы)</option>
          <option value="friends">Друзья</option>
          <option value="unsure">Сомневающиеся</option>
          <option value="donut">Donut</option>
        </select>
      </div>
    `;
    this.parent.innerHTML = html;

    this.parent.querySelector('select').addEventListener('change', (e) => {
      this.onFilterChange(e.target.value);
    });
  }
}