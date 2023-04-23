import { useContext } from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { UIContext } from "@/context/ui";

const menuItems: string[] = ["Inbox", "Starred", "Send", "Drafts"];

export const Sidebar = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <Stack width={250}>
        <Stack padding="5px 10px">
          <Typography variant="h4">Menú</Typography>
        </Stack>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={item}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxOutlinedIcon />
                ) : (
                  <EmailOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Stack>
    </Drawer>
  );
};
