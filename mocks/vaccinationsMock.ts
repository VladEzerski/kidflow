import { Vaccination } from "@/types"

export const vaccinationsMock: Vaccination[] = [
  {
    id: "vac_1",
    kidId: "kid_1",
    title: "MMR",
    date: "2025-02-10",
    status: "planned",
    notes: "Booster required 12 months later.",
  },
  {
    id: "vac_2",
    kidId: "kid_1",
    title: "DTP Booster",
    date: "2025-04-01",
    status: "pending",
    notes: "",
  },
  {
    id: "vac_3",
    kidId: "kid_2",
    title: "Polio Vaccine",
    date: "2024-12-20",
    status: "completed",
    notes: "Done on time, no reaction.",
  },
]
