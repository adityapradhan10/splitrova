export const metadata = {
  AUTH: {
    SUCCESS: 0,
    INVALID: 1,
    EXTERNAL_ERROR: 2,
  },
};

type MetadataKeys = keyof typeof metadata;

export const module = (Object.keys(metadata) as MetadataKeys[]).reduce(
  (result, item) => {
    result[item] = item;
    return result;
  },
  {} as Record<MetadataKeys, MetadataKeys>,
);
