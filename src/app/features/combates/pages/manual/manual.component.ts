import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Especie } from '../../../../models/especie.model';
import { Combate } from '../../../../models/combate.model';
import { EspecieApi } from '../../../../core/api/especie.api';
import { CombateApi } from '../../../../core/api/combate.api';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-manual',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './manual.component.html',
  styleUrl: './manual.component.scss'
})
export class ManualComponent implements OnInit {

  private fb = inject(FormBuilder);
  private especieApi = inject(EspecieApi);
  private combateApi = inject(CombateApi);
  private toastService = inject(ToastService);

  especies: Especie[] = [];
  loading = false;
  fighting = false;
  resultado: Combate | null = null;

  form: FormGroup = this.fb.group({
    especie1Id: [null, [Validators.required]],
    especie2Id: [null, [Validators.required]],
    esDesempate: [false]
  });

  ngOnInit(): void {
    this.cargarEspecies();
    this.form.get('especie1Id')?.valueChanges.subscribe(() => {
      this.resultado = null;
    });
    this.form.get('especie2Id')?.valueChanges.subscribe(() => {
      this.resultado = null;
    });
  }

  cargarEspecies(): void {
    this.loading = true;
    this.especieApi.listar().subscribe({
      next: (especies) => {
        this.especies = especies;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastService.error('No se pudieron cargar las especies', 'Error', null);
      }
    });
  }

  get mismaEspecie(): boolean {
    const id1 = this.form.get('especie1Id')?.value;
    const id2 = this.form.get('especie2Id')?.value;
    return id1 && id2 && id1 === id2;
  }

  get puedeCombatir(): boolean {
    return this.especies.length >= 2 && this.form.valid && !this.fighting;
  }

  iniciarCombate(): void {
    if (this.form.invalid) {
      this.toastService.warning('Selecciona dos especies para iniciar el combate');
      return;
    }

    this.fighting = true;
    this.resultado = null;
    const { especie1Id, especie2Id, esDesempate } = this.form.value;
    this.combateApi.iniciar({ especie1Id, especie2Id, esDesempate }).subscribe({
      next: (combate) => {
        this.fighting = false;
        this.resultado = combate;
        this.toastService.success('Combate finalizado');
      },
      error: () => {
        this.fighting = false;
      }
    });
  }
}
