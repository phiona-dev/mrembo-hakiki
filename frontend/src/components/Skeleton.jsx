import "./Skeleton.css";

const Skeleton = ({ variant = "text", width, height, className="" }) => {
    const customStyles = {
        width: width || "100%",
        height: height || "100%",
    }
    //combine baseline styles with shape variants (text, circular, rectangular)
    const skeletonClass = `skeleton-base ${variant} ${className}`.trim();
  return (
    <div className={skeletonClass} style={customStyles}></div>
  )
}

export default Skeleton