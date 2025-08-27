// src/components/Navbar.jsx
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const pages = [
  { label: "Workout Plans", href: "#workouts" },
  { label: "Nutrition", href: "#nutrition" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const settings = ["Profile", "Dashboard", "Logout"];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "linear-gradient(90deg, #00c853 0%, #2196f3 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <Container maxWidth={false} disableGutters>
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          {/* Brand (desktop) */}
          <FitnessCenterIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".08rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            FitPlanner
          </Typography>

          {/* Mobile menu button */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              keepMounted
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((p) => (
                <MenuItem
                  key={p.label}
                  onClick={handleCloseNavMenu}
                  component="a"
                  href={p.href}
                >
                  <Typography textAlign="center">{p.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Brand (mobile) */}
          <FitnessCenterIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "white",
              textDecoration: "none",
              fontWeight: 700,
              letterSpacing: ".08rem",
            }}
          >
            FitPlanner
          </Typography>

          {/* Desktop links */}
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}
          >
            {pages.map((p) => (
              <Button
                key={p.label}
                href={p.href}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 1,
                  color: "white",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                }}
              >
                {p.label}
              </Button>
            ))}
          </Box>

          {/* User menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/1.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-user"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              keepMounted
            >
              {settings.map((s) => (
                <MenuItem key={s} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{s}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
