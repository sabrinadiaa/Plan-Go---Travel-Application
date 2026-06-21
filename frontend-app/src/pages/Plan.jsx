import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import AppHeader from "../components/AppHeader";
import {
  getUserItineraries,
  createItinerary,
} from "../services/itineraryService";

function Plan() {
  const navigate = useNavigate();

  const USER_ID = 1;

  const [currentItinerary, setCurrentItinerary] = useState(null);

  const [newTitle, setNewTitle] = useState("");
  const [newPeople, setNewPeople] = useState(1);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadCurrentItinerary();
  }, []);

  const loadCurrentItinerary = () => {
    getUserItineraries(USER_ID)
      .then((response) => {
        const data = response.data || [];
        const activeId = localStorage.getItem("activeItineraryId");

        if (activeId) {
          const found = data.find(
            (item) => String(item.id) === String(activeId)
          );

          if (found) {
            setCurrentItinerary(found);
            return;
          }
        }

        if (data.length > 0) {
          setCurrentItinerary(data[0]);
          localStorage.setItem("activeItineraryId", String(data[0].id));
        } else {
          setCurrentItinerary(null);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCreateNewPlan = async () => {
    if (!newTitle.trim()) {
      alert("Nama plan tidak boleh kosong");
      return;
    }

    try {
      setCreating(true);

      const response = await createItinerary(
        USER_ID,
        newTitle.trim(),
        Number(newPeople) || 1
      );

      const newItinerary = response.data;

      if (!newItinerary?.id) {
        alert("Backend belum mengembalikan id itinerary baru");
        return;
      }

      localStorage.setItem("activeItineraryId", String(newItinerary.id));

      setNewTitle("");
      setNewPeople(1);
      setCurrentItinerary(newItinerary);

      navigate(`/plan/detail/${newItinerary.id}`);
    } catch (error) {
      console.error(error);
      alert("Gagal membuat itinerary baru");
    } finally {
      setCreating(false);
    }
  };

  const handleViewCurrentItinerary = () => {
    const activeId =
      currentItinerary?.id || localStorage.getItem("activeItineraryId");

    if (!activeId) {
      alert("Belum ada itinerary. Buat plan baru terlebih dahulu.");
      return;
    }

    navigate(`/plan/detail/${activeId}`);
  };

  const handleStartExploring = (category) => {
    const activeId =
      currentItinerary?.id || localStorage.getItem("activeItineraryId");

    if (!activeId) {
      alert("Buat itinerary baru terlebih dahulu agar destinasi tidak masuk ke plan lama.");
      return;
    }

    localStorage.setItem("activeItineraryId", String(activeId));

    if (category) {
      navigate(`/explore/all?category=${category}`);
    } else {
      navigate("/explore/all");
    }
  };

  return (
    <div className="page-container">
      <AppHeader />

      {/* Current Itinerary */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(232,227,218,0.95), rgba(255,255,255,0.8))",
          borderRadius: "24px",
          padding: "22px",
          marginBottom: "22px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <span
          style={{
            background: "#F3E7B8",
            color: "#8A6A00",
            padding: "6px 12px",
            borderRadius: "16px",
            fontSize: "11px",
            fontWeight: "bold",
          }}
        >
          {currentItinerary ? "CURRENT ITINERARY" : "NO ITINERARY"}
        </span>

        <h1
          style={{
            margin: "12px 0 8px 0",
            fontSize: "34px",
            color: "#2E2E2E",
            lineHeight: "1.1",
          }}
        >
          {currentItinerary?.title || "Create New Plan"}
        </h1>

        <p style={{ color: "#777", margin: "0 0 6px 0" }}>
          👥 {currentItinerary?.totalPeople || 1} Traveler
        </p>

        <p style={{ color: "#777", margin: "0 0 6px 0" }}>
          📍 {currentItinerary?.items?.length || 0} Destination
        </p>

        <p
          onClick={handleViewCurrentItinerary}
          style={{
            color: "#4F7F5F",
            margin: 0,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ✎ Edit Details
        </p>
      </div>

      <button
        onClick={handleViewCurrentItinerary}
        style={{
          width: "100%",
          padding: "15px",
          border: "none",
          borderRadius: "24px",
          background: "#4F7F5F",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
          marginBottom: "22px",
          cursor: "pointer",
        }}
      >
        View Current Itinerary →
      </button>

      {/* Create New Plan */}
      <div
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "24px",
          marginBottom: "22px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ marginTop: 0, color: "#2E2E2E" }}>
          Buat Itinerary Baru
        </h2>

        <p
          style={{
            color: "#777",
            fontSize: "14px",
            lineHeight: "1.5",
            marginBottom: "18px",
          }}
        >
          Gunakan ini kalau ingin membuat plan baru agar itinerary ID berbeda
          dan tidak menimpa plan sebelumnya.
        </p>

        <input
          type="text"
          placeholder="Contoh: Trip Ngalam"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: "14px",
            border: "1px solid #DDD",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="number"
          min="1"
          value={newPeople}
          onChange={(e) => setNewPeople(e.target.value)}
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: "14px",
            border: "1px solid #DDD",
            marginBottom: "14px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleCreateNewPlan}
          disabled={creating}
          style={{
            width: "100%",
            border: "none",
            background: "#4F7F5F",
            color: "white",
            padding: "14px",
            borderRadius: "16px",
            fontWeight: "bold",
            cursor: creating ? "not-allowed" : "pointer",
            opacity: creating ? 0.7 : 1,
          }}
        >
          {creating ? "Membuat..." : "+ Buat Plan Baru"}
        </button>
      </div>

      {/* Add Destination */}
      <div
        onClick={() => handleStartExploring()}
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "28px",
          marginBottom: "22px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "16px",
            background: "#D8F3DC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            marginBottom: "28px",
          }}
        >
          🗺️
        </div>

        <h2 style={{ margin: "0 0 12px 0", color: "#2E2E2E" }}>
          Add Destination
        </h2>

        <p
          style={{
            color: "#666",
            lineHeight: "1.6",
            marginBottom: "24px",
          }}
        >
          Choose the cities, national parks, or hidden gems you want to explore
          on this journey.
        </p>

        <p style={{ color: "#4F7F5F", fontWeight: "bold", margin: 0 }}>
          Start exploring →
        </p>
      </div>

      {/* Add Hotel */}
      <div
        onClick={() => handleStartExploring("HOTEL")}
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "28px",
          marginBottom: "22px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "16px",
            background: "#FFF3CD",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            marginBottom: "28px",
          }}
        >
          🛏️
        </div>

        <h2 style={{ margin: "0 0 12px 0", color: "#2E2E2E" }}>
          Add Hotel
        </h2>

        <p
          style={{
            color: "#666",
            lineHeight: "1.6",
            marginBottom: "24px",
          }}
        >
          Find the perfect stay. From boutique eco-lodges to historic villas
          nestled in the hills.
        </p>

        <p style={{ color: "#8A6A00", fontWeight: "bold", margin: 0 }}>
          Search accommodation →
        </p>
      </div>

      {/* Add Club */}
      <div
        onClick={() => handleStartExploring("CLUB")}
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "28px",
          marginBottom: "120px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "58px",
            height: "58px",
            borderRadius: "16px",
            background: "#F6F3EE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
            marginBottom: "28px",
          }}
        >
          🎵
        </div>

        <h2 style={{ margin: "0 0 12px 0", color: "#2E2E2E" }}>
          Add Club
        </h2>

        <p
          style={{
            color: "#666",
            lineHeight: "1.6",
            marginBottom: "24px",
          }}
        >
          Find nightlife spots, beach clubs, and entertainment places for your
          trip.
        </p>

        <p style={{ color: "#8A6A00", fontWeight: "bold", margin: 0 }}>
          Search entertainment →
        </p>
      </div>

      <BottomNav />
    </div>
  );
}

export default Plan;