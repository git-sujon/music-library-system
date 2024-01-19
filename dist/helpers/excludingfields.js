"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function excludeFields(obj, keys) {
    if (Array.isArray(obj)) {
        return obj.map(item => Object.fromEntries(Object.entries(item).filter(([key]) => !keys.includes(key))));
    }
    else {
        return Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key)));
    }
}
exports.default = excludeFields;
