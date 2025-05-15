import { createContext, useContext, ReactNode } from "react";
import { FoodItem } from "./CartContext";
import { Room } from "./BookingContext";

// Sample food items data
const FOOD_ITEMS: FoodItem[] = [
// Appetizers
{
  id: 1,
  name: "Bruschetta",
  description: "Grilled bread rubbed with garlic and topped with olive oil, salt, and fresh tomato",
  price: 8.99,
  category: "Appetizers",
  image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
},
{
  id: 2,
  name: "Calamari",
  description: "Crispy fried squid served with marinara sauce",
  price: 12.99,
  category: "Appetizers",
  image: "https://images.unsplash.com/photo-1474222300086-56f8a438e47d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTg3MTl8MHwxfHNlYXJjaHwxfHxBJTIwcGxhdGUlMjBvZiUyMGNyaXNweSUyMGZyaWVkJTIwY2FsYW1hcmklMjBzZXJ2ZWQlMjB3aXRoJTIwYSUyMHNpZGUlMjBvZiUyMG1hcmluYXJhJTIwc2F1Y2UlMkMlMjBnYXJuaXNoZWQlMjB3aXRoJTIwbGVtb24lMjB3ZWRnZXMlMjBhbmQlMjBwYXJzbGV5LnxlbnwwfHx8fDE3NDcyMDExNTd8MA&ixlib=rb-4.1.0&q=80&w=200$w=800"
},
{
  id: 3,
  name: "Spinach Artichoke Dip",
  description: "Creamy blend of spinach, artichokes, and cheese, served with tortilla chips",
  price: 10.99,
  category: "Appetizers",
  image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MTg3MTl8MHwxfHNlYXJjaHwxfHxBJTIwY3JlYW15JTIwYmxlbmQlMjBvZiUyMHNwaW5hY2glMkMlMjBhcnRpY2hva2VzJTJDJTIwYW5kJTIwY2hlZXNlJTIwc2VydmVkJTIwd2l0aCUyMHRvcnRpbGxhJTIwY2hpcHMufGVufDB8fHx8MTc0NzIwMTE1Mnww&ixlib=rb-4.1.0&q=80&w=200$w=800"
},

// Mains
{
  id: 4,
  name: "Classic Cheeseburger",
  description: "Juicy beef patty with cheddar cheese, lettuce, tomato, and special sauce",
  price: 14.99,
  category: "Mains",
  image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
},
{
  id: 5,
  name: "Grilled Salmon",
  description: "Fresh salmon fillet grilled to perfection, served with seasonal vegetables",
  price: 22.99,
  category: "Mains",
  image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
},
{
  id: 6,
  name: "Fettuccine Alfredo",
  description: "Fettuccine pasta in a rich, creamy parmesan sauce",
  price: 16.99,
  category: "Mains",
  image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
},
{
  id: 7,
  name: "Margherita Pizza",
  description: "Classic pizza with tomato sauce, fresh mozzarella, and basil",
  price: 15.99,
  category: "Mains",
  image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
},

// Desserts
{
  id: 8,
  name: "Tiramisu",
  description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone",
  price: 8.99,
  category: "Desserts",
  image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
},
{
  id: 9,
  name: "Chocolate Lava Cake",
  description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
  price: 9.99,
  category: "Desserts",
  image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
},

// Beverages
{
  id: 10,
  name: "Freshly Squeezed Orange Juice",
  description: "100% pure orange juice, no sugar added",
  price: 4.99,
  category: "Beverages",
  image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
},
{
  id: 11,
  name: "Iced Coffee",
  description: "Cold brewed coffee served over ice",
  price: 3.99,
  category: "Beverages",
  image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
},
{
  id: 12,
  name: "Strawberry Smoothie",
  description: "Blend of fresh strawberries, yogurt, and honey",
  price: 5.99,
  category: "Beverages",
  image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
}];


// Sample rooms data
const ROOMS: Room[] = [
{
  id: 1,
  name: "Standard Single Room",
  description: "Cozy room with a single bed, perfect for solo travelers",
  price: 89.99,
  type: "Single",
  capacity: 1,
  size: 250,
  amenities: ["Free Wi-Fi", "TV", "Air conditioning", "Private bathroom", "Desk"],
  images: [
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"],

  available: true
},
{
  id: 2,
  name: "Classic Double Room",
  description: "Comfortable room with a queen-sized bed for couples or friends",
  price: 119.99,
  type: "Double",
  capacity: 2,
  size: 350,
  amenities: ["Free Wi-Fi", "TV", "Air conditioning", "Private bathroom", "Mini fridge", "Coffee maker"],
  images: [
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"],

  available: true
},
{
  id: 3,
  name: "Deluxe King Room",
  description: "Spacious room with a king-sized bed and city views",
  price: 159.99,
  type: "Deluxe",
  capacity: 2,
  size: 450,
  amenities: ["Free Wi-Fi", "Smart TV", "Air conditioning", "Private bathroom", "Mini fridge", "Coffee maker", "Workspace", "Safe"],
  images: [
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"],

  available: true
},
{
  id: 4,
  name: "Family Suite",
  description: "Two-bedroom suite perfect for families, with a living area and kitchenette",
  price: 239.99,
  type: "Suite",
  capacity: 4,
  size: 650,
  amenities: ["Free Wi-Fi", "2 Smart TVs", "Air conditioning", "2 Bathrooms", "Kitchenette", "Dining area", "Sofa bed", "Coffee maker", "Safe"],
  images: [
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"],

  available: true
},
{
  id: 5,
  name: "Luxury Suite",
  description: "Our most luxurious accommodation with separate living room and premium amenities",
  price: 329.99,
  type: "Suite",
  capacity: 2,
  size: 750,
  amenities: ["Free Wi-Fi", "65\" Smart TV", "Climate control", "Luxury bathroom", "Rainfall shower", "Mini bar", "Espresso machine", "King bed", "Bathrobe & slippers", "Safe", "Turn-down service"],
  images: [
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1631049552057-a8a160b448b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"],

  available: true
}];


// Define context type
interface DataContextType {
  foodItems: FoodItem[];
  getFoodItemsByCategory: (category: string) => FoodItem[];
  getFoodItemById: (id: number) => FoodItem | undefined;
  rooms: Room[];
  getRoomsByType: (type: string) => Room[];
  getRoomById: (id: number) => Room | undefined;
}

// Create context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider component
export const DataProvider = ({ children }: {children: ReactNode;}) => {
  const getFoodItemsByCategory = (category: string) => {
    return FOOD_ITEMS.filter((item) => item.category === category);
  };

  const getFoodItemById = (id: number) => {
    return FOOD_ITEMS.find((item) => item.id === id);
  };

  const getRoomsByType = (type: string) => {
    return ROOMS.filter((room) => room.type === type);
  };

  const getRoomById = (id: number) => {
    return ROOMS.find((room) => room.id === id);
  };

  const value = {
    foodItems: FOOD_ITEMS,
    getFoodItemsByCategory,
    getFoodItemById,
    rooms: ROOMS,
    getRoomsByType,
    getRoomById
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};