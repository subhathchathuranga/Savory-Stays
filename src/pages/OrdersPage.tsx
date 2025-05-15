import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useOrder } from "@/context/OrderContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { ShoppingBag, Clock, Package, Check, X, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const OrdersPage = () => {
  const { userOrders, cancelOrder } = useOrder();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [pendingCancelId, setPendingCancelId] = useState<number | null>(null);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    navigate("/login?redirect=orders");
    return null;
  }

  const handleCancelOrder = async () => {
    if (pendingCancelId !== null) {
      try {
        const success = await cancelOrder(pendingCancelId);

        if (success) {
          toast({
            title: "Order Cancelled",
            description: "Your order has been cancelled successfully."
          });
        } else {
          toast({
            title: "Cancellation Failed",
            description: "Unable to cancel the order. It may already be in progress.",
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

  // Filter orders based on selected status
  const filteredOrders = selectedStatus === "all" ?
  userOrders :
  userOrders.filter((order) => order.status.toLowerCase() === selectedStatus);

  const formatCreatedAt = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy 'at' h:mm a");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Preparing":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
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
      case "Preparing":
        return <Package className="h-5 w-5" />;
      case "Delivered":
        return <Check className="h-5 w-5" />;
      case "Cancelled":
        return <X className="h-5 w-5" />;
      default:
        return null;
    }
  };

  // If no orders found
  if (userOrders.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center" data-id="q4o8dagui" data-path="src/pages/OrdersPage.tsx">
          <div className="max-w-md mx-auto" data-id="4hhv6z70g" data-path="src/pages/OrdersPage.tsx">
            <div className="mb-6 flex justify-center" data-id="xqp07lu52" data-path="src/pages/OrdersPage.tsx">
              <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center" data-id="xb3tl8o33" data-path="src/pages/OrdersPage.tsx">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-4" data-id="ogjj90wte" data-path="src/pages/OrdersPage.tsx">No orders yet</h1>
            <p className="text-gray-600 mb-8" data-id="mq5i3c90j" data-path="src/pages/OrdersPage.tsx">
              You haven't placed any orders yet. Explore our menu and place your first order!
            </p>
            <Button asChild>
              <a href="/menu" data-id="kc7nf25vt" data-path="src/pages/OrdersPage.tsx">Browse Menu</a>
            </Button>
          </div>
        </div>
      </MainLayout>);

  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12" data-id="ji00a34u8" data-path="src/pages/OrdersPage.tsx">
        <h1 className="text-3xl font-bold mb-8" data-id="6tfakskla" data-path="src/pages/OrdersPage.tsx">My Orders</h1>

        <Tabs defaultValue="all" onValueChange={setSelectedStatus}>
          <TabsList className="mb-8">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="preparing">Preparing</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedStatus} className="space-y-6">
            {filteredOrders.length === 0 ?
            <div className="text-center py-12" data-id="ioabqz303" data-path="src/pages/OrdersPage.tsx">
                <div className="flex justify-center mb-4" data-id="ewrmzdh0j" data-path="src/pages/OrdersPage.tsx">
                  <AlertTriangle className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2" data-id="xdbi7emn7" data-path="src/pages/OrdersPage.tsx">No orders found</h3>
                <p className="text-gray-600" data-id="sy5pt7jby" data-path="src/pages/OrdersPage.tsx">
                  You don't have any {selectedStatus !== "all" ? selectedStatus : ""} orders.
                </p>
              </div> :

            <>
                {filteredOrders.map((order) =>
              <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="bg-gray-50">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4" data-id="jux9cyvg3" data-path="src/pages/OrdersPage.tsx">
                        <div data-id="mljdqwmzd" data-path="src/pages/OrdersPage.tsx">
                          <CardTitle className="text-lg">
                            Order #{order.id.toString().slice(-6)}
                          </CardTitle>
                          <CardDescription>
                            Placed on {formatCreatedAt(order.createdAt)}
                          </CardDescription>
                        </div>
                        <div className="flex items-center" data-id="x09evd2ex" data-path="src/pages/OrdersPage.tsx">
                          <Badge
                        className={`flex items-center gap-1 px-3 py-1.5 ${getStatusColor(order.status)}`}
                        variant="outline">

                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-6" data-id="s3cf0sy78" data-path="src/pages/OrdersPage.tsx">
                        <div data-id="8zj3bt4dg" data-path="src/pages/OrdersPage.tsx">
                          <h3 className="text-lg font-medium mb-3" data-id="osneva8wl" data-path="src/pages/OrdersPage.tsx">Order Items</h3>
                          <div className="space-y-3" data-id="6p5e7xzvu" data-path="src/pages/OrdersPage.tsx">
                            {order.items.map((item) =>
                        <div
                          key={item.item.id}
                          className="flex justify-between items-center" data-id="7avp6zz6s" data-path="src/pages/OrdersPage.tsx">

                                <div className="flex items-start" data-id="rgkmsse8j" data-path="src/pages/OrdersPage.tsx">
                                  <div className="h-12 w-12 rounded overflow-hidden mr-3 flex-shrink-0" data-id="qn0mhesxo" data-path="src/pages/OrdersPage.tsx">
                                    <img
                                src={item.item.image}
                                alt={item.item.name}
                                className="h-full w-full object-cover" data-id="meg7scr5d" data-path="src/pages/OrdersPage.tsx" />

                                  </div>
                                  <div data-id="11wvnc0cp" data-path="src/pages/OrdersPage.tsx">
                                    <p className="font-medium" data-id="mtzws6gnf" data-path="src/pages/OrdersPage.tsx">{item.item.name}</p>
                                    <p className="text-sm text-gray-500" data-id="vtplko8ja" data-path="src/pages/OrdersPage.tsx">
                                      Qty: {item.quantity} × ${item.item.price.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                                <span className="font-medium" data-id="510ua9bqj" data-path="src/pages/OrdersPage.tsx">
                                  ${(item.item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                        )}
                          </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="5jesgqjwf" data-path="src/pages/OrdersPage.tsx">
                          <div data-id="rq52yneni" data-path="src/pages/OrdersPage.tsx">
                            <h3 className="text-lg font-medium mb-2" data-id="oo3d0f05h" data-path="src/pages/OrdersPage.tsx">Delivery Information</h3>
                            <div className="text-sm text-gray-600 space-y-1" data-id="qpyios6gw" data-path="src/pages/OrdersPage.tsx">
                              <p data-id="3l78goyms" data-path="src/pages/OrdersPage.tsx">Address: {order.address}</p>
                              <p data-id="oii2l3bt1" data-path="src/pages/OrdersPage.tsx">Phone: {order.phone}</p>
                            </div>
                          </div>
                          <div data-id="kxpzoyyf3" data-path="src/pages/OrdersPage.tsx">
                            <h3 className="text-lg font-medium mb-2" data-id="hg79zhnc0" data-path="src/pages/OrdersPage.tsx">Payment Information</h3>
                            <div className="text-sm text-gray-600 space-y-1" data-id="y7aatsk37" data-path="src/pages/OrdersPage.tsx">
                              <p data-id="eq9fohfqg" data-path="src/pages/OrdersPage.tsx">
                                Method: {order.paymentMethod === "cash" ?
                            "Cash on Delivery" :
                            "Credit/Debit Card"
                            }
                              </p>
                              <p data-id="bo51vzfzv" data-path="src/pages/OrdersPage.tsx">Total Amount: <span className="font-medium" data-id="6gyfj972v" data-path="src/pages/OrdersPage.tsx">${order.totalAmount.toFixed(2)}</span></p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2" data-id="nb20n3rmz" data-path="src/pages/OrdersPage.tsx">
                          {order.status === "Pending" &&
                      <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                            variant="outline"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => setPendingCancelId(order.id)}>

                                  Cancel Order
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Cancel this order?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. The order will be cancelled and you'll need to place a new one if you change your mind.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setPendingCancelId(null)}>
                                    Keep Order
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                              onClick={handleCancelOrder}
                              className="bg-red-500 hover:bg-red-600">

                                    Yes, Cancel Order
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

export default OrdersPage;