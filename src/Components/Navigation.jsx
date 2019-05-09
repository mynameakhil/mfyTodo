import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Icon } from "antd";

const Navigation = () => {
  const [current, setCurrent] = useState("home");

  const handleClick = e => {
    // console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Menu.Item key="home">
        <Icon type="home" />
        HOME
        <NavLink to="/" />
      </Menu.Item>
      <Menu.Item key="add">
        <Icon type="setting" />
        ADD
        <NavLink to="/add" />
      </Menu.Item>
    </Menu>
  );
};
export default Navigation;
