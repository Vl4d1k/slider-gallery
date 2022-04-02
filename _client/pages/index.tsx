import React, {FC, memo} from 'react';
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react-lite";

import '../styles/App.scss';
import Images from "@client/components/_index/images";

export interface TParams {}
export interface IProps extends RouteComponentProps<TParams>{}

const IndexPage: FC<IProps> = () =>  {

  return (
    <div className="App">
      <Images />
    </div>
  );
}

export default memo(observer(IndexPage));
