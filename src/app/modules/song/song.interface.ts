export type ISong = {
  title: string;
  duration: number;
  albumId: string;
};

export type ISongFilterAbleFields = {
  searchTerm?: string;
  albumId?: string;
  artistId?: string;
};
