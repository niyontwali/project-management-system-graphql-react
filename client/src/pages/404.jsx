import { Link } from 'react-router-dom';
import {HiOutlineEmojiSad} from 'react-icons/hi'

const NotFound = () => {
  return (
    <div className='pt-5'>
      <div className='text-center'>
        <HiOutlineEmojiSad size={55} color='#c5ae2c'/>
        <h1 className='fs-1 fw-bold'>404 - Page not found</h1>
        <p className='fs-4'>We can't find the page you are looking for</p>
      </div>
      <div className='text-center mt-4'>
        <Link to="/">
          <div className='btn btn-info fs-5 fw-semibold'>Go back home</div>
        </Link>
      </div>
    </div>
  )
}

export default NotFound