"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const prettier_1 = __importDefault(require("prettier"));
const resourceContent_helper_1 = require("./utils/helpers/resourceContent.helper");
const resourceName = process.argv[2];
if (!resourceName) {
    console.error("Usage: ts-node generateResource.ts <resourceName>");
    process.exit(1);
}
const resourceFolder = path.join(__dirname, "resources", resourceName);
const createFolder = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        console.log(`Created folder: ${folderPath}`);
    }
};
const createFile = (filePath, content) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        console.log(`Created file: ${filePath}`);
    }
};
createFolder(resourceFolder);
createFile(path.join(resourceFolder, `${resourceName}.controller.ts`), (0, resourceContent_helper_1.controllerContent)(resourceName));
createFile(path.join(resourceFolder, `${resourceName}.interface.ts`), (0, resourceContent_helper_1.interfaceContent)(resourceName));
createFile(path.join(resourceFolder, `${resourceName}.model.ts`), (0, resourceContent_helper_1.modelContent)(resourceName));
createFile(path.join(resourceFolder, `${resourceName}.service.ts`), (0, resourceContent_helper_1.serviceContent)(resourceName));
createFile(path.join(resourceFolder, `${resourceName}.validation.ts`), (0, resourceContent_helper_1.validationContent)(resourceName));
console.log(`Resource '${resourceName}' created successfully.`);
function updateIndexFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const indexPath = path.join(__dirname, "index.ts");
        const controllerImport = `import ${resourceName}Controller from '@/resources/${resourceName}/${resourceName}.controller';`;
        const controllerNewInstance = `new ${resourceName}Controller(),`;
        let indexContent = fs.readFileSync(indexPath, "utf-8");
        const indexContentArray = indexContent.split("\n");
        const validateEnvIndex = indexContentArray.findIndex((line) => line.includes("validateEnv()"));
        indexContentArray.splice(validateEnvIndex - 1, 0, controllerImport);
        const lastControllerInstance = indexContentArray.findIndex((line) => line.includes("],"));
        indexContentArray.splice(lastControllerInstance, 0, controllerNewInstance);
        const newContent = indexContentArray.join("\n");
        const formattedContent = yield prettier_1.default.format(newContent, {
            parser: "typescript",
        });
        fs.writeFileSync(indexPath, formattedContent, "utf-8");
    });
}
updateIndexFile()
    .then(() => {
    console.log("Index file updated successfully.");
})
    .catch((error) => {
    console.error("Error updating index file:", error);
});
