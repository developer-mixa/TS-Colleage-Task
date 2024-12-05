class UsersApi {
  private readonly USER_DATA_URL = "https://dummyjson.com/auth/me";

  async getCurrentUserData() {
    return await fetch(this.USER_DATA_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }

  async login(username: string, password: string){
    return await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password }),
    });
  }

}

export default UsersApi;