import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getLoggedInUser, logout } from "../utils/auth";
import AdminBottomNav from "../components/AdminBottomNav";

const INITIAL_DESTINATIONS = [
  {
    id: 1,
    name: "Amalfi Coast",
    location: "Italy",
    category: "LUXURY",
    price: "1200",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Zermatt Peak",
    location: "Switzerland",
    category: "MOUNTAIN",
    price: "2450",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Shibuya District",
    location: "Japan",
    category: "URBAN",
    price: "1800",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Baa Atoll",
    location: "Maldives",
    category: "BEACH",
    price: "3100",
    image:
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=80",
  },
];

const CATEGORIES = ["ALL", "BEACH", "MOUNTAIN", "URBAN", "LUXURY"];

const EMPTY_FORM = {
  name: "",
  location: "",
  category: "BEACH",
  price: "",
  image: "",
};

function AdminDashboard() {
  const navigate = useNavigate();
  const user = getLoggedInUser();

  const [destinations, setDestinations] = useState(INITIAL_DESTINATIONS);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const matchSearch =
        destination.name.toLowerCase().includes(search.toLowerCase()) ||
        destination.location.toLowerCase().includes(search.toLowerCase()) ||
        destination.category.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === "ALL" ||
        destination.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [destinations, search, selectedCategory]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const openAddModal = () => {
    setEditingDestination(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEditModal = (destination) => {
    setEditingDestination(destination);
    setForm({
      name: destination.name,
      location: destination.location,
      category: destination.category,
      price: destination.price,
      image: destination.image,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingDestination(null);
    setForm(EMPTY_FORM);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name || !form.location || !form.price || !form.image) {
      alert("Nama, lokasi, harga, dan image URL wajib diisi.");
      return;
    }

    if (editingDestination) {
      setDestinations((currentDestinations) =>
        currentDestinations.map((destination) =>
          destination.id === editingDestination.id
            ? {
                ...destination,
                ...form,
              }
            : destination
        )
      );
    } else {
      const newDestination = {
        id: Date.now(),
        ...form,
      };

      setDestinations((currentDestinations) => [
        newDestination,
        ...currentDestinations,
      ]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Hapus destination ini?");

    if (!confirmDelete) {
      return;
    }

    setDestinations((currentDestinations) =>
      currentDestinations.filter((destination) => destination.id !== id)
    );
  };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div>
          <p style={brandStyle}>PLAN & GO ADMIN</p>
          <h1 style={titleStyle}>Manage Destinations</h1>
          <p style={subtitleStyle}>
            Tambah, ubah, dan hapus data destinasi wisata.
          </p>
        </div>

        <div style={headerRightStyle}>
          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={searchStyle}
          />

          <button onClick={openAddModal} style={addButtonStyle}>
            + Add Destination
          </button>

          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        </div>
      </header>

      <section style={summaryGridStyle}>
        <SummaryCard title="Total Destinations" value={destinations.length} />
        <SummaryCard title="Categories" value={CATEGORIES.length - 1} />
        <SummaryCard title="Admin" value={user?.username || "Admin"} />
      </section>

      <section style={categoryStyle}>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={
              selectedCategory === category
                ? activeCategoryStyle
                : categoryButtonStyle
            }
          >
            {category === "ALL" ? "All Destinations" : category}
          </button>
        ))}
      </section>

      <main style={gridStyle}>
        {filteredDestinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        ))}

        <button onClick={openAddModal} style={addCardStyle}>
          <div style={plusCircleStyle}>+</div>
          <p style={{ margin: 0, fontWeight: "900" }}>Add Destination</p>
        </button>
      </main>

      {filteredDestinations.length === 0 && (
        <div style={emptyStyle}>
          <h3>Tidak ada destination ditemukan</h3>
          <p>Coba ganti keyword pencarian atau kategori.</p>
        </div>
      )}

      {modalOpen && (
        <DestinationModal
          form={form}
          editingDestination={editingDestination}
          onChange={handleChange}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}

      <AdminBottomNav />
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div style={summaryCardStyle}>
      <p style={summaryTitleStyle}>{title}</p>
      <h2 style={summaryValueStyle}>{value}</h2>
    </div>
  );
}

