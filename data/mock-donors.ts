import type { Donor } from "@/types/donor";
import type { NepalRegion } from "@/types/map";
import { getCityByName } from "./cities-data";

/**
 * Mock donor data for demonstration
 * In production, this would come from your database/API
 */
// Helper function to safely get city or create fallback
function getCityLocation(cityName: string): NepalRegion {
  const city = getCityByName(cityName);
  if (!city) {
    // Fallback if city doesn't exist
    return {
      id: cityName.toLowerCase().replace(/\s+/g, "-"),
      name: cityName,
      type: "city",
      path: "",
    };
  }
  return city;
}

export const mockDonors: Donor[] = [
  // Kathmandu - Capital City (8 donors)
  {
    id: "1",
    name: "Ram Bahadur Thapa",
    bloodGroup: "A+",
    contact: "9841234567",
    location: getCityLocation("Kathmandu"),
    lastDonation: "2023-11-15",
    availability: "Available",
  },
  {
    id: "8",
    name: "Sangita Thapa",
    bloodGroup: "AB-",
    contact: "9841234568",
    location: getCityLocation("Kathmandu"),
    lastDonation: "2024-02-28",
    availability: "Available after 1 week",
  },
  {
    id: "13",
    name: "Bikash Shrestha",
    bloodGroup: "O+",
    contact: "9841234569",
    location: getCityLocation("Kathmandu"),
    lastDonation: "2023-12-01",
    availability: "Available",
  },
  {
    id: "14",
    name: "Anita Maharjan",
    bloodGroup: "B+",
    contact: "9841234570",
    location: getCityLocation("Kathmandu"),
    lastDonation: "2024-01-15",
    availability: "Available",
  },
  {
    id: "15",
    name: "Suresh Pradhan",
    bloodGroup: "A-",
    contact: "9841234571",
    location: getCityLocation("Kathmandu"),
    lastDonation: "2023-10-10",
    availability: "Available",
  },
  {
    id: "16",
    name: "Deepa Karki",
    bloodGroup: "O-",
    contact: "9841234572",
    location: getCityLocation("Kathmandu"),
    lastDonation: "2024-02-01",
    availability: "Available after 2 weeks",
  },
  {
    id: "17",
    name: "Nabin Khadka",
    bloodGroup: "AB+",
    contact: "9841234573",
    location: getCityLocation("Kathmandu"),
    lastDonation: "2023-11-20",
    availability: "Available",
  },
  {
    id: "18",
    name: "Sarita Acharya",
    bloodGroup: "B-",
    contact: "9841234574",
    location: getCityLocation("Kathmandu"),
    lastDonation: "2024-01-25",
    availability: "Available",
  },

  // Pokhara - Tourist City (6 donors)
  {
    id: "2",
    name: "Sita Devi Sharma",
    bloodGroup: "B-",
    contact: "9856234567",
    location: getCityLocation("Pokhara"),
    lastDonation: "2024-01-20",
    availability: "Available after 2 weeks",
  },
  {
    id: "9",
    name: "Dil Bahadur Tamang",
    bloodGroup: "A+",
    contact: "9856234568",
    location: getCityLocation("Pokhara"),
    lastDonation: "2023-11-01",
    availability: "Available",
  },
  {
    id: "19",
    name: "Prakash Gurung",
    bloodGroup: "O+",
    contact: "9856234569",
    location: getCityLocation("Pokhara"),
    lastDonation: "2023-12-15",
    availability: "Available",
  },
  {
    id: "20",
    name: "Laxmi Poudel",
    bloodGroup: "A-",
    contact: "9856234570",
    location: getCityLocation("Pokhara"),
    lastDonation: "2024-02-05",
    availability: "Available",
  },
  {
    id: "21",
    name: "Ramesh Thapa Magar",
    bloodGroup: "B+",
    contact: "9856234571",
    location: getCityLocation("Pokhara"),
    lastDonation: "2023-10-20",
    availability: "Available",
  },
  {
    id: "22",
    name: "Sunita Rana",
    bloodGroup: "AB+",
    contact: "9856234572",
    location: getCityLocation("Pokhara"),
    lastDonation: "2024-01-30",
    availability: "Available after 1 week",
  },

  // Biratnagar - Eastern City (4 donors)
  {
    id: "6",
    name: "Pooja Singh",
    bloodGroup: "B+",
    contact: "9852234567",
    location: getCityLocation("Biratnagar"),
    lastDonation: "2024-01-05",
    availability: "Available",
  },
  {
    id: "23",
    name: "Santosh Kumar Jha",
    bloodGroup: "O+",
    contact: "9852234568",
    location: getCityLocation("Biratnagar"),
    lastDonation: "2023-11-10",
    availability: "Available",
  },
  {
    id: "24",
    name: "Renu Kumari Sah",
    bloodGroup: "A+",
    contact: "9852234569",
    location: getCityLocation("Biratnagar"),
    lastDonation: "2024-02-15",
    availability: "Available after 1 week",
  },
  {
    id: "25",
    name: "Dinesh Yadav",
    bloodGroup: "AB-",
    contact: "9852234570",
    location: getCityLocation("Biratnagar"),
    lastDonation: "2023-12-05",
    availability: "Available",
  },

  // Lalitpur (4 donors)
  {
    id: "4",
    name: "Maya Kumari Gurung",
    bloodGroup: "AB+",
    contact: "9843234567",
    location: getCityLocation("Lalitpur"),
    lastDonation: "2024-02-10",
    availability: "Available",
  },
  {
    id: "26",
    name: "Rajan Tuladhar",
    bloodGroup: "B+",
    contact: "9843234568",
    location: getCityLocation("Lalitpur"),
    lastDonation: "2023-11-25",
    availability: "Available",
  },
  {
    id: "27",
    name: "Kamala Shakya",
    bloodGroup: "O-",
    contact: "9843234569",
    location: getCityLocation("Lalitpur"),
    lastDonation: "2024-01-18",
    availability: "Available after 2 weeks",
  },
  {
    id: "28",
    name: "Manoj Singh",
    bloodGroup: "A+",
    contact: "9843234570",
    location: getCityLocation("Lalitpur"),
    lastDonation: "2023-12-20",
    availability: "Available",
  },

  // Birgunj - Border City (3 donors)
  {
    id: "3",
    name: "Gopal Prasad Yadav",
    bloodGroup: "O+",
    contact: "9855234567",
    location: getCityLocation("Birgunj"),
    lastDonation: "2023-10-01",
    availability: "Available",
  },
  {
    id: "29",
    name: "Anjali Mishra",
    bloodGroup: "A-",
    contact: "9855234568",
    location: getCityLocation("Birgunj"),
    lastDonation: "2024-02-20",
    availability: "Available",
  },
  {
    id: "30",
    name: "Mukesh Thakur",
    bloodGroup: "B+",
    contact: "9855234569",
    location: getCityLocation("Birgunj"),
    lastDonation: "2023-11-30",
    availability: "Available",
  },

  // Bhaktapur (3 donors)
  {
    id: "5",
    name: "Krishna Bahadur Rai",
    bloodGroup: "A-",
    contact: "9844234567",
    location: getCityLocation("Bhaktapur"),
    lastDonation: "2023-12-25",
    availability: "Available",
  },
  {
    id: "31",
    name: "Gita Dangol",
    bloodGroup: "O+",
    contact: "9844234568",
    location: getCityLocation("Bhaktapur"),
    lastDonation: "2024-01-12",
    availability: "Available",
  },
  {
    id: "32",
    name: "Prem Ranjit",
    bloodGroup: "AB+",
    contact: "9844234569",
    location: getCityLocation("Bhaktapur"),
    lastDonation: "2023-10-15",
    availability: "Available",
  },

  // Dharan (3 donors)
  {
    id: "10",
    name: "Manju Kumari Limbu",
    bloodGroup: "B-",
    contact: "9853234567",
    location: getCityLocation("Dharan"),
    lastDonation: "2024-01-10",
    availability: "Available",
  },
  {
    id: "33",
    name: "Binod Karki",
    bloodGroup: "O+",
    contact: "9853234568",
    location: getCityLocation("Dharan"),
    lastDonation: "2023-11-05",
    availability: "Available",
  },
  {
    id: "34",
    name: "Rekha Subba",
    bloodGroup: "A+",
    contact: "9853234569",
    location: getCityLocation("Dharan"),
    lastDonation: "2024-02-25",
    availability: "Available after 1 week",
  },

  // Bharatpur (3 donors)
  {
    id: "11",
    name: "Rajesh Hamal",
    bloodGroup: "O+",
    contact: "9845234567",
    location: getCityLocation("Bharatpur"),
    lastDonation: "2023-10-20",
    availability: "Available",
  },
  {
    id: "35",
    name: "Sabita Adhikari",
    bloodGroup: "B+",
    contact: "9845234568",
    location: getCityLocation("Bharatpur"),
    lastDonation: "2024-01-22",
    availability: "Available",
  },
  {
    id: "36",
    name: "Kiran Thapa",
    bloodGroup: "A-",
    contact: "9845234569",
    location: getCityLocation("Bharatpur"),
    lastDonation: "2023-12-10",
    availability: "Available",
  },

  // Butwal (3 donors)
  {
    id: "7",
    name: "Arjun Kumar Shah",
    bloodGroup: "O-",
    contact: "9857234567",
    location: getCityLocation("Butwal"),
    lastDonation: "2023-09-10",
    availability: "Available",
  },
  {
    id: "37",
    name: "Rashmi Panthi",
    bloodGroup: "A+",
    contact: "9857234568",
    location: getCityLocation("Butwal"),
    lastDonation: "2024-02-08",
    availability: "Available",
  },
  {
    id: "38",
    name: "Ashok Dahal",
    bloodGroup: "B-",
    contact: "9857234569",
    location: getCityLocation("Butwal"),
    lastDonation: "2023-11-18",
    availability: "Available",
  },

  // Hetauda (3 donors)
  {
    id: "12",
    name: "Shanti Devi Chaudhary",
    bloodGroup: "AB+",
    contact: "9846234567",
    location: getCityLocation("Hetauda"),
    lastDonation: "2024-03-05",
    availability: "Available",
  },
  {
    id: "39",
    name: "Ramhari Poudel",
    bloodGroup: "O+",
    contact: "9846234568",
    location: getCityLocation("Hetauda"),
    lastDonation: "2023-12-18",
    availability: "Available",
  },
  {
    id: "40",
    name: "Urmila Ghimire",
    bloodGroup: "A+",
    contact: "9846234569",
    location: getCityLocation("Hetauda"),
    lastDonation: "2024-01-28",
    availability: "Available after 1 week",
  },

  // Nepalgunj (3 donors)
  {
    id: "41",
    name: "Kamal Bahadur Tharu",
    bloodGroup: "B+",
    contact: "9858234567",
    location: getCityLocation("Nepalgunj"),
    lastDonation: "2024-02-12",
    availability: "Available",
  },
  {
    id: "42",
    name: "Parbati Chaudhary",
    bloodGroup: "O+",
    contact: "9858234568",
    location: getCityLocation("Nepalgunj"),
    lastDonation: "2023-11-22",
    availability: "Available",
  },
  {
    id: "43",
    name: "Surya Bhat",
    bloodGroup: "A-",
    contact: "9858234569",
    location: getCityLocation("Nepalgunj"),
    lastDonation: "2024-01-08",
    availability: "Available",
  },

  // Dhangadhi (3 donors)
  {
    id: "44",
    name: "Tek Bahadur Bam",
    bloodGroup: "O+",
    contact: "9859234567",
    location: getCityLocation("Dhangadhi"),
    lastDonation: "2023-12-28",
    availability: "Available",
  },
  {
    id: "45",
    name: "Sushila Joshi",
    bloodGroup: "AB+",
    contact: "9859234568",
    location: getCityLocation("Dhangadhi"),
    lastDonation: "2024-02-18",
    availability: "Available after 1 week",
  },
  {
    id: "46",
    name: "Bhim Prasad Bhatta",
    bloodGroup: "B+",
    contact: "9859234569",
    location: getCityLocation("Dhangadhi"),
    lastDonation: "2023-10-25",
    availability: "Available",
  },

  // Itahari (2 donors)
  {
    id: "47",
    name: "Nirmala Rai",
    bloodGroup: "A+",
    contact: "9854234567",
    location: getCityLocation("Itahari"),
    lastDonation: "2024-01-16",
    availability: "Available",
  },
  {
    id: "48",
    name: "Dipak Chaudhary",
    bloodGroup: "O-",
    contact: "9854234568",
    location: getCityLocation("Itahari"),
    lastDonation: "2023-12-08",
    availability: "Available",
  },

  // Janakpur (2 donors)
  {
    id: "49",
    name: "Radha Kumari Mandal",
    bloodGroup: "B+",
    contact: "9847234567",
    location: getCityLocation("Janakpur"),
    lastDonation: "2024-02-22",
    availability: "Available",
  },
  {
    id: "50",
    name: "Mahesh Yadav",
    bloodGroup: "A+",
    contact: "9847234568",
    location: getCityLocation("Janakpur"),
    lastDonation: "2023-11-28",
    availability: "Available",
  },

  // Tansen (2 donors)
  {
    id: "51",
    name: "Bishnu Prasad Pun",
    bloodGroup: "O+",
    contact: "9848234567",
    location: getCityLocation("Tansen"),
    lastDonation: "2024-01-20",
    availability: "Available",
  },
  {
    id: "52",
    name: "Saraswoti Basnet",
    bloodGroup: "AB-",
    contact: "9848234568",
    location: getCityLocation("Tansen"),
    lastDonation: "2023-12-12",
    availability: "Available",
  },

  // Gorkha (2 donors)
  {
    id: "53",
    name: "Lal Bahadur Gurung",
    bloodGroup: "B+",
    contact: "9849234567",
    location: getCityLocation("Gorkha"),
    lastDonation: "2024-02-05",
    availability: "Available",
  },
  {
    id: "54",
    name: "Mina Kumari Thapa",
    bloodGroup: "A+",
    contact: "9849234568",
    location: getCityLocation("Gorkha"),
    lastDonation: "2023-10-30",
    availability: "Available",
  },
];

/**
 * Filter donors by location
 */
export function filterDonorsByLocation(
  donors: Donor[],
  locationId: string | null
): Donor[] {
  if (!locationId) {
    return donors;
  }
  return donors.filter((donor) => donor.location.id === locationId);
}


