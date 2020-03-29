import React from "react";
import styled from "styled-components";
import Box from "../UI/Layout/Box";
import Flex from "../UI/Layout/Flex";
import { ReactComponent as ArrowDownIcon } from "../../assets/images/icons/arrow_drop_down-24px.svg";
import { ReactComponent as ArrowUpIcon } from "../../assets/images/icons/arrow_drop_up-24px.svg";
import { ReactComponent as CloseIcon } from "../../assets/images/icons/close-24px.svg";

const SelectButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const DropDown = styled(Flex)`
  border-top: 2px solid ${props => props.theme.colors.orange};
  background-color: white;
  position: absolute;
  left: 0;
  width: 100%;
  transform: translateY(calc(100% + 6px));

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    transform: translateY(calc(100% + 6px));
  }
`;

const DropDownItem = styled(Box)`
  cursor: pointer;
  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    &:hover {
      background-color: ${props => props.theme.colors.grayLight};
    }
  }
`;

const ProfilePicture = styled(Box)`
  position: relative;
  border-radius: 60px;
  overflow: hidden;
  width: 32px;
  height: 32px;

  @media (min-width: ${props => props.theme.breakpoints[2]}) {
    width: 48px;
    height: 48px;
  }

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const ProfileDetails = styled(Box)`
  line-height: 1.5em;
  text-align: left;
`;

const Action = styled(Box)`
  width: 48px;
  height: 48px;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  /* background: ${props => props.theme.colors.grayLight}; */
  border-radius: 60px;
  font-size: 24px;
  > * {
    transform: translateY(-2px);
  }
`;

const Profile = ({ store, setStore, profile }) => {
  const { menu } = store;

  const { firstName, lastName, image } = profile;
  return (
    <React.Fragment>
      <SelectButton
        onClick={() => {
          if (menu.option !== "goal") {
            setStore({
              ...store,
              menu: { ...menu, open: !menu.open ? true : false }
            });
          }
        }}
      >
        <ProfilePicture mr={[1, null, null, 1]}>
          <img src={image} alt={`${firstName} ${lastName}`} />
        </ProfilePicture>
        <ProfileDetails pl={"4px"}>
          <div>
            {firstName} {lastName}
          </div>
          <div>2020</div>
        </ProfileDetails>
        <Action
          onClick={() => {
            if (menu.option === "goal") {
              setStore({ ...store, menu: { ...menu, option: "user" } });
            }
          }}
        >
          {menu.option === "goal" ? (
            <CloseIcon />
          ) : menu.open ? (
            <ArrowUpIcon />
          ) : (
            <ArrowDownIcon />
          )}
        </Action>
      </SelectButton>
      {menu.open && (
        <DropDown flexDirection="column">
          <DropDownItem
            p={[2, null, null, 2]}
            onClick={() => {
              setStore({
                ...store,
                menu: { ...menu, open: false, option: "goal" }
              });
            }}
          >
            Set Goal
          </DropDownItem>
          {/* <DropDownItem
            p={[2, null, null, 2]}
            onClick={() => {
              setStore({
                ...store,
                menu: { ...menu, open: false, option: "user" }
              });
            }}
          >
            Logout
          </DropDownItem> */}
        </DropDown>
      )}
    </React.Fragment>
  );
};

export default Profile;
