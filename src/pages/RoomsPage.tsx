import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useData } from "@/context/DataContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bed, Users, Maximize, CalendarCheck, Star } from "lucide-react";

const RoomsPage = () => {
  const { rooms } = useData();
  const [activeType, setActiveType] = useState("All");

  // Get all unique room types
  const types = ["All", ...Array.from(new Set(rooms.map((room) => room.type)))];

  // Filter rooms based on selected type
  const filteredRooms = activeType === "All" ?
  rooms :
  rooms.filter((room) => room.type === activeType);

  return (
    <MainLayout>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white" data-id="6ig5n5hnn" data-path="src/pages/RoomsPage.tsx">
        <div className="absolute inset-0 bg-black/40 z-10" data-id="3ot5rrvec" data-path="src/pages/RoomsPage.tsx"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
            "url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
          }} data-id="alpcnap6d" data-path="src/pages/RoomsPage.tsx">
        </div>
        <div className="container mx-auto px-4 py-20 relative z-20 text-center" data-id="31niqjixs" data-path="src/pages/RoomsPage.tsx">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-id="woawdlm97" data-path="src/pages/RoomsPage.tsx">
            Rooms & Accommodations
          </h1>
          <p className="text-xl max-w-2xl mx-auto" data-id="gavodblws" data-path="src/pages/RoomsPage.tsx">
            Relax and unwind in our comfortable and elegant rooms designed for
            your perfect stay.
          </p>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-12" data-id="6ouyt9jxh" data-path="src/pages/RoomsPage.tsx">
        <div className="container mx-auto px-4" data-id="mlxvyibzx" data-path="src/pages/RoomsPage.tsx">
          <Tabs defaultValue="All" onValueChange={setActiveType} className="w-full">
            <div className="mb-8 overflow-x-auto" data-id="13tk44380" data-path="src/pages/RoomsPage.tsx">
              <TabsList className="h-auto p-1">
                {types.map((type) =>
                <TabsTrigger
                  key={type}
                  value={type}
                  className="py-3 px-5 text-base">

                    {type}
                  </TabsTrigger>
                )}
              </TabsList>
            </div>

            <TabsContent value={activeType} className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-id="vid1l2btx" data-path="src/pages/RoomsPage.tsx">
                {filteredRooms.map((room) =>
                <Card key={room.id} className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-5 h-full" data-id="0gmzarvbq" data-path="src/pages/RoomsPage.tsx">
                      <div className="md:col-span-2 h-60 md:h-full" data-id="7hxw5c8il" data-path="src/pages/RoomsPage.tsx">
                        <img
                        src={room.images[0]}
                        alt={room.name}
                        className="w-full h-full object-cover" data-id="mnim6kkf7" data-path="src/pages/RoomsPage.tsx" />

                      </div>
                      <div className="md:col-span-3 flex flex-col h-full" data-id="ih9d8x86e" data-path="src/pages/RoomsPage.tsx">
                        <CardHeader>
                          <div className="flex justify-between items-start" data-id="ntwfbr302" data-path="src/pages/RoomsPage.tsx">
                            <div data-id="k482qxq0i" data-path="src/pages/RoomsPage.tsx">
                              <Badge variant="outline" className="mb-2">
                                {room.type}
                              </Badge>
                              <CardTitle className="text-xl">{room.name}</CardTitle>
                              <div className="flex items-center mt-1 text-yellow-500" data-id="s9fosu9sf" data-path="src/pages/RoomsPage.tsx">
                                <Star className="fill-yellow-500 h-4 w-4" />
                                <Star className="fill-yellow-500 h-4 w-4" />
                                <Star className="fill-yellow-500 h-4 w-4" />
                                <Star className="fill-yellow-500 h-4 w-4" />
                                <Star className="fill-yellow-500 h-4 w-4" />
                              </div>
                            </div>
                            <div className="text-right" data-id="mouwlsotx" data-path="src/pages/RoomsPage.tsx">
                              <span className="font-bold text-xl text-blue-600" data-id="70h84gueb" data-path="src/pages/RoomsPage.tsx">
                                ${room.price.toFixed(2)}
                              </span>
                              <p className="text-sm text-gray-500" data-id="vl85sy7s3" data-path="src/pages/RoomsPage.tsx">per night</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="py-2 flex-grow">
                          <p className="text-gray-600 mb-4" data-id="0botngwz0" data-path="src/pages/RoomsPage.tsx">{room.description}</p>
                          <div className="grid grid-cols-2 gap-3 text-sm" data-id="du1e3il22" data-path="src/pages/RoomsPage.tsx">
                            <div className="flex items-center text-gray-600" data-id="9yt6432rn" data-path="src/pages/RoomsPage.tsx">
                              <Bed className="h-4 w-4 mr-2 text-blue-500" />
                              {room.type} Room
                            </div>
                            <div className="flex items-center text-gray-600" data-id="f10i9yuz1" data-path="src/pages/RoomsPage.tsx">
                              <Users className="h-4 w-4 mr-2 text-blue-500" />
                              Up to {room.capacity} Guests
                            </div>
                            <div className="flex items-center text-gray-600" data-id="gkvabwkkd" data-path="src/pages/RoomsPage.tsx">
                              <Maximize className="h-4 w-4 mr-2 text-blue-500" />
                              {room.size} sq ft
                            </div>
                            <div className="flex items-center text-gray-600" data-id="eklqblnom" data-path="src/pages/RoomsPage.tsx">
                              <CalendarCheck className="h-4 w-4 mr-2 text-blue-500" />
                              {room.available ? "Available" : "Booked"}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4" data-id="lcdjv13g1" data-path="src/pages/RoomsPage.tsx">
                            {room.amenities.slice(0, 4).map((amenity, index) =>
                          <Badge key={index} variant="secondary" className="font-normal">
                                {amenity}
                              </Badge>
                          )}
                            {room.amenities.length > 4 &&
                          <Badge variant="outline" className="font-normal">
                                +{room.amenities.length - 4} more
                              </Badge>
                          }
                          </div>
                        </CardContent>
                        <CardFooter className="pt-0 mt-auto">
                          <Button asChild>
                            <Link to={`/rooms/${room.id}`}>View Details</Link>
                          </Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>);

};

export default RoomsPage;