import Loader from "./Loader";

const NoData = ({text, loading}:{text:string,loading:boolean}) => {
  if(loading){
    return <Loader />;
  };
  return (
    <div className='fixed w-full max-w-[500px] z-[9999] bg-[#fafafa] top-0 right-0 bottom-0 left-0 mx-auto flex flex-col items-center justify-center'>
        <p className='text-[var(--font-color)] text-[14px] select-none'>{text}</p>
    </div>
  )
}

export default NoData
