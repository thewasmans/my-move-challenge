import { PropsWithChildren } from "react";

interface Props
{
    visible : boolean
    onCloseModal : () => void
}

export function OverlayPage ({visible, onCloseModal, children} : PropsWithChildren<Props>)
{
  return (
    <div onClick={_ => onCloseModal()}
        className={`${visible ? 'flex' : 'hidden'} fixed inset-0 bg-gray-900 bg-opacity-50 items-center justify-center z-50`}>
          {children}
    </div>
  );
}