import "./TabsPanel.scss";
import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const tabsContent = ({ tabsHeader, tabsContent }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // find tab active
  React.useEffect(() => {
    setValue(tabsHeader.findIndex((t) => t.default === true));
  }, []);

  return (
    <>
      <Grid container item className="panel-tabs-container">
        <Grid item xs={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs"
          >
            {tabsHeader.map((tab, index) => (
              <Tab
                key={tab.id + index}
                id={tab.id}
                label={tab.name}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          {tabsContent.map((c, index) => (
            <TabPanel key={c.id + index + value} value={value} index={index}>
              {c.renderComponent}
            </TabPanel>
          ))}
        </Grid>
        {/* <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
        </Grid> */}
      </Grid>
    </>
  );
};

export default tabsContent;

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};
