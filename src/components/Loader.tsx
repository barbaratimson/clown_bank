import { useState } from "react"

function Loader() {
    const [active, setActive] = useState(true)
    return (
            <div className="Loader" onClick={()=>setActive(false)}>
                </div>
                
                )
  }

  export default Loader;