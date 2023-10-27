import { PetInfo } from "./models/pet";

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID; // Replace with your actual client ID
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET; // Replace with your actual client secret
const apiUrl = "https://api.petfinder.com/v2/oauth2/token";

const data = new URLSearchParams();
data.append("grant_type", "client_credentials");
data.append("client_id", clientId!);
data.append("client_secret", clientSecret!);

export const getToken = async (): Promise<string> => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const tokenData = await response.json();

    if (tokenData && tokenData.access_token) {
      return tokenData.access_token;
    } else {
      console.error("Error: Invalid token data");
      return ""; // or handle the error in an appropriate way
    }
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(error);
  }
};
export const getPictures = async (bearerToken: string): Promise<PetInfo[]> => {
  try {
    const apiEndpoint =
      "https://api.petfinder.com/v2/animals?location=dallas, texas&distance=50&sort=distance&limit=3";
    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    const petData = await response.json();
    if (petData) {
      return petData.animals;
    } else {
      console.error("Error: Inavlid response");
      return Promise.reject(
        `Error: Request failed with status ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(error);
  }
};