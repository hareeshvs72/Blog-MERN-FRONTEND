import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { getAllBlogsAdminAPI } from "../../service/allAPI";

function Dashbord() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    handileAllBlogs();
  }, []);

  const handileAllBlogs = async () => {
    const token = sessionStorage.getItem("token");
    const reqHeader = { Authorization: `Bearer ${token}` };

    const result = await getAllBlogsAdminAPI(reqHeader);
    if (result.status === 200) {
      setBlogs(result.data);
    }
  };

  // Count categories
  const categoryCounts = blogs.reduce((acc, blog) => {
    const cat = blog.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(categoryCounts).map(([key, value]) => ({
    name: key,
    value,
  }));

  const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#14B8A6"];

  return (
    <>
      <AdminHeader />

      <div className="md:grid grid-cols-5 bg-green-100 min-h-screen">
        
        {/* SIDEBAR */}
        <div className="col-span-1 bg-white">
          <AdminSidebar />
        </div>

        {/* MAIN CONTENT */}
        <div className="col-span-4 p-8">

          <h1 className="text-4xl text-green-600 font-bold mb-6 text-center">
            Blog Analytics Dashboard
          </h1>

          <div className="grid md:grid-cols-2 gap-8">

            {/* PIE CHART */}
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-3 text-green-700">Category Distribution</h2>

              <PieChart width={350} height={300}>
                <Pie
                  data={chartData}
                  cx={170}
                  cy={130}
                  innerRadius={50}
                  outerRadius={100}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>

            {/* BAR CHART */}
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-3 text-green-700">Category Comparison</h2>

              <BarChart width={400} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#10B981" />
              </BarChart>
            </div>
          </div>

          {/* SIMPLE LIST */}
          <div className="bg-white rounded-xl shadow p-6 mt-10">
            <h2 className="text-xl font-semibold mb-4 text-green-700">Blog Count by Category</h2>

            {chartData.length === 0 ? (
              <p className="text-gray-700">No blogs yet...</p>
            ) : (
              <div>
                {chartData.map((item) => (
                  <div key={item.name} className="flex justify-between border-b py-2 text-lg">
                    <span className="font-semibold text-gray-800">{item.name}</span>
                    <span className="font-bold text-green-600">{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashbord;
