declare module 'mixitup';
declare var $: any;

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: any };

declare module '*.module.css';
declare module '*.module.scss';

interface Window {
  init: any;
  get: any;
}

declare global {
  interface JQuery {
    owlCarousel(options?: any): JQuery;
    slicknav(options?: any): JQuery;
    niceSelect(): JQuery
  }
}
