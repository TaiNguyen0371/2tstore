import { useEffect, useRef } from "react";

function useIntersectionObserver(ref: any, options = {}) {
  console.log(ref);
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    if (ref.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn"); // Corrected class name
          } else {
            entry.target.classList.remove("animate-fadeIn"); // Corrected class name
          }
        });
      }, options);

      observerRef.current.observe(ref.current);
    }

    // Cleanup function to disconnect observer on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref, options]); // Only re-run when ref or options change
}
export default useIntersectionObserver;
