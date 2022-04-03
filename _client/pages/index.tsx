import React, {FC, memo, useCallback, useEffect, useMemo, useState} from 'react';
import {RouteComponentProps} from "react-router";

import '../styles/App.scss';
import Images, {TImage} from "@client/components/_index/images";
import UploadForm from "@client/components/_index/upload-form";
import api from "@client/api";

export interface TParams {}
export interface IProps extends RouteComponentProps<TParams>{}

const IndexPage: FC<IProps> = () =>  {
  const [images, setImages] = useState<null | Array<TImage>>(null)

  useEffect(() => {
    fetchImages()
  }, [])

  function fetchImages() {
    api.get<Array<TImage>>('images/preview').then(res => {
      setImages(res.data)
    })
  }

  function handleFreshImages() {
    fetchImages();
  }

  return (
    <div className="App">
      <div className="w-50 mx-auto mt-5">
        <Images images={useMemo(() => images, [(images || []).length])} className="mb-4" />
        <UploadForm freshImages={useCallback(handleFreshImages, [])} />
      </div>
    </div>
  );
}

export default memo(IndexPage);
