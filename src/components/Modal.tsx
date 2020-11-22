import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface props {
    title: JSX.Element | string;
    message: JSX.Element | string;
    onCancel?: (callback?: any) => void;
    onOk: (callback?: any) => void;
    cancelButtonMessage?: string;
    okButtonMessage?: string;
    open?: boolean
}

export default function AlertDialog(props: props) {
    const { title, message, onCancel, onOk, cancelButtonMessage = "Cancel",
        okButtonMessage = "Ok", open = false
    } = props;

    return (
        <div>

            <Dialog
                disableBackdropClick
                open={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel} color="primary">
                        {cancelButtonMessage}
                    </Button>
                    <Button onClick={onOk} color="primary" autoFocus>
                        {okButtonMessage}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
