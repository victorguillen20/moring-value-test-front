import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordsMatchValidator });

  loading = false;

  passwordsMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  submit(): void {
    if (this.form.invalid) {
      this.toastService.warning('Por favor completa todos los campos correctamente');
      return;
    }

    this.loading = true;
    const { confirmPassword, ...request } = this.form.value;
    this.authService.register(request).subscribe({
      next: () => {
        this.loading = false;
        this.toastService.success('Bienvenido al Torneo Galactico');
        this.router.navigate(['/ranking']);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 409) {
          this.toastService.warning('El nombre de usuario o email ya esta registrado');
        } else {
          this.toastService.error('No se pudo completar el registro', 'Error', null);
        }
      }
    });
  }
}
