import React from "react";
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
} from "@material-ui/core";

import classes from "./styles.module.scss";

const ConfirmModal = ({
  contentText,
  confirmText,
  open,
  setOpen,
  confirmClick,
  cancel,
}) => {
  return (
    <div className={classes.confirmModal}>
      <Dialog open={open} onClose={setOpen}>
        {contentText}
        <DialogContent>
          <DialogActions>
            <Button onClick={confirmClick}>{confirmText}</Button>
            <Button onClick={cancel}>გაუქმება</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
