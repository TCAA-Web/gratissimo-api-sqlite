import { userSeed } from "./userSeed";
import { jobCategorySeed } from "./jobCategorySeed";
import { jobListingSeed } from "./jobListingSeed";
import { userJobFavoriteSeed } from "./userJobFavoriteSeed";
import { articleSeed } from "./articleSeed";
import { newsletterSubscriberSeed } from "./newsletterSubscriberSeed";
import { regionSeed } from "./regionSeed";
import { workTypeSeed } from "./workTypeSeed";

async function initSeeding() {
  console.log("Running seeds...");
  await userSeed();
  await jobCategorySeed();
  await workTypeSeed();
  await regionSeed();
  await jobListingSeed();
  await userJobFavoriteSeed();
  await newsletterSubscriberSeed();
  await articleSeed();
  return;
}

initSeeding();
