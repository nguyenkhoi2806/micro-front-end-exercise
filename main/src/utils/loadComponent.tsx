import React, { lazy, useEffect, useState, useRef, RefObject } from 'react';
import { remotes } from '@/remotesConfig';

type Module = keyof typeof remotes
interface Params {
  module: Module
  component: string
  props?: any
  FallbackComponent?: () => JSX.Element
  lang?: string
  token?: string
  theme?: string
}

const FallbackComponent = () => {
  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#cccccc' }} />
  )
}

const defaultParams = {
  lang: 'en',
  theme: 'light',
  FallbackComponent
}

const loadComponent = (scope: string, module: string) => {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    // @ts-ignore
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    return factory();
  };
}

const urlCache = new Set();
export const useDynamicScript = (url: string) => {
  const [ready, setReady] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    if (urlCache.has(url)) {
      setReady(true);
      setErrorLoading(false);
      return;
    }

    setReady(false);
    setErrorLoading(false);

    const element = document.createElement('script');

    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    element.onload = () => {
      urlCache.add(url);
      setReady(true);
    };

    element.onerror = () => {
      setReady(false);
      setErrorLoading(true);
    };

    document.head.appendChild(element);

    return () => {
      urlCache.delete(url);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    errorLoading,
    ready
  };
};

const componentCache = new Map();
export const UseFederatedComponent = (remoteUrl: string, scope: string, module: string) => {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [component, setComponent] = useState(null);
  const { ready, errorLoading } = useDynamicScript(remoteUrl);

  useEffect(() => {
    if (component) setComponent(null);
  }, [key]);

  useEffect(() => {
    if (ready && !component) {
      const Comp = lazy(loadComponent(scope, module));
      componentCache.set(key, Comp);
      // @ts-ignore
      setComponent(Comp);
    }
  }, [component, ready, key]);

  return { errorLoading, component };
};

// export const loadRemoteComponent = (module: string, component: string) => {
//   // @ts-ignore
//   const { url, scope } = remotes[module];
//   const { component: FederatedComponent, errorLoading } = UseFederatedComponent(url, scope, component);

//   return (
//     <Suspense fallback="Loading System">
//       {errorLoading
//         ? `Error loading remote module: "${module} - ${component}"`
//         // @ts-ignore
//         : FederatedComponent && <FederatedComponent />}
//     </Suspense>
//   )
// };

export const mountRemoteComponent = (params: Params) => {
  // @ts-ignore
  const { module, component, props, FallbackComponent } = { ...defaultParams, ...params }
  const { url, scope } = remotes[module];
  const { ready, errorLoading } = useDynamicScript(url);
  const divRef: RefObject<HTMLDivElement> = useRef(null);

  const loadRemoteComponent = async () => {
    await __webpack_init_sharing__('default');
    const container = window[scope as any]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(component);
    return factory();
  };

  useEffect(() => {
    if (divRef.current) {
      if (errorLoading) {
        divRef.current.innerText = `Error loading remote module: "${module} - ${component}"`;
      }

      if (ready) {
        const Comp = loadRemoteComponent();
        Comp.then(mountComponent => {
          return props ? mountComponent.default(divRef.current, props) : mountComponent.default(divRef.current);
        });
      }
    }
  }, [divRef, ready, errorLoading, props]);

  return (
    <>
      {errorLoading && !ready && FallbackComponent ? <FallbackComponent /> : <div className='mount-slot' ref={divRef} />}
    </>
  )
};
