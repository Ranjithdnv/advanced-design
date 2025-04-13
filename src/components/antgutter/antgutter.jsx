// ////////////////////////////////////////////////////  LIST  ////////////////////////////////////////////////////

// import React from "react";
// import {
//   Form,
//   Input,
//   InputNumber,
//   Select,
//   Checkbox,
//   Button,
//   Row,
//   Col,
//   DatePicker,
// } from "antd";
// import {
//   UserOutlined,
//   MailOutlined,
//   LockOutlined,
//   CalendarOutlined,
//   PlusOutlined,
//   MinusCircleOutlined,
// } from "@ant-design/icons";

// const { Option } = Select;

// const formFields = [
//   {
//     label: "Name",
//     name: "name",
//     type: "text",
//     icon: <UserOutlined />,
//     rules: [{ required: true, message: "Name is required" }],
//     colSpan: { xs: 24, sm: 12, lg: 12 },
//   },
//   {
//     label: "Email",
//     name: "email",
//     type: "email",
//     icon: <MailOutlined />,
//     rules: [{ required: true, message: "Enter a valid email", type: "email" }],
//     colSpan: { xs: 24, sm: 12, lg: 12 },
//   },
//   {
//     label: "Password",
//     name: "password",
//     type: "password",
//     icon: <LockOutlined />,
//     rules: [{ required: true, message: "Password is required", min: 6 }],
//     colSpan: { xs: 24, sm: 12, lg: 12 },
//   },
//   {
//     label: "Age",
//     name: "age",
//     type: "number",
//     rules: [{ required: true, message: "Age is required" }],
//     colSpan: { xs: 24, sm: 12, lg: 12 },
//   },
//   {
//     label: "City",
//     name: "city",
//     type: "select",
//     options: ["New York", "Los Angeles", "Chicago", "Houston"],
//     rules: [{ required: true, message: "Please select a city" }],
//     colSpan: { xs: 24, sm: 12, lg: 12 },
//   },
//   {
//     label: "Date of Birth",
//     name: "dob",
//     type: "date",
//     icon: <CalendarOutlined />,
//     rules: [{ required: true, message: "Date of Birth is required" }],
//     colSpan: { xs: 24, sm: 6, lg: 6 },
//   },
//   {
//     label: "Start Date",
//     name: "startDate",
//     type: "date",
//     icon: <CalendarOutlined />,
//     rules: [{ required: true, message: "Start Date is required" }],
//     colSpan: { xs: 24, sm: 6, lg: 6 },
//   },
// ];

// const MyResponsiveForm = () => {
//   const [form] = Form.useForm();

//   const onFinish = (values) => {
//     console.log("Form Values:", values);
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "100%",
//         maxWidth: "100%",
//         overflowX: "hidden",
//         boxSizing: "border-box",
//       }}
//     >
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         style={{ maxWidth: "100%" }}
//       >
//         <Row gutter={[16, 16]}>
//           {formFields.map((field, index) => (
//             <Col key={index} {...field.colSpan}>
//               <Form.Item
//                 label={
//                   field.type !== "checkbox" ? (
//                     <span>
//                       {field.icon} {field.label}
//                     </span>
//                   ) : null
//                 }
//                 name={field.name}
//                 rules={field.rules}
//                 valuePropName={
//                   field.type === "checkbox" ? "checked" : undefined
//                 }
//                 hasFeedback
//                 validateTrigger="onBlur"
//               >
//                 {field.type === "text" ||
//                 field.type === "email" ||
//                 field.type === "password" ? (
//                   <Input
//                     style={{ borderRadius: "999px" }}
//                     type={field.type}
//                     placeholder={`Enter ${field.label}`}
//                     prefix={field.icon}
//                   />
//                 ) : field.type === "number" ? (
//                   <InputNumber
//                     style={{ borderRadius: "999px", width: "100%" }}
//                     placeholder={`Enter ${field.label}`}
//                   />
//                 ) : field.type === "select" ? (
//                   <Select
//                     style={{ borderRadius: "999px !important" }}
//                     className=" !rounded-full custom-select  overflow-hidden border-gray-500 border-[1px]"
//                     placeholder={`Select ${field.label}`}
//                   >
//                     {field.options.map((option, idx) => (
//                       <Option key={idx} value={option}>
//                         {option}
//                       </Option>
//                     ))}
//                   </Select>
//                 ) : field.type === "date" ? (
//                   <DatePicker
//                     style={{ borderRadius: "999px", width: "100%" }}
//                     placeholder={`Select ${field.label}`}
//                   />
//                 ) : field.type === "checkbox" ? (
//                   <Checkbox>{field.label}</Checkbox>
//                 ) : null}
//               </Form.Item>
//             </Col>
//           ))}
//         </Row>
//       </Form>
//     </div>
//   );
// };

// export default MyResponsiveForm;
////////////////////////////////////////////////////  LIST  ////////////////////////////////////////////////////

