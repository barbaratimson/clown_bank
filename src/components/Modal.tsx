import { useState } from "react"

function Modal({children,active,setActive}:any) {
    return (
            <div className={`modal ${active ? "active" : ""}`} onClick={()=>setActive(false)}>
            <div className={"modal-content"} onClick={(e)=>e.stopPropagation()}>
            <div className='modal-close' onClick={()=>setActive(false)}>X</div>
                {children}
                </div>
                </div>
                
                )
  }

  export default Modal;