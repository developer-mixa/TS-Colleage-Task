const checkToken = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return false;
  
    try {
      const response = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch (error) {
      console.error("Ошибка при проверке токена:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return false;
    }
  }; 

export default checkToken;