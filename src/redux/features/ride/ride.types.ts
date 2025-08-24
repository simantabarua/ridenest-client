export type IRideStatus =
  | "ACCEPTED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "COMPLETED"
  | "REJECTED"
  | "CANCELLED";

export interface IRide {
  _id: string;
  pickupLocation: string;
  destinationLocation: string;
  distance?: number;
  rider: string;
  status: IRideStatus;
  createdAt: string;
  updatedAt: string;
  acceptedAt?: string;
  pickedUpAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  rejectedAt?: string;
  inTransitAt?: string;
  timestamps?: string[];
  rating?: number;
  fare: number;
  driver: string;
  duration: number;
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
