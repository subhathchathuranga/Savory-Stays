import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { FoodItem, CartItem } from "./CartContext";

// Define types
export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  totalAmount: number;
  address: string;
  phone: string;
  paymentMethod: string;
  status: "Pending" | "Preparing" | "Delivered" | "Cancelled";
  createdAt: string;
}

interface OrderContextType {
  orders: Order[];
  userOrders: Order[];
  createOrder: (orderData: Omit<Order, "id" | "createdAt">) => Promise<boolean>;
  cancelOrder: (orderId: number) => Promise<boolean>;
  updateOrderStatus: (orderId: number, status: Order["status"]) => Promise<boolean>;
}

// Create context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Provider component
export const OrderProvider = ({ children }: {children: ReactNode;}) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Filter orders for current user
  useEffect(() => {
    if (user) {
      setUserOrders(orders.filter((order) => order.userId === user.id));
    } else {
      setUserOrders([]);
    }
  }, [user, orders]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const createOrder = async (orderData: Omit<Order, "id" | "createdAt">) => {
    try {
      // Generate new order with ID and timestamp
      const newOrder: Order = {
        ...orderData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };

      setOrders((prevOrders) => [...prevOrders, newOrder]);
      return true;
    } catch (error) {
      console.error("Error creating order:", error);
      return false;
    }
  };

  const cancelOrder = async (orderId: number) => {
    try {
      // Only allow cancellation if order is still in Pending status
      const order = orders.find((o) => o.id === orderId);

      if (!order || order.status !== "Pending") {
        throw new Error("Cannot cancel order that is not pending");
      }

      setOrders((prevOrders) =>
      prevOrders.map((order) =>
      order.id === orderId ?
      { ...order, status: "Cancelled" } :
      order
      )
      );
      return true;
    } catch (error) {
      console.error("Error cancelling order:", error);
      return false;
    }
  };

  const updateOrderStatus = async (orderId: number, status: Order["status"]) => {
    try {
      setOrders((prevOrders) =>
      prevOrders.map((order) =>
      order.id === orderId ?
      { ...order, status } :
      order
      )
      );
      return true;
    } catch (error) {
      console.error("Error updating order status:", error);
      return false;
    }
  };

  const value = {
    orders,
    userOrders,
    createOrder,
    cancelOrder,
    updateOrderStatus
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

// Custom hook to use the order context
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};