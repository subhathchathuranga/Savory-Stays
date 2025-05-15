import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useCart } from "@/context/CartContext";
import { useOrder } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, CreditCard, AlertCircle } from "lucide-react";

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { createOrder } = useOrder();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [notes, setNotes] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate totals
  const subtotal = getCartTotal();
  const deliveryFee = 3.00;
  const tax = subtotal * 0.1;
  const total = subtotal + deliveryFee + tax;

  // Check if cart is empty
  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate("/login?redirect=checkout");
    return null;
  }

  const handlePlaceOrder = async () => {
    // Validate form
    if (!name || !email || !phone || !address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Validate payment info if credit card is selected
    if (paymentMethod === "card") {
      if (!cardNumber || !cardExpiry || !cardCvc) {
        toast({
          title: "Missing Payment Information",
          description: "Please enter your card details",
          variant: "destructive"
        });
        return;
      }

      // Simple validation for card number format
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
        toast({
          title: "Invalid Card Number",
          description: "Please enter a valid 16-digit card number",
          variant: "destructive"
        });
        return;
      }
    }

    setIsLoading(true);

    try {
      // Create the order
      const success = await createOrder({
        userId: user!.id,
        items: cartItems,
        totalAmount: total,
        address,
        phone,
        paymentMethod,
        status: "Pending"
      });

      if (success) {
        setShowConfirmation(true);
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "There was a problem placing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderConfirmed = () => {
    clearCart();
    navigate("/orders");
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return value;
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12" data-id="dfv4npu0c" data-path="src/pages/CheckoutPage.tsx">
        <h1 className="text-3xl font-bold mb-8" data-id="cy887kmwq" data-path="src/pages/CheckoutPage.tsx">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-id="3497pd5rn" data-path="src/pages/CheckoutPage.tsx">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-6" data-id="wak7aagdg" data-path="src/pages/CheckoutPage.tsx">
            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="rvtacescw" data-path="src/pages/CheckoutPage.tsx">
                  <div className="space-y-2" data-id="44elz7k2i" data-path="src/pages/CheckoutPage.tsx">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required />

                  </div>
                  <div className="space-y-2" data-id="plcm912t4" data-path="src/pages/CheckoutPage.tsx">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required />

                  </div>
                </div>
                <div className="space-y-2" data-id="c48vo85xa" data-path="src/pages/CheckoutPage.tsx">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="(123) 456-7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required />

                </div>
                <div className="space-y-2" data-id="0htftiprd" data-path="src/pages/CheckoutPage.tsx">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea
                    id="address"
                    placeholder="123 Main St, Apt 4B, City, State 12345"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    rows={3} />

                </div>
                <div className="space-y-2" data-id="3osqks1ck" data-path="src/pages/CheckoutPage.tsx">
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Special instructions for delivery or food preparation"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2} />

                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}>

                  <div className="flex items-center space-x-2 p-3 border rounded-md" data-id="vyqq2h5s3" data-path="src/pages/CheckoutPage.tsx">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex-grow cursor-pointer">Cash on Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-md" data-id="wtshgxkuc" data-path="src/pages/CheckoutPage.tsx">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-grow cursor-pointer">Credit/Debit Card</Label>
                    <CreditCard className="h-5 w-5 text-gray-500" />
                  </div>
                </RadioGroup>

                {paymentMethod === "card" &&
                <div className="space-y-4 pt-2" data-id="z5cw77s5h" data-path="src/pages/CheckoutPage.tsx">
                    <div className="space-y-2" data-id="myy2b7fqc" data-path="src/pages/CheckoutPage.tsx">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19} />

                    </div>
                    <div className="grid grid-cols-2 gap-4" data-id="1vtrm2ikl" data-path="src/pages/CheckoutPage.tsx">
                      <div className="space-y-2" data-id="fty0a0lvl" data-path="src/pages/CheckoutPage.tsx">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiryDate(e.target.value))}
                        maxLength={5} />

                      </div>
                      <div className="space-y-2" data-id="6bxi1agro" data-path="src/pages/CheckoutPage.tsx">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                        id="cvc"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ""))}
                        maxLength={3} />

                      </div>
                    </div>
                    <div className="flex items-start bg-blue-50 p-3 rounded-md" data-id="so17o4t07" data-path="src/pages/CheckoutPage.tsx">
                      <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-blue-700" data-id="8fbwk5lwh" data-path="src/pages/CheckoutPage.tsx">
                        This is a simulation. No actual payment will be processed.
                      </p>
                    </div>
                  </div>
                }
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1" data-id="td5uid08c" data-path="src/pages/CheckoutPage.tsx">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-60 overflow-y-auto space-y-3 pr-2" data-id="o8e5gh03b" data-path="src/pages/CheckoutPage.tsx">
                  {cartItems.map((item) =>
                  <div key={item.item.id} className="flex justify-between" data-id="v7o7mordb" data-path="src/pages/CheckoutPage.tsx">
                      <div className="flex items-start" data-id="ahdj9mkl3" data-path="src/pages/CheckoutPage.tsx">
                        <span className="bg-gray-100 text-gray-700 rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5" data-id="f6bukyhe6" data-path="src/pages/CheckoutPage.tsx">
                          {item.quantity}
                        </span>
                        <span data-id="h4g45c6ar" data-path="src/pages/CheckoutPage.tsx">{item.item.name}</span>
                      </div>
                      <span data-id="1vxxqkpm6" data-path="src/pages/CheckoutPage.tsx">${(item.item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <Separator className="my-3" />

                <div className="space-y-2" data-id="0gbcqpr5x" data-path="src/pages/CheckoutPage.tsx">
                  <div className="flex justify-between" data-id="de047yzpb" data-path="src/pages/CheckoutPage.tsx">
                    <span className="text-gray-600" data-id="0y54z7tg6" data-path="src/pages/CheckoutPage.tsx">Subtotal</span>
                    <span data-id="yp2z5mt84" data-path="src/pages/CheckoutPage.tsx">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between" data-id="xvayw5ap1" data-path="src/pages/CheckoutPage.tsx">
                    <span className="text-gray-600" data-id="pb6zuz8w3" data-path="src/pages/CheckoutPage.tsx">Delivery Fee</span>
                    <span data-id="6a1mpcb6x" data-path="src/pages/CheckoutPage.tsx">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between" data-id="hkkntuku6" data-path="src/pages/CheckoutPage.tsx">
                    <span className="text-gray-600" data-id="fkxfkoa4g" data-path="src/pages/CheckoutPage.tsx">Tax</span>
                    <span data-id="0j45csil4" data-path="src/pages/CheckoutPage.tsx">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-3" />

                <div className="flex justify-between text-lg font-bold" data-id="ejfrxkq90" data-path="src/pages/CheckoutPage.tsx">
                  <span data-id="c2fcg9lqq" data-path="src/pages/CheckoutPage.tsx">Total</span>
                  <span data-id="lxjw1kfth" data-path="src/pages/CheckoutPage.tsx">${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={isLoading}>

                  {isLoading ? "Processing..." : "Place Order"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Order Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Check className="h-6 w-6 text-green-500 mr-2" />
              Order Confirmed!
            </DialogTitle>
            <DialogDescription>
              Your order has been successfully placed.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4" data-id="gr6omz2p0" data-path="src/pages/CheckoutPage.tsx">
            <div className="bg-gray-50 p-4 rounded-lg" data-id="jsqh3mh77" data-path="src/pages/CheckoutPage.tsx">
              <div className="text-sm space-y-2" data-id="ccf35k8qc" data-path="src/pages/CheckoutPage.tsx">
                <div className="flex justify-between font-medium" data-id="s08le5k2y" data-path="src/pages/CheckoutPage.tsx">
                  <span data-id="w80cpltae" data-path="src/pages/CheckoutPage.tsx">Order Number:</span>
                  <span data-id="wye5qoqat" data-path="src/pages/CheckoutPage.tsx">#{Date.now().toString().slice(-8)}</span>
                </div>
                <div className="flex justify-between" data-id="iy13g8clq" data-path="src/pages/CheckoutPage.tsx">
                  <span data-id="2yw5y042l" data-path="src/pages/CheckoutPage.tsx">Delivery Address:</span>
                  <span className="text-right" data-id="lfe66dv8n" data-path="src/pages/CheckoutPage.tsx">{address}</span>
                </div>
                <div className="flex justify-between" data-id="xsd6alhen" data-path="src/pages/CheckoutPage.tsx">
                  <span data-id="wdui9hgfp" data-path="src/pages/CheckoutPage.tsx">Payment Method:</span>
                  <span data-id="l5g1bri7h" data-path="src/pages/CheckoutPage.tsx">
                    {paymentMethod === "cash" ? "Cash on Delivery" : "Credit/Debit Card"}
                  </span>
                </div>
                <div className="flex justify-between font-medium" data-id="aa81lzgil" data-path="src/pages/CheckoutPage.tsx">
                  <span data-id="6s204oprs" data-path="src/pages/CheckoutPage.tsx">Total Amount:</span>
                  <span data-id="ngmgxz7ps" data-path="src/pages/CheckoutPage.tsx">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600" data-id="tiuj7vqh2" data-path="src/pages/CheckoutPage.tsx">
              You will receive an email confirmation shortly at {email}. You can track your order status in the "Orders" section of your account.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={handleOrderConfirmed}>
              View My Orders
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>);

};

export default CheckoutPage;