import React, { useState } from 'react';
import classNames from 'classnames';

import { searchFormClassNames } from './classnames';
import IconLoupe from './assets/icon-loupe.svg';
import './assets/search-form.css';

export interface ISubmitHandlerProps {
  query: string,
  path: string,
  method: string,
  name: string
}
export interface ISearchFormProps {
  formClassName?: string,
  method: string,
  path: string,
  onSubmit?: (submitProps: ISubmitHandlerProps) => void,

  inputClassName?: string,
  placeholder: string,
  initValue: string,
  name: string,

  buttonClassName?: string,
  label: string
};

const defaultProps = {
  placeholder: 'Search phrase',
  initValue: '',

  name: 'q',
  method: 'GET',

  label: 'Search'
};

/**
 * Component for search
 */
export function SearchForm(props: ISearchFormProps) {
  const [value, setValue] = useState(props.initValue);

  /**
   * Event handler to the submit form
   *
   * @param {React.FormEvent<HTMLFormElement>}  event
   * @returns {void}
   */
  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): void {
    if (!props.onSubmit) {
      return;
    }

    event.preventDefault();

    const submitProps: ISubmitHandlerProps = {
      query: value,
      path: props.path,
      method: props.method,
      name: props.name
    };

    props.onSubmit(submitProps);
  }

  /**
   * Event handler to the change input
   *
   * @param  {React.ChangeEvent<HTMLInputElement>} event
   * @returns {void}
   */
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setValue(event.target.value);
  }

  return (
    <form
      className={classNames(
        searchFormClassNames.root,
        props.formClassName
      )}
      method={props.method}
      action={props.path}
      onSubmit={handleSubmit}
    >
      <input
        className={classNames(
          searchFormClassNames.input,
          props.inputClassName
        )}
        type="search"
        name={props.name}
        placeholder={props.placeholder}
        aria-label={props.label}
        value={value}
        onChange={handleChange}
      />

      <button
        className={classNames(
          searchFormClassNames.button,
          props.buttonClassName
        )}
        type="submit"
        name="submit"
        value={props.label}
      >
        <IconLoupe />
      </button>
    </form>
  );
}
SearchForm.defaultProps = defaultProps;
