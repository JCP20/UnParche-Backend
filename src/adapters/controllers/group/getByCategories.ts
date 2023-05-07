import mongoose from "mongoose";
import GroupModel from "../../../models/Group.model";
import { Request, Response} from "express";
import UserModel from "../../../models/User.model";

export const getRecommendationByCategories = async (req: Request, res: Response) => {
  try {
    // retornar los grupos recomendados dadas las categorias del usuario
    const current_user = await UserModel.findById(req.params.userId);
    if (current_user) {
      const categories = current_user.preferredCategories
      const recommended_groups = await GroupModel.find({category: {$in: categories} }).limit(categories.length*5);
      return res.status(200).json({ ok: true, msg: recommended_groups });
    } else {
      return res.status(404).json({ ok: false, msg: "El usuario no existe" });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error al obtener los grupos recomendados" });
  }
};