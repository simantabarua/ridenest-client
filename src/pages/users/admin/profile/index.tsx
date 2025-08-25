import Profile from "@/components/user-profile";

export default function AdminProfile() {
  return (
    <Profile
      userType="admin"
      initialData={{
        firstName: "Sarah",
        lastName: "Williams",
        email: "sarah.williams@email.com",
        phone: "+1 (555) 456-7890",
        dateOfBirth: "1982-03-17",
        adminLevel: "Level 2",
        department: "Operations",
      }}
    />
  );
}
