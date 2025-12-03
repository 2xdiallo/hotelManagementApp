import { useRef ,useEffect} from "react";

export function useOutsideClick(handler,listenerCapturePhase=true) {   
 const  ref = useRef();

 useEffect(() => {
    // 1. Define the handler function consistently
    function handleClick(e) {
        // Check if the click occurred outside the modal content (ref.current)
        if (ref.current && !ref.current.contains(e.target)) {
            handler();
            
        }
    }

    // 2. Add the listener, referencing the defined function
    // We add the listener on the capture phase (third argument is true) 
    // to ensure it runs *before* the click event bubbles up 
    // to any elements inside the modal, making it more reliable.
    document.addEventListener("click", handleClick, listenerCapturePhase); 

    // 3. Cleanup: Return a function that removes the EXACT SAME function reference
    return () => {
        document.removeEventListener("click", handleClick, listenerCapturePhase);
    };

// Dependency array: 'close' should be included as it's used inside the effect
}, [handler,listenerCapturePhase]);


return ref;

}