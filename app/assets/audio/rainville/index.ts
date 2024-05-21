import audioContext from "../audioContext"

const audioBuffers: AudioBuffer[] = []
export default Promise.all(
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        .map((num) => new URL(`./${num}.wav`, import.meta.url))
        .map(async (audioURL, index) => {
            const response = await fetch(audioURL)
            const arrayBuffer = await response.arrayBuffer()
            audioBuffers[index] = await audioContext.decodeAudioData(arrayBuffer)
        })
).then(
    () =>
        [
            ["深邃", audioBuffers[0] as AudioBuffer],
            ["隆隆", audioBuffers[1] as AudioBuffer],
            ["乌云", audioBuffers[2] as AudioBuffer],
            ["夏日", audioBuffers[3] as AudioBuffer],
            ["点滴", audioBuffers[4] as AudioBuffer],
            ["清润", audioBuffers[5] as AudioBuffer],
            ["都市", audioBuffers[6] as AudioBuffer],
            ["阳台", audioBuffers[7] as AudioBuffer],
            ["淅沥", audioBuffers[8] as AudioBuffer],
            ["白噪", audioBuffers[9] as AudioBuffer]
        ] as const
)
