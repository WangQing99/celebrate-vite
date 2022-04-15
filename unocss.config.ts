import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetUno,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

export default defineConfig({
    include: [`${__dirname}/**/*`],
    exclude: [`${__dirname}/node_modules/**/*`],
    shortcuts: [],
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
            warn: true,
        }),
    ],
    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ]
})
