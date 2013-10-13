{
    baseUrl: "app/",
    name: "../lib/require/almond-custom",
    inlineText: true,
    stubModules: [
        "../lib/require/text"
    ],
    paths: {
        "jquery": "../lib/jquery/jquery-1.9.1",
        "knockout": "../lib/knockout/knockout-2.3.0.debug",
        "text": "../lib/require/text",
        "durandal": "../lib/durandal/js",
        "plugins": "../lib/durandal/js/plugins",
        "transitions": "../lib/durandal/js/transitions"
    },
    mainConfigFile: "app/main.js",
    include: [
        "main",
        "viewmodels/flickr",
        "viewmodels/shell",
        "viewmodels/welcome",
        "text!views/detail.html",
        "text!views/flickr.html",
        "text!views/shell.html",
        "text!views/welcome.html"
    ],
    exclude: [],
    keepBuildDir: true,
    optimize: "none",
    pragmas: {
        build: true
    },
    wrap: true,
    insertRequire: [
        "main"
    ],
    out: 'build/app/main.js'
}