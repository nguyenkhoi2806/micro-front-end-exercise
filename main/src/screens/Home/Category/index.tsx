import React, { Fragment } from "react";

import { mountRemoteComponent } from "@/utils/loadComponent";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      {mountRemoteComponent({ module: 'product', component: 'CategorySlider', props: { navigate } })}
    </Fragment>
  );
};

export default Category;
