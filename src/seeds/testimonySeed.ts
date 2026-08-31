import { prisma } from "../index";

export async function testimonySeed() {
  const defaultTestimonies = [
    {
      name: "Jonas",
      title: "Gratissimo hjalp mig tilbage",
      content:
        "I 2022 mistede jeg mit job. Jeg havde svært ved at finde en vej tilbage på jobmarkedet. Gratissmo hjalp mig med at finde en praktikplads hvor jeg i dag har fået en fuldtidskontrakt",
    },
    {
      name: "Michael",
      title: "Gratissimo hjalp mig tilbage",
      content:
        "I 2022 mistede jeg mit job. Jeg havde svært ved at finde en vej tilbage på jobmarkedet. Gratissmo hjalp mig med at finde en praktikplads hvor jeg i dag har fået en fuldtidskontrakt",
    },
    {
      name: "Anette",
      title: "Gratissimo hjalp mig tilbage",
      content:
        "I 2022 mistede jeg mit job. Jeg havde svært ved at finde en vej tilbage på jobmarkedet. Gratissmo hjalp mig med at finde en praktikplads hvor jeg i dag har fået en fuldtidskontrakt",
    },
    {
      name: "Liv",
      title: "Gratissimo hjalp mig tilbage",
      content:
        "I 2022 mistede jeg mit job. Jeg havde svært ved at finde en vej tilbage på jobmarkedet. Gratissmo hjalp mig med at finde en praktikplads hvor jeg i dag har fået en fuldtidskontrakt",
    },
  ];

  for (const testimony of defaultTestimonies) {
    prisma.testimony
      .create({ data: testimony })
      .then(() => {
        console.log(`JobCategory ${testimony.name} created successfully.`);
      })
      .catch((error: Error) => {
        console.error(`Error creating job category ${testimony.name}:`, error);
      });
  }
}
