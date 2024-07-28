import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import EmployeeProfile from "../profile/employeeProfile";
import EmployeeEvaluations from "../employee/employeeEvaluations";
import { useDisplayUser } from "../../hooks/useDisplayUser";
import { EmployeeSettings } from "../settings/employeeSettings";

const EmployeeDashboard = () => {
  const data = useSelector((state: RootState) => state.userSlice.data);
  const id = useSelector((state: RootState) => state.userSlice.id);

  useDisplayUser({ linkUrl: "employees" });

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
                  <h1 className="name text-start">
                    {data && data.firstName && data.lastName
                      ? `${data.firstName} ${data.lastName}`
                      : "Hello user"}
                  </h1>
                  <p className="title mb-0">
                    {data && data.title && data.currentEmployer
                      ? `${data.title}, ${data.currentEmployer}`
                      : ""}
                  </p>
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
                  <EmployeeEvaluations employeeId={id} />
                </TabPanel>
                <TabPanel>
                  <EmployeeProfile userId={id} />
                </TabPanel>
                <TabPanel>
                  <EmployeeSettings />
                </TabPanel>
              </div>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default EmployeeDashboard;
