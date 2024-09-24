import { z } from "zod";

export const  registerValidSchema=z.object({
    name:z.string().min(1,"Enter your funnName"),
    email:z.string().email('Valid Email is required !'),
    contactNumber:z.string().regex(/^\d{11}$/,"Contant number must be 11 digits"),
    address:z.string().min(1,"Enter your address"),
  });
export const  patientRegisterValidationSchema=z.object({
    password:z.string().min(6,"Password must be at least 6 characters"),
    patient: registerValidSchema
  
  });


  // Nested Validation Schema
  // {
//   "password": "123456",
//   "patient": {
//     "email": "patient111@gmail.com",
//     "name": "Md. Fahim",
//     "contactNumber": "01111111111",
//     "address": "Dhaka, BD"
//   }
// }

