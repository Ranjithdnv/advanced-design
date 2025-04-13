import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import "../index.css";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  GlobalOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
// adjust path accordingly

import { Input, Form, Row, Col, Select, List, DatePicker, message } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { FiPlusCircle } from "react-icons/fi";
// const dummySurgeryOptions = [
//   { value: "surgery1", label: "Heart Surgery" },
//   { value: "surgery2", label: "Knee Replacement" },
//   { value: "surgery3", label: "Knee Replacement" },
// ];

const dummyDoctors = {
  surgery1: [
    { value: "Dr. Smith", label: "Dr. Smith" },
    { value: "Dr. Smith2", label: "Dr. Johnson" },
  ],
  surgery2: [
    { value: "doc3", label: "Dr. Williams" },
    { value: "doc4", label: "Dr. Brown" },
  ],
};
const formFields3 = [
  {
    label: "Name",
    name: "name",
    type: "text",
    icon: <UserOutlined color="green" style={{ color: "orange" }} />,
    rules: [
      { required: false, message: "Name is required" },
      { min: 6, message: "Name must be at least 6 characters" },
    ],
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    icon: <MailOutlined style={{ color: "blue" }} />,
    rules: [
      { required: false, message: "Email is required" },
      //  { type: "email", message: "Enter a valid email" },
      {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/,
        message: "Please enter a valid email format",
      },
    ],
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    icon: <LockOutlined style={{ color: "blue" }} />,
    rules: [
      { required: false, message: "Password is required" },
      { min: 6, message: "Password must be at least 6 characters" },
    ],
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    name: "country",
    label: "Country",
    type: "autocomplete",
    colSpan: { xs: 24, sm: 12, lg: 12 },
    icon: <GlobalOutlined />,
    options: [
      { label: "India", value: "IN" },
      { label: "USA", value: "US" },
      { label: "Germany", value: "DE" },
      { label: "Canada", value: "CA" },
    ],
    rules: [{ required: false, message: "Please select your country" }],
  },
  {
    type: "phone",
    label: "Phone Number",
    name: "phoneNumber",
    icon: <PhoneOutlined />,
    rules: [
      { required: false, message: "Phone number is required" },
      {
        pattern: /^[0-9]{10}$/,
        message: "Enter a valid 10-digit phone number",
      },
    ],
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    label: "Age",
    name: "age",
    type: "number",
    rules: [{ required: false, message: "Age is required" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    label: "City",
    name: "city",
    type: "select",
    options: ["New York", "Los Angeles", "Chicago", "Houston"],
    rules: [{ required: false, message: "Please select a city" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    label: "Date of Birth",
    name: "dob",
    type: "date",
    icon: <CalendarOutlined />,
    rules: [{ required: false, message: "Date of Birth is required" }],
    colSpan: { xs: 24, sm: 6, lg: 6 },
  },
  {
    label: "Start Date",
    name: "startDate",
    type: "date",
    icon: <CalendarOutlined />,
    rules: [{ required: false, message: "Start Date is required" }],
    colSpan: { xs: 24, sm: 6, lg: 6 },
  },
  {
    label: "Meeting Time",
    name: "meetingTime",
    type: "time",
    rules: [{ required: false, message: "Please select a time" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    label: "Gender",
    name: "gender",
    type: "radio",
    options: ["Male", "Female", "Other"],
    rules: [{ required: false, message: "Please select your gender" }],
    colSpan: { xs: 24, sm: 12, lg: 6 },
  },
  {
    label: "Subscribe to Newsletter",
    name: "subscribe",
    type: "checkbox",
    // rules: [
    //   {
    //     validator: (_, value) =>
    //       value
    //         ? Promise.resolve()
    //         : Promise.reject(new Error("Please subscribe to continue")),
    //   },
    // ],
    colSpan: { xs: 24, sm: 12, lg: 6 },
  },
  {
    label: "Bio",
    name: "bio",
    type: "textarea",
    rules: [{ required: false, message: "Please enter your bio" }],
    colSpan: { xs: 24, sm: 24, lg: 24 },
    row: 4,
  },

  {
    label: "Receive Updates",
    name: "receiveUpdates",
    type: "switch",
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    type: "upload",
    name: "resume",
    label: "Resume",
    // rules: [{ required: false, message: "Please upload your resume" }],
    accept: ".pdf,.doc,.docx ,.png,.jpg,.mkv",
    maxSize: 50000, // MB
    minSize: 0.1, // MB

    colSpan: { xs: 24, sm: 12, lg: 10 },
  },
  {
    name: "consent",
    label: "Consent to Proceed",
    type: "checkbox", // checkbox to indicate consent
    required: false, // this field is required
    colSpan: { xs: 24, sm: 12, lg: 6 },
    sm: 24, // full width on small screens
  },
];
const dummySurgeryOptions = [
  { label: "Knee Surgery", value: "knee_surgery" },
  { label: "Hip Surgery", value: "hip_surgery" },
  { label: "Spine Surgery", value: "spine_surgery" },
  { label: "Eye Surgery", value: "eye_surgery" },
  { label: "Heart Surgery", value: "heart_surgery" },
  { label: "Cosmetic Surgery", value: "cosmetic_surgery" },
];

// Define form fields dynamically
const formFields = [
  {
    name: "surgeryType",
    label: "Surgery Type",
    type: "select",
    options: dummySurgeryOptions,
    required: false,
    sm: 7,
  },
  {
    sm: 7,
    name: "suggestedDoctor",
    label: "Suggested Doctor",
    type: "select",
    required: false,
    dependsOn: "surgeryType",
  },
  {
    name: "date",
    label: "Surgery Date",
    type: "date",
    required: false,
    dependsOn: "surgeryType",
    sm: 7,
  },
];
const formFields2 = [
  {
    name: "surgeryType",
    label: "Surgery Type",
    type: "select",
    options: dummySurgeryOptions,
    required: false,
  },
  {
    name: "suggestedDoctor",
    label: "Suggested Doctor",
    type: "select",
    //required: false,
    dependsOn: "surgeryType",
  },
  {
    name: "daten",
    label: "Surgery Datek",
    type: "input",
    required: false,
    //dependsOn: "surgeryType",
    sm: 12,
  },
  {
    name: "date",
    label: "Surgery Date",
    type: "date",
    required: false,
    dependsOn: "suggestedDoctor",
    sm: 23,
  },
  { name: "quantity", label: "Quantity", type: "number", required: false },
];
// Dummy options for Doctor Specialization
const dummySpecializationOptions = [
  { label: "Cardiologist", value: "cardiologist" },
  { label: "Dermatologist", value: "dermatologist" },
  { label: "Neurologist", value: "neurologist" },
  { label: "Pediatrician", value: "pediatrician" },
  { label: "Orthopedist", value: "orthopedist" },
  { label: "Psychiatrist", value: "psychiatrist" },
  { label: "General Practitioner", value: "general_practitioner" },
];

// Dummy options for Insurance Providers
const dummyInsuranceOptions = [
  { label: "Blue Cross Blue Shield", value: "blue_cross_blue_shield" },
  { label: "Aetna", value: "aetna" },
  { label: "Cigna", value: "cigna" },
  { label: "United Healthcare", value: "united_healthcare" },
  { label: "Humana", value: "humana" },
  { label: "Kaiser Permanente", value: "kaiser_permanente" },
  { label: "Anthem", value: "anthem" },
];

// Dummy options for Surgery Types

// Dummy options for Suggested Doctors based on surgery type
const dummyDoctorOptions = {
  knee_surgery: [
    { label: "Dr. John Doe", value: "dr_john_doe" },
    { label: "Dr. Jane Smith", value: "dr_jane_smith" },
  ],
  hip_surgery: [
    { label: "Dr. Alice Brown", value: "dr_alice_brown" },
    { label: "Dr. Bob Wilson", value: "dr_bob_wilson" },
  ],
  // Other surgery types...
};

const formDataothers = {
  age: 1,
  appointmentDate: "10-10-2026", // Likely from DatePicker, using dayjs/Moment
  contactNumber: "1",
  doctorSpecialization: "cardiologist",
  emergencyContact: "1",
  insuranceProvider: "kaiser_permanente",
  patientName: "1",
};
const formData = {
  daten: "",
  date: null,
};

const formFields4 = [
  {
    name: "patientName",
    label: "Patient Name",
    type: "input", // basic input field
    required: false, // this field is required
  },
  {
    name: "age",
    label: "Age",
    type: "number", // number input field for the age
    required: false, // this field is required
  },
  {
    name: "doctorSpecialization",
    label: "Doctor's Specialization",
    type: "select", // select dropdown for specializations
    options: dummySpecializationOptions, // array of options for the select input
    required: false, // this field is not required
  },
  {
    name: "appointmentDate",
    label: "Appointment Date",
    type: "date", // a date picker field
    required: false, // this field is required
    sm: 12, // uses 12 columns on small screens
  },
  {
    name: "contactNumber",
    label: "Contact Number",
    type: "input", // input field for contact number
    required: false, // this field is required
    sm: 24, // full width on small screens
  },
  {
    name: "insuranceProvider",
    label: "Insurance Provider",
    type: "select", // select dropdown for insurance providers
    options: dummyInsuranceOptions, // array of options for the select input
    required: false, // this field is not required
  },
  {
    name: "emergencyContact",
    label: "Emergency Contact",
    type: "input", // input field for emergency contact details
    required: false, // this field is not required
    sm: 12, // 12 columns on small screens
  },
];

const initialValues = {
  name: "",
  email: "",
  password: "",
  country: "",
  phoneNumber: "",
  age: "",
  bio: "",
  //city: "select city",
  dob: null,
  gender: "",
  meetingTime: null,
  receiveUpdates: false,
  startDate: null,
  subscribe: false,
  surgeries2: [
    {
      // surgeryType: "",
      //  suggestedDoctor: "",
      daten: "",
      date: null,
      // quantity: 1 // If needed
    },
  ],
};

// Define dynamic options logic
const optionsData = {
  surgeryType: () => dummySurgeryOptions,
  suggestedDoctor: (surgeryType) => dummyDoctorOptions[surgeryType] || [],
  doctorSpecialization: () => dummySpecializationOptions,
  insuranceProvider: () => dummyInsuranceOptions,
};

const handleFinish = (values) => {
  console.log("Form Submitted:", values);
};
// Function to handle form submission
const handleSubmit = (formData) => {
  console.log("Submitted Data:", formData);
};

import { Button } from "antd";
import ReusableFormList from "./antformlist/childlistt";
import ChildGutter from "./antgutter/childgutter";

const Cons = () => {
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [openSection, setOpenSection] = useState(null);

  const [data, setData] = useState(["Test 1"]); // Default item
  const [inputValues, setInputValues] = useState({}); // Track input values

  const onFinish = (values) => {
    console.log("Form Values:", values);
  };
  const handleSubmit = (formData) => {
    console.log("Submitted Data:", formData);
    // if (form?.getFieldsValue) {
    //   const currentValues = form.getFieldsValue();
    //   form.setFieldsValue({ ...currentValues, city: "" });
    // }

    let payload = formData;
    payload.consent = payload.consent || "";
    payload.city = payload.city || "";
    console.log(payload);
    form.resetFields();
  };

  const addNewItem = () => {
    const newItem = `Test ${data.length + 1}`;
    setData([...data, newItem]);
  };

  const handleInputChange = (index, value) => {
    setInputValues({ ...inputValues, [index]: value });
  };
  const handleDependencyChange = (index, fieldName, value, listName) => {
    if (fieldName === "surgeryType") {
      form.setFieldsValue({
        [listName]: form
          .getFieldValue(listName)
          .map((item, i) =>
            i === index ? { ...item, suggestedDoctor: undefined } : item
          ),
      });
    }
  };
  // Default items
  const [application, setApplication] = useState([
    {
      IssueType: "Bug Report",
      DetailsOfIssue: "9939399399393",
      status: "new",
      message: "Please provide more details.",
    },
    {
      IssueType: "Feature Request",
      DetailsOfIssue: "Add dark mode option.",
      status: "progress",
      message: "Feature is under development.",
    },
    {
      IssueType: "Performance Issue",
      DetailsOfIssue: "Slow response time on dashboard.",
      status: "new",
      message: "We are investigating the issue.",
    },
    {
      IssueType: "UI Enhancement",
      DetailsOfIssue: "Improve button styling for better UX.",
      status: "complete",
      message: "Enhancement has been deployed.",
    },
  ]);

  const [filteredApplications, setFilteredApplications] = useState(application);

  // Search Function
  const handleSearch = () => {
    const filtered = application.filter(
      (app) =>
        app.IssueType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.DetailsOfIssue.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApplications(filtered);
  };

  // Toggle Section: Show only the clicked item, or revert back to full list if clicked again
  const toggleSection = (selectedItem) => {
    if (openSection === selectedItem.IssueType) {
      setOpenSection(null);
      setFilteredApplications(application); // Restore full list
    } else {
      setOpenSection(selectedItem.IssueType);
      setFilteredApplications([selectedItem]); // Show only selected item
    }
  };

  // Add New Issue
  const addApplication = () => {
    const newIssue = {
      IssueType: "New Issue",
      DetailsOfIssue: "Example issue details.",
      status: "new",
      message: "Pending review.",
    };
    setApplication((prev) => [...prev, newIssue]);
    setFilteredApplications((prev) => [...prev, newIssue]); // Update filteredApplications
  };
  const [items, setItems] = useState(["firstInput"]);

  const addItem = () => {
    setItems([...items, `input${items.length + 1}`]);
  };
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };
  return (
    <div style={{ margin: "0 auto", textAlign: "center" }}>
      <div className="w-full">
        {/* Header Section */}
        <div className="flex px-4 w-full justify-between">
          <div>IP CONSULTANCE</div>
          <div className="bg-blue-400 border-2">
            <input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div className="h-[2px] w-full bg-green-800"></div>

        {/* Add Issue Button */}
        {/* <div className="my-4">
          <button
            onClick={addApplication}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Issue
          </button>
        </div> */}

        {/* Issue Table */}
        <div className="flex px-0 w-[100%] mx-auto border-0">
          <div className="w-full border-[0px] border-gray-700">
            <div className="grid grid-cols-6 px-4 gap-4 w-full text-center text-white bg-[#5D3BA9] h-12 -mb-2">
              <div className="text-lg flex items-center font-bold border-r-2 border-white">
                Case
              </div>
              <div className="text-lg flex items-center font-bold border-r-2 border-white">
                Patient
              </div>
              <div className="text-lg  flex items-center font-bold border-r-2 border-white">
                Patient Name
              </div>
              <div className="text-lg flex items-center font-bold border-r-2 border-white">
                Admission Date
              </div>{" "}
              <div className="text-lg  flex items-center  font-bold border-r-2 border-white ">
                <span className="w-full ">Contact</span>
              </div>{" "}
              <div className="text-lg flex items-center font-bold">Summary</div>
            </div>

            {/* Issue List */}
            <div className="w-full">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((applicantKey, i) => (
                  <div
                    key={i}
                    className="border-[1px] rounded-lg shadow-md p-4 my-4 overflow-hidden "
                  >
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleSection(applicantKey)}
                    >
                      <div className="grid grid-cols-6 text-black gap-4 w-full">
                        <h3 className="text-lg font-bold">
                          {applicantKey.IssueType}
                        </h3>
                        <h3 className="text-lg font-bold">
                          {applicantKey.DetailsOfIssue}
                        </h3>{" "}
                        <h3 className="text-lg font-bold">
                          {applicantKey.DetailsOfIssue}
                        </h3>{" "}
                        <h3 className="text-lg font-bold">
                          {applicantKey.DetailsOfIssue}
                        </h3>
                        <div className="w-full flex justify-center">
                          <h3 className="text-lg font-bold">visa.png</h3>
                        </div>
                        <h3 className="text-lg font-bold flex justify-around">
                          <div className="w-32 flex justify-center">
                            <span
                              className={`px-4 py-1 rounded-lg text-white   font-medium text-lg  bg-[#04816A]`}
                              //    ${
                              //   applicantKey.status === "new"
                              //     ? "bg-blue-500"
                              //     : applicantKey.status === "progress"
                              //     ? "bg-yellow-500"
                              //     : applicantKey.status === "complete"
                              //     ? "bg-green-500"
                              //     : "bg-red-500"
                              // }
                            >
                              add
                              {/* {applicantKey.status} */}
                            </span>
                          </div>
                          <span>
                            {openSection === applicantKey.IssueType ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </span>
                        </h3>
                      </div>
                    </div>

                    {/* Section Content */}
                    {openSection === applicantKey.IssueType && (
                      <div className=" text-black font-semibold">
                        <div className=" flex flex-col">
                          <div className="flex flex-col  items-start">
                            <div>vitals</div>
                            <div className=" flex  grow w-full ">
                              <div
                                style={{
                                  flexGrow: 1,
                                  textAlign: "left",
                                  flexBasis: 500,
                                }}
                              >
                                {" "}
                                <strong className=" text-green-500">
                                  Pulse Rate
                                </strong>{" "}
                                :40hp np
                              </div>
                              <div
                                style={{
                                  flexGrow: 1,
                                  textAlign: "left",
                                  flexBasis: 500,
                                }}
                              >
                                {" "}
                                <strong className=" text-green-500">
                                  Temperature
                                </strong>{" "}
                                : 60'c
                              </div>
                              <div
                                style={{
                                  flexGrow: 1,
                                  textAlign: "left",
                                  flexBasis: 500,
                                }}
                              >
                                {" "}
                                <strong className=" text-green-500">
                                  weight
                                </strong>{" "}
                                :60 kg
                              </div>
                              <div
                                style={{
                                  flexGrow: 1,
                                  textAlign: "left",
                                  flexBasis: 500,
                                }}
                              >
                                {" "}
                                <strong className=" text-green-500">
                                  Symptoms
                                </strong>{" "}
                                :HighFever
                              </div>
                            </div>
                          </div>
                          <div
                            className=" -ml-4"
                            style={{
                              width: "100vw",
                              height: "1px",
                              backgroundImage: "url('/linedoctor.png')",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          ></div>
                          <div className="flex flex-col  items-start">
                            <div>Tests</div>
                            <div className=" flex  grow w-full justify-between">
                              <div
                                style={{
                                  flexGrow: 1,
                                  textAlign: "left",
                                  flexBasis: 500,
                                }}
                              >
                                {" "}
                                <strong className=" text-green-500">
                                  Test Name
                                </strong>{" "}
                                :CBC
                              </div>
                              <div
                                style={{
                                  flexGrow: 1,
                                  textAlign: "left",
                                  flexBasis: 500,
                                }}
                              >
                                {" "}
                                <strong className=" text-green-500">
                                  Test Type
                                </strong>{" "}
                                :Blood Test
                              </div>
                              <div
                                style={{
                                  flexGrow: 1,
                                  textAlign: "left",
                                  flexBasis: 500,
                                }}
                              >
                                {" "}
                                <strong className=" text-green-500">
                                  Test Result
                                </strong>{" "}
                                :Possible Abnormal Causes Low iron defeciency
                              </div>
                            </div>
                            <div
                              className=" -ml-4"
                              style={{
                                width: "100vw",
                                height: "1px",
                                backgroundImage: "url('/linedoctor.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            ></div>
                          </div>
                          <div className="flex flex-col  items-start">
                            <div>Surgery :</div>
                            <div className=" flex  grow w-full justify-between">
                              <div
                                style={{
                                  flexGrow: 1,
                                  textAlign: "left",
                                  flexBasis: 500,
                                }}
                              >
                                {" "}
                                <strong className=" text-green-500">
                                  Surgery Name
                                </strong>{" "}
                                :Appendectomy
                              </div>
                              <div
                                style={{
                                  flexGrow: 1,
                                  textAlign: "left",
                                  flexBasis: 500,
                                }}
                              >
                                {" "}
                                <strong className=" text-green-500">
                                  Surgery Type
                                </strong>{" "}
                                : General Surgery
                              </div>
                              <div
                                style={{
                                  flexGrow: 1,
                                  textAlign: "left",
                                  flexBasis: 500,
                                }}
                              >
                                {" "}
                                <strong className=" text-green-500">
                                  Purpose
                                </strong>{" "}
                                :Removal of an infalamed
                              </div>
                            </div>
                            <div
                              className=" -ml-4"
                              style={{
                                width: "100vw",
                                height: "1px",
                                backgroundImage: "url('/linedoctor.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            ></div>
                          </div>

                          <div className="flex flex-col  items-start">
                            <div>Prescription</div>
                            <div className=" flex  grow w-full justify-between">
                              <div
                                style={{
                                  flexGrow: 1,
                                  textAlign: "left",
                                  flexBasis: 500,
                                }}
                              >
                                {" "}
                                <strong className=" text-green-500">
                                  Medicinen
                                </strong>{" "}
                                :amo
                              </div>{" "}
                              <div
                                style={{
                                  flexGrow: 1,
                                  textAlign: "left",
                                  flexBasis: 500,
                                }}
                              >
                                {" "}
                                <strong className=" text-green-500">
                                  Frequency
                                </strong>{" "}
                                :1-1--1
                              </div>{" "}
                              <div
                                style={{
                                  flexGrow: 1,
                                  textAlign: "left",
                                  flexBasis: 500,
                                }}
                              >
                                {" "}
                                <strong className=" text-green-500">
                                  Doctor
                                </strong>{" "}
                                :umesh
                              </div>{" "}
                              <div
                                style={{
                                  flexGrow: 1,
                                  textAlign: "left",
                                  flexBasis: 500,
                                }}
                              >
                                {" "}
                                <strong className=" text-green-500">
                                  Instruction
                                </strong>{" "}
                                :Dont eat non veg
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className=" -ml-4"
                          style={{
                            width: "100vw",
                            height: "1px",
                            backgroundImage: "url('/linedoctor.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>
                        <div style={{ width: "100%", padding: "0px" }}>
                          <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            style={{ width: "100%" }}
                          >
                            <Row gutter={[16, 16]}>
                              {/* First three inputs in separate columns */}
                              <Col xs={24} sm={8}>
                                <Form.Item
                                  label="First Input"
                                  name="firstInput"
                                  rules={[
                                    { required: false, message: "Required" },
                                  ]}
                                >
                                  <Input placeholder="Enter First Input" />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={8}>
                                <Form.Item
                                  label="Second Input"
                                  name="secondInput"
                                  rules={[
                                    { required: false, message: "Required" },
                                  ]}
                                >
                                  <Input placeholder="Enter Second Input" />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={8}>
                                <Form.Item
                                  label="Third Input"
                                  name="thirdInput"
                                  rules={[
                                    { required: false, message: "Required" },
                                  ]}
                                >
                                  <Input placeholder="Enter Third Input" />
                                </Form.Item>
                              </Col>
                              {/* Fourth input spanning two columns */}
                              <Col xs={24} sm={16}>
                                <Form.Item
                                  label="Fourth Input"
                                  name="fourthInput"
                                  rules={[
                                    { required: false, message: "Required" },
                                  ]}
                                >
                                  <Input placeholder="Enter Fourth Input" />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Form>
                        </div>{" "}
                        <div
                          className=" -ml-4"
                          style={{
                            width: "100vw",
                            height: "1px",
                            backgroundImage: "url('/linedoctor.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>
                        <div style={{ width: "100%", padding: "0px" }}>
                          <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            style={{ width: "100%" }}
                          >
                            <Row gutter={[16, 16]}>
                              <Col xs={24} sm={16}>
                                <List
                                  style={{ width: "100%" }}
                                  dataSource={items}
                                  renderItem={(item, index) => (
                                    <>
                                      <List.Item>
                                        <Form.Item
                                          style={{ width: "100%" }}
                                          label={`Input ${index + 1}`}
                                          name={item}
                                          rules={[
                                            {
                                              required: false,
                                              message: "Required",
                                            },
                                          ]}
                                        >
                                          <Input
                                            style={{ width: "100%" }}
                                            placeholder={`Enter Input ${
                                              index + 1
                                            }`}
                                          />
                                        </Form.Item>
                                        <Button
                                          style={{
                                            marginLeft: "20px",
                                            marginTop: "6px",
                                          }}
                                          type="dashed"
                                          onClick={() => removeItem(index)}
                                          icon={<MinusOutlined />}
                                          danger
                                        />
                                      </List.Item>
                                    </>
                                  )}
                                />
                              </Col>
                              <Col
                                className=" flex  items-center"
                                xs={24}
                                sm={2}
                              >
                                <>
                                  <List.Item>
                                    <Form.Item
                                      className=" flex  items-center"
                                      style={{
                                        width: "100%",
                                      }}
                                      label={
                                        <span className="   opacity-0">i</span>
                                      }
                                      rules={[
                                        {
                                          required: false,
                                          message: "Required",
                                        },
                                      ]}
                                    >
                                      <div
                                        onClick={addItem}
                                        style={{
                                          cursor: "pointer",
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <FiPlusCircle
                                          size={32}
                                          style={{ color: "#04816A" }}
                                        />
                                      </div>
                                    </Form.Item>
                                  </List.Item>
                                </>
                              </Col>
                            </Row>
                          </Form>
                        </div>
                        <div
                          className=" -ml-4"
                          style={{
                            width: "100vw",
                            height: "1px",
                            backgroundImage: "url('/linedoctor.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>
                        <div style={{ width: "100%", padding: "0px" }}>
                          {/* <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            style={{ width: "100%" }}
                          >
                            <Row gutter={[16, 16]}>
                              <Col xs={24} sm={8}>
                                <Form.Item
                                  label="First Select"
                                  name="firstSelect"
                                  rules={[
                                    { required: false, message: "Required" },
                                  ]}
                                >
                                  <Select placeholder="Select an option">
                                    <Select.Option value="option1">
                                      Option 1
                                    </Select.Option>
                                    <Select.Option value="option2">
                                      Option 2
                                    </Select.Option>
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={8}>
                                <Form.Item
                                  label="Second Select"
                                  name="secondSelect"
                                  rules={[
                                    { required: false, message: "Required" },
                                  ]}
                                >
                                  <Select placeholder="Select an option">
                                    <Select.Option value="option1">
                                      Option 1
                                    </Select.Option>
                                    <Select.Option value="option2">
                                      Option 2
                                    </Select.Option>
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={8}>
                                <Form.Item
                                  label="Date"
                                  name="date"
                                  rules={[
                                    { required: false, message: "Required" },
                                  ]}
                                >
                                  <DatePicker
                                    style={{ width: "100%" }}
                                    placeholder="Select a date"
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Form.Item>
                              <div className=" flex gap-6 text-white justify-center ">
                                {" "}
                                <button className="bg-[#5D3BA9] px-3 py-2 rounded-2xl">
                                  Cancel
                                </button>
                                <button
                                  className="bg-[#04816A] px-3 py-2 rounded-2xl"
                                  htmlType="submit"
                                >
                                  Save
                                </button>
                              </div>
                            </Form.Item>
                          </Form> */}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center p-4 text-gray-500">
                  No matching results found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full flex    flex-col items-center !justify-center">
        {" "}
        <div className=" w-[90%]  ">
          {/* <div className=" flex w-full  justify-center ">
            <div className="w-full ">
              <ReusableFormList
                form={form} //
                formFields={formFields2}
                optionsData={optionsData}
                handleDependencyChange={handleDependencyChange}
                listName="surgeries"
                onSubmit={handleSubmit} // Pass submit handler
              />
            </div>
          </div> */}
          <ChildGutter
            form={form}
            formFields={formFields3}
            onFinish={handleFinish}
            initialValues={initialValues}
          />
          <ReusableFormList
            form={form} //
            formFields={formFields2}
            deder={formData}
            handleDependencyChange={handleDependencyChange}
            optionsData={optionsData}
            listName="surgeries2"
            onSubmit={handleSubmit} // Pass submit handler
          />{" "}
          <ReusableFormList
            form={form} //
            deder={formDataothers}
            formFields={formFields4}
            handleDependencyChange={handleDependencyChange}
            optionsData={optionsData}
            listName="other"
            onSubmit={handleSubmit} // Pass submit handler
          />
          <Form
            form={form}
            initialValues={initialValues}
            onFinish={handleSubmit}
            onFinishFailed={(errorInfo) => {
              console.error("Form validation failed:", errorInfo);
              //message.error("Please correct the errors before submitting.");
            }}
          >
            {" "}
            <Button
              type="default"
              onClick={() => {
                form.resetFields();
              }}
              style={{ marginTop: "16px" }}
            >
              Clear Fields
            </Button>{" "}
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "16px" }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Cons;
