import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import EmployerProfile from "./employerProfile";
import EvaluationForm from "./evaluationForm";
import { useHandleLogout } from "../../hooks/useHandleLogout";
import { useDisplayUser } from "../../hooks/useDisplayUser";

const EmployerDashboard = () => {
  const data = useSelector((state: RootState) => state.userSlice.data);
  const id = useSelector((state: RootState) => state.userSlice.id);
  const handleLogout = useHandleLogout();

  useDisplayUser({ linkUrl: "employers" });

  return (
    <div className="main_wrapper">
      <Tabs>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <div className="mb-4 pb-2 d-flex flex-column align-items-center user_info">
                <div className="img_wrap align-self-center mb-3"></div>
                <div>
                  <h1 className="name">{data ? `${data.companyName}` : ""}</h1>
                  <p className="location">
                    {data && data.location ? `${data.location}` : ""}
                  </p>
                </div>
              </div>
              <TabList className="options_wrap">
                <Tab>
                  <button className="option_btn mb-2 text-start p-0">
                    Evaluations
                  </button>
                </Tab>
                <Tab>
                  <button className="option_btn mb-2 text-start p-0">
                    Profile
                  </button>
                </Tab>
                <Tab>
                  <button className="option_btn text-start p-0">
                    Settings
                  </button>
                </Tab>
              </TabList>
            </div>
            <div className="col-9">
              <div className="content_wrap">
                <TabPanel>
                  <EvaluationForm
                    employerName={data ? data.companyName : "Unknown Employer"}
                  />
                </TabPanel>
                <TabPanel>
                  <EmployerProfile userId={id} />
                </TabPanel>
                <TabPanel>
                  Your Settings
                  <button onClick={handleLogout}>log out</button>
                </TabPanel>
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default EmployerDashboard;
