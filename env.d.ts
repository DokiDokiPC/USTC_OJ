/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  // 在这里添加相应条目
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
