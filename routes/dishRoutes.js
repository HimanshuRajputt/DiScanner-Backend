import express from "express";
import Dish from "../models/Dish.js";
import authMiddleware from "../middleware/authMiddleware.js";

const dishRoutes = express.Router();

// Get All Dishes
dishRoutes.get("/", async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
});

// Create a Dish
dishRoutes.post("/add", authMiddleware, async (req, res) => {
  const { dishName, items } = req.body;

  try {
    const dish = await Dish.create({ dishName, items });
    res.status(201).json(dish);
  } catch (error) {
    res.status(400).json({ error: "Failed to create dish" });
  }
});

// Delete a Dish
dishRoutes.delete("/:id",authMiddleware, async (req, res) => {
  try {
    await Dish.findByIdAndDelete(req.params.id);
    res.json({ message: "Dish deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete dish" });
  }
});
// Get a Dish by 
dishRoutes.get("/:id",authMiddleware, async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }
    res.json(dish);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch dish" });
  }
});

dishRoutes.put("/:id",authMiddleware, async (req,res)=>{
    try {
        const dish = await Dish.findById(req.params.id)
        if(!dish){
            return res.status(404).json({ error: "Dish not found" });
        } 
        Object.assign(dish,req.body)
        await dish.save();
        res.json(dish);
    } catch (error) {
        res.status(400).json({ error: "Failed to update dish" });
    }
})

export default dishRoutes;
