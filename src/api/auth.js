import { ENV } from "../utils";

export class Auth {
  baseApi = ENV.BASE_API;

  async register(data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.REGISTER}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.LOGIN}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async refreshAccessToken(refreshAccessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.REFRESH_ACCESS_TOKEN}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: refreshAccessToken,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  setAccessToken(accessToken) {
    localStorage.setItem(ENV.JWT.ACCESS, accessToken);
  }

  getAccessToken() {
    return localStorage.getItem(ENV.JWT.ACCESS);
  }

  setRefreshToken(refreshToken) {
    localStorage.setItem(ENV.JWT.REFRESH, refreshToken);
  }

  getRefreshToken() {
    return localStorage.getItem(ENV.JWT.REFRESH);
  }

  removeToken() {
    localStorage.removeItem(ENV.JWT.ACCESS);
    localStorage.removeItem(ENV.JWT.REFRESH);
  }
}
