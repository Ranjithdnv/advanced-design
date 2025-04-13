import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Input, Select, DatePicker, Button } from "antd";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";

const { Option } = Select;

const ReusableFormListH = ({
  formFields,
  optionsData,
  onSubmit,
  listName = "items",
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      [listName]: [{}],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: listName,
  });

  const watchFields = watch(listName);

  const handleDependencyChange = (index, fieldName, value) => {
    // example: clear 'suggestedDoctor' when 'surgeryType' changes
    if (fieldName === "surgeryType") {
      setValue(`${listName}.${index}.suggestedDoctor`, undefined);
    }
  };

  useEffect(() => {
    watchFields.forEach((item, index) => {
      formFields.forEach((field) => {
        if (field.dependsOn && !item[field.dependsOn]) {
          setValue(`${listName}.${index}.${field.name}`, undefined);
        }
      });
    });
  }, [watchFields]);

  const isMeaningfulValue = (value) =>
    value !== null &&
    value !== undefined &&
    value !== "" &&
    value !== "undefined";

  const validateAndAdd = async () => {
    const currentValues = getValues()[listName];
    const lastEntry = currentValues?.[currentValues.length - 1];

    if (
      !lastEntry ||
      Object.values(lastEntry).some((val) => !isMeaningfulValue(val))
    ) {
      enqueueSnackbar(
        "Please fill all required fields before adding new entry.",
        {
          variant: "warning",
        }
      );
      return;
    }

    const valid = await trigger(); // full validation
    if (!valid) return;

    append({});
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      {fields.map((item, index) => (
        <div key={item.id} className="mb-4 border p-3 rounded-lg shadow">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {formFields.map((field) => (
              <Controller
                key={field.name}
                name={`${listName}.${index}.${field.name}`}
                control={control}
                rules={{
                  validate: (value) => {
                    const row = watchFields[index];
                    const hasAny = Object.values(row || {}).some(
                      isMeaningfulValue
                    );
                    if (hasAny && !isMeaningfulValue(value)) {
                      return `Please enter ${field.label}`;
                    }
                    return true;
                  },
                }}
                render={({ field: controllerField }) => {
                  const isDisabled =
                    field.dependsOn && !watchFields?.[index]?.[field.dependsOn];

                  return (
                    <div>
                      <label className="font-semibold text-orange-500">
                        {field.label}
                      </label>
                      {field.type === "input" && (
                        <Input
                          {...controllerField}
                          disabled={isDisabled}
                          placeholder={`Enter ${field.label}`}
                        />
                      )}
                      {field.type === "number" && (
                        <Input
                          {...controllerField}
                          type="number"
                          disabled={isDisabled}
                          placeholder={`Enter ${field.label}`}
                        />
                      )}
                      {field.type === "select" && (
                        <Select
                          {...controllerField}
                          disabled={isDisabled}
                          placeholder={`Select ${field.label}`}
                          onChange={(value) => {
                            controllerField.onChange(value);
                            handleDependencyChange(index, field.name, value);
                          }}
                          style={{ width: "100%" }}
                        >
                          {(
                            optionsData[field.name]?.(
                              watchFields?.[index]?.[field.dependsOn]
                            ) || []
                          ).map((opt) => (
                            <Option key={opt.value} value={opt.value}>
                              {opt.label}
                            </Option>
                          ))}
                        </Select>
                      )}
                      {field.type === "date" && (
                        <DatePicker
                          {...controllerField}
                          style={{ width: "100%" }}
                          disabled={isDisabled}
                          onChange={(date) => controllerField.onChange(date)}
                          value={
                            controllerField.value
                              ? dayjs(controllerField.value)
                              : null
                          }
                        />
                      )}
                      {errors?.[listName]?.[index]?.[field.name] && (
                        <p className="text-red-500 text-xs">
                          {errors[listName][index][field.name]?.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              />
            ))}

            <div className="flex items-end justify-end">
              {fields.length > 1 && (
                <MinusCircleOutlined
                  onClick={() => remove(index)}
                  style={{ fontSize: 24, color: "red", cursor: "pointer" }}
                />
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <PlusCircleOutlined
          onClick={validateAndAdd}
          style={{ fontSize: 28, color: "green", cursor: "pointer" }}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ReusableFormListH;
