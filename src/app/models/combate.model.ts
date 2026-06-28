import { Especie } from './especie.model';

export interface Combate {
  id: number;
  especie1: Especie;
  especie2: Especie;
  ganador: Especie;
  nivelEfectivoEspecie1: number;
  nivelEfectivoEspecie2: number;
  modificadorEspecie1: number;
  modificadorEspecie2: number;
  fecha: string;
}
