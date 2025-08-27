import type { IDriverInfo } from "./driver.type";

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

export interface IRiderInfo {
  defaultPaymentMethod?: string;
}

export interface IUser {
  readonly _id?: string;
  name: string;
  email: string;
  phone?: string;
  picture?: string;
  address?: string;
  role: string;
  isDeleted?: boolean;
  isActive?: string;
  isApproved?: boolean;
  isVerified?: boolean;
  isSuspend?: boolean;
  auths?: IAuthProvider[];
  driverInfo?: IDriverInfo | string;
  riderInfo?: IRiderInfo | string;
  agreeToTerms: boolean;
  agreeToMarketing: boolean;
}
