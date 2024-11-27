'use client'


export default function Dashboard() {
  return (
    <div className="min-h-screen p-8">
      <div className=" mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        
        {/* Add your dashboard content here */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to the Dashboard</h2>
          {/* Add more dashboard components here */}
        </div>
      </div>
    </div>
  )
}