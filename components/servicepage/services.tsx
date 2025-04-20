"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Search } from "lucide-react";

const dummyServices = [
  {
    id: 1,
    title: "Business Consulting",
    summary:
      "Fully digital loan management process. Highly customizable credit platform. Service monitoring and reporting portals. Integration with any external platform. 24/7 support and maintenance service.",
    image: "/images/sample.jpg",
    status: "published",
  },
  {
    id: 2,
    title: "Financial Advisory",
    summary:
      "Get tailored financial advice to boost your business and long-term sustainability.",
    image: "/images/sample.jpg",
    status: "draft",
  },
  {
    id: 3,
    title: "Tech Integration",
    summary:
      "We help integrate modern systems with your business infrastructure for seamless operation.",
    image: "/images/sample.jpg",
    status: "published",
  },
  {
    id: 4,
    title: "Market Analysis",
    summary:
      "Detailed market reports and real-time insights to drive your strategy.",
    image: "/images/sample.jpg",
    status: "published",
  },
];

const ServiceItem = ({ service }: { service: (typeof dummyServices)[0] }) => (
  <div className="flex gap-4 py-4">
    {/* Left: Image */}
    <div className="w-[120px] h-[100px] overflow-hidden rounded-lg">
      <img
        src={service.image}
        alt={service.title}
        className="object-cover w-full h-full rounded-lg"
      />
    </div>

    {/* Middle: Text */}
    <div className="flex-1">
      <h3 className="font-semibold">{service.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3 mt-1">
        {service.summary}
      </p>
      <span className="text-orange-500 text-sm cursor-pointer">
        ...Read more
      </span>
    </div>

    {/* Right: Actions */}
    <div className="flex flex-col items-end justify-between">
      <div className="flex gap-2">
        <button
          className="flex text-xs items-center space-x-3 px-2 py-2 bg-white border-[1px] border-orange-200 hover:bg-secondary text-gray-800 hover:text-white rounded-lg cursor-pointer"
        >
          <Pencil className="w-3 h-3 mr-1" />
          Edit
        </button>
        <button
          className="flex text-xs items-center space-x-3 px-2 py-2 bg-white border-[1px] border-orange-200 hover:bg-red-700 text-gray-800 hover:text-white rounded-lg cursor-pointer"
        >
          <Trash2 className="w-3 h-3 mr-1" />
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default function ServicesTab() {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Optional: Handle search submit logic
    console.log("Search:", search);
  };

  const filteredServices = dummyServices.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase())
  );

  const published = filteredServices.filter((s) => s.status === "published");
  const draft = filteredServices.filter((s) => s.status === "draft");

  return (
    <div className="max-w-5xl mx-auto py-8 px-6">
      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="published" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <TabsList>
              <TabsTrigger value="published" className="data-[state=active]:text-secondary cursor-pointer">
                All Published ({published.length})
              </TabsTrigger>
              <TabsTrigger value="draft" className="data-[state=active]:text-secondary cursor-pointer">Drafts ({draft.length})</TabsTrigger>
            </TabsList>

            <form
              onSubmit={handleSearch}
              className="relative w-full md:w-[300px]"
            >
              <Input
                placeholder="Search services..."
                className="pl-10 pr-4 h-10 w-full rounded-md border border-gray-300"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <button type="submit" className="sr-only">
                Search
              </button>
            </form>
          </div>

          {/* Published Tab */}
          <TabsContent value="published" className="mt-6">
            {published.length > 0 ? (
              published.map((service) => (
                <div key={service.id}>
                  <ServiceItem service={service} />
                  <hr className="my-4 border-gray-200" />
                </div>
              ))
            ) : (
              <p>No published services found.</p>
            )}
          </TabsContent>

          {/* Draft Tab */}
          <TabsContent value="draft" className="mt-6">
            {draft.length > 0 ? (
              draft.map((service) => (
                <div key={service.id}>
                  <ServiceItem service={service} />
                  <hr className="my-4 border-gray-200" />
                </div>
              ))
            ) : (
              <p>No draft services found.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
