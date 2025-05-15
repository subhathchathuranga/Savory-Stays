import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

// Define types
export interface Room {
  id: number;
  name: string;
  description: string;
  price: number;
  type: "Single" | "Double" | "Deluxe" | "Suite";
  capacity: number;
  size: number;
  amenities: string[];
  images: string[];
  available: boolean;
}

export interface Booking {
  id: number;
  userId: number;
  room: Room;
  checkInDate: string;
  checkOutDate: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  numGuests: number;
  specialRequests?: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  totalPrice: number;
  createdAt: string;
}

interface BookingContextType {
  bookings: Booking[];
  userBookings: Booking[];
  addBooking: (bookingData: Omit<Booking, "id" | "createdAt">) => Promise<boolean>;
  cancelBooking: (bookingId: number) => Promise<boolean>;
  isRoomAvailable: (roomId: number, checkIn: string, checkOut: string) => boolean;
}

// Create context
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Provider component
export const BookingProvider = ({ children }: {children: ReactNode;}) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem("bookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  // Filter bookings for current user
  useEffect(() => {
    if (user) {
      setUserBookings(bookings.filter((booking) => booking.userId === user.id));
    } else {
      setUserBookings([]);
    }
  }, [user, bookings]);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = async (bookingData: Omit<Booking, "id" | "createdAt">) => {
    try {
      // Generate new booking with ID and timestamp
      const newBooking: Booking = {
        ...bookingData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };

      setBookings((prevBookings) => [...prevBookings, newBooking]);
      return true;
    } catch (error) {
      console.error("Error adding booking:", error);
      return false;
    }
  };

  const cancelBooking = async (bookingId: number) => {
    try {
      setBookings((prevBookings) =>
      prevBookings.map((booking) =>
      booking.id === bookingId ?
      { ...booking, status: "Cancelled" } :
      booking
      )
      );
      return true;
    } catch (error) {
      console.error("Error cancelling booking:", error);
      return false;
    }
  };

  const isRoomAvailable = (roomId: number, checkIn: string, checkOut: string) => {
    // Convert string dates to Date objects
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Filter active bookings for the specified room
    const roomBookings = bookings.filter(
      (booking) =>
      booking.room.id === roomId &&
      booking.status !== "Cancelled"
    );

    // Check if any booking overlaps with the requested dates
    const isOverlapping = roomBookings.some((booking) => {
      const bookedCheckIn = new Date(booking.checkInDate);
      const bookedCheckOut = new Date(booking.checkOutDate);

      return (
        checkInDate >= bookedCheckIn && checkInDate < bookedCheckOut ||
        checkOutDate > bookedCheckIn && checkOutDate <= bookedCheckOut ||
        checkInDate <= bookedCheckIn && checkOutDate >= bookedCheckOut);

    });

    return !isOverlapping;
  };

  const value = {
    bookings,
    userBookings,
    addBooking,
    cancelBooking,
    isRoomAvailable
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

// Custom hook to use the booking context
export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};