import faker from '@faker-js/faker';

const randomBool = () => faker.datatype.boolean();
const randomInt = (min = 0, max = 100) => faker.datatype.number({ min, max });
const randomFloat = (precision: `0.${'' | '0' | '00' | '000' | '0000' | '00000'}1` = '0.001', min = 0, max = 1000) => faker.datatype.float({ min, max, precision: parseFloat(precision) });
const randomItem = (arr: any[]) => arr.at(randomInt(0, arr.length - 1));


type RandomFakerItem = { key: string } |
{
  key: string,
  options: (string | boolean | number | Record<string, any>)[],
} |
{
  key: string,
  options: (string | boolean | number | Record<string, any>)[],
  childs: RandomFakerItem[],
};

const FAKER_MAPPER: RandomFakerItem[] = [
  {
    key: 'address', childs: [
      ...Object.keys(faker.address).filter((key) => !['zipCodeByState', 'streetAddress', 'countryCode', 'direction'].includes(key)).map((key) => ({ key })),
      { key: 'countryCode', options: [randomItem(['alpha-2', 'alpha-3'])] },
      { key: 'streetAddress', options: [randomBool()] },
    ],
  },
  {
    key: 'animal', childs: Object.keys(faker.animal).filter((key) => key !== 'type').map((key) => ({ key })),
  },
  {
    key: 'commerce', childs: [
      ...Object.keys(faker.commerce).filter((key) => key !== 'price').map((key) => ({ key })),
      { key: 'price', options: [randomInt(), randomInt(), randomFloat(), randomBool() ? '$' : undefined] },
    ],
  },
  {
    key: 'compoany', childs: Object.keys(faker.company).map((key) => ({ key })),
  },
  {
    key: 'database', childs: Object.keys(faker.database).map((key) => ({ key })),
  },
  {
    key: 'date', childs: Object.keys(faker.date).map((key) => ({ key })),
  },
];

console.log(JSON.stringify(FAKER_MAPPER, null, 4));
