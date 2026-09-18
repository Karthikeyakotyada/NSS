export const INITIAL_VOLUNTEER = {
  id: "NSS-2026-0142",
  name: "R. Sudheer",
  department: "Computer Science & Engineering",
  year: "III Year",
  institution: "National Institute of Technology / University College of Engineering",
  photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  email: "rsudheer.nss@univ.edu",
  phone: "+91 98765 43210",
  joinedDate: "15 August 2024",
  stats: {
    hours: 42,
    eventsParticipated: 8,
    activitiesCompleted: 7,
    certificatesCount: 5,
    rank: 12,
    attendanceRate: 92,
    impactScore: 785
  }
};

export const INITIAL_EVENTS = [
  {
    id: "EVT-BEACH-01",
    title: "Beach Clean-Up Drive",
    category: "Environmental",
    date: "Saturday, Sept 20, 2026",
    time: "08:00 AM - 12:00 PM",
    venue: "RK Beach Promenade & Coastal Belt",
    organizer: "NSS Unit III - CSE Department",
    description: "Join fellow NSS volunteers in restoring our coastal ecology by clearing non-biodegradable waste, marine plastics, and promoting ocean safety awareness.",
    capacity: 50,
    registeredCount: 41,
    hours: 4,
    status: "UPCOMING",
    requirements: ["NSS T-Shirt / Cap", "Gloves provided on site", "Water bottle"],
    tags: ["Environmental", "Coastal", "Cleanliness"]
  },
  {
    id: "EVT-BLOOD-02",
    title: "Mega Blood Donation Camp 2026",
    category: "Blood Donation",
    date: "Wednesday, Sept 24, 2026",
    time: "09:00 AM - 04:00 PM",
    venue: "University Auditorium & Medical Wing",
    organizer: "NSS Central Committee & Red Cross",
    description: "Annual NSS Blood Donation Camp in collaboration with General Hospital Red Cross Bank. Donors receive certificates and health checkups.",
    capacity: 100,
    registeredCount: 78,
    hours: 6,
    status: "UPCOMING",
    requirements: ["Age 18+", "Weight >50kg", "Valid Student ID"],
    tags: ["Health", "Blood Donation", "Life Saver"]
  },
  {
    id: "EVT-TREE-03",
    title: "Campus Greenery & Tree Plantation",
    category: "Environmental",
    date: "12 August 2026",
    time: "07:30 AM - 10:30 AM",
    venue: "North Campus Botanical Grounds",
    organizer: "NSS Eco Club",
    description: "Planted 250 native saplings across the campus periphery to increase green canopy cover.",
    capacity: 40,
    registeredCount: 40,
    hours: 3,
    status: "COMPLETED",
    requirements: ["Gardening tools provided"],
    tags: ["Environmental", "Plantation"]
  },
  {
    id: "EVT-LIT-04",
    title: "Rural Digital Literacy & Cyber Safety",
    category: "Education",
    date: "02 July 2026",
    time: "09:00 AM - 02:00 PM",
    venue: "Government High School, Anandapuram Village",
    organizer: "NSS CSE & IT Cell",
    description: "Taught basic computer operations, UPI safety, and online fraud awareness to rural high school students.",
    capacity: 30,
    registeredCount: 28,
    hours: 5,
    status: "COMPLETED",
    requirements: ["Laptops pre-configured"],
    tags: ["Education", "Digital India"]
  },
  {
    id: "EVT-HEALTH-05",
    title: "Free Health Checkup & Eye Camp",
    category: "Health Camp",
    date: "Saturday, Oct 04, 2026",
    time: "08:30 AM - 01:30 PM",
    venue: "Community Hall, Gajuwaka",
    organizer: "NSS Medical Wing",
    description: "Organizing free health screening, BP/Sugar checks, and vision tests for senior citizens in adopted village.",
    capacity: 60,
    registeredCount: 45,
    hours: 5,
    status: "UPCOMING",
    requirements: ["Volunteer badge"],
    tags: ["Health", "Community"]
  },
  {
    id: "EVT-AWARE-06",
    title: "Road Safety & Helmet Awareness Rally",
    category: "Awareness",
    date: "18 May 2026",
    time: "08:00 AM - 11:00 AM",
    venue: "City Centre Traffic Circle",
    organizer: "NSS Transport & Traffic Wing",
    description: "Placard rally and helmet safety distribution drive conducted with City Traffic Police.",
    capacity: 80,
    registeredCount: 80,
    hours: 3,
    status: "COMPLETED",
    requirements: ["NSS Sash & Cap"],
    tags: ["Awareness", "Road Safety"]
  }
];

export const INITIAL_REGISTRATIONS = [
  { id: "REG-01", eventId: "EVT-TREE-03", volunteerId: "NSS-2026-0142", status: "COMPLETED", registeredAt: "2026-08-10" },
  { id: "REG-02", eventId: "EVT-LIT-04", volunteerId: "NSS-2026-0142", status: "COMPLETED", registeredAt: "2026-06-28" },
  { id: "REG-03", eventId: "EVT-AWARE-06", volunteerId: "NSS-2026-0142", status: "COMPLETED", registeredAt: "2026-05-15" }
];

