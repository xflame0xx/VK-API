// components/ProductCardComponent.js
export class ProductCardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  render(user, onClick) {
    const imgSrc = user.photo_400 || 'https://vk.com/images/camera_400.png';
    const roleTag = user.role === 'owner'
      ? '<span class="badge bg-danger">Владелец</span>'
      : '<span class="badge bg-warning text-dark">Админ</span>';

    const div = document.createElement('div');
    div.className = 'col';
    div.innerHTML = `
      <div class="card h-100">
        <img src="${imgSrc}" class="card-img-top" alt="Аватар" onerror="this.src='https://vk.com/images/camera_400.png'">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
          <div class="mt-2">${roleTag}</div>
          <button class="btn btn-primary mt-auto">Подробнее</button>
        </div>
      </div>
    `;
    this.parent.appendChild(div);
    div.querySelector('button').addEventListener('click', onClick);
  }
}