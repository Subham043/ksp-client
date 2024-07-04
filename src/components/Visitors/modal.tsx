import { FC } from "react";
import { Modal } from '@mantine/core';
import VisitorForm from "./form";
import { VisitorsListModalProps } from "../../pages/jails/visitors";

const VisitorModal:FC<VisitorsListModalProps & {toggleModal: (value: VisitorsListModalProps) => void, mainPunishmentId: number}> = (props) => {
    return (
        <Modal opened={props.status} onClose={() => props.toggleModal({status: false, type: 'Create', punishmentId: props.mainPunishmentId})} centered size="xl" withCloseButton={true}  title={props.type === "Edit" ? "Edit Visitor" : "Create Visitor"} overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>
            <VisitorForm {...props} toggleModal={props.toggleModal} />
        </Modal>
    )
}

export default VisitorModal;