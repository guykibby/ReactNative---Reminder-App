const mockComponent = (props) => {
  const mockOnChange = (event, date) => {
    props.onChange(event, date);
  };

  return <mock-datetimepicker onChange={mockOnChange} {...props} />;
};

export default mockComponent;
