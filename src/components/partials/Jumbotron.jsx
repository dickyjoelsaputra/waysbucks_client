import React from 'react'
import JumboRectangle from '../../assets/jumborect.jpg'
import JumboImage from '../../assets/spongebob.png'
import styles from './Jumbotron.module.css'

export default function Jumbotron() {

    return (
        <>
            <div className={styles.Cardtext}>
                <h1 className={styles.Title}>WAYSBUCKS</h1>
                <h5 className={styles.Textss}>Things are changing, but we’re still here for you</h5>
                <p className={styles.Textp}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
                    Tempore, velit optio culpa obcaecati facere quo neque ut vero <br />
                    libero dicta commodi beatae pariatur possimus molestiae dolore c <br />
                    upiditate consequuntur quae magnam!
                </p>
                <p className={styles.Textb}>
                    findout more at...
                </p>
            </div>
            <img alt='rectjumbo' className={styles.Backg} src={JumboRectangle} />
            <img alt='backgroundjumbo' className={styles.Imagess} src={JumboImage} />
        </>
    )
}
