import { Tabs, Tab, Box } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
export default function CustomTabs({
  tabs = ["Tab 1", "Tab 2", "Tab 3"], // Default tabs
  tabHeight = 20, // Default height
  defaultPadding = "24px", // Default padding for all tabs
  customPadding = {}, // Custom padding for specific tabs (e.g., {1: "8rem"})
  onTabSelect, // Callback when a tab is selected
}) {
  const [value, setValue] = useState(0);
  const tabRefs = useRef([]);
  const [highlightStyle, setHighlightStyle] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const updateHighlight = () => {
      const tab = tabRefs.current[value];
      if (tab) {
        setHighlightStyle({ left: tab.offsetLeft, width: tab.clientWidth });
      }
      console.log(value);
    };

    updateHighlight();
    window.addEventListener("resize", updateHighlight);
    return () => window.removeEventListener("resize", updateHighlight);
  }, [value]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    if (onTabSelect) {
      // Trigger the onTabSelect callback and pass the selected tab index and label
      onTabSelect(newValue, tabs[newValue]);
    }
  };

  return (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          border: "2px solid black",
          borderRadius: "999px",
          overflow: "hidden",
          //  backgroundColor: "#f5f5f5",                       // bg of tabs
          width: "fit-content",
          mx: "auto",
          height: `${tabHeight + 4}px`, // Ensure the container is slightly bigger
        }}
      >
        {/* Animated Background */}
        <motion.div
          animate={{ left: highlightStyle.left, width: highlightStyle.width }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          style={{
            position: "absolute",
            height: `${tabHeight + 1}px`,
            borderRadius: "999px",
            backgroundColor: "#2C4047",
            //                                    bg-of tabs
            zIndex: 0,
          }}
        />

        {/* Tabs */}
        <Tabs
          value={value}
          onChange={handleTabChange} // Call the handleTabChange function
          variant="fullWidth"
          indicatorColor="transparent"
          className=" text-3xl"
          sx={{
            zIndex: 1,
            "& .MuiTabs-indicator": { display: "none" },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: "bold",
              position: "relative",
              zIndex: 2,
              color: "#2C4047",
              //                                                      color of not active
              transition: "color 0.3s ease-in-out",
              fontSize: "20px",
              borderRadius: "999px",
              minHeight: `${tabHeight}px !important`,
              height: `${tabHeight}px !important`,
              minWidth: "200px", // Important: Allow custom padding
              "&.Mui-selected": { color: "#FFD964" },
            },
          }}
        >
          {tabs.map((label, index) => (
            <Tab
              key={index}
              label={label}
              ref={(el) => (tabRefs.current[index] = el)}
              disableRipple
              sx={{
                paddingInline: customPadding[index + 1] || defaultPadding,

                // Use custom padding if available
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      {/* <Box sx={{ p: 3, fontWeight: "bold", fontSize: "1.1rem" }}>
        {`Content for ${tabs[value]}`}
      </Box> */}
    </Box>
  );
}
