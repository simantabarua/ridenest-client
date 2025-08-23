export const IRole = {
  ADMIN: "ADMIN",
  DRIVER: "DRIVER",
  RIDER: "RIDER",
  SUPER_ADMIN: "SUPER_ADMIN",
};

export type AuthProviderType = "google" | "credentials";

export interface IAuthProvider {
  provider: AuthProviderType;
  providerId: string;
}

export interface IDriverInfo {
  licenseNumber: string;
  vehicleType: string;
}

export interface IRiderInfo {
  defaultPaymentMethod?: string;
}

export interface IUser {
  readonly _id?: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  role: string;
  isDeleted?: boolean;
  isActive?: string;
  isApproved?: boolean;
  isVerified?: boolean;
  isSuspended?: boolean;
  auths?: IAuthProvider[];
  driverInfo?: IDriverInfo;
  riderInfo?: IRiderInfo;
  agreeToTerms: boolean;
  agreeToMarketing: boolean;
}
