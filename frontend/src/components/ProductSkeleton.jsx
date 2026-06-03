//composite skeleton component
import Skeleton from "./Skeleton"

const ProductSkeleton = () => {
  return (
    <div style={{ display: "flex", gap: "16px", padding:"16px", border: "1px solid #eee" }}>
        {/* circular avatar placeholder 
        <Skeleton variant="circular" width="50px" height="50px" />*/}

        {/*Text block wrappers */}
        <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="40%" height="24px" />
            <Skeleton variant="text" width="100%" height="24px"/>
            <Skeleton variant="text" width="60%" height="24px"/>
            <Skeleton variant="text" width="60%" height="24px"/>
            <Skeleton variant="text" width="60%" height="24px"/>
            <Skeleton variant="text" width="60%" height="24px"/>
            <Skeleton variant="text" width="60%" height="24px"/>
        </div>
    </div>
  )
}

export default ProductSkeleton