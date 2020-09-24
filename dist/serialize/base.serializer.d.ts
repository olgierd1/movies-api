export declare abstract class BaseSerializerService<E, T> {
    abstract serialize(entity: E): T;
    serializeCollection(values: E[]): T[];
}
