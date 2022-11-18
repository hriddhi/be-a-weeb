import './button.styles.scss'

const Button = ({ children, buttonType, ...buttonProps }) => {
  return (
    <button className={`button-container ${buttonType}`} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
