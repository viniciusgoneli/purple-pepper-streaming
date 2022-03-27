import Image from 'next/image'
import pepperImage from './../../public/images/pepper.svg'
import searchIcon from './../../public/icons/search.svg'
import personIcon from './../../public/icons/person.svg'


export default function Navbar(){
    return(
        <nav>
            <div>
                <Image src={pepperImage} alt='Purple pepper' width={60} height={60} />
                <ul>
                    <li>Home</li>
                    <li>Categories</li>
                    <li>My area</li>
                </ul>
            </div>
            <div>
                <Image src={searchIcon} width={36} height={36}/>
                <Image src={personIcon} width={36} height={36}/>
            </div>
        </nav>
    )
}