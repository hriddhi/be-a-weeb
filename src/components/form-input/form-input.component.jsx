import { FormInputLabel, Input, Group } from "./form-input.styles";

const FormInput = ({ label, ...inputProps }) => {
  return (
    <Group>
      <Input className="form-input" {...inputProps} />
      <FormInputLabel shrink={inputProps.value.length}>
        {label}
      </FormInputLabel>
    </Group>
  );
};

export default FormInput;
