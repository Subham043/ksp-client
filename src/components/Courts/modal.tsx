import { FC } from "react";
import { Modal } from '@mantine/core';
import CourtForm from "./form";
import { CourtsModalProps } from "../../pages/courts/list";

const CourtModal:FC<CourtsModalProps & {toggleModal: (value: CourtsModalProps) => void}> = (props) => {
    return (
        <Modal opened={props.status} onClose={() => props.toggleModal({status: false, type: 'Create'})} centered size="xl" withCloseButton={true}  title={props.type === "Edit" ? "Edit Court" : "Create Court"} overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>
            <CourtForm {...props} toggleModal={props.toggleModal} />
        </Modal>
    )
}

export default CourtModal;