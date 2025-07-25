import postgres from "postgres"
import bcryptjs from "bcryptjs" // Changed from bcrypt to bcryptjs
import { invoices, customers, users, revenue } from "../lib/placeholder-data"

// Force this page to be dynamic (not static)
export const dynamic = "force-dynamic"

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" })

async function seedUsers() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    // Create the "users" table if it doesn't exist
    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `

    console.log(`Created "users" table`)

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcryptjs.hash(user.password, 10)
        return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `
      }),
    )

    console.log(`Seeded ${insertedUsers.length} users`)

    return {
      createTable,
      users: insertedUsers,
    }
  } catch (error) {
    console.error("Error seeding users:", error)
    throw error
  }
}

async function seedInvoices() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    // Create the "invoices" table if it doesn't exist
    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`

    console.log(`Created "invoices" table`)

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    )

    console.log(`Seeded ${insertedInvoices.length} invoices`)

    return {
      createTable,
      invoices: insertedInvoices,
    }
  } catch (error) {
    console.error("Error seeding invoices:", error)
    throw error
  }
}

async function seedCustomers() {
  try {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    // Create the "customers" table if it doesn't exist
    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `

    console.log(`Created "customers" table`)

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    )

    console.log(`Seeded ${insertedCustomers.length} customers`)

    return {
      createTable,
      customers: insertedCustomers,
    }
  } catch (error) {
    console.error("Error seeding customers:", error)
    throw error
  }
}

async function seedRevenue() {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `

    console.log(`Created "revenue" table`)

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    )

    console.log(`Seeded ${insertedRevenue.length} revenue`)

    return {
      createTable,
      revenue: insertedRevenue,
    }
  } catch (error) {
    console.error("Error seeding revenue:", error)
    throw error
  }
}

export default async function Page() {
  try {
    await seedUsers()
    await seedCustomers()
    await seedInvoices()
    await seedRevenue()

    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-green-50 p-8 text-center">
          <h1 className="text-2xl font-bold text-green-800 mb-4">Database Seeded Successfully!</h1>
          <p className="text-green-600">All tables have been created and populated with initial data.</p>
          <a href="/dashboard" className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Go to Dashboard
          </a>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-red-50 p-8 text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-4">Seeding Failed</h1>
          <p className="text-red-600">Error: {error.message}</p>
        </div>
      </div>
    )
  }
}
