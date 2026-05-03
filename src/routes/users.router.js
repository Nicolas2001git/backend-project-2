import { Router } from "express";
import { UserModel } from "../model/user.model.js";
import { CartModel } from "../model/cart.model.js";
import { createHash } from "../utils.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();

    res.json({
      status: "success",
      users
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener usuarios"
    });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await UserModel.findById(uid);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    res.json({
      status: "success",
      user
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al buscar usuario"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        status: "error",
        message: "El usuario ya existe"
      });
    }

    const newCart = await CartModel.create({ products: [] });

    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
      cart: newCart._id,
      role
    });

    res.status(201).json({
      status: "success",
      message: "Usuario creado correctamente",
      user: newUser
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al crear usuario"
    });
  }
});

router.put("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    if (req.body.password) {
      req.body.password = createHash(req.body.password);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(uid, req.body, {
      new: true
    });

    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    res.json({
      status: "success",
      message: "Usuario actualizado correctamente",
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al actualizar usuario"
    });
  }
});

router.delete("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(uid);

    if (!deletedUser) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    res.json({
      status: "success",
      message: "Usuario eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al eliminar usuario"
    });
  }
});

export default router;