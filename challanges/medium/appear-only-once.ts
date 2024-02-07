import type { Equal, Expect } from "@type-challenges/utils";

type FindEles<T extends number[], Excluded extends number[] = []> = T extends [
  infer First,
  ...infer Rest extends number[],
]
  ? First extends Excluded[number]
    ? [...FindEles<Rest, Excluded>]
    : First extends Rest[number]
      ? [...FindEles<Rest, [...Excluded, First]>]
      : [First, ...FindEles<Rest, Excluded>]
  : [];

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
];
