import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format, parseISO } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { BedDouble, Calendar, Clock, Check, X, AlertTriangle } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const BookingsPage = () => {
  const { userBookings, cancelBooking } = useBooking();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [pendingCancelId, setPendingCancelId] = useState<number | null>(null);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    navigate("/login?redirect=bookings");
    return null;
  }

  const handleCancelBooking = async () => {
    if (pendingCancelId !== null) {
      try {
        const success = await cancelBooking(pendingCancelId);

        if (success) {
          toast({
            title: "Booking Cancelled",
            description: "Your booking has been cancelled successfully."
          });
        } else {
          toast({
            title: "Cancellation Failed",
            description: "Unable to cancel the booking.",
            variant: "destructive"
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An error occurred. Please try again.",
          variant: "destructive"
        });
      } finally {
        setPendingCancelId(null);
      }
    }
  };

  // Filter bookings based on selected status
  const filteredBookings = selectedStatus === "all" ?
  userBookings :
  userBookings.filter((booking) => booking.status.toLowerCase() === selectedStatus.toLowerCase());

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-5 w-5" />;
      case "Confirmed":
        return <Calendar className="h-5 w-5" />;
      case "Completed":
        return <Check className="h-5 w-5" />;
      case "Cancelled":
        return <X className="h-5 w-5" />;
      default:
        return null;
    }
  };

  // If no bookings found
  if (userBookings.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center" data-id="0p8qer1kg" data-path="src/pages/BookingsPage.tsx">
          <div className="max-w-md mx-auto" data-id="virk64i8h" data-path="src/pages/BookingsPage.tsx">
            <div className="mb-6 flex justify-center" data-id="pkdueynig" data-path="src/pages/BookingsPage.tsx">
              <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center" data-id="gf38u7k9h" data-path="src/pages/BookingsPage.tsx">
                <BedDouble className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-4" data-id="9ey0qya8c" data-path="src/pages/BookingsPage.tsx">No bookings yet</h1>
            <p className="text-gray-600 mb-8" data-id="lg1sv3oud" data-path="src/pages/BookingsPage.tsx">
              You haven't made any room bookings yet. Explore our accommodations and book your stay!
            </p>
            <Button asChild>
              <a href="/rooms" data-id="vbddbbkqf" data-path="src/pages/BookingsPage.tsx">Browse Rooms</a>
            </Button>
          </div>
        </div>
      </MainLayout>);

  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12" data-id="v6mp3p2mq" data-path="src/pages/BookingsPage.tsx">
        <h1 className="text-3xl font-bold mb-8" data-id="gtvl4avpc" data-path="src/pages/BookingsPage.tsx">My Bookings</h1>

        <Tabs defaultValue="all" onValueChange={setSelectedStatus}>
          <TabsList className="mb-8">
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedStatus} className="space-y-6">
            {filteredBookings.length === 0 ?
            <div className="text-center py-12" data-id="sap2j9frz" data-path="src/pages/BookingsPage.tsx">
                <div className="flex justify-center mb-4" data-id="nqzmkvxlk" data-path="src/pages/BookingsPage.tsx">
                  <AlertTriangle className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2" data-id="yy6vuqc03" data-path="src/pages/BookingsPage.tsx">No bookings found</h3>
                <p className="text-gray-600" data-id="5ca3r553p" data-path="src/pages/BookingsPage.tsx">
                  You don't have any {selectedStatus !== "all" ? selectedStatus : ""} bookings.
                </p>
              </div> :

            <>
                {filteredBookings.map((booking) =>
              <Card key={booking.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4" data-id="m0a5jwbaa" data-path="src/pages/BookingsPage.tsx">
                        <div data-id="5nv03ppco" data-path="src/pages/BookingsPage.tsx">
                          <CardTitle className="text-lg">
                            Booking #{booking.id.toString().slice(-6)}
                          </CardTitle>
                          <CardDescription>
                            Booked on {format(parseISO(booking.createdAt), "MMM dd, yyyy")}
                          </CardDescription>
                        </div>
                        <div className="flex items-center" data-id="5cjzkt9ko" data-path="src/pages/BookingsPage.tsx">
                          <Badge
                        className={`flex items-center gap-1 px-3 py-1.5 ${getStatusColor(booking.status)}`}
                        variant="outline">

                            {getStatusIcon(booking.status)}
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6" data-id="rw5ey958e" data-path="src/pages/BookingsPage.tsx">
                        <div data-id="f24vrhxlo" data-path="src/pages/BookingsPage.tsx">
                          <h3 className="text-lg font-medium mb-3" data-id="vecxyu6eu" data-path="src/pages/BookingsPage.tsx">Room Details</h3>
                          <div className="flex flex-col md:flex-row gap-4" data-id="rvwpqbglf" data-path="src/pages/BookingsPage.tsx">
                            <div className="h-36 md:w-48 rounded-md overflow-hidden" data-id="uclr1vn4e" data-path="src/pages/BookingsPage.tsx">
                              <img
                            src={booking.room.images[0]}
                            alt={booking.room.name}
                            className="h-full w-full object-cover" data-id="ipiet1om7" data-path="src/pages/BookingsPage.tsx" />

                            </div>
                            <div className="flex-grow" data-id="om716b2wn" data-path="src/pages/BookingsPage.tsx">
                              <h4 className="font-medium text-lg" data-id="9tnzngh8a" data-path="src/pages/BookingsPage.tsx">{booking.room.name}</h4>
                              <p className="text-gray-600 text-sm mb-2" data-id="9bi8y9dfj" data-path="src/pages/BookingsPage.tsx">{booking.room.type} Room</p>
                              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-2" data-id="g3lmb6na2" data-path="src/pages/BookingsPage.tsx">
                                <div className="flex items-center text-gray-600" data-id="lxdidwy50" data-path="src/pages/BookingsPage.tsx">
                                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                                  Check-in: {format(parseISO(booking.checkInDate), "MMM dd, yyyy")}
                                </div>
                                <div className="flex items-center text-gray-600" data-id="wv1ga7vje" data-path="src/pages/BookingsPage.tsx">
                                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                                  Check-out: {format(parseISO(booking.checkOutDate), "MMM dd, yyyy")}
                                </div>
                                <div className="flex items-center text-gray-600" data-id="y5e5500gu" data-path="src/pages/BookingsPage.tsx">
                                  <BedDouble className="h-4 w-4 mr-2 text-blue-500" />
                                  {booking.numGuests} {booking.numGuests === 1 ? "Guest" : "Guests"}
                                </div>
                                <div className="font-medium text-blue-600" data-id="gwkx22wxa" data-path="src/pages/BookingsPage.tsx">
                                  ${booking.totalPrice.toFixed(2)} total
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="tsx4l5eph" data-path="src/pages/BookingsPage.tsx">
                          <div data-id="xced41xf9" data-path="src/pages/BookingsPage.tsx">
                            <h3 className="text-lg font-medium mb-2" data-id="4r9tdmhbl" data-path="src/pages/BookingsPage.tsx">Guest Information</h3>
                            <div className="text-sm text-gray-600 space-y-1" data-id="30jj89z8s" data-path="src/pages/BookingsPage.tsx">
                              <p data-id="uqi2e32wy" data-path="src/pages/BookingsPage.tsx">Name: {booking.guestName}</p>
                              <p data-id="3m4w6vctc" data-path="src/pages/BookingsPage.tsx">Email: {booking.guestEmail}</p>
                              <p data-id="iqda75xs8" data-path="src/pages/BookingsPage.tsx">Phone: {booking.guestPhone}</p>
                            </div>
                          </div>
                          <div data-id="e10p00l35" data-path="src/pages/BookingsPage.tsx">
                            {booking.specialRequests &&
                        <>
                                <h3 className="text-lg font-medium mb-2" data-id="8kv6g7fgh" data-path="src/pages/BookingsPage.tsx">Special Requests</h3>
                                <div className="text-sm text-gray-600" data-id="wyex5n8e1" data-path="src/pages/BookingsPage.tsx">
                                  <p data-id="bkgp26ygq" data-path="src/pages/BookingsPage.tsx">{booking.specialRequests}</p>
                                </div>
                              </>
                        }
                          </div>
                        </div>

                        <div className="pt-2" data-id="ui7aqzu2p" data-path="src/pages/BookingsPage.tsx">
                          {(booking.status === "Pending" || booking.status === "Confirmed") &&
                      <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                            variant="outline"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => setPendingCancelId(booking.id)}>

                                  Cancel Booking
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Cancel this booking?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. The booking will be cancelled and you'll need to make a new reservation if you change your mind.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setPendingCancelId(null)}>
                                    Keep Booking
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                              onClick={handleCancelBooking}
                              className="bg-red-500 hover:bg-red-600">

                                    Yes, Cancel Booking
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                      }
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              )}
              </>
            }
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>);

};

export default BookingsPage;