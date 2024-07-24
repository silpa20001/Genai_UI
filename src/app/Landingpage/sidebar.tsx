import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Stack, Button, IconButton, Box } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import { useRouter } from 'next/navigation'

const Sidebar = ({ onButtonClick, isSidebarOpen, handleToggleSidebar, isAnimating }) => {

  const router = useRouter()

  return (
    // <div className="sidebar">
    //   <Button variant="secondary" className="mb-2" onClick={() => onButtonClick('aboutMeta')} style={{ marginTop:'5px' }}>
    //     About Meta
    //   </Button>
    //   <Button variant="secondary" className="mb-2" onClick={() => onButtonClick('process')}>
    //     Process
    //   </Button>
    //   <Button variant="secondary" className="mb-2" onClick={() => onButtonClick('tools')}>
    //     Tools
    //   </Button>
    //   <Button variant="secondary" className="mb-2" onClick={() => onButtonClick('productsAndFeatures')}>
    //     Products and Features
    //   </Button>
    //   <Link href="/assesment" style={{ textDecoration: 'none' }}>
    //     <Button style={{ backgroundColor: 'rgb(87, 86, 86)', marginTop: '10px', textDecoration: 'none' }}>
    //       Take Assessment
    //     </Button>
    //   </Link>

    // </div>
    <>
      {
        !isSidebarOpen &&
        <Stack style={{ cursor: "pointer" }} direction={"row"} onClick={handleToggleSidebar} className="sidebar-open"> <IconButton color="primary"><KeyboardDoubleArrowRightIcon /></IconButton></Stack>
      }
      <Stack className={`sidebar ${isSidebarOpen ? 'open' : 'closed'} ${!isSidebarOpen && !isAnimating ? 'hide' : ''}`} style={{ position: "relative" }}>
        {/* <Stack direction="row "> */}
        {/* <Button startIcon={<KeyboardDoubleArrowLeftIcon />} onClick={handleToggleSidebar}></Button> */}
        <KeyboardDoubleArrowLeftIcon color="primary" style={{ cursor: "pointer" }} onClick={handleToggleSidebar} />
        <MenuList>
          <MenuItem onClick={() => onButtonClick('productsAndFeatures')}>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Products</ListItemText>

          </MenuItem>
          <MenuItem onClick={() => onButtonClick('process')}>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Process</ListItemText>

          </MenuItem>
          <MenuItem onClick={() => onButtonClick('tools')}>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Tools</ListItemText>

          </MenuItem>
          <MenuItem onClick={() => onButtonClick('aboutMeta')}>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>About Meta</ListItemText>

          </MenuItem>
          <Divider />
          <Link href="/assesment" style={{ textDecoration: 'none', }}>
            <MenuItem>
              {/* <ListItemIcon>
                <Cloud fontSize="small" />
              </ListItemIcon> */}
              <ListItemText>Take Assessment</ListItemText>
            </MenuItem>
          </Link>
        </MenuList>
        {/* <Box>
          <Button variant="secondary" className="mb-2" onClick={() => onButtonClick('aboutMeta')} style={{ marginTop: '5px' }}>
            About Meta
          </Button>
          <Button variant="secondary" className="mb-2" onClick={() => onButtonClick('process')}>
            Process
          </Button>
          <Button variant="secondary" className="mb-2" onClick={() => onButtonClick('tools')}>
            Tools
          </Button>
          <Button variant="secondary" className="mb-2" onClick={() => onButtonClick('productsAndFeatures')}>
            Products and Features
          </Button>

        </Box>
          <Link href="/assesment" style={{ textDecoration: 'none',  }}>
              <Button style={{ backgroundColor: 'rgb(87, 86, 86)', marginTop: '10px', textDecoration: 'none' }}>
              Take Assessment
            </Button>
          </Link> */}
      </Stack>


      {/* </Stack> */}
    </>
  );
};

export default Sidebar;
