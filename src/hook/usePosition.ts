import { useEffect, useState } from "react"

type Movement = {
    backgroundColor: string
    transform: string
    boxShadow: string
}

const DEFAULT: Movement = {
    backgroundColor: 'lightblue',
    transform: `perspective(1000px) rotateX(0deg)`,
    boxShadow: `0px 0px 21px 5px rgba(0,0,0,0.54)`,
}

interface UsePositionOptions {
    /** Só registra listeners se enabled=true. Default: false */
    enabled?: boolean
    /** Elemento container para calcular posição relativa (opcional) */
    containerRef?: React.RefObject<HTMLElement | null>
}

export const usePosition = (options: UsePositionOptions = {}) => {
    const { enabled = false, containerRef } = options
    const [movement, setMovement] = useState<Movement>(DEFAULT)

    useEffect(() => {
        if (!enabled) {
            setMovement(DEFAULT)
            return
        }

        const isMobile = () =>
            /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
            ('ontouchstart' in window)

        const MAX_DEG = 65
        const clamp = (v: number) => Math.max(-MAX_DEG, Math.min(MAX_DEG, v))

        const handleMouse = (event: MouseEvent) => {
            if (containerRef?.current) {
                const rect = containerRef.current.getBoundingClientRect()
                const x = event.clientX - rect.left
                const y = event.clientY - rect.top
                const raw_a = (x / rect.width) * 100 - 50
                const raw_o = (y / rect.height) * 100 - 50
                const abscissa = clamp(raw_a * 0.45)
                const ordinate = clamp(raw_o * 0.45)
                setMovement({
                    backgroundColor: `rgb(${Math.floor(x % 255)}, ${Math.floor(y % 255)}, 150)`,
                    transform: `perspective(1000px) rotateY(${abscissa}deg) rotateX(${ordinate * -1}deg)`,
                    boxShadow: `${abscissa * -1}px ${ordinate * -1}px 21px 5px rgba(0,0,0,0.54)`,
                })
            } else {
                const { innerWidth: w, innerHeight: h } = window
                const raw_a = (event.pageX * 100) / w - 50
                const raw_o = (event.pageY * 100) / h - 50
                const abscissa = clamp(raw_a * 0.45)
                const ordinate = clamp(raw_o * 0.45)
                setMovement({
                    backgroundColor: `rgb(${event.clientX % 255}, ${event.clientY % 255}, 150)`,
                    transform: `perspective(1000px) rotateY(${abscissa}deg) rotateX(${ordinate * -1}deg)`,
                    boxShadow: `${abscissa * -1}px ${ordinate * -1}px 21px 5px rgba(0,0,0,0.54)`,
                })
            }
        }

        const handleOrientation = (event: DeviceOrientationEvent) => {
            const beta  = Math.max(-45, Math.min(45, event.beta  ?? 0))
            const gamma = Math.max(-45, Math.min(45, event.gamma ?? 0))
            const abscissa = clamp((gamma / 45) * MAX_DEG)
            const ordinate = clamp(((beta - 10) / 45) * MAX_DEG)
            const r = Math.floor(((gamma + 90) / 180) * 255)
            const g = Math.floor(((beta  + 90) / 180) * 255)
            setMovement({
                backgroundColor: `rgb(${r}, ${g}, 150)`,
                transform: `perspective(1000px) rotateY(${abscissa}deg) rotateX(${ordinate * -1}deg)`,
                boxShadow: `${abscissa * -1}px ${ordinate * -1}px 21px 5px rgba(0,0,0,0.54)`,
            })
        }

        const handleTouch = (event: TouchEvent) => {
            const touch = event.touches[0]
            if (!touch) return
            const { innerWidth: w, innerHeight: h } = window
            const raw_a = (touch.clientX * 100) / w - 50
            const raw_o = (touch.clientY * 100) / h - 50
            const abscissa = clamp(raw_a * 0.45)
            const ordinate = clamp(raw_o * 0.45)
            setMovement({
                backgroundColor: `rgb(${Math.floor(touch.clientX % 255)}, ${Math.floor(touch.clientY % 255)}, 150)`,
                transform: `perspective(1000px) rotateY(${abscissa}deg) rotateX(${ordinate * -1}deg)`,
                boxShadow: `${abscissa * -1}px ${ordinate * -1}px 21px 5px rgba(0,0,0,0.54)`,
            })
        }

        if (isMobile()) {
            if (
                typeof DeviceOrientationEvent !== 'undefined' &&
                typeof (DeviceOrientationEvent as any).requestPermission === 'function'
            ) {
                ;(DeviceOrientationEvent as any)
                    .requestPermission()
                    .then((state: string) => {
                        if (state === 'granted') {
                            window.addEventListener('deviceorientation', handleOrientation)
                        } else {
                            window.addEventListener('touchmove', handleTouch, { passive: true })
                        }
                    })
                    .catch(() => {
                        window.addEventListener('touchmove', handleTouch, { passive: true })
                    })
            } else if (typeof DeviceOrientationEvent !== 'undefined') {
                window.addEventListener('deviceorientation', handleOrientation)
            } else {
                window.addEventListener('touchmove', handleTouch, { passive: true })
            }
        } else {
            window.addEventListener('mousemove', handleMouse)
        }

        return () => {
            window.removeEventListener('mousemove', handleMouse)
            window.removeEventListener('deviceorientation', handleOrientation)
            window.removeEventListener('touchmove', handleTouch)
        }
    }, [enabled, containerRef])

    return { movement }
}