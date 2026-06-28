import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EspecieApi } from '../../../../core/api/especie.api';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  private fb = inject(FormBuilder);
  private especieApi = inject(EspecieApi);
  private toastService = inject(ToastService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    nivelPoder: [500, [Validators.required, Validators.min(1), Validators.max(1000)]],
    habilidadEspecial: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]]
  });

  loading = false;

  submit(): void {
    if (this.form.invalid) {
      this.toastService.warning('Por favor completa todos los campos correctamente');
      return;
    }

    this.loading = true;
    this.especieApi.registrar(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.toastService.success('Especie registrada exitosamente');
        this.router.navigate(['/especies']);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 409) {
          this.toastService.warning('Ya existe una especie con ese nombre');
        } else {
          this.toastService.error('No se pudo registrar la especie', 'Error', null);
        }
      }
    });
  }
}
