import type { AlbumPage } from '../component/album'
import { TeamSectionComponent } from './TeamSection'

interface AlbumPageProps {
    page: AlbumPage
    onDrop: (characterId: string, expectedId: string) => void
}

export const AlbumPageComponent = ({ page, onDrop }: AlbumPageProps) => {
    return (
        <div className="album-page">
            <h2 className="page-country">{page.country.name}</h2>
            {page.sections.map(section => (
                <TeamSectionComponent key={section.team.id} section={section} onDrop={onDrop} />
            ))}
        </div>
    )
}