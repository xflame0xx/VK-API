// components/ProductCardComponent.js
export class ProductCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  render(user, onClick) {
    // Фото напрямую с userapi.com — без прокси!
    const imgSrc = user.photo_400 || 'https://vk.com/images/camera_400.png';

    const div = document.createElement('div');
    div.className = 'col mb-4';
    div.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${imgSrc}" class="card-img-top" alt="Аватар" onerror="this.src='https://vk.com/images/camera_400.png'">
        <div class="card-body">
          <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
          <button class="btn btn-primary">Подробнее</button>
        </div>
      </div>
    `;
    this.parent.appendChild(div);
    div.querySelector('button').addEventListener('click', onClick);
  }
}