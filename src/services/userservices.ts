import User from "../models/userModel";

class UserService {
  // Fetch all users
  async getAllUsers(): Promise<any> {
    return await User.find();
  }

  // Fetch a user by ID
  async getUserById(id: string): Promise<any> {
    return await User.findById(id);
  }

  // Create a new user
  async createUser(name: string, email: string): Promise<any> {
    const newUser = new User({ name, email });
    return await newUser.save();
  }
}

export default new UserService();
