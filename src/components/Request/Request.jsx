import "./Request.scss"
import Datable from "../DataTable/DataTable"

const Request = ({columns}) => {
  return (
    <div className="request">
      <div className="requestContainer">
        <Datable columns={columns}/>
      </div>
    </div>
  )
}

export default Request


