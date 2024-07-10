import { AiFillAppstore, AiFillFile } from "react-icons/ai";
import { FaGear } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [payload, setPayload] = useState({
    from: "2024-06-03",
    to: "2024-07-09",
    department: "All",
    status: "All",
    mobile: "",
    lab_center: "All",
    patient_uid: null,
    patientName: null,
  });
  const [data, setData] = useState([]);

  const onChange = (e) => {
    console.log(e.target.name, "  =  ", e.target.value);
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiI2NjM5QzAwMzQyRENCIiwicGFydG5lcl9pZCI6IjY1RDVCODMyRTREQzIiLCJsYWJfbmFtZSI6IlN0YXIgTGFicyIsImxhYl9wcm9maWxlIjoiLi91cGxvYWRzL2xhYlByb2ZpbGUvNjY2YWMwZDMxMjMwYi5qcGciLCJwaG9uZSI6Ijg4MzkzOTU3NDAiLCJlbWFpbCI6ImtoZWxlbmRyYTMyMUBnbWFpbC5jb20iLCJzdGF0ZSI6IkNoaGF0dGlzZ2FyaCIsImRpc3RyaWN0IjoiRHVyZyIsInBpbmNvZGUiOiI0OTAwMjMiLCJhZGRyZXNzIjoiU3RyZWV0LTcsIEhvdXNlIG5vLi02NTMsIE5lYXIgU2FpbnQgWGF2aWVyJ3MgU2Nob29sLCBTaGFudGluYWdhciIsInBhc3N3b3JkIjoiOTE0YjBhZTJkYWJjNDZiMmU1MWI0MjQwMTEyODU1MjciLCJ1c2VyX3R5cGUiOiJBRE1JTiIsInBlcm1pc3Npb25zIjpudWxsLCJlX2xvY2tlcl9pc19hY3RpdmUiOnRydWV9.E5vgIG2AHOuYSqulik5zr-WVrcHZ39aVTU94EwayJmQ";
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitted");
    let data = new FormData();
    data.append("from", payload.from);
    data.append("to", payload.to);
    data.append("department", payload.department);
    data.append("status", payload.status);
    data.append("patient_uid", payload.patient_uid);
    data.append("patientName", payload.patientName);
    data.append("mobile", payload.mobile);
    data.append("lab_center", payload.lab_center);

    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://healthbox.vedikaopticals.com/Api/fetchPatientReports",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          if (response.data.status === true) setData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-icon">
          <AiFillAppstore />
        </div>
        <div className="App-icon">
          <AiFillAppstore />
        </div>
        <div className="App-icon">
          <AiFillFile />
        </div>
        <div className="App-icon">
          <AiFillAppstore />
        </div>
      </header>
      <div className="FormContainer">
        <form onSubmit={handleSubmit}>
          <div className="DateContainer">
            <div>
              <p className="inputHeader">From</p>
              <input
                type="date"
                placeholder="from"
                name="from"
                className="DateInput"
                onChange={onChange}
              />
            </div>
            <div>
              <p className="inputHeader">To</p>
              <input
                type="date"
                placeholder="to"
                name="to"
                className="DateInput"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="inputContainer">
            <p className="inputHeader">Patient ID</p>
            <input
              type="text"
              placeholder="ENter Patient ID"
              className="Input"
              onChange={onChange}
              name="patient_uid"
            />
          </div>
          <div className="inputContainer">
            <p className="inputHeader">Patient Name</p>
            <input
              type="text"
              placeholder="ENter Patient ID"
              className="Input"
              onChange={onChange}
              name="patientName"
            />
          </div>
          <div className="inputContainer">
            <p className="inputHeader">Patient Mobile</p>
            <input
              type="text"
              placeholder="Enter Patient Mobile"
              className="Input"
              onChange={onChange}
              name="mobile"
            />
          </div>
          <div className="inputContainer">
            <p className="inputHeader">Lab Centers</p>
            <select className="dropdown" name="lab_center" onChange={onChange}>
              <option value="all">All</option>

              <option value="1">1</option>

              <option value="2">2</option>
            </select>
          </div>
          <div className="inputContainer">
            <p className="inputHeader">Department</p>
            <select className="dropdown" name="department" onChange={onChange}>
              <option value="all">All</option>

              <option value="1">1</option>

              <option value="2">2</option>
            </select>
          </div>
          <div className="inputContainer">
            <p className="inputHeader">Status</p>
            <select className="dropdown" name="status" onChange={onChange}>
              <option value="all">All</option>

              <option value="1">1</option>

              <option value="2">2</option>
            </select>
          </div>

          <input className="submit" type="submit" value="Search" />
        </form>
      </div>
      <div className="TableContainer">
        <table className="table">
          <tr className="tableHeader">
            <th>Report Details</th>
            <th>Patient Details</th>
            <th>Refferer Name</th>
            <th>Total Tests</th>
            <th>Actions</th>
          </tr>
          {data.map((report, key) => {
            return (
              <tr key={key}>
                <td>
                  <p className="reportID">({report.report_uid})</p>
                  <p>{report.lab_center_name}</p>
                  <p className="centerID">{report.center_uid}</p>
                </td>
                <td>
                  <p className="reportID">({report.patient_uid})</p>
                  <p>{report.patient_details.patient_name}</p>
                  <p>
                    {report.patient_details.age} Years /{" "}
                    {report.patient_details.gender}
                  </p>
                </td>
                <td>
                  {report.refferer_details.length !== 0
                    ? report.refferer_details.doctor_name
                    : "SELF"}
                </td>
                <td>{report.testDetails.length}</td>
                <td>
                  <Link to={{ pathname: "/details", state: "report" }}>
                    <FaGear />
                  </Link>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Home;
