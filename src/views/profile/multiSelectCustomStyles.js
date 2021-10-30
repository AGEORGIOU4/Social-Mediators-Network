export const multiSelectCustomStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted #9CD7F1',
    // color: state.isSelected ? 'red' : 'blue',
    padding: 10,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    //width: 300,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}