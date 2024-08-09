import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TableRowsIcon from "@mui/icons-material/TableRows";

import { IconButton } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { ConnectButton } from "./ConnectButton";

export const NavMenu = ({ address }: { address?: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <TableRowsIcon className="rounded-sm active:bg-gray-600 text-gray-400" />
      </IconButton>
      {/** We need to specify next as the container to get tailwind css to work for material ui */}
      <Menu
        container={() => document.getElementById("__next")}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
        slotProps={{ paper: { className: "bg-black" } }}
      >
        <MenuItem onClick={handleClose}>
          <Link className="text-white" to="/">
            Home
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            to="https://docs.fuel.network"
            target="_blank"
            className="text-white"
          >
            Fuel Docs
          </Link>
        </MenuItem>
        {address && (
          <MenuItem onClick={handleClose}>
            <Link className="text-white" to="/faucet">
              Faucet
            </Link>
          </MenuItem>
        )}
        <MenuItem onClick={handleClose}>
          <ConnectButton />
        </MenuItem>
      </Menu>
    </>
  );
};
