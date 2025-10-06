import React, { useState } from "react";
import "./App.css";
import { FaInfoCircle, FaBars, FaAngleLeft, FaUniversity, FaHome } from "react-icons/fa";
import charusatImg from "./images/charusat.webp";
import depstarImg from "./images/depstar.png";
function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [activePage, setActivePage] = useState("");

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = () => setShowSubmenu(!showSubmenu);

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return (
          <div className="home-page">
            <div className="home-content">
              <h2>Welcome to My Home Page</h2>
              <p>
                This is your central place to access information about CHARUSAT, DEPSTAR, and the CSE department.
              </p>
            </div>
          </div>
        );
      case "charusat":
        return (
          <div className="content-section">
            <h1>Welcome to CHARUSAT</h1>
            <div className="charusat-container">
              <div className="charusat-left">
                <img src={charusatImg} width="300" alt="CHARUSAT Logo" />
                <p>CHARUSAT is a premier university located in Gujarat.</p>
              </div>

              <div className="charusat-right">
                <div className="card">
                  <h2 className="card-title">Vision</h2>
                  <p className="card-text">
                    To become dynamic global institution in a knowledge driven world
                    through excellence in teaching, research and social contribution.
                  </p>
                </div>
                <div className="card">
                  <h2 className="card-title">Mission</h2>
                  <p className="card-text">
                    To serve society by striving to transform it through creation,
                    augmentation, dissemination and perpetuation of knowledge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "depstar":
        return (
          <div className="content-section">
            <h1>Welcome to DEPSTAR INSTITUTE</h1>
            <img src={depstarImg} width="300" alt="" />
            <p>DEPSTAR is a constituent institute of CHARUSAT, focusing on engineering excellence.</p>
            <li>Programs: B.TECH</li>
            <li>Specializations: CSE, IT, CE</li>
          </div>
        );
      case "cse":
        return (
          <div className="content-section">
            <h2>Teaching & Examination Scheme for 5CSE</h2>
            <div className="table-container">
              <table className="scheme-table">
                <thead>
                  <tr>
                    <th rowSpan="2">Sem</th>
                    <th rowSpan="2">Course Code</th>
                    <th rowSpan="2">Course Title</th>
                    <th colSpan="3">Teaching Scheme (Contact Hours)</th>
                    <th rowSpan="2">Credit</th>
                    <th colSpan="4">Examination Scheme</th>
                    <th rowSpan="2">Total</th>
                  </tr>
                  <tr>
                    <th>Theory</th>
                    <th>Practical</th>
                    <th>Total</th>
                    <th>Internal (T)</th>
                    <th>External (T)</th>
                    <th>Internal (P)</th>
                    <th>External (P)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Sem 5 */}
                  <tr><td rowSpan="9">Sem 5</td><td>CSE304</td><td>Full Stack Development</td><td>0</td><td>4</td><td>4</td><td>4</td><td>-</td><td>-</td><td>50</td><td>50</td><td>100</td></tr>
                  <tr><td>CSE301</td><td>Software Engineering</td><td>3</td><td>2</td><td>5</td><td>4</td><td>30</td><td>70</td><td>25</td><td>25</td><td>150</td></tr>
                  <tr><td>CSE303</td><td>Machine Learning</td><td>4</td><td>2</td><td>6</td><td>5</td><td>30</td><td>70</td><td>25</td><td>25</td><td>150</td></tr>
                  <tr><td>CSEXX</td><td>Programme Elective-I</td><td>0</td><td>2</td><td>2</td><td>2</td><td>0</td><td>0</td><td>25</td><td>25</td><td>50</td></tr>
                  <tr><td>CSE302</td><td>Theory of Computation</td><td>3</td><td>0</td><td>3</td><td>3</td><td>30</td><td>70</td><td>0</td><td>0</td><td>100</td></tr>
                  <tr><td>CSE305</td><td>Project-III</td><td>0</td><td>2</td><td>2</td><td>2</td><td>-</td><td>-</td><td>50</td><td>50</td><td>100</td></tr>
                  <tr><td>CSE306</td><td>Summer Internship-I</td><td>0</td><td>0</td><td>0</td><td>3</td><td>-</td><td>-</td><td>75</td><td>75</td><td>150</td></tr>
                  <tr><td>HSXXX</td><td>HS Elective</td><td>0</td><td>2</td><td>2</td><td>2</td><td>-</td><td>-</td><td>30</td><td>70</td><td>100</td></tr>
                  <tr><td>CSEXX</td><td>Programme Elective-II (RM–1 or CP–1)</td><td>0</td><td>2</td><td>2</td><td>2</td><td>-</td><td>-</td><td>25</td><td>25</td><td>50</td></tr>
                  <tr><td colSpan="3"><strong>Total</strong></td><td>10</td><td>16</td><td>26</td><td>27</td><td>90</td><td>210</td><td>305</td><td>345</td><td>900</td></tr>
                </tbody>

              </table>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="about-container">
            <h1 className="about-heading">About Me</h1>
            <p className="about-description">
              Hey there! I'm <span className="highlight">Kandarp Prajapati</span> from <strong>DEPSTAR 5CSE2</strong>. I'm a
              passionate, creative learner and a natural leader.
              <br /><br />
              I absolutely love <span className="highlight">listening to music</span>, smashing sixes while <span className="highlight">playing cricket</span>,
              and diving into all sorts of fun and exciting activities!
            </p>
          </div>
        );

      default:
        return <h2>Select a section from the sidebar</h2>;
    }
  };

  return (
    <div className="app-container">
      <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <div className="top-section">
          {isOpen && <h1 className="menu-heading">MENU</h1>}
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isOpen ? <FaAngleLeft className="icon-white" /> : <FaBars className="icon-white" />}
          </button>
        </div>




        <div className="menu">

          <div
            className={`menu-item ${activePage === "home" ? "active" : ""}`}
            onClick={() => setActivePage("home")}
          >
            <FaHome className="icon" />
            {isOpen && <span>Home</span>}
          </div>

          <div
            className={`menu-item ${showSubmenu ? "active" : ""}`}
            onClick={toggleSubmenu}
          >
            <FaUniversity className="icon" />
            {isOpen && <span>University</span>}
          </div>

          {isOpen && showSubmenu && (
            <div className="submenu">
              <div
                className={`submenu-item ${activePage === "charusat" ? "active-sub" : ""
                  }`}
                onClick={() => setActivePage("charusat")}
              >
                ↳ CHARUSAT
              </div>
              <div
                className={`submenu-item ${activePage === "depstar" ? "active-sub" : ""
                  }`}
                onClick={() => setActivePage("depstar")}
              >
                ↳ DEPSTAR
              </div>
              <div
                className={`submenu-item ${activePage === "cse" ? "active-sub" : ""
                  }`}
                onClick={() => setActivePage("cse")}
              >
                ↳ CSE
              </div>
            </div>
          )}

          <div
            className={`menu-item ${activePage === "about" ? "active" : ""}`}
            onClick={() => setActivePage("about")}
          >
            <FaInfoCircle className="icon" />
            {isOpen && <span>About Me</span>}
          </div>
        </div>
      </div>

      <div className="main">{renderContent()}</div>
    </div>
  );
}

export default App;
