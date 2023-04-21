import axios from "axios";

class HttpRequest {
  static async get(url, token) {
    try {
      const res = await axios({
        method: "GET",
        url,
        headers: {
          authToken: `${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return err;
    }
  }

  static async post(url, data, token) {
    try {
      const res = await axios({
        method: "POST",
        url,
        headers: {
          authToken: `${token}`,
        },
        data,
      });

      return res.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  static async delete(url, token, data) {
    try {
      const res = await axios({
        method: "DELETE",
        url,
        headers: {
          authToken: `${token}`,
        },
        data,
      });

      return res.data;
    } catch (err) {
      console.log(err.response);
      return err;
    }
  }

  static async update(url, data, token) {
    try {
      const res = await axios({
        method: "PATCH",
        url,
        headers: {
          authToken: `${token}`,
        },
        data,
      });

      return res.data;
    } catch (err) {
      return err;
    }
  }
}

export default HttpRequest;
