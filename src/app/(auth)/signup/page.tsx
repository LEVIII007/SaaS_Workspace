import React from "react";
import {z} from 'zod'

const SignUpFormSchema = z
  .object({
    email: z.string().describe('Email').email({ message: 'Invalid Email' }),
    password: z
      .string()
      .describe('Password')
      .min(6, 'Password must be minimum 6 characters'),
    confirmPassword: z
      .string()
      .describe('Confirm Password')
      .min(6, 'Password must be minimum 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

//   Adds a custom validation rule to the schema.
//   (data) => data.password === data.confirmPassword:
  
//   This is the custom validation function.
//   It checks if the password and confirmPassword fields match.
//   { message: "Passwords don't match.", path: ['confirmPassword'] }:
  
//   If the validation fails (i.e., the passwords do not match), the error message "Passwords don't match." will be shown.
//   The error will be associated with the confirmPassword field.
  