function DestinationCard({ destination, onEdit, onDelete }) {
  return (
    <div style={cardStyle}>
      <div style={imageWrapperStyle}>
        <img
          src={destination.image}
          alt={destination.name}
          style={imageStyle}
          onError={(event) => {
            event.currentTarget.src =
              "https://placehold.co/900x600?text=Destination";
          }}
        />

        <span style={priceBadgeStyle}>
          ${Number(destination.price || 0).toLocaleString("en-US")}
        </span>
      </div>

      <div style={cardBodyStyle}>
        <div style={cardTopStyle}>
          <div>
            <h3 style={cardTitleStyle}>{destination.name}</h3>
            <p style={locationStyle}>📍 {destination.location}</p>
          </div>

          <span style={tagStyle}>{destination.category}</span>
        </div>

        <div style={cardActionStyle}>
          <button onClick={() => onEdit(destination)} style={editButtonStyle}>
            ✎ Edit
          </button>

          <button
            onClick={() => onDelete(destination.id)}
            style={deleteButtonStyle}
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}

function DestinationModal({
  form,
  editingDestination,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <div style={overlayStyle}>
      <form onSubmit={onSubmit} style={modalStyle}>
        <div style={modalHeaderStyle}>
          <div>
            <h2 style={modalTitleStyle}>
              {editingDestination ? "Edit Destination" : "Add Destination"}
            </h2>
            <p style={modalSubtitleStyle}>
              Isi data destination yang akan tampil di dashboard admin.
            </p>
          </div>

          <button type="button" onClick={onClose} style={closeButtonStyle}>
            ×
          </button>
        </div>

        <label style={labelStyle}>Destination Name</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Contoh: Bali Beach"
          style={inputStyle}
        />

        <label style={labelStyle}>Location</label>
        <input
          name="location"
          value={form.location}
          onChange={onChange}
          placeholder="Contoh: Indonesia"
          style={inputStyle}
        />

        <label style={labelStyle}>Category</label>
        <select
          name="category"
          value={form.category}
          onChange={onChange}
          style={inputStyle}
        >
          <option value="BEACH">BEACH</option>
          <option value="MOUNTAIN">MOUNTAIN</option>
          <option value="URBAN">URBAN</option>
          <option value="LUXURY">LUXURY</option>
        </select>

        <label style={labelStyle}>Price</label>
        <input
          name="price"
          value={form.price}
          onChange={onChange}
          type="number"
          placeholder="Contoh: 1200"
          style={inputStyle}
        />

        <label style={labelStyle}>Image URL</label>
        <input
          name="image"
          value={form.image}
          onChange={onChange}
          placeholder="https://..."
          style={inputStyle}
        />

        <div style={modalActionStyle}>
          <button type="button" onClick={onClose} style={cancelButtonStyle}>
            Cancel
          </button>

          <button type="submit" style={saveButtonStyle}>
            {editingDestination ? "Save Changes" : "Add Destination"}
          </button>
        </div>
      </form>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#F6F7F5",
  padding: "28px 34px 120px",
  boxSizing: "border-box",
};

const headerStyle = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "20px",
  marginBottom: "22px",
};

const brandStyle = {
  margin: "0 0 10px",
  color: "#0F6B28",
  fontWeight: "900",
  letterSpacing: "1px",
};

const titleStyle = {
  margin: 0,
  color: "#252525",
  fontSize: "32px",
};

const subtitleStyle = {
  margin: "6px 0 0",
  color: "#777",
};

const headerRightStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
};

const searchStyle = {
  width: "320px",
  maxWidth: "100%",
  border: "1px solid #E0E0E0",
  borderRadius: "999px",
  padding: "12px 16px",
  outline: "none",
  background: "#FFFFFF",
};

const addButtonStyle = {
  border: "none",
  borderRadius: "14px",
  background: "#0F6B28",
  color: "white",
  padding: "12px 18px",
  fontWeight: "900",
  cursor: "pointer",
};

const logoutButtonStyle = {
  border: "none",
  borderRadius: "14px",
  background: "#C94C4C",
  color: "white",
  padding: "12px 16px",
  fontWeight: "900",
  cursor: "pointer",
};

const summaryGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "16px",
  marginBottom: "22px",
};

const summaryCardStyle = {
  background: "#FFFFFF",
  borderRadius: "22px",
  padding: "18px",
  boxShadow: "0 8px 22px rgba(0,0,0,0.06)",
};

const summaryTitleStyle = {
  margin: "0 0 8px",
  color: "#777",
  fontWeight: "700",
};

const summaryValueStyle = {
  margin: 0,
  color: "#0F6B28",
};

const categoryStyle = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "22px",
};

const categoryButtonStyle = {
  border: "none",
  borderRadius: "999px",
  background: "#FFFFFF",
  color: "#555",
  padding: "9px 16px",
  fontWeight: "800",
  cursor: "pointer",
};

const activeCategoryStyle = {
  ...categoryButtonStyle,
  background: "#0F6B28",
  color: "#FFFFFF",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "22px",
};

const cardStyle = {
  background: "#FFFFFF",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
};

const imageWrapperStyle = {
  position: "relative",
  height: "160px",
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const priceBadgeStyle = {
  position: "absolute",
  right: "10px",
  top: "10px",
  background: "#FFFFFF",
  color: "#0F6B28",
  borderRadius: "999px",
  padding: "5px 10px",
  fontSize: "12px",
  fontWeight: "900",
};

const cardBodyStyle = {
  padding: "14px",
};

const cardTopStyle = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "10px",
  marginBottom: "14px",
};

const cardTitleStyle = {
  margin: "0 0 5px",
  color: "#252525",
};

const locationStyle = {
  margin: 0,
  color: "#777",
  fontSize: "13px",
};

const tagStyle = {
  background: "#E8F3EB",
  color: "#0F6B28",
  borderRadius: "999px",
  padding: "4px 8px",
  fontSize: "10px",
  fontWeight: "900",
};

const cardActionStyle = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  gap: "8px",
};

const editButtonStyle = {
  border: "1px solid #DDEBDD",
  borderRadius: "12px",
  background: "#FFFFFF",
  color: "#0F6B28",
  padding: "9px",
  fontWeight: "900",
  cursor: "pointer",
};

const deleteButtonStyle = {
  border: "1px solid #F0CFCF",
  borderRadius: "12px",
  background: "#FFFFFF",
  color: "#C94C4C",
  padding: "9px 12px",
  cursor: "pointer",
};

const addCardStyle = {
  minHeight: "250px",
  border: "2px dashed #D8D8D8",
  borderRadius: "20px",
  background: "#FFFFFF",
  color: "#555",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
};

const plusCircleStyle = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  background: "#F0F0F0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "28px",
  fontWeight: "900",
};

const emptyStyle = {
  background: "#FFFFFF",
  borderRadius: "20px",
  padding: "24px",
  marginTop: "22px",
  color: "#777",
};

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  zIndex: 2000,
};

const modalStyle = {
  width: "100%",
  maxWidth: "520px",
  background: "#FFFFFF",
  borderRadius: "26px",
  padding: "24px",
  boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
};

const modalHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "14px",
  marginBottom: "18px",
};

const modalTitleStyle = {
  margin: 0,
  color: "#252525",
};

const modalSubtitleStyle = {
  margin: "6px 0 0",
  color: "#777",
};

const closeButtonStyle = {
  border: "none",
  background: "#F1F1F1",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  fontSize: "22px",
  cursor: "pointer",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  color: "#333",
  fontWeight: "800",
};

const inputStyle = {
  width: "100%",
  border: "1px solid #DDD",
  borderRadius: "14px",
  padding: "12px 14px",
  marginBottom: "14px",
  boxSizing: "border-box",
};

const modalActionStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "8px",
};

const cancelButtonStyle = {
  border: "none",
  borderRadius: "14px",
  background: "#EEEEEE",
  color: "#333",
  padding: "12px 18px",
  fontWeight: "900",
  cursor: "pointer",
};

const saveButtonStyle = {
  border: "none",
  borderRadius: "14px",
  background: "#0F6B28",
  color: "white",
  padding: "12px 18px",
  fontWeight: "900",
  cursor: "pointer",
};

export default AdminDashboard;