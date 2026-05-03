import { Router } from "express";
import passport from "passport";
import { UserModel } from "../model/user.model.js";
import { CartModel } from "../model/cart.model.js";
import { createHash, isValidPassword, generateToken } from "../utils.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos obligatorios"
      });
    }

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
      cart: newCart._id
    });

    res.status(201).json({
      status: "success",
      message: "Usuario registrado correctamente",
      user: {
        id: newUser._id,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        age: newUser.age,
        role: newUser.role,
        cart: newUser.cart
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al registrar usuario"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email y contraseña son obligatorios"
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Usuario no encontrado"
      });
    }

    const validPassword = isValidPassword(user, password);

    if (!validPassword) {
      return res.status(401).json({
        status: "error",
        message: "Contraseña incorrecta"
      });
    }

    const token = generateToken(user);

    res.cookie("coderCookieToken", token, {
      httpOnly: true
    });

    res.json({
      status: "success",
      message: "Login correcto",
      token
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al iniciar sesión"
    });
  }
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.json({
      status: "success",
      user: {
        id: req.user._id,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role,
        cart: req.user.cart
      }
    });
  }
);

export default router;