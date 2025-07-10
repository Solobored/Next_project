import { lusitana } from "@/app/ui/fonts"

export default function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col">
            <p className="text-sm font-medium">Collected</p>
            <p className="text-2xl font-semibold">$15,795.00</p>
          </div>
        </div>
        <div className="flex p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col">
            <p className="text-sm font-medium">Pending</p>
            <p className="text-2xl font-semibold">$12,345.00</p>
          </div>
        </div>
        <div className="flex p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col">
            <p className="text-sm font-medium">Total Invoices</p>
            <p className="text-2xl font-semibold">12</p>
          </div>
        </div>
        <div className="flex p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col">
            <p className="text-sm font-medium">Total Customers</p>
            <p className="text-2xl font-semibold">6</p>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <div className="md:col-span-4 lg:col-span-5">
          <div className="rounded-xl bg-gray-50 p-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Recent Revenue</h2>
            <div className="h-64 bg-white rounded-md flex items-center justify-center">
              <p className="text-gray-500">Revenue chart would go here</p>
            </div>
          </div>
        </div>
        <div className="md:col-span-4 lg:col-span-3">
          <div className="rounded-xl bg-gray-50 p-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Latest Invoices</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white rounded">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium">Evil Rabbit</p>
                    <p className="text-xs text-gray-500">evil@rabbit.com</p>
                  </div>
                </div>
                <p className="text-sm font-medium">$666.00</p>
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="text-sm font-medium">Delba de Oliveira</p>
                    <p className="text-xs text-gray-500">delba@oliveira.com</p>
                  </div>
                </div>
                <p className="text-sm font-medium">$203.48</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
