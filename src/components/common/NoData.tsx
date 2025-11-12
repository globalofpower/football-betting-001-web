import Image from './Image'
import nodataImage from '@/assets/images/nodata.png'

const NoData = ({text, loading}:{text:string,loading:boolean}) => {
  if(loading){
    return <div></div>;
  }
  return (
    <div className='py-20 flex flex-col items-center'>
        <Image className="w-30 mb-2" src={nodataImage} />
        <p className='text-[var(--font-color)] text-[14px] font-bold'>{text}</p>
    </div>
  )
}

export default NoData
