import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getItineraryById,
  updateItinerary,
  deleteItineraryItem,
  updateItineraryItemVisitTime,
} from "../services/itineraryService";
import { createBooking } from "../services/bookingService";
import BottomNav from "../components/BottomNav";
import AppHeader from "../components/AppHeader";

function PlanDetail() {
  const navigate = useNavigate();
  const { itineraryId } = useParams();

  const USER_ID = 1;

  const activeItineraryId =
    itineraryId || localStorage.getItem("activeItineraryId");

  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingTimes, setEditingTimes] = useState({});
  const [savingItemId, setSavingItemId] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editTotalPeople, setEditTotalPeople] = useState(1);
  const [savingInfo, setSavingInfo] = useState(false);

  const loadItinerary = async () => {
    if (!activeItineraryId) {
      setLoading(false);
      setItinerary(null);
      return;
    }

    setLoading(true);

    try {
      const response = await getItineraryById(activeItineraryId);

      setItinerary(response.data);
      setEditTitle(response.data?.title || "");
      setEditTotalPeople(response.data?.totalPeople || 1);

      localStorage.setItem("activeItineraryId", String(activeItineraryId));
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil detail itinerary");
      setItinerary(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItinerary();
  }, [activeItineraryId]);

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("id-ID");
  };

  const formatDate = (value) => {
    if (!value) return "-";

    try {
      return new Date(value).toLocaleString("id-ID", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return value;
    }
  };

  const toInputDateTime = (value) => {
    if (!value) return "";
    return value.substring(0, 16);
  };

  const getTotalPrice = () => {
    const items = itinerary?.items || [];
    const people = itinerary?.totalPeople || 1;

    const destinationTotal = items.reduce((total, item) => {
      return total + Number(item.destination?.price || 0);
    }, 0);

    return destinationTotal * people;
  };

  const handleDeleteDestination = async (itemId) => {
    if (!itemId) {
      alert("ID itinerary item tidak ditemukan");
      return;
    }

    const confirmDelete = window.confirm(
      "Yakin ingin menghapus destinasi ini dari itinerary?"
    );

    if (!confirmDelete) return;

    try {
      await deleteItineraryItem(itemId);

      alert("Destinasi berhasil dihapus dari itinerary");

      await loadItinerary();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus destinasi dari itinerary");
    }
  };

  const handleTimeChange = (itemId, value) => {
    setEditingTimes((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const handleSaveVisitTime = async (item) => {
    const selectedValue =
      editingTimes[item.id] !== undefined
        ? editingTimes[item.id]
        : toInputDateTime(item.visitTime);

    if (!selectedValue) {
      alert("Jam kunjung tidak boleh kosong");
      return;
    }

    const normalizedVisitTime =
      selectedValue.length === 16 ? `${selectedValue}:00` : selectedValue;

    try {
      setSavingItemId(item.id);

      await updateItineraryItemVisitTime(item.id, normalizedVisitTime);

      await loadItinerary();

      alert("Jam kunjung berhasil diupdate");
    } catch (error) {
      console.error(error);
      alert("Gagal update jam kunjung");
    } finally {
      setSavingItemId(null);
    }
  };

  const handleGoToPlanPage = () => {
    navigate("/plan");
  };

  const handleAddDestinationToCurrentItinerary = () => {
    if (!activeItineraryId) {
      alert("Itinerary belum dipilih");
      navigate("/plan");
      return;
    }

    localStorage.setItem("activeItineraryId", String(activeItineraryId));
    navigate("/explore/all");
  };

  const handleSaveItineraryInfo = async () => {
    if (!activeItineraryId) {
      alert("Itinerary belum dipilih");
      return;
    }

    if (!editTitle.trim()) {
      alert("Nama itinerary tidak boleh kosong");
      return;
    }

    try {
      setSavingInfo(true);

      await updateItinerary(
        activeItineraryId,
        editTitle.trim(),
        Number(editTotalPeople) || 1
      );

      await loadItinerary();

      setIsEditingInfo(false);
      alert("Nama itinerary berhasil diupdate");
    } catch (error) {
      console.error(error);
      alert("Gagal mengupdate nama itinerary");
    } finally {
      setSavingInfo(false);
    }
  };

  const handleContinueBooking = async () => {
    if (!activeItineraryId) {
      alert("Itinerary belum dipilih");
      return;
    }

    if (!itinerary?.items || itinerary.items.length === 0) {
      alert("Itinerary belum memiliki destinasi");
      return;
    }

    try {
      setBookingLoading(true);

      await createBooking(USER_ID, Number(activeItineraryId));

      navigate("/booking?tab=UPCOMING");
    } catch (error) {
      console.error(error);
      alert("Gagal membuat booking");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F6F3EE",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#4F7F5F",
          fontWeight: "bold",
        }}
      >
        Loading itinerary...
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F6F3EE",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#777",
          gap: "16px",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: 0, color: "#2E2E2E" }}>
          Itinerary tidak ditemukan
        </h2>

        <button
          onClick={() => navigate("/plan")}
          style={{
            border: "none",
            background: "#4F7F5F",
            color: "white",
            padding: "12px 22px",
            borderRadius: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Kembali ke Plan
        </button>
      </div>
    );
  }

  const items = itinerary.items || [];

  return (
    <div
      style={{
        maxWidth: "430px",
        margin: "0 auto",
        minHeight: "100vh",
        background: "#F6F3EE",
        paddingBottom: "110px",
        boxSizing: "border-box",
      }}
    >
      <AppHeader />

      <div
        style={{
          padding: "22px",
        }}
      >
        {/* Header Trip */}
        <div
          style={{
            background: "#4F7F5F",
            borderRadius: "24px",
            padding: "22px",
            color: "white",
            marginBottom: "20px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          }}
        >
          <p
            style={{
              margin: "0 0 8px 0",
              fontSize: "12px",
              opacity: 0.85,
              fontWeight: "700",
              letterSpacing: "0.6px",
            }}
          >
            CURRENT ITINERARY
          </p>

          {isEditingInfo ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Nama itinerary"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "14px",
                  border: "none",
                  outline: "none",
                  marginBottom: "10px",
                  boxSizing: "border-box",
                  fontWeight: "bold",
                }}
              />

              <input
                type="number"
                min="1"
                value={editTotalPeople}
                onChange={(e) => setEditTotalPeople(e.target.value)}
                placeholder="Jumlah traveler"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "14px",
                  border: "none",
                  outline: "none",
                  marginBottom: "12px",
                  boxSizing: "border-box",
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <button
                  onClick={handleSaveItineraryInfo}
                  disabled={savingInfo}
                  style={{
                    flex: 1,
                    border: "none",
                    background: "white",
                    color: "#4F7F5F",
                    padding: "11px",
                    borderRadius: "14px",
                    fontWeight: "bold",
                    cursor: savingInfo ? "not-allowed" : "pointer",
                  }}
                >
                  {savingInfo ? "Saving..." : "Simpan"}
                </button>

                <button
                  onClick={() => {
                    setIsEditingInfo(false);
                    setEditTitle(itinerary.title || "");
                    setEditTotalPeople(itinerary.totalPeople || 1);
                  }}
                  style={{
                    flex: 1,
                    border: "1px solid white",
                    background: "transparent",
                    color: "white",
                    padding: "11px",
                    borderRadius: "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Batal
                </button>
              </div>
            </>
          ) : (
            <>
              <h1
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "26px",
                  lineHeight: "1.2",
                  fontWeight: "800",
                }}
              >
                {itinerary.title || "Untitled Trip"}
              </h1>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                  fontSize: "13px",
                  marginBottom: "14px",
                }}
              >
                <span>{itinerary.totalPeople || 1} Traveler</span>
                <span>{items.length} Destination</span>
              </div>

              <button
                onClick={() => setIsEditingInfo(true)}
                style={{
                  border: "1px solid white",
                  background: "rgba(255,255,255,0.12)",
                  color: "white",
                  padding: "10px 14px",
                  borderRadius: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                ✎ Edit Nama Plan
              </button>
            </>
          )}
        </div>

        {/* Summary */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "16px",
            marginBottom: "20px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
          }}
        >
          <InfoRow label="Created At" value={formatDate(itinerary.createdAt)} />
          <InfoRow label="Total Destination" value={`${items.length} tempat`} />
          <InfoRow
            label="Estimated Total"
            value={`Rp ${formatPrice(getTotalPrice())}`}
            strong
          />
        </div>

        {/* Action Top */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={handleGoToPlanPage}
            style={{
              border: "none",
              background: "#4F7F5F",
              color: "white",
              padding: "13px",
              borderRadius: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            + New Itinerary
          </button>

          <button
            onClick={() => window.print()}
            style={{
              border: "1px solid #4F7F5F",
              background: "white",
              color: "#4F7F5F",
              padding: "13px",
              borderRadius: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Export
          </button>
        </div>

        {/* List Destination */}
        <h2
          style={{
            margin: "0 0 14px 0",
            color: "#2E2E2E",
            fontSize: "22px",
            fontWeight: "800",
          }}
        >
          Itinerary Timeline
        </h2>

        {items.length === 0 ? (
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "24px",
              textAlign: "center",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              marginBottom: "20px",
            }}
          >
            <h3
              style={{
                margin: "0 0 8px 0",
                color: "#2E2E2E",
              }}
            >
              Belum ada destinasi
            </h3>

            <p
              style={{
                margin: "0 0 18px 0",
                color: "#777",
                fontSize: "14px",
              }}
            >
              Tambahkan destinasi pertama untuk menyusun itinerary.
            </p>

            <button
              onClick={handleAddDestinationToCurrentItinerary}
              style={{
                border: "none",
                background: "#4F7F5F",
                color: "white",
                padding: "12px 18px",
                borderRadius: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Tambah Destinasi
            </button>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              style={{
                background: "white",
                borderRadius: "22px",
                padding: "16px",
                marginBottom: "14px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "#4F7F5F",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </div>

                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      margin: "0 0 6px 0",
                      color: "#2E2E2E",
                      fontSize: "18px",
                      fontWeight: "800",
                    }}
                  >
                    {item.destination?.name || "Destination"}
                  </h3>

                  <p
                    style={{
                      margin: "0 0 8px 0",
                      color: "#777",
                      fontSize: "13px",
                    }}
                  >
                    📍 {item.destination?.location || "Indonesia"}
                  </p>

                  <p
                    style={{
                      margin: 0,
                      color: "#4F7F5F",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    Rp {formatPrice(item.destination?.price)}
                  </p>
                </div>
              </div>

              {item.destination?.imageUrl && (
                <img
                  src={item.destination.imageUrl}
                  alt={item.destination?.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "16px",
                    marginBottom: "14px",
                  }}
                />
              )}

              {/* Edit Visit Time */}
              <div
                style={{
                  background: "#F6F3EE",
                  borderRadius: "16px",
                  padding: "14px",
                  marginBottom: "12px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    color: "#777",
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Jam Kunjung
                </label>

                <input
                  type="datetime-local"
                  value={
                    editingTimes[item.id] !== undefined
                      ? editingTimes[item.id]
                      : toInputDateTime(item.visitTime)
                  }
                  onChange={(e) => handleTimeChange(item.id, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "11px",
                    borderRadius: "12px",
                    border: "1px solid #DDD",
                    outline: "none",
                    boxSizing: "border-box",
                    marginBottom: "10px",
                  }}
                />

                <button
                  onClick={() => handleSaveVisitTime(item)}
                  disabled={savingItemId === item.id}
                  style={{
                    width: "100%",
                    border: "none",
                    background: "#4F7F5F",
                    color: "white",
                    padding: "11px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                    cursor: savingItemId === item.id ? "not-allowed" : "pointer",
                    opacity: savingItemId === item.id ? 0.7 : 1,
                  }}
                >
                  {savingItemId === item.id ? "Saving..." : "Simpan Jam"}
                </button>
              </div>

              {/* Delete */}
              <button
                onClick={() => handleDeleteDestination(item.id)}
                style={{
                  width: "100%",
                  border: "none",
                  background: "#FFE0E0",
                  color: "#B00020",
                  padding: "12px",
                  borderRadius: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: 5,
                }}
              >
                Hapus Destinasi
              </button>
            </div>
          ))
        )}

        {/* Bottom Actions */}
        <button
          onClick={handleAddDestinationToCurrentItinerary}
          style={{
            width: "100%",
            border: "1px dashed #4F7F5F",
            background: "white",
            color: "#4F7F5F",
            padding: "15px",
            borderRadius: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "6px",
            marginBottom: "12px",
          }}
        >
          + Tambah Destinasi Lain
        </button>

        <button
          onClick={handleContinueBooking}
          disabled={bookingLoading}
          style={{
            width: "100%",
            border: "none",
            background: "#4F7F5F",
            color: "white",
            padding: "16px",
            borderRadius: "18px",
            fontSize: "16px",
            fontWeight: "800",
            cursor: bookingLoading ? "not-allowed" : "pointer",
            opacity: bookingLoading ? 0.7 : 1,
            marginBottom: "20px",
          }}
        >
          {bookingLoading ? "Processing..." : "Continue to Booking"}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

function InfoRow({ label, value, strong }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "12px",
        marginBottom: "10px",
      }}
    >
      <span
        style={{
          color: "#777",
          fontSize: "13px",
        }}
      >
        {label}
      </span>

      <span
        style={{
          color: strong ? "#4F7F5F" : "#2E2E2E",
          fontSize: "13px",
          fontWeight: strong ? "800" : "600",
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default PlanDetail;