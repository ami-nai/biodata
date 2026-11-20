// Type definition for attribute rows
export interface AttributeRow {
  label: string;
  profile1Value: string;
  profile2Value: string;
  match: boolean;
}

// Overview attributes for comparison
export const overviewAttributes: AttributeRow[] = [
  {
    label: "Age",
    profile1Value: "25 years",
    profile2Value: "22 years",
    match: false,
  },
  {
    label: "Height",
    profile1Value: "5' 6\"",
    profile2Value: "5' 6\"",
    match: true,
  },
  {
    label: "Weight",
    profile1Value: "65 kg",
    profile2Value: "50 kg",
    match: false,
  },
  {
    label: "Skin Complexion",
    profile1Value: "Brown",
    profile2Value: "Fair",
    match: false,
  },
  {
    label: "Body Type",
    profile1Value: "Muscular",
    profile2Value: "Slim",
    match: false,
  },
  {
    label: "Blood Group",
    profile1Value: "O+",
    profile2Value: "O+",
    match: true,
  },
  {
    label: "Marital Status",
    profile1Value: "Unmarried",
    profile2Value: "Unmarried",
    match: true,
  },
  {
    label: "Have Children?",
    profile1Value: "No",
    profile2Value: "No",
    match: true,
  },
  {
    label: "Do you have any legal cases filed against you? (details if yes) ",
    profile1Value: null,
    profile2Value: null,
    match: true,
  },
  {
    label: "Any personal debt? (details if yes)",
    profile1Value: null,
    profile2Value: null,
    match: true,
  },
];

// Religion attributes for comparison
export const religionAttributes: AttributeRow[] = [
  {
    label: "Religion",
    profile1Value: "Muslim",
    profile2Value: "Muslim",
    match: true,
  },
  {
    label: "Religious Values",
    profile1Value: "Practicing",
    profile2Value: "Practicing",
    match: true,
  },
  {
    label: "Sect",
    profile1Value: "Sunni",
    profile2Value: "Shia",
    match: false,
  },
  {
    label: "Beard/Hijab",
    profile1Value: "Beard",
    profile2Value: "Hijab",
    match: false,
  },
  {
    label: "Do You Maintain Mahram-Non Mahram Boundaries?",
    profile1Value: "Strongly",
    profile2Value: "Strongly",
    match: true,
  },
  {
    label: "Do you follow any Pir / Mazar?",
    profile1Value: "No",
    profile2Value: "No",
    match: true,
  },
  {
    label: "Prayer",
    profile1Value: "5 times daily",
    profile2Value: "5 times daily",
    match: true,
  },
  {
    label: "Able to read Quran",
    profile1Value: "Yes",
    profile2Value: "Yes",
    match: true,
  },
  {
    label: "Are you convert?(details if yes)",
    profile1Value: "No",
    profile2Value: "Yes(Family pressure)",
    match: false,
  },
];

// Location attributes for comparison
export const locationAttributes: AttributeRow[] = [
  {
    label: "Current Country of Residence",
    profile1Value: "Bangladesh",
    profile2Value: "Bangladesh",
    match: true,
  },
  {
    label: "Current Residency Status",
    profile1Value: "Citizen",
    profile2Value: "Permanent Resident",
    match: false,
  },
  {
    label: "Current State",
    profile1Value: "Dhaka",
    profile2Value: "Chittagong",
    match: false,
  },
  {
    label: "Current City",
    profile1Value: "Dhaka",
    profile2Value: "Chittagong",
    match: false,
  },
  {
    label: "Current Division",
    profile1Value: "Dhaka",
    profile2Value: "Chittagong",
    match: false,
  },
  {
    label: "Current District",
    profile1Value: "Dhaka",
    profile2Value: "Chittagong",
    match: false,
  },
  {
    label: "Current Sub-District",
    profile1Value: "Mirpur",
    profile2Value: "Pahartali",
    match: false,
  },
  {
    label: "Current Village",
    profile1Value: "Mirpur-10",
    profile2Value: "East Pahartali",
    match: false,
  },
  {
    label: "Permanent Country of Residence",
    profile1Value: "Bangladesh",
    profile2Value: "Bangladesh",
    match: true,
  },
  {
    label: "Permanent Residency Status",
    profile1Value: "Citizen",
    profile2Value: "Citizen",
    match: true,
  },
  {
    label: "Permanent State",
    profile1Value: "Cumilla",
    profile2Value: "Chittagong",
    match: false,
  },
  {
    label: "Permanent City",
    profile1Value: "Cumilla",
    profile2Value: "Chittagong",
    match: false,
  },
  {
    label: "Permanent Division",
    profile1Value: "Chittagong",
    profile2Value: "Chittagong",
    match: true,
  },
  {
    label: "Permanent District",
    profile1Value: "Cumilla",
    profile2Value: "Chittagong",
    match: false,
  },
  {
    label: "Permanent Sub-District",
    profile1Value: "Debidwar",
    profile2Value: "Pahartali",
    match: false,
  },
  {
    label: "Permanent Village",
    profile1Value: "Eliotganj",
    profile2Value: "East Pahartali",
    match: false,
  },
  {
    label: "Grew Up In",
    profile1Value: "Cumilla",
    profile2Value: "Chittagong",
    match: false,
  },
  {
    label: "Willing to Relocate",
    profile1Value: "Yes",
    profile2Value: "No",
    match: false,
  },
];

