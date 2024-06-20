"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateFxns = void 0;
const DateFxns = () => {
    const date = new Date();
    return {
        yy: date.getFullYear() + 5,
        mm: date.getMonth(),
        dd: date.getDate()
    };
};
exports.DateFxns = DateFxns;
