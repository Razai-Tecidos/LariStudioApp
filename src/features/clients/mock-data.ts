export type ClientListItem = {
  id: string;
  name: string;
  phone: string;
};

export type AnamnesisStatus = "filled" | "not_filled";

export type AttendanceHistoryItem = {
  id: string;
  date: string;
  service: string;
  value: number;
};

export type ClientDetail = {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  whatsapp: string;
  anamnesisStatus: AnamnesisStatus;
  anamnesisLastFilledAt: string | null;
  totalSpent: number;
  score: number;
  averageDelayMinutes: number;
  cancellationRate: number;
  attendanceHistory: AttendanceHistoryItem[];
};

export const mockClientDetails: ClientDetail[] = [
  {
    id: "1",
    firstName: "Vanessa",
    lastName: "Andrade",
    birthDate: "1991-03-15",
    whatsapp: "(11) 9 9999-9999",
    anamnesisStatus: "filled",
    anamnesisLastFilledAt: "2025-06-10",
    totalSpent: 2350,
    score: 87,
    averageDelayMinutes: 11,
    cancellationRate: 7.5,
    attendanceHistory: [
      { id: "a-1", date: "2026-01-18", service: "Ajuste de vestido", value: 420 },
      { id: "a-2", date: "2025-12-03", service: "Bainha de calca", value: 180 },
      { id: "a-3", date: "2025-10-11", service: "Reforma de blazer", value: 350 },
    ],
  },
  {
    id: "2",
    firstName: "Camila",
    lastName: "Rocha",
    birthDate: "1988-09-02",
    whatsapp: "(11) 9 9999-9998",
    anamnesisStatus: "not_filled",
    anamnesisLastFilledAt: null,
    totalSpent: 1210,
    score: 74,
    averageDelayMinutes: 18,
    cancellationRate: 14.2,
    attendanceHistory: [
      { id: "b-1", date: "2026-02-02", service: "Ajuste em saia", value: 220 },
      { id: "b-2", date: "2025-11-19", service: "Conserto de camisa", value: 140 },
    ],
  },
  {
    id: "3",
    firstName: "Julia",
    lastName: "Santos",
    birthDate: "1995-06-27",
    whatsapp: "(11) 9 9999-9997",
    anamnesisStatus: "filled",
    anamnesisLastFilledAt: "2025-12-21",
    totalSpent: 3120,
    score: 93,
    averageDelayMinutes: 6,
    cancellationRate: 3.4,
    attendanceHistory: [
      { id: "c-1", date: "2026-02-10", service: "Vestido de festa", value: 980 },
      { id: "c-2", date: "2025-12-21", service: "Ajuste de cintura", value: 260 },
      { id: "c-3", date: "2025-09-08", service: "Troca de ziper", value: 160 },
    ],
  },
];

export const mockClientList: ClientListItem[] = mockClientDetails.map((client) => ({
  id: client.id,
  name: `${client.firstName} ${client.lastName}`,
  phone: client.whatsapp,
}));

export function getMockClientById(id: string) {
  return mockClientDetails.find((client) => client.id === id);
}
