import { LucideIcon } from 'lucide-react-native';

export type UserRole = 'agricultor' | 'comprador' | 'inversionista';
export type AppScreen = 'onboarding' | 'auth' | 'app';

export interface RoleConfig {
  id: UserRole;
  label: string;
  color: string;
  bgColor: string;
  icon: LucideIcon;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export interface Crop {
  id: number;
  name: string;
  area: string;
  status: string;
  progress: number;
  score: number;
}

export interface Listing {
  id: number;
  product: string;
  farmer: string;
  location: string;
  quantity: string;
  price: string;
  score: number;
  imageIcon: string;
  description?: string;
  harvestDate?: string;
}

export interface Project {
  id: number;
  title: string;
  roi: string;
  risk: 'Bajo' | 'Medio' | 'Alto';
  amount: string;
  funded: number;
  score: number;
  description?: string;
  farmerName?: string;
}

export interface Post {
  id: string;
  author: string;
  role: UserRole;
  content: string;
  likes: number;
  comments: number;
  type: 'venta' | 'compra' | 'inversion' | 'aviso';
  timeAgo: string;
}

export interface UserProfile {
  name: string;
  location: string;
  role: UserRole;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  verified: boolean;
}