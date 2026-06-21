const SAFETY_RECORD_KEY = "plango_safety_records";

export const getSafetyRecords = () => {
  const rawRecords = localStorage.getItem(SAFETY_RECORD_KEY);

  if (!rawRecords) {
    return [];
  }

  try {
    return JSON.parse(rawRecords);
  } catch (error) {
    localStorage.removeItem(SAFETY_RECORD_KEY);
    return [];
  }
};

export const saveSafetyRecords = (records) => {
  localStorage.setItem(SAFETY_RECORD_KEY, JSON.stringify(records));
};

export const markCustomerUnsafe = (user, destination = "Current Trip") => {
  if (!user?.id) {
    return;
  }

  const records = getSafetyRecords();

  const existingRecord = records.find(
    (record) => Number(record.customerId) === Number(user.id)
  );

  const unsafeRecord = {
    id: existingRecord?.id || Date.now(),
    customerId: user.id,
    customerName: user.username || "Customer",
    customerEmail: user.email || "-",
    customerCode: `APP-${String(user.id).padStart(5, "0")}`,
    initials: getInitials(user.username || user.email),
    destination: destination,
    safetyStatus: "Unsafe",
    emergencyHistory: "Emergency Button Pressed",
    lastUpdated: "Just now",
    emergencyAt: new Date().toISOString(),
  };

  let updatedRecords;

  if (existingRecord) {
    updatedRecords = records.map((record) =>
      Number(record.customerId) === Number(user.id)
        ? unsafeRecord
        : record
    );
  } else {
    updatedRecords = [unsafeRecord, ...records];
  }

  saveSafetyRecords(updatedRecords);

  window.dispatchEvent(new Event("safety-record-updated"));
};

export const markCustomerSafe = (customerId) => {
  const records = getSafetyRecords();

  const updatedRecords = records.map((record) =>
    Number(record.customerId) === Number(customerId)
      ? {
          ...record,
          safetyStatus: "Safe",
          emergencyHistory: "Resolved",
          lastUpdated: "Just now",
        }
      : record
  );

  saveSafetyRecords(updatedRecords);

  window.dispatchEvent(new Event("safety-record-updated"));
};

function getInitials(value) {
  if (!value) {
    return "CU";
  }

  const parts = value.trim().split(" ");

  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}