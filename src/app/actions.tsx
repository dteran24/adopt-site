import { FilterOptions, Organization, PetInfo } from "./models/pet";

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
export const getAnimals = async (
  bearerToken: string,
  filter?: FilterOptions,
  type: string = "dog",
  location: string = "dallas, texas",
  page: number = 1
) => {
  try {
    const BASE_URL = `https://api.petfinder.com/v2/animals?location=${location}&type=${type}&limit=12&page=${page}`;

    const queryParams = [];

    // Check if the 'filter' object contains values and add them to the query parameters.    if (filter.breed) {
    console.log("token in actions: ", bearerToken);
    if (filter) {
      if (filter.breed != "Any") {
        queryParams.push(`breed=${filter.breed}`);
      }
      if (filter.age != "Any") {
        queryParams.push(`age=${filter.age}`);
      }
      if (filter.size != "Any") {
        queryParams.push(`size=${filter.size}`);
      }
      if (filter.gender != "Any") {
        queryParams.push(`gender=${filter.gender}`);
      }
      if (filter.color != "Any") {
        queryParams.push(`color=${filter.color}`);
      }
    }

    const fullURL =
      queryParams.length > 0
        ? `${BASE_URL}&${queryParams.join("&")}`
        : BASE_URL;

    const response = await fetch(fullURL, {
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
export const getAnimalByID = async (
  id: number,
  bearerToken: string
): Promise<PetInfo> => {
  try {
    const BASE_URL = `https://api.petfinder.com/v2/animals/${id}`;
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    const petData = await response.json();
    if (petData) {
      return petData.animal;
    } else {
      console.error("Error: Inavlid response");
      return Promise.reject(
        `Error: Request failed with status ${response.status}`
      );
    }
  } catch (e) {
    console.error("Error:", e);
    return Promise.reject(e);
  }
};

export const getOrganization = async (
  orgID: string,
  token: string
): Promise<Organization> => {
  try {
    const BASE_URL = `https://api.petfinder.com/v2/organizations/${orgID}`;
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const orgData = await response.json();
    if (orgData) {
      return orgData.organization;
    } else {
      console.error("Error: Inavlid response");
      return Promise.reject(
        `Error: Request failed with status ${response.status}`
      );
    }
  } catch (e) {
    console.error("Error:", e);
    return Promise.reject(e);
  }
};
export const photoHandler = (animalData: PetInfo) => {
  if (animalData.photos.length !== 0) {
    if (animalData.photos[0].full) {
      return animalData.photos[0].full;
    } else if (animalData.photos[0].large) {
      return animalData.photos[0].large;
    } else if (animalData.photos[0].medium) {
      return animalData.photos[0].medium;
    } else if (animalData.photos[0].small) {
      return animalData.photos[0].small;
    }
  } else {
    return "https://cdn.stocksnap.io/img-thumbs/960w/husky-animal_GF7YFWSR88.jpg";
  }
};
