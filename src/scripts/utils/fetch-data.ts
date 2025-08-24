import {
  CategoryCardData,
  FullCardData,
  LargeCardData,
  SmallCardData,
} from '../../types/interfaces';

export async function loadCardsData(
  requiredTags: string[] = [],
  requiredIDs: number[] = [],
  dataCount: number = Infinity,
  route: string
) {
  const response = await fetch(`api/${route}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  const data = await response.json();

  const filteredData = data.filter((item: any) => {
    const matchedTags =
      requiredTags.length === 0 ||
      requiredTags.every((tag) => item.tags?.some((t: any) => t.tag === tag));

    const matchedIDs = requiredIDs.length === 0 || requiredIDs.includes(item.id);
    return matchedTags && matchedIDs;
  });

  const limitedData = filteredData.slice(0, dataCount);

  return limitedData as SmallCardData[] | LargeCardData[] | FullCardData[] | CategoryCardData[];
}