// Education attributes for comparison
export const educationAttributes: AttributeRow[] = [
  {
    label: "Medium of Education",
    profile1Value: "English",
    profile2Value: "Bangla",
    match: false,
  },
  {
    label: "Highest Degree",
    profile1Value: "Bachelor's",
    profile2Value: "Master's",
    match: false,
  },
  {
    label: "SSC - Institute",
    profile1Value: "Cumilla Zilla School",
    profile2Value: "Chittagong Collegiate School",
    match: false,
  },
  {
    label: "SSC - Group",
    profile1Value: "Science",
    profile2Value: "Science",
    match: true,
  },
  {
    label: "SSC - Type",
    profile1Value: "Bangla Medium",
    profile2Value: "Bangla Medium",
    match: true,
  },
  {
    label: "SSC - GPA",
    profile1Value: "5.00",
    profile2Value: "4.75",
    match: false,
  },
  {
    label: "SSC - Grade",
    profile1Value: "A+",
    profile2Value: "A+",
    match: true,
  },
  {
    label: "SSC - Year of Passing",
    profile1Value: "2015",
    profile2Value: "2017",
    match: false,
  },
  {
    label: "HSC - Institute",
    profile1Value: "Notre Dame College",
    profile2Value: "Chittagong College",
    match: false,
  },
  {
    label: "HSC - Group",
    profile1Value: "Science",
    profile2Value: "Science",
    match: true,
  },
  {
    label: "HSC - Type",
    profile1Value: "Bangla Medium",
    profile2Value: "Bangla Medium",
    match: true,
  },
  {
    label: "HSC - GPA",
    profile1Value: "5.00",
    profile2Value: "5.00",
    match: true,
  },
  {
    label: "HSC - Grade",
    profile1Value: "A+",
    profile2Value: "A+",
    match: true,
  },
  {
    label: "HSC - Year of Passing",
    profile1Value: "2017",
    profile2Value: "2019",
    match: false,
  },
  {
    label: "Bachelor's - Institute",
    profile1Value: "BUET",
    profile2Value: "University of Chittagong",
    match: false,
  },
  {
    label: "Bachelor's - Degree Type",
    profile1Value: "B.Sc. in Engineering",
    profile2Value: "B.Sc.",
    match: false,
  },
  {
    label: "Bachelor's - Subject",
    profile1Value: "Computer Science",
    profile2Value: "Physics",
    match: false,
  },
  {
    label: "Bachelor's - CGPA",
    profile1Value: "3.75",
    profile2Value: "3.50",
    match: false,
  },
  {
    label: "Bachelor's - Currently Studying",
    profile1Value: "No",
    profile2Value: "Yes",
    match: false,
  },
  {
    label: "Bachelor's - Year of Passing",
    profile1Value: "2021",
    profile2Value: "Expected 2024",
    match: false,
  },
  {
    label: "Master's - Institute",
    profile1Value: "Not Applicable",
    profile2Value: "University of Chittagong",
    match: false,
  },
  {
    label: "Master's - Degree Type",
    profile1Value: "Not Applicable",
    profile2Value: "M.Sc.",
    match: false,
  },
  {
    label: "Master's - Subject",
    profile1Value: "Not Applicable",
    profile2Value: "Physics",
    match: false,
  },
  {
    label: "Master's - CGPA",
    profile1Value: "Not Applicable",
    profile2Value: "3.60",
    match: false,
  },
  {
    label: "Master's - Currently Studying",
    profile1Value: "Not Applicable",
    profile2Value: "No",
    match: false,
  },
  {
    label: "Master's - Year of Passing",
    profile1Value: "Not Applicable",
    profile2Value: "2023",
    match: false,
  },
  {
    label: "Doctorate - Institute",
    profile1Value: "Not Applicable",
    profile2Value: "Not Applicable",
    match: true,
  },
  {
    label: "Doctorate - Result",
    profile1Value: "Not Applicable",
    profile2Value: "Not Applicable",
    match: true,
  },
  {
    label: "Doctorate - Field",
    profile1Value: "Not Applicable",
    profile2Value: "Not Applicable",
    match: true,
  },
  {
    label: "Doctorate - Topic",
    profile1Value: "Not Applicable",
    profile2Value: "Not Applicable",
    match: true,
  },
  {
    label: "Doctorate - Currently Studying",
    profile1Value: "Not Applicable",
    profile2Value: "Not Applicable",
    match: true,
  },
  {
    label: "Doctorate - Year of Passing",
    profile1Value: "Not Applicable",
    profile2Value: "Not Applicable",
    match: true,
  },
];

