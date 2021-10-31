
export interface CollectionState {
    collection: Artwork[],
    status: 'idle' | 'loading' | 'failed';
}
export interface Artwork {
    id: string,
    title: string,
    creationDate: string,
    medium: string,
    dateAquired: string,
    provenanceText: string,
    imageUrl: string,
    classification: string,
    location: Location,
    creator: Creator
}

export interface Creator {
    fullName: string,
    //citedName: string,
    //role: string,
    //nationality: string,
    //birthDate: string,
    //deathDate: string,
    //birthPlace: string,
    //deathPlace: string,
}

export interface Location {
    departament: string,
    physicalLocation: string
}
export interface DetailState {
    detail?: Artwork,
}
export interface TabState {
    tab: number,
    path: string,
};

