import express from 'express'
import {addRecipe, deleteRecipe, getRecipe, getRecipes, updateRecipe } from '../controllers/recipe.js'


const router = express.Router()

router.get('/', getRecipes)
router.get('/:id',getRecipe )
router.post('/', addRecipe )
router.delete('/:id', )
router.put('/:id', )


export default router