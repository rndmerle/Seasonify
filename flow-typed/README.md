To find if the module is providing Flow type declaration, and where :
`fgrep -rie "declare module" node_modules/theModule/*`

then import in [libs] section of .flowconfig :
`node_modules/theModule/somePath/*.flow`
