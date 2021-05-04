import React from 'react';
import { Popup } from 'semantic-ui-react';

const ToolTip = ({ content, trigger, inverted = true, ...rest }) => {
  return (
    <Popup content={content} trigger={trigger} inverted={inverted} {...rest} />
  );
};

export default ToolTip;
