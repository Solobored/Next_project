import { lusitana } from "@/app/ui/fonts"
import { customers, invoices } from "@/app/lib/placeholder-data"

export default function Page() {
  // Calculate customer stats
  const customersWithStats = customers.map((customer) => {
    const customerInvoices = invoices.filter((invoice) => invoice.customer_id === customer.id)
    const totalInvoices = customerInvoices.length
    const totalPending = customerInvoices
      .filter((invoice) => invoice.status === "pending")
      .reduce((sum, invoice) => sum + invoice.amount, 0)
    const totalPaid = customerInvoices
      .filter((invoice) => invoice.status === "paid")
      .reduce((sum, invoice) => sum + invoice.amount, 0)

    return {
      ...customer,
      total_invoices: totalInvoices,
      total_pending: totalPending,
      total_paid: totalPaid,
    }
  })

  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>Customers</h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div className="relative flex flex-1 flex-shrink-0">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Search customers..."
          />
        </div>
      </div>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {customersWithStats?.map((customer) => (
                  <div key={customer.id} className="mb-2 w-full rounded-md bg-white p-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                            <p>{customer.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Pending</p>
                        <p className="font-medium">${(customer.total_pending / 100).toFixed(2)}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Paid</p>
                        <p className="font-medium">${(customer.total_paid / 100).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{customer.total_invoices} invoices</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Invoices
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Total Pending
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Total Paid
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {customersWithStats.map((customer) => (
                    <tr key={customer.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                          <p>{customer.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">{customer.email}</td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">{customer.total_invoices}</td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        ${(customer.total_pending / 100).toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        ${(customer.total_paid / 100).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
