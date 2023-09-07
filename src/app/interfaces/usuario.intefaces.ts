export interface Usuario {
    nombre: string;
    email:  string;
    password?: string;
    google?: boolean;
    img?:    string;
    role?:   string;
    uid?:    string;
}
