import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import serve from "rollup-plugin-serve";
import ignore from "./rollup-plugins/rollup-ignore-plugin.js";

const IGNORED_FILES = [];

const dev = process.env.ROLLUP_WATCH;

const serveOptions = {
    contentBase: ["./dist"],
    host: "0.0.0.0",
    port: 4000,
    allowCrossOrigin: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
};

const plugins = [
    ignore({
        files: IGNORED_FILES.map((file) => require.resolve(file)),
    }),
    typescript({
        declaration: false,
    }),
    nodeResolve(),
    json(),
    commonjs(),
    babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
    }),
    ...(dev ? [serve(serveOptions)] : [terser()]),
];

export default [
    {
        input: "src/muto.ts",
        output: {
            dir: "dist",
            format: "es",
        },
        plugins,
        inlineDynamicImports: true,
    },
];
