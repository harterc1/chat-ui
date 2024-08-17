import { useRef, useEffect } from 'react';

/**
 * If you want the callback to fire immediately, you can use immediate = true.
 * Note that you can control what "immediately" means by passing callback = null until
 * callback is actually ready (depends on the situation).
 * 
 * @param {*} callback 
 * @param {*} interval 
 * @param {*} immediate 
 */
const useInterval = (callback: () => void, interval: number, immediate = false) => {
  const ref = useRef<() => void>();
  const hasFired = useRef(false);

  useEffect(() => {
    ref.current = callback;
    if (ref.current && !hasFired.current && immediate) {
      hasFired.current = true
      ref.current()
    }
  }, [callback, immediate]);

  useEffect(() => {
    const id = setInterval(() => {
      if (ref.current) {
        ref.current()
      }
    }, interval);
    return () => clearInterval(id);
  }, [interval]);
};

export default useInterval;