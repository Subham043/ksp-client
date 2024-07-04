import { FC } from "react";
import { Modal } from '@mantine/core';
import HearingForm from "./form";
import { HearingsListModalProps } from "../../pages/courts/hearings";

const HearingModal:FC<HearingsListModalProps & {toggleModal: (value: HearingsListModalProps) => void, mainCourtId: number}> = (props) => {
    return (
        <Modal opened={props.status} onClose={() => props.toggleModal({status: false, type: 'Create', courtDetailId: props.mainCourtId})} centered size="xl" withCloseButton={true}  title={props.type === "Edit" ? "Edit Hearing" : "Create Hearing"} overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>
            <HearingForm {...props} toggleModal={props.toggleModal} />
        </Modal>
    )
}

export default HearingModal;