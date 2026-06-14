import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createReview } from "../services/reviewService";

function Review() {
  const { destinationId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmitReview = () => {
    const userId = 1;

    if (comment.trim() === "") {
      alert("Komentar tidak boleh kosong");
      return;
    }

    createReview(userId, destinationId, rating, comment)
      .then(() => {
        alert("Review berhasil disimpan");
        navigate("/booking");
      })
      .catch((error) => {
        console.error(error);
        alert("Gagal menyimpan review");
      });
  };

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        minHeight: "100vh",
        background: "#F6F3EE",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          border: "none",
          background: "white",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          marginBottom: "16px",
          cursor: "pointer",
        }}
      >
        ←
      </button>

      <h2 style={{ color: "#4F7F5F", marginBottom: "4px" }}>
        Plan & Go
      </h2>

      <h1 style={{ color: "#2E2E2E", marginTop: 0 }}>
        Write a Review
      </h1>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <p style={{ color: "#777" }}>Destination ID</p>

        <h3 style={{ color: "#2E2E2E" }}>#{destinationId}</h3>

        <label
          style={{
            display: "block",
            marginTop: "20px",
            marginBottom: "8px",
            color: "#2E2E2E",
            fontWeight: "bold",
          }}
        >
          Rating
        </label>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "16px",
            border: "1px solid #ddd",
            marginBottom: "20px",
          }}
        >
          <option value={5}>★★★★★ - Excellent</option>
          <option value={4}>★★★★ - Good</option>
          <option value={3}>★★★ - Average</option>
          <option value={2}>★★ - Poor</option>
          <option value={1}>★ - Bad</option>
        </select>

        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#2E2E2E",
            fontWeight: "bold",
          }}
        >
          Comment
        </label>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          rows="6"
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "16px",
            border: "1px solid #ddd",
            resize: "none",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleSubmitReview}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "24px",
            background: "#4F7F5F",
            color: "white",
            fontSize: "16px",
            marginTop: "24px",
            cursor: "pointer",
          }}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default Review;