import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  UserMinus,
  Mail,
  Phone,
  MapPin,
  Star,
  CheckCircle,
} from "lucide-react";
import {
  useGetAdminStatsQuery,
  useGetAllUserQuery,
} from "@/redux/features/admin/admin.api";
import Loading from "@/components/loading";

export default function UserManagementPage() {
  const { data: users, isLoading } = useGetAllUserQuery(undefined);
  const { data: stats } = useGetAdminStatsQuery(undefined);
  console.log(users);
  const handleSuspendUser = (userId: number) => {
    console.log("Suspend user:", userId);
  };

  const handleActivateUser = (userId: number) => {
    console.log("Activate user:", userId);
  };

  const handleDeleteUser = (userId: number) => {
    console.log("Delete user:", userId);
  };

  if (isLoading) {
    return <Loading variant="bars" />;
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">User Management</h1>
            <p className="text-muted-foreground">
              Manage all users on the platform
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
              <UserPlus className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.data?.totalUsers}
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Rides
              </CardTitle>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.data?.totalRides}
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Riders
              </CardTitle>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.data?.totalRiders}
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Drivers
              </CardTitle>
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.data?.totalDrivers}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {users?.data?.data?.map((user) => (
            <Card
              key={user.id}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  {/* Left Content */}
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {user.name}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge>{user.status}</Badge>
                        <Badge>{user.role}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{user.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Content */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 lg:mb-0">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Joined
                      </div>
                      <div className="font-medium">{user.joinDate}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Last Active
                      </div>
                      <div className="font-medium">{user.lastActive}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {user.role === "rider" ? "Spent" : "Earned"}
                      </div>
                      <div className="font-medium">
                        {user.role === "rider"
                          ? user.totalSpent
                          : user.totalEarnings}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {user.role === "rider" ? "Rides" : "Trips"}
                      </div>
                      <div className="font-medium">{user.totalRides}</div>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="flex items-center justify-between lg:justify-end space-x-2">
                    {user.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{user.rating}</span>
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {user.status === "active" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuspendUser(user._id)}
                        >
                          <UserMinus className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleActivateUser(user._id)}
                        >
                          <UserPlus className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {users?.data?.data?.length === 0 && (
          <Card className="border-0 shadow-lg text-center py-12">
            <CardContent>
              <UserPlus className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No users found</h3>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