// Career attributes for comparison
export const careerAttributes: AttributeRow[] = [
  {
    label: "Occupation",
    profile1Value: "Software Engineer",
    profile2Value: "Teacher",
    match: false,
  },
  {
    label: "Job Title",
    profile1Value: "Senior Software Engineer",
    profile2Value: "Assistant Professor",
    match: false,
  },
  {
    label: "Work Location",
    profile1Value: "Dhaka",
    profile2Value: "Chittagong",
    match: false,
  },
  {
    label: "Annual Income",
    profile1Value: "12,00,000 BDT",
    profile2Value: "6,00,000 BDT",
    match: false,
  },
  {
    label: "Monthly Income",
    profile1Value: "1,00,000 BDT",
    profile2Value: "50,000 BDT",
    match: false,
  },
  {
    label: "Occupation Details",
    profile1Value:
      "Working at a leading tech company, involved in full-stack development",
    profile2Value: "Teaching Physics at university level, conducting research",
    match: false,
  },
  {
    label: "Personal Assets",
    profile1Value: "Apartment in Dhaka, Car",
    profile2Value: "Land in Chittagong",
    match: false,
  },
  {
    label: "Vocational Training",
    profile1Value: "Yes",
    profile2Value: "No",
    match: false,
  },
  {
    label: "Vocational Training Details",
    profile1Value: "Completed AWS Certified Solutions Architect training",
    profile2Value: "Not Applicable",
    match: false,
  },
  {
    label: "Professional Certification",
    profile1Value: "Yes",
    profile2Value: "No",
    match: false,
  },
  {
    label: "Professional Certification Details",
    profile1Value:
      "AWS Certified Solutions Architect, Google Cloud Professional",
    profile2Value: "Not Applicable",
    match: false,
  },
];

