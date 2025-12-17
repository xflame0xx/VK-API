// router.js
import { MainPage } from "../pages/MainPage.js";
import { UserPage } from "../pages/UserPage.js";

export class Router {
  constructor(root) {
    this.root = root;
  }

  navigateToMain() {
    this.root.innerHTML = '';
    new MainPage(this.root, (id) => this.navigateToUser(id)).render();
  }

  navigateToUser(userId) {
    this.root.innerHTML = '';
    new UserPage(this.root, userId, () => this.navigateToMain()).render();
  }
}