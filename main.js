// pages/MainPage.js
import { SortFilterComponent } from "../components/SortFilterComponent.js";
import { ProductCardComponent } from "../components/ProductCardComponent.js";
import { ajax } from "../modules/ajax.js"; 
import { urls } from "../modules/urls.js";
import { groupId } from "../modules/consts.js";
import { Router } from "../router.js";

const app = document.getElementById('app');
const router = new Router(app);
router.navigateToMain();

export class MainPage {
  constructor(parent, onUserClick) {
    this.parent = parent;
    this.onUserClick = onUserClick; 
    this.currentSort = 'id';
  }

  getHTML() {
    return `
      <div class="container mt-4">
        <h2>Участники группы</h2>
        <div id="sort-filter"></div>
        <div id="members-list" class="row row-cols-1 row-cols-md-3 g-4"></div>
      </div>
    `;
  }

  render() {
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('beforeend', this.getHTML());

    const filterContainer = this.parent.querySelector('#sort-filter');
    const listContainer = this.parent.querySelector('#members-list');
    this.pageRoot = listContainer;

    const sortFilter = new SortFilterComponent(filterContainer, (sortValue) => {
      this.currentSort = sortValue;
      this.loadMembers();
    });

    sortFilter.render();
    this.loadMembers();
  }

  loadMembers() {
    this.pageRoot.innerHTML = '<p class="text-center">Загрузка...</p>';

    
    ajax.get(urls.getGroupMembers(groupId, this.currentSort), (data) => {
      if (data.error) {
        console.error('Ошибка VK API:', data.error);
        this.pageRoot.innerHTML = `<p class="text-danger">Ошибка: ${data.error.error_msg || 'Неизвестная ошибка'}</p>`;
        return;
      }

      this.renderData(data.response.items);
    });
  }

  renderData(items) {
    this.pageRoot.innerHTML = '';

    if (!items || items.length === 0) {
      this.pageRoot.innerHTML = '<p class="text-muted">В группе нет участников.</p>';
      return;
    }

    items.forEach((item) => {
      const card = new ProductCardComponent(this.pageRoot);
     
      card.render(item, () => {
        this.onUserClick(item.id); 
      });
    });
  }
  
}