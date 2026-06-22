export interface Team {
    readonly id: string,
    name: string,
}
export interface TeamValidation {
    readonly id: string,
    readonly name: string,
}
export const initialTeamValidation: TeamValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[a-zA-Z0-9]+$`,
}
export const initialTeam: Team = {
    id: '001',
    name: 'Flamengo',
}