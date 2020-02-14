import React, { useState } from "react"
import ReactDOM from "react-dom"
import './index.less'

const AppData = () => {
  const [stateData, setAction] = useState(0)
  
  const handleAction = () => {
    setAction(stateData+1)
  }

  return(
    <div>
      <h1 id="sampleApp">
        You have click {stateData}
      </h1>
        <button onClick={handleAction} >
          Click
        </button>
    </div>
  )
}

ReactDOM.render(<AppData />, document.getElementById("rootId"));