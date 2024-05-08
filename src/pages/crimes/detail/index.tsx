import { FC, useState } from "react";
import CrimeModal from "../../../components/Crimes/modal";
import CrimeDetail from "../../../components/Crimes/detail";

export type CrimesDetailModalProps = {
    status: boolean;
    type: "Create",
} | {
    status: boolean;
    type: "Edit";
    id: number;
}

const CrimesDetailPage:FC = () => {
    const [modal, setModal] = useState<CrimesDetailModalProps>({status: false, type: 'Create'});
    const toggleModal = (value:CrimesDetailModalProps) => setModal(value);

    return (
        <div>
            <CrimeDetail toggleModal={toggleModal} />
            <CrimeModal {...modal} toggleModal={toggleModal} />
        </div>
    )
}

export default CrimesDetailPage;