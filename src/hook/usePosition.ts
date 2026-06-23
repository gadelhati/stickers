import { useEffect, useState } from "react"

export const usePosition = () => {
    const [ movement, setMovement ] = useState({
        backgroundColor: 'lightblue',
        transform: `perspective(1000px) rotateX(0deg)`,
        boxShadow: `0px 0px 21px 5px rgba(0,0,0,0.54)`,
    })
    useEffect(()=>{
        const box = document.querySelector("body")
        const setParalax = (event: MouseEvent) => {
            if (box) {
                let abcissa: number = Math.floor((event.pageX * 100)/box?.offsetWidth -50)
                let ordenada: number = Math.floor((event.pageY * 100)/box?.offsetHeight -50)
                setMovement({
                    backgroundColor: `rgb(${event.clientX % 255}, ${event.clientY % 255}, 150)`,
                    transform: `perspective(1000px) rotateY(${abcissa}deg) rotateX(${ordenada*-1}deg)`,
                    boxShadow: `${abcissa*-1}px ${ordenada*-1}px 21px 5px rgba(0,0,0,0.54)`,
                });
            }
        }
        if (box) {
            box.addEventListener("mousemove", setParalax);
        }
        return (()=>{
            if (box) {
                box.removeEventListener("mousemove", setParalax);
            }
        })
    }, [])
    return { movement }
}