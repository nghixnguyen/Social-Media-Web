import './Messages.css'
import dummyData from '../../context/dummyData'
import { IoSend } from "react-icons/io5";
import { GrUpload } from "react-icons/gr";


export default function ChatBox() {
  return (
    <>
    <div className="chat-box">
      <div className="chat-box-top">
      <img src={dummyData.map(user=>(user.ProfieImage))} alt="" />
        <div className="user-name">
            <h3>{dummyData.map(user=>(user.name))}</h3>
            <h5>{dummyData.map(user=>(user.username))}</h5>
        </div>
      </div>
      <div className="chat-box-bottom">
        <form action="#">
          <input type="text" placeholder='Text Message....' />
          <button type='submit' className='btn btn-primary'>
          <IoSend />
          </button>
          <label className='btn btn-primary' htmlFor='CFile'>
          <GrUpload />

            <input type="file" id='CFile' />
          </label>          
        </form>
      </div>
    </div>
    </>
  )
}
