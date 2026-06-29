import type { AlbumPage } from '../component/album'
import { TeamSectionComponent } from './TeamSection'
import './AlbumPage.css'

interface AlbumPageProps {
    page: AlbumPage
    onDrop: (characterId: string, expectedId: string) => void
}

export const AlbumPageComponent = ({ page, onDrop }: AlbumPageProps) => {
    return (
        <div className="album-page-section">
            {/* Cabeçalho da página */}
            <div className="album-page-header">
                <div className="album-page-header-flag">
                    <span className="album-page-header-code">{page.country.code}</span>
                </div>
                <div className="album-page-header-info">
                    <span className="album-page-header-country">{page.country.name}</span>
                    <span className="album-page-header-label">COPA DO MUNDO FIFA 2026</span>
                </div>
            </div>

            {/* Seções de times */}
            {page.sections.map(section => (
                <TeamSectionComponent
                    key={section.team.id}
                    section={section}
                    onDrop={onDrop}
                />
            ))}
        </div>
    )
}