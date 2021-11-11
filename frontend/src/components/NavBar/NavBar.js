import React from "react";
import { Link } from "react-router-dom";
// @mui components
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import {AiFillHome} from "react-icons/ai"
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import logo from "../../images/logo.png";
import { AiOutlinePlusCircle } from "react-icons/ai";
// styled components
import NavBarStyle from "../../styles/NavBarStyle";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../features/userSlice";
import { whiteColor, darkColor } from "../../styles/Style";
import CustomizedContainer from "../CustomizedContainer";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Container,
  Typography,
  Box,
  Stack,
  Button,
  Radio,
  MenuItem,
   Collapse
} from "@mui/material";
import CustomizedButtons from "../CustomizedButtons";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {signOut } from "firebase/auth";
import {auth, provider} from "../../pages/Login/firebase";
function NavBar({ history }) {
  const dispatch = useDispatch();
  const nav = NavBarStyle();
  const getUser = useSelector(selectUser);
  const { user, isAuthenticated, role } = getUser;
  const handleLogOut = () => {
    dispatch(setUser());
  }
  const [dropdown, setDropdown] = React.useState(false);
  const handleClick = (event) => {
    setDropdown(!dropdown);
    handleLogOut()
  };
  const logout = ()=>{
    signOut(auth,provider)
    .then(()=>{
      console.log("user signed out")
    })
  }

  return (
    <div className={nav.root}>
      <AppBar
        style={{
          backgroundColor: whiteColor,
          color: darkColor,
          flexDirection: "row",
        }}
        className={nav.appBar}
      >
        <CustomizedContainer>
          <Grid
            container
            rowSpacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid item xs={2}>
              <Link
                to="/professorhome"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <img className={nav.logo} src={`${logo}`} />
              </Link>
            </Grid>
            <Grid
              item
              container
              xs={8}
              rowSpacing={2}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Stack direction="row" spacing={3} sx={{ paddingTop: "16px" }}>
                <Link
                  to="/course"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ display: "flex", alignItems: "center" }}
                    className={nav.link}
                  >
                    <div>Courses & Assignments</div>
                    <AiOutlinePlusCircle />
                  </Stack>
                </Link>
                <Link
                  to="/courseresult"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className={nav.link}>Qualily Check</div>
                </Link>
                <Link
                  to="/studentinfoview"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className={nav.link}>Students & Teams</div>
                </Link>
              </Stack>
            </Grid>
            <Grid
              item
              container
              xs={2}
              rowSpacing={2}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Stack direction="column" spacing={3} sx={{ paddingTop: "16px", position: "relative" }}>
                <Stack direction="row">
                <Grid item xs={2} style={{paddingTop: "5px"}}>
                  <AiFillHome size="1.5em" style={{marginLeft: "5px"}}/>
                </Grid>
                  <Button
                    onClick={handleClick}
                    sx={{color: "#000"}}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Username
                  </Button>
                </Stack>
                <Collapse in={dropdown} timeout="auto" unmountOnExit sx={{position: "absolute", top: "50px"}}>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <Button variant="contained" className={nav.link} sx={{width: "130px"}} onClick={logout}>
                      Sign out
                    </Button>
                  </Link>
                </Collapse>
              </Stack>
            </Grid>
          </Grid>
        </CustomizedContainer>
      </AppBar>
    </div>
  );
}

export default NavBar;
