
declare module 'vite-plugin-eslint' {
  import type { Plugin } from 'vite';
  
  export interface ESLintOptions {
    cache?: boolean;
    include?: string | string[];
    exclude?: string | string[];
    throwOnError?: boolean;
    throwOnWarning?: boolean;
    emitWarning?: boolean;
    emitError?: boolean;
    failOnWarning?: boolean;
    failOnError?: boolean;
    lintOnStart?: boolean;
    overrideConfig?: Record<string, any>;
    overrideConfigFile?: string;
  }
  
  export default function(options?: ESLintOptions): Plugin;
}
