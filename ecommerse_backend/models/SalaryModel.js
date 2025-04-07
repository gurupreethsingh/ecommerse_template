const mongoose = require("mongoose");

const salarySlipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  month: {
    type: String, // Format: YYYY-MM
    required: true,
  },
  totalHoursWorked: {
    type: Number,
    required: true,
  },
  workingDays: {
    type: Number,
    required: true,
  },
  basicSalary: {
    type: Number,
    required: true,
  },
  deductions: {
    type: Number,
    default: 0,
  },
  tax: {
    type: Number,
    default: 0,
  },
  netSalary: {
    type: Number,
    required: true,
  },
  generatedDate: {
    type: Date,
    default: Date.now,
  },
});

const SalarySlip = mongoose.model("SalarySlip", salarySlipSchema);

module.exports = SalarySlip;
