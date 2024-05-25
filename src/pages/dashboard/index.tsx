import { FC } from "react";
import { useUser } from "../../hooks/useUser";

const DashboardPage:FC = () => {
    const {userCookieData} = useUser();
    console.log(userCookieData);
    return (
        <div>
            Dashboard {JSON.stringify(userCookieData)}
        </div>
    )
}

export default DashboardPage;