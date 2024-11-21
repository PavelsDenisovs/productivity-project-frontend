export const validateDisplayName = (name: string): string => {
  if (!name) return "";
  if (name.length > 50) return "Display name cannot exceed 50 characters.";
  if (!/^[a-zA-Z0-9\s]+$/.test(name)) return "Display name can only contain letters, number and spaces.";
  return "";
};

export const validateEmail = (email: string): string => {
  if (!email) return "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format.";
  return "";
};