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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, resultsPerPage = 25, sortBy, sortOrder = 1, searchKey, searchValue, } = body;
    const sort = sortOrder === 1 ? sortBy : `-${sortBy}`;
    const skip = (page - 1) * resultsPerPage;
    const limit = resultsPerPage;
    let searchFilter = {};
    if (searchKey && searchValue) {
        searchFilter = {
            [searchKey]: searchValue,
        };
    }
    return {
        sort,
        skip,
        limit,
        searchFilter,
    };
});
