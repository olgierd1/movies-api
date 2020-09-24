"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSerializerService = void 0;
class BaseSerializerService {
    serializeCollection(values) {
        return values.map((v) => this.serialize(v));
    }
}
exports.BaseSerializerService = BaseSerializerService;
//# sourceMappingURL=base.serializer.js.map