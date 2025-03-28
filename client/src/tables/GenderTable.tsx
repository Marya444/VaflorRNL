import { Link } from "react-router-dom";

const GenderTable = () => {
  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>No.</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Male</td>
            <td>
              <div className="btn-group">
                <Link className="btn btn-success" 
                >Edit</Link>
                <Link className="btn btn-danger">Delete</Link>
              </div>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Female</td>
            <td>
              <div className="btn-group">
                <Link className="btn btn-success">Edit</Link>
                <Link className="btn btn-danger">Delete</Link>
              </div>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Others</td>
            <td>
              <div className="btn-group">
                <Link className="btn btn-success">Edit</Link>
                <Link className="btn btn-danger">Delete</Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default GenderTable;
