import type { AlbumPage } from '../component/album'
import { AlbumPageComponent } from './AlbumPage'
import './Album.css'

interface AlbumProps {
    pages: AlbumPage[]
    onDrop: (characterId: string, expectedId: string) => void
}

export const Album = ({ pages, onDrop }: AlbumProps) => {
    return (
        <div className="album-book">
            {/* Lombada do álbum */}
            <div className="album-spine">
                <span className="album-spine-title">COPA 2026</span>
                <span className="album-spine-brand">PANINI</span>
            </div>

            {/* Página esquerda — decorativa / capa interna */}
            <div className="album-page album-page--left">
                <div className="album-page-inner album-page-inner--left">
                    <div className="album-cover-art">
                        <div className="album-cover-emblem">⚽</div>
                        <div className="album-cover-title">FIFA WORLD CUP</div>
                        <div className="album-cover-year">2026</div>
                        <div className="album-cover-subtitle">USA · CANADA · MEXICO</div>
                    </div>
                </div>
            </div>

            {/* Página direita — conteúdo com slots */}
            <div className="album-page album-page--right">
                <div className="album-page-inner album-page-inner--right">
                    {pages.map(page => (
                        <AlbumPageComponent
                            key={page.country.id}
                            page={page}
                            onDrop={onDrop}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}