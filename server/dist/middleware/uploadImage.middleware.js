"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPhoto = exports.productImageResize = exports.blogImageResize = void 0;
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const imageUploadPath = path_1.default.join(__dirname, "../public/images");
if (!fs_1.default.existsSync(imageUploadPath)) {
    try {
        fs_1.default.mkdirSync(imageUploadPath, { recursive: true });
    }
    catch (error) {
        console.error("Error creating image upload directory:", error);
    }
}
const multerStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageUploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.jpeg`);
    },
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        const errorMessage = new Error("Not an image! Please upload only images.");
        errorMessage.statusCode = 400;
        cb(errorMessage, false);
    }
};
const uploadPhoto = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 2000000 },
});
exports.uploadPhoto = uploadPhoto;
const imageResizeMiddleware = (outputPath) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files)
        return next();
    try {
        yield Promise.all(req.files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            const subdirectoryPath = path_1.default.join(imageUploadPath, outputPath);
            const destinationPath = path_1.default.join(subdirectoryPath, file.filename);
            if (!fs_1.default.existsSync(subdirectoryPath)) {
                try {
                    fs_1.default.mkdirSync(subdirectoryPath, {
                        recursive: true,
                    });
                }
                catch (error) {
                    console.error("Error creating subdirectory:", error);
                }
            }
            yield (0, sharp_1.default)(file.path)
                .resize(300, 300)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(destinationPath);
            // fs.unlinkSync(file.path);
        })));
        req.files.forEach((file) => {
            file.path = path_1.default.join(imageUploadPath, outputPath, file.filename);
        });
        next();
    }
    catch (error) {
        next(error);
    }
});
const productImageResize = imageResizeMiddleware("products");
exports.productImageResize = productImageResize;
const blogImageResize = imageResizeMiddleware("blogs");
exports.blogImageResize = blogImageResize;
