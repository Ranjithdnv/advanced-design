import ReusableFormList from "./childlistt";
import React from "react";
import { message } from "antd";

const dummySurgeryOptions = [
  { value: "surgery1", label: "Heart Surgery" },
  { value: "surgery2", label: "Knee Replacement" },
];

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

// Define form fields dynamically
const formFields = [
  {
    name: "surgeryType",
    label: "Surgery Type",
    type: "select",
    options: dummySurgeryOptions,
    required: true,
    sm: 7,
  },
  {
    sm: 7,
    name: "suggestedDoctor",
    label: "Suggested Doctor",
    type: "select",
    required: true,
    dependsOn: "surgeryType",
  },
  {
    name: "date",
    label: "Surgery Date",
    type: "date",
    required: true,
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
    dependsOn: "surgeryType",
    sm: 12,
  },
  {
    name: "date",
    label: "Surgery Date",
    type: "date",
    required: false,
    dependsOn: "suggestedDoctor",
    sm: 24,
  },
  { name: "quantity", label: "Quantity", type: "number", required: true },
];

// Define dynamic options logic
const optionsData = {
  surgeryType: () => dummySurgeryOptions,
  suggestedDoctor: (surgeryType) => dummyDoctors[surgeryType] || [],
};

// Function to handle form submission
const handleSubmit = (formData) => {
  console.log("Submitted Data:", formData);
};

import { Form, Button } from "antd";
const ParentComponent = () => {
  const [form] = Form.useForm();
  return (
    <>
      <ReusableFormList
        form={form} //
        formFields={formFields}
        optionsData={optionsData}
        listName="surgeries"
        onSubmit={handleSubmit} // Pass submit handler
      />
      <div className=" flex w-full justify-center ">
        {" "}
        <div className="w-full ">
          {" "}
          <ReusableFormList
            form={form} //
            formFields={formFields2}
            optionsData={optionsData}
            listName="surgeries2"
            onSubmit={handleSubmit} // Pass submit handler
          />
        </div>
      </div>
      <Form
        form={form}
        onFinish={handleSubmit}
        onFinishFailed={(errorInfo) => {
          console.error("Form validation failed:", errorInfo);
          message.error("Please correct the errors before submitting.");
        }}
      >
        <Button type="primary" htmlType="submit" style={{ marginTop: "16px" }}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ParentComponent;
