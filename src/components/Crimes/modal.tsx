import { FC } from "react";
import { Modal } from '@mantine/core';
import CrimeForm from "./form";
import { CrimesModalProps } from "../../pages/crimes/list";

const CrimeModal:FC<CrimesModalProps & {toggleModal: (value: CrimesModalProps) => void}> = (props) => {
    return (
        <Modal opened={props.status} onClose={() => props.toggleModal({status: false, type: 'Create'})} centered size="xl" withCloseButton={true}  title={props.type === "Edit" ? "Edit Crime" : "Create Crime"} overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>
            <CrimeForm {...props} toggleModal={props.toggleModal} />
        </Modal>
    )
}

export default CrimeModal;