import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  Button,
  Row,
  Col,
  DatePicker,
  TimePicker,
  Switch,
  Radio,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const formFields = [
  {
    label: "Name",
    name: "name",
    type: "text",
    icon: <UserOutlined />,
    rules: [{ required: true, message: "Name is required" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    icon: <MailOutlined />,
    rules: [
      { required: true, message: "Email is required" },
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
    icon: <LockOutlined />,
    rules: [
      { required: true, message: "Password is required" },
      { min: 6, message: "Password must be at least 6 characters" },
    ],
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    label: "Age",
    name: "age",
    type: "number",
    rules: [{ required: true, message: "Age is required" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    label: "City",
    name: "city",
    type: "select",
    options: ["New York", "Los Angeles", "Chicago", "Houston"],
    rules: [{ required: true, message: "Please select a city" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    label: "Date of Birth",
    name: "dob",
    type: "date",
    icon: <CalendarOutlined />,
    rules: [{ required: true, message: "Date of Birth is required" }],
    colSpan: { xs: 24, sm: 6, lg: 6 },
  },
  {
    label: "Start Date",
    name: "startDate",
    type: "date",
    icon: <CalendarOutlined />,
    rules: [{ required: true, message: "Start Date is required" }],
    colSpan: { xs: 24, sm: 6, lg: 6 },
  },
  {
    label: "Meeting Time",
    name: "meetingTime",
    type: "time",
    rules: [{ required: true, message: "Please select a time" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    label: "Gender",
    name: "gender",
    type: "radio",
    options: ["Male", "Female", "Other"],
    rules: [{ required: true, message: "Please select your gender" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    label: "Bio",
    name: "bio",
    type: "textarea",
    rules: [{ required: true, message: "Please enter your bio" }],
    colSpan: { xs: 24, sm: 24, lg: 24 },
  },
  {
    label: "Subscribe to Newsletter",
    name: "subscribe",
    type: "checkbox",
    rules: [
      {
        validator: (_, value) =>
          value
            ? Promise.resolve()
            : Promise.reject(new Error("Please subscribe to continue")),
      },
    ],
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    label: "Receive Updates",
    name: "receiveUpdates",
    type: "switch",
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
];

const MyResponsiveForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <div
      style={{ maxWidth: "100%", overflowX: "hidden", boxSizing: "border-box" }}
    >
      <Form
        // autoComplete="off"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: "100%" }}
      >
        <Row gutter={[16, 16]}>
          {formFields.map((field, index) => (
            <Col key={index} {...field.colSpan}>
              <Form.Item
                label={
                  field.type !== "checkbox" && field.type !== "switch" ? (
                    <span>
                      {field.icon} {field.label}
                    </span>
                  ) : null
                }
                name={field.name}
                rules={field.rules}
                hasFeedback={
                  !["checkbox", "switch", "radio", "select", "date"].includes(
                    field.type
                  ) // no spinner icon on checkboxes/switch
                }
                feedbackRender={({ errors, warnings }) =>
                  errors.length ? (
                    <div className="text-red-500">{errors[0]}</div>
                  ) : warnings.length ? (
                    <div className="text-yellow-500">{warnings[0]}</div>
                  ) : null
                }
                validateTrigger={["onBlur", "onChange"]}
                valuePropName={
                  field.type === "checkbox" || field.type === "switch"
                    ? "checked"
                    : undefined
                }
              >
                {field.type === "text" && (
                  <Input
                    autoComplete="on"
                    type="text"
                    placeholder={`Enter ${field.label}`}
                    prefix={field.icon}
                    style={{ borderRadius: "999px" }}
                  />
                )}

                {field.type === "email" && (
                  <Input
                    autoComplete="email"
                    type="email"
                    placeholder={`Enter ${field.label}`}
                    prefix={field.icon}
                    style={{ borderRadius: "999px" }}
                  />
                )}

                {field.type === "password" && (
                  <Input.Password
                    autoComplete="new-password"
                    placeholder={`Enter ${field.label}`}
                    prefix={field.icon}
                    style={{ borderRadius: "999px" }}
                  />
                )}

                {field.type === "number" && (
                  <InputNumber
                    style={{ borderRadius: "999px", width: "100%" }}
                    placeholder={`Enter ${field.label}`}
                    controls={false}
                  />
                )}

                {field.type === "select" && (
                  <Select
                    className="!rounded-full custom-select overflow-hidden border-gray-500 border-[1px]"
                    placeholder={`Select ${field.label}`}
                    style={{ width: "100%" }}
                  >
                    {field.options.map((option, idx) => (
                      <Option key={idx} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                )}

                {field.type === "date" && (
                  <DatePicker
                    style={{ borderRadius: "999px", width: "100%" }}
                    placeholder={`Select ${field.label}`}
                  />
                )}

                {field.type === "time" && (
                  <TimePicker
                    style={{ borderRadius: "999px", width: "100%" }}
                    placeholder={`Select ${field.label}`}
                  />
                )}

                {field.type === "checkbox" && (
                  <Checkbox>{field.label}</Checkbox>
                )}

                {field.type === "switch" && <Switch />}

                {field.type === "radio" && (
                  <Radio.Group>
                    {field.options.map((option, idx) => (
                      <Radio key={idx} value={option}>
                        {option}
                      </Radio>
                    ))}
                  </Radio.Group>
                )}

                {field.type === "textarea" && (
                  <Input.TextArea
                    rows={4}
                    placeholder={`Enter ${field.label}`}
                    style={{ borderRadius: "16px" }}
                  />
                )}
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            size="large"
            block
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MyResponsiveForm;
