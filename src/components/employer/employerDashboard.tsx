import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import EmployerProfile from "./employerProfile";
import EvaluationForm from "./evaluationForm";
import { useDisplayUser } from "../../hooks/useDisplayUser";
import { EmployerSearchComp } from "./employerSearchComp";
import { EmployerSettings } from "./employerSettings";
import {useState} from 'react';
import { EmployeeData } from "../../types/types";
import { EmployeeSearchProfile } from "./employeeSearchProfile";

const EmployerDashboard = () => {
  
  const data = useSelector((state: RootState) => state.userSlice.data);
  const id = useSelector((state: RootState) => state.userSlice.id);
  const [selected, setSelected] = useState<EmployeeData>();

  useDisplayUser({ linkUrl: "employers" });

  return (
    <div className="main_wrapper">
      <Tabs>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
              <div className="mb-4 pb-2 d-flex flex-column align-items-center user_info">
                <div className="img_wrap align-self-center mb-3 position-relative overflow-hidden">
                  <img
                    src={`http://localhost:8080/uploads/${id}_${data.profileImagePath}`}
                    alt="Profile photo"
                    className="position-absolute w-100 h-100"
                  />
                </div>
                <div>
                  <h1 className="name text-center">{data ? `${data.companyName}` : ""}</h1>
                  <p className="field mb-0">{data ? `${data.field}` : ""}</p>
                  <p className="location text-center mt-0">
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
                  <button className="option_btn mb-2 text-start p-0">
                    Search
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
                    employerProfileImage={
                      data ? data.profileImagePath : "Unknown Employer"
                    }
                    employerId={id}
                  />
                </TabPanel>
                <TabPanel>
                  <EmployerProfile userId={id} />
                </TabPanel>
                <TabPanel>
                  {selected ? <EmployeeSearchProfile user={selected} setUser={() => setSelected(undefined)} /> : <EmployerSearchComp setSelected={setSelected}/>
                  }
                </TabPanel>
                <TabPanel>
                  <EmployerSettings />
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
