import { ROLE, UserModel } from "../model/user.model";
import { hashedPassword } from "../utility/auth.utility";

export async function createLogin() {
  try {
    const adminCredentials = {
      email: "admin@yopmail.com",
      password: "admin123456",
    };

    const encryptedPassword = hashedPassword(adminCredentials.password);

    const user = await UserModel.find({
      email: "admin@yopmail.com",
      role: ROLE.SUPERADMIN,
    }).countDocuments();

    if (user > 0) {
      console.log(" 🚀 🚀 🚀  ALready created");
      return;
    }
    await UserModel.create({
      email: "admin@yopmail.com",
      password: encryptedPassword,
      role: ROLE.SUPERADMIN,
    });
  } catch (error) {
    console.log("🚀 ~ createLogin ~ error:", error);
  }
}
