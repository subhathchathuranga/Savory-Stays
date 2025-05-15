import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Trash2, Plus, Minus, ChevronLeft, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center" data-id="cqqejb55r" data-path="src/pages/CartPage.tsx">
          <div className="max-w-md mx-auto" data-id="w9ent7zmq" data-path="src/pages/CartPage.tsx">
            <div className="mb-6 flex justify-center" data-id="k0vjypuym" data-path="src/pages/CartPage.tsx">
              <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center" data-id="pikp2ws4j" data-path="src/pages/CartPage.tsx">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-4" data-id="9hjtcj01v" data-path="src/pages/CartPage.tsx">Your cart is empty</h1>
            <p className="text-gray-600 mb-8" data-id="3pyllkxmf" data-path="src/pages/CartPage.tsx">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button asChild>
              <Link to="/menu">Browse Menu</Link>
            </Button>
          </div>
        </div>
      </MainLayout>);

  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12" data-id="tuu310ksc" data-path="src/pages/CartPage.tsx">
        <div className="flex items-center mb-8" data-id="uee8q5dvy" data-path="src/pages/CartPage.tsx">
          <h1 className="text-3xl font-bold" data-id="az9w8id1v" data-path="src/pages/CartPage.tsx">Your Cart</h1>
          <Badge variant="outline" className="ml-4">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-id="25zx4q8n3" data-path="src/pages/CartPage.tsx">
          <div className="lg:col-span-2" data-id="u5v6yjyg3" data-path="src/pages/CartPage.tsx">
            <Card>
              <CardHeader className="px-6">
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent className="px-6">
                {cartItems.map((cartItem) =>
                <div key={cartItem.item.id} className="py-4" data-id="hrhhoo6sb" data-path="src/pages/CartPage.tsx">
                    <div className="flex items-start gap-4" data-id="0aoq5jvq8" data-path="src/pages/CartPage.tsx">
                      <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0" data-id="0304acoln" data-path="src/pages/CartPage.tsx">
                        <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="h-full w-full object-cover" data-id="dk4664f9c" data-path="src/pages/CartPage.tsx" />

                      </div>
                      <div className="flex-grow" data-id="jarzcwcw1" data-path="src/pages/CartPage.tsx">
                        <div className="flex justify-between" data-id="u3kbxd8mg" data-path="src/pages/CartPage.tsx">
                          <div data-id="puf57cudw" data-path="src/pages/CartPage.tsx">
                            <h3 className="font-medium" data-id="6h5zad3h5" data-path="src/pages/CartPage.tsx">{cartItem.item.name}</h3>
                            <p className="text-sm text-gray-500" data-id="2g3iojign" data-path="src/pages/CartPage.tsx">
                              {cartItem.item.category}
                            </p>
                          </div>
                          <div className="text-right" data-id="vi7vp02bz" data-path="src/pages/CartPage.tsx">
                            <div className="font-semibold" data-id="ab9atmcbw" data-path="src/pages/CartPage.tsx">
                              ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500" data-id="lszyhsqu5" data-path="src/pages/CartPage.tsx">
                              ${cartItem.item.price.toFixed(2)} each
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between items-center" data-id="hel9frekg" data-path="src/pages/CartPage.tsx">
                          <div className="flex items-center space-x-2" data-id="lryb0s204" data-path="src/pages/CartPage.tsx">
                            <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}>

                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-6 text-center" data-id="h194bu2hl" data-path="src/pages/CartPage.tsx">
                              {cartItem.quantity}
                            </span>
                            <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}>

                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeFromCart(cartItem.item.id)}>

                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between px-6">
                <Button
                  variant="ghost"
                  className="flex items-center"
                  asChild>

                  <Link to="/menu">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Continue Shopping
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="text-red-500"
                  onClick={() => {
                    clearCart();
                    toast({
                      title: "Cart cleared",
                      description: "All items have been removed from your cart."
                    });
                  }}>

                  Clear Cart
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-1" data-id="0z4jiux6i" data-path="src/pages/CartPage.tsx">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between" data-id="bdo0nq4qn" data-path="src/pages/CartPage.tsx">
                  <span data-id="nr1tnfq9i" data-path="src/pages/CartPage.tsx">Subtotal</span>
                  <span data-id="lb24gghot" data-path="src/pages/CartPage.tsx">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between" data-id="7fcfsomdx" data-path="src/pages/CartPage.tsx">
                  <span data-id="6rsg2iz7b" data-path="src/pages/CartPage.tsx">Delivery Fee</span>
                  <span data-id="b7x0h4hzw" data-path="src/pages/CartPage.tsx">$3.00</span>
                </div>
                <div className="flex justify-between" data-id="m7lvl3dhk" data-path="src/pages/CartPage.tsx">
                  <span data-id="etp8vf08q" data-path="src/pages/CartPage.tsx">Tax</span>
                  <span data-id="atssxbzmh" data-path="src/pages/CartPage.tsx">${(getCartTotal() * 0.1).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg" data-id="e5ul41vyv" data-path="src/pages/CartPage.tsx">
                  <span data-id="mz197iwf2" data-path="src/pages/CartPage.tsx">Total</span>
                  <span data-id="7t96pflr8" data-path="src/pages/CartPage.tsx">
                    ${(getCartTotal() + 3 + getCartTotal() * 0.1).toFixed(2)}
                  </span>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-800 flex" data-id="k1230f4bl" data-path="src/pages/CartPage.tsx">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                  Orders for delivery require a minimum purchase of $15.00
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  disabled={getCartTotal() < 15}
                  onClick={() => navigate("/checkout")}>

                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>);

};

export default CartPage;