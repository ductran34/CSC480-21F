import React, { useState, useEffect } from "react";
// @mui components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BsArrowRightCircle } from "react-icons/bs";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// styled components
import NavBar from "../../components/NavBar/NavBar";
import CustomizedButtons from "../../components/CustomizedButtons";

import CustomizedTabs from "../../components/CustomizedTabs";
import bg from "../../images/multi_background_dashboard.jpg";
import {
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import CustomizedCard from "../../components/CustomizedCard";
import CustomizedContainer from "../../components/CustomizedContainer";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { selectCourses, getCoursesByUserId } from "../../features/coursesSlice";
import Loading from "../../components/Loading";
import CustomizedBody from "../../components/CustomizedBody";
import axios from "axios";

const demoData = [
  { name: "Peer Review 1", date: "10/07/21", type: "Completed" },
  { name: "Peer Review 2", date: "11/07/21", type: "Needs Review" },
  { name: "Peer Review 3", date: "13/07/21", type: "Needs Review" },
  { name: "Peer Review 4", date: "12/07/21", type: "Completed" },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      sx={{ borderRadius: "10px" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function CourseResultPage({ history }) {
  const [tab, setTab] = useState(0);
  const [filterType, setFilterType] = useState("All");
  const [courses, setCourses] = useState([]);

  const dispatch = useDispatch();
  const getUser = useSelector(selectUser);
  const { user, isAuthenticated, authLoading } = getUser;
  const [loading, setLoading] = React.useState(true);
  const [courseNames, setCourseNames] = React.useState([]);
  console.log(filterType);
  useEffect(() => {
    var nameLists = [];
    if (courses) {
      courses.map((course) => {
        nameLists.push(course.code);
      });
      setCourseNames(nameLists);
      setLoading(false);
    }
  }, [courses]);
  useEffect(() => {
    async function getCourses() {
      try {
        const response = await axios.get("http://localhost:3000/courses");
        setCourses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getCourses();
  }, []);
  // useEffect(() => {
  //   console.log(filterType);
  //   const filteredItems = courses.assignments.filter((assignment) => {
  //     return item.type == filterType || filterType === "All";
  //   });
  //   setItems(filteredItems);
  // }, [filterType]);
  return (
    <CustomizedBody bg={bg}>
      <NavBar fixed history={history}></NavBar>
      <CustomizedContainer>
        <>
          {loading === true ? (
            <Loading />
          ) : (
            <>
              <Grid container spacing={15} sx={{ marginBottom: "20px" }}>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Typography
                    style={{
                      display: "flex",
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                    variant="h6"
                    component="div"
                  >
                    Quality Check
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {/* <SuccessfulNotification/> */}
                </Grid>
              </Grid>
              <div>
                <CustomizedTabs
                  type3
                  setTab={setTab}
                  value={tab}
                  labels={courseNames}
                ></CustomizedTabs>
                {courses.map((course, key) => (
                  <TabPanel value={tab} index={key}>
                    <CustomizedCard>
                      <CardHeader
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                        title={
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <CustomizedButtons
                                type3
                                model={"radio2"}
                                fullwidth
                                filterType={filterType}
                                setFilterType={setFilterType}
                              >
                                Filter Results
                              </CustomizedButtons>
                            </Grid>
                          </Grid>
                        }
                      ></CardHeader>
                      <CardContent
                        sx={{
                          paddingTop: "0",
                        }}
                      >
                        {course.assignments.map((assignment) => {
                          return (
                            <>
                              {(filterType === "All" ||
                                (filterType === "Completed") ===
                                  assignment.solution[0].isReviewed) && (
                                <ListItem
                                  button
                                  divider
                                  onClick={() =>
                                    history.push("/studentsolutionqualitycheck")
                                  }
                                  secondaryAction={
                                    <IconButton edge="end">
                                      <BsArrowRightCircle />
                                    </IconButton>
                                  }
                                >
                                  <ListItemText
                                    sx={{ width: "30%" }}
                                    primary={`${assignment.title} Solutions`}
                                  />

                                  <>
                                    {assignment.solution[0].isReviewed ===
                                    false ? (
                                      <>
                                        <ListItemText
                                          sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                          primary={`submissions closed ${assignment.peerreview[0].dueDate}`}
                                        />
                                        <ListItemText
                                          primary={
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "flex-end",
                                              }}
                                            >
                                              <FiberManualRecordIcon
                                                sx={{
                                                  color: "#0DC38D",
                                                  marginRight: "10px",
                                                }}
                                                fontSize="medium"
                                              />{" "}
                                              <>Needs Review</>
                                            </div>
                                          }
                                        />
                                      </>
                                    ) : (
                                      <ListItemText
                                        sx={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                        }}
                                        primary={`Completed ${assignment.solution[0].dueDate}`}
                                      />
                                    )}
                                  </>
                                </ListItem>
                              )}
                              {(filterType === "All" ||
                                (filterType === "Completed") ===
                                  assignment.peerreview[0].isReviewed) && (
                                <ListItem
                                  button
                                  divider
                                  onClick={() => history.push("/resultviewer")}
                                  secondaryAction={
                                    <IconButton edge="end">
                                      <BsArrowRightCircle />
                                    </IconButton>
                                  }
                                >
                                  <ListItemText
                                    sx={{ width: "30%" }}
                                    primary={`${assignment.title} Peer Reviews`}
                                  />

                                  <>
                                    {assignment.peerreview[0].isReviewed ===
                                    false ? (
                                      <>
                                        <ListItemText
                                          sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                          primary={`submissions closed ${assignment.peerreview[0].dueDate}`}
                                        />

                                        <ListItemText
                                          primary={
                                            <div
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "flex-end",
                                              }}
                                            >
                                              <FiberManualRecordIcon
                                                sx={{
                                                  color: "#0DC38D",
                                                  marginRight: "10px",
                                                }}
                                                fontSize="medium"
                                              />{" "}
                                              <>Needs Review</>
                                            </div>
                                          }
                                        />
                                      </>
                                    ) : (
                                      <ListItemText
                                        sx={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                        }}
                                        primary={`Completed ${assignment.peerreview[0].dueDate}`}
                                      />
                                    )}
                                  </>
                                </ListItem>
                              )}
                            </>
                          );
                        })}
                      </CardContent>
                    </CustomizedCard>
                  </TabPanel>
                ))}
              </div>
            </>
          )}
        </>
      </CustomizedContainer>
    </CustomizedBody>
  );
}

export default CourseResultPage;
