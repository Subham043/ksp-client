import { FC, useState } from "react";
import CourtModal from "../../../components/Courts/modal";
import CourtDetail from "../../../components/Courts/detail";

export type CourtsDetailModalProps = {
    status: boolean;
    type: "Create",
} | {
    status: boolean;
    type: "Edit";
    id: number;
}

const CourtsDetailPage:FC = () => {
    const [modal, setModal] = useState<CourtsDetailModalProps>({status: false, type: 'Create'});
    const toggleModal = (value:CourtsDetailModalProps) => setModal(value);

    return (
        <div>
            <CourtDetail toggleModal={toggleModal} />
            <CourtModal {...modal} toggleModal={toggleModal} />
        </div>
    )
}

export default CourtsDetailPage;