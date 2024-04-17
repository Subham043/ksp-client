import { FC } from "react";
import { Modal } from '@mantine/core';
import CriminalForm from "./form";
import { CriminalsModalProps } from "../../pages/criminals/list";

const CriminalModal:FC<CriminalsModalProps & {toggleModal: (value: CriminalsModalProps) => void}> = (props) => {
    return (
        <Modal opened={props.status} onClose={() => props.toggleModal({status: false, type: 'Create'})} centered size="xl" withCloseButton={true}  title={props.type === "Edit" ? "Edit Criminal" : "Create Criminal"} overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>
            <CriminalForm {...props} toggleModal={props.toggleModal} />
        </Modal>
    )
}

export default CriminalModal;