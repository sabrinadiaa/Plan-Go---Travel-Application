import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDestinationById } from "../services/destinationService";
import { addDestinationToItinerary } from "../services/itineraryService";

function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);

  const handleAddToItinerary = () => {
    const itineraryId = 2; // sementara pakai itinerary yang sudah ada

    addDestinationToItinerary(itineraryId, destination.id)
        .then(() => {
        alert("Destination berhasil ditambahkan ke itinerary");
        navigate("/plan");
        })
        .catch((error) => {
        console.error(error);
        alert("Gagal menambahkan destination");
        });
    };

  useEffect(() => {
    getDestinationById(id)
      .then((response) => {
        setDestination(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!destination) {
    return (
      <div
        style={{
          maxWidth: "430px",
          margin: "0 auto",
          minHeight: "100vh",
          background: "#F6F3EE",
          padding: "20px",
        }}
      >
        <p>Loading...</p>
      </div>
    );
  }

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

      <img
        src={destination.imageUrl}
        alt={destination.name}
        style={{
          width: "100%",
          height: "280px",
          objectFit: "cover",
          borderRadius: "24px",
        }}
      />

      <h1
        style={{
          color: "#2E2E2E",
          marginTop: "20px",
          marginBottom: "8px",
        }}
      >
        {destination.name}
      </h1>

      <p
        style={{
          color: "#777",
          marginBottom: "12px",
        }}
      >
        {destination.location}
      </p>

      <p
        style={{
          color: "#4F7F5F",
          fontWeight: "bold",
          fontSize: "20px",
          marginBottom: "20px",
        }}
      >
        Rp {destination.price}
      </p>

      <h3 style={{ color: "#2E2E2E" }}>Description</h3>

      <p
        style={{
          lineHeight: "1.6",
          color: "#444",
        }}
      >
        {destination.description}
      </p>

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
            marginTop: "24px",
            cursor: "pointer",
        }}
        >
        Add To Itinerary
      </button>
    </div>
  );
}

export default DestinationDetail;