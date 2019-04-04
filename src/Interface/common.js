//
// Component data type
//
export var ComponetDataType;
(function (ComponetDataType) {
    ComponetDataType[ComponetDataType["BYTE"] = 5120] = "BYTE";
    ComponetDataType[ComponetDataType["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
    ComponetDataType[ComponetDataType["SHORT"] = 5122] = "SHORT";
    ComponetDataType[ComponetDataType["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
    ComponetDataType[ComponetDataType["INT"] = 5124] = "INT";
    ComponetDataType[ComponetDataType["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
    ComponetDataType[ComponetDataType["FLOAT"] = 5126] = "FLOAT";
    ComponetDataType[ComponetDataType["DOUBLE"] = 5130] = "DOUBLE";
})(ComponetDataType || (ComponetDataType = {}));
//
// Primitive type enum
//
export var PrimitiveType;
(function (PrimitiveType) {
    PrimitiveType[PrimitiveType["POINTS"] = 0] = "POINTS";
    PrimitiveType[PrimitiveType["LINES"] = 1] = "LINES";
    PrimitiveType[PrimitiveType["LINE_LOOP"] = 2] = "LINE_LOOP";
    PrimitiveType[PrimitiveType["LINE_STRIP"] = 3] = "LINE_STRIP";
    PrimitiveType[PrimitiveType["TRIANGLES"] = 4] = "TRIANGLES";
    PrimitiveType[PrimitiveType["TRIANGLE_STRIP"] = 5] = "TRIANGLE_STRIP";
    PrimitiveType[PrimitiveType["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
})(PrimitiveType || (PrimitiveType = {}));
//# sourceMappingURL=common.js.map