import "./Requests.scss"
import DataTable from "../DataTable/DataTable"

const Requests = ({columns}) => {
  return (
    <div className="request">
      <div className="requestContainer">
        <DataTable columns={columns}/>
      </div>
    </div>
  )
}

export default Requests


