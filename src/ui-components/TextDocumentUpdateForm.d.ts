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
export declare type TextDocumentUpdateFormInputValues = {
    fileName?: string;
    s3Key?: string;
    prompt?: string;
    ownerEmail?: string;
};
export declare type TextDocumentUpdateFormValidationValues = {
    fileName?: ValidationFunction<string>;
    s3Key?: ValidationFunction<string>;
    prompt?: ValidationFunction<string>;
    ownerEmail?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TextDocumentUpdateFormOverridesProps = {
    TextDocumentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    fileName?: PrimitiveOverrideProps<TextFieldProps>;
    s3Key?: PrimitiveOverrideProps<TextFieldProps>;
    prompt?: PrimitiveOverrideProps<TextFieldProps>;
    ownerEmail?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TextDocumentUpdateFormProps = React.PropsWithChildren<{
    overrides?: TextDocumentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    textDocument?: any;
    onSubmit?: (fields: TextDocumentUpdateFormInputValues) => TextDocumentUpdateFormInputValues;
    onSuccess?: (fields: TextDocumentUpdateFormInputValues) => void;
    onError?: (fields: TextDocumentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TextDocumentUpdateFormInputValues) => TextDocumentUpdateFormInputValues;
    onValidate?: TextDocumentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TextDocumentUpdateForm(props: TextDocumentUpdateFormProps): React.ReactElement;
