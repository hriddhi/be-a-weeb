import {
  BaseButton,
  ButtonSpinner,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

const getButton = (buttonType) => {
  switch (buttonType) {
    case "google":
      return GoogleSignInButton;
    case "inverted":
      return InvertedButton;
    default:
      return BaseButton;
  }
};

const Button = ({ children, buttonType, isLoading, ...buttonProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...buttonProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
