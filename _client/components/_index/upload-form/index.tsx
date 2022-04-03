import React, {FC, FormEvent, memo, useRef} from "react";
import api from "@client/api";

export interface IProps {
  freshImages?: () => void
}

const UploadForm: FC<IProps> = props => {
  const { freshImages = () => ({}) } = props;
  const refForm = useRef<HTMLFormElement>(null)

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formEl = refForm.current;

    if (formEl) {
      const fd = new FormData(formEl);

      api.post('/upload-image', fd).then(() => {
        freshImages();
        formEl.reset();
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} ref={refForm}>
      <div className="mb-3">
        <label className="form-label">Название</label>
        <input name="title" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="formFile" className="form-label">Выберите изображение</label>
        <input className="form-control" type="file" name="image"/>
      </div>
      <button className="btn btn-primary">Добавить</button>
    </form>
  )
}

export default memo(UploadForm);
