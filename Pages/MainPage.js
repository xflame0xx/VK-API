// pages/MainPage.js
import { SortFilterComponent } from "../components/SortFilterComponent.js";
import { ProductCardComponent } from "../components/ProductCardComponent.js";
import { ajax } from "../modules/ajax.js";
import { urls } from "../modules/urls.js";
import { groupId } from "../modules/consts.js";

export class MainPage {
  constructor(parent, onUserClick) {
    this.parent = parent;
    this.onUserClick = onUserClick;
    this.currentSort = 'id_asc';
  }

  render() {
    this.parent.innerHTML = `
      <div class="container mt-4">
        <h2>Участники группы</h2>
        <div id="filter"></div>
        <div id="members" class="row"></div>
      </div>
    `;

    const filter = this.parent.querySelector('#filter');
    const members = this.parent.querySelector('#members');

    new SortFilterComponent(filter, (sort) => {
      this.currentSort = sort;
      this.loadMembers(members);
    }).render();

    this.loadMembers(members);
  }

  loadMembers(container) {
    container.innerHTML = '<p class="text-center">Загрузка...</p>';

    ajax.get(urls.getGroupMembers(groupId, this.currentSort), (data) => {
      if (data.error) {
        container.innerHTML = `<p class="text-danger">${data.error.error_msg || 'Ошибка'}</p>`;
        return;
      }

      // 🔥 ВАЖНО: items — это [123, 456, 789], а не [{id:123}, ...]
      const userIds = data.response.items; // ← БЕЗ .map()!

      this.renderUsers(container, userIds);
    });
  }

  renderUsers(container, userIds) {
    container.innerHTML = '';
    if (!userIds?.length) {
      container.innerHTML = '<p>Нет участников</p>';
      return;
    }

    userIds.forEach(userId => {
      ajax.get(urls.getUserInfo(userId), (res) => {
        if (res?.response?.[0]) {
          new ProductCardComponent(container).render(res.response[0], () => {
            this.onUserClick(userId);
          });
        }
      });
    });
  }
}