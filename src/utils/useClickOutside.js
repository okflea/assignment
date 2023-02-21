import { useEffect, useRef } from "react";

  // the ref and useEffect is for closing chat when clicked outside the chatbox
let useClickOutside = (handler)=>{
  const domNode = useRef()
  useEffect(() => {
    const maybeHandler = (e) => {
      if (!domNode.current.contains(e.target))
        handler();
    }
    document.addEventListener('mousedown', maybeHandler)
    return () => {
      document.removeEventListener('mousedown', maybeHandler)
    }
  })
  return domNode;
}
export default useClickOutside;
