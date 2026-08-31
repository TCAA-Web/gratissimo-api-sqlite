import { prisma } from "../index";

export async function jobListingSeed() {
  const defaultJobListings = [
    {
      title: "Senior Backend Developer",
      description:
        "We are looking for an experienced backend developer to join our team.",
      address: "Nørregade 10",
      zipcode: 1165,
      organization: "FrivilligeHuset",
      city: "Copenhagen",
      workHome: "Hybrid",
      userId: 1,
      jobCategoryId: 1,
      regionId: 4,
      workTypeId: 3,
    },
    {
      title: "Marketing Manager",
      description: "Lead our marketing initiatives and grow brand awareness.",
      address: "Vesterbrogade 42",
      zipcode: 1620,
      organization: "SuperJobs",
      city: "Copenhagen",
      workHome: "On-site",
      userId: 2,
      jobCategoryId: 2,
      regionId: 1,
      workTypeId: 1,
    },
    {
      title: "Junior Frontend Developer",
      description:
        "Build responsive user interfaces with React and TypeScript.",
      address: "Åboulevarden 5",
      zipcode: 8000,
      organization: "FrieTeknikere",
      city: "Aarhus",
      workHome: "Remote",
      userId: 3,
      jobCategoryId: 1,
      regionId: 2,
      workTypeId: 2,
    },
  ];

  for (const listing of defaultJobListings) {
    await prisma.jobListing.upsert({
      where: { id: defaultJobListings.indexOf(listing) + 1 },
      update: {},
      create: listing,
    });
  }
}
