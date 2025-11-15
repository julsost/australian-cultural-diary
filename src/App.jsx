import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import EntryView from "./components/EntryView";
import EditForm from "./components/EditForm";
import entriesData from "../content/entries.json";
import PhotoCarousel from "./components/PhotoCarousel";
import FloatingBubbles from "./components/FloatingBubbles"; // ✅ Correct import

export default function App() {
  const [entries, setEntries] = useState(entriesData);
  const [selected, setSelected] = useState(entries[0]?.id || null);
  const [editMode, setEditMode] = useState(false);

  // Load edit mode + entries
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEditMode(params.get("edit") === "true");

    const saved = localStorage.getItem("diary:entries");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEntries(parsed);
        if (!parsed.find((e) => e.id === selected)) {
          setSelected(parsed[0]?.id);
        }
      } catch (e) {
        console.error("Failed to parse saved entries", e);
      }
    }
  }, []);

  // Save entries when editing
  useEffect(() => {
    if (editMode) {
      localStorage.setItem("diary:entries", JSON.stringify(entries));
    }
  }, [entries, editMode]);

  const updateEntry = (id, patch) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...patch } : e))
    );
  };

  return (
    <>
      {/* 🌈 Bubbles ABOVE the app but NOT blocking clicks */}
      <FloatingBubbles />

      {/* ✨ Background Gradient Wrapper */}
      <div
        className="min-h-screen p-6 bg-cover bg-center bg-fixed"
        style={{
          background:
            "linear-gradient(to bottom right, #fff7ed, #fef3c7, #d1fae5)",
        }}
      >
        {/* 📝 Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
          <Header />

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left: Carousel */}
            <div className="col-span-1 lg:col-span-1">
              <Carousel
                entries={entries}
                selected={selected}
                onSelect={setSelected}
              />
            </div>

            {/* Right: Entry View or Editor */}
            <div className="col-span-1 lg:col-span-3">
              {editMode ? (
                <EditForm
                  entry={entries.find((e) => e.id === selected)}
                  updateEntry={updateEntry}
                />
              ) : (
                <EntryView entry={entries.find((e) => e.id === selected)} />
              )}
            </div>
          </div>
        </div>

        {/* 🖼️ Other Fun Memories */}
        <div className="mt-0 pt-0 text-center">
          <PhotoCarousel
            images={[
              "/australian-cultural-diary/images/beach1.jpg",
              "/australian-cultural-diary/images/sunset.jpg",
              "/australian-cultural-diary/images/kangaroo.jpg",
              "/australian-cultural-diary/images/friends.jpg",
              "/australian-cultural-diary/images/hike.jpg",
            ]}
          />
        </div>
      </div>
    </>
  );
}
