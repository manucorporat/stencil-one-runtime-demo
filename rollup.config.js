import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default {
  input: {
    'main-rollup': 'src/index.js'
  },
  output: {
    dir: 'dist/',
    format: 'es'
  },
  plugins: [
    resolve(),
    // terser({
    //   compress: {
    //     passes: 4,
    //     pure_funcs: ['getHostRef'],
    //     global_defs: {
    //       'STENCIL_SOURCE_TARGET': 'es2017',
    //       'STENCIL_PATCH_IMPORT': true
    //     }
    //   },
    //   mangle: {
    //     properties: {
    //       regex: /^\$.+\$$/,
    //     }
    //   }
    // })
  ]
};