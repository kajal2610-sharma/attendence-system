"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Timetable = {
  id: string;
  subject: string;
  course: string;
  semester: string;
  section: string | null;
  day: string;
  startTime: string;
  endTime: string;
  room: string | null;
  teacher: {
    id: string;
    name: string | null;
  };
};

export default function TimetablePage() {
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTimetables();
  }, []);

  async function getTimetables() {
    try {
      const response = await fetch("/api/timetable");
      const data = await response.json();

      if (data.success) {
        setTimetables(data.timetables);
      }
    } catch (error) {
      console.error("GET TIMETABLE ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTimetable(id: string) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this timetable?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/timetable", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Timetable deleted successfully");

        setTimetables((current) =>
          current.filter((item) => item.id !== id)
        );
      } else {
        alert(data.message || "Failed to delete timetable");
      }
    } catch (error) {
      console.error("DELETE TIMETABLE ERROR:", error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Timetable Management
        </h1>

        <Link href="/admin/timetable/add">
          <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
            + Add Timetable
          </button>
        </Link>

      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow p-6">

        {loading ? (
          <p>Loading timetable...</p>
        ) : timetables.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No Timetable Found
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b bg-gray-50">

                  <th className="text-left p-3">Subject</th>
                  <th className="text-left p-3">Teacher</th>
                  <th className="text-left p-3">Course</th>
                  <th className="text-left p-3">Semester</th>
                  <th className="text-left p-3">Day</th>
                  <th className="text-left p-3">Time</th>
                  <th className="text-left p-3">Room</th>
                  <th className="text-left p-3">Action</th>

                </tr>
              </thead>

              <tbody>

                {timetables.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3 font-medium">
                      {item.subject}
                    </td>

                    <td className="p-3">
                      {item.teacher?.name || "-"}
                    </td>

                    <td className="p-3">
                      {item.course}
                    </td>

                    <td className="p-3">
                      {item.semester}
                    </td>

                    <td className="p-3">
                      {item.day}
                    </td>

                    <td className="p-3">
                      {item.startTime} - {item.endTime}
                    </td>

                    <td className="p-3">
                      {item.room || "-"}
                    </td>

                    <td className="p-3">

                      <div className="flex gap-2">

                        {/* EDIT */}
                        <Link
                          href={`/admin/timetable/edit?id=${item.id}`}
                        >
                          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            Edit
                          </button>
                        </Link>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            deleteTimetable(item.id)
                          }
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}