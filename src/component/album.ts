import type { Character } from "./character"
import type { Country } from "./country"
import type { Team } from "./team"

export interface Slot {
    readonly expectedId: string
    character?: Character
}

export interface TeamSection {
    readonly team: Team
    slots: Slot[]
}

export interface AlbumPage {
    readonly country: Country
    sections: TeamSection[]
}