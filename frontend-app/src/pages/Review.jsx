import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";
import { getDestinationById } from "../services/destinationService";
import { createReview } from "../services/reviewService";

function Review() {
  const navigate = useNavigate();
  const { destinationId } = useParams();

  const USER_ID = 1;

  const [destination, setDestination] = useState(null);
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!destinationId) return;

    getDestinationById(destinationId)
      .then((response) => {
        setDestination(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [destinationId]);

  const handleSubmitReview = () => {
    if (!rating) {
      alert("Pilih rating terlebih dahulu");
      return;
    }

    if (!comment.trim()) {
      alert("Tulis pengalaman kamu terlebih dahulu");
      return;
    }

    setLoading(true);

    createReview(USER_ID, Number(destinationId), rating, comment)
      .then(() => {
        alert("Review berhasil dikirim");
        navigate("/booking");
      })
      .catch((error) => {
        console.error(error);
        alert("Gagal mengirim review");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleMaybeLater = () => {
    navigate("/booking");
  };

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        minHeight: "100vh",
        background: "#F6F3EE",
        paddingBottom: "95px",
        boxSizing: "border-box",
      }}
    >
      <AppHeader />

      <div
        style={{
          padding: "28px 22px 0 22px",
        }}
      >
        {/* Trip Completed Card */}
        <div
          style={{
            height: "220px",
            borderRadius: "24px",
            overflow: "hidden",
            position: "relative",
            marginBottom: "24px",
            background:
              "linear-gradient(135deg, #F8DFA7 0%, #D9854E 45%, #6B351C 100%)",
            boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
          }}
        >
          {destination?.imageUrl && (
            <img
              src={destination.imageUrl}
              alt={destination.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.45,
              }}
            />
          )}

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.45))",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "22px",
              bottom: "22px",
              color: "white",
            }}
          >
            <p
              style={{
                margin: "0 0 8px 0",
                fontSize: "11px",
                letterSpacing: "1.5px",
                fontWeight: "700",
                opacity: 0.9,
              }}
            >
              TRIP COMPLETED
            </p>

            <h1
              style={{
                margin: "0 0 4px 0",
                fontSize: "28px",
                lineHeight: "1.05",
                fontWeight: "800",
              }}
            >
              {destination?.name || "Amalfi Coast"}
              <br />
              Expedition
            </h1>

            <p
              style={{
                margin: 0,
                fontSize: "12px",
                opacity: 0.9,
              }}
            >
              Oct 12 — Oct 19, 2023
            </p>
          </div>
        </div>

        {/* Review Card */}
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "26px 22px",
            boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              margin: "0 0 8px 0",
              textAlign: "center",
              color: "#2E2E2E",
              fontSize: "24px",
              fontWeight: "800",
            }}
          >
            How was your trip?
          </h2>

          <p
            style={{
              margin: "0 auto 28px auto",
              textAlign: "center",
              color: "#777",
              fontSize: "13px",
              lineHeight: "1.5",
              maxWidth: "270px",
            }}
          >
            Your review helps other travelers and improves our planning.
          </p>

          {/* Stars */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "18px",
              marginBottom: "34px",
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "32px",
                  color: star <= rating ? "#7C6A35" : "#CFCFCF",
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                ★
              </button>
            ))}
          </div>

          {/* Textarea */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                color: "#2E2E2E",
                fontSize: "12px",
                fontWeight: "700",
                marginBottom: "10px",
              }}
            >
              Write your experience
            </label>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about the highlights, the logistics, and any tips for future travelers..."
              style={{
                width: "100%",
                height: "132px",
                resize: "none",
                border: "none",
                outline: "none",
                borderRadius: "18px",
                background: "#EFEAE2",
                padding: "16px",
                boxSizing: "border-box",
                color: "#333",
                fontSize: "13px",
                lineHeight: "1.5",
              }}
            />
          </div>

          {/* Category Rating */}
          <div
            style={{
              background: "#F6F3EE",
              borderRadius: "16px",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "72px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  color: "#4F7F5F",
                }}
              >
                🛏
              </span>

              <span
                style={{
                  color: "#2E2E2E",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                Accommodation
              </span>
            </div>

            <div
              style={{
                color: "#7C6A35",
                fontSize: "13px",
                letterSpacing: "2px",
              }}
            >
              ★★★★★
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmitReview}
            disabled={loading}
            style={{
              width: "100%",
              border: "none",
              background: "#4F7F5F",
              color: "white",
              padding: "16px",
              borderRadius: "18px",
              fontSize: "14px",
              fontWeight: "800",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              boxShadow: "0 8px 18px rgba(79,127,95,0.3)",
              marginBottom: "18px",
            }}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>

          <button
            onClick={handleMaybeLater}
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              color: "#4F7F5F",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Maybe Later
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default Review;