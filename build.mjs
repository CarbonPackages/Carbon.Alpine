import esbuild from "esbuild";

const entryPoints = [
    "Resources/Private/Assets/*.js",
    "Resources/Private/Assets/Custom/*.ts",
    "Resources/Private/Assets/Plugins/*.js",
    "Resources/Private/Assets/UI/*.js",
];

const baseOptions = {
    logLevel: "info",
    bundle: true,
    minify: process.argv.includes("--production"),
    sourcemap: !process.argv.includes("--production"),
    target: "es2020",
    entryPoints,
    legalComments: "none",
};

const scriptOptions = {
    ...baseOptions,
    outdir: "Resources/Public/Scripts",
    format: "iife",
};

const moduleOptions = {
    ...baseOptions,
    outdir: "Resources/Public/Modules",
    format: "esm",
    splitting: true,
};

const pluginSourceOptions = {
    logLevel: "info",
    bundle: true,
    minify: false,
    sourcemap: false,
    target: "esnext",
    splitting: true,
    format: "esm",
    entryPoints: [
        "Resources/Private/Source/*.ts",
        "Resources/Private/Source/**/*.ts",
        "Resources/Private/Source/**/*.js",
    ],
    outdir: "Resources/Private/Bundled",
    legalComments: "none",
};

async function watch(options) {
    const context = await esbuild.context(options);
    await context.watch();
}

[scriptOptions, moduleOptions, pluginSourceOptions].forEach((options) => {
    process.argv.includes("--watch") ? watch(options) : esbuild.build(options);
});
