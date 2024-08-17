export interface admin {
  id: number; // L'ID de l'utilisateur
  nom: string; // Le nom de l'utilisateur
  prenom: string; // Le prénom de l'utilisateur
  email: string; // L'adresse email de l'utilisateur
  role: string;
  phoneNumber:string;
  PasswordHash: string; // Utiliser PasswordHash au lieu de password
}
