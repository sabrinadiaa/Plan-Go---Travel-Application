import { useEffect, useState } from "react";
import { getDestinations } from "../services/destinationService";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import AppHeader from "../components/AppHeader";

function ExploreAll() {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const navigate = useNavigate();

  useEffect(() => {
    getDestinations()
      .then((response) => {
        setDestinations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const categories = [
    {
      label: "All",
      value: "ALL",
      icon: "🌍",
      match: ["ALL"],
    },
    {
      label: "Alam",
      value: "NATURE",
      icon: "🏝️",
      match: ["NATURE", "ALAM"],
    },
    {
      label: "Shopping",
      value: "SHOPPING",
      icon: "🛍️",
      match: ["SHOPPING"],
    },
    {
      label: "Club",
      value: "CLUB",
      icon: "🎵",
      match: ["CLUB"],
    },
    {
      label: "Cafe & Eatery",
      value: "CAFE",
      icon: "☕",
      match: ["CAFE", "CAFE_EATERY", "EATERY"],
    },
    {
      label: "Hotel",
      value: "HOTEL",
      icon: "🏨",
      match: ["HOTEL"],
    },
  ];

  const activeCategory = categories.find(
    (category) => category.value === selectedCategory
  );

  const filteredDestinations = destinations.filter((item) => {
    const destinationName = item.name?.toLowerCase() || "";
    const destinationLocation = item.location?.toLowerCase() || "";
    const destinationCategory = item.category?.toUpperCase() || "";

    const matchSearch =
      destinationName.includes(search.toLowerCase()) ||
      destinationLocation.includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "ALL" ||
      activeCategory?.match.includes(destinationCategory);

    return matchSearch && matchCategory;
  });

  return (
    <div className="page-container">
      <AppHeader />

      <input
        type="text"
        placeholder="Search destinations, hotels..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "24px",
          border: "none",
          outline: "none",
          background: "#D8D1C5",
          marginBottom: "16px",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          marginBottom: "18px",
          paddingBottom: "4px",
        }}
      >
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            style={{
              border: "none",
              background:
                selectedCategory === category.value ? "#4F7F5F" : "#E8E3DA",
              color: selectedCategory === category.value ? "white" : "#444",
              padding: "10px 16px",
              borderRadius: "20px",
              whiteSpace: "nowrap",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px",
            }}
          >
            {category.icon} {category.label}
          </button>
        ))}
      </div>

      <h2
        style={{
          margin: "0 0 14px 0",
          color: "#2E2E2E",
          fontSize: "20px",
        }}
      >
        {selectedCategory === "ALL"
          ? "All Destinations"
          : activeCategory?.label}
      </h2>

      {filteredDestinations.length === 0 ? (
        <p
          style={{
            color: "#777",
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          Belum ada destinasi untuk kategori ini.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            paddingBottom: "90px",
          }}
        >
          {filteredDestinations.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/destination/${item.id}`)}
              style={{
                background: "white",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                cursor: "pointer",
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "145px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "6px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "13px",
                      margin: 0,
                      color: "#2E2E2E",
                    }}
                  >
                    {item.name}
                  </h3>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: "#2E2E2E",
                    }}
                  >
                    Rp {item.price}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "11px",
                    margin: "6px 0 0 0",
                    color: "#777",
                  }}
                >
                  📍 {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
}

export default ExploreAll;