// Family Details attributes for comparison
export const familyDetailsAttributes: AttributeRow[] = [
  {
    label: "Family Type",
    profile1Value: "Nuclear",
    profile2Value: "Joint",
    match: false,
  },
  {
    label: "Family Location",
    profile1Value: "Cumilla",
    profile2Value: "Chittagong",
    match: false,
  },
  {
    label: "Father's Name",
    profile1Value: "Abdul Karim",
    profile2Value: "Mohammad Hossain",
    match: false,
  },
  {
    label: "Father's Phone",
    profile1Value: "+880 1711-123456",
    profile2Value: "+880 1812-654321",
    match: false,
  },
  {
    label: "Father's Occupation",
    profile1Value: "Business",
    profile2Value: "Government Service",
    match: false,
  },
  {
    label: "Mother's Name",
    profile1Value: "Fatema Begum",
    profile2Value: "Amina Khatun",
    match: false,
  },
  {
    label: "Mother's Phone",
    profile1Value: "+880 1711-234567",
    profile2Value: "+880 1812-765432",
    match: false,
  },
  {
    label: "Mother's Occupation",
    profile1Value: "Homemaker",
    profile2Value: "Teacher",
    match: false,
  },
  {
    label: "Financial Condition",
    profile1Value: "Upper Middle Class",
    profile2Value: "Middle Class",
    match: false,
  },
  {
    label: "Family Assets",
    profile1Value: "House in Cumilla, Land in village, 2 cars",
    profile2Value: "House in Chittagong, Agricultural land",
    match: false,
  },
  {
    label: "Any Family Debt?",
    profile1Value: "No",
    profile2Value: "Yes",
    match: false,
  },
  {
    label: "Debt Details",
    profile1Value: "Not Applicable",
    profile2Value: "Home loan of 20 lakh BDT",
    match: false,
  },
  {
    label: "Total Siblings",
    profile1Value: "3",
    profile2Value: "4",
    match: false,
  },
  {
    label: "Self Rank Among Siblings",
    profile1Value: "2nd",
    profile2Value: "3rd",
    match: false,
  },
  {
    label: "Number of Brothers",
    profile1Value: "2",
    profile2Value: "2",
    match: true,
  },
  {
    label: "Number of Sisters",
    profile1Value: "1",
    profile2Value: "2",
    match: false,
  },
  {
    label: "Married Brothers",
    profile1Value: "1",
    profile2Value: "2",
    match: false,
  },
  {
    label: "Married Sisters",
    profile1Value: "1",
    profile2Value: "1",
    match: true,
  },
  {
    label: "Brother 1 - Name",
    profile1Value: "Ahmed Islam",
    profile2Value: "Kamal Hossain",
    match: false,
  },
  {
    label: "Brother 1 - Age",
    profile1Value: "28 years",
    profile2Value: "30 years",
    match: false,
  },
  {
    label: "Brother 1 - Occupation",
    profile1Value: "Doctor",
    profile2Value: "Engineer",
    match: false,
  },
  {
    label: "Brother 1 - Marital Status",
    profile1Value: "Married",
    profile2Value: "Married",
    match: true,
  },
  {
    label: "Brother 2 - Name",
    profile1Value: "Rahim Islam",
    profile2Value: "Jamal Hossain",
    match: false,
  },
  {
    label: "Brother 2 - Age",
    profile1Value: "23 years",
    profile2Value: "27 years",
    match: false,
  },
  {
    label: "Brother 2 - Occupation",
    profile1Value: "Student",
    profile2Value: "Businessman",
    match: false,
  },
  {
    label: "Brother 2 - Marital Status",
    profile1Value: "Unmarried",
    profile2Value: "Married",
    match: false,
  },
  {
    label: "Sister 1 - Name",
    profile1Value: "Nadia Islam",
    profile2Value: "Shahnaz Begum",
    match: false,
  },
  {
    label: "Sister 1 - Age",
    profile1Value: "24 years",
    profile2Value: "25 years",
    match: false,
  },
  {
    label: "Sister 1 - Occupation",
    profile1Value: "Teacher",
    profile2Value: "Homemaker",
    match: false,
  },
  {
    label: "Sister 1 - Marital Status",
    profile1Value: "Married",
    profile2Value: "Married",
    match: true,
  },
  {
    label: "Paternal Grandfather's Name",
    profile1Value: "Late Abdul Rahman",
    profile2Value: "Abdul Latif",
    match: false,
  },
  {
    label: "Paternal Grandfather's Profession",
    profile1Value: "Farmer",
    profile2Value: "Teacher",
    match: false,
  },
  {
    label: "Paternal Grandmother's Name",
    profile1Value: "Late Rabeya Khatun",
    profile2Value: "Jahanara Begum",
    match: false,
  },
  {
    label: "Paternal Grandmother's Profession",
    profile1Value: "Homemaker",
    profile2Value: "Homemaker",
    match: true,
  },
  {
    label: "Maternal Grandfather's Name",
    profile1Value: "Mohammad Ali",
    profile2Value: "Late Abdul Jabbar",
    match: false,
  },
  {
    label: "Maternal Grandfather's Profession",
    profile1Value: "Businessman",
    profile2Value: "Government Officer",
    match: false,
  },
  {
    label: "Maternal Grandmother's Name",
    profile1Value: "Salma Begum",
    profile2Value: "Late Rehana Khatun",
    match: false,
  },
  {
    label: "Maternal Grandmother's Profession",
    profile1Value: "Homemaker",
    profile2Value: "Homemaker",
    match: true,
  },
  {
    label: "Number of Paternal Uncles",
    profile1Value: "3",
    profile2Value: "2",
    match: false,
  },
  {
    label: "Number of Maternal Uncles",
    profile1Value: "2",
    profile2Value: "3",
    match: false,
  },
  {
    label: "Paternal Uncle 1 - Name",
    profile1Value: "Kamal Ahmed",
    profile2Value: "Rafiq Hossain",
    match: false,
  },
  {
    label: "Paternal Uncle 1 - Occupation",
    profile1Value: "Doctor",
    profile2Value: "Businessman",
    match: false,
  },
  {
    label: "Paternal Uncle 1 - Marital Status",
    profile1Value: "Married",
    profile2Value: "Married",
    match: true,
  },
  {
    label: "Maternal Uncle 1 - Name",
    profile1Value: "Nasir Ali",
    profile2Value: "Moinul Islam",
    match: false,
  },
  {
    label: "Maternal Uncle 1 - Occupation",
    profile1Value: "Engineer",
    profile2Value: "Teacher",
    match: false,
  },
  {
    label: "Maternal Uncle 1 - Marital Status",
    profile1Value: "Married",
    profile2Value: "Married",
    match: true,
  },
];

