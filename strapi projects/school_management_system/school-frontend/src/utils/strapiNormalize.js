/**
 * Normalizes Strapi responses (supporting both Strapi v5 flattened objects and Strapi v4 attributes).
 */
export function normalizeEntity(item) {
  if (!item) return null;

  // If item is wrapped in { data: ... }
  if (item.data !== undefined) {
    return normalizeEntity(item.data);
  }

  // Handle array
  if (Array.isArray(item)) {
    return item.map(normalizeEntity);
  }

  // If item is not an object
  if (typeof item !== "object") return item;

  const id = item.id;
  const documentId = item.documentId || (item.attributes && item.attributes.documentId) || id;
  const rawAttrs = item.attributes ? item.attributes : item;

  const normalized = {
    id,
    documentId,
  };

  // Copy over all other attributes
  for (const [key, value] of Object.entries(rawAttrs)) {
    if (key === "id" || key === "documentId") continue;

    if (value && typeof value === "object") {
      if (Array.isArray(value)) {
        normalized[key] = value.map(normalizeEntity);
      } else if (value.data !== undefined) {
        normalized[key] = normalizeEntity(value.data);
      } else {
        normalized[key] = normalizeEntity(value);
      }
    } else {
      normalized[key] = value;
    }
  }

  return normalized;
}

/**
 * Normalizes a Strapi collection response ({ data: [...], meta: {...} })
 */
export function normalizeResponse(response) {
  if (!response) return [];
  const rawData = response.data !== undefined ? response.data : response;
  if (!rawData) return [];
  if (Array.isArray(rawData)) {
    return rawData.map(normalizeEntity);
  }
  return normalizeEntity(rawData);
}

/**
 * Returns the best identifier for an entity (documentId in Strapi v5, otherwise id).
 */
export function getEntityId(entity) {
  if (!entity) return "";
  if (typeof entity === "string" || typeof entity === "number") return entity;
  return entity.documentId || entity.id;
}
