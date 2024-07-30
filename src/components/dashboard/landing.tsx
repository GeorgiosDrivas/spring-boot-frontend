import { HandleClick } from "../../hooks/useHandleClick";

const Landing = () => {
    const handleClick = HandleClick();

    return (
      <>
        <div className="container">
          <div className="row justify-content-between mt-3 mb-5">
            <div className="col-12 col-lg-4 m-0 p-0">
              <ul className="inria-serif-regular d-flex justify-content-between align-items-center m-0 p-0">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="col-12 col-lg-4 m-0 p-0">
              <div className="options d-flex justify-content-around align-items-center">
                <button
                  className="inria-serif-regular me-4 option-btn"
                  onClick={() => handleClick("employee-login")}
                >
                  Employee
                </button>
                <button
                  className="inria-serif-regular option-btn"
                  onClick={() => handleClick("employer-login")}
                >
                  Employer
                </button>
              </div>
            </div>
          </div>
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-lg-6">
              <div className="wrap">
                <h1 className="kaisei-decol-regular">
                  Valu<span className="big-letter">E</span>Me
                </h1>
                <p className="inria-serif-regular text-start">
                  Quisque semper, est nec facilisis lobortis,
                  <br /> magna lectus elementum tortor.
                </p>
                <div className="position-relative">
                  <button className="me-2 inria-serif-regular more">
                    More
                  </button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="arrow-svg"
                  >
                    <path
                      d="M4 12H20M20 12L16 8M20 12L16 16"
                      stroke="#000000"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex justify-content-end">
                <div className="img-wrap">
                  <img
                    className="w-100 h-100 position-absolute"
                    src="../../assets/valueme_landing.png"
                    alt="Image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Landing;