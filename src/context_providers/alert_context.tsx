import React, { useState, createContext } from "react";
import AlertModal from "../components/Modal";
import toastr from "toastr";

export const AlertContext = createContext(null);

export function AlertProvider({ children }: React.PropsWithChildren<{}>) {
    const [showErrorMessage, setShowErrorMessage] = useState("");
    const [showConfirmMessage, setShowConfirmMessage] = useState("");
    const [confirmFunction, setConfirmFunction] = useState(null);
    const [open, setOpen] = useState(false)

    function error(message) {
        setShowErrorMessage(message);
    }

    function confirm(message, cb) {
        setShowConfirmMessage(message);
        setConfirmFunction(() => cb);
    }

    function info(message) {
        toastr.info(message);
    }

    function onOk() {
        confirmFunction();
        setShowConfirmMessage("");
    }

    return (
        <AlertContext.Provider
            value={{
                error,
                confirm,
                info,
            }}
        >
            {/* {
                showErrorMessage ?
                    <AlertModal
                        title={<span style={{ color: "red" }}>Error</span>}
                        message={<span style={{ color: "red" }}>{showErrorMessage}</span>}
                        onOk={() => setShowErrorMessage("")}
                    />
                    : null

            } */}
            {

                showConfirmMessage ?
                    <AlertModal
                        title={<span>Confirmation</span>}
                        message={<span>{showConfirmMessage}</span>}
                        onOk={onOk}
                        cancelButtonMessage="No"
                        okButtonMessage="Yes"
                        onCancel={() => { setShowConfirmMessage("") }}
                        open={open}
                    />
                    :
                    null
            }
            {children || null}
        </AlertContext.Provider>
    );
}
