import api from "./api";

export const getUserEmergencyContacts = (userId) => {
  return api.get(`/emergency-contact/user/${userId}`);
};

export const createEmergencyContact = (userId, name, phone, relationship) => {
  return api.post("/emergency-contact", {
    userId: userId,
    name: name,
    phone: phone,
    relationship: relationship,
  });
};

export const deleteEmergencyContact = (id) => {
  return api.delete(`/emergency-contact/${id}`);
};