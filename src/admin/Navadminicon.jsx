import React from 'react'
import DropDownIconProfile from '../assets/profileicon.png'
import DropDownIconLogout from '../assets/logouticon.png'
import AddProductIcon from '../assets/addproduct.png'
import AddTopingIcon from '../assets/addtoping.png'
import TranscationIcon from '../assets/transaction.png'
import styles from './Navadminicon.module.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

export default function Navadminicon({ Logout, UserImage }) {

    // logout
    const [state, dispatch] = useContext(UserContext);
    const navigate = useNavigate();
    const logout = () => {
        dispatch({
            type: "LOGOUT",
        });
        navigate("/");
    };

    return (
        <>
            <div className="dropdown">
                <button className="btn dropdown-toggle border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img className={styles.Icon} src={UserImage} />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <Link className="dropdown-item" to='/add-product'>
                            <img className={styles.Dropdownicon} src={AddProductIcon} />
                            Add Product
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to='/add-toping'>
                            <img className={styles.Dropdownicon} src={AddTopingIcon} />
                            Add Toping
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item" to='/transaction'>
                            <img className={styles.Dropdownicon} src={TranscationIcon} />
                            Transaction
                        </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                        <a className="dropdown-item" href="/#"
                            onClick={logout}
                        >
                            <img className={styles.Dropdownicon} src={DropDownIconLogout} />
                            Logout
                        </a>
                    </li>
                </ul>
            </div>

        </>
    )
}
