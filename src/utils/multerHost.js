
import multer from "multer";
import { AppError } from "./AppError.js";

export const allowedValidation={
    image:['image/jpeg','image/png'],
}


export const multerCloud = (customValidation) =>{
    
if(!customValidation){
    customValidation=allowedValidation.image
}
    const storage = multer.diskStorage({})
    const fileFilter = (req, file, cb) => {
        if (customValidation.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new AppError("invalid data type",400), false)
        }
    }

    const upload = multer({fileFilter , storage }) 
   return upload
}