import React from 'react'
import styles from './Navusericon.module.css'
import DropDownIconProfile from '../../assets/profileicon.png'
import DropDownIconLogout from '../../assets/logouticon.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { API } from '../../config/api'
import { useQuery } from 'react-query'
import { useState } from "react";
import { useEffect } from "react";

export default function Navusericon() {
    // logout
    // logout
    const [state, dispatch] = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        dispatch({
            type: "LOGOUT",
        });
        navigate("/");

    };

    // const [photoprofile, setPhoto] = useState({});

    // useEffect(() => {
    //     API.get("/user-profile")
    //         .then((res) => {
    //             setPhoto(res.data.data.profile);
    //         })
    //         .catch((err) => console.log("error", err));
    // });

    let { data: Profile, refetch } = useQuery("profileCachesss", async () => {
        const response = await API.get("/user-profile");

        return response.data.data.profile;
    });

    return (
        <>
            <div className="dropdown">
                <button className="btn dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img className={styles.Icon}
                        // src={Profile.image === "http://localhost:5000/uploads/" ? null : Profile?.image}
                        src={Profile?.image}
                        alt='icon' />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <Link className="dropdown-item" to="/profile">
                            <img alt='imgdropwdown' className={styles.Dropdownicon} src={DropDownIconProfile} />
                            Profile
                        </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                        <a className="dropdown-item" href="/#"
                            onClick={logout}
                        >
                            <img alt='dropdownicon' className={styles.Dropdownicon} src={DropDownIconLogout} />
                            Logout
                        </a>
                    </li>
                </ul>
            </div>

        </>
    )


}