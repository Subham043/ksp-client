import { FC, useState } from "react";
import CriminalModal from "../../../components/Criminals/modal";
import CriminalDetail from "../../../components/Criminals/detail";

export type CriminalsDetailModalProps = {
    status: boolean;
    type: "Create",
} | {
    status: boolean;
    type: "Edit";
    id: number;
}

const CriminalsDetailPage:FC = () => {
    const [modal, setModal] = useState<CriminalsDetailModalProps>({status: false, type: 'Create'});
    const toggleModal = (value:CriminalsDetailModalProps) => setModal(value);

    return (
        <div>
            <CriminalDetail toggleModal={toggleModal} />
            <CriminalModal {...modal} toggleModal={toggleModal} />
        </div>
    )
}

export default CriminalsDetailPage;