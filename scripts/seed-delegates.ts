import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { delegatesTable } from "../lib/db/src/schema";
import { insertDelegateSchema } from "../lib/db/src/schema";

const { Pool } = pg;
const pool = new Pool({ connectionString: 'postgresql://postgres:419000%40Anushree@localhost:5432/file_recreator' });
const db = drizzle(pool);

const delegates = [
  { id: 1, portfolio: "SMT. DROUPADI MURMU", phoneNumber: "911234567890", category: "Government Leadership", role: "President of India" },
  { id: 2, portfolio: "SHRI C. P. RADHAKRISHNAN", phoneNumber: "911234567891", category: "Government Leadership", role: "Vice President of India" },
  { id: 3, portfolio: "SHRI NARENDRA DAMODARDAS MODI", phoneNumber: "911234567892", category: "Government Leadership", role: "Prime Minister of India" },
  { id: 4, portfolio: "SHRI AMIT ANILCHANDRA SHAH", phoneNumber: "911234567893", category: "Government Leadership", role: "Minister of Home Affairs, India" },
  { id: 5, portfolio: "SHRI ASHWINI VAISHNAV", phoneNumber: "911234567894", category: "Government Leadership", role: "(Union) Minister of Information & Broadcasting; Minister of Electronics & Information Technology" },
  { id: 6, portfolio: "SHRI JYOTIRADITYA M. SCINDIA", phoneNumber: "911234567895", category: "Government Leadership", role: "(Union) Minister of Communications" },
  { id: 7, portfolio: "SHRI JITIN PRASADA", phoneNumber: "911234567896", category: "Government Leadership", role: "(State) Minister of Electronics & Information Technology" },
  { id: 8, portfolio: "SHRI LOGANATHAN MURUGAN", phoneNumber: "911234567897", category: "Government Leadership", role: "(State) Minister of Information & Broadcasting" },
  { id: 9, portfolio: "SHRI CHANDRA SHEKHAR PEMMASANI", phoneNumber: "911234567898", category: "Government Leadership", role: "(State) Minister of Communications" },
  { id: 10, portfolio: "SHRI MAYUR RATILAL GOVEKAR", phoneNumber: "911234567899", category: "Ministry Bureaucrats", role: "(Union) Private Secretary (MoC & DoT)" },
  { id: 11, portfolio: "SHRI AMIT RAJAN", phoneNumber: "911234567900", category: "Ministry Bureaucrats", role: "(Union) Under Secretary (MoC & DoT)" },
  { id: 12, portfolio: "SHRI AMRENDRA PRATAP SINGH", phoneNumber: "911234567901", category: "Ministry Bureaucrats", role: "(State) Private Secretary(MoC & DoT)" },
  { id: 13, portfolio: "SHRI AMIT AGRAWAL", phoneNumber: "911234567902", category: "Ministry Bureaucrats", role: "Chairman, D.C.C. & Secretary (T) (MoC & DoT)" },
  { id: 14, portfolio: "SHRI RAJAN GERA", phoneNumber: "911234567903", category: "Ministry Bureaucrats", role: "Principal Staff Officer (MoC & DoT)" },
  { id: 15, portfolio: "SHRI ANAND PRAKASH", phoneNumber: "911234567904", category: "Ministry Bureaucrats", role: "Principal Staff Officer (MoC & DoT)" },
  { id: 16, portfolio: "RANVEER ALLAHBADIA", phoneNumber: "911234567905", category: "Social Media Influencers", role: "Content Creator" },
  { id: 17, portfolio: "AJEY NAGAR", phoneNumber: "911234567906", category: "Social Media Influencers", role: "Content Creator" },
  { id: 18, portfolio: "BHUWAN BAM", phoneNumber: "911234567907", category: "Social Media Influencers", role: "Content Creator" },
  { id: 19, portfolio: "ELVISH YADAV", phoneNumber: "911234567908", category: "Social Media Influencers", role: "Content Creator" },
  { id: 20, portfolio: "DHRUV RATHEE", phoneNumber: "911234567909", category: "Social Media Influencers", role: "Content Creator" },
  { id: 21, portfolio: "NITISH RAJPUT", phoneNumber: "911234567910", category: "Social Media Influencers", role: "Content Creator" },
  { id: 22, portfolio: "SAURAV JOSHI", phoneNumber: "911234567911", category: "Social Media Influencers", role: "Content Creator" },
  { id: 23, portfolio: "RAJ SHAMANI", phoneNumber: "911234567912", category: "Social Media Influencers", role: "Content Creator" },
  { id: 24, portfolio: "ANKUR WARIKOO", phoneNumber: "911234567913", category: "Social Media Influencers", role: "Content Creator" },
  { id: 25, portfolio: "RAJAT DALAL", phoneNumber: "911234567914", category: "Social Media Influencers", role: "Content Creator" },
  { id: 26, portfolio: "SANDEEP MAHESHWARI", phoneNumber: "911234567915", category: "Social Media Influencers", role: "Content Creator" },
  { id: 27, portfolio: "LAKSHAY CHAUDHARY", phoneNumber: "911234567916", category: "Social Media Influencers", role: "Content Creator" },
  { id: 28, portfolio: "APOORVA MUKHERJEE", phoneNumber: "911234567917", category: "Social Media Influencers", role: "Content Creator" },
  { id: 29, portfolio: "VIVEK BINDRA", phoneNumber: "911234567918", category: "Social Media Influencers", role: "Content Creator" },
  { id: 30, portfolio: "GAURAV TANEJA", phoneNumber: "911234567919", category: "Social Media Influencers", role: "Content Creator" },
  { id: 31, portfolio: "GAURAV CHAUDHARY", phoneNumber: "911234567920", category: "Social Media Influencers", role: "Content Creator" },
  { id: 32, portfolio: "MOHAK MANGAL", phoneNumber: "911234567921", category: "Social Media Influencers", role: "Content Creator" },
  { id: 33, portfolio: "DEEPAK KALAL", phoneNumber: "911234567922", category: "Social Media Influencers", role: "Content Creator" },
  { id: 34, portfolio: "PUNEET SUPERSTAR", phoneNumber: "911234567923", category: "Social Media Influencers", role: "Content Creator" },
  { id: 35, portfolio: "HINDUSTANI BHAU", phoneNumber: "911234567924", category: "Social Media Influencers", role: "Content Creator" },
  { id: 36, portfolio: "ARMAAN MALIK", phoneNumber: "911234567925", category: "Social Media Influencers", role: "Content Creator" },
  { id: 37, portfolio: "RISHABH JAIN", phoneNumber: "911234567926", category: "Social Media Influencers", role: "Content Creator" },
  { id: 38, portfolio: "SAMAY RAINA", phoneNumber: "911234567927", category: "Social Media Influencers", role: "Comedian" },
  { id: 39, portfolio: "TANMAY BHATT", phoneNumber: "911234567928", category: "Social Media Influencers", role: "Comedian" },
  { id: 40, portfolio: "ROHAN JOSHI", phoneNumber: "911234567929", category: "Social Media Influencers", role: "Comedian" },
  { id: 41, portfolio: "PALKI SHARMA", phoneNumber: "911234567930", category: "Social Media Influencers", role: "Comedian" },
  { id: 42, portfolio: "KUNAL KAMRA", phoneNumber: "911234567931", category: "Social Media Influencers", role: "Comedian" },
  { id: 43, portfolio: "AAKASH GUPTA", phoneNumber: "911234567932", category: "Social Media Influencers", role: "Comedian" },
  { id: 44, portfolio: "PRANIT MORE", phoneNumber: "911234567933", category: "Social Media Influencers", role: "Comedian" },
  { id: 45, portfolio: "MUNAWAR FARUQI", phoneNumber: "911234567934", category: "Social Media Influencers", role: "Comedian" },
  { id: 46, portfolio: "ASHNEER GROVER", phoneNumber: "911234567935", category: "Social Media Influencers", role: "Entrepreneur" },
  { id: 47, portfolio: "AMIT JAIN", phoneNumber: "911234567936", category: "Social Media Influencers", role: "Entrepreneur" },
  { id: 48, portfolio: "AMAN GUPTA", phoneNumber: "911234567937", category: "Social Media Influencers", role: "Entrepreneur" },
  { id: 49, portfolio: "NAMITA THAPAR", phoneNumber: "911234567938", category: "Social Media Influencers", role: "Entrepreneur" },
  { id: 50, portfolio: "ANUPAM MITTAL", phoneNumber: "911234567939", category: "Social Media Influencers", role: "Entrepreneur" },
  { id: 51, portfolio: "PEYUSH BANSAL", phoneNumber: "911234567940", category: "Social Media Influencers", role: "Entrepreneur" },
  { id: 52, portfolio: "VINEETA SINGH", phoneNumber: "911234567941", category: "Social Media Influencers", role: "Entrepreneur" },
  { id: 53, portfolio: "RAKHI SAWANT", phoneNumber: "911234567942", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 54, portfolio: "UORFI JAVED", phoneNumber: "911234567943", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 55, portfolio: "DEEPIKA PADUKONE", phoneNumber: "911234567944", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 56, portfolio: "ALIA BHATT", phoneNumber: "911234567945", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 57, portfolio: "KIARA ADVANI", phoneNumber: "911234567946", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 58, portfolio: "KRITI SANON", phoneNumber: "911234567947", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 59, portfolio: "KATRINA KAIF", phoneNumber: "911234567948", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 60, portfolio: "SHRADDHA KAPOOR", phoneNumber: "911234567949", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 61, portfolio: "SARA ALI KHAN", phoneNumber: "911234567950", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 62, portfolio: "RASHMIKA MANDANNA", phoneNumber: "911234567951", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 63, portfolio: "SAMANTHA RUTH PRABHU", phoneNumber: "911234567952", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 64, portfolio: "TAMANNAH BHATIA", phoneNumber: "911234567953", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 65, portfolio: "KEERTHY SURESH", phoneNumber: "911234567954", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 66, portfolio: "TRISHA KRISHNAN", phoneNumber: "911234567955", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 67, portfolio: "BHUMI PEDNEKAR", phoneNumber: "911234567956", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 68, portfolio: "POOJA HEGDE", phoneNumber: "911234567957", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 69, portfolio: "MRUNAL THAKUR", phoneNumber: "911234567958", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 70, portfolio: "SAI PALLAVI", phoneNumber: "911234567959", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 71, portfolio: "ANANYA PANDEY", phoneNumber: "911234567960", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 72, portfolio: "KANGNA RANAUT", phoneNumber: "911234567961", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 73, portfolio: "JACQUELINE FERNANDEZ", phoneNumber: "911234567962", category: "Bollywood Celebrities/Directors/Producers", role: "Actress" },
  { id: 74, portfolio: "KAMAL R KHAN (KRK)", phoneNumber: "911234567963", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 75, portfolio: "SHAH RUKH KHAN", phoneNumber: "911234567964", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 76, portfolio: "IMRAAN HAASHMI", phoneNumber: "911234567965", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 77, portfolio: "JACKIE SHROFF", phoneNumber: "911234567966", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 78, portfolio: "SANJAY DUTT", phoneNumber: "911234567967", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 79, portfolio: "AKSHAYE KHANNA", phoneNumber: "911234567968", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 80, portfolio: "SALMAN KHAN", phoneNumber: "911234567969", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 81, portfolio: "AAMIR KHAN", phoneNumber: "911234567970", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 82, portfolio: "AKSHAY KUMAR", phoneNumber: "911234567971", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 83, portfolio: "HRITHIK ROSHAN", phoneNumber: "911234567972", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 84, portfolio: "RANBIR KAPOOR", phoneNumber: "911234567973", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 85, portfolio: "RANVEER SINGH", phoneNumber: "911234567974", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 86, portfolio: "AJAY DEVGN", phoneNumber: "911234567975", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 87, portfolio: "KARTIK AARYAN", phoneNumber: "911234567976", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 88, portfolio: "VARUN DHAWAN", phoneNumber: "911234567977", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 89, portfolio: "RAJKUMMAR RAO", phoneNumber: "911234567978", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 90, portfolio: "AYUSHMANN KHURRANA", phoneNumber: "911234567979", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 91, portfolio: "MANOJ BAJPAYEE", phoneNumber: "911234567980", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 92, portfolio: "ANIL KAPOOR", phoneNumber: "911234567981", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 93, portfolio: "PANKAJ TRIPATHI", phoneNumber: "911234567982", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 94, portfolio: "K. K. MENON", phoneNumber: "911234567983", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 95, portfolio: "NANA PATEKAR", phoneNumber: "911234567984", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 96, portfolio: "AMITABH BACHCHAN", phoneNumber: "911234567985", category: "Bollywood Celebrities/Directors/Producers", role: "Actor" },
  { id: 97, portfolio: "S. S. RAJAMOULI", phoneNumber: "911234567986", category: "Bollywood Celebrities/Directors/Producers", role: "Film Director" },
  { id: 98, portfolio: "SANJAY LEELA BHANSALI", phoneNumber: "911234567987", category: "Bollywood Celebrities/Directors/Producers", role: "Film Director" },
  { id: 99, portfolio: "ALI ABBAS ZAFAR", phoneNumber: "911234567988", category: "Bollywood Celebrities/Directors/Producers", role: "Film Director" },
  { id: 100, portfolio: "SUDIPTO SEN", phoneNumber: "911234567989", category: "Bollywood Celebrities/Directors/Producers", role: "Film Director" },
  { id: 101, portfolio: "RAJKUMAR HIRANI", phoneNumber: "911234567990", category: "Bollywood Celebrities/Directors/Producers", role: "Film Director" },
  { id: 102, portfolio: "ZOYA AKHTAR", phoneNumber: "911234567991", category: "Bollywood Celebrities/Directors/Producers", role: "Film Director" },
  { id: 103, portfolio: "ANURAG KASHYAP", phoneNumber: "911234567992", category: "Bollywood Celebrities/Directors/Producers", role: "Film Director" },
  { id: 104, portfolio: "ROHIT SHETTY", phoneNumber: "911234567993", category: "Bollywood Celebrities/Directors/Producers", role: "Film Director" },
  { id: 105, portfolio: "IMTIAZ ALI", phoneNumber: "911234567994", category: "Bollywood Celebrities/Directors/Producers", role: "Film Director" },
  { id: 106, portfolio: "MAHESH BHATT", phoneNumber: "911234567995", category: "Bollywood Celebrities/Directors/Producers", role: "Film Director" },
  { id: 107, portfolio: "ADITYA DHAR", phoneNumber: "911234567996", category: "Bollywood Celebrities/Directors/Producers", role: "Film Director" },
  { id: 108, portfolio: "ADITYA CHOPRA", phoneNumber: "911234567997", category: "Bollywood Celebrities/Directors/Producers", role: "Film Producer" },
  { id: 109, portfolio: "KARAN JOHAR", phoneNumber: "911234567998", category: "Bollywood Celebrities/Directors/Producers", role: "Film Producer" },
  { id: 110, portfolio: "BHUSHAN KUMAR", phoneNumber: "911234567999", category: "Bollywood Celebrities/Directors/Producers", role: "Film Producer" },
  { id: 111, portfolio: "SAJID NADIADWALA", phoneNumber: "911234567000", category: "Bollywood Celebrities/Directors/Producers", role: "Film Producer" },
  { id: 112, portfolio: "FARHAN AKHTAR", phoneNumber: "911234567001", category: "Bollywood Celebrities/Directors/Producers", role: "Film Producer" },
  { id: 113, portfolio: "RONNIE SCREWVALA", phoneNumber: "911234567002", category: "Bollywood Celebrities/Directors/Producers", role: "Film Producer" },
];

async function seedDelegates() {
  console.log("Seeding delegates database...");
  
  try {
    for (const delegate of delegates) {
      await db.insert(delegatesTable).values(delegate).onConflictDoNothing();
    }
    
    console.log(`Successfully seeded ${delegates.length} delegates`);
  } catch (error) {
    console.error("Error seeding delegates:", error);
    process.exit(1);
  }
}

seedDelegates().then(() => process.exit(0));
