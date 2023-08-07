import React from "react";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const SkeletonProduct = () => { 

return (
    <div className="skeleton-wrapper  border rounded-lg mx-1">

<SkeletonElement type="thumbnail" />

        <div className="skeleton-product bg-slate-100  w-full pt-1  ">
            <div className="skeleton-wrap">
<SkeletonElement type="title" />
<SkeletonElement type="price" />
</div>
<SkeletonElement type="text" />
<SkeletonElement type="text2" />

</div>
<Shimmer />

    </div>
)
}

export default SkeletonProduct