/* eslint-disable @typescript-eslint/no-explicit-any */
export const getUserRole = (response: any): string | null => {
  const role = response?.data?.user?.role?.toLowerCase() || null;

  if (!role) return null;
  return role.startsWith("super_") ? role.replace("super_", "") : role;
};
