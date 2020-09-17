import { BaseSerializerService } from "./base.serializer";
import TestUtils from '../../test/test.utils';

interface TestEntity {
  id: string,
  name: string
}

interface TestDto {
  name: string
}

class TestSerializer extends BaseSerializerService<TestEntity, TestDto> {
  public serialize(entity: TestEntity): TestDto {
    return {
      name: entity.name
    }
  }
}

describe('BaseSerializer', () => {
  it('should serialize collection', () => {
    const given = [
      {
        id: TestUtils.random(2),
        name: TestUtils.random(4)
      },
      {
        id: TestUtils.random(2),
        name: TestUtils.random(4)
      }
    ]
    const serializer = new TestSerializer()
    const actual = serializer.serializeCollection(given)
    expect(actual).toEqual([
      { name: given[0].name },
      { name: given[1].name },
    ])

  })
})