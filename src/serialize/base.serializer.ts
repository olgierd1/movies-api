export abstract class BaseSerializerService<E, T> {
  public abstract serialize(entity: E): T;

  public serializeCollection(values: E[]): T[] {
    return values.map((v) => this.serialize(v));
  }
}