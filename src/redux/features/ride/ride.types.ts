export interface IPaymentInfo {
  _id: string;
  paymentStatus: "pending" | "complete" | "failed";
  paymentMethod: "cash" | "card";
  amount: number;
  currency: string;
  transactionId?: string;
  cardInfo?: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  initiatedAt?: string;
  completedAt?: string;
}

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
    vehicleModel?: string;
    licensePlate?: string;
  };

  pickupLocation: string;
  destinationLocation: string;
  estimatedDistance?: number;
  estimatedTime?: number;
  paymentMethod?: "cash" | "card";
  payment?: IPaymentInfo;

  status:
    | "requested"
    | "accepted"
    | "picked_up"
    | "in_transit"
    | "ongoing"
    | "completed"
    | "cancelled"
    | "rejected"
    | "pickedUp"
    | "inTransit";

  fare: number;
  totalFare?: number;
  rating?: number;

  // New state machine & routing fields
  pickupCoords?: { lat: number; lng: number };
  destinationCoords?: { lat: number; lng: number };
  routeGeometry?: string;
  otp?: string;
  vehicleType?: "moto" | "sedan" | "xl";

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
  estimatedDistance?: number;
  estimatedTime?: number;
  totalFare?: number;
  paymentMethod?: "cash" | "card";
  pickupCoords?: { lat: number; lng: number };
  destinationCoords?: { lat: number; lng: number };
  routeGeometry?: string;
  vehicleType?: "moto" | "sedan" | "xl";
}

export interface ICancelRideBody {
  reason: string;
}

