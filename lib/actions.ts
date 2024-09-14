import prisma from "./db";

interface UserData {
  id: string;
  userName: string;
  email: string;
  password: string;
}

export const createUser = async (userData: UserData) => {
  try {
    const userCreated = await prisma.user.create({
      data: userData,
    });
    if (userCreated.id) {
      return userCreated;
    }
    return "something is wrong. Retry it";
  } catch (error) {
    console.log(error);
  }
};
