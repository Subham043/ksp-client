import { FC } from "react";
import { Modal } from '@mantine/core';
import CrimesByCriminalForm from "./form";
import { CrimesByCriminalsListModalProps } from "../../pages/crimes/crimesByCriminals";

const CrimesByCriminalModal:FC<CrimesByCriminalsListModalProps & {toggleModal: (value: CrimesByCriminalsListModalProps) => void, mainCrimeId: number}> = (props) => {
    return (
        <Modal opened={props.status} onClose={() => props.toggleModal({status: false, type: 'Create', crimeId: props.mainCrimeId})} centered size="xl" withCloseButton={true}  title={props.type === "Edit" ? "Edit Criminal" : "Add Criminal"} overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>
            <CrimesByCriminalForm {...props} toggleModal={props.toggleModal} />
        </Modal>
    )
}

export default CrimesByCriminalModal;