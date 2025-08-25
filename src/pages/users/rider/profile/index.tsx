import Profile from "@/components/user-profile";

export default function RiderProfilePage() {
  return (
    <Profile
      userType="rider"
      initialData={{
        firstName: "Alex",
        lastName: "Johnson",
        email: "alex.johnson@email.com",
        phone: "+1 (555) 123-4567",
        dateOfBirth: "1990-05-15",
        totalRides: 47,
      }}
    />
  );
}
