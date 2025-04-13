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
//     colSpan: { xs: 24, sm: 12, lg: 12 },
//   },
//   {
//     label: "Start Date",
//     name: "startDate",
//     type: "date",
//     icon: <CalendarOutlined />,
//     rules: [{ required: true, message: "Start Date is required" }],
//     colSpan: { xs: 24, sm: 12, lg: 12 },
//   },
//   {
//     label: "Agree to Terms",
//     name: "terms",
//     type: "checkbox",
//     rules: [{ required: true, message: "You must accept the terms" }],
//     colSpan: { xs: 24, sm: 24, lg: 8 },
//   },
//   {
//     label: "Custom List Items",
//     name: "customList",
//     type: "list",
//     rules: [{ required: true, message: "At least one item is required" }],
//     colSpan: { xs: 24, sm: 24, lg: 24 },
//     listFields: [
//       {
//         name: "field1",
//         placeholder: "Field 1",
//         rules: [{ required: true, message: "Field 1 is required" }],
//       },
//       {
//         name: "field2",
//         placeholder: "Field 2",
//         rules: [{ required: true, message: "Field 2 is required" }],
//       },
//       {
//         name: "field3",
//         placeholder: "Field 3",
//         rules: [{ required: true, message: "Field 3 is required" }],
//       },
//       {
//         name: "field4",
//         placeholder: "Field 4",
//         rules: [{ required: true, message: "Field 4 is required" }],
//       },
//     ],
//   },
// ];

// const MyResponsiveForm = () => {
//   const [form] = Form.useForm();

//   const onFinish = (values) => {
//     console.log("Form Values:", values);
//   };

//   return (
//     <div style={{ width: "100%", padding: "20px" }}>
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         style={{ width: "100%" }}
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
//                     className=" !rounded-full   overflow-hidden border-gray-500 border-[1px]"
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
//                   <div className=" w-full flex justify-start">
//                     {" "}
//                     <Checkbox>{field.label}</Checkbox>
//                   </div>
//                 ) : null}
//               </Form.Item>
//             </Col>
//           ))}
//         </Row>

//         {/* Dynamic List Items */}
//         <Form.List name="customList">
//           {(fields, { add, remove }) => (
//             <>
//               {fields.map(({ key, name, ...restField }) => (
//                 <Row key={key} gutter={[16, 16]} align="middle">
//                   <Col xs={24} sm={6}>
//                     <Form.Item
//                       {...restField}
//                       name={[name, "field1"]}
//                       rules={[{ required: true, message: "Field 1 required" }]}
//                     >
//                       <Input placeholder="Field 1" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={6}>
//                     <Form.Item
//                       {...restField}
//                       name={[name, "field2"]}
//                       rules={[{ required: true, message: "Field 2 required" }]}
//                     >
//                       <Input placeholder="Field 2" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={6}>
//                     <Form.Item
//                       {...restField}
//                       name={[name, "field3"]}
//                       rules={[{ required: true, message: "Field 3 required" }]}
//                     >
//                       <Input placeholder="Field 3" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={5}>
//                     <Form.Item
//                       {...restField}
//                       name={[name, "field4"]}
//                       rules={[{ required: true, message: "Field 4 required" }]}
//                     >
//                       <Input placeholder="Field 4" />
//                     </Form.Item>
//                   </Col>
//                   <Col xs={24} sm={1}>
//                     <MinusCircleOutlined
//                       onClick={() => remove(name)}
//                       style={{ color: "red", cursor: "pointer" }}
//                     />
//                   </Col>
//                 </Row>
//               ))}
//               <Button
//                 type="dashed"
//                 style={{ minWidth: "100px", width: "10%" }}
//                 onClick={() => add()}
//                 block
//                 icon={<PlusOutlined />}
//               >
//                 Add Item
//               </Button>
//             </>
//           )}
//         </Form.List>

//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             style={{ minWidth: "100px", width: "10%" }}
//           >
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default MyResponsiveForm;

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
//     label: "Agree to Terms",
//     name: "terms",
//     type: "checkbox",
//     rules: [{ required: true, message: "You must accept the terms" }],
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
//     colSpan: { xs: 24, sm: 12, lg: 12 },
//   },
// ];

// const MyResponsiveForm = () => {
//   const [form] = Form.useForm();

//   const onFinish = (values) => {
//     console.log("Form Values:", values);
//   };

