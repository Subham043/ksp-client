import { FC, useState } from "react";
import JailModal from "../../../components/Jails/modal";
import JailDetail from "../../../components/Jails/detail";

export type JailsDetailModalProps = {
    status: boolean;
    type: "Create",
} | {
    status: boolean;
    type: "Edit";
    id: number;
}

const JailsDetailPage:FC = () => {
    const [modal, setModal] = useState<JailsDetailModalProps>({status: false, type: 'Create'});
    const toggleModal = (value:JailsDetailModalProps) => setModal(value);

    return (
        <div>
            <JailDetail toggleModal={toggleModal} />
            <JailModal {...modal} toggleModal={toggleModal} />
        </div>
    )
}

export default JailsDetailPage;