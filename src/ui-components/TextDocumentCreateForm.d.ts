/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TextDocumentCreateFormInputValues = {
    fileName?: string;
    s3Key?: string;
    prompt?: string;
    ownerEmail?: string;
};
export declare type TextDocumentCreateFormValidationValues = {
    fileName?: ValidationFunction<string>;
    s3Key?: ValidationFunction<string>;
    prompt?: ValidationFunction<string>;
    ownerEmail?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TextDocumentCreateFormOverridesProps = {
    TextDocumentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    fileName?: PrimitiveOverrideProps<TextFieldProps>;
    s3Key?: PrimitiveOverrideProps<TextFieldProps>;
    prompt?: PrimitiveOverrideProps<TextFieldProps>;
    ownerEmail?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TextDocumentCreateFormProps = React.PropsWithChildren<{
    overrides?: TextDocumentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TextDocumentCreateFormInputValues) => TextDocumentCreateFormInputValues;
    onSuccess?: (fields: TextDocumentCreateFormInputValues) => void;
    onError?: (fields: TextDocumentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TextDocumentCreateFormInputValues) => TextDocumentCreateFormInputValues;
    onValidate?: TextDocumentCreateFormValidationValues;
} & React.CSSProperties>;
export default function TextDocumentCreateForm(props: TextDocumentCreateFormProps): React.ReactElement;
