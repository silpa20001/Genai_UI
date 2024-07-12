import React from 'react';
import { Button } from 'react-bootstrap';

const Sidebar = ({ onButtonClick }) => {
  return (
    <div className="sidebar">
      <Button variant="secondary" className="mb-2" onClick={() => onButtonClick('aboutMeta')}>
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
    </div>
  );
};

export default Sidebar;
