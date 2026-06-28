import { Especie } from './especie.model';

export interface RankingEntry {
  posicion: number;
  especie: Especie;
  victorias: number;
}
