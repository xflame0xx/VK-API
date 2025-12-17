// modules/urls.js
import { accessToken, version } from "./consts.js";

export class Urls {
  constructor() {
    this.baseUrl = 'https://api.vk.com/method';
    this.common = `access_token=${accessToken}&v=${version}`;
  }

  getUserInfo(userId) {
    return `${this.baseUrl}/users.get?user_ids=${userId}&fields=photo_400,city,mobile_phone,sex,last_seen&${this.common}`;
  }

  getGroupMembers(groupId, sort = 'id_asc') {
    return `${this.baseUrl}/groups.getMembers?group_id=${groupId}&sort=${sort}&${this.common}`;
  }
}

export const urls = new Urls();