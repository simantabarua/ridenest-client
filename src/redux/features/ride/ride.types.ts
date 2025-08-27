export interface IRide {
  _id: string;
  rider: {
    _id: string;
    name: string;
    email: string;
  };

  driver?: {
    _id: string;
    name: string;
    email: string;
  };

  pickupLocation: string;
  destinationLocation: string;
  estimatedDistance?: number;
  estimatedTime?: number;

  status:
    | "requested"
    | "accepted"
    | "ongoing"
    | "completed"
    | "cancelled"
    | "rejected"
    | "inTransit";

  fare: number;
  rating?: number;

  timestamps: {
    requestedAt: string;
    acceptedAt?: string;
    pickedUpAt?: string;
    inTransitAt?: string;
    completedAt?: string;
    cancelledAt?: string;
    rejectedAt?: string;
  };

  createdAt: string;
  updatedAt: string;
}

export interface IRequestRideBody {
  pickupLocation: string;
  destinationLocation: string;
  fare: number;
}

export interface ICancelRideBody {
  reason: string;
}
