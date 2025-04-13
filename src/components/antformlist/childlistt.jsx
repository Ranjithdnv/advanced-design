import React from "react";
import {
  Form,
  Select,
  DatePicker,
  Button,
  Input,
  InputNumber,
  message,
  Row,
  Col,
} from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
import { useSnackbar } from "notistack";

const ReusableFormList = ({
  formFields,
  form,
  optionsData,
  deder,
  initialValues,
  handleDependencyChange,
  listName,
  onSubmit,
}) => {
  // const handleDependencyChange = (index, fieldName, value) => {
  //   if (fieldName === "surgeryType") {
  //     form.setFieldsValue({
  //       [listName]: form
  //         .getFieldValue(listName)
  //         .map((item, i) =>
  //           i === index ? { ...item, suggestedDoctor: undefined } : item
  //         ),
  //     });
  //   }
  // };
  const { enqueueSnackbar } = useSnackbar();
  const isMeaningfulValue = (value) => {
    return !(
      value === null ||
      value === undefined ||
      value === "" ||
      value === "undefined"
    );
  };

  const isLastEntryInvalid = (entry) => {
    if (typeof entry === "object" && entry !== null) {
      // Must NOT have any key with a non-meaningful value
      return Object.values(entry).some((val) => !isMeaningfulValue(val));
    }

    if (typeof entry === "string") {
      return !isMeaningfulValue(entry);
    }

    // Invalid for anything else (e.g., null, undefined, numbers, etc.)
    return true;
  };

  const validateAndAdd = async (add, fields, listName) => {
    if (fields.length === 0) {
      add();
      return;
    }

    const listValues = form.getFieldValue(listName) || [];
    console.log("List Values:", listValues);

    const lastEntry = listValues[listValues.length - 1];

    // Only add new entry if last one is valid
    if (isLastEntryInvalid(lastEntry)) {
      enqueueSnackbar(`Please enter all feilds of ${listName}`, {
        variant: "warning",
      });
      return;
    }

    const hasEmptyField = listValues.some((entry) => {
      if (!entry || typeof entry !== "object") {
        return true;
      }

      return formFields.some((field) => {
        if (!field.required) return false;
        return !isMeaningfulValue(entry[field.name]);
      });
    });

    if (hasEmptyField) {
      enqueueSnackbar(`Please enter all feilds of ${listName}`, {
        variant: "error",
      });
      message.error(
        "Please fill all required fields before adding a new entry."
      );
      return;
    }

    try {
      await form.validateFields();
      add(deder);
    } catch (error) {
      message.error("Please correct the errors before adding a new entry.");
    }
  };

  const validateAndAdd1 = async (add, fields, listName) => {
    if (fields.length === 0) {
      add();
      return;
    }

    const listValues = form.getFieldValue(listName) || [];
    console.log(listValues);
    const hasEmptyField = listValues.some((entry) => {
      if (!entry || typeof entry !== "object") return true; // <-- Fix here

      return formFields.some((field) => {
        if (!field.required) return false;
        return !entry[field.name]; // safe now
      });
    });

    if (hasEmptyField) {
      message.error(
        "Please fill all required fields before adding a new entry."
      );
      return;
    }

    try {
      await form.validateFields();
      add(deder);
    } catch (error) {
      message.error("Please correct the errors before adding a new entry.");
    }
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values); // Send data to parent component
    } catch (error) {
      // message.error("Please correct the errors before submitting.");   // remove message for scroll to first error
    }
  };

  return (
    <div className=" w-full  ">
      {/* // overflow-x-hidden */}{" "}
      <Form
        form={form}
        scrollToFirstError
        style={{
          //overflowX: "hidden",
          boxSizing: "border-box",
        }}
        layout="vertical"
        autoComplete="off"
        // initialValues={{ [listName]: [{}] }}
        // initialValues={initialValues}
        onFinish={handleFormSubmit}
        onValuesChange={(changedValues, allValues) => {
          const list = allValues[listName] || [];
          const changedList = changedValues[listName];

          if (Array.isArray(changedList)) {
            const updatedIndex = changedList.findIndex(
              (item) => Object.keys(item || {}).length > 0
            );

            if (updatedIndex !== -1) {
              form.validateFields([[listName, updatedIndex]]);
            }
          }
        }}
      >
        <Form.List name={listName} initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <div className=" relative  mb-2">
              {fields.map(({ key, name, ...restField }) => (
                <Row gutter={[12, 16]} key={key}>
                  {formFields.map((field) => (
                    <Col
                      xs={24}
                      sm={field.sm || 6}
                      //  sm={field.type === "input" ? 12 : 6} // Increase span if it's a select field
                      key={field.name}
                    >
                      <Form.Item
                        shouldUpdate={(prevValues, currentValues) =>
                          prevValues !== currentValues
                        }
                        noStyle
                      >
                        {() => {
                          const currentList =
                            form.getFieldValue(listName) || [];
                          const currentItem = currentList[name] || {};

                          const isDisabled =
                            field.dependsOn && !currentItem[field.dependsOn];

                          return (
                            <Form.Item
                              {...restField}
                              name={[name, field.name]}
                              label={
                                <span
                                  className=" font-semibold"
                                  style={{ color: "orange" }}
                                >
                                  {field.label}
                                </span>
                              }
                              // rules={
                              //   field.required
                              //     ? [
                              //         {
                              //           required: true,
                              //           message: `Please enter ${field.label}`,
                              //         },
                              //       ]
                              //     : []
                              // }
                              rules={[
                                ({ getFieldValue }) => ({
                                  validator(_, value) {
                                    const list = getFieldValue(listName) || [];
                                    const item = list[name] || {};

                                    const hasAnyValue = Object.values(
                                      item
                                    ).some(
                                      (v) =>
                                        v !== undefined &&
                                        v !== null &&
                                        v !== ""
                                    );

                                    if (
                                      hasAnyValue &&
                                      (value === undefined ||
                                        value === null ||
                                        value === "")
                                    ) {
                                      enqueueSnackbar(
                                        `Please enter ${field.label}`,
                                        {
                                          variant: "warning",
                                        }
                                      );
                                      return Promise.reject(
                                        new Error(`Please enter ${field.label}`)
                                      );
                                    }
                                    return Promise.resolve();
                                  },
                                }),
                              ]}
                            >
                              {field.type === "input" && (
                                <Input
                                  className="custom-rounded"
                                  placeholder={`Enter ${field.label}`}
                                  disabled={isDisabled}
                                />
                              )}
                              {field.type === "number" && (
                                <InputNumber
                                  className="custom-rounded !shadow-lg"
                                  placeholder={`Enter ${field.label}`}
                                  disabled={isDisabled}
                                />
                              )}
                              {field.type === "select" && (
                                <Select
                                  className="custom-rounded"
                                  style={{
                                    borderRadius: "999px",
                                    width: "100%",
                                  }}
                                  placeholder={`Select ${field.label}`}
                                  onChange={(value) =>
                                    handleDependencyChange(
                                      listName,
                                      name,
                                      field.name,
                                      value
                                    )
                                  }
                                  disabled={isDisabled}
                                >
                                  {(
                                    optionsData[field.name]?.(
                                      currentItem[field.dependsOn]
                                    ) || []
                                  ).map((option) => (
                                    <Option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </Option>
                                  ))}
                                </Select>
                              )}
                              {field.type === "date" && (
                                <DatePicker
                                  className="custom-rounded  shadow-lg"
                                  disabled={isDisabled}
                                />
                              )}
                            </Form.Item>
                          );
                        }}
                      </Form.Item>
                    </Col>
                  ))}

                  <Col xs={24} sm={1}>
                    <div className=" flex  h-full items-center justify-end">
                      {" "}
                      {fields.length > 1 && (
                        <MinusCircleOutlined
                          style={{
                            fontSize: "28px",
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => remove(name)}
                        />
                      )}
                    </div>
                  </Col>
                </Row>
              ))}

              <div
                className="  absolute right-0 -bottom-10 sm:-bottom-2"
                type="text" // No default background or border
                onClick={() => validateAndAdd(add, fields, listName)}
              >
                <PlusCircleOutlined
                  style={{
                    fontSize: "28px",
                    color: "green",
                    cursor: "pointer",
                  }}
                  className=" text-xl"
                />
              </div>
            </div>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

export default ReusableFormList;
