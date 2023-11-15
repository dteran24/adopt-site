export interface PetInfo {
  id: number;
  organization_id: string;
  url: string;
  type: string;
  species: string;
  breeds: {
    primary: string;
    secondary: string | null;
    mixed: boolean;
    unknown: boolean;
  };
  colors: {
    primary: string;
    secondary: string | null;
    tertiary: string | null;
  };
  age: string;
  gender: string;
  size: string;
  coat: string | null;
  attributes: {
    spayed_neutered: boolean;
    house_trained: boolean;
    declawed: boolean | null;
    special_needs: boolean;
    shots_current: boolean;
  };
  environment: {
    children: boolean | null;
    dogs: boolean;
    cats: boolean | null;
  };
  tags: string[];
  name: string;
  description: string;
  organization_animal_id: string | null;
  photos: {
    small: string;
    medium: string;
    large: string;
    full: string;
  }[];
  primary_photo_cropped: {
    small: string;
    medium: string;
    large: string;
    full: string;
  };
  videos: string[];
  status: string;
  status_changed_at: string;
  published_at: string;
  distance: number;
  contact: {
    email: string;
    phone: string | null;
    address: {
      address1: string | null;
      address2: string | null;
      city: string;
      state: string;
      postcode: string;
      country: string;
    };
  };
  _links: {
    self: {
      href: string;
    };
    type: {
      href: string;
    };
    organization: {
      href: string;
    };
  };
}

export interface FilterOptions {
  breed: string;
  age: string;
  size: string;
  gender: string;
  color: string;
}

export interface URLParameters {
  token: string;
  filter?: FilterOptions;
  type: string;
  location?: string;
  page?: number;
  limit?: number;
}
export interface Organization {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  hours: {
    monday: string | null;
    tuesday: string | null;
    wednesday: string | null;
    thursday: string | null;
    friday: string | null;
    saturday: string | null;
    sunday: string | null;
  };
  url: string;
  website: string | null;
  mission_statement: string | null;
  adoption: {
    policy: string | null;
    url: string | null;
  };
  social_media: {
    facebook: string | null;
    twitter: string | null;
    youtube: string | null;
    instagram: string | null;
    pinterest: string | null;
  };
  photos: {
    small: string;
    medium: string;
    large: string;
    full: string;
  }[];
  distance: string | null;
  _links: {
    self: {
      href: string;
    };
    animals: {
      href: string;
    };
  };
}
export interface searchBarParams {
  type: string;
  breed: string;
  location: string;
}

export interface Breed {
  name: string;
  _links: {
    type: {
      href: string;
    };
  };
}
