import { motion } from "framer-motion"
import { type FunctionComponent, useEffect, useMemo, useState } from "react"
import useSWR from "swr"
import { createRainvillePlayer } from "../models/RainvillePlayer"

export const Splash: FunctionComponent = () => {
    const {
        data: rainvillePlayer,
        error: rainvillePlayerLoadError,
        isLoading: rainvillePlayerLoading
    } = useSWR("asyncResource:rainvillePlayer", () => createRainvillePlayer())

    if (rainvillePlayerLoadError) location.reload()

    const tracks = useMemo(() => {
        if (!rainvillePlayer) return []
        return rainvillePlayer.tracks.map((track) => track[0])
    }, [rainvillePlayer])

    const [paused, setPaused] = useState(true)
    useEffect(() => {
        if (rainvillePlayer) rainvillePlayer.paused = paused
    }, [paused, rainvillePlayer])

    const [trackNum, setTrackNum] = useState(5)
    useEffect(() => {
        if (rainvillePlayer) rainvillePlayer.trackNum = trackNum
    }, [trackNum, rainvillePlayer])

    const [poemShowed, setPoemShowed] = useState(false)
    const [controlsOpened, setControlsOpened] = useState(false)

    if (rainvillePlayerLoading) return null

    return (
        <div className="relative w-full h-full">
            <div className="absolute left-0 top-0 w-full h-full bg-gray-6">
                <div className="w-full h-30% flex flex-col justify-center items-center text-gray-5 text-xs font-serif">
                    <p>虞美人·听雨</p>
                    <p>蒋捷〔宋〕</p>
                    <p>少年听雨歌楼上，红烛昏罗帐。</p>
                    <p>壮年听雨客舟中，江阔云低、断雁叫西风。</p>
                    <p>而今听雨僧庐下，鬓已星星也。</p>
                    <p>悲欢离合总无情，一任阶前、点滴到天明。</p>
                </div>
                <div className="w-full h-4%" />
                <div style={{ scrollbarWidth: "none" }} className="w-full h-66% overflow-scroll">
                    {tracks.map((track, index) => (
                        <button
                            type="button"
                            className="bg-transparent px-6 py-3 w-full border-y-0.5 border-gray-7 text-left first:border-t-transparent last:border-b-transparent"
                            onClick={() => setTrackNum(index)}
                            key={track}
                        >
                            <motion.span
                                animate={{
                                    color: trackNum === index ? "white" : "rgb(229 231 235)",
                                    opacity: trackNum === index ? 1 : 0.6
                                }}
                                className={`text-gray-2 font-light text-[16px] ${trackNum === index ? "" : ""}`}
                            >
                                {track}
                            </motion.span>
                        </button>
                    ))}
                </div>
            </div>
            <motion.div
                animate={{
                    y: controlsOpened ? "-66%" : poemShowed ? "30%" : "0%",
                    borderRadius: controlsOpened || poemShowed ? "12px" : "0%"
                }}
                className="absolute flex flex-col justify-center items-center left-0 w-full h-full bg-light"
            >
                <motion.div
                    role="button"
                    animate={{ rotate: poemShowed ? 90 : 0, opacity: poemShowed ? 1 : 0 }}
                    whileHover={{ opacity: 1 }}
                    className={`${
                        poemShowed ? "i-mdi-close-circle-outline" : "i-mdi-info-outline"
                    } absolute color-gray-6 w-1.5rem h-1.5rem top-4 right-4`}
                    onClick={() => setPoemShowed((prev) => !prev)}
                />
                <div className="i-mdi-weather-snowy-rainy w-20 h-20 color-bluegray-6" />
                <div className="h-4" />
                <motion.div
                    role="button"
                    animate={{ rotate: paused ? 0 : 180 }}
                    className={`${paused ? "i-mdi-play" : "i-mdi-pause"} w-8 h-8 color-gray-6`}
                    onClick={() => setPaused((prev) => !prev)}
                />
                <motion.div
                    role="button"
                    animate={{ rotate: controlsOpened ? 180 : 0 }}
                    className="i-mdi-arrow-up absolute color-gray-6 w-1.5rem h-1.5rem bottom-2 left-[calc(50%-0.75rem)]"
                    onClick={() => setControlsOpened((prev) => !prev)}
                />
            </motion.div>
        </div>
    )
}
