import { Client, Account } from "appwrite";

const appwrite = new Client();

appwrite
  .setEndpoint("https://cloud.appwrite.io/v1") // Substitui pelo teu endpoint
  .setProject("67dc182e001b64ae6819"); // Substitui pelo teu ID de projeto

export const account = new Account(appwrite);
export default appwrite;
