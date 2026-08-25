"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Teacher = {
  id: string;
  name: string | null;
};

function EditTimetableForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    subject: "",
    course: "",
    semester: "",
    section: "",
    day: "",
    startTime: "",
    endTime: "",
    room: "",
    teacherId: "",
  });

  useEffect(() => {
    if (id) {
      getTimetable();
      getTeachers();
    }
  }, [id]);

  async function getTimetable() {
    try {
      const response = await fetch(
        `/api/timetable/${id}`
      );

      const data = await response.json();

      if (data.success) {
        const timetable = data.timetable;

        setFormData({
          subject: timetable.subject || "",
          course: timetable.course || "",
          semester: timetable.semester || "",
          section: timetable.section || "",
          day: timetable.day || "",
          startTime: timetable.startTime || "",
          endTime: timetable.endTime || "",
          room: timetable.room || "",
          teacherId: timetable.teacherId || "",
        });
      } else {
        setMessage(
          data.message || "Timetable not found"
        );
      }
    } catch (error) {
      console.error(
        "GET TIMETABLE ERROR:",
        error
      );

      setMessage("Failed to load timetable");
    }
  }

  async function getTeachers() {
    try {
      const response = await fetch(
        "/api/teachers"
      );

      const data = await response.json();

      if (data.success) {
        setTeachers(data.teachers);
      }
    } catch (error) {
      console.error(
        "GET TEACHERS ERROR:",
        error
      );
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!id) {
      setMessage("Timetable ID is missing");
      return;
    }

    setMessage("Updating...");

    try {
      const response = await fetch(
        `/api/timetable/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessage(
          "Timetable updated successfully!"
        );

        setTimeout(() => {
          router.push("/admin/timetable");
        }, 1000);
      } else {
        setMessage(
          data.message ||
            "Failed to update timetable"
        );
      }
    } catch (error) {
      console.error(
        "UPDATE TIMETABLE ERROR:",
        error
      );

      setMessage("Something went wrong");
    }
  }

  if (!id) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">
          Timetable ID not found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Edit Timetable
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-2xl"
      >

        {/* Subject */}

        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full border p-3 rounded mb-4"
          required
        />

        {/* Teacher */}

        <select
          name="teacherId"
          value={formData.teacherId}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        >
          <option value="">
            Select Teacher
          </option>

          {teachers.map((teacher) => (
            <option
              key={teacher.id}
              value={teacher.id}
            >
              {teacher.name ||
                "Unnamed Teacher"}
            </option>
          ))}
        </select>

        {/* Course */}

        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Course"
          className="w-full border p-3 rounded mb-4"
          required
        />

        {/* Semester */}

        <select
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        >
          <option value="">
            Select Semester
          </option>

          <option value="1">
            1st Semester
          </option>

          <option value="2">
            2nd Semester
          </option>

          <option value="3">
            3rd Semester
          </option>

          <option value="4">
            4th Semester
          </option>

          <option value="5">
            5th Semester
          </option>

          <option value="6">
            6th Semester
          </option>
        </select>

        {/* Section */}

        <input
          type="text"
          name="section"
          value={formData.section}
          onChange={handleChange}
          placeholder="Section"
          className="w-full border p-3 rounded mb-4"
        />

        {/* Day */}

        <select
          name="day"
          value={formData.day}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        >
          <option value="">
            Select Day
          </option>

          <option value="Monday">
            Monday
          </option>

          <option value="Tuesday">
            Tuesday
          </option>

          <option value="Wednesday">
            Wednesday
          </option>

          <option value="Thursday">
            Thursday
          </option>

          <option value="Friday">
            Friday
          </option>

          <option value="Saturday">
            Saturday
          </option>
        </select>

        {/* Start Time */}

        <label className="block mb-2 font-medium">
          Start Time
        </label>

        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />

        {/* End Time */}

        <label className="block mb-2 font-medium">
          End Time
        </label>

        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />

        {/* Room */}

        <input
          type="text"
          name="room"
          value={formData.room}
          onChange={handleChange}
          placeholder="Room Number"
          className="w-full border p-3 rounded mb-6"
        />

        {/* Update Button */}

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Update Timetable
        </button>

        {/* Message */}

        {message && (
          <p className="mt-4 font-semibold">
            {message}
          </p>
        )}

      </form>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <p>Loading edit timetable page...</p>
    </div>
  );
}

export default function EditTimetablePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <EditTimetableForm />
    </Suspense>
  );
}