// Health attributes for comparison
export const healthAttributes: AttributeRow[] = [
  {
    label: "Lifestyle Expense (Monthly)",
    profile1Value: "50,000 BDT",
    profile2Value: "30,000 BDT",
    match: false,
  },
  {
    label: "Allergic To",
    profile1Value: "Peanuts, Dust",
    profile2Value: "None",
    match: false,
  },
  {
    label: "Diet",
    profile1Value: "Non-Vegetarian",
    profile2Value: "Vegetarian",
    match: false,
  },
  {
    label: "Do you Smoke?",
    profile1Value: "No",
    profile2Value: "No",
    match: true,
  },
  {
    label: "Do you Drink Alcohol?",
    profile1Value: "No",
    profile2Value: "No",
    match: true,
  },
  {
    label: "Any Chronic Disease?",
    profile1Value: "No",
    profile2Value: "Yes",
    match: false,
  },
  {
    label: "Disease Details",
    profile1Value: "Not Applicable",
    profile2Value: "Asthma - controlled with medication",
    match: false,
  },
  {
    label: "Overall Health Condition",
    profile1Value: "Excellent",
    profile2Value: "Good",
    match: false,
  },
  {
    label: "Hobbies",
    profile1Value: "Reading, Coding, Playing Cricket, Traveling",
    profile2Value: "Reading, Painting, Gardening, Cooking",
    match: false,
  },
  {
    label: "Pets",
    profile1Value: "Cat",
    profile2Value: "No Pets",
    match: false,
  },
];

// Marriage related Info attributes for comparison
export const marriageInfoAttributes: AttributeRow[] = [
  {
    label: "Guardian Agreed to Marriage?",
    profile1Value: "Yes",
    profile2Value: "Yes",
    match: true,
  },
  {
    label: "Want to Study After Marriage?",
    profile1Value: "No",
    profile2Value: "Yes",
    match: false,
  },
  {
    label: "Allow Spouse to Study After Marriage?",
    profile1Value: "Yes",
    profile2Value: "Yes",
    match: true,
  },
  {
    label: "Willing to Do Job After Marriage?",
    profile1Value: "Yes",
    profile2Value: "No",
    match: false,
  },
  {
    label: "Let Wife Work After Marriage?",
    profile1Value: "Yes",
    profile2Value: "Not Applicable",
    match: false,
  },
  {
    label: "Gift Expectation from Spouse's Family?",
    profile1Value: "No",
    profile2Value: "No",
    match: true,
  },
  {
    label: "Willing to Offer Gifts?",
    profile1Value: "Yes",
    profile2Value: "Yes",
    match: true,
  },
  {
    label: "Willing to be a House Husband?",
    profile1Value: "No",
    profile2Value: "Not Applicable",
    match: false,
  },
  {
    label: "Want Children After Marriage?",
    profile1Value: "Yes",
    profile2Value: "Yes",
    match: true,
  },
  {
    label: "Marriage Plan",
    profile1Value: "Want to get married within 1 year",
    profile2Value: "Want to get married within 6 months",
    match: false,
  },
  {
    label: "Thoughts on Marriage",
    profile1Value:
      "Marriage is a sacred bond and lifetime commitment. Looking for a partner who shares similar values and goals.",
    profile2Value:
      "Want to build a family based on mutual respect, trust, and Islamic values. Seeking a supportive life partner.",
    match: false,
  },
  {
    label: "About Yourself",
    profile1Value:
      "I am a practicing Muslim, family-oriented person who values honesty and kindness. I enjoy learning new things and spending quality time with loved ones.",
    profile2Value:
      "I am a simple, caring person who loves teaching and helping others. Family and faith are very important to me.",
    match: false,
  },
  {
    label: "Have Relocation Plans?",
    profile1Value: "Yes",
    profile2Value: "No",
    match: false,
  },
  {
    label: "Willing to Relocate with Spouse?",
    profile1Value: "Yes",
    profile2Value: "Depends on situation",
    match: false,
  },
  {
    label: "Preferred Marriage Time",
    profile1Value: "Within next year",
    profile2Value: "Within 6 months",
    match: false,
  },
];

