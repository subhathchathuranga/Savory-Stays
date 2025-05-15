import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useData } from "@/context/DataContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const MenuPage = () => {
  const { foodItems } = useData();
  const { addToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Appetizers");
  const [itemQuantities, setItemQuantities] = useState<Record<number, number>>({});

  // Get all unique categories
  const categories = Array.from(new Set(foodItems.map((item) => item.category)));

  // Set initial category from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [location.search, categories]);

  // Update URL when category changes
  useEffect(() => {
    navigate(`/menu?category=${activeCategory}`, { replace: true });
  }, [activeCategory, navigate]);

  const handleAddToCart = (itemId: number) => {
    const item = foodItems.find((item) => item.id === itemId);
    if (item) {
      const quantity = itemQuantities[itemId] || 1;
      addToCart(item, quantity);

      // Reset quantity after adding to cart
      setItemQuantities({
        ...itemQuantities,
        [itemId]: 1
      });

      toast({
        title: "Added to cart",
        description: `${quantity} × ${item.name} added to your cart`
      });
    }
  };

  const increaseQuantity = (itemId: number) => {
    setItemQuantities({
      ...itemQuantities,
      [itemId]: (itemQuantities[itemId] || 1) + 1
    });
  };

  const decreaseQuantity = (itemId: number) => {
    if ((itemQuantities[itemId] || 1) > 1) {
      setItemQuantities({
        ...itemQuantities,
        [itemId]: (itemQuantities[itemId] || 1) - 1
      });
    }
  };

  return (
    <MainLayout>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white" data-id="t2vuagtea" data-path="src/pages/MenuPage.tsx">
        <div className="absolute inset-0 bg-black/40 z-10" data-id="grp2aavd0" data-path="src/pages/MenuPage.tsx"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
          }} data-id="ave0w9t4p" data-path="src/pages/MenuPage.tsx">
        </div>
        <div className="container mx-auto px-4 py-20 relative z-20 text-center" data-id="baavsbeoi" data-path="src/pages/MenuPage.tsx">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-id="1liihk0ue" data-path="src/pages/MenuPage.tsx">Our Menu</h1>
          <p className="text-xl max-w-2xl mx-auto" data-id="jc9hb8x4x" data-path="src/pages/MenuPage.tsx">
            Discover our carefully crafted dishes made with the freshest
            ingredients and served with passion.
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-12" data-id="a0ss5872s" data-path="src/pages/MenuPage.tsx">
        <div className="container mx-auto px-4" data-id="flcm2epex" data-path="src/pages/MenuPage.tsx">
          <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <div className="mb-8 overflow-x-auto" data-id="0qbxbnw74" data-path="src/pages/MenuPage.tsx">
              <TabsList className="h-auto p-1 w-full justify-start">
                {categories.map((category) =>
                <TabsTrigger
                  key={category}
                  value={category}
                  className="py-3 px-5 text-base">

                    {category}
                  </TabsTrigger>
                )}
              </TabsList>
            </div>

            {categories.map((category) =>
            <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="fmcl07sus" data-path="src/pages/MenuPage.tsx">
                  {foodItems.
                filter((item) => item.category === category).
                map((item) =>
                <Card key={item.id} className="overflow-hidden">
                        <div className="h-48 overflow-hidden" data-id="xgsu74pub" data-path="src/pages/MenuPage.tsx">
                          <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover" data-id="fhhht661g" data-path="src/pages/MenuPage.tsx" />

                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start" data-id="e4461yf8i" data-path="src/pages/MenuPage.tsx">
                            <div data-id="3nv4yonan" data-path="src/pages/MenuPage.tsx">
                              <CardTitle>{item.name}</CardTitle>
                              <Badge variant="outline" className="mt-1">
                                {item.category}
                              </Badge>
                            </div>
                            <span className="font-bold text-lg text-orange-600" data-id="ym3ik9kjf" data-path="src/pages/MenuPage.tsx">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          <CardDescription className="mt-2">
                            {item.description}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <div className="flex items-center justify-between w-full" data-id="yp0xcuurm" data-path="src/pages/MenuPage.tsx">
                            <div className="flex items-center space-x-2" data-id="mcw1urs6u" data-path="src/pages/MenuPage.tsx">
                              <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => decreaseQuantity(item.id)}>

                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center" data-id="0v6jnyot4" data-path="src/pages/MenuPage.tsx">
                                {itemQuantities[item.id] || 1}
                              </span>
                              <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => increaseQuantity(item.id)}>

                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button
                        onClick={() => handleAddToCart(item.id)}
                        className="ml-4">

                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                )}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>
    </MainLayout>);

};

export default MenuPage;