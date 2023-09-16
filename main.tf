# terraform apply -var-file credentials.tfvars
provider "aws" {
  region = "us-west-2"
  access_key = var.hidden_access_key
  secret_key = var.hidden_secret_key
}

variable "hidden_access_key"{
	description = "Access Key" # Optional
	type = any # (string, boolean, etc)
}

variable "hidden_secret_key"{
	description = "Secret Key" # Optional
	type = any # (string, boolean, etc)
}

resource "aws_lambda_function" "s3_trigger_lambda" {
  filename      = "lambda_function.zip"
  function_name = "s3TriggerLambda"
  role          = aws_iam_role.lambda_role.arn
  handler       = "lambda_function.lambda_handler"
  runtime       = "python3.9"

  source_code_hash = filebase64sha256("lambda_function.zip")

  environment {
    variables = {
      GRAPHQL_ENDPOINT = "https://5725wbr2b5hf7cly6gy5b4vnba.appsync-api.us-west-2.amazonaws.com/graphql",
    }
  }

  timeout = 10
}

resource "aws_iam_role" "lambda_role" {
  name = "s3_trigger_lambda_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com",
        },
      },
    ],
  })
}

resource "aws_iam_policy" "lambda_policy" {
  name        = "s3_trigger_lambda_policy"
  description = "Policy for the Lambda function"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ],
        Effect   = "Allow",
        Resource = "*",
      },
      {
        Action   = "s3:GetObject",
        Effect   = "Allow", 
        Resource = ["arn:aws:s3:::transferlearnappdocumentstorage195302-staging/public/documents/*",
                "arn:aws:s3:::transferlearnappdocumentstorage195302-staging/public/*"]

      },
      {
        Action   = "s3:DeleteObject",
        Effect   = "Allow",
        Resource = "arn:aws:s3:::transferlearnappdocumentstorage195302-staging/public/documents/*",
      },
    ],
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
  policy_arn = aws_iam_policy.lambda_policy.arn
  role       = aws_iam_role.lambda_role.name
}

output "lambda_function_arn" {
  value = aws_lambda_function.s3_trigger_lambda.arn
}