import React, { Fragment } from "react";
import { mountRemoteComponent } from "@/utils/loadComponent";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      {mountRemoteComponent({
        module: 'product', component: 'SuggestProducts', props: {
          navigate
        },
      })}
    </Fragment>
  );
};

export default FeaturedProducts;
