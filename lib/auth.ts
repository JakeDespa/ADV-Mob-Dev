export type User = {
  name: string;
  email: string;
  // For security, we should not store passwords in plain text.
  // In a real application, this would be a hashed password.
  // For this example, we will store it in plain text for simplicity.
  password: string;
};
