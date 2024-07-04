import { PropsWithChildren, useRef } from "react";

interface Props
{
    visible : boolean
    onCloseModal : () => void
}

export function OverlayPage ({visible, onCloseModal, children} : PropsWithChildren<Props>)
{
  const overlayRef = useRef(null)

  return (
    <div
      ref={overlayRef}
      onClick={e =>{if(e.target === overlayRef.current) onCloseModal()}}
      className={`${visible ? 'flex' : 'hidden'} fixed inset-0 bg-gray-900 bg-opacity-50 items-center justify-center z-50`}>
          {children}
    </div>
  );
}