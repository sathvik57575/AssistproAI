import multer from "multer";

const storage = multer.diskStorage({}) //we can skip destination and file name for now as we're not storing on our laptopx

const upload = multer({storage: storage})

export {upload}