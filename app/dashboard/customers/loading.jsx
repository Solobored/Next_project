export default function Loading() {
  return (
    <div className="w-full">
      <div className="mb-8 h-8 w-36 rounded-md bg-gray-100"></div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div className="h-10 w-full rounded-md bg-gray-100"></div>
      </div>
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="h-96 w-full rounded-md bg-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
