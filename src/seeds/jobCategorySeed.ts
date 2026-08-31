import { prisma } from "../index";

export async function jobCategorySeed() {
  const defaultJobCategories = [
    { name: "IT & Software" },
    { name: "Marketing & Communication" },
    { name: "Finance & Accounting" },
    { name: "Engineering" },
    { name: "Customer Service" },
  ];

  for (const category of defaultJobCategories) {
    prisma.jobCategory
      .create({ data: category })
      .then(() => {
        console.log(`JobCategory ${category.name} created successfully.`);
      })
      .catch((error: Error) => {
        console.error(`Error creating job category ${category.name}:`, error);
      });
  }
}
