// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.

export const statusOptions = {
  pending: "Pending",
  paid: "Paid",
}

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export const InvoiceForm = {
  id: "string",
  customer_id: "string",
  amount: "number",
  status: "pending | paid",
}

export const Invoice = {
  id: "string",
  customer_id: "string",
  amount: "number",
  date: "string",
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: "pending | paid",
}

export const Customer = {
  id: "string",
  name: "string",
  email: "string",
  image_url: "string",
}

export const CustomerField = {
  id: "string",
  name: "string",
}

export const InvoicesTable = {
  id: "string",
  customer_id: "string",
  name: "string",
  email: "string",
  image_url: "string",
  date: "string",
  amount: "number",
  status: "pending | paid",
}

export const CustomersTableType = {
  id: "string",
  name: "string",
  email: "string",
  image_url: "string",
  total_invoices: "number",
  total_pending: "number",
  total_paid: "number",
}

export const FormattedCustomersTable = {
  id: "string",
  name: "string",
  email: "string",
  image_url: "string",
  total_invoices: "number",
  total_pending: "string",
  total_paid: "string",
}
