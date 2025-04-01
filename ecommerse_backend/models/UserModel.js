const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: { type: String }, // Field to store the avatar path
  phone: { type: String }, // New field to store phone number
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
  }, // New field to store address details
  role: {
    type: String,
    enum: [
      "accountant", // University Accountant
      "admin", // System Administrator
      "alumni_relations", // Alumni Relations Officer
      "business_analyst", // New role: Business Analyst
      "content_creator", // New role: Content Creator
      "course_coordinator", // Course Coordinator
      "customer_support", // New role: Customer Support Representative
      "data_scientist", // New role: Data Scientist

      "department_head", // Head of Department
      "developer", // Software Developer
      "event_coordinator", // Event Coordinator
      "employee",
      "hr_manager", // HR Manager
      "intern", // Intern
      "legal_advisor", // New role: Legal Advisor
      "maintenance_staff", // Maintenance Staff
      "marketing_manager", // New role: Marketing Manager
      "operations_manager", // New role: Operations Manager
      "product_owner", // Product Owner
      "project_manager", // Project Manager
      "qa_lead", // Quality Assurance Lead
      "recruiter", // Recruiter
      "registrar", // University Registrar
      "researcher", // Researcher
      "sales_executive", // New role: Sales Executive

      "superadmin", // Super Administrator
      "support_engineer", // Support Engineer
      "tech_lead", // Technical Lead
      "test_engineer", // Software Tester
      "user", // Default role
      "ux_ui_designer", // UX/UI Designer
      "vendor",
      "outlet",
      "delivery_person",
    ],
    default: "user", // Default role
  },
  otp: { type: String },
  otpExpires: { type: Date },
  createdAt: { type: Date, default: Date.now }, // Timestamp for record creation
  updatedAt: { type: Date, default: Date.now }, // Timestamp for last update
});

const User = mongoose.model("User", userSchema);

module.exports = User;
