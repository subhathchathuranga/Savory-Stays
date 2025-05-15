import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataContext";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { ArrowRight, Utensils, Hotel, Clock, MapPin, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { foodItems, rooms } = useData();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Get featured items (for simplicity, we'll just take a few items)
  const featuredFoodItems = foodItems.slice(0, 4);
  const featuredRooms = rooms.slice(0, 3);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white" data-id="w6qwo6y40" data-path="src/pages/HomePage.tsx">
        <div className="absolute inset-0 bg-black/30 z-10" data-id="0qvqav7db" data-path="src/pages/HomePage.tsx"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
            "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
          }} data-id="fu4wp4hx8" data-path="src/pages/HomePage.tsx">
        </div>
        <div className="container mx-auto px-4 py-24 md:py-36 relative z-20" data-id="j9wywwgep" data-path="src/pages/HomePage.tsx">
          <div
            className={`max-w-3xl transition-all duration-1000 ${
            isVisible ?
            "opacity-100 translate-y-0" :
            "opacity-0 translate-y-10"}`
            } data-id="fl9vjrbp4" data-path="src/pages/HomePage.tsx">

            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-id="z8q95s24v" data-path="src/pages/HomePage.tsx">
              Exquisite Dining & Comfortable Stays
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90" data-id="shvrfoa0t" data-path="src/pages/HomePage.tsx">
              Experience the perfect blend of culinary excellence and premium
              accommodations at Savory Stays.
            </p>
            <div className="flex flex-col sm:flex-row gap-4" data-id="dqwpaa9v0" data-path="src/pages/HomePage.tsx">
              <Button size="lg" asChild>
                <Link to="/menu">Explore Our Menu</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 hover:bg-white/20 border-white"
                asChild>

                <Link to="/rooms">Book a Room</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Features Strip */}
        <div className="bg-black/70 py-6 relative z-20" data-id="n8tmthqtj" data-path="src/pages/HomePage.tsx">
          <div className="container mx-auto px-4" data-id="0s72rljce" data-path="src/pages/HomePage.tsx">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center" data-id="dvpbkyxcu" data-path="src/pages/HomePage.tsx">
              <div className="flex flex-col items-center" data-id="kokbqpo6m" data-path="src/pages/HomePage.tsx">
                <Utensils className="h-8 w-8 mb-2 text-orange-400" />
                <h3 className="font-semibold text-lg" data-id="69yms0bxi" data-path="src/pages/HomePage.tsx">Gourmet Cuisine</h3>
                <p className="text-sm text-white/70" data-id="84s3psoxy" data-path="src/pages/HomePage.tsx">
                  Expertly crafted dishes from our award-winning chefs
                </p>
              </div>
              <div className="flex flex-col items-center" data-id="v1b1r8wjl" data-path="src/pages/HomePage.tsx">
                <Hotel className="h-8 w-8 mb-2 text-orange-400" />
                <h3 className="font-semibold text-lg" data-id="nwmh9bo7f" data-path="src/pages/HomePage.tsx">Luxury Accommodations</h3>
                <p className="text-sm text-white/70" data-id="ugsnr518z" data-path="src/pages/HomePage.tsx">
                  Comfortable rooms and suites for every type of traveler
                </p>
              </div>
              <div className="flex flex-col items-center" data-id="fmqs034u0" data-path="src/pages/HomePage.tsx">
                <MapPin className="h-8 w-8 mb-2 text-orange-400" />
                <h3 className="font-semibold text-lg" data-id="5wj0zdp3o" data-path="src/pages/HomePage.tsx">Prime Location</h3>
                <p className="text-sm text-white/70" data-id="ils0dvu75" data-path="src/pages/HomePage.tsx">
                  Conveniently located in the heart of the city
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Food Section */}
      <section className="py-16 bg-white" data-id="m0n1gnsz3" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4" data-id="l5rceak6b" data-path="src/pages/HomePage.tsx">
          <div className="text-center mb-12" data-id="zm0hqza1g" data-path="src/pages/HomePage.tsx">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" data-id="b59jd9l8t" data-path="src/pages/HomePage.tsx">
              Featured Dishes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" data-id="y54ghuir0" data-path="src/pages/HomePage.tsx">
              Indulge in our chef's most popular creations, made with the
              freshest ingredients and served with care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-id="gkznleda4" data-path="src/pages/HomePage.tsx">
            {featuredFoodItems.map((item) =>
            <Card
              key={item.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg">

                <div className="h-48 overflow-hidden" data-id="6unbvj6nl" data-path="src/pages/HomePage.tsx">
                  <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" data-id="vq30y1b0i" data-path="src/pages/HomePage.tsx" />

                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{item.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between pt-2">
                  <span className="font-bold text-orange-600" data-id="j1yby19qy" data-path="src/pages/HomePage.tsx">
                    ${item.price.toFixed(2)}
                  </span>
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/menu?category=${item.category}`}>
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          <div className="text-center mt-10" data-id="jykfqfvi8" data-path="src/pages/HomePage.tsx">
            <Button asChild>
              <Link to="/menu" className="flex items-center">
                View Full Menu <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-16 bg-gray-50" data-id="6r9b0ujy3" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4" data-id="i93xd16g1" data-path="src/pages/HomePage.tsx">
          <div className="text-center mb-12" data-id="sxogjrvsr" data-path="src/pages/HomePage.tsx">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" data-id="nc7kcazhf" data-path="src/pages/HomePage.tsx">
              Featured Accommodations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" data-id="r2bx501mv" data-path="src/pages/HomePage.tsx">
              From cozy single rooms to luxurious suites, we have the perfect
              space for your stay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-id="kutsw8b2m" data-path="src/pages/HomePage.tsx">
            {featuredRooms.map((room) =>
            <Card
              key={room.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg">

                <div className="h-64 overflow-hidden" data-id="0avgd0t10" data-path="src/pages/HomePage.tsx">
                  <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" data-id="z892iwdu0" data-path="src/pages/HomePage.tsx" />

                </div>
                <CardHeader>
                  <div className="flex justify-between items-center" data-id="namhii9xv" data-path="src/pages/HomePage.tsx">
                    <CardTitle className="text-xl">{room.name}</CardTitle>
                    <div className="flex items-center text-orange-500" data-id="3alflzhv2" data-path="src/pages/HomePage.tsx">
                      <Star className="fill-current h-4 w-4" />
                      <Star className="fill-current h-4 w-4" />
                      <Star className="fill-current h-4 w-4" />
                      <Star className="fill-current h-4 w-4" />
                      <Star className="fill-current h-4 w-4" />
                    </div>
                  </div>
                  <CardDescription className="mt-2">
                    {room.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-2 mt-2" data-id="95knqkf29" data-path="src/pages/HomePage.tsx">
                    {room.amenities.slice(0, 3).map((amenity, index) =>
                  <span
                    key={index}
                    className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full" data-id="ky3ku99nr" data-path="src/pages/HomePage.tsx">

                        {amenity}
                      </span>
                  )}
                    {room.amenities.length > 3 &&
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full" data-id="kt9uvwp7g" data-path="src/pages/HomePage.tsx">
                        +{room.amenities.length - 3} more
                      </span>
                  }
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <span className="font-bold text-orange-600" data-id="6176x49ss" data-path="src/pages/HomePage.tsx">
                    ${room.price.toFixed(2)}{" "}
                    <span className="text-sm font-normal text-gray-500" data-id="ceg2kakr7" data-path="src/pages/HomePage.tsx">
                      / night
                    </span>
                  </span>
                  <Button size="sm" asChild>
                    <Link to={`/rooms/${room.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          <div className="text-center mt-10" data-id="fsz7oyxjt" data-path="src/pages/HomePage.tsx">
            <Button asChild>
              <Link to="/rooms" className="flex items-center">
                View All Rooms <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Brief */}
      <section className="py-16 bg-white" data-id="6s2crybhl" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4" data-id="yk9r4lxaq" data-path="src/pages/HomePage.tsx">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center" data-id="xoo1824c7" data-path="src/pages/HomePage.tsx">
            <div data-id="2rh10d9oi" data-path="src/pages/HomePage.tsx">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" data-id="u4x5oy63n" data-path="src/pages/HomePage.tsx">
                About Savory Stays
              </h2>
              <p className="text-gray-600 mb-4" data-id="oe3zuakps" data-path="src/pages/HomePage.tsx">
                Founded in 2010, Savory Stays has been a landmark destination for
                food enthusiasts and travelers seeking quality accommodations.
                Our restaurant offers an eclectic menu featuring both local
                favorites and international cuisine.
              </p>
              <p className="text-gray-600 mb-6" data-id="2jhit6y2m" data-path="src/pages/HomePage.tsx">
                Our guest inn provides comfortable, well-appointed rooms for
                business and leisure travelers alike. We pride ourselves on
                attentive service, cleanliness, and creating a warm, welcoming
                atmosphere for all our guests.
              </p>
              <Button asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4" data-id="jqnv1ajgs" data-path="src/pages/HomePage.tsx">
              <div className="space-y-4" data-id="7kii2ptgx" data-path="src/pages/HomePage.tsx">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Restaurant interior"
                  className="rounded-lg h-40 object-cover w-full" data-id="9skiyikjw" data-path="src/pages/HomePage.tsx" />

                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Hotel lobby"
                  className="rounded-lg h-56 object-cover w-full" data-id="6ur6jf64d" data-path="src/pages/HomePage.tsx" />

              </div>
              <div className="space-y-4 mt-6" data-id="jdpnnwhmr" data-path="src/pages/HomePage.tsx">
                <img
                  src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Chef preparing food"
                  className="rounded-lg h-56 object-cover w-full" data-id="3qssd9jc6" data-path="src/pages/HomePage.tsx" />

                <img
                  src="https://images.unsplash.com/photo-1517840901100-8179e982acb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTg3MTl8MHwxfHNlYXJjaHwxfHxBJTIwY296eSUyMGFuZCUyMHdlbGwtZGVjb3JhdGVkJTIwaG90ZWwlMjByb29tJTIwd2l0aCUyMGElMjBjb21mb3J0YWJsZSUyMGJlZCUyMGFuZCUyMGFtYmllbnQlMjBsaWdodGluZy58ZW58MHx8fHwxNzQ3MjAxMTU1fDA&ixlib=rb-4.1.0&q=80&w=200$w=800"
                  alt="Hotel room"
                  className="rounded-lg h-40 object-cover w-full" data-id="uan72ufgk" data-path="src/pages/HomePage.tsx" />

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600 text-white" data-id="vwftjk6ts" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4 text-center" data-id="06scd1u7e" data-path="src/pages/HomePage.tsx">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" data-id="79my06xms" data-path="src/pages/HomePage.tsx">
            Ready to Experience Savory Stays?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto" data-id="eyffazuix" data-path="src/pages/HomePage.tsx">
            Whether you're looking for a memorable dining experience or a
            comfortable place to stay, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4" data-id="ie7ijgmqa" data-path="src/pages/HomePage.tsx">
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-orange-600 hover:bg-white/90 border-none"
              asChild>

              <Link to="/menu">Reserve a Table</Link>
            </Button>
            <Button size="lg" className="bg-white/20 hover:bg-white/30" asChild>
              <Link to="/rooms">Book a Room</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>);

};

export default HomePage;