export const INITIAL_ATTENDANCE = [
  { id: "ATT-01", eventId: "EVT-TREE-03", volunteerId: "NSS-2026-0142", status: "PRESENT", checkInTime: "07:35 AM", hours: 3 },
  { id: "ATT-02", eventId: "EVT-LIT-04", volunteerId: "NSS-2026-0142", status: "PRESENT", checkInTime: "08:55 AM", hours: 5 },
  { id: "ATT-03", eventId: "EVT-AWARE-06", volunteerId: "NSS-2026-0142", status: "PRESENT", checkInTime: "08:05 AM", hours: 3 }
];

export const INITIAL_ACTIVITIES = [
  { id: "ACT-01", eventId: "EVT-TREE-03", title: "Campus Greenery & Tree Plantation", category: "Environmental", date: "12 August 2026", hours: 3, status: "COMPLETED" },
  { id: "ACT-02", eventId: "EVT-LIT-04", title: "Rural Digital Literacy & Cyber Safety", category: "Education", date: "02 July 2026", hours: 5, status: "COMPLETED" },
  { id: "ACT-03", eventId: "EVT-AWARE-06", title: "Road Safety & Helmet Awareness Rally", category: "Awareness", date: "18 May 2026", hours: 3, status: "COMPLETED" },
  { id: "ACT-04", eventId: "EVT-PREV-01", title: "National Service Scheme Orientation", category: "Campus Service", date: "10 March 2026", hours: 4, status: "COMPLETED" },
  { id: "ACT-05", eventId: "EVT-PREV-02", title: "Winter Clothes & Blanket Donation", category: "Community Service", date: "15 January 2026", hours: 5, status: "COMPLETED" },
  { id: "ACT-06", eventId: "EVT-PREV-03", title: "Swachh Bharat Campus Drive Phase 1", category: "Environmental", date: "02 October 2025", hours: 4, status: "COMPLETED" },
  { id: "ACT-07", eventId: "EVT-PREV-04", title: "Pulse Polio Immunization Volunteer Service", category: "Health Camp", date: "18 November 2025", hours: 6, status: "COMPLETED" }
];

export const INITIAL_CERTIFICATES = [
  {
    id: "CERT-NSS-2026-00101",
    title: "Certificate of Environmental Service",
    eventTitle: "Campus Greenery & Tree Plantation",
    category: "Environmental",
    issueDate: "12 August 2026",
    hours: 3,
    status: "VERIFIED",
    recipient: "R. Sudheer",
    nssId: "NSS-2026-0142"
  },
  {
    id: "CERT-NSS-2026-00102",
    title: "Certificate of Digital Literacy Instruction",
    eventTitle: "Rural Digital Literacy & Cyber Safety",
    category: "Education",
    issueDate: "02 July 2026",
    hours: 5,
    status: "VERIFIED",
    recipient: "R. Sudheer",
    nssId: "NSS-2026-0142"
  },
  {
    id: "CERT-NSS-2026-00103",
    title: "Certificate of Traffic Safety Advocacy",
    eventTitle: "Road Safety & Helmet Awareness Rally",
    category: "Awareness",
    issueDate: "18 May 2026",
    hours: 3,
    status: "VERIFIED",
    recipient: "R. Sudheer",
    nssId: "NSS-2026-0142"
  },
  {
    id: "CERT-NSS-2026-00104",
    title: "NSS Foundation Orientation Certificate",
    eventTitle: "National Service Scheme Orientation",
    category: "Campus Service",
    issueDate: "10 March 2026",
    hours: 4,
    status: "VERIFIED",
    recipient: "R. Sudheer",
    nssId: "NSS-2026-0142"
  },
  {
    id: "CERT-NSS-2026-00105",
    title: "Certificate of Community Relief Service",
    eventTitle: "Winter Clothes & Blanket Donation",
    category: "Community Service",
    issueDate: "15 January 2026",
    hours: 5,
    status: "VERIFIED",
    recipient: "R. Sudheer",
    nssId: "NSS-2026-0142"
  }
];

