export interface Usuario {
    codigo: string;
    clave: string;
    nombre?: string;    // Opcional, porque puede que en login no siempre venga
    apellido?: string;  // Opcional
  }
  