//   return (
//     <div style={{ width: "100%", padding: "20px" }}>
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         style={{ width: "100%" }}
//         initialValues={{
//           customList: [{ field1: "", field2: "", field3: "", field4: "" }],
//         }}
//       >
//         {/* Regular Fields */}
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
//               >
//                 {field.type === "text" ||
//                 field.type === "email" ||
//                 field.type === "password" ? (
//                   <Input
//                     type={field.type}
//                     placeholder={`Enter ${field.label}`}
//                     prefix={field.icon}
//                   />
//                 ) : field.type === "select" ? (
//                   <Select placeholder={`Select ${field.label}`}>
//                     {field.options.map((option, idx) => (
//                       <Option key={idx} value={option}>
//                         {option}
//                       </Option>
//                     ))}
//                   </Select>
//                 ) : field.type === "date" ? (
//                   <DatePicker
//                     placeholder={`Select ${field.label}`}
//                     style={{ borderRadius: "999px", width: "100%" }}
//                   />
//                 ) : field.type === "checkbox" ? (
//                   <div className=" flex justify-start w-full pt-8">
//                     <Checkbox>{field.label}</Checkbox>
//                   </div>
//                 ) : null}
//               </Form.Item>
//             </Col>
//           ))}
//         </Row>

//         {/* Custom List Items */}
//         <div
//         //  style={{ marginTop: "-8px" }}
//         >
// <Form.List name="">
//   {(fields, { add, remove }) => (
//     <div className=" py-8">
//       {fields.map(({ key, name, ...restField }) => (
//         <Row key={key} gutter={[16, 16]} align="middle">
//           {["field1", "field2", "field3", "field4"].map(
//             (field, idx) => (
//               <Col key={idx} xs={24} sm={5}>
//                 <Form.Item
//                   {...restField}
//                   name={[name, field]}
//                   rules={[
//                     { required: true, message: `${field} required` },
//                   ]}
//                 >
//                   <Input placeholder={field} />
//                 </Form.Item>
//               </Col>
//             )
//           )}
//           <Col xs={24} sm={1}>
//             <MinusCircleOutlined
//               onClick={() => remove(name)}
//               style={{ color: "red", cursor: "pointer" }}
//             />
//           </Col>
//         </Row>
//       ))}
//       <Button
//         type="dashed"
//         onClick={() => add()}
//         block
//         icon={<PlusOutlined />}
//       >
//         Add Item
//       </Button>
//     </div>
//   )}
// </Form.List>
//         </div>

//         {/* Submit Button */}
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default MyResponsiveForm;

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
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  CalendarOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

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
    rules: [{ required: true, message: "Enter a valid email", type: "email" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    label: "Description",
    name: "description",
    type: "textarea",
    rules: [{ required: true, message: "Description is required" }],
    colSpan: { xs: 24, sm: 24, lg: 24 },
  },
  {
    label: "Agree to Terms",
    name: "terms",
    type: "checkbox",
    rules: [{ required: true, message: "You must accept the terms" }],
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    icon: <LockOutlined />,
    rules: [{ required: true, message: "Password is required", min: 6 }],
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
    colSpan: { xs: 24, sm: 12, lg: 12 },
  },
];

const MyResponsiveForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form Values:", values);
  };

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ width: "100%" }}
      >
        <Row gutter={[16, 16]}>
          {formFields.map((field, index) => (
            <Col key={index} {...field.colSpan}>
              <Form.Item
                label={
                  field.type !== "checkbox" ? (
                    <span>
                      {field.icon} {field.label}
                    </span>
                  ) : null
                }
                name={field.name}
                rules={field.rules}
              >
                {field.type === "text" ||
                field.type === "email" ||
                field.type === "password" ? (
                  <Input
                    type={field.type}
                    placeholder={`Enter ${field.label}`}
                    prefix={field.icon}
                  />
                ) : field.type === "textarea" ? (
                  <TextArea placeholder={`Enter ${field.label}`} rows={2} />
                ) : field.type === "select" ? (
                  <Select placeholder={`Select ${field.label}`}>
                    {field.options.map((option, idx) => (
                      <Option key={idx} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                ) : field.type === "date" ? (
                  <DatePicker
                    placeholder={`Select ${field.label}`}
                    style={{ width: "100%" }}
                  />
                ) : field.type === "checkbox" ? (
                  <div className=" flex justify-start w-full pt-8">
                    <Checkbox>{field.label}</Checkbox>
                  </div>
                ) : null}
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MyResponsiveForm;
