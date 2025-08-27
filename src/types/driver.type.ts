import type { IUser } from "./user.type";

export interface IVehicleInfo {
  type: string;
  model: string;
  registrationNumber: string;
}

export interface IDriverInfo {
  _id: string;
  driver: IUser;
  completedRides: number;
  createdAt: string;
  updatedAt: string;
  earnings: number;
  isAvailable: boolean;
  licenseNumber: string;
  rating: number;
  vehicleInfo: IVehicleInfo;
}
