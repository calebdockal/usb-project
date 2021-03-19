import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "react-dropdown/style.css";
import "./App.css";
import companyLogo from "./assets/logo.jpg";
import Axios from "axios";

// Caleb Dockal

function App() {
  var datetime = new Date().toLocaleString();
  // These following functions will determine whether to hide or show a specific dropdown
  const [showAssembly, setShowAssembly] = useState(false);

  const [showCasting, setShowCasting] = useState(false);

  const [showPasting, setShowPasting] = useState(false);

  const [showOxide, setShowOxide] = useState(false);

  const [showFormation, setShowFormation] = useState(false);

  const [showFinishing, setShowFinishing] = useState(false);

  const [shift, setShift] = useState("");
  const [department, setDepartment] = useState("");
  const [summary, setSummary] = useState("");
  const [scrapList, setScrapList] = useState([]);
  const [machine, setMachine] = useState("");
  const [amount, setAmount] = useState("");

  // This function will allow workers to note what shift they are making this report on
  const handleShift = (e) => {
    console.log(e);
    setShift(e);
  };

  
  var handleMachineSelect = (e) => {
    console.log(e);
    setMachine(e);
  };

  const handleSelect = (e) => {
    setDepartment(e);
    console.log(e);
    console.log("This is a change made for testing");

    if (e === "Assembly") {
      setShowAssembly(true);
    } else if (e === "Casting") {
      setShowCasting(true);
    } else if (e === "Pasting") {
      setShowPasting(true);
    } else if (e === "Oxide") {
      setShowOxide(true);
    } else if (e === "Finishing") {
      setShowFinishing(true);
    } else if (e === "Formation") {
      setShowFormation(true);
    }
  };
  // This function will update the list on mounting of the component
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get")
      .then((response) => {
        setScrapList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // This is the backend communication portion
  // This function submits user data to the backend database and updates the information on the page

  const submitSummary = () => {
    Axios.post("http://localhost:3001/api/insert", {
      department: department,
      machine: machine,
      summary: summary,
      datetime: datetime,
      shift: shift,
      amount: amount,
    });

    setScrapList([
      ...scrapList,
      {
        department: department,
        machine: machine,
        summary: summary,
        datetime: datetime,
        shift: shift,
        amount: amount,
      },
    ]);

    alert("Submitted!");
  };

  // This function deletes the information out of the database, and updates the list on the front end to reflect changes

  const deleteList = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setScrapList(
        scrapList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <div className="image">
        <img src={companyLogo} alt="logo" />
      </div>
      <body>
        <div className="title">
          <h1 style={{ color: "white" }}>Scrap</h1>
        </div>

        <p className="App-intro"></p>
        <div className="mainBody">
          <p>Note: </p>
          <p>
            If you are unsure of which department or machine, do your best to
            choose and leave a description in the "Scrap Reason" section
          </p>
          <p>Enter department: </p>
          <DropdownButton
            alignRight
            title="Department"
            id="dropdown-menu"
            onSelect={(e) => handleSelect(e)}
          >
            <Dropdown.Item eventKey="Assembly">Assembly</Dropdown.Item>
            <Dropdown.Item eventKey="Casting">Casting</Dropdown.Item>
            <Dropdown.Item eventKey="Pasting">Pasting</Dropdown.Item>
            <Dropdown.Item eventKey="Oxide">Oxide</Dropdown.Item>
            <Dropdown.Item eventkey="Formation">Formation</Dropdown.Item>
            <Dropdown.Item eventkey="Finishing">Finishing</Dropdown.Item>
          </DropdownButton>
          <div className="selection">
            <p>You've Selected: {department}</p>
          </div>
          <div>
            {showAssembly ? (
              <div className="assemblyList">
                <DropdownButton
                  title="Assembly Machine"
                  alignRight
                  id="dropdown-menu-three"
                  onSelect={(e) => handleMachineSelect(e)}
                >
                  <Dropdown.Item eventKey="Assembly 1">
                    Assembly 1
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Assembly 2">
                    Assembly 2
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            ) : null}
          </div>
          {showCasting ? (
            <div>
              <DropdownButton
                title="Casting Machine"
                alignRight
                onSelect={(e) => handleMachineSelect(e)}
              >
                <Dropdown.Item eventKey="Casting 1">
                  Casting Bank 1
                </Dropdown.Item>
                <Dropdown.Item eventKey="Casting 2">
                  Casting Bank 2
                </Dropdown.Item>
                <Dropdown.Item eventKey="Casting 3">
                  Casting Bank 3
                </Dropdown.Item>
                <Dropdown.Item eventKey="Casting 4">
                  Casting Bank 4
                </Dropdown.Item>
                <Dropdown.Item eventKey="Casting 5">
                  Casting Bank 5
                </Dropdown.Item>
                <Dropdown.Item eventKey="Casting 6">
                  Casting Bank 6
                </Dropdown.Item>
                <Dropdown.Item eventKey="Casting 7">
                  Casting Bank 7
                </Dropdown.Item>
                <Dropdown.Item eventKey="Casting 8">
                  Casting Bank 8
                </Dropdown.Item>
                <Dropdown.Item eventKey="Casting 9">
                  Casting Bank 9
                </Dropdown.Item>
                <Dropdown.Item eventKey="Casting 10">
                  Casting Bank 10
                </Dropdown.Item>
              </DropdownButton>
            </div>
          ) : null}

          {showPasting ? (
            <div>
              <DropdownButton
                title="Pasting Machine"
                alignRight
                onSelect={(e) => handleMachineSelect(e)}
              >
                <Dropdown.Item eventKey="Pasting 1">
                  Pasting Line 1
                </Dropdown.Item>
                <Dropdown.Item eventKey="Pasting 2">
                  Pasting Line 2
                </Dropdown.Item>
                <Dropdown.Item eventKey="Pasting 2">
                  Pasting Oven 1
                </Dropdown.Item>
                <Dropdown.Item eventKey="Pasting 2">
                  Pasting Oven 2
                </Dropdown.Item>
                <Dropdown.Item eventKey="Pasting 2">
                  Pasting Oven 3
                </Dropdown.Item>
                <Dropdown.Item eventKey="Pasting 2">
                  Pasting Oven 4
                </Dropdown.Item>
                <Dropdown.Item eventKey="Pasting 2">
                  Pasting Oven 5
                </Dropdown.Item>
                <Dropdown.Item eventKey="Pasting 2">
                  Pasting Oven 6
                </Dropdown.Item>
                <Dropdown.Item eventKey="Pasting 2">
                  Pasting Oven 7
                </Dropdown.Item>
                <Dropdown.Item eventKey="Pasting 2">
                  Pasting Oven 8
                </Dropdown.Item>
              </DropdownButton>
            </div>
          ) : null}

          {showOxide ? (
            <div>
              <DropdownButton
                title="Oxide Machine"
                alignRight
                onSelect={(e) => handleMachineSelect(e)}
              >
                <Dropdown.Item eventKey="Oxide 1">Oxide Mill 1</Dropdown.Item>
                <Dropdown.Item eventKey="Oxide 1">Oxide Mill 2</Dropdown.Item>
                <Dropdown.Item eventKey="Oxide 1">Oxide Mill 3</Dropdown.Item>
              </DropdownButton>
            </div>
          ) : null}

          {showFormation ? (
            <div>
              <DropdownButton
                title="Formation Machine"
                alignRight
                onSelect={(e) => handleMachineSelect(e)}
              >
                <Dropdown.Item eventKey="Formation 1">
                  Formation 1
                </Dropdown.Item>
              </DropdownButton>
            </div>
          ) : null}

          {showFinishing ? (
            <div>
              <DropdownButton
                title="Finishing Machine"
                alignRight
                onSelect={(e) => handleMachineSelect(e)}
              >
                <Dropdown.Item eventKey="Finishing 1">
                  Finishing 1
                </Dropdown.Item>
              </DropdownButton>
            </div>
          ) : null}
          <div className="selectedItem">
            <p>You've Selected: {machine}</p>
          </div>

          <DropdownButton
            alignRight
            title="Shift"
            id="dropdown-menu-two"
            onSelect={(e) => handleShift(e)}
          >
            <Dropdown.Item eventKey="Shift 1">Shift 1</Dropdown.Item>
            <Dropdown.Item eventKey="Shift 2">Shift 2</Dropdown.Item>
            <Dropdown.Item eventKey="Shift 3">Shift 3</Dropdown.Item>
          </DropdownButton>
          <div className="selection">You've selected: {shift}</div>
          <div className="scrapSection">
            <p>Enter Scrap Reason Here: </p>
            <input
              placeholder="scrap reason"
              type="text"
              name="summary"
              onChange={(e) => {
                setSummary(e.target.value);
              }}
            />
          </div>
          <div className="scrapAmount">
            <p>Scrap Amount (lbs.)</p>
            <input
              placeholder="amount (lbs.)"
              type="text"
              name="scrapAmount"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>

          <div className="submitBtn">
            <button onClick={submitSummary}>Submit</button>
          </div>
          <div className="listCards">
            {scrapList.map((val) => {
              return (
                <div className="card">
                  <h1 style={{ color: "white" }}>{val.department}</h1>
                  <p style={{ color: "white" }}>{val.summary}</p>
                  <p style={{ color: "white" }}>{val.datetime}</p>
                  <p style={{ color: "white" }}>{val.shift}</p>
                  <p style={{ color: "white" }}>{val.machine}</p>
                  <div className="deleteBtn">
                    <button
                      onClick={() => {
                        console.log("Clicked Delete");
                        deleteList(val.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
