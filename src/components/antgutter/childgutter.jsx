import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  Button,
  Row,
  AutoComplete,
  Col,
  DatePicker,
  TimePicker,
  Switch,
  Radio,
} from "antd";

const { Option } = Select;
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ChildGutter = ({
  formFields,
  form,
  onFinish,
  initialValues = {},
  submitText = "Submit",
}) => {
  // const [form] = Form.useForm();

  return (
    <div className="max-w-full  box-border">
      <Form
        layout="vertical"
        form={form}
        scrollToFirstError
        onFinish={onFinish}
        initialValues={initialValues}
        style={{ maxWidth: "100%" }}
      >
        <Row gutter={[16, 16]}>
          {formFields.map((field, index) => (
            <Col key={index} {...field.colSpan}>
              <Form.Item
                label={
                  field.type !== "checkbox" && field.type !== "switch" ? (
                    <span
                      className="font-semibold capitalize"
                      style={{ color: "orange" }}
                    >
                      {field.icon} {field.label}
                    </span>
                  ) : field.type === "checkbox" ? (
                    <span className="hidden pointer-events-auto font-semibold capitalize">
                      {field.icon} {field.label}
                    </span>
                  ) : null
                }
                name={field.name}
                rules={field.rules}
                valuePropName={
                  field.type === "checkbox" || field.type === "switch"
                    ? "checked"
                    : field.type === "upload"
                    ? "fileList"
                    : undefined
                }
                getValueFromEvent={
                  field.type === "upload"
                    ? (e) => (Array.isArray(e) ? e : e?.fileList)
                    : undefined
                }
                hasFeedback={
                  !["checkbox", "switch", "radio", "select", "date"].includes(
                    field.type
                  )
                }
                // feedbackRender={({ errors, warnings }) =>
                //   errors.length ? (
                //     <div className="text-red-500">{errors[0]}</div>
                //   ) : warnings.length ? (
                //     <div className="text-yellow-500">{warnings[0]}</div>
                //   ) : null
                // }
                validateTrigger={["onBlur", "onChange"]}
              >
                {field.type === "text" && (
                  <Input
                    className="custom-input"
                    autoComplete="on"
                    placeholder={`Enter ${field.label}`}
                    prefix={field.icon}
                    //style={{ borderRadius: "999px" }}
                  />
                )}

                {field.type === "email" && (
                  <Input
                    className="custom-input"
                    autoComplete="email"
                    type="email"
                    placeholder={`Enter ${field.label}`}
                    prefix={field.icon}
                    // style={{ borderRadius: "999px" }}
                  />
                )}

                {field.type === "password" && (
                  <Input.Password
                    className="custom-input"
                    autoComplete="new-password"
                    placeholder={`Enter ${field.label}`}
                    prefix={field.icon}
                    //   style={{ borderRadius: "999px" }}
                  />
                )}

                {field.type === "number" && (
                  <InputNumber
                    className="custom-input"
                    style={{ width: "100%" }}
                    placeholder={`Enter ${field.label}`}
                    controls={false}
                  />
                )}

                {field.type === "select" && (
                  // <Select
                  //   className="!rounded-full custom-select placeholder:!text-gray-600 custom-input  overflow-hidden "
                  //   placeholder={`Select ${field.label}`}
                  //   style={{ width: "100%" }}
                  // >
                  //   {field?.options?.map((option, idx) => (
                  //     <Option key={idx} value={option}>
                  //       {option}
                  //     </Option>
                  //   ))}
                  // </Select>
                  <Select
                    allowClear
                    className="custom-rounded"
                    placeholder={`Select ${field.label}`}
                    style={{ width: "100%" }}
                  >
                    {field?.options?.map((option, idx) => (
                      <Select.Option key={idx} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select>
                )}

                {field.type === "date" && (
                  <DatePicker
                    className="custom-input"
                    style={{ width: "100%" }}
                    placeholder={`Select ${field.label}`}
                  />
                )}
                {field.type === "autocomplete" && (
                  <AutoComplete
                    className="custom-select custom-input"
                    name={field.name}
                    style={{ width: "100%" }}
                    options={field.options}
                    placeholder={`Select ${field.label}`}
                    filterOption={(inputValue, option) =>
                      option?.label
                        ?.toLowerCase()
                        .includes(inputValue.toLowerCase())
                    }
                  >
                    {/* <div className=" flex items-center  h-full ml-3">
                      {" "}
                      {field.icon}
                    </div> */}
                  </AutoComplete>
                )}

                {field.type === "phone" && (
                  <Input
                    className="custom-input rounded-full"
                    type="tel"
                    autoComplete="tel"
                    onChange={(e) => {
                      const numberOnly = e.target.value.replace(/\D/g, "");
                      form.setFieldsValue({ [field.name]: numberOnly });
                    }}
                    prefix={field.icon}
                    placeholder={`Enter ${field.label}`}
                  />
                )}

                {field.type === "time" && (
                  <TimePicker
                    className="custom-input"
                    style={{ width: "100%" }}
                    placeholder={`Select ${field.label}`}
                  />
                )}

                {field.type === "checkbox" && (
                  <Checkbox className=" flex justify-start">
                    {field.label}
                  </Checkbox>
                )}

                {field.type === "switch" && (
                  <Switch className="custom-switch" defaultChecked={false} />
                )}

                {field.type === "radio" && (
                  <Radio.Group className=" custom-radio flex  items-center justify-between">
                    {field.options.map((option, idx) => (
                      <Radio key={idx} value={option}>
                        {option}
                      </Radio>
                    ))}
                  </Radio.Group>
                )}

                {field.type === "upload" && (
                  <Upload
                    className=" flex justify-start flex-col"
                    name={field.name}
                    maxCount={1}
                    accept={field.accept}
                    showUploadList={{
                      showPreviewIcon: true,
                      showRemoveIcon: true,
                    }}
                    beforeUpload={(file) => {
                      const ext = file.name.split(".").pop().toLowerCase();
                      const isAllowedType = field.accept
                        ? field.accept.split(",").includes(`.${ext}`)
                        : true;

                      const isSizeValid =
                        file.size / 1024 / 1024 >= (field.minSize || 0) &&
                        file.size / 1024 / 1024 <= (field.maxSize || Infinity);

                      if (!isAllowedType) {
                        message.error(
                          `❌ Invalid file type. Allowed: ${field.accept}`
                        );
                      }

                      if (!isSizeValid) {
                        message.error(
                          `❌ File size must be between ${field.minSize}MB and ${field.maxSize}MB`
                        );
                      }

                      return isAllowedType && isSizeValid
                        ? true
                        : Upload.LIST_IGNORE;
                    }}
                    customRequest={({ file, onSuccess }) => {
                      setTimeout(() => {
                        onSuccess("ok");
                      }, 500);
                    }}
                    onChange={(info) => {
                      const updatedFileList = info.fileList.map((file) => {
                        if (!file.url && file.originFileObj) {
                          file.preview = URL.createObjectURL(
                            file.originFileObj
                          );
                        }
                        return file;
                      });
                      form.setFieldsValue({ [field.name]: updatedFileList });
                    }}
                    onPreview={(file) => {
                      const fileURL = file.url || file.preview;
                      if (fileURL) {
                        window.open(fileURL, "_blank");
                      } else {
                        message.error("⚠️ Preview not available");
                      }
                    }}
                    fileList={form.getFieldValue(field.name) || []}
                  >
                    <div className="w-full flex  gap-8">
                      <Button
                        icon={<UploadOutlined />}
                        className="rounded-full bg-orange-500 !w-[24] text-white hover:bg-orange-600 transition-all duration-200"
                      >
                        Click or Drag File
                      </Button>
                      <p className="mt-2 text-sm text-gray-500 text-center">
                        {field.accept?.replaceAll(",", ", ") || "Any file type"}{" "}
                        |{" "}
                        <span className="text-orange-600 font-medium">
                          {field.minSize || 0}MB - {field.maxSize || "∞"}MB
                        </span>
                      </p>
                    </div>
                  </Upload>
                )}

                {field.type === "textarea" && (
                  <Input.TextArea
                    className="custom-input"
                    rows={field.row}
                    placeholder={`Enter ${field.label}`}
                    //style={{ borderRadius: "16px" }}
                  />
                )}
              </Form.Item>
            </Col>
          ))}
        </Row>

        {/* <Form.Item>
          <Button type="primary" htmlType="submit" shape="round" size="large" block>
            {submitText}
          </Button>
        </Form.Item> */}
      </Form>
    </div>
  );
};

export default ChildGutter;
