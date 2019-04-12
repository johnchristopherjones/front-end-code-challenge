import { Dictionary } from '@ngrx/entity';

export const idsToEntities = <T>(entities: Dictionary<T>, ids: string[]) => ids.map(id => entities[id]).filter(a => !!a);

/**
 * Split an array into sub-arrays of max length.
 *
 * Intended for splitting up long option lists before
 * sending to an API server.
 */
export const chunkArray = (array, chunksize) => {
  const chunks = [];
  array.forEach((code, idx) => {
    const partitionId = Math.floor(idx / chunksize);
    chunks[partitionId] = [...(chunks[partitionId] || []), code];
  });
  return chunks;
}
