export interface MockDoctor {
  id: string;
  name: string;
  specialization: string;
  phone: string;
  chamberAddress: string;
  consultationFee: number;
  availableDays: string[];
}

export const MOCK_DOCTORS: MockDoctor[] = [
  {
    id: "d1a8e64c-6872-4d1e-9a1b-1c5c0a1b2c3d",
    name: "Dr. Sarah Johnson, MD",
    specialization: "Cardiologist",
    phone: "+1 (555) 234-5678",
    chamberAddress: "Suite 402, Heart Care Center, 120 Medical Plaza",
    consultationFee: 150.0,
    availableDays: ["Mon", "Wed", "Fri"],
  },
  {
    id: "d2b9f75d-7983-4e2f-ab2c-2d6d1b2c3d4e",
    name: "Dr. Michael Chen, MD, PhD",
    specialization: "Neurologist",
    phone: "+1 (555) 345-6789",
    chamberAddress: "Neuro Clinic, 450 Brain & Spine Institute",
    consultationFee: 180.0,
    availableDays: ["Tue", "Thu", "Sat"],
  },
  {
    id: "d3c0a86e-8094-4f30-bc3d-3e7e2c3d4e5f",
    name: "Dr. Emily Davis, MBBS, FCPS",
    specialization: "Pediatrician",
    phone: "+1 (555) 456-7890",
    chamberAddress: "Little Angels Wellness, 78 Blossom Ave",
    consultationFee: 120.0,
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
  {
    id: "d4d1b97f-9105-4041-cd4e-4f8f3d4e5f60",
    name: "Dr. Robert Martinez, MD",
    specialization: "Orthopedic Surgeon",
    phone: "+1 (555) 567-8901",
    chamberAddress: "Orthopedic Pavilion, 900 Health Way",
    consultationFee: 160.0,
    availableDays: ["Mon", "Thu", "Fri"],
  },
  {
    id: "d5e2ca80-0216-4152-de5f-50904e5f6071",
    name: "Dr. Ayesha Rahman, MBBS, MD",
    specialization: "Dermatologist & Cosmetologist",
    phone: "+1 (555) 678-9012",
    chamberAddress: "Skin Glow Aesthetics, 310 Pearl Tower",
    consultationFee: 140.0,
    availableDays: ["Tue", "Wed", "Sat", "Sun"],
  },
];
