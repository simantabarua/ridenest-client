export type IRideStatus =
  | "ACCEPTED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "COMPLETED"
  | "REJECTED"
  | "CANCELLED";

export interface ILocation {
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface IRide {
  pickupLocation: Location;
  destinationLocation: Location;
  distance?: number;
}

export interface IRequestRideBody {
  pickupLocation: string;
  destinationLocation: string;
  fare: number;
}

export interface ICancelRideBody {
  reason: string;
}

export interface UpdateRideStatusBody {
  status: IRideStatus;
}
