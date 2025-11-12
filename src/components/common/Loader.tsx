import classes from '@/assets/styles/Loader.module.css'

const Loader = () => {
  return (
    <div className={classes.loaderContainer}>
      <span className={classes.loader}></span>
    </div>
  )
}

export default Loader
