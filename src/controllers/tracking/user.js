import { Customer, DeliveryPartner } from "../../models/user.js";

export const updateUser = async (req, reply) => {
  try {
    const { userId } = req.user;
    const updateData = req.body;

    let user =
      (await Customer.findById(userId)) || (await Customer.findById(userId));

    if (!user) {
      return reply.status(404).send({ message: "User not found." });
    }
    let UserModel;
    if (user.role === "Customer") {
      UserModel = Customer;
    } else if (user.role === "DeliveryPartner") {
      UserModel = DeliveryPartner;
    } else {
      return reply.status(400).send({ message: "Invalid user role." });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return reply.status(404).send({ message: "User not found." });
    }

    return reply.status(200).send({
      message: "user updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return reply
      .status(500)
      .send({ message: "An error occurred while updating user.", error });
  }
};
