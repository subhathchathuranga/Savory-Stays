import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useData } from "@/context/DataContext";
import { useBooking } from "@/context/BookingContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { format } from "date-fns";
import { CalendarIcon, Bed, Maximize, Users, Check, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const RoomDetailPage = () => {
  const { roomId } = useParams<{roomId: string;}>();
  const navigate = useNavigate();
  const { getRoomById } = useData();
  const { addBooking, isRoomAvailable } = useBooking();
  const { isAuthenticated, user } = useAuth();

  const [room, setRoom] = useState(getRoomById(Number(roomId)));
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isDateRangeValid, setIsDateRangeValid] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  // Redirect if room not found
  useEffect(() => {
    if (!room) {
      navigate("/rooms");
    } else if (user) {
      setGuestName(user.name);
      setGuestEmail(user.email);
      setGuestPhone(user.phone || "");
    }
  }, [room, navigate, user]);

  // Check date validity and room availability
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      // Check if check-out is after check-in and at least 1 day difference
      const isValid = checkOutDate > checkInDate &&
      checkOutDate.getTime() - checkInDate.getTime() >= 24 * 60 * 60 * 1000;

      setIsDateRangeValid(isValid);

      if (isValid && room) {
        const available = isRoomAvailable(
          room.id,
          checkInDate.toISOString(),
          checkOutDate.toISOString()
        );
        setIsAvailable(available);
      }
    } else {
      setIsDateRangeValid(false);
    }
  }, [checkInDate, checkOutDate, room, isRoomAvailable]);

  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate || !room) return 0;

    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return room.price * diffDays;
  };

  const handleBooking = async () => {
    if (!room || !checkInDate || !checkOutDate || !isDateRangeValid || !isAvailable) {
      return;
    }

    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to book a room",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }

    if (!guestName || !guestEmail || !guestPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const totalPrice = calculateTotalPrice();

      const success = await addBooking({
        userId: user!.id,
        room,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        guestName,
        guestEmail,
        guestPhone,
        numGuests,
        specialRequests,
        status: "Pending",
        totalPrice
      });

      if (success) {
        setBookingConfirmed(true);
      } else {
        throw new Error("Unable to complete booking");
      }
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was a problem with your booking. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!room) return null;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12" data-id="x8ho603pt" data-path="src/pages/RoomDetailPage.tsx">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-id="pejvdziq4" data-path="src/pages/RoomDetailPage.tsx">
          {/* Room Details */}
          <div className="lg:col-span-2" data-id="yex4p6muk" data-path="src/pages/RoomDetailPage.tsx">
            <h1 className="text-3xl font-bold mb-2" data-id="uutxgdxu1" data-path="src/pages/RoomDetailPage.tsx">{room.name}</h1>
            <div className="flex items-center mb-6" data-id="lr43fvzee" data-path="src/pages/RoomDetailPage.tsx">
              <Badge variant="outline" className="mr-2">
                {room.type}
              </Badge>
              <div className="flex items-center text-gray-500 space-x-4" data-id="mt66phwat" data-path="src/pages/RoomDetailPage.tsx">
                <span className="flex items-center" data-id="llatj0ges" data-path="src/pages/RoomDetailPage.tsx">
                  <Users className="h-4 w-4 mr-1" />
                  {room.capacity} Guests
                </span>
                <span className="flex items-center" data-id="5hkclxk23" data-path="src/pages/RoomDetailPage.tsx">
                  <Maximize className="h-4 w-4 mr-1" />
                  {room.size} sq ft
                </span>
              </div>
            </div>

            {/* Room Images Carousel */}
            <Carousel className="w-full mb-8">
              <CarouselContent>
                {room.images.map((image, index) =>
                <CarouselItem key={index}>
                    <div className="aspect-[16/9] w-full overflow-hidden rounded-lg" data-id="7qfrb2x18" data-path="src/pages/RoomDetailPage.tsx">
                      <img
                      src={image}
                      alt={`${room.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover" data-id="2bngvkadi" data-path="src/pages/RoomDetailPage.tsx" />

                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            <div className="space-y-6" data-id="amt2g0of2" data-path="src/pages/RoomDetailPage.tsx">
              <div data-id="w71lraqkd" data-path="src/pages/RoomDetailPage.tsx">
                <h2 className="text-2xl font-semibold mb-2" data-id="p8ni0x338" data-path="src/pages/RoomDetailPage.tsx">Description</h2>
                <p className="text-gray-600" data-id="8gfeh3ify" data-path="src/pages/RoomDetailPage.tsx">{room.description}</p>
              </div>

              <div data-id="kxp7xdmze" data-path="src/pages/RoomDetailPage.tsx">
                <h2 className="text-2xl font-semibold mb-4" data-id="1g86gvu46" data-path="src/pages/RoomDetailPage.tsx">Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2" data-id="k7ukxjqob" data-path="src/pages/RoomDetailPage.tsx">
                  {room.amenities.map((amenity, index) =>
                  <div key={index} className="flex items-center" data-id="cwqiw4x1w" data-path="src/pages/RoomDetailPage.tsx">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span data-id="pqkqh9ufs" data-path="src/pages/RoomDetailPage.tsx">{amenity}</span>
                    </div>
                  )}
                </div>
              </div>

              <div data-id="kqjsjwhqn" data-path="src/pages/RoomDetailPage.tsx">
                <h2 className="text-2xl font-semibold mb-4" data-id="jnxsr208r" data-path="src/pages/RoomDetailPage.tsx">Policies</h2>
                <div className="space-y-2 text-gray-600" data-id="dgzns39b3" data-path="src/pages/RoomDetailPage.tsx">
                  <p data-id="02wr0ozyk" data-path="src/pages/RoomDetailPage.tsx">• Check-in: 3:00 PM - 10:00 PM</p>
                  <p data-id="qioenolpy" data-path="src/pages/RoomDetailPage.tsx">• Check-out: Before 11:00 AM</p>
                  <p data-id="peyctkqon" data-path="src/pages/RoomDetailPage.tsx">• No smoking, parties, or events</p>
                  <p data-id="v1soa4grg" data-path="src/pages/RoomDetailPage.tsx">• Pets are not allowed</p>
                  <p data-id="sxan0qxb4" data-path="src/pages/RoomDetailPage.tsx">• Free cancellation up to 48 hours before check-in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1" data-id="i3ic8rx8n" data-path="src/pages/RoomDetailPage.tsx">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book This Room</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold text-blue-600" data-id="knycu12mu" data-path="src/pages/RoomDetailPage.tsx">
                    ${room.price.toFixed(2)}
                  </span>{" "}
                  <span className="text-gray-500" data-id="tvhktrawh" data-path="src/pages/RoomDetailPage.tsx">per night</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4" data-id="1tizh40xs" data-path="src/pages/RoomDetailPage.tsx">
                  <div className="space-y-2" data-id="8a36xgm9c" data-path="src/pages/RoomDetailPage.tsx">
                    <Label htmlFor="check-in">Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal">

                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkInDate ?
                          format(checkInDate, "PPP") :

                          <span data-id="6jgst2joe" data-path="src/pages/RoomDetailPage.tsx">Pick a date</span>
                          }
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkInDate}
                          onSelect={setCheckInDate}
                          disabled={(date) => date < new Date()}
                          initialFocus />

                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2" data-id="9el6sil6a" data-path="src/pages/RoomDetailPage.tsx">
                    <Label htmlFor="check-out">Check-out Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal">

                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOutDate ?
                          format(checkOutDate, "PPP") :

                          <span data-id="dcxo8ieor" data-path="src/pages/RoomDetailPage.tsx">Pick a date</span>
                          }
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={checkOutDate}
                          onSelect={setCheckOutDate}
                          disabled={(date) =>
                          date < (checkInDate || new Date())
                          }
                          initialFocus />

                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {!isDateRangeValid && checkInDate && checkOutDate &&
                <div className="text-sm text-red-500 flex items-center" data-id="4alj6kj5l" data-path="src/pages/RoomDetailPage.tsx">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Check-out must be at least one day after check-in
                  </div>
                }
                
                {isDateRangeValid && !isAvailable &&
                <div className="text-sm text-red-500 flex items-center" data-id="q1ocmfemj" data-path="src/pages/RoomDetailPage.tsx">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Room is not available for the selected dates
                  </div>
                }

                <div className="space-y-2" data-id="062pers12" data-path="src/pages/RoomDetailPage.tsx">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max={room.capacity}
                    value={numGuests}
                    onChange={(e) => setNumGuests(parseInt(e.target.value))} />

                  <p className="text-xs text-gray-500" data-id="jekl5t5w8" data-path="src/pages/RoomDetailPage.tsx">
                    Max {room.capacity} guests
                  </p>
                </div>

                <div className="space-y-2" data-id="i6516kj8k" data-path="src/pages/RoomDetailPage.tsx">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required />

                </div>

                <div className="space-y-2" data-id="utdkkn4h8" data-path="src/pages/RoomDetailPage.tsx">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    required />

                </div>

                <div className="space-y-2" data-id="n6l5xu59f" data-path="src/pages/RoomDetailPage.tsx">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    required />

                </div>

                <div className="space-y-2" data-id="i3ebrl822" data-path="src/pages/RoomDetailPage.tsx">
                  <Label htmlFor="special-requests">Special Requests</Label>
                  <Textarea
                    id="special-requests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requests or preferences?" />

                </div>

                {isDateRangeValid && checkInDate && checkOutDate &&
                <div className="border-t pt-4 mt-4" data-id="zyo10uz2w" data-path="src/pages/RoomDetailPage.tsx">
                    <div className="flex justify-between mb-2" data-id="3kb18912f" data-path="src/pages/RoomDetailPage.tsx">
                      <span data-id="9okmugidj" data-path="src/pages/RoomDetailPage.tsx">
                        ${room.price.toFixed(2)} x{" "}
                        {Math.floor(
                        (checkOutDate.getTime() - checkInDate.getTime()) / (
                        1000 * 60 * 60 * 24)
                      )}{" "}
                        nights
                      </span>
                      <span data-id="1gxzgi8c2" data-path="src/pages/RoomDetailPage.tsx">${calculateTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg" data-id="ut4858e74" data-path="src/pages/RoomDetailPage.tsx">
                      <span data-id="xylais65l" data-path="src/pages/RoomDetailPage.tsx">Total</span>
                      <span data-id="2mnazr4vw" data-path="src/pages/RoomDetailPage.tsx">${calculateTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                }
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  disabled={!isDateRangeValid || !isAvailable}
                  onClick={handleBooking}>

                  Book Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Dialog */}
      <Dialog open={bookingConfirmed} onOpenChange={setBookingConfirmed}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Confirmed!</DialogTitle>
            <DialogDescription>
              Your booking has been successfully processed.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4" data-id="82v9qpdvv" data-path="src/pages/RoomDetailPage.tsx">
            <div className="space-y-2" data-id="w4apr6w6x" data-path="src/pages/RoomDetailPage.tsx">
              <h4 className="font-semibold" data-id="koq8uoxam" data-path="src/pages/RoomDetailPage.tsx">Booking Details:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm" data-id="yl94xajsr" data-path="src/pages/RoomDetailPage.tsx">
                <span className="text-gray-500" data-id="l0s4lkepk" data-path="src/pages/RoomDetailPage.tsx">Room:</span>
                <span data-id="pk6o8739j" data-path="src/pages/RoomDetailPage.tsx">{room.name}</span>
                <span className="text-gray-500" data-id="mt2q3arv2" data-path="src/pages/RoomDetailPage.tsx">Check-in:</span>
                <span data-id="av6whj2et" data-path="src/pages/RoomDetailPage.tsx">{checkInDate && format(checkInDate, "PPP")}</span>
                <span className="text-gray-500" data-id="aeeqm4zz0" data-path="src/pages/RoomDetailPage.tsx">Check-out:</span>
                <span data-id="b2f6fww29" data-path="src/pages/RoomDetailPage.tsx">{checkOutDate && format(checkOutDate, "PPP")}</span>
                <span className="text-gray-500" data-id="p5yyfbg4k" data-path="src/pages/RoomDetailPage.tsx">Guests:</span>
                <span data-id="unj4oxoyl" data-path="src/pages/RoomDetailPage.tsx">{numGuests}</span>
                <span className="text-gray-500" data-id="29pbiviq2" data-path="src/pages/RoomDetailPage.tsx">Total Price:</span>
                <span className="font-semibold" data-id="o8s7g9qao" data-path="src/pages/RoomDetailPage.tsx">
                  ${calculateTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>
            <p data-id="01rwqpiv2" data-path="src/pages/RoomDetailPage.tsx">
              A confirmation email has been sent to {guestEmail}. You can view your booking details in your account.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => navigate("/bookings")}>
              View My Bookings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>);

};

export default RoomDetailPage;