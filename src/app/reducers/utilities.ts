import { Dictionary } from '@ngrx/entity';

export const idsToEntities = <T>(entities: Dictionary<T>, ids: string[]) => ids.map(id => entities[id]).filter(a => !!a);

