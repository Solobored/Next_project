import { lusitana } from "@/app/ui/fonts"
import { invoices, customers } from "@/app/lib/placeholder-data"

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div className="relative flex flex-1 flex-shrink-0">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Search invoices..."
          />
        </div>
        <button className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          <span className="hidden md:block">Create Invoice</span>
        </button>
      </div>
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {invoices?.map((invoice) => {
                const customer = customers.find((c) => c.id === invoice.customer_id)
                return (
                  <div key={invoice.customer_id + invoice.date} className="mb-2 w-full rounded-md bg-white p-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <p>{customer?.name}</p>
                        </div>
                        <p className="text-sm text-gray-500">{customer?.email}</p>
                      </div>
                      <p
                        className={`text-xl font-medium ${
                          invoice.status === "pending" ? "text-gray-500" : "text-green-500"
                        }`}
                      >
                        ${(invoice.amount / 100).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                      <div>
                        <p className="text-xl font-medium">${(invoice.amount / 100).toFixed(2)}</p>
                        <p>{invoice.date}</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                            invoice.status === "pending" ? "bg-gray-100 text-gray-500" : "bg-green-500 text-white"
                          }`}
                        >
                          {invoice.status === "pending" ? "Pending" : "Paid"}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Customer
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Amount
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {invoices?.map((invoice) => {
                  const customer = customers.find((c) => c.id === invoice.customer_id)
                  return (
                    <tr
                      key={invoice.customer_id + invoice.date}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                          <p>{customer?.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">{customer?.email}</td>
                      <td className="whitespace-nowrap px-3 py-3">${(invoice.amount / 100).toFixed(2)}</td>
                      <td className="whitespace-nowrap px-3 py-3">{invoice.date}</td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                            invoice.status === "pending" ? "bg-gray-100 text-gray-500" : "bg-green-500 text-white"
                          }`}
                        >
                          {invoice.status === "pending" ? "Pending" : "Paid"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <button className="rounded-md border p-2 hover:bg-gray-100">Edit</button>
                          <button className="rounded-md border p-2 hover:bg-gray-100">Delete</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
