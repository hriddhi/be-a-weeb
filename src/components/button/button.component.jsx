import { BaseButton, GoogleSignInButton, InvertedButton  } from './button.styles'

const getButton = (buttonType) => {
  switch(buttonType) {
    case 'google':
      return GoogleSignInButton
    case 'inverted':
      return InvertedButton
    default:
      return BaseButton
  }
}

const Button = ({ children, buttonType, ...buttonProps }) => {
  const CustomButton = getButton(buttonType)
  return (
    <CustomButton {...buttonProps}>
      {children}
    </CustomButton>
  );
};

export default Button;