// Partner Preference attributes for comparison
export const partnerPreferenceAttributes: AttributeRow[] = [
  {
    label: "Minimum Age Preference",
    profile1Value: "20 years",
    profile2Value: "25 years",
    match: false,
  },
  {
    label: "Maximum Age Preference",
    profile1Value: "28 years",
    profile2Value: "30 years",
    match: false,
  },
  {
    label: "Minimum Height Preference",
    profile1Value: "5' 2\"",
    profile2Value: "5' 6\"",
    match: false,
  },
  {
    label: "Maximum Height Preference",
    profile1Value: "5' 8\"",
    profile2Value: "6' 0\"",
    match: false,
  },
  {
    label: "Preferred Family Type",
    profile1Value: "Nuclear or Joint",
    profile2Value: "Nuclear",
    match: false,
  },
  {
    label: "Preferred Marital Status",
    profile1Value: "Unmarried",
    profile2Value: "Unmarried",
    match: true,
  },
  {
    label: "Accept Partner with Children?",
    profile1Value: "No",
    profile2Value: "No",
    match: true,
  },
  {
    label: "Preferred Religion",
    profile1Value: "Muslim",
    profile2Value: "Muslim",
    match: true,
  },
  {
    label: "Preferred Profession",
    profile1Value: "Teacher, Doctor, Engineer, or Homemaker",
    profile2Value: "Engineer, IT Professional, Business",
    match: false,
  },
  {
    label: "Minimum Education Qualification",
    profile1Value: "Bachelor's Degree",
    profile2Value: "Bachelor's Degree",
    match: true,
  },
  {
    label: "Community Preference",
    profile1Value: "Any Muslim community",
    profile2Value: "Bengali Muslim",
    match: false,
  },
  {
    label: "Preferred Sect",
    profile1Value: "Sunni preferred, but open to others",
    profile2Value: "Sunni",
    match: false,
  },
  {
    label: "Preferred Caste",
    profile1Value: "No preference",
    profile2Value: "No preference",
    match: true,
  },
  {
    label: "Preferred Class",
    profile1Value: "Middle Class or Upper Middle Class",
    profile2Value: "Middle Class",
    match: false,
  },
  {
    label: "Expected Qualities in Partner",
    profile1Value:
      "Religious, kind, family-oriented, educated, good character, respectful, supportive, honest",
    profile2Value:
      "Practicing Muslim, educated, career-oriented, respectful towards family, good sense of humor",
    match: false,
  },
  {
    label: "Qualities to Avoid in Partner",
    profile1Value:
      "Dishonest, disrespectful, arrogant, not religious, addicted to smoking or alcohol",
    profile2Value:
      "Arrogant, lazy, non-religious, disrespectful to parents, anger issues",
    match: false,
  },
  {
    label: "Accept Physically Challenged Partner?",
    profile1Value: "Depends on the condition",
    profile2Value: "No",
    match: false,
  },
];

// Map of tab names to their attribute arrays
export const attributesByTab: Record<string, AttributeRow[]> = {
  Overview: overviewAttributes,
  Religion: religionAttributes,
  Location: locationAttributes,
  Education: educationAttributes,
  Career: careerAttributes,
  "Family Details": familyDetailsAttributes,
  "Health & Lifestyle": healthAttributes,
  "Marriage Related Info": marriageInfoAttributes,
  "Partner Preference": partnerPreferenceAttributes,
};
