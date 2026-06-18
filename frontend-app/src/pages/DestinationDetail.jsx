import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDestinationById } from "../services/destinationService";
import { addDestinationToItinerary } from "../services/itineraryService";
import { getReviewsByDestination } from "../services/reviewService";

function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [visitDate, setVisitDate] = useState("2026-10-24");
  const dateInputRef = useRef(null);

  useEffect(() => {
    getDestinationById(id)
      .then((response) => {
        setDestination(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    getReviewsByDestination(id)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error(error);
        setReviews([]);
      });
  }, [id]);

  const handleAddToItinerary = () => {
    const itineraryId = 2;

    addDestinationToItinerary(itineraryId, destination.id)
      .then(() => {
        alert("Destination berhasil ditambahkan ke itinerary");
        navigate("/plan/detail");
      })
      .catch((error) => {
        console.error(error);
        alert("Gagal menambahkan destination");
      });
  };

  const handleShare = () => {
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: destination.name,
        text: destination.description,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link berhasil disalin");
    }
  };

  const openMaps = () => {
    const query = `${destination.name} ${destination.location}`;
    // Memperbaiki string literal menggunakan interpolasi `${}` yang benar
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
      "_blank"
    );
  };

  if (!destination) {
    return (
      <div className="page-container">
        <p>Loading...</p>
      </div>
    );
  }

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((total, review) => total + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "4.9";

  const reviewCount = reviews.length > 0 ? reviews.length : 1240;

  const nearbyHighlights = [
    {
      icon: "☕",
      title: "Cafe Nearby",
      description: "Close to local coffee spots",
    },
    {
      icon: "🏨",
      title: "Hotel Nearby",
      description: "Stay around this area",
    },
    {
      icon: "🍽️",
      title: "Eatery",
      description: "Traditional food nearby",
    },
    {
      icon: "🛍️",
      title: "Shopping",
      description: "Souvenir market around",
    },
  ];

  return (
    <div className="page-container">
      {/* Hero Image */}
      <div
        style={{
          position: "relative",
          height: "310px",
          overflow: "hidden",
        }}
      >
        <img
          src={destination.imageUrl}
          alt={destination.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Back Button */}
        <button
          onClick={() => navigate("/explore/all")}
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.9)",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ←
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.9)",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ↗
        </button>

        {/* Badge */}
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            right: "18px",
            background: "#D8F3DC",
            color: "#2E7D32",
            padding: "6px 12px",
            borderRadius: "18px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          ⭐ Top Rated
        </div>
      </div>

      {/* Main Card */}
      <div
        style={{
          background: "white",
          marginTop: "-24px",
          borderTopLeftRadius: "28px",
          borderTopRightRadius: "28px",
          padding: "22px",
          position: "relative",
          zIndex: 2,
          boxShadow: "0 -4px 18px rgba(0,0,0,0.08)",
        }}
      >
        {/* Title */}
        <h1
          style={{
            margin: "0 0 8px 0",
            color: "#2E2E2E",
            fontSize: "26px",
            lineHeight: "1.2",
          }}
        >
          {destination.name}
        </h1>

        {/* Rating */}
        <p
          style={{
            margin: "0 0 20px 0",
            color: "#777",
            fontSize: "13px",
          }}
        >
          <span style={{ color: "#4F7F5F", fontWeight: "bold" }}>
            ★ {averageRating}
          </span>{" "}
          ({reviewCount} reviews) • {destination.category || "Landmark"}
        </p>

        {/* Location */}
        <div
          style={{
            background: "#F6F3EE",
            borderRadius: "18px",
            padding: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "22px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "12px",
                background: "#D8F3DC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              📍
            </div>

            <p
              style={{
                margin: 0,
                color: "#2E2E2E",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              {destination.location}
            </p>
          </div>

          <button
            onClick={openMaps}
            style={{
              border: "1px solid #D8F3DC",
              background: "white",
              color: "#4F7F5F",
              padding: "8px 12px",
              borderRadius: "14px",
              fontSize: "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            View Map
          </button>
        </div>

        {/* About */}
        <h3
          style={{
            margin: "0 0 10px 0",
            color: "#2E2E2E",
            fontSize: "17px",
          }}
        >
          About this place
        </h3>

        <p
          style={{
            margin: 0,
            color: "#555",
            fontSize: "14px",
            lineHeight: "1.7",
          }}
        >
          {destination.description}
        </p>

        {/* Nearby Highlights */}
        <h3
          style={{
            margin: "24px 0 12px 0",
            color: "#2E2E2E",
            fontSize: "17px",
          }}
        >
          Nearby Highlights
        </h3>

        <div
          style={{
            display: "flex",
            gap: "12px",
            overflowX: "auto",
            paddingBottom: "8px",
            marginBottom: "20px",
          }}
        >
          {nearbyHighlights.map((item, index) => (
            <div
              key={index}
              style={{
                minWidth: "135px",
                background: "#D8F3DC",
                borderRadius: "18px",
                padding: "14px",
              }}
            >
              <div style={{ fontSize: "22px", marginBottom: "8px" }}>
                {item.icon}
              </div>

              <h4
                style={{
                  margin: "0 0 4px 0",
                  color: "#2E2E2E",
                  fontSize: "13px",
                }}
              >
                {item.title}
              </h4>

              <p
                style={{
                  margin: 0,
                  color: "#555",
                  fontSize: "11px",
                  lineHeight: "1.4",
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Entry Fee & Visit Date Card */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "18px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 4px 0",
                  color: "#777",
                  fontSize: "13px",
                }}
              >
                Entry Fee
              </p>

              <h2
                style={{
                  margin: 0,
                  color: "#4F7F5F",
                  fontSize: "24px",
                }}
              >
                Rp {Number(destination.price).toLocaleString("id-ID")}
              </h2>
            </div>

            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  margin: "0 0 4px 0",
                  color: "#777",
                  fontSize: "13px",
                }}
              >
                Per Person
              </p>

              <p
                style={{
                  margin: 0,
                  color: "#2E2E2E",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Incl. Taxes
              </p>
            </div>
          </div>

          {/* Date UI Section */}
          <div
            style={{
              borderTop: "1px solid #eee",
              paddingTop: "14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 4px 0",
                  color: "#777",
                  fontSize: "12px",
                }}
              >
                Visit Date
              </p>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold", color: "#2E2E2E" }}>
                {new Date(visitDate).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                })}
              </p>
            </div>

            {/* Tombol pemicu Kalender */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="date"
                ref={dateInputRef}
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: 0,
                  height: 0,
                  pointerEvents: "none",
                }}
              />
              
              <span
                onClick={() => dateInputRef.current.showPicker()}
                style={{
                  color: "#4F7F5F",
                  fontSize: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  background: "#EAF2EC",
                }}
              >
                Change Date
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Add Button */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "430px",
          background: "white",
          padding: "14px 20px",
          boxShadow: "0 -4px 16px rgba(0,0,0,0.08)",
          boxSizing: "border-box",
          zIndex: 10,
        }}
      >
        <button
          onClick={handleAddToItinerary}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "24px",
            background: "#4F7F5F",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ＋ Add to Itinerary
        </button>
      </div>
    </div>
  );
}

export default DestinationDetail;