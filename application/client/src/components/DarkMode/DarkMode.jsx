import './DarkMode.css'
import { CgDarkMode } from "react-icons/cg";

export default function DarkMode() {



    const DarkHandele=()=>{
        document.querySelector('body').classList.toggle('DarkMode');
    }

  return (
    <div className='dark-mode-icon' >       
        <CgDarkMode style={{ width: '28px', height: '28px' }} onClick={DarkHandele} />       
    </div>
  )
}
