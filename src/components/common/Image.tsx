import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import type { ImageProps } from '@/types';

const Image = ({src, alt, style, className}: ImageProps) => {
  return (
    <LazyLoadImage effect="blur" wrapperProps={{
        style: {transitionDelay: "1s"},
    }} src={src} alt={alt} className={className} style={style} />
  )
}

export default trackWindowScroll(Image)
