import axios from "../client/rest";

class UserApi {
  static sharedInstance = new UserApi();

  constructor() {
    if (UserApi.sharedInstance !== null) {
      return UserApi.sharedInstance;
    }
  }
  async createUser(body: any) {
    try {
      const res = await axios.post("Users/CreateUser", body);
      const { data } = res;
      if (res.status === 200) {
        return data;
      } else {
        throw res || "Something went wrong";
      }
    } catch (err) {
      throw err;
    }
  }
  async ValidateUser(data: any) {
    try {
      const res = await axios.get("Users/ValidateUser", {
        params: { email: data.email, password: data.password },
      });
      if (res.status === 200) {
        return res.data;
      } else {
        throw "Something went wrong";
      }
    } catch (err) {
      throw err;
    }
  }
}
export default UserApi.sharedInstance;
