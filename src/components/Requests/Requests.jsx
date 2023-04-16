import "./Requests.scss"
import Datable from "../DataTable/DataTable"

const Requests = ({columns}) => {
  return (
    <div className="request">
      <div className="requestContainer">
        <Datable columns={columns}/>
      </div>
    </div>
  )
}

export default Requests


