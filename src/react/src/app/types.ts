export interface CollectionState {
    collection: Artwork[] | undefined,
    status: 'idle' | 'loading' | 'failed';
}

export interface Artwork {
    artworkId: string,
    title: string | null,
    creationDate: string | null,
    medium: string | null,
    creditLine: string | null,
    dateAcquired?: string | null,
    itemWidth?: number | null,
    itemHeight?: number | null,
    itemDepth?: number | null,
    itemDiameter?: number | null,
    provenanceText: string | null,
    classification: string | null,
    location: Location,
    creator: Creator
}

export interface Creator {
    creatorId: number| null,
    fullName: string| null,
    citedName: string| null,
    role: string| null,
    nationality: string| null,
    birthDate: string| null,
    deathDate: string| null,
    birthPlace: string| null,
    deathPlace: string| null,
}

export interface Location {
    locationId: number | null,
    department: string | null,
    physicalLocation: string | null,
}

export interface Tour {
    tourId: number | null,
    tourName: string | null,
    email: string | null,
    artworks: Artwork[]
}

export interface ToursCollectionState {
    tours: Tour[],
    status: 'idle' | 'loading' | 'failed';
}
export interface Favorite {
    creators: Creator[],
    artworks: Artwork[],
    tours: Tour[]
}

export interface User {
    fname: string,
    lname: string,
    email: string,
    password: string,
    token: string,
}
export interface DetailState {
    detail?: Artwork,
}
export interface TabState {
    tab: number,
    path: string,
}

export type LoginUser = Partial<Pick<User, "fname" | "lname">> & Pick<User, "email" | "password">;
export type RegisterUser = Partial<Pick<User, "email" | "fname" | "lname" | "password">>;

export interface UserState {
    isLoggedIn: boolean,
    isAdmin: boolean,
    user: User | null,
    message: any,
    status: 'idle' | 'loading' | 'failed';
}