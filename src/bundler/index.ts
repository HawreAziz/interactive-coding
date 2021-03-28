import * as esbuild from 'esbuild-wasm';
import { onFileResolvePlugin, onFileLoadPlugin } from './plugins'


let service: esbuild.Service;

type BundleTyp = (rawCode: string) => Promise<string>;

const bundle: BundleTyp = async (rawCode: string) => {
    if (!service) {
        service = await esbuild.startService({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.54/esbuild.wasm'
        });
    }

    try {
        const result = await service.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [onFileResolvePlugin(), onFileLoadPlugin(rawCode)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            },
        });
        return result.outputFiles[0].text;
    } catch (error) {
        return error.message;
    }
}

export default bundle;