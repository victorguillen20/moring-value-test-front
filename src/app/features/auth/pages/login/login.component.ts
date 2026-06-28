import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  loading = false;

  submit(): void {
    if (this.form.invalid) {
      this.toastService.warning('Por favor completa todos los campos correctamente');
      return;
    }

    this.loading = true;
    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.toastService.success('Bienvenido al Torneo Galactico');
        this.router.navigate(['/ranking']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.toastService.error(
          err.status === 401
            ? 'Credenciales invalidas. Verifica tu usuario y contrasena.'
            : 'Error al iniciar sesion. Intenta nuevamente.'
        );
      }
    });
  }
}
