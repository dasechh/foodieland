import { CardRouteMap } from '../types/interfaces';

type cardRoute = keyof CardRouteMap;

export async function loadRecipeData<T extends cardRoute>(
  requiredTags: string[] = [],
  requiredIDs: number[] = [],
  dataCount: number = Infinity,
  route: T
): Promise<CardRouteMap[T][]> {
  const response = await fetch(`api/${route}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  const data: CardRouteMap[T][] = await response.json();

  const filteredData = data.filter((item) => {
    const matchedTags =
      requiredTags.length === 0 ||
      (Array.isArray(item.tags) &&
        requiredTags.every((tag) => item.tags.some((t) => t.tag === tag)));
    const matchedIDs = requiredIDs.length === 0 || requiredIDs.includes(Number(item.id));
    return matchedTags && matchedIDs;
  });

  for (let i = filteredData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filteredData[i], filteredData[j]] = [filteredData[j], filteredData[i]];
  }

  return filteredData.slice(0, dataCount);
}
