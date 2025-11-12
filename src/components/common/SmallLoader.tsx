import classes from '@/assets/styles/SmallLoader.module.css';

const SmallLoader = ({width}:{width: string}) => {
  return (
    <span style={{width}} className={classes.loader}></span>
  )
}

export default SmallLoader
