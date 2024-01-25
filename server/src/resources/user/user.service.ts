import User from "@/resources/user/user.interface";
import userModel from "@/resources/user/user.model";
import ConvertResponse from "@/utils/helpers/convertresponse.helper";
import PostBody from "@/utils/interfaces/postbody.interface";

class UserService {
  private user = userModel;

  public async getAllUsers(body: PostBody): Promise<User[]> {
    try {
      const { sort, skip, limit, searchFilter } = await ConvertResponse(body);

      const users = await this.user
        .find(searchFilter)
        .sort(sort)
        .skip(skip)
        .limit(limit);

      return users;
    } catch (error) {
      throw new Error("Error getting users");
    }
  }

  public async getUserById(id: string): Promise<User> {
    try {
      const user = await this.user.findById(id);
      if (!user) throw new Error();
      return user;
    } catch (error) {
      throw new Error("Error getting user");
    }
  }
}

export default UserService;
