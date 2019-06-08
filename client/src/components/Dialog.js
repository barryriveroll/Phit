import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

const emails = ["username@gmail.com", "user02@gmail.com"];

function SimpleDialog(props) {
  const { onClose, selectedValue, ...other } = props;

  function handleClose() {
    onClose(selectedValue);
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      {...other}
    >
      <DialogTitle id="simple-dialog-title" style={{ textAlign: "center" }}>
        Please verify your email address
      </DialogTitle>
      <List>
        <ListItem>
          <ListItemText primary="You should be recieving an email from us soon. Once you verify your email address, you should be able to sign in" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  selectedValue: PropTypes.string
};

function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(true);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <SimpleDialog
      selectedValue={selectedValue}
      open={open}
      onClose={handleClose}
    />
  );
}

export default SimpleDialogDemo;
