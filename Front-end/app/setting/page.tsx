import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import Profile from "@/components/setting/Profile";
import Security from "@/components/setting/Security";
import HomeMng from "@/components/setting/HomeMng";

const SettingPage = () => {
  return (
    <div className="bg-white p-4 rounded-2xl">
      <Tabs position="relative" variant="unstyled">
        <TabList>
          <Tab
            fontWeight={"semibold"}
            textColor={"#718EBF"}
            _selected={{
              borderBottom: "2px",
              borderBottomColor: "#1814F3",
              textColor: "#1814F3",
            }}
          >
            Profile
          </Tab>
          <Tab
            fontWeight={"semibold"}
            textColor={"#718EBF"}
            _selected={{
              borderBottom: "2px",
              borderBottomColor: "#1814F3",
              textColor: "#1814F3",
            }}
          >
            Security
          </Tab>
          <Tab
            fontWeight={"semibold"}
            textColor={"#718EBF"}
            _selected={{
              borderBottom: "2px",
              borderBottomColor: "#1814F3",
              textColor: "#1814F3",
            }}
          >
            Home Management
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Profile/>
          </TabPanel>
          <TabPanel>
            <Security/>
          </TabPanel>
          <TabPanel>
            <HomeMng/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default SettingPage;
