import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';
import axios from 'axios';

const fileCache = localforage.createInstance({ name: 'file-chache' });


export const onFileLoadPlugin = (inputCode: string) => {
    return {
        name: 'onload-plugin',
        setup(build: esbuild.PluginBuild) {

            // filter index.js
            build.onLoad({ filter: /^index\.js$/ }, () => {
                return {
                    loader: 'jsx',
                    contents: inputCode
                }
            })

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const itemData = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
                if (itemData) {
                    return itemData
                }
            })

            // Filter css files
            build.onLoad({ filter: /.css$/ }, async (args: any) => {
                const { data, request } = await axios.get(args.path);
                const expected = data.replaceAll('\n', '')
                    .replaceAll("'", "\\'")
                    .replaceAll('"', '\\"');

                const contents = `
                          const style = document.createElement('style');
                          style.innerText = '${expected}';
                          document.head.appendChild(style);
                        `;

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL('./', request.responseURL).pathname
                }
                await fileCache.setItem(args.path, result);
                return result;
            })


            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const { data, request } = await axios.get(args.path);
                const responseData: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname
                }

                await fileCache.setItem(args.path, responseData);
                return responseData;
            })
        }
    }
}