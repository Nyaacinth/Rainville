import presetIcons from "@unocss/preset-icons"
import presetUno from "@unocss/preset-uno"
import transformerVariantGroup from "@unocss/transformer-variant-group"

import { defineConfig } from "unocss"

export default defineConfig({
    presets: [presetUno(), presetIcons()],
    transformers: [transformerVariantGroup()]
})
