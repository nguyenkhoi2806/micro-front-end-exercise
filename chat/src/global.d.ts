declare module 'mixitup';

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: any };

declare module '*.module.css';
declare module '*.module.scss';

interface Window {
  init: any;
  get: any;
}