interface SeedData {
  entries: SeedEntry[];
}
interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Example description pending",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "Example description 2 in progress",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description: "Example description 3 finished",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};
