import Profile from "@/components/user-profile";

export default function DriverProfilePage() {
  return (
    <Profile
      userType="driver"
      initialData={{
        firstName: "Michael",
        lastName: "Smith",
        email: "michael.smith@email.com",
        phone: "+1 (555) 987-6543",
        dateOfBirth: "1985-08-22",
        licensePlate: "ABC123",
        vehicleType: "Sedan",
        rating: 4.8,
        totalRides: 142,
      }}
    />
  );
}