export const INITIAL_ACHIEVEMENTS = [
  {
    id: "ACH-01",
    title: "Active NSS Member",
    description: "Completed 5+ NSS activities with active attendance.",
    iconName: "ShieldCheck",
    unlocked: true,
    unlockedDate: "18 May 2026",
    progress: 100,
    target: 5,
    current: 8
  },
  {
    id: "ACH-02",
    title: "Environmental Guardian",
    description: "Participated in 3 or more environmental cleanliness & tree drives.",
    iconName: "Trees",
    unlocked: true,
    unlockedDate: "12 August 2026",
    progress: 100,
    target: 3,
    current: 3
  },
  {
    id: "ACH-03",
    title: "50 Service Hours Milestone",
    description: "Log a total of 50 accredited volunteer hours for NSS.",
    iconName: "Clock",
    unlocked: false,
    progress: 84, // 42 / 50 -> increases to 92 (46/50) after check-in
    target: 50,
    current: 42
  },
  {
    id: "ACH-04",
    title: "100% Attendance Star",
    description: "Maintain over 90% attendance record across all registered events.",
    iconName: "Star",
    unlocked: true,
    unlockedDate: "02 July 2026",
    progress: 100,
    target: 90,
    current: 92
  },
  {
    id: "ACH-05",
    title: "Community Champion",
    description: "Participate in 10 official NSS community outreach events.",
    iconName: "Award",
    unlocked: false,
    progress: 80, // 8/10 -> increases to 90 (9/10) after check-in
    target: 10,
    current: 8
  },
  {
    id: "ACH-06",
    title: "Blood Donor Star",
    description: "Donate blood or volunteer at official NSS Blood Donation Camp.",
    iconName: "HeartPulse",
    unlocked: false,
    progress: 0,
    target: 1,
    current: 0
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: "ANN-01",
    title: "Community Beach Clean-Up Drive registration closes tonight!",
    message: "Volunteers interested in coastal waste management are advised to confirm registration before 10:00 PM today. Reporting time: 08:00 AM at RK Beach.",
    priority: "HIGH",
    date: "18 September 2026",
    author: "Prof. R. V. Sharma (NSS Program Coordinator)",
    category: "Event Alert"
  },
  {
    id: "ANN-02",
    title: "National Service Week begins next Monday",
    message: "All NSS units across departments will be conducting daily awareness rallies, blood grouping drives, and literacy campaigns. Attendance is mandatory for unit leaders.",
    priority: "NORMAL",
    date: "15 September 2026",
    author: "NSS Central Directorate",
    category: "General Notice"
  },
  {
    id: "ANN-03",
    title: "Certificates for Rural Digital Literacy Camp ready for download",
    message: "Verified e-certificates for the July 02 Digital Literacy instruction event are now available in your NSS Digital Portal.",
    priority: "NORMAL",
    date: "10 September 2026",
    author: "NSS Digital Cell",
    category: "Certificates"
  }
];

export const INITIAL_ROSTER = [
  { id: "NSS-2026-0142", name: "R. Sudheer", dept: "Computer Science & Eng", year: "III Year", hours: 42, events: 8, attendance: "92%", status: "Active" },
  { id: "NSS-2026-0104", name: "Ananya Sharma", dept: "Electronics & Comm", year: "III Year", hours: 58, events: 11, attendance: "95%", status: "Active" },
  { id: "NSS-2026-0211", name: "Rahul Verma", dept: "Mechanical Eng", year: "IV Year", hours: 64, events: 13, attendance: "98%", status: "Active" },
  { id: "NSS-2026-0089", name: "Priya Sundaram", dept: "Computer Science & Eng", year: "II Year", hours: 36, events: 6, attendance: "88%", status: "Active" },
  { id: "NSS-2026-0315", name: "Vikram Reddy", dept: "Civil Engineering", year: "III Year", hours: 48, events: 9, attendance: "91%", status: "Active" },
  { id: "NSS-2026-0178", name: "Sneha Patel", dept: "Electrical & Electronics", year: "I Year", hours: 22, events: 4, attendance: "85%", status: "Active" },
  { id: "NSS-2026-0052", name: "Aditya Rao", dept: "Computer Science & Eng", year: "IV Year", hours: 72, events: 15, attendance: "100%", status: "Active" },
  { id: "NSS-2026-0240", name: "Kavya Nair", dept: "Information Tech", year: "II Year", hours: 30, events: 5, attendance: "89%", status: "Active" },
  { id: "NSS-2026-0199", name: "Manish Kumar", dept: "Mechanical Eng", year: "II Year", hours: 18, events: 3, attendance: "78%", status: "Active" },
  { id: "NSS-2026-0133", name: "Divya Joshi", dept: "Electronics & Comm", year: "IV Year", hours: 52, events: 10, attendance: "94%", status: "Active" }
];

export const INITIAL_IMPACT_STATS = {
  totalVolunteers: 240,
  totalActivities: 38,
  completedActivities: 31,
  volunteerHours: 1842,
  beneficiaries: 4720,
  participationRate: 94
};

export const MONTHLY_HOURS_DATA = [
  { month: "Apr", hours: 120 },
  { month: "May", hours: 210 },
  { month: "Jun", hours: 180 },
  { month: "Jul", hours: 340 },
  { month: "Aug", hours: 490 },
  { month: "Sep", hours: 502 }
];

export const CATEGORY_DISTRIBUTION = [
  { name: "Environmental", value: 35, color: "#10b981" },
  { name: "Blood Donation", value: 20, color: "#ef4444" },
  { name: "Education", value: 18, color: "#3b82f6" },
  { name: "Health Camp", value: 15, color: "#ec4899" },
  { name: "Awareness", value: 12, color: "#f59e0b" }
];

export const DEPARTMENT_ENGAGEMENT = [
  { dept: "CSE", volunteers: 78, hours: 620 },
  { dept: "ECE", volunteers: 54, hours: 430 },
  { dept: "MECH", volunteers: 42, hours: 320 },
  { dept: "CIVIL", volunteers: 36, hours: 260 },
  { dept: "EEE", volunteers: 30, hours: 212 }
];
