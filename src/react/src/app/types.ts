export interface CollectionState {
    collection: Artwork[],
    status: 'idle' | 'loading' | 'failed';
}

export interface Artwork {
    artworkId: string,
    title: string,
    creationDate: string,
    medium: string,
    creditLine: string,
    dateAcquired?: string,
    itemWidth?: number,
    itemHeight?: number,
    itemDepth?: number,
    itemDiameter?: number,
    provenanceText: string,
    classification: string,
    location: Location,
    creator: Creator
}

export interface Creator {
    creatorId: number,
    fullName: string,
    citedName: string,
    role: string,
    nationality: string,
    birthDate: string,
    deathDate: string,
    birthPlace: string,
    deathPlace: string,
}

export interface Location {
    locationId: number,
    department: string,
    physicalLocation: string
}

export interface Tour {
    tourId: string,
    title: string,
    email: string,
    items: Artwork[]
}

export interface Favorites {
    email: string,
    creators: Creator[],
    artworks: Artwork[],
    tours: Tour[]
}

export interface User {
    fname: string,
    lname: string,
    email: string,
    password: string,
}
export interface DetailState {
    detail?: Artwork,
}
export interface TabState {
    tab: number,
    path: string,
}

export type LoginUser = Partial<Pick<User, "fname" | "lname">> & Pick<User, "email" | "password">;

export interface UserState {
    isLoggedIn: boolean,
    isAdmin: boolean,
    user: User | null,
    message: any,
    status: 'idle' | 'loading' | 'failed';
}