"use client";

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
    name: string | null;
  };
};

export default function StudentTimetablePage() {
  const [timetables, setTimetables] = useState<Timetable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimetable();
  }, []);

  async function loadTimetable() {
    try {
      const response = await fetch("/api/timetable");
      const data = await response.json();

      if (data.success) {
        setTimetables(data.timetables);
      }
    } catch (error) {
      console.error("TIMETABLE ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">

      <h1 className="text-4xl font-bold mb-8">
        My Timetable
      </h1>

      <div className="bg-white rounded-lg shadow p-6">

        {loading ? (
          <p>Loading timetable...</p>
        ) : timetables.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No timetable available
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b bg-gray-50">

                  <th className="text-left p-3">
                    Day
                  </th>

                  <th className="text-left p-3">
                    Time
                  </th>

                  <th className="text-left p-3">
                    Subject
                  </th>

                  <th className="text-left p-3">
                    Teacher
                  </th>

                  <th className="text-left p-3">
                    Course
                  </th>

                  <th className="text-left p-3">
                    Semester
                  </th>

                  <th className="text-left p-3">
                    Section
                  </th>

                  <th className="text-left p-3">
                    Room
                  </th>

                </tr>
              </thead>

              <tbody>

                {timetables.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {item.day}
                    </td>

                    <td className="p-3">
                      {item.startTime} - {item.endTime}
                    </td>

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
                      {item.section || "-"}
                    </td>

                    <td className="p-3">
                      {item.room || "-"}
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
