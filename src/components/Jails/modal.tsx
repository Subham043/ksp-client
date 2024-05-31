import { FC } from "react";
import { Modal } from '@mantine/core';
import JailForm from "./form";
import { JailsModalProps } from "../../pages/jails/list";

const JailModal:FC<JailsModalProps & {toggleModal: (value: JailsModalProps) => void}> = (props) => {
    return (
        <Modal opened={props.status} onClose={() => props.toggleModal({status: false, type: 'Create'})} centered size="xl" withCloseButton={true}  title={props.type === "Edit" ? "Edit Jail" : "Create Jail"} overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>
            <JailForm {...props} toggleModal={props.toggleModal} />
        </Modal>
    )
}

export default JailModal;