import { Router } from "express";
import {
    createProduct,
    updateProduct,
    addThumbnail,
    removeThumbnail,
    deleteProduct,
} from "../controllers/adminProduct.controller";
import { upload } from "../config/multer.config";
import { adminAuth } from '../middlewares/auth.middlewares'

const router = Router();

//* Admin Routes For Product
router.post("/create", adminAuth, upload.array("thumbnails", 5), createProduct)
router.post("/add-thumbnail/:id", adminAuth, upload.array("thumbnails", 5), addThumbnail)
router.delete("/remove-thumbnail/:id/thumbnail", adminAuth, removeThumbnail)
router.put("/update/:id", adminAuth, upload.array("thumbnails", 5), updateProduct)
router.delete("/delete/:id", adminAuth, deleteProduct)


export default router;