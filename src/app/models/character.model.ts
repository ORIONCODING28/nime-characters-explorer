export interface Character {
  id: string;
  name: string;
  series: 'Dragon Ball' | 'One Piece' | 'Naruto';
  ki?: string;
  maxKi?: string;
  race?: string;
  gender?: string;
  description: string;
  image: string;
  affiliation?: string;
  // Campi specifici One Piece
  crew?: string;
  bounty?: string;
  // Campi specifici Naruto
  clan?: string;
  rank?: string;
  village?: string;
}

export interface CharacterDetail extends Character {
  originPlanet: Planet;
  transformations: Transformation[];
}

export interface Planet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
  deletedAt: string | null;
}

export interface Transformation {
  id: number;
  name: string;
  image: string;
  ki: string;
}

export interface ApiResponse<T> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}
