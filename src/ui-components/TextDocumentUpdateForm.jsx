/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { fetchByPath, validateField } from "./utils";
import { API } from "aws-amplify";
import { getTextDocument } from "../graphql/queries";
import { updateTextDocument } from "../graphql/mutations";
export default function TextDocumentUpdateForm(props) {
  const {
    id: idProp,
    textDocument: textDocumentModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    fileName: "",
    s3Key: "",
  };
  const [fileName, setFileName] = React.useState(initialValues.fileName);
  const [s3Key, setS3Key] = React.useState(initialValues.s3Key);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = textDocumentRecord
      ? { ...initialValues, ...textDocumentRecord }
      : initialValues;
    setFileName(cleanValues.fileName);
    setS3Key(cleanValues.s3Key);
    setErrors({});
  };
  const [textDocumentRecord, setTextDocumentRecord] = React.useState(
    textDocumentModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getTextDocument,
              variables: { id: idProp },
            })
          )?.data?.getTextDocument
        : textDocumentModelProp;
      setTextDocumentRecord(record);
    };
    queryData();
  }, [idProp, textDocumentModelProp]);
  React.useEffect(resetStateValues, [textDocumentRecord]);
  const validations = {
    fileName: [{ type: "Required" }],
    s3Key: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          fileName,
          s3Key,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updateTextDocument,
            variables: {
              input: {
                id: textDocumentRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "TextDocumentUpdateForm")}
      {...rest}
    >
      <TextField
        label="File name"
        isRequired={true}
        isReadOnly={false}
        value={fileName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              fileName: value,
              s3Key,
            };
            const result = onChange(modelFields);
            value = result?.fileName ?? value;
          }
          if (errors.fileName?.hasError) {
            runValidationTasks("fileName", value);
          }
          setFileName(value);
        }}
        onBlur={() => runValidationTasks("fileName", fileName)}
        errorMessage={errors.fileName?.errorMessage}
        hasError={errors.fileName?.hasError}
        {...getOverrideProps(overrides, "fileName")}
      ></TextField>
      <TextField
        label="S3 key"
        isRequired={true}
        isReadOnly={false}
        value={s3Key}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              fileName,
              s3Key: value,
            };
            const result = onChange(modelFields);
            value = result?.s3Key ?? value;
          }
          if (errors.s3Key?.hasError) {
            runValidationTasks("s3Key", value);
          }
          setS3Key(value);
        }}
        onBlur={() => runValidationTasks("s3Key", s3Key)}
        errorMessage={errors.s3Key?.errorMessage}
        hasError={errors.s3Key?.hasError}
        {...getOverrideProps(overrides, "s3Key")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || textDocumentModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || textDocumentModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
